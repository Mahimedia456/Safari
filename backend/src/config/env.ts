import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),

  PORT: z.coerce.number().int().positive().default(5000),

  CORS_ORIGINS: z
    .string()
    .default(
      "http://localhost:5173,http://localhost:5174,http://localhost:8081",
    ),

  SUPABASE_URL: z.string().url(),
  SUPABASE_PUBLISHABLE_KEY: z.string().min(10),
  SUPABASE_SECRET_KEY: z.string().min(10),

  AUTH_OTP_PEPPER: z.string().min(16),
  AUTH_RESET_TOKEN_PEPPER: z.string().min(16),
  AUTH_OTP_TTL_SECONDS: z.coerce.number().int().positive().default(300),
  AUTH_OTP_MAX_ATTEMPTS: z.coerce.number().int().positive().default(5),
  AUTH_OTP_MAX_SENDS_PER_10_MINUTES: z.coerce.number().int().positive().default(5),

  META_GRAPH_VERSION: z.string().default("v23.0"),
  META_WHATSAPP_VERIFY_TOKEN: z.string().min(1),
  META_WHATSAPP_ACCESS_TOKEN: z.string().min(1),
  META_WHATSAPP_PHONE_NUMBER_ID: z.string().min(1),
  META_WHATSAPP_BUSINESS_ACCOUNT_ID: z.string().min(1).optional(),
  META_WHATSAPP_OTP_TEMPLATE: z.string().default("carpool_text"),
  META_WHATSAPP_OTP_TEMPLATE_LANGUAGE: z.string().default("en"),

  SEED_ADMIN_EMAIL: z
    .string()
    .email()
    .default("admin@safari.com"),

  SEED_ADMIN_PASSWORD: z
    .string()
    .min(8)
    .default("safarimobile"),

  API_SMOKE_BASE_URL: z.string().url().optional(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error(
    "Invalid Safari backend environment configuration:",
    parsed.error.flatten().fieldErrors,
  );

  process.exit(1);
}

export const env = parsed.data;

export const corsOrigins = env.CORS_ORIGINS
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);
