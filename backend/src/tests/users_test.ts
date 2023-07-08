import { app } from "../main.ts";
import { assertEquals, assertNotEquals } from "$std/testing/asserts.ts";
import { AuthUser } from "../core/types.ts";

// deno-lint-ignore no-explicit-any
let res: Response, body: any, tester: AuthUser;

tester = await app.request("/users", {
	method: "POST",
	body: JSON.stringify({
		username: "test_user-" + Math.floor(Math.random() * 1000),
		password: "test_user",
		personality: "ENTP",
	}),
}).then((res) => res.json());

// Deno.test("User register", async () => {
// 	res = await app.request("/users", {
// 		method: "POST",
// 		body: JSON.stringify({
// 			username: "test_user-" + Math.floor(Math.random() * 1000),
// 			password: "test_user",
// 			personality: "JKLÖ",
// 		}),
// 	});
// 	body = await res.json();

// 	assertEquals(res.status, 200);
// 	assertNotEquals(body.id, undefined);
// 	assertNotEquals(body.username, undefined);
// 	assertNotEquals(body.personality, undefined);
// 	assertNotEquals(body.token, undefined);

// 	assertEquals(body.password, undefined);
// 	tester = body; // Save for later
// });

Deno.test("User login", async () => {
	res = await app.request("/users/login", {
		method: "POST",
		body: JSON.stringify({
			username: tester.username,
			password: "test_user",
		}),
	});
	body = await res.json();

	assertEquals(res.status, 200);
	assertNotEquals(body.id, undefined);
	assertNotEquals(body.username, undefined);
	assertNotEquals(body.personality, undefined);
	assertNotEquals(body.token, undefined);

	assertEquals(body.password, undefined);
});

Deno.test("User update", async () => {
	res = await app.request(`/users/${tester.id}`, {
		method: "PATCH",
		headers: {
			Authorization: tester.token,
		},
		body: JSON.stringify({
			personality: "ESFP",
		}),
	});
	body = await res.json();

	assertEquals(res.status, 200);
	assertEquals(body.raw.rowCount, 1);
	assertNotEquals(body.raw.user.id, undefined);
	assertNotEquals(body.raw.user.username, undefined);
	assertEquals(body.raw.user.personality, "ESFP");
	assertNotEquals(body.raw.user.personality, undefined);
	assertNotEquals(body.raw.user.personality, tester.personality);
	assertNotEquals(body.raw.user.token, tester.token);
	tester = body.raw.user; // Save for later
});

Deno.test("User replace", async () => {
	res = await app.request(`/users/${tester.id}`, {
		method: "PATCH",
		body: JSON.stringify({}),
	});
	assertEquals(res.status, 401);

	res = await app.request(`/users/${tester.id}`, {
		method: "PATCH",
		headers: {
			Authorization: tester.token,
		},
		body: JSON.stringify({}),
	});
	assertEquals(res.status, 400);

	res = await app.request(`/users/${tester.id}`, {
		method: "PATCH",
		headers: {
			Authorization: tester.token,
		},
		body: JSON.stringify({
			password: "test_user2",
		}),
	});
	body = await res.json();
});

Deno.test("User get (enemy list)", async () => {
	res = await app.request("/users", {
		headers: { Authorization: tester.token },
	});
	body = await res.json();
	assertEquals(res.status, 200);
	assertNotEquals(body.length, 0);

	for (let user of body) {
		assertNotEquals(user.compatibility, undefined);
		assertEquals(user.compatibility > 0 && user.compatibility < 100, true);
	} 
});

Deno.test("User get (enemy list)", async () => {
	res = await app.request("/users?q=test", {
		headers: { Authorization: tester.token },
	});
	body = await res.json();

	assertEquals(res.status, 200);
	assertNotEquals(body.length, 0);

    for (let user of body) {
			assertNotEquals(user.compatibility, undefined);
			assertEquals(user.compatibility > 0 && user.compatibility < 100, true);
	} 
});

Deno.test("User get (single)", async () => {
	res = await app.request("/users/1", {
		headers: { Authorization: tester.token },
	});
	body = await res.json();

	assertEquals(res.status, 200);
	assertNotEquals(body.id, undefined);
	assertNotEquals(body.username, undefined);
	assertNotEquals(body.personality, undefined);
	assertEquals(body.token, undefined);
	assertEquals(body.password, undefined);
});

Deno.test("User delete", async () => {
	res = await app.request(`/users/${tester.id}`, {
		method: "DELETE",
		headers: {
			Authorization: tester.token,
		},
	});
	body = await res.json();

	assertEquals(res.status, 200);
	assertEquals(body.raw.rowCount, 1);

	// @ts-ignore (tester has Feierabend)
	tester = undefined;
});
