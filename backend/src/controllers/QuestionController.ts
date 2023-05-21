import type { Context, Env } from "hono/mod.ts";

import Controller from "./Controller.ts";
import { db } from "../core/Database.ts";
import HttpError from "../core/HttpError.ts";

import type { Category, ClientQuestion, UserAnswer } from "../core/types.ts";

export default class QuestionController extends Controller {
	public static readonly shared = new QuestionController();

	public async getList(c: Context<Env, "/questions">): Promise<Response> {
		// Get questions with their answers from database
		const dbQuestions = (await db.queryObject<ClientQuestion>(`
			SELECT
				q.id,
				q.content,
				jsonb_agg(jsonb_build_object(
					'id', a.id,
					'content', a.content,
					'category', a.category
				)) AS answers
			FROM
				question q
				JOIN answer a ON q.id = a.question_id
			GROUP BY
				q.id, q.content
			ORDER BY
				q.id ASC;
		`)).rows;

		return c.json<ClientQuestion[]>(dbQuestions);
	}

	public async personality(
		c: Context<Env, "/questions/personality">,
	): Promise<Response> {
		const userAnswers = await c.req.json() as UserAnswer[];

		// Validate user answers
		if (!userAnswers || userAnswers.length < 35) {
			throw new HttpError(400, "Missing user answers");
		}

		// Sum up answers
		const sums: Record<Category, number> = {
			E: 0,
			I: 0,
			S: 0,
			N: 0,
			T: 0,
			F: 0,
			J: 0,
			P: 0,
		};

		userAnswers.map((a) => {
			sums[a.category]++;
		});

		// Get which letter has the hightest score
		const personality =
			Object.entries(sums).reduce((a, b) => a[1] > b[1] ? a : b)[0];

		// Return the personality
		return c.text(personality);
	}
}
