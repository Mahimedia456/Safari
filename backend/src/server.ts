import "dotenv/config";

import app from "./app.js";

import {
  env,
} from "./config/env.js";

const PORT =
  env.PORT || 5000;

const HOST =
  "0.0.0.0";

const server =
  app.listen(
    PORT,
    HOST,
    () => {
      console.log("");
      console.log(
        "========================================",
      );

      console.log(
        "Safari Backend",
      );

      console.log(
        "========================================",
      );

      console.log(
        `Environment: ${env.NODE_ENV}`,
      );

      console.log(
        `Local API: http://localhost:${PORT}`,
      );

      console.log(
        `Health: http://localhost:${PORT}/api/v1/health`,
      );

      console.log(
        "========================================",
      );

      console.log("");
    },
  );

function shutdown(
  signal: string,
) {
  console.log("");
  console.log(
    `${signal} received. Shutting down...`,
  );

  server.close(
    () => {
      console.log(
        "Safari Backend stopped.",
      );

      process.exit(0);
    },
  );

  setTimeout(
    () => {
      console.error(
        "Forced shutdown after 10 seconds.",
      );

      process.exit(1);
    },
    10_000,
  ).unref();
}

process.on(
  "SIGINT",
  () =>
    shutdown(
      "SIGINT",
    ),
);

process.on(
  "SIGTERM",
  () =>
    shutdown(
      "SIGTERM",
    ),
);

process.on(
  "uncaughtException",
  (
    error: Error,
  ) => {
    console.error(
      "Uncaught exception:",
      error,
    );

    process.exit(1);
  },
);

process.on(
  "unhandledRejection",
  (
    reason: unknown,
  ) => {
    console.error(
      "Unhandled rejection:",
      reason,
    );
  },
);