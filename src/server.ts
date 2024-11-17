import "reflect-metadata";

import { appContainer } from "./containers/app.container";
import { App } from "./app/app";

const app = appContainer.get(App);
app.start();
