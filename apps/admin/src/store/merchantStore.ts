import { create } from "zustand";

import { adminMerchantService } from "../services/merchantService";
import { adminFoodService } from "../services/foodService";
import { adminCommerceService } from "../services/commerceService";
import { adminServicesMarketplaceService } from "../services/servicesMarketplaceService";

import type {
  AdminMerchant,
  AdminUnifiedOrder,
  Merchant,
  MerchantStatus,
} from "../types/merchant";

import { useAuthStore } from "./authStore";

type MerchantState = {
  loading: boolean;
  loaded: boolean;
  error: string | null;

  merchants: Merchant[];
  orders: AdminUnifiedOrder[];

  loadMerchants: (filters?: {
    type?: string;
    verificationStatus?: string;
  }) => Promise<void>;

  loadOrders: () => Promise<void>;
  setStatus: (merchantId: string, status: MerchantStatus, reason?: string) => Promise<void>;
  addNote: (merchantId: string, text: string, author: string) => void;
};

function token() {
  const accessToken =
    useAuthStore.getState().accessToken;

  if (!accessToken) {
    throw new Error(
      "Safari admin session is required.",
    );
  }

  return accessToken;
}

function normalizeMerchantStatus(
  value: string,
): MerchantStatus {
  if (value === "verified") {
    return "approved";
  }

  if (
    value === "in_review" ||
    value === "pending"
  ) {
    return "pending";
  }

  if (value === "suspended") {
    return "suspended";
  }

  return "rejected";
}

export const useMerchantStore =
  create<MerchantState>((set) => ({
    loading: false,
    loaded: false,
    error: null,

    merchants: [],
    orders: [],

    loadMerchants: async (filters) => {
      set({
        loading: true,
        error: null,
      });

      try {
        const accessToken = token();

        const [
          merchantData,
          unifiedOrderData,
          foodRestaurants,
          groceryStores,
          pharmacyStores,
          serviceProviders,
        ] = await Promise.all([
          adminMerchantService.list(
            accessToken,
            filters,
          ),
          adminMerchantService.unifiedOrders(
            accessToken,
          ),
          adminFoodService.restaurants(
            accessToken,
          ),
          adminCommerceService.stores(
            accessToken,
            "grocery",
          ),
          adminCommerceService.stores(
            accessToken,
            "pharmacy",
          ),
          adminServicesMarketplaceService.providers(
            accessToken,
          ),
        ]);

        const orders =
          unifiedOrderData.orders ?? [];

        const storesByMerchant =
          new Map<
            string,
            Array<{
              name: string;
              address?: string | null;
              city?: string | null;
            }>
          >();

        const pushStore = (
          merchantId: string | null | undefined,
          store: {
            name: string;
            address?: string | null;
            city?: string | null;
          },
        ) => {
          if (!merchantId) return;

          const current =
            storesByMerchant.get(
              merchantId,
            ) ?? [];

          current.push(store);

          storesByMerchant.set(
            merchantId,
            current,
          );
        };

        for (
          const restaurant of
          foodRestaurants.restaurants ??
          []
        ) {
          pushStore(
            restaurant.merchant_user_id,
            {
              name: restaurant.name,
              address:
                restaurant.address,
            },
          );
        }

        for (
          const store of
          groceryStores.stores ??
          []
        ) {
          pushStore(
            store.merchant_user_id,
            {
              name: store.name,
              address:
                store.address,
            },
          );
        }

        for (
          const store of
          pharmacyStores.stores ??
          []
        ) {
          pushStore(
            store.merchant_user_id,
            {
              name: store.name,
              address:
                store.address,
            },
          );
        }

        for (
          const provider of
          serviceProviders.providers ??
          []
        ) {
          pushStore(
            provider.merchant_user_id,
            {
              name:
                provider.business_name ??
                "Safari Services",
              address:
                provider.address,
            },
          );
        }

        const orderCounts =
          new Map<string, number>();

        for (const order of orders) {
          if (!order.merchant_user_id) {
            continue;
          }

          orderCounts.set(
            order.merchant_user_id,
            (
              orderCounts.get(
                order.merchant_user_id,
              ) ?? 0
            ) + 1,
          );
        }

        const merchants: Merchant[] =
          (
            merchantData.merchants ??
            []
          ).map(
            (
              merchant: AdminMerchant,
            ) => {
              const stores =
                storesByMerchant.get(
                  merchant.user_id,
                ) ?? [];

              const firstStore =
                stores[0];

              return {
                id:
                  merchant.user_id,
                type:
                  merchant.merchant_type,
                businessName:
                  merchant.business_name ??
                  merchant.legal_name ??
                  firstStore?.name ??
                  "Safari Merchant",
                ownerName:
                  merchant.legal_name ??
                  merchant.business_name ??
                  "Safari Partner",
                email: "—",
                phone: "—",
                city: inferCity(
                  firstStore?.address,
                ),
                country: "Pakistan",
                status:
                  normalizeMerchantStatus(
                    merchant.verification_status,
                  ),
                totalStores:
                  stores.length,
                totalOrders:
                  orderCounts.get(
                    merchant.user_id,
                  ) ?? 0,
                commissionPercent:
                  Number(
                    merchant.commission_percent ??
                      0,
                  ),
                payoutStatus:
                  merchant.payout_status ??
                  "—",
                approvedAt:
                  merchant.approved_at,
                address: firstStore?.address ?? "Pakistan",
                registeredAt: merchant.approved_at ?? new Date().toISOString(),
                activeStores: stores.length,
                grossSales: 0,
                stores: stores.map((store, index) => ({
                  id: `${merchant.user_id}-${index + 1}`,
                  name: store.name,
                  type: merchant.merchant_type,
                  city: inferCity(store.address),
                  country: "Pakistan" as const,
                  status: "active",
                  commissionPercentage: Number(merchant.commission_percent ?? 0),
                })),
                documents: [],
                bankDetails: {
                  accountTitle: merchant.legal_name ?? merchant.business_name ?? "Safari Merchant",
                  bankName: "—",
                  accountNumber: "—",
                  iban: "—",
                  currency: "PKR",
                  verified: false,
                },
                notes: [],
                activities: [],
                rejectionReason: merchant.rejection_reason,
                suspensionReason: null,
              };
            },
          );

        set({
          merchants,
          orders,
          loaded: true,
        });
      } catch (error) {
        set({
          merchants: [],
          loaded: true,
          error:
            error instanceof Error
              ? error.message
              : "Could not load Safari merchants.",
        });
      } finally {
        set({
          loading: false,
        });
      }
    },

    loadOrders: async () => {
      try {
        const data =
          await adminMerchantService.unifiedOrders(
            token(),
          );

        set({
          orders:
            data.orders ?? [],
        });
      } catch (error) {
        set({
          error:
            error instanceof Error
              ? error.message
              : "Could not load Safari unified orders.",
        });
      }
    },

    setStatus: async (merchantId, status, reason) => {
      const verificationStatus =
        status === "approved" ? "verified" :
        status === "pending" ? "in_review" :
        status;

      await adminMerchantService.updateStatus(token(), merchantId, {
        verificationStatus,
        rejectionReason: status === "rejected" ? (reason ?? null) : null,
      });

      set((state) => ({
        merchants: state.merchants.map((merchant) =>
          merchant.id === merchantId
            ? {
                ...merchant,
                status,
                rejectionReason: status === "rejected" ? (reason ?? null) : null,
                suspensionReason: status === "suspended" ? (reason ?? null) : null,
              }
            : merchant,
        ),
      }));
    },

    addNote: (merchantId, text, author) => {
      set((state) => ({
        merchants: state.merchants.map((merchant) =>
          merchant.id === merchantId
            ? {
                ...merchant,
                notes: [
                  { id: `NOTE-${Date.now()}`, text, author, createdAt: new Date().toISOString() },
                  ...merchant.notes,
                ],
              }
            : merchant,
        ),
      }));
    },
  }));

function inferCity(
  address?: string | null,
) {
  const text =
    (address ?? "")
      .toLowerCase();

  if (
    text.includes("lahore")
  ) {
    return "Lahore";
  }

  if (
    text.includes("islamabad")
  ) {
    return "Islamabad";
  }

  if (
    text.includes("rawalpindi")
  ) {
    return "Rawalpindi";
  }

  if (
    text.includes("karachi")
  ) {
    return "Karachi";
  }

  return "Pakistan";
}
