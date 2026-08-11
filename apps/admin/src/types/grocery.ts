export type GroceryOrderStatus =
  | "pending"
  | "confirmed"
  | "picking"
  | "packed"
  | "picked_up"
  | "delivered"
  | "cancelled";

export interface GroceryOrderItem {
  id: string;
  productId: string;
  name: string;
  quantity: number;
  unit: string;
  unitPrice: number;
}

export interface GroceryOrder {
  id: string;

  storeId: string;
  storeName: string;

  customerName: string;
  customerPhone: string;

  status: GroceryOrderStatus;

  items: GroceryOrderItem[];

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

  createdAt: string;
}

export interface GroceryCategory {
  id: string;
  storeId: string;
  name: string;
  active: boolean;
  sortOrder: number;
}

export interface GroceryBrand {
  id: string;
  name: string;
  active: boolean;
}

export interface GroceryProduct {
  id: string;

  storeId: string;

  categoryId: string;
  brandId?: string;

  name: string;
  sku: string;

  unit: string;

  price: number;

  stock: number;
  lowStockThreshold: number;

  available: boolean;

  allowSubstitution: boolean;
}

export interface GrocerySubstitution {
  id: string;

  orderId: string;

  unavailableProductId: string;
  unavailableProductName: string;

  suggestedProductId: string;
  suggestedProductName: string;

  customerDecision:
    | "pending"
    | "accepted"
    | "rejected";
}

export interface GroceryPromotion {
  id: string;

  storeId: string;

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

export interface GroceryRefund {
  id: string;

  orderId: string;
  storeId: string;

  amount: number;
  reason: string;

  status:
    | "pending"
    | "approved"
    | "rejected";

  createdAt: string;
}