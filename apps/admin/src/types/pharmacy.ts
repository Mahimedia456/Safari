export type PharmacyOrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "ready"
  | "picked_up"
  | "delivered"
  | "cancelled";

export type PrescriptionStatus =
  | "pending"
  | "approved"
  | "rejected";

export interface PharmacyOrderItem {
  id: string;
  productId: string;
  name: string;
  quantity: number;
  unitPrice: number;
  prescriptionRequired: boolean;
}

export interface PharmacyOrder {
  id: string;

  pharmacyId: string;
  pharmacyName: string;

  customerName: string;
  customerPhone: string;

  status: PharmacyOrderStatus;

  items: PharmacyOrderItem[];

  subtotal: number;
  deliveryFee: number;
  serviceFee: number;
  discount: number;
  total: number;

  paymentMethod:
    | "cash"
    | "card"
    | "wallet";

  deliveryAddress: string;

  prescriptionId?: string;

  createdAt: string;
}

export interface PharmacyCategory {
  id: string;
  pharmacyId: string;
  name: string;
  active: boolean;
  sortOrder: number;
}

export interface PharmacyProduct {
  id: string;

  pharmacyId: string;
  categoryId: string;

  name: string;
  genericName?: string;

  sku: string;

  dosage?: string;
  packSize: string;

  price: number;

  stock: number;
  lowStockThreshold: number;

  prescriptionRequired: boolean;

  available: boolean;
}

export interface PharmacyPrescription {
  id: string;

  orderId?: string;
  pharmacyId: string;

  customerName: string;

  doctorName?: string;

  imageName: string;

  status: PrescriptionStatus;

  notes?: string;

  submittedAt: string;
  reviewedAt?: string;
}

export interface PharmacyLicense {
  id: string;

  pharmacyId: string;

  licenseNumber: string;

  authority: string;

  issuedAt: string;
  expiresAt: string;

  status:
    | "valid"
    | "expiring"
    | "expired";

  verified: boolean;
}

export interface PharmacyPromotion {
  id: string;

  pharmacyId: string;

  title: string;
  code: string;

  discountType:
    | "percentage"
    | "fixed";

  discountValue: number;

  active: boolean;

  startDate: string;
  endDate: string;
}

export interface PharmacyRefund {
  id: string;

  orderId: string;
  pharmacyId: string;

  amount: number;
  reason: string;

  status:
    | "pending"
    | "approved"
    | "rejected";

  createdAt: string;
}