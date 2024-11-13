// This is why you need clean code architecture, not to import files, you will get lost in this
import { Request, Response, NextFunction } from "express";

// If you use Clean code arch you will need to inject it in this service instead require it from other file
import { AuthService } from "../../services/auth.service";

// Maybe create this as a class
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
