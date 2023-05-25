import type { Context, Env } from "hono/mod.ts";

import Controller from "./Controller.ts";
import { db } from "../core/Database.ts";
import HttpError from "../core/HttpError.ts";

import { Challenge, ClientUser, Status } from "../core/types.ts";
import { JWT_SECRET } from "../core/stores.ts";
import { decode, verify } from "hono/utils/jwt/jwt.ts";

export default class ChallengeController extends Controller {
	public static readonly shared = new ChallengeController();

	public async getList(c: Context<Env, "/challenges">): Promise<Response> {
		// Check token and get user id from token
		const token = c.req.header("Authorization");
		if (!(token && await verify(token, JWT_SECRET))) {
			throw new HttpError(401);
		}

		const user = decode(token).payload as ClientUser;

		// Get all challenges from database where the user is involved
		const challenges = (await db.queryObject<Challenge>(
			"SELECT * FROM challenges WHERE user_1_id = $1 OR user_2_id = $1;",
			[user.id],
		)).rows;

		return c.json<Challenge[]>(challenges);
	}

	public async create(c: Context<Env, "/challenges">): Promise<Response> {
		// Check token and get user id from token
		const token = c.req.header("Authorization");
		if (!(token && await verify(token, JWT_SECRET))) {
			throw new HttpError(401);
		}

		// Get challenge from req body
		const user_self: number = decode(token).payload.id;
		const { score, challengee } = await c.req.json();

		const insert = (await db.queryObject<{ id: number }>(
			"INSERT INTO challenges (user_1_id, user_2_id, user_1_score) VALUES ($1, $2, $3) RETURNING id;",
			[user_self, challengee, score],
		)).rows[0];

		return c.json<Challenge>({
			id: insert.id,
			user_1_id: user_self,
			user_2_id: challengee,
			user_1_score: score,
			user_2_score: 0,
		});
	}

	public async get(c: Context<Env, "/challenges/:id">): Promise<Response> {
		// Check token and get user id from token
		const token = c.req.header("Authorization");
		if (!(token && await verify(token, JWT_SECRET))) {
			throw new HttpError(401);
		}

		const id = c.req.param("id");
		const user = decode(token).payload as ClientUser;

		// Get challenge from database where the user is involved
		const challenge = (await db.queryObject<Challenge>(
			"SELECT * FROM challenges WHERE (user_1_id = $1 OR user_2_id = $1) AND id = $2;",
			[user.id, id],
		)).rows[0];

		return c.json<Challenge>(challenge);
	}

	public async update(c: Context<Env, "/challenges/:id">): Promise<Response> {
		// Check token and get user id from token
		const token = c.req.header("Authorization");
		if (!(token && await verify(token, JWT_SECRET))) {
			throw new HttpError(401);
		}

		// Get challenge from req body
		const id = c.req.param("id");
		const user_self: number = decode(token).payload.id;

		// Update challenge score
		const { score } = await c.req.json();
		let rowCount = (await db.queryObject<Challenge>(
			"UPDATE challenges SET user_1_score = $1 WHERE id = $3 AND user_1_score = 0 AND user_1_id = $2;",
			[score, user_self, id],
		)).rowCount ?? 0;

		if (rowCount === 0) {
			rowCount = (await db.queryObject<Challenge>(
				"UPDATE challenges SET user_2_score = $1 WHERE id = $3 AND user_2_score = 0 AND user_2_id = $2;",
				[score, user_self, id],
			)).rowCount ?? 0;
		}

		const success = rowCount == 1;

		return c.json<Status>({
			status: success ? 200 : 500,
			msg: success
				? "Challenge updated successfully"
				: "Failed to update challenge",
			raw: { rowCount },
		});
	}

	public async delete(c: Context<Env, "/challenges/:id">): Promise<Response> {
		// Check token and get user id from token
		const token = c.req.header("Authorization");
		if (!(token && await verify(token, JWT_SECRET))) {
			throw new HttpError(401);
		}

		// Get challenge from req body
		const id = c.req.param("id");
		const user_self: number = decode(token).payload.id;

		// Delete challenge
		const rowCount = (await db.queryObject<Challenge>(
			"DELETE FROM challenges WHERE id = $1 AND (user_1_id = $2 OR user_2_id = $2);",
			[id, user_self],
		)).rowCount ?? 0;
		const success = rowCount == 1;

		return c.json<Status>({
			status: success ? 200 : 500,
			msg: success
				? "Challenge deleted successfully"
				: "Failed to delete challenge",
			raw: { rowCount },
		});
	}
}
