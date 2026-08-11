import {
  create,
} from "zustand";

import {
  dummyPharmacyCategories,
  dummyPharmacyLicense,
  dummyPharmacyOrders,
  dummyPharmacyPrescriptions,
  dummyPharmacyProducts,
  dummyPharmacyPromotions,
  dummyPharmacyRefunds,
} from "../data/pharmacy";

import type {
  PharmacyCategory,
  PharmacyLicense,
  PharmacyOrder,
  PharmacyOrderStatus,
  PharmacyPrescription,
  PharmacyProduct,
  PharmacyPromotion,
  PharmacyRefund,
  PrescriptionStatus,
} from "../types/pharmacy";

interface PharmacyState {
  orders: PharmacyOrder[];

  products: PharmacyProduct[];

  categories: PharmacyCategory[];

  prescriptions: PharmacyPrescription[];

  license: PharmacyLicense;

  promotions: PharmacyPromotion[];

  refunds: PharmacyRefund[];

  setOrderStatus: (
    orderId: string,
    status: PharmacyOrderStatus,
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

  setPrescriptionStatus: (
    prescriptionId: string,
    status: PrescriptionStatus,
    notes?: string,
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

export const usePharmacyStore =
  create<PharmacyState>((set) => ({
    orders: dummyPharmacyOrders,

    products: dummyPharmacyProducts,

    categories: dummyPharmacyCategories,

    prescriptions: dummyPharmacyPrescriptions,

    license: dummyPharmacyLicense,

    promotions: dummyPharmacyPromotions,

    refunds: dummyPharmacyRefunds,

    setOrderStatus: (
      orderId,
      status,
    ) => {
      set((state) => ({
        orders: state.orders.map(
          (order) =>
            order.id === orderId
              ? {
                  ...order,
                  status,
                }
              : order,
        ),
      }));
    },

    toggleProductAvailability: (
      productId,
    ) => {
      set((state) => ({
        products: state.products.map(
          (product) =>
            product.id === productId
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
        products: state.products.map(
          (product) =>
            product.id === productId
              ? {
                  ...product,
                  stock: Math.max(
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

    setPrescriptionStatus: (
      prescriptionId,
      status,
      notes,
    ) => {
      set((state) => ({
        prescriptions:
          state.prescriptions.map(
            (prescription) =>
              prescription.id ===
              prescriptionId
                ? {
                    ...prescription,

                    status,

                    notes,

                    reviewedAt:
                      new Date().toISOString(),
                  }
                : prescription,
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
        refunds: state.refunds.map(
          (refund) =>
            refund.id === refundId
              ? {
                  ...refund,
                  status,
                }
              : refund,
        ),
      }));
    },
  }));