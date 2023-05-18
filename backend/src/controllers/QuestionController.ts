import type { Context, Env } from "hono/mod.ts";

import Controller from "./Controller.ts";
import { db } from "../core/Database.ts";
import HttpError from "../core/HttpError.ts";

import type { Question, UserAnswer } from "../core/types.ts";

export default class QuestionController extends Controller {
	public static readonly shared = new QuestionController();
	protected override readonly table = "questions";

	public async getList(c: Context<Env, "/questions">): Promise<Response> {
		const questions = await db.select<Question, string>(this.table);
		return c.json(questions);
	}

	public async personality(
		c: Context<Env, "/questions/personality">,
	): Promise<Response> {
		const userAnswers = await c.req.json() as UserAnswer[];

		if (!userAnswers) throw new HttpError(400, "Missing user answers");

		// Sum up answers
		const sums: Record<number, number[]> = {};
		userAnswers.map((a) => {
			// Init array if it doesn't exist
			if (!sums[a.category_id]) sums[a.category_id] = [0, 0];

			// Add answer to array
			sums[a.category_id][a.answer_id]++;
		});

		// Calculate personality
		const personaliyScores = {
			E: sums[0][0],
			I: sums[0][1],
			S: sums[1][0] + sums[2][0],
			N: sums[1][1] + sums[2][1],
			T: sums[3][0] + sums[4][0],
			F: sums[3][1] + sums[4][1],
			J: sums[5][0] + sums[6][0],
			P: sums[5][1] + sums[6][1],
		};

		// Get which letter has the hightest score
		const personality = Object.keys(personaliyScores).reduce((a, b) =>
			// TODO: I don't know if this works, let me test it first
			// @ts-ignore - I don't know if this works, let me test it first
			personaliyScores[a] > personaliyScores[b] ? a : b
		);

		return c.text(personality);
	}
}
