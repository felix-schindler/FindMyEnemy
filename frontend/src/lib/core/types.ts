export class Status {
	status: number;
	msg: string;
	raw: unknown;

	public constructor(status: number, message: string, raw: unknown) {
		this.status = status;
		this.msg = message;
		this.raw = raw;
	}
}

// "Database" types
type Base = {
	id: number;
};

// Needs password when using an auth route
export type User = Base & {
	username: string;
	personality: string;
	compatibility?: number;
	enemyCategory?: string;
};

export type AuthUser = User & {
	token: string;
};

export type Category = 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P';

export type Question = {
	id: number;
	content: string;
	answers: Answer[];
};

type Answer = {
	id: number;
	content: string;
	category: Category;
};

export type UserAnswer = {
	question_id: number;
	category: Category;
};

export type Challenge = {
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

export type DBChallenge = {
	id: number;
	user_1_id: number;
	user_2_id: number;
	user_1_score: number;
	user_2_score: number;
};
