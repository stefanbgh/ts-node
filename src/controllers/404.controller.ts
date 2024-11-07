import { Request, Response } from "express";

export class NotFoundController {
	constructor() {}

	async notFound(_: Request, res: Response): Promise<void> {
		res.status(404).json({
			message: "Page not found",
		});
	}
}
