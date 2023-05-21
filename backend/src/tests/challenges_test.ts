/*
import { app } from "../main.ts";
import { assertEquals, assertNotEquals } from "$std/testing/asserts.ts";
import { Challenge } from "../core/types.ts";

Deno.test("Challenge routes", async () => {
	// deno-lint-ignore no-explicit-any
	let res: Response, body: any;

	// #region Login

	res = await app.request("/users/login", {
		method: "POST",
		body: JSON.stringify({
			user: "admin",
			password: "admin",
		}),
	});

	const AUTH_TOKEN = (await res.json()).token;

	assertEquals(res.status, 200);
	assertNotEquals(AUTH_TOKEN, undefined);

	// #endregion Login

	// #region Challenges

	res = await app.request("/challenges", {
		headers: {
			Authorization: AUTH_TOKEN,
		}
	});

	assertEquals(res.status, 200);

	body = await res.json();
	assertEquals(body.length, 0);

	// #endregion Challenges

	// #region Create challenge

	const NEW_CHALLENGE: Challenge = {
		self_user_id: 1,
		user_id: 1,
		self_score: 0,
		opponent_score: 0,
	};

	res = await app.request("/users/1/challenge", {
		method: "POST",
		body: JSON.stringify(NEW_CHALLENGE)
	})

	assertEquals(res.status, 401);

	res = await app.request("/users/1/challenge", {
		method: "POST",
		headers: {
			Authorization: AUTH_TOKEN,
		},
		body: JSON.stringify(NEW_CHALLENGE)
	});

	assertEquals(res.status, 200);
	assertNotEquals((await res.json()).id, undefined);

	// #endregion Create challenge
});
*/
