// Base records
export type Record = {
	id: string;
};

// User records (auth)
export type AuthRecord = Record & {
	email: string;
	username: string;
	personality: string;
	jwt: string;
};

// Custom records
export type Question = Record & {
	question: string;
	answers: string[];
};

export type User = Record & {
	email: string;
	username: string;
	personality: string;
};
