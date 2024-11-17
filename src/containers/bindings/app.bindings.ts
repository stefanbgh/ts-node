import { ContainerModule, interfaces } from "inversify";

import { JwtAuth } from "../../middlewares/jwt";
import { Routes } from "../../routes";
import { Middlewares } from "../../middlewares";
import { App } from "../../app/app";

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind(JwtAuth).toSelf();
    bind(Routes).toSelf();
	bind(Middlewares).toSelf();
	bind(App).toSelf();
});
