import type {
  NextFunction,
  Request,
  Response,
} from "express";

import {
  ZodError,
} from "zod";

const SAFE_ERROR_PATTERNS = [
  /Safari/i,
  /phone number/i,
  /password/i,
  /verification/i,
  /OTP/i,
  /WhatsApp/i,
  /account/i,
  /sign in/i,
  /signing in/i,
  /too many/i,
  /expired/i,
  /incorrect/i,
  /invalid/i,
];

function safeClientMessage(
  error: unknown,
) {
  if (
    error instanceof
    ZodError
  ) {
    return {
      status: 400,
      code:
        "VALIDATION_ERROR",
      message:
        error.issues[0]
          ?.message ??
        "Check the information you entered.",
    };
  }

  if (
    error instanceof Error
  ) {
    const isSafe =
      SAFE_ERROR_PATTERNS.some(
        (pattern) =>
          pattern.test(
            error.message,
          ),
      );

    if (isSafe) {
      return {
        status: 400,
        code:
          "REQUEST_ERROR",
        message:
          error.message,
      };
    }
  }

  return {
    status: 500,
    code:
      "INTERNAL_SERVER_ERROR",
    message:
      process.env
        .NODE_ENV ===
      "production"
        ? "Safari could not complete this request right now."
        : error instanceof
            Error
          ? error.message
          : "Unexpected server error.",
  };
}

export function errorHandler(
  error: unknown,
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  console.error(
    "[Safari API Error]",
    {
      method:
        req.method,
      path:
        req.originalUrl,
      error,
    },
  );

  const safe =
    safeClientMessage(
      error,
    );

  res.status(
    safe.status,
  ).json({
    success: false,
    error: {
      code:
        safe.code,
      message:
        safe.message,
    },
  });
}
