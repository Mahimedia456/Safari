export type RideStatus =
  | "requested"
  | "searching"
  | "driver_assigned"
  | "driver_arriving"
  | "waiting"
  | "in_progress"
  | "completed"
  | "cancelled";

export type RidePaymentMethod =
  | "cash"
  | "card"
  | "wallet";

export type RideIncidentStatus =
  | "open"
  | "investigating"
  | "resolved";

export type RideIncidentPriority =
  | "low"
  | "medium"
  | "high"
  | "critical";

export interface RideLocation {
  label: string;
  latitude: number;
  longitude: number;
}

export interface RideTimelineEntry {
  id: string;

  title: string;

  description?: string;

  createdAt: string;
}

export interface Ride {
  id: string;

  region:
    | "Pakistan"
    | "Germany";

  city: string;

  passengerId: string;
  passengerName: string;
  passengerPhone: string;

  driverId?: string;
  driverName?: string;
  driverPhone?: string;

  vehicleId?: string;
  vehicleName?: string;
  vehiclePlate?: string;

  rideType:
    | "economy"
    | "comfort"
    | "premium"
    | "bike";

  status: RideStatus;

  pickup: RideLocation;

  destination: RideLocation;

  distanceKm: number;

  estimatedDurationMinutes: number;

  actualDurationMinutes?: number;

  estimatedFare: number;

  finalFare?: number;

  paymentMethod: RidePaymentMethod;

  scheduled: boolean;

  scheduledAt?: string;

  requestedAt: string;

  completedAt?: string;

  cancelledAt?: string;

  cancelledBy?:
    | "passenger"
    | "driver"
    | "admin";

  cancellationReason?: string;

  timeline: RideTimelineEntry[];
}

export interface RideDriverOption {
  id: string;

  name: string;

  phone: string;

  vehicle: string;

  vehiclePlate: string;

  rating: number;

  distanceKm: number;

  online: boolean;
}

export interface RideIncident {
  id: string;

  rideId: string;

  title: string;

  description: string;

  priority:
    RideIncidentPriority;

  status:
    RideIncidentStatus;

  reportedBy:
    | "passenger"
    | "driver"
    | "admin";

  createdAt: string;
}