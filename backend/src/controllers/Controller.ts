import type { Context } from "hono/mod.ts";

export default abstract class Controller {
	protected constructor() {}
}

export abstract class AuthController extends Controller {
	public abstract login(c: Context): Promise<Response>;
	public abstract register(c: Context): Promise<Response>;
}
