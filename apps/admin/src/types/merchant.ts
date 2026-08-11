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

export type VerificationStatus =
  | "pending"
  | "verified"
  | "rejected";

export type DocumentType =
  | "identity"
  | "business_registration"
  | "tax"
  | "bank"
  | "license";

export interface MerchantDocument {
  id: string;
  type: DocumentType;
  name: string;
  number?: string;
  expiryDate?: string;
  status: VerificationStatus;
}

export interface MerchantStore {
  id: string;
  name: string;
  type: MerchantType;
  city: string;
  country: string;
  status:
    | "active"
    | "inactive"
    | "pending";
  commissionPercentage: number;
}

export interface MerchantBankDetails {
  accountTitle: string;
  bankName: string;
  accountNumber: string;
  iban?: string;
  currency: string;
  verified: boolean;
}

export interface MerchantNote {
  id: string;
  text: string;
  author: string;
  createdAt: string;
}

export interface MerchantActivity {
  id: string;
  title: string;
  description: string;
  createdAt: string;
}

export interface Merchant {
  id: string;

  ownerName: string;
  businessName: string;

  email: string;
  phone: string;

  type: MerchantType;
  status: MerchantStatus;

  country: string;
  city: string;

  address: string;

  registeredAt: string;

  approvedAt?: string;

  rejectionReason?: string;
  suspensionReason?: string;

  totalStores: number;
  activeStores: number;

  totalOrders: number;
  grossSales: number;

  documents: MerchantDocument[];

  stores: MerchantStore[];

  bankDetails: MerchantBankDetails;

  notes: MerchantNote[];

  activities: MerchantActivity[];
}