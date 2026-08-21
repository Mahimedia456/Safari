import { create } from "zustand";

import {
  adminFoodService,
} from "../services/foodService";

import {
  useAuthStore,
} from "./authStore";

import { usePassengerStore } from "./passengerStore";

import type {
  FoodCategory,
  FoodMenuItem,
  FoodOrder,
  FoodOrderStatus,
  FoodPromotion,
  FoodRefund,
  FoodReview,
} from "../types/food";

type FoodState = {
  loading: boolean;
  loaded: boolean;
  error: string | null;

  restaurants: Array<Record<string, unknown>>;
  orders: FoodOrder[];
  categories: FoodCategory[];
  menuItems: FoodMenuItem[];
  promotions: FoodPromotion[];
  refunds: FoodRefund[];
  reviews: FoodReview[];

  loadRestaurants: () => Promise<void>;
  loadOrders: () => Promise<void>;

  setOrderStatus: (
    orderId: string,
    status: FoodOrderStatus,
  ) => Promise<void>;

  toggleCategory: (categoryId: string) => void;
  toggleMenuAvailability: (menuItemId: string) => void;
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
): FoodOrderStatus {
  if (
    value ===
    "ready_for_pickup"
  ) {
    return "ready";
  }

  if (
    value.startsWith(
      "cancelled",
    )
  ) {
    return "cancelled";
  }

  return value as FoodOrderStatus;
}

export const useFoodStore =
  create<FoodState>((set, get) => ({
    loading: false,
    loaded: false,
    error: null,

    restaurants: [],
    orders: [],
    categories: [],
    menuItems: [],
    promotions: [],
    refunds: [],
    reviews: [],

    loadRestaurants:
      async () => {
        try {
          const data =
            await adminFoodService.restaurants(
              token(),
            );

          set({
            restaurants:
              data.restaurants ??
              [],
          });
        } catch (error) {
          set({
            error:
              error instanceof Error
                ? error.message
                : "Could not load Safari Food restaurants.",
          });
        }
      },

    loadOrders:
      async () => {
        set({
          loading: true,
          error: null,
        });

        try {
          const data =
            await adminFoodService.orders(
              token(),
            );

          const orders =
            (
              data.orders ??
              []
            ).map(
              (
                order,
              ): FoodOrder => ({
                id:
                  order.id,
                restaurantId:
                  order.restaurant_id,
                restaurantName:
                  order.food_restaurants
                    ?.name ??
                  "Safari Food",
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
                  ) as FoodOrder["paymentMethod"],
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
                : "Could not load Safari Food orders.",
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
          status === "ready"
            ? "ready_for_pickup"
            : status ===
                "cancelled"
              ? "cancelled_by_admin"
              : status;

        await adminFoodService.updateOrderStatus(
          token(),
          orderId,
          apiStatus as any,
        );

        await get().loadOrders();
      },

    toggleCategory: () => undefined,
    toggleMenuAvailability: () => undefined,
    togglePromotion: () => undefined,
    setRefundStatus: () => undefined,
  }));
