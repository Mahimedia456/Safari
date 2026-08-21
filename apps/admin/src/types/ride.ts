export type AdminRide = {
  id: string;
  passenger_id: string;
  driver_id: string | null;
  vehicle_id: string | null;
  ride_number: string;
  ride_status: string;
  booking_type: "now" | "scheduled";
  scheduled_for: string | null;
  pickup_address: string;
  dropoff_address: string;
  estimated_distance_km: number | string;
  estimated_duration_minutes: number | string;
  currency_code: string;
  estimated_fare: number | string;
  final_fare: number | string | null;
  payment_method: string;
  payment_status: string;
  created_at: string;
  ride_categories?: { code: string; name: string };
  service_cities?: { name: string; city_code: string };
};

export type RideCatalogAdminData = {
  cities: Record<string, unknown>[];
  zones: Record<string, unknown>[];
  categories: Record<string, unknown>[];
  pricing: Record<string, unknown>[];
  settings: Record<string, unknown>[];
};

export type RideTimelineEntry = {
  id?: string;
  status?: string;
  title?: string;
  description?: string;
  createdAt?: string;
};

export type Ride = {
  id: string;
  passengerId: string;
  passengerName: string;
  passengerPhone: string;
  driverId?: string | null;
  driverName?: string | null;
  driverPhone?: string | null;
  vehicleId?: string | null;
  vehicleName?: string | null;
  vehiclePlate?: string | null;
  region: "Pakistan";
  city: string;
  status: string;
  rideType: string;
  pickup: any;
  destination: any;
  distanceKm: number;
  estimatedDurationMinutes: number;
  actualDurationMinutes?: number;
  estimatedFare: number;
  finalFare?: number | null;
  paymentMethod: string;
  scheduled: boolean;
  scheduledAt?: string;
  requestedAt?: string;
  completedAt?: string;
  cancelledAt?: string;
  cancelledBy?: string;
  cancellationReason?: string;
  timeline: RideTimelineEntry[];
  createdAt?: string;
};

export type RideStatus =
  | "requested" | "searching" | "driver_assigned" | "driver_arriving"
  | "driver_arrived" | "waiting" | "in_progress" | "completed"
  | "cancelled" | "cancelled_by_passenger" | "cancelled_by_driver" | "cancelled_by_admin";

export type RideDriverOption = {
  id: string;
  name: string;
  phone: string;
  vehicle: string;
  vehiclePlate: string;
  rating: number;
  distanceKm: number;
  online: boolean;
};

export type RideIncidentStatus = "open" | "investigating" | "resolved";
export type RideIncident = {
  id: string;
  rideId: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high" | "critical";
  status: RideIncidentStatus;
  reportedBy: string;
  createdAt?: string;
};
