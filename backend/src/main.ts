import { serve } from "$std/http/server.ts";
import { Hono } from "hono/mod.ts";
import { jwt } from "hono/middleware.ts"
import Database from "./core/db.ts";

import { info } from "./core/log.ts";

// Configure database
const db = new Database();

// Signin to namespace, database, and user
info("DB", "Signing in")
await db.signin({
	user: "fme",
	pass: "ba7825d4",
});

// Select a specific namespace / database
info("DB", "Configuring...")
await db.use('fme', 'fme');


// Configure web server
info("Hono", "Registering routes...")
export const app = new Hono();

// Require authentication for all routes except /users/auth
// app.use("*", jwt({
// 	secret: "some-secrety-secret",
// }));

app.all("/", (c) => c.json({ msg: "Hello Deno!" }));

app
	.get("/:collection", async (c) => {
		const collection = c.req.param("collection");

		if (collection) {
			return c.json(await db.select(collection));
		}
	})
	.post("/:collection", async (c) => {
		const collection = c.req.param("collection");

		if (collection) {
			return c.json(await db.create(collection), await c.req.json());
		}
	});

app
	.get("/:collection/:id", async (c) => {
		const collection = c.req.param("collection");
		const id = c.req.param("id");

		if (collection && id) {
			await db.select(collection + ":" + id);
		}
	})
	.post("/:collection/:id", async (c) => {
		const collection = c.req.param("collection");
		const id = c.req.param("id");

		if (collection && id)
			return c.json(await db.create(collection + ":" + id, await c.req.json()));
	})
	.put("/:collection/:id", async (c) => {
		const collection = c.req.param("collection");
		const id = c.req.param("id");

		if (collection && id) {
			return c.json(await db.update(collection + ":" + id, await c.req.json()));
		}
	})
	.patch("/:collection/:id", async (c) => {
		const collection = c.req.param("collection");
		const id = c.req.param("id");

		if (collection && id) {
			return c.json(await db.update(collection + ":" + id, await c.req.json()));
		}
	})
	.delete("/:collection/:id", async (c) => {
		const collection = c.req.param("collection");
		const id = c.req.param("id");

		if (collection && id) {
			return c.json(await db.delete(collection + ":" + id));
		}
	});


// Start web server
serve(app.fetch);
