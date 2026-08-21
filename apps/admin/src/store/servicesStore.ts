import { create } from "zustand";

import {
  adminServicesMarketplaceService,
} from "../services/servicesMarketplaceService";

import {
  useAuthStore,
} from "./authStore";

import type {
  ServiceArea,
  ServiceAvailability,
  ServiceBooking,
  ServiceBookingStatus,
  ServiceCatalogItem,
  ServiceCategory,
  ServicePromotion,
  ServiceRefund,
  ServiceReview,
  ServiceStaff,
} from "../types/services";

type ServicesState = {
  loading: boolean;
  loaded: boolean;
  error: string | null;

  bookings: ServiceBooking[];
  services: ServiceCatalogItem[];
  categories: ServiceCategory[];
  staff: ServiceStaff[];
  availability: ServiceAvailability[];
  areas: ServiceArea[];
  reviews: ServiceReview[];
  promotions: ServicePromotion[];
  refunds: ServiceRefund[];

  load: () => Promise<void>;

  setBookingStatus: (
    bookingId: string,
    status: ServiceBookingStatus,
  ) => Promise<void>;

  assignStaff: (bookingId: string, staffId: string) => void;
  toggleService: (serviceId: string) => void;
  toggleCategory: (categoryId: string) => void;
  toggleStaff: (staffId: string) => void;
  toggleAvailability: (availabilityId: string) => void;
  toggleArea: (areaId: string) => void;
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
  status: string,
): ServiceBookingStatus {
  if (
    status ===
    "requested"
  ) {
    return "pending";
  }

  if (
    status ===
      "professional_assigned" ||
    status ===
      "on_the_way"
  ) {
    return "assigned";
  }

  if (
    status.startsWith(
      "cancelled",
    )
  ) {
    return "cancelled";
  }

  return status as ServiceBookingStatus;
}

export const useServicesStore =
  create<ServicesState>((set, get) => ({
    loading: false,
    loaded: false,
    error: null,

    bookings: [],
    services: [],
    categories: [],
    staff: [],
    availability: [],
    areas: [],
    reviews: [],
    promotions: [],
    refunds: [],

    load: async () => {
      set({
        loading: true,
        error: null,
      });

      try {
        const [
          bookingData,
          providerData,
        ] =
          await Promise.all([
            adminServicesMarketplaceService.bookings(
              token(),
            ),
            adminServicesMarketplaceService.providers(
              token(),
            ),
          ]);

        const providerNames =
          new Map(
            (
              providerData.providers ??
              []
            ).map(
              (provider: any) => [
                provider.id,
                provider.business_name ??
                  "Safari Services",
              ],
            ),
          );

        const bookings =
          (
            bookingData.bookings ??
            []
          ).map(
            (
              booking: any,
            ): ServiceBooking => {
              const scheduled =
                booking.scheduled_for
                  ? new Date(
                      booking.scheduled_for,
                    )
                  : null;

              const total =
                Number(
                  booking.final_total ??
                    booking.estimated_total ??
                    0,
                );

              return {
                id: booking.id,
                businessId:
                  booking.provider_id,
                businessName:
                  providerNames.get(
                    booking.provider_id,
                  ) ??
                  "Safari Services",
                serviceId:
                  booking.service_id,
                serviceName:
                  booking.service_id,
                customerName:
                  booking.customer_id,
                customerPhone:
                  "—",
                status:
                  normalizeStatus(
                    booking.booking_status,
                  ),
                scheduledDate:
                  scheduled
                    ? scheduled
                        .toISOString()
                        .slice(
                          0,
                          10,
                        )
                    : "—",
                scheduledTime:
                  scheduled
                    ? scheduled
                        .toTimeString()
                        .slice(
                          0,
                          5,
                        )
                    : "—",
                durationMinutes:
                  0,
                address:
                  booking.service_address ??
                  "—",
                price: total,
                discount: 0,
                serviceFee: 0,
                total,
                paymentMethod:
                  (
                    booking.payment_method ??
                    "cash"
                  ) as ServiceBooking["paymentMethod"],
                notes:
                  booking.customer_note ??
                  undefined,
                createdAt:
                  booking.created_at ??
                  booking.requested_at ??
                  new Date().toISOString(),
              };
            },
          );

        set({
          bookings,
          loaded: true,
        });
      } catch (error) {
        set({
          bookings: [],
          loaded: true,
          error:
            error instanceof Error
              ? error.message
              : "Could not load Safari Services.",
        });
      } finally {
        set({
          loading: false,
        });
      }
    },

    setBookingStatus:
      async (
        bookingId,
        status,
      ) => {
        const apiStatus =
          status ===
          "pending"
            ? "requested"
            : status ===
                "assigned"
              ? "professional_assigned"
              : status ===
                  "cancelled"
                ? "cancelled_by_admin"
                : status;

        await adminServicesMarketplaceService.updateBookingStatus(
          token(),
          bookingId,
          {
            status:
              apiStatus,
          },
        );

        await get().load();
      },

    assignStaff: () => undefined,
    toggleService: () => undefined,
    toggleCategory: () => undefined,
    toggleStaff: () => undefined,
    toggleAvailability: () => undefined,
    toggleArea: () => undefined,
    togglePromotion: () => undefined,
    setRefundStatus: () => undefined,
  }));
