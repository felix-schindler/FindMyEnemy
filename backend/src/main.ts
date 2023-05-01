import { Hono } from "hono/mod.ts";
import { /*cache,*/ cors, jwt, logger, prettyJSON } from "hono/middleware.ts";
import { decode, sign } from "hono/utils/jwt/jwt.ts";
import { HTTPException } from "hono/http-exception.ts";
import { compare, hash } from "bcrypt";

import Database from "./core/db.ts";
import Log from "./core/log.ts";
import HttpError from "./core/errors.ts";
import type { ClientUser, Question, User, UncreatedUser, UserAnswer } from "./core/types.ts";

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

// Configure JWT
const JWT_SECRET = "some-secrety-secret"; // TODO: Use an actual secret

// Configure database
const db = new Database();

// Signin to namespace, database, and user
Log.info("DB", "Signing in");
await db.signin({
	NS: "fme",
	DB: "fme",
	user: "fme",
	pass: "ba7825d4",
});

// Configure web server
Log.info("Hono", "Registering routes...");
export const app = new Hono();

app.use("*", logger());
app.use("*", prettyJSON());
app.use("*", cors()); // TODO: Configure CORS
// NOTE: Cache MUST NOT be used because it triggers a panic in Deno (denoland/deno#18889)
// app.get(
// 	"*",
// 	cache({
// 		cacheName: "backend-default",
// 		cacheControl: "max-age=3600",
// 		wait: true,
// 	}),
// );

// Require authentication for all /enemies/* routes
app.use(
	"/enemies/*",
	jwt({
		secret: JWT_SECRET,
	}),
);


// Sign in
app.post("/auth", async (c) => {
	const { user, password } = await c.req.json();

	if (!(user && password)) throw new HttpError(400, "Missing user or password");

	// Get user from database
	const dbUser = (await db.query<User>(
		"SELECT * FROM users WHERE email = $user OR username = $user",
		{ user },
	))[0];

	// Any error occured? Throw it to the next middleware!
	if (dbUser.error) throw dbUser.error;

	// Check password
	if (!(await compare(password, dbUser.result.password))) {
		throw new HttpError(400, "Invalid password");
	}

	// @ts-ignore - Remove password from user object before sending it to the client
	delete dbUser.result.password;

	return c.json({
		...dbUser.result,
		token: sign({ ...dbUser.result }, JWT_SECRET),
	});
});

app.post("/auth/register", async (c) => {
	const { username, email, password, personality } = await c.req.json();

	if (!(username && email && password && personality)) {
		throw new HttpError(400, "Missing fields");
	}

	const user: UncreatedUser = {
		username,
		email,
		password: await hash(password),
		personality,
	};

	// FIXME: How to get the ID of the last insert?
	const id = await db.create<UncreatedUser>("users", user);
	user.id = id;

	return c.json<ClientUser>({
		id: user.id!,
		username: user.username,
		email: user.email,
		personality: user.personality!,
		token: await sign(user, JWT_SECRET),
	});
});

// Get questions
app.get("/questions", async (c) => {
	const questions = await db.select<Question, string>("questions");
	return c.json(questions);
});

// Get personality
app.post("/personality", async (c) => {
	const userAnswers = await c.req.json() as UserAnswer[];

	if (!userAnswers) throw new HttpError(400, "Missing user answers");

	// Sum up answers
	const sums: Record<number, number[]> = {};
	userAnswers.map((a) => {
		// Init array if it doesn't exist
		if (!sums[a.category_id]) sums[a.category_id] = [0, 0];

		// Add answer to array
		sums[a.category_id][a.answer_id]++;
	});

	// Calculate personality
	const personaliyScores = {
		E: sums[0][0],
		I: sums[0][1],
		S: sums[1][0] + sums[2][0],
		N: sums[1][1] + sums[2][1],
		T: sums[3][0] + sums[4][0],
		F: sums[3][1] + sums[4][1],
		J: sums[5][0] + sums[6][0],
		P: sums[5][1] + sums[6][1],
	};

	// Get which letter has the hightest score
	const personality = Object.keys(personaliyScores).reduce((a, b) =>
		// TODO: I don't know if this works, let me test it first
		// @ts-ignore - I don't know if this works, let me test it first
		personaliyScores[a] > personaliyScores[b] ? a : b
	);

	return c.text(personality);
});

app.get("/enemies", async (c) => {
	// Get user from JWT
	const reqUser = decode(c.req.header("Authorization")!).payload as User;

	// Get all users with different personality from database
	const _users = await db.query<User>(
		"SELECT * FROM users WHERE personality != $personality",
		{
			personality: reqUser.personality,
		},
	);

	// Add the user to the array and check for errors
	const users: User[] = [];
	_users.map((u) => {
		if (u.result) users.push(u.result);
		else throw u.error;
	});

	return c.json(users);
});

app.get("/enemies/:username", async (c) => {
	// Get user from database by username
	const username = c.req.param("username");
	const user = await db.select<User, string>(`users:${username}`);

	// @ts-ignore - Remove password from user object before sending it to the client
	delete dbUser.password;

	return c.json(user);
});

// Error handler
app.onError((err, c) => {
	Log.error(err);

	if (err instanceof HTTPException) {
		return err.getResponse();
	}

	return c.json({
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
