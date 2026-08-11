export type ServiceBookingStatus =
  | "pending"
  | "confirmed"
  | "assigned"
  | "in_progress"
  | "completed"
  | "cancelled";

export interface ServiceBooking {
  id: string;

  businessId: string;
  businessName: string;

  serviceId: string;
  serviceName: string;

  customerName: string;
  customerPhone: string;

  staffId?: string;
  staffName?: string;

  status: ServiceBookingStatus;

  scheduledDate: string;
  scheduledTime: string;

  durationMinutes: number;

  address: string;

  price: number;
  discount: number;
  serviceFee: number;
  total: number;

  paymentMethod:
    | "cash"
    | "card"
    | "wallet";

  notes?: string;

  createdAt: string;
}

export interface ServiceCategory {
  id: string;
  businessId: string;

  name: string;

  active: boolean;
  sortOrder: number;
}

export interface ServiceCatalogItem {
  id: string;

  businessId: string;

  categoryId: string;

  name: string;
  description: string;

  price: number;

  durationMinutes: number;

  active: boolean;

  homeService: boolean;
}

export interface ServiceStaff {
  id: string;

  businessId: string;

  name: string;

  phone: string;

  role: string;

  active: boolean;

  rating: number;

  completedBookings: number;
}

export interface ServiceAvailability {
  id: string;

  businessId: string;

  day: string;

  enabled: boolean;

  startTime: string;
  endTime: string;
}

export interface ServiceArea {
  id: string;

  businessId: string;

  name: string;

  city: string;

  radiusKm: number;

  active: boolean;
}

export interface ServiceReview {
  id: string;

  businessId: string;

  customerName: string;

  staffName?: string;

  rating: number;

  comment: string;

  createdAt: string;
}

export interface ServicePromotion {
  id: string;

  businessId: string;

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

export interface ServiceRefund {
  id: string;

  bookingId: string;
  businessId: string;

  amount: number;

  reason: string;

  status:
    | "pending"
    | "approved"
    | "rejected";

  createdAt: string;
}