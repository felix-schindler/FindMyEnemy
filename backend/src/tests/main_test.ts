import { app } from "../main.ts";
import { assertEquals, assertNotEquals } from "$std/testing/asserts.ts";

Deno.test("Test all routes", async () => {
	// deno-lint-ignore no-explicit-any
	let res: Response, body: any;

	// #region Login

	res = await app.request("/auth", {
		method: "POST",
		body: JSON.stringify({
			user: "admin",
			password: "admin",
		}),
	});

	assertEquals(res.status, 200);

	body = await res.json();
	assertNotEquals(body.id, undefined);
	assertNotEquals(body.username, undefined);
	assertNotEquals(body.email, undefined);
	assertNotEquals(body.personality, undefined);
	assertNotEquals(body.token, undefined);

	assertEquals(body.password, undefined);

	// #endregion Login

	// #region Register

	res = await app.request("/auth/register", {
		method: "POST",
		body: JSON.stringify({
			username: "test",
			email: "admin@admin.com",
			password: "admin",
			personality: "admin",
		}),
	});

	assertEquals(res.status, 200);

	body = await res.json();
	assertNotEquals(body.id, undefined);
	assertNotEquals(body.username, undefined);
	assertNotEquals(body.email, undefined);
	assertNotEquals(body.personality, undefined);
	assertNotEquals(body.token, undefined);

	assertEquals(body.password, undefined);

	// #endregion Register

	// #region Get questions

	res = await app.request("/questions");

	assertEquals(res.status, 200);

	body = await res.json();
	assertNotEquals(body.length, 0);

	// #endregion Get questions
});
