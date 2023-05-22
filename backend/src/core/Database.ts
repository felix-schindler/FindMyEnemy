import { Client } from "postgres";
import Log from "./Log.ts";

export default class Database extends Client {
	public static shared = new Database();

	private constructor() {
		Log.info("DB", "Connecting");

		super({
			user: "postgres",
			password: "DnxctEotDlNsk3FuOoVm",
			database: "postgres",
			hostname: Deno.env.get("DEV") ? "localhost" : "db",
			port: 5432,
		});
	}
}

export const db = Database.shared;
