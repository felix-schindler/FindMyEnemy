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
		});
	}

	async getList(c: Context<Env, "/users">): Promise<Response> {
		const token = c.req.header("Authorization");
		const user = await verify(token);

		let where: string, param: string;

		// Get search query from url, if set
		const search = c.req.query("q");
		if (search) {
			where = "WHERE username LIKE '%' || $1 || '%'";
			param = search;
		} else {
			where = "WHERE personality != $1";
			param = user.personality; // Get user from JWT and set param
		}

		// Create query string
		const qStr = `SELECT id, username, personality FROM users ${where};`;

		// Get all users with different personality from database
		const users = (await db.queryObject<ClientUser>(qStr, [param])).rows;

		// Create query to get compatibility percentages
		const compatibilityQuery = `
		SELECT 
			CASE WHEN pt1."type" = $1 THEN pt2."type" ELSE pt1."type" END as personality_type,
			c.percentage
		FROM compatibilities as c
		JOIN personality_types as pt1 ON c.personality_type_1_id = pt1.id
		JOIN personality_types as pt2 ON c.personality_type_2_id = pt2.id
		WHERE pt1."type" = $1 OR pt2."type" = $1;
		`;

		console.log(user.personality);
		
		const compatibilityMap = new Map<string, number>();
		
		const compatibilities = await db.queryObject<{ personality_type: string, percentage: number }>(compatibilityQuery, [user.personality]);
		
		// Add compatibility percentage to each user
		for (let user of users) {
		user.compatibility = compatibilityMap.get(user.personality) || 0;
		}

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
}
