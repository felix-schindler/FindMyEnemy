import { app } from "../src/main.ts";
import { assertEquals } from "$std/testing/asserts.ts";

// deno-lint-ignore no-explicit-any
let res: Response, body: any;

// Deno.test("Questions", async () => {
// 	res = await app.request("/questions", { method: "GET" });
// 	body = await res.json();

// 	assertEquals(res.status, 200);
// 	assertEquals(body.length, 35);
// });

Deno.test("Personality", async () => {
	res = await app.request("/questions/personality", {
		method: "POST",
		body: JSON.stringify(
			[
				{
					"question_id": 1,
					"category": "N",
				},
				{
					"question_id": 2,
					"category": "N",
				},
				{
					"question_id": 3,
					"category": "N",
				},
				{
					"question_id": 4,
					"category": "N",
				},
				{
					"question_id": 5,
					"category": "N",
				},
				{
					"question_id": 3,
					"category": "N",
				},
				{
					"question_id": 7,
					"category": "N",
				},
				{
					"question_id": 8,
					"category": "N",
				},
				{
					"question_id": 9,
					"category": "N",
				},
				{
					"question_id": 10,
					"category": "N",
				},
				{
					"question_id": 11,
					"category": "N",
				},
				{
					"question_id": 12,
					"category": "N",
				},
				{
					"question_id": 13,
					"category": "N",
				},
				{
					"question_id": 14,
					"category": "N",
				},
				{
					"question_id": 15,
					"category": "N",
				},
				{
					"question_id": 16,
					"category": "N",
				},
				{
					"question_id": 17,
					"category": "N",
				},
				{
					"question_id": 18,
					"category": "N",
				},
				{
					"question_id": 19,
					"category": "N",
				},
				{
					"question_id": 20,
					"category": "N",
				},
				{
					"question_id": 21,
					"category": "N",
				},
				{
					"question_id": 22,
					"category": "N",
				},
				{
					"question_id": 23,
					"category": "N",
				},
				{
					"question_id": 24,
					"category": "N",
				},
				{
					"question_id": 25,
					"category": "N",
				},
				{
					"question_id": 26,
					"category": "N",
				},
				{
					"question_id": 27,
					"category": "N",
				},
				{
					"question_id": 28,
					"category": "N",
				},
				{
					"question_id": 29,
					"category": "N",
				},
				{
					"question_id": 30,
					"category": "E",
				},
				{
					"question_id": 31,
					"category": "E",
				},
				{
					"question_id": 32,
					"category": "E",
				},
				{
					"question_id": 33,
					"category": "I",
				},
				{
					"question_id": 34,
					"category": "I",
				},
				{
					"question_id": 35,
					"category": "S",
				},
			],
		),
	});
	body = await res.json() as { personality: string };

	assertEquals(res.status, 200);
	assertEquals(body.personality, "ENFP");
});
