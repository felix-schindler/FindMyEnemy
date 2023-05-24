export interface Status {
	status: number;
	message: string;
	raw: unknown;
}

// "Database" types
type Base = {
	id: number;
};

// Needs password when using an auth route
export type User = Base & {
	username: string;
	personality: string;
};

export type AuthUser = User & {
	token: string;
};

type Category = 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P';

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
