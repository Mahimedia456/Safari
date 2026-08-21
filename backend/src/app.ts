import cors from "cors";
import express from "express";
import morgan from "morgan";

import {
  contentSecurityPolicy,
  crossOriginEmbedderPolicy,
  crossOriginOpenerPolicy,
  crossOriginResourcePolicy,
  dnsPrefetchControl,
  frameguard,
  hidePoweredBy,
  hsts,
  ieNoOpen,
  noSniff,
  originAgentCluster,
  permittedCrossDomainPolicies,
  referrerPolicy,
  xssFilter,
} from "helmet";

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

/*
|--------------------------------------------------------------------------
| Express
|--------------------------------------------------------------------------
*/

app.disable(
  "x-powered-by",
);

/*
|--------------------------------------------------------------------------
| Helmet security headers
|--------------------------------------------------------------------------
|
| Using Helmet named middleware functions avoids the Vercel/NodeNext
| TypeScript default-import callable issue.
|
*/

app.use(
  contentSecurityPolicy(),
);

app.use(
  crossOriginEmbedderPolicy(),
);

app.use(
  crossOriginOpenerPolicy(),
);

app.use(
  crossOriginResourcePolicy(),
);

app.use(
  dnsPrefetchControl(),
);

app.use(
  frameguard(),
);

app.use(
  hidePoweredBy(),
);

app.use(
  hsts(),
);

app.use(
  ieNoOpen(),
);

app.use(
  noSniff(),
);

app.use(
  originAgentCluster(),
);

app.use(
  permittedCrossDomainPolicies(),
);

app.use(
  referrerPolicy(),
);

app.use(
  xssFilter(),
);

/*
|--------------------------------------------------------------------------
| CORS
|--------------------------------------------------------------------------
*/

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

/*
|--------------------------------------------------------------------------
| Body parsers
|--------------------------------------------------------------------------
*/

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

/*
|--------------------------------------------------------------------------
| Development logging
|--------------------------------------------------------------------------
*/

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
    res.status(200).json({
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
| Safari API
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
| Error handling
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
*/

export default app;