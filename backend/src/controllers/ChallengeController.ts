import type { Context, Env } from "hono/mod.ts";

import Controller from "./Controller.ts";
import { db } from "../core/Database.ts";
import HttpError from "../core/HttpError.ts";

import { Challange, ClientUser, Status } from "../core/types.ts";
import { JWT_SECRET } from "../core/stores.ts";
import { decode, verify } from "hono/utils/jwt/jwt.ts";

export default class ChallangeController extends Controller {
	public static readonly shared = new ChallangeController();

	public async getList(c: Context<Env, "/challanges">): Promise<Response> {
		// Check token and get user id from token
		const token = c.req.header("Authorization");
		if (!(token && await verify(token, JWT_SECRET))) {
			throw new HttpError(401);
		}

		const user = decode(token).payload as ClientUser;

		// Get all challanges from database where the user is involved
		const challanges = (await db.queryObject<Challange>(
			"SELECT * FROM challanges WHERE user_1_id = $1 OR user_2_id = $1;",
			[user.id],
		)).rows;

		return c.json<Challange[]>(challanges);
	}

	public async create(c: Context<Env, "/challanges">): Promise<Response> {
		// Check token and get user id from token
		const token = c.req.header("Authorization");
		if (!(token && await verify(token, JWT_SECRET))) {
			throw new HttpError(401);
		}

		// Get challange from req body
		const user_self: number = decode(token).payload.id;
		const { score, challangee } = await c.req.json();

		const insert = (await db.queryObject<{ id: number }>(
			"INSERT INTO challanges (user_1_id, user_2_id, user_1_score) VALUES ($1, $2, $3) RETURNING id;",
			[user_self, challangee, score],
		)).rows[0];

		return c.json<Challange>({
			id: insert.id,
			user_1_id: user_self,
			user_2_id: challangee,
			user_1_score: score,
			user_2_score: 0,
		});
	}

	public async get(c: Context<Env, "/challanges/:id">): Promise<Response> {
		// Check token and get user id from token
		const token = c.req.header("Authorization");
		if (!(token && await verify(token, JWT_SECRET))) {
			throw new HttpError(401);
		}

		const id = c.req.param("id");
		const user = decode(token).payload as ClientUser;

		// Get challange from database where the user is involved
		const challange = (await db.queryObject<Challange>(
			"SELECT * FROM challanges WHERE (user_1_id = $1 OR user_2_id = $1) AND id = $2;",
			[user.id, id],
		)).rows[0];

		return c.json<Challange>(challange);
	}

	public async update(c: Context<Env, "/challanges/:id">): Promise<Response> {
		// Check token and get user id from token
		const token = c.req.header("Authorization");
		if (!(token && await verify(token, JWT_SECRET))) {
			throw new HttpError(401);
		}

		// Get challange from req body
		const id = c.req.param("id");
		const user_self: number = decode(token).payload.id;

		// Update challange score
		const { score } = await c.req.json();
		const rowCount = (await db.queryObject<Challange>(
			`
			UPDATE challanges SET user_1_score = $1 WHERE user_1_id = $2 AND id = $3;
			UPDATE challanges SET user_2_score = $1 WHERE user_2_id = $2 AND id = $3;
			`,
			[score, user_self, id],
		)).rowCount ?? 0;
		const success = rowCount == 1;

		return c.json<Status>({
			status: success ? 200 : 500,
			msg: success
				? "Challange updated successfully"
				: "Failed to update challange",
			raw: undefined,
		});
	}
}
