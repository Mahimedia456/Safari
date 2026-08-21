import { create } from "zustand";

import { adminPaymentService } from "../services/paymentService";
import type {
  AdminWallet,
  AdminWalletTransaction,
} from "../types/payment";
import { useAuthStore } from "./authStore";

type PaymentState = {
  loading: boolean;
  error: string | null;

  wallets: AdminWallet[];
  transactions: AdminWalletTransaction[];
  merchantLedger: Record<string, unknown>[];

  loadWallets: () => Promise<void>;
  loadTransactions: () => Promise<void>;
  loadMerchantLedger: () => Promise<void>;
};

function token() {
  const accessToken =
    useAuthStore.getState().accessToken;

  if (!accessToken)
    throw new Error("Safari admin session is required.");

  return accessToken;
}

export const usePaymentStore =
  create<PaymentState>((set) => ({
    loading: false,
    error: null,

    wallets: [],
    transactions: [],
    merchantLedger: [],

    loadWallets: async () => {
      set({ loading: true, error: null });

      try {
        const data =
          await adminPaymentService.wallets(token());

        set({ wallets: data.wallets });
      } catch (error) {
        set({
          error:
            error instanceof Error
              ? error.message
              : "Could not load Safari wallets.",
        });
      } finally {
        set({ loading: false });
      }
    },

    loadTransactions: async () => {
      set({ loading: true, error: null });

      try {
        const data =
          await adminPaymentService.transactions(
            token(),
          );

        set({
          transactions: data.transactions,
        });
      } catch (error) {
        set({
          error:
            error instanceof Error
              ? error.message
              : "Could not load Safari transactions.",
        });
      } finally {
        set({ loading: false });
      }
    },

    loadMerchantLedger: async () => {
      set({ loading: true, error: null });

      try {
        const data =
          await adminPaymentService.merchantLedger(
            token(),
          );

        set({
          merchantLedger: data.entries,
        });
      } catch (error) {
        set({
          error:
            error instanceof Error
              ? error.message
              : "Could not load merchant ledger.",
        });
      } finally {
        set({ loading: false });
      }
    },
  }));
