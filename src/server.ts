import app from "./app/app";

import { PORT } from "./constants/port.constant";
import { createTerminus } from "@godaddy/terminus";

const server = app.listen(PORT, () => {
	console.log(`Listening on: http://localhost:${PORT}`);
});

const onSignal = async (): Promise<void> => {
	// Add winston logger
	console.log("Server is starting cleanup.");
};

const onShutdown = async (): Promise<void> => {
	// Add winston logger
	console.log("Cleanup finished, server is shutting down.");
};

createTerminus(server, {
	signal: "SIGINT",
	onSignal,
	onShutdown,
	healthChecks: {
		"/healthcheck": async () => "OK",
	},
});
