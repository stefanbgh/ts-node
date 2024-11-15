import { ICookieOptions } from "../ts/interfaces/ICookieOptions";
import { SameSite } from "../ts/types/SameSite";

export const cookieOptions: ICookieOptions = {
	httpOnly: process.env.COOKIE_HTTP_ONLY === "true",
	sameSite: process.env.COOKIE_SAME_SITE as SameSite,
	secure: process.env.COOKIE_SECURE === "true",
	maxAge: Number(process.env.COOKIE_MAX_AGE),
};
