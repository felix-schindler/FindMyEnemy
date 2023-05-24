import type { AuthUser, Question, Status, User, UserAnswer } from './types';

type RequestMap = {
	'/users': {
		GET: {
			query: {
				q: string;
			};
			body: never;
			response: User[];
		};
		POST: {
			query: never;
			body: User & {
				// Auth is a bit different
				id: never;
				password: string;
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
): Promise<T | Status> {
	try {
		let path = `/api${endpoint}`;

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

		const res = await fetch(path, {
			method: String(method),
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(body)
		});
		return (await res.json()) as T | Status;
	} catch (e: any) {
		return {
			status: 418,
			message: e.message ?? 'Something unexpected happened, please try again.',
			raw: e
		};
	}
}
