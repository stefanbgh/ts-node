import "reflect-metadata";

import { boot } from "./config/inversify.config";

const startServer = () => {
    const { app } = boot;
    app.start();
}

startServer();