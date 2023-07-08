import { get } from 'svelte/store';
import type { Status, AuthUser, Challenge, Question, User, UserAnswer, DBChallenge } from './types';
import { authStore } from './stores';

// const BASE = 'http://localhost/api';
const BASE = 'http://localhost:8000';

type RequestMap = {
	'/users': {
		GET: {
			query: {
				q?: string;
				frenemies?: boolean;
			};
			body: never;
			response: User[];
		};
		POST: {
			query: never;
			body: {
				username: string;
				password: string;
				personality: string;
			};
			response: AuthUser;
		};
	};
	'/users/login': {
		POST: {
			query: never;
			body: {
				username: string;
				password: string;
			};
			response: AuthUser;
		};
	};
	'/users/:id': {
		GET: {
			query: {
				id: string;
			};
			body: never;
			response: User;
		};
		PUT: {
			query: {
				id: number;
			};
			body: {
				username: string;
				password: string;
				personality: string;
			};
			response: Status & {
				raw: {
					rowCount: number;
					user: AuthUser | undefined;
				};
			};
		};
		PATCH: {
			query: {
				id: number;
			};
			body: {
				username?: string;
				password?: string;
				personality?: string;
			};
			response: Status & {
				raw: {
					rowCount: number;
					user: AuthUser | undefined;
				};
			};
		};
		DELETE: {
			query: {
				id: number;
			};
			body: never;
			response: Status & {
				raw: {
					rowCount: number;
				};
			};
		};
	};
	'/users/:id/fav': {
		PUT: {
			query: {
				id: number | string;
			};
			body: never;
			response: Status;
		};
	};
	'/questions': {
		GET: {
			query: never;
			body: never;
			response: Question[];
		};
	};
	'/questions/personality': {
		POST: {
			query: never;
			body: UserAnswer[];
			response: {
				personality: string;
			};
		};
	};
	'/challenges': {
		GET: {
			query: {
				finished?: boolean;
				pending?: boolean;
			};
			body: never;
			response: Challenge[];
		};
		POST: {
			query: never;
			body: {
				score: number;
				challengee: number;
			};
			response: Status;
		};
	};
	'/challenges/:id': {
		GET: {
			query: {
				id: number;
			};
			body: never;
			response: Challenge;
		};
		PUT: {
			query: {
				id: number;
			};
			body: DBChallenge;
			response: Status;
		};
		PATCH: {
			query: {
				id: number;
			};
			body: {
				score: number;
			};
			response: Status;
		};
		DELETE: {
			query: {
				id: number;
			};
			body: never;
			response: Status;
		};
	};
};

type RequestPath = keyof RequestMap;

type RequestMethod<Path extends RequestPath> = keyof RequestMap[Path];

type RequestQuery<
	Path extends RequestPath,
	Method extends RequestMethod<Path>
> = RequestMap[Path][Method] extends { query: infer Q } ? Q : never;

type RequestBody<
	Path extends RequestPath,
	Method extends RequestMethod<Path>
> = RequestMap[Path][Method] extends { body: infer B } ? B : never;

type RequestResponse<
	Path extends RequestPath,
	Method extends RequestMethod<Path>
> = RequestMap[Path][Method] extends { response: infer R } ? R : never;

export async function req<
	Path extends RequestPath,
	Method extends RequestMethod<Path>,
	T = RequestResponse<Path, Method>
>(
	endpoint: Path,
	method: Method,
	body?: RequestBody<Path, Method>,
	query?: RequestQuery<Path, Method>
): Promise<T> {
	let path: string = endpoint;

	// Build query params from Record<string, string>
	if (query) {
		const params = new URLSearchParams();
		for (const [key, value] of Object.entries(query)) {
			if (path.includes(`:${key}`)) {
				// Check if path needs this query param
				path = path.replace(`:${key}`, String(value));
			} else {
				// Otherwise, add it to the query params
				params.append(key, String(value));
			}
		}

		path = path.concat('?', params.toString());
	}

	const reqUrl: string = `${BASE}${path}`;
	console.debug(`${String(method)} ${reqUrl}`, { query, body });

	const res = await fetch(reqUrl, {
		method: String(method),
		headers: {
			'Content-Type': 'application/json',
			Authorization: get(authStore)?.token
		},
		body: JSON.stringify(body)
	});

	if (res.status < 200 || res.status >= 300) {
		throw new Error(`${res.status}: ${res.statusText}`);
	}

	return (await res.json()) as T;
}
