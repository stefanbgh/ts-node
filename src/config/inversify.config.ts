import { Container, ContainerModule, interfaces } from "inversify";
import { TYPES } from "./types.config";
import { IBootstrap } from "../ts/interfaces/IBootstrap";

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

const appBindings = new ContainerModule((bind: interfaces.Bind) => {
    // JWT
    bind<JwtAuth>(TYPES.JwtAuth).to(JwtAuth);
    // Auth
    bind<AuthService>(TYPES.AuthService).to(AuthService);
    bind<AuthController>(TYPES.AuthController).to(AuthController);
    bind<AuthRoutes>(TYPES.AuthRoutes).to(AuthRoutes);
    // User
    bind<UserRepository>(TYPES.UserRepository).to(UserRepository);
    bind<UserService>(TYPES.UserService).to(UserService);
    bind<UserController>(TYPES.UserController).to(UserController);
    bind<UserRoutes>(TYPES.UserRoutes).to(UserRoutes);
    // Image
    bind<ImageRepository>(TYPES.ImageRepository).to(ImageRepository);
    bind<ImageService>(TYPES.ImageService).to(ImageService);
    bind<ImageController>(TYPES.ImageController).to(ImageController);
    bind<ImageRoutes>(TYPES.ImageRoutes).to(ImageRoutes);
    // 404
    bind<NotFoundController>(TYPES.NotFoundController).to(NotFoundController);
    bind<NotFoundRoutes>(TYPES.NotFoundRoutes).to(NotFoundRoutes);
    // Others
    bind<Routes>(TYPES.Routes).to(Routes);
    bind<Middlewares>(TYPES.Middlewares).to(Middlewares);
    bind<App>(TYPES.App).to(App);
})

const bootstrap = async(): Promise<IBootstrap> => {
    const appContainer = new Container();
    appContainer.load(appBindings);

    const app = appContainer.get<App>(TYPES.App);
    return { appContainer, app }
}

export const boot = bootstrap();
