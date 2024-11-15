import "reflect-metadata";

import { boot } from "./config/inversify.config";

const startServer = async() => {
    const { app } = await boot;
    app.start();
}

startServer();