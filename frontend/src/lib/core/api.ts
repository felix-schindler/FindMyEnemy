import { get } from 'svelte/store';
import { authStore } from './stores';
import type { AuthRecord, Record as SomeRecord } from './types';

type Collection = 'users' | 'questions' | 'answers';
enum HttpMethod {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	PATCH = 'PATCH',
	DELETE = 'DELETE'
}

class CrudService {
	public static shared: CrudService = new CrudService();

	private URL = 'http://localhost/api';
	private constructor() {}

	/**
	 * Makes a request to the API
	 *
	 * @param method HTTP method
	 * @param suffix Can be any string, but is usually an ID
	 * @param body When creating or updating a record, the body is required
	 * @returns The JSON data of the response, parsed as an object
	 */
	public async req(method: HttpMethod, path: string[], body?: any): Promise<unknown> {
		body = body ? JSON.stringify(body) : null;

		const res = await fetch(this.URL + path.join('/'), {
			method,
			body,
			headers: {
				'Content-Type': 'application/json',
				Authorization: get(authStore)?.jwt ?? ''
			}
		});

		return await res.json();
	}
}

class CollectionService {
	constructor(protected collection: Collection) {}

	/**
	 * @param id of the record to get
	 * @returns The record with the given ID
	 */
	async get<T extends SomeRecord>(id: string): Promise<T> {
		return (await CrudService.shared.req(HttpMethod.GET, [this.collection, id])) as T;
	}

	/**
	 * @returns All records in the collection
	 */
	async getList<T extends SomeRecord>(): Promise<T[]> {
		return (await CrudService.shared.req(HttpMethod.GET, [this.collection])) as T[];
	}

	/**
	 * Creates a new record in the collection
	 * @param body Data of the new record
	 * @returns The created record
	 */
	async create<T extends SomeRecord>(body: any): Promise<T> {
		return (await CrudService.shared.req(HttpMethod.POST, [this.collection], body)) as T;
	}

	/**
	 * Updates a record by completely replacing it in the collection
	 * @param id of the record to replace
	 * @param body New data
	 * @returns The updated record
	 */
	async replace<T extends SomeRecord>(id: string, body: T): Promise<T> {
		return (await CrudService.shared.req(HttpMethod.PUT, [this.collection, id])) as T;
	}

	/**
	 * Updates a record in the collection
	 * @param id of the record to update
	 * @param body New data
	 * @returns The updated record
	 */
	async update<T extends SomeRecord>(id: string, body: any): Promise<T> {
		return (await CrudService.shared.req(HttpMethod.PATCH, [this.collection, id])) as T;
	}

	/**
	 * Deletes a record from the collection
	 * @param id of the record to delete
	 */
	async delete(id: string): Promise<void> {
		await CrudService.shared.req(HttpMethod.DELETE, [this.collection, id]);
	}
}

class AuthService extends CollectionService {
	/**
	 * Save user data to authStore (including JWT)
	 * @param user E-Mail or Username
	 * @param pass Password
	 */
	protected async login(user: string, pass: string): Promise<void> {
		const _user = (await CrudService.shared.req(HttpMethod.POST, ['auth'], {
			user,
			pass
		})) as AuthRecord;
		authStore.set(_user);
	}
}

const services: Record<Collection, CollectionService> = {
	users: new AuthService('users'),
	questions: new CollectionService('questions'),
	answers: new CollectionService('answers')
};

export default function collection(collection: Collection): CollectionService {
	return services[collection];
}
