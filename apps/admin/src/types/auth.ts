export type AdminRole =
  | "super_admin"
  | "admin"
  | "operations_manager"
  | "finance_manager"
  | "support";

export type MerchantRole =
  | "food_merchant"
  | "grocery_merchant"
  | "pharmacy_merchant"
  | "services_merchant";

export type AccountRole =
  | AdminRole
  | MerchantRole;

export type AccountType =
  | "administration"
  | "merchant";

export type MerchantStoreType =
  | "food"
  | "grocery"
  | "pharmacy"
  | "services";

export interface AdminUser {
  id: string;

  fullName: string;

  email: string;

  role: AccountRole;

  accountType: AccountType;

  storeType?: MerchantStoreType;
}

export interface StoredAdminUser
  extends AdminUser {
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  fullName: string;

  email: string;

  password: string;

  accountType: AccountType;

  role: AccountRole;

  storeType?: MerchantStoreType;
}