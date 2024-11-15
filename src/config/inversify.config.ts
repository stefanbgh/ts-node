import { Container } from "inversify";
import { TYPES } from "./types.config";

import { JwtAuth } from "../middlewares/jwt";
import { AuthService } from "../services/auth.service";
import { AuthController } from "../controllers/auth.controller";
import { AuthRoutes } from "../routes/auth.routes";
import { UserRepository } from "../repositories/user.repository";
import { UserService } from "../services/user.service";
import { UserController } from "../controllers/user.controller";
import { UserRoutes } from "../routes/user.routes";
import { ImageRepository } from "../repositories/image.repository";
import { ImageService } from "../services/image.service";
import { ImageController } from "../controllers/image.controller";
import { ImageRoutes } from "../routes/image.routes";
import { NotFoundController } from "../controllers/404.controller";
import { NotFoundRoutes } from "../routes/404.routes";
import { Routes } from "../routes";
import { Middlewares } from "../middlewares";
import { App } from "../app/app";

const container = new Container();

container.bind<JwtAuth>(TYPES.JwtAuth).to(JwtAuth);
container.bind<AuthService>(TYPES.AuthService).to(AuthService);
container.bind<AuthController>(TYPES.AuthController).to(AuthController);
container.bind<AuthRoutes>(TYPES.AuthRoutes).to(AuthRoutes);
container.bind<UserRepository>(TYPES.UserRepository).to(UserRepository);
container.bind<UserService>(TYPES.UserService).to(UserService);
container.bind<UserController>(TYPES.UserController).to(UserController);
container.bind<UserRoutes>(TYPES.UserRoutes).to(UserRoutes);
container.bind<ImageRepository>(TYPES.ImageRepository).to(ImageRepository);
container.bind<ImageService>(TYPES.ImageService).to(ImageService);
container.bind<ImageController>(TYPES.ImageController).to(ImageController);
container.bind<ImageRoutes>(TYPES.ImageRoutes).to(ImageRoutes);
container.bind<NotFoundController>(TYPES.NotFoundController).to(NotFoundController);
container.bind<NotFoundRoutes>(TYPES.NotFoundRoutes).to(NotFoundRoutes);
container.bind<Routes>(TYPES.Routes).to(Routes);
container.bind<Middlewares>(TYPES.Middlewares).to(Middlewares);
container.bind<App>(TYPES.App).to(App);

export { container };
