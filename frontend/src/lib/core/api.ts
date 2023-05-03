type User = {
	id: number;
	username: string;
	email: string;
	personality: string;
};

type Question = {
	question: string;
	answers: string[];
};

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
	return await (await fetch(`/api${url}`)).json() as T;
}
