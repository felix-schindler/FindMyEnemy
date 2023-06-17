import { HTTPException } from "hono/http-exception.ts";
import type { StatusCode } from "hono/utils/http-status.ts";
import type { Status } from "./types.ts";

export default class HttpError extends HTTPException {
	public static readonly UNAUTHORIZED = new HttpError(401, "Unauthorized");
	public static readonly INTERNAL = new HttpError(500, "Internal Server Error");

	constructor(status: StatusCode, message?: string) {
		super(status, { message });
	}

	public getResponse(): Response {
		const body: Status = {
			status: this.status,
			msg: this.message,
			raw: this,
		};

		return Response.json(body, {
			status: this.status,
			statusText: this.message,
		});
	}
}
