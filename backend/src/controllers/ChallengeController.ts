import type { Context, Env } from "hono/mod.ts";

import Controller from "./Controller.ts";
import { db } from "../core/Database.ts";

import { Challenge, ClientChallenge, Status } from "../core/types.ts";
import { verify } from "../core/auth.ts";

export default class ChallengeController extends Controller {
	public static readonly shared = new ChallengeController();

	public async getList(c: Context<Env, "/challenges">): Promise<Response> {
		// Check token and get user id from token
		const token = c.req.header("Authorization");
		const user = await verify(token);

		// Get query parameters
		const pending = c.req.query("pending") !== undefined;
		const finished = c.req.query("finished") !== undefined;

		// Fetch challenges with usernames, scores, and winner information in a single query
		let whereStr = "";

		if (pending) {
			whereStr = "(c.user_1_score = 0 OR c.user_2_score = 0) AND";
		} else if (finished) {
			whereStr = "(c.user_1_score <> 0 AND c.user_2_score <> 0) AND";
		}

		const query = `
			SELECT json_agg(json_build_object(
				'id', c.id,
				'user_1', json_build_object(
					'id', u1.id,
					'username', u1.username,
					'score', c.user_1_score,
					'won', (c.user_1_id = $1 AND c.user_1_score > c.user_2_score)
				),
				'user_2', json_build_object(
					'id', u2.id,
					'username', u2.username,
					'score', c.user_2_score,
					'won', (c.user_2_id = $1 AND c.user_2_score > c.user_1_score)
				)
			)) AS challenges
			FROM challenges c
			JOIN users u1 ON c.user_1_id = u1.id
			JOIN users u2 ON c.user_2_id = u2.id
			WHERE ${whereStr} c.user_1_id = $1 OR c.user_2_id = $1;
		`;

		const challenges: ClientChallenge[] =
			// @ts-ignore It works.
			(await db.queryObject(query, [user.id])).rows[0].challenges;
		return c.json<ClientChallenge[]>(challenges);
	}

	public async create(c: Context<Env, "/challenges">): Promise<Response> {
		// Check token and get user id from token
		const token = c.req.header("Authorization");
		const user_self = (await verify(token)).id;

		// Get challenge from req body
		const { score, challengee } = await c.req.json();

		const insert = (await db.queryObject<{ id: number }>(
			"INSERT INTO challenges (user_1_id, user_2_id, user_1_score) VALUES ($1, $2, $3) RETURNING id;",
			[user_self, challengee, score],
		)).rows[0];

		return c.json<Status>({
			status: 200,
			msg: "Challenge created",
			raw: insert.id,
		});
	}

	public async get(c: Context<Env, "/challenges/:id">): Promise<Response> {
		// Check token and get user id from token
		const token = c.req.header("Authorization");
		const user = await verify(token);
		const id = c.req.param("id");

		// Get challenge from database where the user is involved
		const query = `
			SELECT
				c.id,
				json_build_object(
					'id', u1.id,
					'username', u1.username,
					'score', c.user_1_score,
					'won', (c.user_1_id = $1 AND c.user_1_score > c.user_2_score)
				) as user_1,
				json_build_object(
					'id', u2.id,
					'username', u2.username,
					'score', c.user_2_score,
					'won', (c.user_2_id = $1 AND c.user_2_score > c.user_1_score)
				) as user_2
			FROM challenges c
			JOIN users u1 ON c.user_1_id = u1.id
			JOIN users u2 ON c.user_2_id = u2.id
			WHERE (c.user_1_id = $1 OR c.user_2_id = $1) AND c.id = $2;
		`;

		const challenge: ClientChallenge =
			(await db.queryObject<ClientChallenge>(query, [user.id, id])).rows[0];

		return c.json<ClientChallenge>(challenge);
	}

	public async replace(c: Context<Env, "/challenges/:id">): Promise<Response> {
		// Check token and get user id from token
		const token = c.req.header("Authorization");
		const user_self = (await verify(token)).id;
		const id = c.req.param("id");

		// Get challenge from req body
		const { user_1_id, user_2_id, user_1_score, user_2_score } = await c.req
			.json<Challenge>();

		// Check if request body is valid
		if (!user_1_id || !user_2_id || !user_1_score || !user_2_score) {
			return c.json<Status>({
				status: 400,
				msg: "Invalid challenge",
				raw: undefined,
			});
		}

		// Update challenge
		const updateQuery = `
			UPDATE challenges
			SET user_1_id = $1, user_2_id = $2, user_1_score = $3, user_2_score = $4
			WHERE id = $5 AND (user_1_id = $6 OR user_2_id = $6);
		`;

		const { rowCount } = await db.queryObject(updateQuery, [
			user_1_id,
			user_2_id,
			user_1_score,
			user_2_score,
			id,
			user_self,
		]);

		if (rowCount === 0) {
			return c.json<Status>({
				status: 400,
				msg:
					"Failed to update challenge. Either the challenge doesn't exist or you don't have permission to update it.",
				raw: undefined,
			});
		}

		return c.json<Status>({
			status: 200,
			msg: "Challenge updated",
			raw: undefined,
		});
	}

	public async update(c: Context<Env, "/challenges/:id">): Promise<Response> {
		// Check token and get user id from token
		const token = c.req.header("Authorization");
		const user_self = (await verify(token)).id;
		const id = c.req.param("id");

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
		const user_self = (await verify(token)).id;
		const id = c.req.param("id");

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
