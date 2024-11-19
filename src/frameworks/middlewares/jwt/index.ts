import { Request, Response, NextFunction } from "express";
import { AuthService } from "../../../services/auth.service";

import { inject, injectable } from "inversify";

@injectable()
export class JwtAuth {
	constructor(@inject(AuthService) private authService: AuthService) {}

	public authenticate(req: Request, res: Response, next: NextFunction): void {
		const token = req.headers.authorization?.split(" ")[1];

		if (!token) {
			res.status(401).json({ error: "Access token is missing" });
			return;
		}

		const isValid = this.authService.verifyToken("access_token", token);

		if (!isValid) {
			res.status(401).json({ error: "Invalid or expired token" });
			return;
		}

		next();
	}
}
