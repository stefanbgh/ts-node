import { SameSite } from "../types/SameSite";

export interface ICookieOptions {
	httpOnly: boolean;
	sameSite: SameSite;
	secure: boolean;
	maxAge: number;
}
