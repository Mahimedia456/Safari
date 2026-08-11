import type {
  AccountRole,
} from "../types/auth";

export interface FoodPermissions {
  view: boolean;
  manageOrders: boolean;
  manageMenu: boolean;
  manageCategories: boolean;
  managePromotions: boolean;
  manageRefunds: boolean;
  manageReviews: boolean;
}

export function getFoodPermissions(
  role: AccountRole,
): FoodPermissions {
  switch (role) {
    case "super_admin":
    case "admin":
      return {
        view: true,
        manageOrders: true,
        manageMenu: true,
        manageCategories: true,
        managePromotions: true,
        manageRefunds: true,
        manageReviews: true,
      };

    case "operations_manager":
      return {
        view: true,
        manageOrders: true,
        manageMenu: false,
        manageCategories: false,
        managePromotions: false,
        manageRefunds: true,
        manageReviews: true,
      };

    case "support":
      return {
        view: true,
        manageOrders: false,
        manageMenu: false,
        manageCategories: false,
        managePromotions: false,
        manageRefunds: false,
        manageReviews: true,
      };

    case "food_merchant":
      return {
        view: true,
        manageOrders: true,
        manageMenu: true,
        manageCategories: true,
        managePromotions: true,
        manageRefunds: false,
        manageReviews: true,
      };

    default:
      return {
        view: false,
        manageOrders: false,
        manageMenu: false,
        manageCategories: false,
        managePromotions: false,
        manageRefunds: false,
        manageReviews: false,
      };
  }
}