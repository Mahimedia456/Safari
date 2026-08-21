export type FoodOrderStatus =
  | "pending"
  | "confirmed"
  | "preparing"
  | "ready"
  | "picked_up"
  | "on_the_way"
  | "delivered"
  | "cancelled";

export type FoodOrderItem = {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  addons?: string[];
};

export type FoodOrder = {
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
  paymentMethod: "cash" | "card" | "wallet";
  deliveryAddress: string;
  createdAt: string;
};

export type FoodCategory = {
  id: string;
  restaurantId: string;
  name: string;
  active: boolean;
  sortOrder: number;
};

export type FoodMenuItem = {
  id: string;
  restaurantId: string;
  categoryId: string;
  name: string;
  description?: string;
  price: number;
  available: boolean;
  preparationMinutes?: number;
  addons: string[];
  variants: string[];
};

export type FoodPromotion = {
  id: string;
  restaurantId: string;
  title: string;
  code: string;
  active: boolean;
  discountType?: "percentage" | "fixed";
  discountValue?: number;
  startDate?: string;
  endDate?: string;
};

export type FoodRefund = {
  id: string;
  orderId: string;
  restaurantId?: string;
  amount: number;
  reason: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
};

export type FoodReview = {
  id: string;
  restaurantId: string;
  customerName: string;
  rating: number;
  comment: string;
  createdAt: string;
};

export type AdminFoodOrder = {
  id: string;
  order_number: string;
  passenger_id: string;
  restaurant_id: string;
  status: string;
  currency_code: string;
  total: number | string;
  payment_method: string;
  payment_status: string;
  delivery_address: string;
  customer_note: string | null;
  created_at: string;
  food_restaurants?: { id: string; name: string };
};

export type AdminFoodRestaurant = {
  id: string;
  merchant_user_id: string;
  city_id: string;
  name: string;
  slug: string;
  cuisine: string;
  address: string;
  rating: number | string;
  minimum_order: number | string;
  delivery_fee: number | string;
  is_open: boolean;
  is_active: boolean;
  is_featured: boolean;
};
