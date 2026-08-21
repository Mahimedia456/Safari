import { apiRequest } from "./apiClient";
import type {
  AdminWallet,
  AdminWalletTransaction,
} from "../types/payment";

export const adminPaymentService = {
  wallets(accessToken: string) {
    return apiRequest<{
      wallets: AdminWallet[];
      total: number;
    }>(
      "/admin/payments/wallets",
      {},
      accessToken,
    );
  },

  transactions(
    accessToken: string,
    filters?: {
      userId?: string;
      type?: string;
    },
  ) {
    const params = new URLSearchParams();

    if (filters?.userId)
      params.set("userId", filters.userId);

    if (filters?.type)
      params.set("type", filters.type);

    const suffix = params.toString()
      ? `?${params.toString()}`
      : "";

    return apiRequest<{
      transactions: AdminWalletTransaction[];
      total: number;
    }>(
      `/admin/payments/transactions${suffix}`,
      {},
      accessToken,
    );
  },

  merchantLedger(accessToken: string) {
    return apiRequest<{
      entries: Record<string, unknown>[];
      total: number;
    }>(
      "/admin/payments/merchant-ledger",
      {},
      accessToken,
    );
  },
};
