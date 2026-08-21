import "dotenv/config";

import app from "./app.js";

const PORT =
  Number(process.env.PORT) ||
  5000;

const HOST =
  process.env.HOST ||
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
        `Environment: ${
          process.env
            .NODE_ENV ??
          "development"
        }`,
      );

      console.log(
        `Local API: http://localhost:${PORT}`,
      );

      console.log(
        `Network API: http://${HOST}:${PORT}`,
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

  server.close(() => {
    console.log(
      "Safari Backend stopped.",
    );

    process.exit(0);
  });

  setTimeout(
    () => {
      console.error(
        "Forced shutdown after timeout.",
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