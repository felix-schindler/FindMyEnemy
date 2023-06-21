import { assertEquals, assertInstanceOf } from "$std/testing/asserts.ts";

import { HTTPException } from "hono/http-exception.ts";
import HttpError from "../src/core/HttpError.ts";
import type { Status } from "../src/core/types.ts";

Deno.test("HttpError status code", async () => {
	const tester = new HttpError(401);
	assertInstanceOf(tester, HTTPException);

	const res = tester.getResponse();
	const body = await res.json() as Status;

	assertEquals(res.status, 401);
	assertEquals(body.status, 401);
});

Deno.test("HttpError status code and message", async () => {
	const tester = new HttpError(401, "Unauthorized");
	assertInstanceOf(tester, HTTPException);
	assertInstanceOf(tester, HttpError);
	assertInstanceOf(tester, Error);

	const res = tester.getResponse();
	const body = await res.json() as Status;

	assertEquals(res.status, 401);
	assertEquals(body.status, 401);
	assertEquals(res.statusText, "Unauthorized");
	assertEquals(body.msg, "Unauthorized");
});

import { app } from "../src/main.ts";

Deno.test("Create challenge fails with 401", async () => {
	const res = await app.request("/challenges", {
		method: "POST",
		body: JSON.stringify({
			score: 1,
			challengee: 2,
		}),
	});
	const body: Status = await res.json();

	const code = 401, msg = "Unauthorized";
	assertEquals(res.status, code);
	assertEquals(res.statusText, msg);
	assertEquals(body.status, code);
	assertEquals(body.msg, msg);
});

Deno.test("List users fails with 401", async () => {
	const res = await app.request("/users", {
		headers: {
			"Authorization": "Bearer 123",
		},
	});
	const body: Status = await res.json();

	const code = 401, msg = "Unauthorized";
	assertEquals(res.status, code);
	assertEquals(res.statusText, msg);
	assertEquals(body.status, code);
	assertEquals(body.msg, msg);
});
