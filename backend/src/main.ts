import { Hono } from "hono/mod.ts";
import { cors, logger, prettyJSON } from "hono/middleware.ts";
import { HTTPException } from "hono/http-exception.ts";

import Log from "./core/Log.ts";
import UserController from "./controllers/UserController.ts";
import QuestionController from "./controllers/QuestionController.ts";
import { Status } from "./core/types.ts";
import ChallengeController from "./controllers/ChallengeController.ts";
import HttpError from "./core/HttpError.ts";

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

Log.info("Hono", "Registering std middleware");
app.use(
	prettyJSON(),
	cors({
		origin: "*",
		allowHeaders: ["Content-Type", "Authorization"],
	}),
);

if (Log.enabled) app.use("*", logger());

app.get("/", async (c) => {
	const html = await Deno.readTextFile(Deno.cwd() + "/src/index.html");
	return c.html(html);
});

// User routes
Log.info("Hono", "Registering user routes");
// Auth routes
app.post("/users", UserController.shared.register);
app.post("/users/login", UserController.shared.login);
// Normal routes
app.get("/users", UserController.shared.getList);
app.get("/users/:id", UserController.shared.get);
app.put("/users/:id", UserController.shared.replace);
app.patch("/users/:id", UserController.shared.update);
app.delete("/users/:id", UserController.shared.delete);
app.put("/users/:id/fav", UserController.shared.toggleFav);

// Question and answer routes
Log.info("Hono", "Registering question and answer routes");
app.get("/questions", QuestionController.shared.getList);
app.post("/questions/personality", QuestionController.shared.personality);

// Challenge routes
Log.info("Hono", "Registering challenge routes");
app.get("/challenges", ChallengeController.shared.getList);
app.post("/challenges", ChallengeController.shared.create);
app.get("/challenges/:id", ChallengeController.shared.get);
app.put("/challenges/:id", ChallengeController.shared.replace);
app.patch("/challenges/:id", ChallengeController.shared.update);
app.delete("/challenges/:id", ChallengeController.shared.delete);

// Error handler
app.onError((err, c) => {
	Log.error(err);

	if (err instanceof HTTPException) {
		return err.getResponse();
	}

	return c.json<Status>({
		status: HttpError.INTERNAL.status,
		msg: err.message ?? HttpError.INTERNAL.message,
		raw: err,
	}, {
		status: HttpError.INTERNAL.status,
		statusText: err.message ?? HttpError.INTERNAL.message,
	});
});

// Show routes
if (Deno.args.includes("--show-routes")) {
	app.showRoutes();
	Deno.exit(0);
}

// Start web server
const serv = Deno.serve(app.fetch);
serv.finished.then(() => console.log("Server stopped"));
