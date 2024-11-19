import { Request, Response } from "express";
import { AppError } from "../frameworks/errors/AppError";
import { ImageService } from "../services/image.service";

import { inject } from "inversify";
import { UploadImageDTO } from "../ts/dtos/UploadImageDTO";
import { Controller, Get, Param, Post, Req, Res, UseBefore } from "routing-controllers";
import { validateRequest } from "../frameworks/middlewares/validateRequest";
import { ImageValidator } from "../utils/validators/image.validator";
import { BaseController } from "./base.controller";

import upload from "../utils/upload";

@Controller("/api/v1/images")
export class ImageController implements BaseController {
	constructor(
		@inject(ImageService) private imageService: ImageService,
	  ) {}

	@Get("/:id")
	async getImage(@Param("id") usr_id: number, @Res() res: Response) {
		try {
			const { data, message } = await this.imageService.getImage(usr_id);

			return res.status(200).json({ data, message });
		} catch (error) {
			if (error instanceof AppError) {
				return res.status(error.statusCode).json({ message: error.message });
			}

			return res.status(500).json({ message: "Internal server error" });
		}
	}

	@Post("/")
	@UseBefore(validateRequest(ImageValidator))
	@UseBefore(upload.single("img_data"))
	async uploadImage(@Req() req: Request, @Res() res: Response) {
		try {
			const dto: UploadImageDTO = { usr_id: req.body.usr_id, file: req.file }
			const { data, message } = await this.imageService.uploadImage(dto);

			return res.status(201).json({ data, message });
		} catch (error) {
			if (error instanceof AppError) {
				return res.status(error.statusCode).json({ message: error.message });
			}

			return res.status(500).json({ message: "Internal server error" });
		}
	}
}
