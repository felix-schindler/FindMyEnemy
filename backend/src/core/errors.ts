import { HTTPException } from "hono/http-exception.ts";
import type { StatusCode } from "hono/utils/http-status.ts";

export default class HttpError extends HTTPException {
	constructor(status: StatusCode, message?: string) {
		super(status, { message });
	}

	getResponse(): Response {
		return Response.json({
			status: this.status,
			message: this.message,
			raw: this,
		}, {
			status: this.status,
			statusText: this.message,
		});
	}
}
