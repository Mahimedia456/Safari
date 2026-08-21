import { Router } from "express";

import { supabaseAdmin } from "../../lib/supabase.js";

export const systemRouter = Router();

systemRouter.get("/ready", async (_req, res) => {
  const startedAt = Date.now();

  const checks = {
    api: "connected",
    database: "unknown",
    supabase: "unknown",
    schema: "unknown",
  };

  const errors: Record<string, string | null> = {
    database: null,
    supabase: null,
    schema: null,
  };

  try {
    const { error } = await supabaseAdmin
      .from("profiles")
      .select("id")
      .limit(1);

    if (error) throw error;

    checks.database = "connected";
    checks.supabase = "connected";
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : String(error);

    checks.database = "disconnected";
    checks.supabase = "disconnected";

    errors.database = message;
    errors.supabase = message;
  }

  try {
    const { error } = await supabaseAdmin
      .from("safari_schema_health")
      .select("*")
      .single();

    if (error) throw error;

    checks.schema = "ready";
  } catch (error) {
    checks.schema = "not_ready";
    errors.schema =
      error instanceof Error
        ? error.message
        : String(error);
  }

  const success =
    checks.database === "connected" &&
    checks.supabase === "connected" &&
    checks.schema === "ready";

  res.status(success ? 200 : 503).json({
    success,
    service: "safari-backend",
    environment: process.env.NODE_ENV ?? "development",
    timestamp: new Date().toISOString(),
    latencyMs: Date.now() - startedAt,
    checks,
    errors,
  });
});
