// The most simple API answer
export type Status = {
	success: boolean;
	message: string;
};

export type User = {
	id: number;
	username: string;
	password: string;
	personality: string;
};

export type ClientUser = {
	id: number;
	username: string;
	personality: string;
};

export type AuthUser = {
	id: number;
	username: string;
	personality: string;
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
