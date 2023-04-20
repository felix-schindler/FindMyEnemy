import { serve } from "$std/http/server.ts";
import { Hono } from "hono/mod.ts";

const app = new Hono();

app.get("/", (c) => c.text("Hello Deno!"));

serve(app.fetch);

export const add = (a: number, b: number) => a + b;
