import { cyan, yellow, red } from "$std/fmt/colors.ts";

// Save all logs to backend.log file in current directory
const cwd = Deno.cwd();
function append(msg: string) {
	Deno.writeTextFile(`${cwd}/backend.log`, msg, { append: true });
}

export function info(...message: unknown[]) {
	append(`[INFO] ${message.join(" ")}\n`);
	console.log(cyan("[INFO]"), ...message);
}

export function warn(...message: unknown[]) {
	append(`[INFO] ${message.join(" ")}\n`);
	console.warn(yellow("[WARN]"), ...message);
}

export function error(...message: unknown[]) {
	append(`[INFO] ${message.join(" ")}\n`);
	console.error(red("[ERROR]"), ...message);
}
