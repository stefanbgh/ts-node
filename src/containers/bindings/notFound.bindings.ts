import { ContainerModule, interfaces } from "inversify";

import { NotFoundController } from "../../controllers/404.controller";

export const notFoundBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind(NotFoundController).toSelf();
})