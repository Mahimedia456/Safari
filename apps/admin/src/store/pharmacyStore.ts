import { create } from "zustand";

import {
  adminCommerceService,
} from "../services/commerceService";

import {
  useAuthStore,
} from "./authStore";

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

type PharmacyState = {
  loading: boolean;
  loaded: boolean;
  error: string | null;

  orders: PharmacyOrder[];
  products: PharmacyProduct[];
  categories: PharmacyCategory[];
  prescriptions: PharmacyPrescription[];
  license: PharmacyLicense | null;
  promotions: PharmacyPromotion[];
  refunds: PharmacyRefund[];

  load: () => Promise<void>;

  setOrderStatus: (
    orderId: string,
    status: PharmacyOrderStatus,
  ) => Promise<void>;

  toggleProductAvailability: (productId: string) => void;
  updateStock: (productId: string, stock: number) => void;
  toggleCategory: (categoryId: string) => void;
  setPrescriptionStatus: (
    prescriptionId: string,
    status: PrescriptionStatus,
    notes?: string,
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
): PharmacyOrderStatus {
  if (
    value === "preparing"
  ) {
    return "processing";
  }

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

  return value as PharmacyOrderStatus;
}

export const usePharmacyStore =
  create<PharmacyState>((set, get) => ({
    loading: false,
    loaded: false,
    error: null,

    orders: [],
    products: [],
    categories: [],
    prescriptions: [],
    license: null,
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
              "pharmacy",
            ),
            adminCommerceService.stores(
              token(),
              "pharmacy",
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
            ): PharmacyOrder => ({
              id:
                order.id,
              pharmacyId:
                order.store_id,
              pharmacyName:
                stores.get(
                  order.store_id,
                ) ??
                "Safari Pharmacy",
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
                ) as PharmacyOrder["paymentMethod"],
              deliveryAddress:
                order.delivery_address ??
                "—",
              prescriptionId:
                order.prescription_status &&
                order.prescription_status !==
                  "not_required"
                  ? order.id
                  : undefined,
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
              : "Could not load Safari Pharmacy.",
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
          status ===
          "processing"
            ? "preparing"
            : status ===
                "ready"
              ? "ready_for_pickup"
              : status ===
                  "cancelled"
                ? "cancelled_by_admin"
                : status;

        await adminCommerceService.updateOrderStatus(
          token(),
          "pharmacy",
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
    setPrescriptionStatus: () => undefined,
    togglePromotion: () => undefined,
    setRefundStatus: () => undefined,
  }));
