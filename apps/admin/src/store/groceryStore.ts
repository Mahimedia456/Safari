import { create } from "zustand";

import {
  adminCommerceService,
} from "../services/commerceService";

import {
  useAuthStore,
} from "./authStore";

import type {
  GroceryBrand,
  GroceryCategory,
  GroceryOrder,
  GroceryOrderStatus,
  GroceryProduct,
  GroceryPromotion,
  GroceryRefund,
  GrocerySubstitution,
} from "../types/grocery";

type GroceryState = {
  loading: boolean;
  loaded: boolean;
  error: string | null;

  orders: GroceryOrder[];
  products: GroceryProduct[];
  categories: GroceryCategory[];
  brands: GroceryBrand[];
  substitutions: GrocerySubstitution[];
  promotions: GroceryPromotion[];
  refunds: GroceryRefund[];

  load: () => Promise<void>;

  setOrderStatus: (
    orderId: string,
    status: GroceryOrderStatus,
  ) => Promise<void>;

  toggleProductAvailability: (productId: string) => void;
  updateStock: (productId: string, stock: number) => void;
  toggleCategory: (categoryId: string) => void;
  toggleBrand: (brandId: string) => void;
  setSubstitutionDecision: (
    substitutionId: string,
    decision: "accepted" | "rejected",
  ) => void;
  togglePromotion: (promotionId: string) => void;
  setRefundStatus: (
    refundId: string,
    status: "approved" | "rejected",
  ) => void;
};

function token() {
  const value =
    useAuthStore.getState()
      .accessToken;

  if (!value) {
    throw new Error(
      "Safari admin session is required.",
    );
  }

  return value;
}

function normalizeStatus(
  value: string,
): GroceryOrderStatus {
  if (
    value ===
    "preparing"
  ) {
    return "picking";
  }

  if (
    value ===
      "ready_for_pickup" ||
    value === "packed"
  ) {
    return "packed";
  }

  if (
    value.startsWith(
      "cancelled",
    )
  ) {
    return "cancelled";
  }

  return value as GroceryOrderStatus;
}

export const useGroceryStore =
  create<GroceryState>((set, get) => ({
    loading: false,
    loaded: false,
    error: null,

    orders: [],
    products: [],
    categories: [],
    brands: [],
    substitutions: [],
    promotions: [],
    refunds: [],

    load: async () => {
      set({
        loading: true,
        error: null,
      });

      try {
        const [
          ordersData,
          storesData,
        ] =
          await Promise.all([
            adminCommerceService.orders(
              token(),
              "grocery",
            ),
            adminCommerceService.stores(
              token(),
              "grocery",
            ),
          ]);

        const stores =
          new Map(
            (
              storesData.stores ??
              []
            ).map(
              (store) => [
                store.id,
                store.name,
              ],
            ),
          );

        const orders =
          (
            ordersData.orders ??
            []
          ).map(
            (
              order,
            ): GroceryOrder => ({
              id:
                order.id,
              storeId:
                order.store_id,
              storeName:
                stores.get(
                  order.store_id,
                ) ??
                "Safari Grocery",
              customerName:
                order.passenger_id,
              customerPhone:
                "—",
              status:
                normalizeStatus(
                  order.status,
                ),
              items: [],
              subtotal:
                Number(
                  order.total ??
                    0,
                ),
              deliveryFee:
                0,
              serviceFee:
                0,
              discount: 0,
              total:
                Number(
                  order.total ??
                    0,
                ),
              paymentMethod:
                (
                  order.payment_method ||
                  "cash"
                ) as GroceryOrder["paymentMethod"],
              deliveryAddress:
                order.delivery_address ??
                "—",
              createdAt:
                order.created_at,
            }),
          );

        set({
          orders,
          loaded: true,
        });
      } catch (error) {
        set({
          orders: [],
          loaded: true,
          error:
            error instanceof Error
              ? error.message
              : "Could not load Safari Grocery.",
        });
      } finally {
        set({
          loading: false,
        });
      }
    },

    setOrderStatus:
      async (
        orderId,
        status,
      ) => {
        const apiStatus =
          status === "picking"
            ? "preparing"
            : status ===
                "packed"
              ? "ready_for_pickup"
              : status ===
                  "cancelled"
                ? "cancelled_by_admin"
                : status;

        await adminCommerceService.updateOrderStatus(
          token(),
          "grocery",
          orderId,
          {
            status:
              apiStatus as any,
          },
        );

        await get().load();
      },

    toggleProductAvailability: () => undefined,
    updateStock: () => undefined,
    toggleCategory: () => undefined,
    toggleBrand: () => undefined,
    setSubstitutionDecision: () => undefined,
    togglePromotion: () => undefined,
    setRefundStatus: () => undefined,
  }));
