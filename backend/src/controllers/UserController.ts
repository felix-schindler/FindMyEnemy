import { Context, Env } from "hono/mod.ts";
import { decode, sign, verify } from "hono/utils/jwt/jwt.ts";
import { compare, hash } from "bcrypt";

import { AuthController } from "./Controller.ts";
import { db } from "../core/Database.ts";
import HttpError from "../core/HttpError.ts";
import { JWT_SECRET } from "../core/stores.ts";

import type { AuthUser, ClientUser, Status, User } from "../core/types.ts";

export default class UserController extends AuthController {
	public static readonly shared = new UserController();

	override async login(c: Context<Env, "/users/login">): Promise<Response> {
		const { username, password } = await c.req.json();

		if (!(username && password)) {
			throw new HttpError(400, "Missing user or password");
		}

		// Get user from database
		const dbUser = (await db.queryObject<User>(
			"SELECT * FROM user WHERE username = $user;",
			{ username },
		)).rows[0];

		// Check password
		if (!(await compare(password, dbUser.password))) {
			throw new HttpError(400, "Invalid password");
		}

		// @ts-ignore - Remove password from user object before sending it to the client
		delete dbUser.password;

		return c.json<AuthUser>({
			...dbUser,
			token: await sign(dbUser, JWT_SECRET),
		});
	}

	override async register(
		c: Context<Env, "/users">,
	): Promise<Response> {
		const { username, password, personality } = await c.req.json();

		if (!(username && password && personality)) {
			throw new HttpError(400, "Missing fields");
		}

		const user: User = {
			id: 0,
			username,
			password: await hash(password),
			personality,
		};

		const result = (await db.queryObject<{ id: number }>(
			"INSERT INTO user (username, password, personality) VALUES ($1, $2, $3) RETURNING id;",
			[user.username, user.password, user.personality],
		)).rows[0];

		return c.json<AuthUser>({
			id: result.id,
			username: user.username,
			personality: user.personality!,
			token: await sign(user, JWT_SECRET),
		});
	}

	async getList(c: Context<Env, "/users">): Promise<Response> {
		const token = c.req.header("Authorization");
		if (!token || !await verify(token, JWT_SECRET)) throw new HttpError(401);

		// Get user from JWT
		const user = decode(c.req.header("Authorization")!).payload as User;

		// Create query string
		const qStr =
			"SELECT id, username, personality FROM user WHERE personality != $personality;";

		// Get all users with different personality from database
		const users = (await db.queryObject<ClientUser>(qStr, {
			personality: user.personality,
		})).rows;

		return c.json<ClientUser[]>(users);
	}

	async get(c: Context<Env, "/users/:id">): Promise<Response> {
		const id = c.req.param("id");
		const user =
			(await db.queryObject<User>(`SELECT * FROM user WHERE id = $id;`, { id }))
				.rows[0];

		// @ts-ignore - Remove password from user object before sending it to the client
		delete dbUser.password;

		return c.json<ClientUser>(user);
	}

	update(_c: Context<Env, "/users/:id">): Promise<Response> {
		throw new HttpError(501);
	}

	replace(_c: Context<Env, "/users/:id">): Promise<Response> {
		throw new HttpError(501);
	}

	async delete(c: Context<Env, "/users/:id">): Promise<Response> {
		const token = c.req.header("Authorization");
		if (!token || !await verify(token, JWT_SECRET)) {
			throw new HttpError(401);
		}

		const id = c.req.param("id");
		const user_id: string = decode(token).payload.id;

		if (id !== user_id) throw new HttpError(403);

		const rowCount =
			(await db.queryObject(`DELETE FROM user WHERE id = $id;`, { user_id }))
				.rowCount ?? 0;
		const success = rowCount == 1;

		return c.json<Status>({
			status: success ? 200 : 500,
			msg: success ? "User deleted" : "Failed to delete user",
		});
	}
}
