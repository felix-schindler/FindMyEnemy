// Base records
export type Record = {
	id: string;
};

// User records (auth)
export type AuthRecord = Record & {
	email: string;
	name: string;
	jwt: string;
};

// Custom records
export type Question = Record & {
	question: string;
	answers: string[];
};

export type User = Record & {
	email: string;
	name: string;
};
