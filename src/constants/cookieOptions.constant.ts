import { ICookieOptions } from "../ts/interfaces/ICookieOptions";

export const cookieOptions: ICookieOptions = {
	httpOnly: true,
	sameSite: "none",
	secure: true,
	maxAge: 24 * 60 * 60 * 1000,
};
