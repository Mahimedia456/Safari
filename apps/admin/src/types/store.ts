export type StoreType =
  | "food"
  | "grocery"
  | "pharmacy"
  | "services";

export type StoreStatus =
  | "pending"
  | "active"
  | "inactive"
  | "suspended"
  | "rejected";

export interface StoreOpeningHours {
  day: string;
  enabled: boolean;
  open: string;
  close: string;
}

export interface SafariStore {
  id: string;

  merchantId: string;
  merchantName: string;

  name: string;
  slug: string;

  type: StoreType;
  status: StoreStatus;

  email: string;
  phone: string;

  country: string;
  city: string;

  address: string;

  latitude: number;
  longitude: number;

  commissionPercentage: number;

  minimumOrder?: number;
  deliveryRadiusKm?: number;

  createdAt: string;
  approvedAt?: string;

  rejectionReason?: string;
  suspensionReason?: string;

  totalOrders: number;
  grossSales: number;

  openingHours: StoreOpeningHours[];
}

export interface StoreFormInput {
  merchantId: string;
  merchantName: string;

  name: string;

  type: StoreType;

  email: string;
  phone: string;

  country: string;
  city: string;
  address: string;

  latitude: number;
  longitude: number;

  commissionPercentage: number;

  minimumOrder?: number;
  deliveryRadiusKm?: number;

  openingHours: StoreOpeningHours[];
}