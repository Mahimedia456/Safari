import { create } from "zustand";

import { adminCommerceService } from "../services/commerceService";
import type {
  AdminCommerceOrder,
  AdminCommerceStore,
} from "../types/commerce";
import { useAuthStore } from "./authStore";

type CommerceType = "grocery" | "pharmacy";

type CommerceState = {
  loading: boolean;
  error: string | null;

  stores: AdminCommerceStore[];
  orders: AdminCommerceOrder[];

  loadStores: (type: CommerceType) => Promise<void>;
  loadOrders: (
    type: CommerceType,
    status?: string,
  ) => Promise<void>;

  updateOrderStatus: (
    type: CommerceType,
    orderId: string,
    input: Record<string, unknown>,
  ) => Promise<void>;
};

function token() {
  const accessToken = useAuthStore.getState().accessToken;

  if (!accessToken)
    throw new Error("Safari admin session is required.");

  return accessToken;
}

export const useCommerceStore = create<CommerceState>((set, get) => ({
  loading: false,
  error: null,
  stores: [],
  orders: [],

  loadStores: async (type) => {
    set({ loading: true, error: null });

    try {
      const data = await adminCommerceService.stores(
        token(),
        type,
      );

      set({ stores: data.stores });
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : `Could not load Safari ${type} stores.`,
      });
    } finally {
      set({ loading: false });
    }
  },

  loadOrders: async (type, status) => {
    set({ loading: true, error: null });

    try {
      const data = await adminCommerceService.orders(
        token(),
        type,
        status,
      );

      set({ orders: data.orders });
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : `Could not load Safari ${type} orders.`,
      });
    } finally {
      set({ loading: false });
    }
  },

  updateOrderStatus: async (type, orderId, input) => {
    await adminCommerceService.updateOrderStatus(
      token(),
      type,
      orderId,
      input as any,
    );

    await get().loadOrders(type);
  },
}));
