import { injectable } from "inversify";
import { createTerminus } from "@godaddy/terminus";
import { logger } from "../../utils/logger";

import http from 'http';

@injectable()
export class TerminusSetup {
    setup(server: http.Server): void {
        const onSignal = async (): Promise<void> => {
            logger.info("Server is starting cleanup.");
        };

        const onShutdown = async (): Promise<void> => {
            logger.info("Cleanup finished, server is shutting down.");
        };

        createTerminus(server, {
            signal: "SIGINT",
            onSignal,
            onShutdown,
            healthChecks: {
                "/healthcheck": async () => "OK",
            },
        });
    }
}
