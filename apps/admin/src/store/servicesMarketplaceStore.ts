import { create } from "zustand";

import { adminServicesMarketplaceService } from "../services/servicesMarketplaceService";
import type {
  AdminServiceBooking,
  AdminServiceProvider,
} from "../types/servicesMarketplace";
import { useAuthStore } from "./authStore";

type ServicesState = {
  loading: boolean;
  error: string | null;

  providers: AdminServiceProvider[];
  bookings: AdminServiceBooking[];

  loadProviders: () => Promise<void>;
  loadBookings: (status?: string) => Promise<void>;

  updateBookingStatus: (
    bookingId: string,
    input: Record<string, unknown>,
  ) => Promise<void>;
};

function token() {
  const accessToken = useAuthStore.getState().accessToken;

  if (!accessToken)
    throw new Error("Safari admin session is required.");

  return accessToken;
}

export const useServicesMarketplaceStore =
  create<ServicesState>((set, get) => ({
    loading: false,
    error: null,

    providers: [],
    bookings: [],

    loadProviders: async () => {
      set({ loading: true, error: null });

      try {
        const data =
          await adminServicesMarketplaceService.providers(
            token(),
          );

        set({ providers: data.providers });
      } catch (error) {
        set({
          error:
            error instanceof Error
              ? error.message
              : "Could not load Safari service providers.",
        });
      } finally {
        set({ loading: false });
      }
    },

    loadBookings: async (status) => {
      set({ loading: true, error: null });

      try {
        const data =
          await adminServicesMarketplaceService.bookings(
            token(),
            status,
          );

        set({ bookings: data.bookings });
      } catch (error) {
        set({
          error:
            error instanceof Error
              ? error.message
              : "Could not load Safari service bookings.",
        });
      } finally {
        set({ loading: false });
      }
    },

    updateBookingStatus: async (bookingId, input) => {
      await adminServicesMarketplaceService.updateBookingStatus(
        token(),
        bookingId,
        input as any,
      );

      await get().loadBookings();
    },
  }));
