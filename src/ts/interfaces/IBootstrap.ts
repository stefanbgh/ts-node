import { Container } from "inversify";
import { App } from "../../app/app";

export interface IBootstrap {
    appContainer: Container;
	app: App;
}