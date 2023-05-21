export type User = {
	id: number;
	username: string;
	email: string;
	password: string;
	personality: string;
};

export type ClientUser = {
	id: number;
	username: string;
	email: string;
	personality: string;
};

export type AuthUser = {
	id: number;
	username: string;
	email: string;
	personality: string;
	token: string;
};

export type Question = {
	id: number;
	content: string;
	answers: Answer[];
	category_id: number;
};

type Answer = {
	id: number;
	content: string;
};

export type UserAnswer = {
	question_id: number; // Number between 0-34 (or maybe 1-35?)
	answer_id: number; // Number between 0-1 (or maybe 1-2?)
	category_id: number; // Number between 0-6 (or maybe 1-7?)
};
