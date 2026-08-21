import type { NextFunction, Request, Response } from "express";

export function requireAccountTypes(...allowed: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const profile = req.profile;

    if (!profile || !allowed.includes(profile.account_type)) {
      res.status(403).json({
        success: false,
        error: {
          code: "ACCESS_DENIED",
          message: "Your Safari account does not have access to this resource.",
        },
      });
      return;
    }

    next();
  };
}

export function requireAdminRoles(...allowed: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const profile = req.profile;

    if (
      !profile ||
      profile.account_type !== "administration" ||
      !profile.admin_role ||
      !allowed.includes(profile.admin_role)
    ) {
      res.status(403).json({
        success: false,
        error: {
          code: "ADMIN_ACCESS_DENIED",
          message: "Your Safari administration role does not allow this action.",
        },
      });
      return;
    }

    next();
  };
}
