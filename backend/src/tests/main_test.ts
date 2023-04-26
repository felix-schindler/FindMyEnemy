import { app } from "../main.ts";
import { assertEquals } from "$std/testing/asserts.ts";

Deno.test("Hello World", async () => {
	let res: Response;

	res = await app.request("/");
	assertEquals(res.status, 200);

	res = await app.request("/1/2/3/4/5");
	assertEquals(res.status, 404);
});
