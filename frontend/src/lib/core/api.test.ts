// @ts-nocheck
import { test, expect } from 'vitest';
import { req } from './api';

test("api doesn't work", async () => {
	const body = await req('/questions', 'GET');
	expect(body.status).toBeDefined();
	expect(body.status).toBe(418);
});
