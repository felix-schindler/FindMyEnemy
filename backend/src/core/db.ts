import { Surreal } from "surrealdb";

export default class Database extends Surreal {
	constructor() {
		super("http://localhost/db/rpc");
	}
}
