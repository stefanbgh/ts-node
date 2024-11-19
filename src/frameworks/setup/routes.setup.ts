import { Express } from "express";

import { injectable } from "inversify";
import { useContainer, useExpressServer } from "routing-controllers";
import { AuthController } from "../../controllers/auth.controller";
import { UserController } from "../../controllers/user.controller";
import { ImageController } from "../../controllers/image.controller";
import { NotFoundController } from "../../controllers/404.controller";
import { appContainer } from "../../containers/app.container";

@injectable()
export class RoutesSetup {
    setup(app: Express): void {
        useContainer(appContainer);
        useExpressServer(app, {
            controllers: [
                AuthController, 
                UserController, 
                ImageController, 
                NotFoundController
            ],
        });
    }
}
