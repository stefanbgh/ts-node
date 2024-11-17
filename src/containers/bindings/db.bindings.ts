import { ContainerModule, interfaces } from "inversify";

import { Database } from "../../db";

export const dbBindings = new ContainerModule((bind: interfaces.Bind) => {
    bind(Database).toSelf();
})