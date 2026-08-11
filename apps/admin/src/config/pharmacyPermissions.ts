import type {
  AccountRole,
} from "../types/auth";

export interface PharmacyPermissions {
  view: boolean;

  manageOrders: boolean;

  manageProducts: boolean;

  manageCategories: boolean;

  manageInventory: boolean;

  reviewPrescriptions: boolean;

  manageLicense: boolean;

  managePromotions: boolean;

  manageRefunds: boolean;
}

export function getPharmacyPermissions(
  role: AccountRole,
): PharmacyPermissions {
  switch (role) {
    case "super_admin":
    case "admin":
      return {
        view: true,
        manageOrders: true,
        manageProducts: true,
        manageCategories: true,
        manageInventory: true,
        reviewPrescriptions: true,
        manageLicense: true,
        managePromotions: true,
        manageRefunds: true,
      };

    case "operations_manager":
      return {
        view: true,
        manageOrders: true,
        manageProducts: false,
        manageCategories: false,
        manageInventory: true,
        reviewPrescriptions: true,
        manageLicense: false,
        managePromotions: false,
        manageRefunds: true,
      };

    case "support":
      return {
        view: true,
        manageOrders: false,
        manageProducts: false,
        manageCategories: false,
        manageInventory: false,
        reviewPrescriptions: false,
        manageLicense: false,
        managePromotions: false,
        manageRefunds: false,
      };

    case "pharmacy_merchant":
      return {
        view: true,
        manageOrders: true,
        manageProducts: true,
        manageCategories: true,
        manageInventory: true,
        reviewPrescriptions: true,
        manageLicense: false,
        managePromotions: true,
        manageRefunds: false,
      };

    default:
      return {
        view: false,
        manageOrders: false,
        manageProducts: false,
        manageCategories: false,
        manageInventory: false,
        reviewPrescriptions: false,
        manageLicense: false,
        managePromotions: false,
        manageRefunds: false,
      };
  }
}