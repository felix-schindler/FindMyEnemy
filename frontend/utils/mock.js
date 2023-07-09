import { mkdir, writeFile } from 'node:fs';
import process from 'node:process';

const BASE = 'http://localhost';
const ENDPOINT = Object.freeze({
	login: `${BASE}/api/users/login`,
	users: `${BASE}/api/users`,
	user: `${BASE}/api/users/2`,
	questions: `${BASE}/api/questions`,
	challenges: `${BASE}/api/challenges`,
	challenge: `${BASE}/api/challenges/1`
});

async function createDirectory(path) {
	return new Promise((resolve, reject) => {
		mkdir(path, { recursive: true }, (err) => {
			if (err) {
				reject(err);
			} else {
				resolve();
			}
		});
	});
}

async function writeFileAsync(path, data) {
	return new Promise((resolve, reject) => {
		writeFile(path, data, { recursive: true }, (err) => {
			if (err) {
				reject(err);
			} else {
				resolve();
			}
		});
	});
}

let res = await fetch(ENDPOINT.login, {
	method: 'POST',
	body: JSON.stringify({
		username: 'admin',
		password: 'admin'
	})
});

const USER = await res.json();
console.log(USER);

try {
	const apiDirectory = process.cwd() + '/static/api';
	await createDirectory(apiDirectory);

	await writeFileAsync(
		apiDirectory + '/users.json',
		await fetch(ENDPOINT.users, {
			headers: {
				Authorization: USER.token
			}
		}).then((res) => res.text())
	);

	const usersDirectory = apiDirectory + '/users';
	await createDirectory(usersDirectory);

	await writeFileAsync(
		usersDirectory + '/1.json',
		await fetch(ENDPOINT.user, {
			headers: {
				Authorization: USER.token
			}
		}).then((res) => res.text())
	);

	await writeFileAsync(
		apiDirectory + '/questions.json',
		await fetch(ENDPOINT.questions, {
			headers: {
				Authorization: USER.token
			}
		}).then((res) => res.text())
	);

	const challengesDirectory = apiDirectory + '/challenges';
	await createDirectory(challengesDirectory);

	await writeFileAsync(
		apiDirectory + '/challenges.json',
		await fetch(ENDPOINT.challenges, {
			headers: {
				Authorization: USER.token
			}
		}).then((res) => res.text())
	);

	await writeFileAsync(
		challengesDirectory + '/1.json',
		await fetch(ENDPOINT.challenge, {
			headers: {
				Authorization: USER.token
			}
		}).then((res) => res.text())
	);

	console.log('Files written successfully.');
} catch (error) {
	console.error(error);
}
