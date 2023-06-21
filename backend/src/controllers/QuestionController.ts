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
				questions q
				JOIN answers a ON q.id = a.question_id
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

		/*
			There are 4 pairs
			E or I
			S or N
			T or F
			J or P
			First Character is either E or I, depending on which is higher
			Second S or N, depending on which is higher
			and so on ...

			Get the personality from the sums
		*/

		let personality = "";

		if (sums.E > sums.I) {
			personality += "E";
		} else {
			personality += "I";
		}

		if (sums.S > sums.N) {
			personality += "S";
		} else {
			personality += "N";
		}

		if (sums.T > sums.F) {
			personality += "T";
		} else {
			personality += "F";
		}

		if (sums.J > sums.P) {
			personality += "J";
		} else {
			personality += "P";
		}


		// Return the personality
		return c.json({ personality });
	}
}
