import { Router } from "express";
import { supabaseAdmin } from "../lib/supabase.js";

export const healthRouter = Router();

healthRouter.get("/", async (_req, res) => {
  const startedAt = Date.now();

  let database: "connected" | "disconnected" = "disconnected";
  let auth: "connected" | "disconnected" = "disconnected";
  let databaseError: string | null = null;
  let authError: string | null = null;

  try {
    const { error } = await supabaseAdmin
      .from("system_health")
      .select("id,name")
      .limit(1);

    if (error) throw error;
    database = "connected";
  } catch (error) {
    databaseError =
      error instanceof Error ? error.message : "Supabase database test failed.";
  }

  try {
    const { error } = await supabaseAdmin.auth.admin.listUsers({
      page: 1,
      perPage: 1,
    });

    if (error) throw error;
    auth = "connected";
  } catch (error) {
    authError =
      error instanceof Error ? error.message : "Supabase Auth test failed.";
  }

  const healthy = database === "connected" && auth === "connected";

  res.status(healthy ? 200 : 503).json({
    success: healthy,
    service: "safari-backend",
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
    latencyMs: Date.now() - startedAt,
    checks: {
      api: "connected",
      database,
      auth,
      supabase: "connected",
    },
    errors: {
      database: databaseError,
      auth: authError,
    },
  });
});
