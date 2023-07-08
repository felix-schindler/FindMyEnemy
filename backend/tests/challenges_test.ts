import { app } from "../src/main.ts";
import {
	assert,
	assertEquals,
	assertNotEquals,
	// assertObjectMatch,
} from "$std/testing/asserts.ts";
import {
	type AuthUser,
	type Challenge,
	ClientChallenge,
	Status,
} from "../src/core/types.ts";

// #region Setup
// deno-lint-ignore no-explicit-any
let res: Response, body: any, tester: string;

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

	assertEquals(res.status, 201);
	assertEquals(body.status, 201);
	assertEquals(body.msg, "Challenge created");

	tester = body.raw;
});

Deno.test("List challenges", async (t) => {
	await t.step("all", async () => {
		res = await app.request("/challenges", {
			headers: {
				Authorization: USER_1.token,
			},
		});
		body = await res.json();

		assertEquals(res.status, 200);
		assertNotEquals(body.length, 0);
	});

	await t.step("pending", async () => {
		res = await app.request("/challenges?pending", {
			headers: {
				Authorization: USER_1.token,
			},
		});
		body = await res.json();

		assertEquals(res.status, 200);
		assertNotEquals(body.length, 0);
		body.map((challenge: ClientChallenge) => {
			assert(challenge.user_1.score === 0 || challenge.user_2.score === 0);
		});
	});

	await t.step("finished", async () => {
		res = await app.request("/challenges?finished", {
			headers: {
				Authorization: USER_1.token,
			},
		});
		body = await res.json();

		assertEquals(res.status, 200);
		assertNotEquals(body.length, 0);
		body.map((challenge: ClientChallenge) => {
			assert(challenge.user_1.score !== 0 && challenge.user_2.score !== 0);
		});
	});
});

Deno.test("Get challenge", async () => {
	res = await app.request(`/challenges/${tester}`, {
		headers: {
			Authorization: USER_1.token,
		},
	});
	body = await res.json() as Challenge;

	assertEquals(res.status, 200);
	assertNotEquals(body.id, undefined);
	assertNotEquals(body.user_1, undefined);
	assertNotEquals(body.user_2, undefined);
	// assertObjectMatch(body, tester);
});

Deno.test("Update challenge", async () => {
	const score = 10;

	res = await app.request(`/challenges/${tester}`, {
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
	res = await app.request(`/challenges/${tester}`, {
		method: "DELETE",
		headers: {
			Authorization: USER_1.token,
		},
	});
	body = await res.json() as Status;

	assertEquals(res.status, 200);
	assertEquals(body.raw.rowCount, 1);
});
