import {
  create,
} from "zustand";

import {
  dummyStores,
} from "../data/stores";

import type {
  SafariStore,
  StoreFormInput,
  StoreStatus,
} from "../types/store";

interface StoreState {
  stores:
    SafariStore[];

  getStore: (
    id: string,
  ) =>
    | SafariStore
    | undefined;

  createStore: (
    input:
      StoreFormInput,
  ) => SafariStore;

  updateStore: (
    id: string,
    input:
      StoreFormInput,
  ) => void;

  updateCommission: (
    id: string,
    commission: number,
  ) => void;

  setStatus: (
    id: string,
    status:
      StoreStatus,
    reason?: string,
  ) => void;
}

function slugify(
  value: string,
) {
  return value
    .trim()
    .toLowerCase()
    .replace(
      /[^a-z0-9]+/g,
      "-",
    )
    .replace(
      /^-+|-+$/g,
      "",
    );
}

export const useStoreStore =
  create<StoreState>(
    (set, get) => ({
      stores:
        dummyStores,

      getStore: (id) =>
        get().stores.find(
          (store) =>
            store.id === id,
        ),

      createStore: (
        input,
      ) => {
        const store: SafariStore =
          {
            id:
              `ST-${Date.now()}`,

            ...input,

            slug:
              slugify(
                input.name,
              ),

            status:
              "pending",

            createdAt:
              new Date().toISOString(),

            totalOrders: 0,

            grossSales: 0,
          };

        set((state) => ({
          stores: [
            store,
            ...state.stores,
          ],
        }));

        return store;
      },

      updateStore: (
        id,
        input,
      ) => {
        set((state) => ({
          stores:
            state.stores.map(
              (store) =>
                store.id === id
                  ? {
                      ...store,

                      ...input,

                      slug:
                        slugify(
                          input.name,
                        ),
                    }
                  : store,
            ),
        }));
      },

      updateCommission: (
        id,
        commission,
      ) => {
        set((state) => ({
          stores:
            state.stores.map(
              (store) =>
                store.id === id
                  ? {
                      ...store,

                      commissionPercentage:
                        commission,
                    }
                  : store,
            ),
        }));
      },

      setStatus: (
        id,
        status,
        reason,
      ) => {
        set((state) => ({
          stores:
            state.stores.map(
              (store) => {
                if (
                  store.id !==
                  id
                ) {
                  return store;
                }

                return {
                  ...store,

                  status,

                  approvedAt:
                    status ===
                    "active"
                      ? new Date().toISOString()
                      : store.approvedAt,

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
                };
              },
            ),
        }));
      },
    }),
  );