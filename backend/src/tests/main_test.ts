import { app } from "../main.ts";
import { assertEquals } from '$std/testing/asserts.ts'

Deno.test('Hello World', async () => {
	const res = await app.request('/')
	assertEquals(res.status, 200)
})
