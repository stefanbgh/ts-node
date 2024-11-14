import app from "./app/app";

import { PORT } from "./constants/port.constant";
import { createTerminus } from "@godaddy/terminus";
import { logger } from "./utils/logger";

const server = app.listen(PORT, () => {
	logger.info(`Listening on: http://localhost:${PORT}`);
});

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
