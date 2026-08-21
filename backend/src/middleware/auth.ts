import type { NextFunction, Request, Response } from "express";
import { supabaseAdmin } from "../lib/supabase.js";

export async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const authorization = req.headers.authorization;

    if (!authorization?.startsWith("Bearer ")) {
      res.status(401).json({
        success: false,
        error: {
          code: "AUTH_REQUIRED",
          message: "A valid Safari session is required.",
        },
      });
      return;
    }

    const accessToken = authorization.slice("Bearer ".length).trim();

    const { data, error } = await supabaseAdmin.auth.getUser(accessToken);

    if (error || !data.user) {
      res.status(401).json({
        success: false,
        error: {
          code: "INVALID_SESSION",
          message: "Your Safari session is invalid or has expired.",
        },
      });
      return;
    }

    const { data: profile, error: profileError } = await supabaseAdmin
      .from("profiles")
      .select(
        "id,full_name,email,phone,account_type,app_mode,admin_role,merchant_type,status,country_code,is_onboarded,avatar_url",
      )
      .eq("id", data.user.id)
      .single();

    if (profileError || !profile) {
      res.status(403).json({
        success: false,
        error: {
          code: "PROFILE_NOT_FOUND",
          message: "Safari profile could not be loaded.",
        },
      });
      return;
    }

    if (profile.status === "suspended" || profile.status === "blocked") {
      res.status(403).json({
        success: false,
        error: {
          code: "ACCOUNT_RESTRICTED",
          message: "This Safari account is currently restricted.",
        },
      });
      return;
    }

    req.authUser = data.user;
    req.accessToken = accessToken;
    req.profile = profile;

    next();
  } catch (error) {
    next(error);
  }
}
