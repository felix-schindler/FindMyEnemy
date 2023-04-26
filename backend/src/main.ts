import { serve } from "$std/http/server.ts";
import { Hono } from "hono/mod.ts";
// import { jwt } from "hono/middleware.ts"
import Database from "./core/db.ts";

import { info } from "./core/log.ts";

// Configure database
const db = new Database();

// Signin to namespace, database, and user
info("DB", "Signing in");
await db.signin({
	user: "fme",
	pass: "ba7825d4",
});

// Select a specific namespace / database
info("DB", "Configuring...");
await db.use("fme", "fme");

// Configure web server
info("Hono", "Registering routes...");
export const app = new Hono();

app.all("/", (c) => c.json({ msg: "Hello Deno!" }));

// Require authentication for all routes except /users/auth
// app.use("*", jwt({
// 	secret: "some-secrety-secret",
// }));


// Start web server
serve(app.fetch);
