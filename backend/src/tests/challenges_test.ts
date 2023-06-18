import { app } from "../main.ts";
import {
	assertEquals,
	assertNotEquals,
	assertObjectMatch,
} from "$std/testing/asserts.ts";
import { type AuthUser, type Challenge, Status } from "../core/types.ts";

// #region Setup
// deno-lint-ignore no-explicit-any
let res: Response, body: any, tester: Challenge;

const USER_1 = await ((await app.request("/users/login", {
	method: "POST",
	body: JSON.stringify({
		username: "admin",
		password: "admin",
	}),
})).json()) as AuthUser | Status;
if (USER_1 instanceof Status) {
	Deno.exit(1);
}

const USER_2 = await ((await app.request("/users/login", {
	method: "POST",
	body: JSON.stringify({
		username: "jane_smith",
		password: "password",
	}),
})).json()) as AuthUser | Status;
if (USER_2 instanceof Status) {
	Deno.exit(1);
}

// #endregion Setup

Deno.test("Create challenge", async () => {
	const NEW_Challenge = {
		score: 5,
		challengee: 2,
	};

	res = await app.request("/challenges", {
		method: "POST",
		headers: {
			Authorization: USER_1.token,
		},
		body: JSON.stringify(NEW_Challenge),
	});
	body = await res.json() as Challenge;

	assertEquals(res.status, 200);
	assertNotEquals(body.id, undefined);
	assertNotEquals(body.id, 0);
	assertEquals(body.user_1_id, USER_1.id);
	assertEquals(body.user_2_id, NEW_Challenge.challengee);
	assertEquals(body.user_1_score, NEW_Challenge.score);
	assertEquals(body.user_2_score, 0);

	tester = body;
});

Deno.test("List challenges", async () => {
	res = await app.request("/challenges", {
		headers: {
			Authorization: USER_1.token,
		},
	});
	body = await res.json();

	assertEquals(res.status, 200);
	assertNotEquals(body.length, 0);
});

Deno.test("Get challenge", async () => {
	res = await app.request(`/challenges/${tester.id}`, {
		headers: {
			Authorization: USER_1.token,
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
			Authorization: USER_2.token,
		},
		body: JSON.stringify({ score }),
	});
	body = await res.json() as Challenge;

	assertEquals(res.status, 200);
	assertEquals(body.status, 200);
	assertEquals(body.raw.rowCount, 1);
});

Deno.test("Delete challenge", async () => {
	res = await app.request(`/challenges/${tester.id}`, {
		method: "DELETE",
		headers: {
			Authorization: USER_1.token,
		},
	});
	body = await res.json() as Status;

	assertEquals(res.status, 200);
	assertEquals(body.raw.rowCount, 1);
});
