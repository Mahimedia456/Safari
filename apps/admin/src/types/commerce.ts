export type AdminCommerceStore = {
  id: string;
  merchant_user_id: string;
  city_id: string;
  store_type: "grocery" | "pharmacy";
  name: string;
  slug: string;
  address: string;
  rating: number | string;
  is_open: boolean;
  is_active: boolean;
};

export type AdminCommerceOrder = {
  id: string;
  order_number: string;
  passenger_id: string;
  store_id: string;
  order_type: "grocery" | "pharmacy";
  status: string;
  prescription_status: string;
  total: number | string;
  currency_code: string;
  payment_method: string;
  payment_status: string;
  delivery_address: string;
  created_at: string;
};
