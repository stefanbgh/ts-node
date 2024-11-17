import { Request, Response } from "express";

import { Controller, Get, Res } from "routing-controllers";

@Controller()
export class NotFoundController {
	constructor() {}

	@Get("*")
	async notFound(@Res() res: Response) {
		return res.status(404).json({
			message: "Page not found",
		});
	}
}
