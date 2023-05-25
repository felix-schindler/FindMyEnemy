import { ac, app } from "../main.ts";
import {
	assertEquals,
	assertNotEquals,
	assertObjectMatch,
} from "$std/testing/asserts.ts";
import type { AuthUser, Challenge, Status } from "../core/types.ts";

// #region Setup
// deno-lint-ignore no-explicit-any
let res: Response, body: any, tester: Challenge;

const authUser = await ((await app.request("/users/login", {
	method: "POST",
	body: JSON.stringify({
		username: "admin",
		password: "admin",
	}),
})).json()) as AuthUser;

const AUTH_TOKEN = authUser.token;
// #endregion Setup

Deno.test("Create challenge", async () => {
	const NEW_Challenge = {
		score: 5,
		challengee: 2,
	};

	res = await app.request("/challenges", {
		method: "POST",
		headers: {
			Authorization: AUTH_TOKEN,
		},
		body: JSON.stringify(NEW_Challenge),
	});
	body = await res.json() as Challenge;

	assertEquals(res.status, 200);
	assertNotEquals(body.id, undefined);
	assertNotEquals(body.id, 0);
	assertEquals(body.user_1_id, authUser.id);
	assertEquals(body.user_2_id, NEW_Challenge.challengee);
	assertEquals(body.user_1_score, NEW_Challenge.score);
	assertEquals(body.user_2_score, 0);

	tester = body;
});

Deno.test("List challenges", async () => {
	res = await app.request("/challenges", {
		headers: {
			"Authorization": AUTH_TOKEN,
		},
	});
	body = await res.json();

	assertEquals(res.status, 200);
	assertNotEquals(body.length, 0);
});

Deno.test("Get challenge", async () => {
	res = await app.request(`/challenges/${tester.id}`, {
		headers: {
			"Authorization": AUTH_TOKEN,
		},
	});
	body = await res.json() as Challenge;

	assertEquals(res.status, 200);
	assertObjectMatch(body, tester);
});

Deno.test("Update challenge", async () => {
	const score = 10;

	res = await app.request(`/challenges/${tester.id}`, {
		method: "PATCH",
		headers: {
			Authorization: AUTH_TOKEN,
		},
		body: JSON.stringify({ score }),
	});
	body = await res.json() as Challenge;

	assertEquals(res.status, 200);
	assertEquals(body.user_1_id, tester.user_1_id);
	assertEquals(body.user_2_id, tester.user_2_id);
	if (body.user_1_id == authUser.id) {
		assertEquals(body.user_1_score, score);
		assertEquals(body.user_2_score, tester.user_2_score);
	} else {
		assertEquals(body.user_2_score, score);
		assertEquals(body.user_1_score, tester.user_1_score);
	}
});

Deno.test("Delete challenge", async () => {
	res = await app.request(`/challenges/${tester.id}`, {
		method: "DELETE",
		headers: {
			Authorization: AUTH_TOKEN,
		},
	});
	body = await res.json() as Status;

	assertEquals(res.status, 200);
	assertEquals(body.raw.rowCount, 1);
});

ac.abort();
