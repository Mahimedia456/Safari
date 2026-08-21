export type MerchantType =
  | "food"
  | "grocery"
  | "pharmacy"
  | "services";

export type MerchantStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "suspended";

export type AdminMerchant = {
  user_id: string;
  merchant_type: MerchantType;
  business_name: string | null;
  legal_name: string | null;
  verification_status: string;
  commission_percent: number | string;
  payout_status: string;
  approved_at: string | null;
  rejection_reason: string | null;
};

export type Merchant = {
  id: string;
  type: MerchantType;
  businessName: string;
  ownerName: string;
  email: string;
  phone: string;
  city: string;
  country: "Pakistan";
  status: MerchantStatus;
  totalStores: number;
  totalOrders: number;
  commissionPercent: number;
  payoutStatus: string;
  approvedAt: string | null;
};

export type AdminUnifiedOrder = {
  id: string;
  source_type: MerchantType;
  source_id: string;
  order_number: string;
  customer_id: string;
  merchant_user_id: string | null;
  status: string;
  currency_code: string;
  total: number | string | null;
  payment_method: string | null;
  payment_status: string | null;
  created_at: string;
};
