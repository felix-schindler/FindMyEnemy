import { verify as verifyJwt } from "hono/utils/jwt/jwt.ts";
import { JWT_SECRET } from "./stores.ts";
import HttpError from "./HttpError.ts";
import { AuthUser } from "./types.ts";

/**
 * @param token Authorization token
 * @throws HttpError.UNAUTHORIZED when token is invalid
 * @returns Payload of the token
 */
export async function verify(token?: string): Promise<AuthUser> {
	if (!token) throw HttpError.UNAUTHORIZED;

	try {
		const valid = await verifyJwt(token ?? "", JWT_SECRET) as AuthUser;
		return valid;
	} catch {
		// We throw a new Error anyways
		throw HttpError.UNAUTHORIZED;
	}
}
