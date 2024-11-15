import { Request, Response } from "express";
import { injectable } from "inversify";

@injectable()
export class NotFoundController {
	constructor() {}

	async notFound(_: Request, res: Response): Promise<void> {
		res.status(404).json({
			message: "Page not found",
		});
	}
}
