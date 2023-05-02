import { Surreal } from "surrealdb";
import Log from "./log.ts";

export default class Database extends Surreal {
	public static shared = new Database();

	private constructor() {
		Log.info("DB", "Connecting");
		super("http://localhost/db/rpc");
		this.signin({
			NS: "fme",
			DB: "fme",
			user: "fme",
			pass: "ba7825d4",
		});
	}
}
