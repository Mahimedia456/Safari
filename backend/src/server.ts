import { app } from "./app.js";
import { env } from "./config/env.js";

async function startServer() {
  try {
    const server = app.listen(env.PORT, "0.0.0.0", () => {
      console.log("");
      console.log("Safari Backend");
      console.log(`Environment: ${env.NODE_ENV}`);
      console.log(`Local API: http://localhost:${env.PORT}`);
      console.log(`Health: http://localhost:${env.PORT}/api/v1/health`);
      console.log("");
    });

    function shutdown(signal: string) {
      console.log(`\n${signal} received. Shutting down...`);
      server.close(() => process.exit(0));
    }

    process.on("SIGINT", () => shutdown("SIGINT"));
    process.on("SIGTERM", () => shutdown("SIGTERM"));
  } catch (error) {
    console.error("Unable to start Safari backend:", error);
    process.exit(1);
  }
}

void startServer();
