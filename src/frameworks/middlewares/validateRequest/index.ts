import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";

export function validateRequest<T extends object>(validatorClass: new () => T) {
	return async (req: Request, res: Response, next: NextFunction) => {
		const validatorInstance = plainToInstance(validatorClass, req.body);

		const errors = await validate(validatorInstance);

		if (errors.length > 0) {
			res.status(400).json({
				message: "Validation failed",
				errors: errors.map((err) => ({
					property: err.property,
					constraints: err.constraints,
				})),
			});

			return;
		}

		next();
	};
}
