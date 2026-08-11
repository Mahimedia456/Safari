import {
  create,
} from "zustand";

import { dummyMerchants } from "../data/merchants";

import type {
  Merchant,
  MerchantNote,
  MerchantStatus,
} from "../types/merchant";

interface MerchantStoreState {
  merchants:
    Merchant[];

  setStatus: (
    merchantId: string,
    status: MerchantStatus,
    reason?: string,
  ) => void;

  addNote: (
    merchantId: string,
    text: string,
    author: string,
  ) => void;

  getMerchant: (
    merchantId: string,
  ) =>
    | Merchant
    | undefined;
}

export const useMerchantStore =
  create<MerchantStoreState>(
    (set, get) => ({
      merchants:
        dummyMerchants,

      setStatus: (
        merchantId,
        status,
        reason,
      ) => {
        set((state) => ({
          merchants:
            state.merchants.map(
              (merchant) => {
                if (
                  merchant.id !==
                  merchantId
                ) {
                  return merchant;
                }

                return {
                  ...merchant,

                  status,

                  approvedAt:
                    status ===
                    "approved"
                      ? new Date().toISOString()
                      : merchant.approvedAt,

                  rejectionReason:
                    status ===
                    "rejected"
                      ? reason
                      : undefined,

                  suspensionReason:
                    status ===
                    "suspended"
                      ? reason
                      : undefined,

                  activities: [
                    {
                      id:
                        crypto.randomUUID(),

                      title:
                        `Merchant ${status}`,

                      description:
                        reason ||
                        `Merchant status changed to ${status}.`,

                      createdAt:
                        new Date().toISOString(),
                    },

                    ...merchant.activities,
                  ],
                };
              },
            ),
        }));
      },

      addNote: (
        merchantId,
        text,
        author,
      ) => {
        const note: MerchantNote =
          {
            id:
              crypto.randomUUID(),

            text,

            author,

            createdAt:
              new Date().toISOString(),
          };

        set((state) => ({
          merchants:
            state.merchants.map(
              (merchant) =>
                merchant.id ===
                merchantId
                  ? {
                      ...merchant,

                      notes: [
                        note,

                        ...merchant.notes,
                      ],
                    }
                  : merchant,
            ),
        }));
      },

      getMerchant: (
        merchantId,
      ) =>
        get().merchants.find(
          (merchant) =>
            merchant.id ===
            merchantId,
        ),
    }),
  );