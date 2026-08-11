export type FoodOrderStatus =
  | "pending"
  | "confirmed"
  | "preparing"
  | "ready"
  | "picked_up"
  | "delivered"
  | "cancelled";

export interface FoodOrderItem {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  addons?: string[];
}

export interface FoodOrder {
  id: string;

  restaurantId: string;
  restaurantName: string;

  customerName: string;
  customerPhone: string;

  status: FoodOrderStatus;

  items: FoodOrderItem[];

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

export interface FoodCategory {
  id: string;
  restaurantId: string;
  name: string;
  active: boolean;
  sortOrder: number;
}

export interface FoodMenuItem {
  id: string;

  restaurantId: string;

  categoryId: string;

  name: string;
  description: string;

  price: number;

  available: boolean;

  preparationMinutes: number;

  addons: string[];
  variants: string[];
}

export interface FoodPromotion {
  id: string;

  restaurantId: string;

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

export interface FoodReview {
  id: string;

  restaurantId: string;

  customerName: string;

  rating: number;

  comment: string;

  createdAt: string;
}

export interface FoodRefund {
  id: string;

  orderId: string;

  restaurantId: string;

  amount: number;

  reason: string;

  status:
    | "pending"
    | "approved"
    | "rejected";

  createdAt: string;
}