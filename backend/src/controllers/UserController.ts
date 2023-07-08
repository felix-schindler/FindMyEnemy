import { Context, Env } from "hono/mod.ts";
import { sign } from "hono/utils/jwt/jwt.ts";
import { compare, hash } from "bcrypt";

import { AuthController } from "./Controller.ts";
import { db } from "../core/Database.ts";
import HttpError from "../core/HttpError.ts";
import { JWT_SECRET } from "../core/stores.ts";
import { verify } from "../core/auth.ts";

import type { AuthUser, ClientUser, Status, User } from "../core/types.ts";

export default class UserController extends AuthController {
	public static readonly shared = new UserController();

	override async login(c: Context<Env, "/users/login">): Promise<Response> {
		const { username, password } = await c.req.json();

		if (!(username && password)) {
			throw new HttpError(400, "Missing username or password");
		}

		// Get user from database
		const dbUser = (await db.queryObject<User>(
			"SELECT * FROM users WHERE username = $1;",
			[username],
		)).rows[0];

		// Check password
		if (!(await compare(password, dbUser.password))) {
			throw new HttpError(400, "Invalid password");
		}

		const cUser: ClientUser = {
			id: dbUser.id,
			username: dbUser.username,
			personality: dbUser.personality,
		};

		return c.json<AuthUser>({
			...cUser,
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
			id: 0, // This will be set by the database
			username,
			password: await hash(password),
			personality,
		};

		const insert = (await db.queryObject<{ id: number }>(
			"INSERT INTO users (username, password, personality) VALUES ($1, $2, $3) RETURNING id;",
			[user.username, user.password, user.personality],
		)).rows[0];

		const cUser: ClientUser = {
			id: insert.id,
			username: user.username,
			personality: user.personality,
		};

		return c.json<AuthUser>({
			...cUser,
			token: await sign(cUser, JWT_SECRET),
		}, { status: 201 });
	}

	async getList(c: Context<Env, "/users">): Promise<Response> {
		const token = c.req.header("Authorization");
		const user = await verify(token);
		const search = c.req.query("q");

		const frenemies = c.req.query("frenemies") !== undefined;
		if (frenemies) {
			let where = "WHERE f.user_id = $1";
			const params = [String(user.id)];

			if (search) {
				where += ` AND username LIKE '%' || $2 || '%'`;
				params.push(search);
			}

			// Get all users that the user saved as frenemy
			const users = (await db.queryObject<ClientUser>(
				`
				SELECT u.id, u.username, u.personality
				FROM users u
				JOIN frenemies f ON u.id = f.enemy_id
				${where}
			`,
				params,
			)).rows;
			return c.json<ClientUser[]>(users);
		}

		// Build where clause and query parameters
		const where: string[] = [], params: string[] = [];

		// Get search query from url, if set
		if (search) {
			params.push(search);
			where.push(`username LIKE '%' || $${params.length} || '%'`);
		} else {
			params.push(user.personality); // Get user from JWT and set param
			where.push(`personality != $${params.length}`);
		}

		// Create query string
		const qStr = `SELECT id, username, personality FROM users WHERE (${
			where.join(") AND (")
		});`;
		console.log(qStr, params);

		// Get all users with different personality from database
		const users = (await db.queryObject<ClientUser>(qStr, params)).rows;

		return c.json<ClientUser[]>(users);
	}

	async get(c: Context<Env, "/users/:id">): Promise<Response> {
		const id = c.req.param("id");
		const user = (await db.queryObject<ClientUser>(
			`SELECT id, username, personality FROM users WHERE id = $1;`,
			[id],
		))
			.rows[0];

		return c.json<ClientUser>(user);
	}

	async update(c: Context<Env, "/users/:id">): Promise<Response> {
		// Check if user is authenticated
		const token = c.req.header("Authorization");
		const user = await verify(token);
		const id = Number(c.req.param("id"));

		// Check if user is trying to update another user
		if (id !== user.id) {
			throw new HttpError(403, `${user.id} is not allowed to update ${id}`);
		}

		const { username, password, personality } = await c.req.json();
		if (!(username || password || personality)) {
			throw new HttpError(400, "Missing fields");
		}

		// Build update query string paying attention to which fields are being updated
		let qStr = "UPDATE users SET ";
		if (username) qStr += "username = $username, ";
		if (password) qStr += "password = $password, ";
		if (personality) qStr += "personality = $personality, ";
		qStr = qStr.slice(0, -2);
		qStr += " WHERE id = $id;";

		// Build query parameters paying attention to which fields are being updated
		const qParams = {
			id,
			username,
			password: await hash(password ?? ""),
			personality,
		};

		// Execute query
		const rowCount = (await db.queryObject(qStr, qParams)).rowCount ?? 0;
		const success = rowCount == 1;

		// Build response
		const cUser: ClientUser = {
			id: qParams.id,
			username: qParams.username ?? user.username,
			personality: qParams.personality ?? user.personality,
		};

		return c.json<Status>({
			status: success ? 200 : 500,
			msg: success ? "User updated" : "Failed to update user",
			raw: {
				rowCount,
				user: success
					? {
						...cUser,
						token: await sign(cUser, JWT_SECRET),
					}
					: undefined,
			},
		});
	}

	async replace(c: Context<Env, "/users/:id">): Promise<Response> {
		// Check authentication and access
		const token = c.req.header("Authorization");
		const user = await verify(token);
		const id = Number(c.req.param("id"));

		// Check if user is trying to update another user
		if (id !== user.id) {
			throw new HttpError(403, `${user.id} is not allowed to update ${id}`);
		}

		// Update user in database
		const { username, password, personality } = await c.req.json();
		if (!(username && password && personality)) {
			throw new HttpError(400, "Missing fields");
		}

		const qStr =
			"UPDATE users SET username = $username, password = $password, personality = $personality WHERE id = $id;";
		const rowCount = (await db.queryObject(qStr, {
			id,
			username,
			password: await hash(password),
			personality,
		})).rowCount ?? 0;
		const success = rowCount == 1;

		// Build response
		const cUser: ClientUser = {
			id,
			username,
			personality,
		};

		return c.json<Status>({
			status: success ? 200 : 500,
			msg: success ? "User updated" : "Failed to update user",
			raw: {
				rowCount,
				user: success
					? {
						...cUser,
						token: await sign(cUser, JWT_SECRET),
					}
					: undefined,
			},
		});
	}

	async delete(c: Context<Env, "/users/:id">): Promise<Response> {
		const token = c.req.header("Authorization");
		const user_id = (await verify(token)).id;
		const id = Number(c.req.param("id"));

		if (id !== user_id) {
			throw new HttpError(403, `${user_id} is not allowed to delete ${id}`);
		}

		const rowCount =
			(await db.queryObject(`DELETE FROM users WHERE id = $1; `, [user_id]))
				.rowCount ?? 0;
		const success = rowCount == 1;

		return c.json<Status>({
			status: success ? 200 : 500,
			msg: success ? "User deleted" : "Failed to delete user",
			raw: { rowCount },
		});
	}

	async toggleFav(c: Context<Env, "/users/:id/fav">): Promise<Response> {
		const token = c.req.header("Authorization");
		const user_id = (await verify(token)).id;
		const enemy_id = Number(c.req.param("id"));
		let status = 500;

		const delQuery =
			`DELETE FROM frenemies WHERE user_id = $1 AND enemy_id = $2;`;
		let rowCount =
			(await db.queryObject(delQuery, [user_id, enemy_id])).rowCount ?? 0;
		let success = rowCount == 1;
		if (success) {
			status = 200;
		}

		if (rowCount === 0) {
			const insQuery =
				`INSERT INTO frenemies (user_id, enemy_id) VALUES ($1, $2);`;
			rowCount =
				(await db.queryObject(insQuery, [user_id, enemy_id])).rowCount ?? 0;
			success = rowCount == 1;
			if (success) {
				status = 201;
			}
		}

		const msg = success
			? (status == 200 ? "Frenemy removed" : "Frenemy added")
			: "Failed to toggle frenemy";
		return c.json<Status>({
			status,
			msg: msg,
			raw: { rowCount },
		}, { status, statusText: msg });
	}
}
