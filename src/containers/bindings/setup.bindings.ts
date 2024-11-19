import { ContainerModule, interfaces } from "inversify";

import { MiddlewaresSetup } from "../../frameworks/setup/middlewares.setup";
import { RoutesSetup } from "../../frameworks/setup/routes.setup";
import { ServerSetup } from "../../frameworks/setup/server.setup";
import { TerminusSetup } from "../../frameworks/setup/terminus.setup";

export const setupBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind(MiddlewaresSetup).toSelf();
	bind(RoutesSetup).toSelf();
	bind(ServerSetup).toSelf();
	bind(TerminusSetup).toSelf();
});