import { Express } from "express";

import { injectable } from "inversify";
import { Port } from "../../ts/types/Port";
import { logger } from "../../utils/logger";

import http from "http";

@injectable()
export class ServerSetup {
    create(app: Express, port: Port): http.Server {
        const server = app.listen(port, () => {
            logger.info(`Server is running at http://localhost:${port}`);
        });
        
        return server;
    }
}
