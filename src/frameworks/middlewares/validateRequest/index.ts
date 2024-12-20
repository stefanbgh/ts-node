import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";

export function validateRequest<T extends object>(validatorClass: new () => T) {
	return async (req: Request, res: Response, next: NextFunction) => {
		const validatorInstance = plainToInstance(validatorClass, req.body);

		if (req.file) {
			const fileValidatorInstance = plainToInstance(validatorClass, {
				usr_id: req.body.usr_id,
				img_data: req.file,
			});

			const fileErrors = await validate(fileValidatorInstance);

			if (fileErrors.length > 0) {
				return res.status(400).json({
					message: "Validation failed for file",
					errors: fileErrors.map((err) => ({
						property: err.property,
						constraints: err.constraints,
					})),
				});
			}

			return next();
		}

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
