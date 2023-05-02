import { Context, Env } from "hono/mod.ts";
import { decode, sign } from "hono/utils/jwt/jwt.ts";
import { compare, hash } from "bcrypt";

import { AuthController } from "./Controller.ts";
import { db } from "../core/Database.ts";
import HttpError from "../core/HttpError.ts";
import { JWT_SECRET } from "../core/stores.ts";

import type { ClientUser, UncreatedUser, User } from "../core/types.ts";

export default class UserController extends AuthController {
	public static readonly shared = new UserController();
	protected override readonly table = "users";

	override async login(c: Context<Env, "/users/auth">): Promise<Response> {
		const { user, password } = await c.req.json();

		if (!(user && password)) {
			throw new HttpError(400, "Missing user or password");
		}

		// Get user from database
		const dbUser = (await db.query<User>(
			"SELECT * FROM users WHERE email = $user OR username = $user",
			{ user },
		))[0];

		// Any error occured? Throw it to the next middleware!
		if (dbUser.error) throw dbUser.error;

		// Check password
		if (!(await compare(password, dbUser.result.password))) {
			throw new HttpError(400, "Invalid password");
		}

		// @ts-ignore - Remove password from user object before sending it to the client
		delete dbUser.result.password;

		return c.json({
			...dbUser.result,
			token: sign({ ...dbUser.result }, JWT_SECRET),
		});
	}

	override async register(
		c: Context<Env, "/users/auth/register">,
	): Promise<Response> {
		const { username, email, password, personality } = await c.req.json();

		if (!(username && email && password && personality)) {
			throw new HttpError(400, "Missing fields");
		}

		const user: UncreatedUser = {
			username,
			email,
			password: await hash(password),
			personality,
		};

		// FIXME: How to get the ID of the last insert?
		const id = await db.create<UncreatedUser>("users", user);
		user.id = id;

		return c.json<ClientUser>({
			id: user.id!,
			username: user.username,
			email: user.email,
			personality: user.personality!,
			token: await sign(user, JWT_SECRET),
		});
	}

	async getList(c: Context<Env, "/users">): Promise<Response> {
		// Get user from JWT
		const reqUser = decode(c.req.header("Authorization")!).payload as User;

		// Get all users with different personality from database
		const _users = await db.query<User>(
			"SELECT * FROM users WHERE personality != $personality",
			{
				personality: reqUser.personality,
			},
		);

		// Add the user to the array and check for errors
		const users: User[] = [];
		_users.map((u) => {
			if (u.result) users.push(u.result);
			else throw u.error;
		});

		return c.json(users);
	}

	async get(c: Context<Env, "/users/:id">): Promise<Response> {
		const id = c.req.param("id");
		const user = await db.select<User, string>(`users:${id}`);

		// @ts-ignore - Remove password from user object before sending it to the client
		delete dbUser.password;

		return c.json(user);
	}

	update(_c: Context<Env, "/users/:id">): Promise<Response> {
		throw new HttpError(501);
	}

	replace(_c: Context<Env, "/users/:id">): Promise<Response> {
		throw new HttpError(501);
	}

	async delete(c: Context<Env, "/users/:id">): Promise<Response> {
		const id = c.req.param("id");
		await db.delete(`users:${id}`);

		return c.json({ message: "User deleted" });
	}
}
