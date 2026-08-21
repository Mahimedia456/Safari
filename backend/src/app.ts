import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

import {
  corsOrigins,
  env,
} from "./config/env.js";

import {
  errorHandler,
} from "./middleware/errorHandler.js";

import {
  basicApiRateLimit,
  securityHeaders,
} from "./middleware/security.js";

import {
  notFound,
} from "./middleware/notFound.js";

import {
  apiRouter,
} from "./routes/index.js";

export const app =
  express();

app.disable(
  "x-powered-by",
);

app.use(
  helmet(),
);

app.use(
  cors({
    origin(
      origin,
      callback,
    ) {
      if (
        !origin ||
        corsOrigins.includes(
          origin,
        )
      ) {
        callback(
          null,
          true,
        );

        return;
      }

      callback(
        new Error(
          `CORS rejected origin: ${origin}`,
        ),
      );
    },

    credentials: true,

    methods: [
      "GET",
      "POST",
      "PUT",
      "PATCH",
      "DELETE",
      "OPTIONS",
    ],

    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
    ],
  }),
);

app.use(
  express.json({
    limit: "2mb",
  }),
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "2mb",
  }),
);

if (
  env.NODE_ENV ===
  "development"
) {
  app.use(
    morgan("dev"),
  );
}

/*
|--------------------------------------------------------------------------
| Root
|--------------------------------------------------------------------------
*/

app.get(
  "/",
  (_req, res) => {
    res.json({
      success: true,
      name: "Safari API",
      version: "1.0.0",
      environment:
        env.NODE_ENV,
      health:
        "/api/v1/health",
    });
  },
);

/*
|--------------------------------------------------------------------------
| API
|--------------------------------------------------------------------------
*/

app.use(
  securityHeaders,
);

app.use(
  "/api/v1",
  basicApiRateLimit,
);

app.use(
  "/api/v1",
  apiRouter,
);

/*
|--------------------------------------------------------------------------
| 404 + Error handler
|--------------------------------------------------------------------------
*/

app.use(
  notFound,
);

app.use(
  errorHandler,
);

/*
|--------------------------------------------------------------------------
| Exports
|--------------------------------------------------------------------------
|
| Named export:
|   import { app } from "./app.js";
|
| Default export:
|   import app from "./app.js";
|
*/

export default app;