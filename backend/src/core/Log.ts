import { cyan, red, yellow } from "$std/fmt/colors.ts";

export default class Log {
	public static cwd = Deno.cwd();

	public static enabled = true;
	public static noFile = false;

	private static append(msg: string) {
		Deno.writeTextFile(`${this.cwd}/backend.log`, msg, { append: true });
	}

	static info(...message: unknown[]) {
		if (Log.enabled) {
			if (!Log.noFile) {
				Log.append(`[INFO] ${message.join(" ")}\n`);
			}
			console.log(cyan("[INFO]"), ...message);
		}
	}

	static warn(...message: unknown[]) {
		if (Log.enabled) {
			if (!Log.noFile) {
				Log.append(`[WARN] ${message.join(" ")}\n`);
			}
			console.warn(yellow("[WARN]"), ...message);
		}
	}

	static error(...message: unknown[]) {
		if (Log.enabled) {
			if (!Log.noFile) {
				Log.append(`[ERROR] ${message.join(" ")}\n`);
			}
			console.error(red("[ERROR]"), ...message);
		}
	}
}
