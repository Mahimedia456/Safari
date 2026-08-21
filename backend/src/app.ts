import cors from "cors";
import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import helmet from "helmet";
import morgan from "morgan";

export const app = express();

app.disable("x-powered-by");

const configuredOrigins = (
  process.env.CORS_ORIGINS ?? ""
)
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const developmentOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:8081",
  "http://localhost:19006",
];

const allowedOrigins = new Set([
  ...configuredOrigins,
  ...(process.env.NODE_ENV !== "production"
    ? developmentOrigins
    : []),
]);

app.use(helmet());

app.use(
  cors({
    origin(origin, callback) {
      // Mobile/native clients and server-to-server requests
      // may not send an Origin header.
      if (!origin) {
        callback(null, true);
        return;
      }

      if (allowedOrigins.has(origin)) {
        callback(null, true);
        return;
      }

      callback(
        new Error(
          `CORS blocked origin: ${origin}`,
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

app.use(express.json({ limit: "10mb" }));

app.use(
  express.urlencoded({
    extended: true,
    limit: "10mb",
  }),
);

if (process.env.NODE_ENV !== "test") {
  app.use(morgan("dev"));
}

/*
|--------------------------------------------------------------------------
| Root
|--------------------------------------------------------------------------
*/

app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    name: "Safari API",
    version: "1.0.0",
    environment:
      process.env.NODE_ENV ??
      "development",
    health: "/api/v1/health",
  });
});

/*
|--------------------------------------------------------------------------
| Health
|--------------------------------------------------------------------------
|
| Keep this basic route available even before database checks.
| If you already have a richer health router/service, mount that router
| below instead of duplicating the route.
|
*/

app.get(
  "/api/v1/health",
  async (_req, res) => {
    res.status(200).json({
      success: true,
      service: "safari-backend",
      environment:
        process.env.NODE_ENV ??
        "development",
      timestamp:
        new Date().toISOString(),
      checks: {
        api: "connected",
      },
    });
  },
);

/*
|--------------------------------------------------------------------------
| Safari API Routes
|--------------------------------------------------------------------------
|
| IMPORTANT:
| Your existing Safari backend already has auth, rides, passengers,
| drivers, merchants, commerce etc.
|
| DO NOT delete those route imports/mounts.
|
| Example:
|
| import authRoutes from "./modules/auth/auth.routes";
| import rideRoutes from "./modules/rides/ride.routes";
|
| app.use("/api/v1/auth", authRoutes);
| app.use("/api/v1/rides", rideRoutes);
|
| Put your CURRENT existing app.use(...) route registrations here.
|
*/

/*
|--------------------------------------------------------------------------
| 404
|--------------------------------------------------------------------------
*/

app.use(
  (
    req: Request,
    res: Response,
  ) => {
    res.status(404).json({
      success: false,
      error: "Route not found",
      method: req.method,
      path: req.originalUrl,
    });
  },
);

/*
|--------------------------------------------------------------------------
| Global Error Handler
|--------------------------------------------------------------------------
*/

app.use(
  (
    error: Error,
    _req: Request,
    res: Response,
    _next: NextFunction,
  ) => {
    console.error(
      "[Safari API Error]",
      error,
    );

    res.status(500).json({
      success: false,
      error:
        process.env.NODE_ENV ===
        "production"
          ? "Internal server error"
          : error.message,
    });
  },
);

export default app;