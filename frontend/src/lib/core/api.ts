import type { AuthRecord, Question, User } from './types';

type RequestMap = {
	'/users': {
		GET: {
			query: {
				enemies: string;
			};
			body: never;
			response: User[];
		};
		POST: {
			query: never;
			body: User;
			response: User;
		};
	};
	'/users/:id': {
		GET: {
			query: never;
			body: never;
			response: User;
		};
	};
	'/users/auth': {
		POST: {
			query: never;
			body: {
				username: string;
				password: string;
			};
			response: AuthRecord;
		};
	};
	'/users/auth/register': {
		POST: {
			query: never;
			body: User;
			response: AuthRecord;
		};
	};
	'/questions': {
		GET: {
			query: never;
			body: never;
			response: Question[];
		};
	};
	'/questions/answers': {
		POST: {
			query: never;
			body: {
				answers: string[];
			};
			response: {
				personality: string;
			};
		};
	};
};

export async function req<
	Path extends keyof RequestMap,
	Method extends keyof RequestMap[Path],
	T extends RequestMap[Path][Method]['response']
>(
	url: Path,
	method: Method,
	body?: RequestMap[Path][Method]['body'],
	query?: RequestMap[Path][Method]['query']
): Promise<T> {
	return (await (await fetch(`/api${url}`)).json()) as T;
}
