import { serve } from "$std/http/server.ts";
import { Hono } from "hono/mod.ts";
import Database from "./core/db.ts";


// Configure database
const db = new Database();

// Signin as a namespace, database, or root user
await db.signin({
	user: 'fme',
	pass: 'ba7825d4',
});

// Select a specific namespace / database
await db.use('fme', 'fme');


// Configure web server
const app = new Hono();

app.get("/", (c) => c.text("Hello Deno!"));

app
	.get("/:collection", async (c) => {
		const collection = c.req.param("collection");

		if (collection)
			return c.json(await db.select(collection));
	})
	.get("/:collection/:id", async (c) => {
		const collection = c.req.param("collection");
		const id = c.req.param("id");

		if (collection && id)
			await db.select(collection + ":" + id);
	});


// Start web server
serve(app.fetch);
