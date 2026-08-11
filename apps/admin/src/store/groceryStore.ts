import {
  create,
} from "zustand";

import {
  dummyGroceryBrands,
  dummyGroceryCategories,
  dummyGroceryOrders,
  dummyGroceryProducts,
  dummyGroceryPromotions,
  dummyGroceryRefunds,
  dummyGrocerySubstitutions,
} from "../data/grocery";

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

interface GroceryState {
  orders: GroceryOrder[];

  products: GroceryProduct[];

  categories: GroceryCategory[];

  brands: GroceryBrand[];

  substitutions:
    GrocerySubstitution[];

  promotions:
    GroceryPromotion[];

  refunds:
    GroceryRefund[];

  setOrderStatus: (
    orderId: string,
    status: GroceryOrderStatus,
  ) => void;

  toggleProductAvailability: (
    productId: string,
  ) => void;

  updateStock: (
    productId: string,
    stock: number,
  ) => void;

  toggleCategory: (
    categoryId: string,
  ) => void;

  toggleBrand: (
    brandId: string,
  ) => void;

  setSubstitutionDecision: (
    substitutionId: string,
    decision:
      | "accepted"
      | "rejected",
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

export const useGroceryStore =
  create<GroceryState>(
    (set) => ({
      orders:
        dummyGroceryOrders,

      products:
        dummyGroceryProducts,

      categories:
        dummyGroceryCategories,

      brands:
        dummyGroceryBrands,

      substitutions:
        dummyGrocerySubstitutions,

      promotions:
        dummyGroceryPromotions,

      refunds:
        dummyGroceryRefunds,

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

      toggleProductAvailability:
        (productId) => {
          set((state) => ({
            products:
              state.products.map(
                (product) =>
                  product.id ===
                  productId
                    ? {
                        ...product,
                        available:
                          !product.available,
                      }
                    : product,
              ),
          }));
        },

      updateStock: (
        productId,
        stock,
      ) => {
        set((state) => ({
          products:
            state.products.map(
              (product) =>
                product.id ===
                productId
                  ? {
                      ...product,
                      stock:
                        Math.max(
                          0,
                          stock,
                        ),
                    }
                  : product,
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

      toggleBrand: (
        brandId,
      ) => {
        set((state) => ({
          brands:
            state.brands.map(
              (brand) =>
                brand.id ===
                brandId
                  ? {
                      ...brand,
                      active:
                        !brand.active,
                    }
                  : brand,
            ),
        }));
      },

      setSubstitutionDecision:
        (
          substitutionId,
          decision,
        ) => {
          set((state) => ({
            substitutions:
              state.substitutions.map(
                (item) =>
                  item.id ===
                  substitutionId
                    ? {
                        ...item,
                        customerDecision:
                          decision,
                      }
                    : item,
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