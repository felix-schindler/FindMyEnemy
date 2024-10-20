import { Client } from "postgres";

class Database extends Client {
	public static shared = new Database();

	private constructor() {
		super({
			user: "postgres",
			password: "DnxctEotDlNsk3FuOoVm",
			database: "postgres",
			hostname: Deno.env.get("CI")
				? "postgres"
				: Deno.env.get("DEV")
				? "localhost"
				: "db",
			port: 5432,
		});
	}
}

export const db = Database.shared;
