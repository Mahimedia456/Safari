import type {
  AccountRole,
} from "./auth";

export type MerchantPortalRole =
  | "food_merchant"
  | "grocery_merchant"
  | "pharmacy_merchant"
  | "services_merchant";

export type MerchantPayoutStatus =
  | "pending"
  | "processing"
  | "paid"
  | "rejected";

export interface MerchantPortalProfile {
  id: string;

  role: MerchantPortalRole;

  businessName: string;

  ownerName: string;

  email: string;

  phone: string;

  region:
    | "Pakistan"
    | "Germany";

  currency:
    | "PKR"
    | "EUR";

  commissionPercent: number;

  bankName: string;

  accountTitle: string;

  accountNumberMasked: string;

  businessAddress: string;

  city: string;

  enabled: boolean;
}

export interface MerchantEarningEntry {
  id: string;

  merchantRole:
    MerchantPortalRole;

  referenceId: string;

  grossAmount: number;

  commissionPercent: number;

  commissionAmount: number;

  refundAmount: number;

  netAmount: number;

  currency:
    | "PKR"
    | "EUR";

  status:
    | "pending"
    | "settled";

  createdAt: string;
}

export interface MerchantPayoutEntry {
  id: string;

  merchantRole:
    MerchantPortalRole;

  amount: number;

  currency:
    | "PKR"
    | "EUR";

  bankName: string;

  accountMasked: string;

  status:
    MerchantPayoutStatus;

  requestedAt: string;

  processedAt?: string;
}

export function isMerchantRole(
  role: AccountRole,
): role is MerchantPortalRole {
  return (
    role === "food_merchant" ||
    role === "grocery_merchant" ||
    role === "pharmacy_merchant" ||
    role === "services_merchant"
  );
}