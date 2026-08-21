export type AdminServiceProvider = {
  id: string;
  merchant_user_id: string;
  city_id: string;
  business_name: string;
  slug: string;
  verification_status: string;
  rating: number | string;
  is_featured: boolean;
  is_active: boolean;
};

export type AdminServiceBooking = {
  id: string;
  booking_number: string;
  customer_id: string;
  provider_id: string;
  service_id: string;
  booking_status: string;
  scheduled_for: string | null;
  service_address: string;
  estimated_total: number | string | null;
  final_total: number | string | null;
  currency_code: string;
  payment_method: string;
  payment_status: string;
  created_at: string;
};
