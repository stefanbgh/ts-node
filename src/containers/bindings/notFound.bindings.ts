import { ContainerModule, interfaces } from "inversify";

import { NotFoundRoutes } from "../../routes/404.routes";
import { NotFoundController } from "../../controllers/404.controller";

export const notFoundBindings = new ContainerModule((bind: interfaces.Bind) => {
    bind(NotFoundRoutes).toSelf();
	bind(NotFoundController).toSelf();
})