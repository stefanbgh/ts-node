import { ContainerModule, interfaces } from "inversify";

import { ImageController } from "../../controllers/image.controller";
import { ImageService } from "../../services/image.service";
import { ImageRepository } from "../../repositories/image.repository";

export const imageBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind(ImageController).toSelf();
	bind(ImageService).toSelf();
	bind(ImageRepository).toSelf();
})