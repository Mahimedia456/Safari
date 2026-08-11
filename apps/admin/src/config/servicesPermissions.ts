import type {
  AccountRole,
} from "../types/auth";

export interface ServicesPermissions {
  view: boolean;

  manageBookings: boolean;

  manageServices: boolean;

  manageCategories: boolean;

  manageStaff: boolean;

  manageAvailability: boolean;

  manageAreas: boolean;

  managePromotions: boolean;

  manageReviews: boolean;

  manageRefunds: boolean;
}

export function getServicesPermissions(
  role: AccountRole,
): ServicesPermissions {
  switch (role) {
    case "super_admin":
    case "admin":
      return {
        view: true,

        manageBookings: true,

        manageServices: true,

        manageCategories: true,

        manageStaff: true,

        manageAvailability: true,

        manageAreas: true,

        managePromotions: true,

        manageReviews: true,

        manageRefunds: true,
      };

    case "operations_manager":
      return {
        view: true,

        manageBookings: true,

        manageServices: false,

        manageCategories: false,

        manageStaff: true,

        manageAvailability: true,

        manageAreas: true,

        managePromotions: false,

        manageReviews: true,

        manageRefunds: true,
      };

    case "support":
      return {
        view: true,

        manageBookings: false,

        manageServices: false,

        manageCategories: false,

        manageStaff: false,

        manageAvailability: false,

        manageAreas: false,

        managePromotions: false,

        manageReviews: true,

        manageRefunds: false,
      };

    case "services_merchant":
      return {
        view: true,

        manageBookings: true,

        manageServices: true,

        manageCategories: true,

        manageStaff: true,

        manageAvailability: true,

        manageAreas: true,

        managePromotions: true,

        manageReviews: true,

        manageRefunds: false,
      };

    default:
      return {
        view: false,

        manageBookings: false,

        manageServices: false,

        manageCategories: false,

        manageStaff: false,

        manageAvailability: false,

        manageAreas: false,

        managePromotions: false,

        manageReviews: false,

        manageRefunds: false,
      };
  }
}