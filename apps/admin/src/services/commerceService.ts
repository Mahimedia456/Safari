import { apiRequest } from "./apiClient";
import type {
  AdminCommerceOrder,
  AdminCommerceStore,
} from "../types/commerce";

export const adminCommerceService = {
  stores(
    accessToken: string,
    type: "grocery" | "pharmacy",
  ) {
    return apiRequest<{
      stores: AdminCommerceStore[];
      total: number;
    }>(
      `/admin/commerce/${type}/stores`,
      {},
      accessToken,
    );
  },

  orders(
    accessToken: string,
    type: "grocery" | "pharmacy",
    status?: string,
  ) {
    const suffix = status
      ? `?status=${encodeURIComponent(status)}`
      : "";

    return apiRequest<{
      orders: AdminCommerceOrder[];
      total: number;
    }>(
      `/admin/commerce/${type}/orders${suffix}`,
      {},
      accessToken,
    );
  },

  updateOrderStatus(
    accessToken: string,
    type: "grocery" | "pharmacy",
    orderId: string,
    input: {
      status:
        | "confirmed"
        | "preparing"
        | "ready_for_pickup"
        | "picked_up"
        | "on_the_way"
        | "delivered"
        | "cancelled_by_merchant"
        | "cancelled_by_admin";
      prescriptionStatus?: string;
      note?: string | null;
    },
  ) {
    return apiRequest<{
      order: AdminCommerceOrder;
    }>(
      `/admin/commerce/${type}/orders/${orderId}/status`,
      {
        method: "PATCH",
        body: JSON.stringify(input),
      },
      accessToken,
    );
  },
};
