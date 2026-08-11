import {
  create,
} from "zustand";

import {
  dummyFoodCategories,
  dummyFoodMenuItems,
  dummyFoodOrders,
  dummyFoodPromotions,
  dummyFoodRefunds,
  dummyFoodReviews,
} from "../data/food";

import type {
  FoodCategory,
  FoodMenuItem,
  FoodOrder,
  FoodOrderStatus,
  FoodPromotion,
  FoodRefund,
  FoodReview,
} from "../types/food";

interface FoodState {
  orders: FoodOrder[];
  categories: FoodCategory[];
  menuItems: FoodMenuItem[];
  promotions: FoodPromotion[];
  reviews: FoodReview[];
  refunds: FoodRefund[];

  setOrderStatus: (
    orderId: string,
    status: FoodOrderStatus,
  ) => void;

  toggleMenuAvailability: (
    itemId: string,
  ) => void;

  toggleCategory: (
    categoryId: string,
  ) => void;

  togglePromotion: (
    promotionId: string,
  ) => void;

  setRefundStatus: (
    refundId: string,
    status:
      | "approved"
      | "rejected",
  ) => void;
}

export const useFoodStore =
  create<FoodState>(
    (set) => ({
      orders:
        dummyFoodOrders,

      categories:
        dummyFoodCategories,

      menuItems:
        dummyFoodMenuItems,

      promotions:
        dummyFoodPromotions,

      reviews:
        dummyFoodReviews,

      refunds:
        dummyFoodRefunds,

      setOrderStatus: (
        orderId,
        status,
      ) => {
        set((state) => ({
          orders:
            state.orders.map(
              (order) =>
                order.id ===
                orderId
                  ? {
                      ...order,
                      status,
                    }
                  : order,
            ),
        }));
      },

      toggleMenuAvailability:
        (itemId) => {
          set((state) => ({
            menuItems:
              state.menuItems.map(
                (item) =>
                  item.id ===
                  itemId
                    ? {
                        ...item,

                        available:
                          !item.available,
                      }
                    : item,
              ),
          }));
        },

      toggleCategory: (
        categoryId,
      ) => {
        set((state) => ({
          categories:
            state.categories.map(
              (category) =>
                category.id ===
                categoryId
                  ? {
                      ...category,

                      active:
                        !category.active,
                    }
                  : category,
            ),
        }));
      },

      togglePromotion: (
        promotionId,
      ) => {
        set((state) => ({
          promotions:
            state.promotions.map(
              (promotion) =>
                promotion.id ===
                promotionId
                  ? {
                      ...promotion,

                      active:
                        !promotion.active,
                    }
                  : promotion,
            ),
        }));
      },

      setRefundStatus: (
        refundId,
        status,
      ) => {
        set((state) => ({
          refunds:
            state.refunds.map(
              (refund) =>
                refund.id ===
                refundId
                  ? {
                      ...refund,
                      status,
                    }
                  : refund,
            ),
        }));
      },
    }),
  );