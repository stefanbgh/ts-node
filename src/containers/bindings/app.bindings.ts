import { ContainerModule, interfaces } from "inversify";

import { JwtAuth } from "../../middlewares/jwt";
import { AuthService } from "../../services/auth.service";
import { AuthController } from "../../controllers/auth.controller";
import { AuthRoutes } from "../../routes/auth.routes";
import { UserRepository } from "../../repositories/user.repository";
import { UserService } from "../../services/user.service";
import { UserController } from "../../controllers/user.controller";
import { UserRoutes } from "../../routes/user.routes";
import { ImageRepository } from "../../repositories/image.repository";
import { ImageService } from "../../services/image.service";
import { ImageController } from "../../controllers/image.controller";
import { ImageRoutes } from "../../routes/image.routes";
import { NotFoundController } from "../../controllers/404.controller";
import { NotFoundRoutes } from "../../routes/404.routes";
import { Routes } from "../../routes";
import { Middlewares } from "../../middlewares";
import { App } from "../../app/app";

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind(JwtAuth).toSelf();
	bind(AuthRoutes).toSelf();
	bind(AuthController).toSelf();
	bind(AuthService).toSelf();
	bind(UserRoutes).toSelf();
	bind(UserController).toSelf();
	bind(UserService).toSelf();
	bind(UserRepository).toSelf();
	bind(ImageRoutes).toSelf();
	bind(ImageController).toSelf();
	bind(ImageService).toSelf();
	bind(ImageRepository).toSelf();
	bind(NotFoundRoutes).toSelf();
	bind(NotFoundController).toSelf();
    bind(Routes).toSelf();
	bind(Middlewares).toSelf();
	bind(App).toSelf();
});
