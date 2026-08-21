export type MerchantType = "food" | "grocery" | "pharmacy" | "services";
export type MerchantStatus = "pending" | "approved" | "rejected" | "suspended";

export type MerchantStore = {
  id: string;
  name: string;
  type: MerchantType;
  city: string;
  country: "Pakistan";
  status: string;
  commissionPercentage: number;
};

export type MerchantDocument = {
  id: string;
  type: string;
  name: string;
  number?: string;
  status: "pending" | "verified" | "rejected" | "expired" | string;
  expiryDate?: string;
};

export type MerchantBankDetails = {
  accountTitle: string;
  bankName: string;
  accountNumber: string;
  iban?: string;
  currency: string;
  verified: boolean;
};

export type MerchantNote = { id: string; text: string; author: string; createdAt: string };
export type MerchantActivity = { id: string; title: string; description: string; createdAt: string };

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
  address: string;
  registeredAt: string;
  approvedAt?: string | null;
  totalStores: number;
  activeStores: number;
  totalOrders: number;
  grossSales: number;
  commissionPercent?: number;
  payoutStatus?: string;
  stores: MerchantStore[];
  documents: MerchantDocument[];
  bankDetails: MerchantBankDetails;
  notes: MerchantNote[];
  activities: MerchantActivity[];
  rejectionReason?: string | null;
  suspensionReason?: string | null;
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
