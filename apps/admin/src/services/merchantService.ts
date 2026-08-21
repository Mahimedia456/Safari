import { apiRequest } from "./apiClient";
import type {
  AdminMerchant,
  AdminUnifiedOrder,
} from "../types/merchant";

export const adminMerchantService = {
  list(
    accessToken: string,
    filters?: {
      type?: string;
      verificationStatus?: string;
    },
  ) {
    const params = new URLSearchParams();

    if (filters?.type)
      params.set("type", filters.type);

    if (filters?.verificationStatus)
      params.set(
        "verificationStatus",
        filters.verificationStatus,
      );

    const suffix = params.toString()
      ? `?${params.toString()}`
      : "";

    return apiRequest<{
      merchants: AdminMerchant[];
      total: number;
    }>(
      `/admin/merchants${suffix}`,
      {},
      accessToken,
    );
  },

  updateStatus(
    accessToken: string,
    merchantId: string,
    input: {
      verificationStatus:
        | "in_review"
        | "verified"
        | "rejected"
        | "suspended";
      commissionPercent?: number;
      payoutStatus?: "enabled" | "paused";
      rejectionReason?: string | null;
    },
  ) {
    return apiRequest<{
      merchant: AdminMerchant;
    }>(
      `/admin/merchants/${merchantId}/status`,
      {
        method: "PATCH",
        body: JSON.stringify(input),
      },
      accessToken,
    );
  },

  unifiedOrders(accessToken: string) {
    return apiRequest<{
      orders: AdminUnifiedOrder[];
      total: number;
    }>(
      "/admin/merchants/orders/unified",
      {},
      accessToken,
    );
  },
};
