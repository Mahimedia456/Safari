import { apiRequest } from "./apiClient";

export const adminNotificationService = {
  send(
    accessToken: string,
    input: {
      userId: string;
      notificationType:
        | "ride"
        | "food"
        | "grocery"
        | "pharmacy"
        | "services"
        | "payment"
        | "wallet"
        | "account"
        | "promotion"
        | "system";
      title: string;
      body: string;
      priority?: "low" | "normal" | "high";
      data?: Record<string, unknown>;
    },
  ) {
    return apiRequest<{
      notification: Record<string, unknown>;
    }>(
      "/admin/notifications/send",
      {
        method: "POST",
        body: JSON.stringify(input),
      },
      accessToken,
    );
  },
};
