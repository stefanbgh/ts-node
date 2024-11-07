import { Request, Response, NextFunction } from "express";
import { AuthService } from "../../services/auth.service";

export const jwtAuth = (
	req: Request,
	res: Response,
	next: NextFunction
): void => {
	const token = req.headers.authorization?.split(" ")[1];

	if (!token) {
		res.status(401).json({ error: "Access token is missing" });
		return;
	}

	try {
		AuthService.verifyToken("access_token", token);
		next();
	} catch (err) {
		res.status(401).json({ error: "Invalid or expired token" });
	}
};
