import type {
  AccountRole,
} from "../types/auth";

export interface GroceryPermissions {
  view: boolean;

  manageOrders: boolean;

  manageProducts: boolean;

  manageCategories: boolean;

  manageBrands: boolean;

  manageInventory: boolean;

  manageSubstitutions: boolean;

  managePromotions: boolean;

  manageRefunds: boolean;
}

export function getGroceryPermissions(
  role: AccountRole,
): GroceryPermissions {
  switch (role) {
    case "super_admin":
    case "admin":
      return {
        view: true,

        manageOrders: true,

        manageProducts: true,

        manageCategories: true,

        manageBrands: true,

        manageInventory: true,

        manageSubstitutions: true,

        managePromotions: true,

        manageRefunds: true,
      };

    case "operations_manager":
      return {
        view: true,

        manageOrders: true,

        manageProducts: false,

        manageCategories: false,

        manageBrands: false,

        manageInventory: true,

        manageSubstitutions: true,

        managePromotions: false,

        manageRefunds: true,
      };

    case "support":
      return {
        view: true,

        manageOrders: false,

        manageProducts: false,

        manageCategories: false,

        manageBrands: false,

        manageInventory: false,

        manageSubstitutions: false,

        managePromotions: false,

        manageRefunds: false,
      };

    case "grocery_merchant":
      return {
        view: true,

        manageOrders: true,

        manageProducts: true,

        manageCategories: true,

        manageBrands: true,

        manageInventory: true,

        manageSubstitutions: true,

        managePromotions: true,

        manageRefunds: false,
      };

    default:
      return {
        view: false,

        manageOrders: false,

        manageProducts: false,

        manageCategories: false,

        manageBrands: false,

        manageInventory: false,

        manageSubstitutions: false,

        managePromotions: false,

        manageRefunds: false,
      };
  }
}