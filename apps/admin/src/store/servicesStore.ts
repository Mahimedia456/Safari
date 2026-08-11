import {
  create,
} from "zustand";

import {
  dummyServiceAreas,
  dummyServiceAvailability,
  dummyServiceBookings,
  dummyServiceCategories,
  dummyServicePromotions,
  dummyServiceRefunds,
  dummyServiceReviews,
  dummyServiceStaff,
  dummyServices,
} from "../data/services";

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

interface ServicesState {
  bookings: ServiceBooking[];

  services: ServiceCatalogItem[];

  categories: ServiceCategory[];

  staff: ServiceStaff[];

  availability: ServiceAvailability[];

  areas: ServiceArea[];

  reviews: ServiceReview[];

  promotions: ServicePromotion[];

  refunds: ServiceRefund[];

  setBookingStatus: (
    bookingId: string,
    status: ServiceBookingStatus,
  ) => void;

  assignStaff: (
    bookingId: string,
    staffId: string,
  ) => void;

  toggleService: (
    serviceId: string,
  ) => void;

  toggleCategory: (
    categoryId: string,
  ) => void;

  toggleStaff: (
    staffId: string,
  ) => void;

  toggleAvailability: (
    availabilityId: string,
  ) => void;

  toggleArea: (
    areaId: string,
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

export const useServicesStore =
  create<ServicesState>(
    (set, get) => ({
      bookings:
        dummyServiceBookings,

      services:
        dummyServices,

      categories:
        dummyServiceCategories,

      staff:
        dummyServiceStaff,

      availability:
        dummyServiceAvailability,

      areas:
        dummyServiceAreas,

      reviews:
        dummyServiceReviews,

      promotions:
        dummyServicePromotions,

      refunds:
        dummyServiceRefunds,

      setBookingStatus: (
        bookingId,
        status,
      ) => {
        set((state) => ({
          bookings:
            state.bookings.map(
              (booking) =>
                booking.id ===
                bookingId
                  ? {
                      ...booking,
                      status,
                    }
                  : booking,
            ),
        }));
      },

      assignStaff: (
        bookingId,
        staffId,
      ) => {
        const staffMember =
          get().staff.find(
            (item) =>
              item.id ===
              staffId,
          );

        if (!staffMember) {
          return;
        }

        set((state) => ({
          bookings:
            state.bookings.map(
              (booking) =>
                booking.id ===
                bookingId
                  ? {
                      ...booking,

                      staffId:
                        staffMember.id,

                      staffName:
                        staffMember.name,

                      status:
                        booking.status ===
                        "pending"
                          ? "assigned"
                          : booking.status,
                    }
                  : booking,
            ),
        }));
      },

      toggleService: (
        serviceId,
      ) => {
        set((state) => ({
          services:
            state.services.map(
              (service) =>
                service.id ===
                serviceId
                  ? {
                      ...service,
                      active:
                        !service.active,
                    }
                  : service,
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

      toggleStaff: (
        staffId,
      ) => {
        set((state) => ({
          staff:
            state.staff.map(
              (staff) =>
                staff.id ===
                staffId
                  ? {
                      ...staff,
                      active:
                        !staff.active,
                    }
                  : staff,
            ),
        }));
      },

      toggleAvailability: (
        availabilityId,
      ) => {
        set((state) => ({
          availability:
            state.availability.map(
              (item) =>
                item.id ===
                availabilityId
                  ? {
                      ...item,
                      enabled:
                        !item.enabled,
                    }
                  : item,
            ),
        }));
      },

      toggleArea: (
        areaId,
      ) => {
        set((state) => ({
          areas:
            state.areas.map(
              (area) =>
                area.id ===
                areaId
                  ? {
                      ...area,
                      active:
                        !area.active,
                    }
                  : area,
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