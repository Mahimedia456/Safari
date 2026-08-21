import { apiRequest } from "./apiClient";
import type {
  AdminFoodOrder,
  AdminFoodRestaurant,
} from "../types/food";

export const adminFoodService = {
  restaurants(accessToken: string) {
    return apiRequest<{
      restaurants: AdminFoodRestaurant[];
      total: number;
    }>(
      "/admin/food/restaurants",
      {},
      accessToken,
    );
  },

  orders(
    accessToken: string,
    status?: string,
  ) {
    const suffix = status
      ? `?status=${encodeURIComponent(status)}`
      : "";

    return apiRequest<{
      orders: AdminFoodOrder[];
      total: number;
    }>(
      `/admin/food/orders${suffix}`,
      {},
      accessToken,
    );
  },

  updateOrderStatus(
    accessToken: string,
    orderId: string,
    status:
      | "confirmed"
      | "preparing"
      | "ready_for_pickup"
      | "picked_up"
      | "on_the_way"
      | "delivered"
      | "cancelled_by_merchant"
      | "cancelled_by_admin",
    note?: string | null,
  ) {
    return apiRequest<{ order: AdminFoodOrder }>(
      `/admin/food/orders/${orderId}/status`,
      {
        method: "PATCH",
        body: JSON.stringify({
          status,
          note: note ?? null,
        }),
      },
      accessToken,
    );
  },
};
