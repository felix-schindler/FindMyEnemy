// The most simple API answer
export class Status {
	status: number;
	msg: string;
	raw: unknown;

	public constructor(status: number, msg: string, raw: unknown) {
		this.status = status;
		this.msg = msg;
		this.raw = raw;
	}
}

export type User = {
	id: number;
	username: string;
	password: string;
	personality: string;
	compatibility?: number;
	enemyCategory?: string;
};

export type ClientUser = {
	id: number;
	username: string;
	personality: string;
	compatibility?: number;
	enemyCategory?: string;
};

export type AuthUser = ClientUser & {
	token: string;
};

export type Question = {
	id: number;
	content: string;
};

export type Category = "E" | "I" | "S" | "N" | "T" | "F" | "J" | "P";

export type Answer = {
	id: number;
	question_id: number;
	content: string;
	category: Category;
};

export type ClientQuestion = {
	id: number;
	content: string;
	answers: ClientAnswer[];
};

type ClientAnswer = {
	id: number;
	content: string;
	category: Category;
};

export type UserAnswer = {
	question_id: number; // Number between 0-34 (or maybe 1-35?)
	category: Category;
};

export type ClientChallenge = {
	id: number;
	user_1: {
		id: number;
		username: string;
		score: number;
		won: boolean;
	};
	user_2: {
		id: number;
		username: string;
		score: number;
		won: boolean;
	};
};

export type Challenge = {
	id: number;
	user_1_id: number;
	user_2_id: number;
	user_1_score: number;
	user_2_score: number;
};
