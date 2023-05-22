import { Hono } from "hono/mod.ts";
import { cors, jwt, logger, prettyJSON } from "hono/middleware.ts";
import { HTTPException } from "hono/http-exception.ts";

import Log from "./core/Log.ts";
import { JWT_SECRET } from "./core/stores.ts";
import UserController from "./controllers/UserController.ts";
import QuestionController from "./controllers/QuestionController.ts";
import { Status } from "./core/types.ts";

if (Deno.args.includes("--help")) {
	console.log(
		"Usage: ./backend [options]\n\n" + "A simple backend for the FME project.",
	);
	console.log("Options:");
	console.log("  --help\t\tShow this help message");
	console.log("  --no-log\t\tDisable logging");
	console.log("  --no-log-file\t\tDisable logging to file");
	console.log("  --show-routes\t\tShow all registered routes");
	Deno.exit(0);
}

// Configure logging
if (Deno.args.includes("--no-log") || Deno.args.includes("--show-routes")) {
	Log.enabled = false;
}
if (Deno.args.includes("--no-log-file")) Log.noFile = true;

// Configure web server
export const app = new Hono();

// TODO: configure CORS
Log.info("Hono", "Registering std middleware");
app.use(logger(), prettyJSON(), cors());

// Require authentication for all routes starting with /enemies
Log.info("Hono", "Registering auth middleware");
app.use(
	"/enemies/*",
	jwt({
		secret: JWT_SECRET,
	}),
);

Log.info("Hono", "Registering user routes");
// Auth routes
app.post("/users", UserController.shared.register);
app.post("/users/login", UserController.shared.login);
// Normal routes
app.get("/users", UserController.shared.getList);
app.get("/users/:id", UserController.shared.get);
app.patch("/users/:id", UserController.shared.update);
app.put("/users/:id", UserController.shared.replace);
app.delete("/users/:id", UserController.shared.delete);

// Question and answer routes
Log.info("Hono", "Registering question and answer routes");
app.get("/questions", QuestionController.shared.getList);
app.post("/questions/personality", QuestionController.shared.personality);

// Error handler
app.onError((err, c) => {
	Log.error(err);

	if (err instanceof HTTPException) {
		return err.getResponse();
	}

	return c.json<Status>({
		status: 500,
		msg: err.message ?? "Internal server error",
		raw: err,
	}, {
		status: 500,
		statusText: "Internal server error",
	});
});

// Show routes
if (Deno.args.includes("--show-routes")) {
	app.showRoutes();
	Deno.exit(0);
}

// Start web server
Deno.serve(app.fetch);
