import "reflect-metadata";

import { container } from "./config/inversify.config";
import { App } from "./app/app";
import { TYPES } from "./config/types.config";

const server = container.get<App>(TYPES.App);
server.start();
