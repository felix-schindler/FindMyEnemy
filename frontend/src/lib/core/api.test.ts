import { describe, it, expect } from 'vitest';
import collection from './api';
import type { Question, User } from './types';

describe('test all api endpoints', () => {
	it('works for all operations on "user" collection', async () => {
		const client = collection('users');

		/* Create user */
		const userData = { email: 'fs146@hdm-stuttgart.de', name: 'Felix Schindler' };
		const user1 = await client.create<User>({
			...userData,
			password: '21b19739fac4'
		});
		expect(user1.email).toBe(userData.email);
		expect(user1.name).toBe(userData.name);

		/* Get user */
		const user2 = await client.get<User>(user1.id);
		expect(user2).toBe(user1);

		/* Get users */
		const users1 = await client.getList<User>();
		expect(users1).toBeInstanceOf(Array);
		expect(users1.length).toBeGreaterThan(0);

		/* Update user */
		const user3 = await client.update<User>(user1.id, {
			name: 'Felix Schindler 2'
		});
		expect(user3).not.toBe(user1);
		expect(user3.id).toBe(user1.id);
		expect(user3.name).toBe('Felix Schindler 2');

		/* Replace user */
		const user4 = await client.replace<User>(user1.id, {
			...user1,
			name: 'Felix Schindler 3'
		});
		expect(user4).not.toBe(user1);
		expect(user4.id).toBe(user1.id);
		expect(user4.name).toBe('Felix Schindler 3');

		/* Delete user */
		expect(await client.delete(user1.id)).toThrow();
	});

	it("gets questions, even when you're not logged in", async () => {
		const tester = collection('questions');

		const a = await tester.getList<Question>();
		expect(a).toBeInstanceOf(Array);
		expect(a.length).toBeGreaterThan(0);
		expect(a[0]).toHaveProperty('answers');
	});
});
