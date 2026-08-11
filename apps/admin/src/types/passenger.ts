export type PassengerStatus =
  | "active"
  | "inactive"
  | "suspended"
  | "blocked";

export type PassengerVerificationStatus =
  | "unverified"
  | "verified"
  | "flagged";

export type PassengerFlagSeverity =
  | "low"
  | "medium"
  | "high"
  | "critical";

export type PassengerFlagStatus =
  | "open"
  | "reviewing"
  | "resolved";

export type PassengerSupportStatus =
  | "open"
  | "in_progress"
  | "resolved"
  | "closed";

export type PassengerRideStatus =
  | "completed"
  | "cancelled";

export interface PassengerWallet {
  balance: number;

  totalSpent: number;

  rideSpend: number;

  foodSpend: number;

  grocerySpend: number;

  pharmacySpend: number;

  servicesSpend: number;

  refundsReceived: number;

  pointsBalance: number;
}

export interface PassengerAddress {
  id: string;

  passengerId: string;

  label:
    | "Home"
    | "Work"
    | "Other";

  address: string;

  city: string;

  latitude: number;

  longitude: number;

  default: boolean;
}

export interface PassengerRide {
  id: string;

  passengerId: string;

  driverName?: string;

  pickup: string;

  destination: string;

  status:
    PassengerRideStatus;

  rideType:
    | "bike"
    | "economy"
    | "comfort"
    | "premium";

  amount: number;

  currency:
    | "PKR"
    | "EUR";

  createdAt: string;
}

export interface PassengerFlag {
  id: string;

  passengerId: string;

  title: string;

  description: string;

  severity:
    PassengerFlagSeverity;

  status:
    PassengerFlagStatus;

  createdAt: string;

  resolvedAt?: string;
}

export interface PassengerSupportCase {
  id: string;

  passengerId: string;

  subject: string;

  category:
    | "ride"
    | "payment"
    | "account"
    | "food"
    | "grocery"
    | "pharmacy"
    | "services";

  status:
    PassengerSupportStatus;

  priority:
    | "low"
    | "normal"
    | "high";

  createdAt: string;
}

export interface Passenger {
  id: string;

  region:
    | "Pakistan"
    | "Germany";

  city: string;

  fullName: string;

  email: string;

  phone: string;

  status:
    PassengerStatus;

  verificationStatus:
    PassengerVerificationStatus;

  joinedAt: string;

  lastActiveAt: string;

  totalRides: number;

  completedRides: number;

  cancelledRides: number;

  rating: number;

  totalRatings: number;

  referralCode: string;

  emergencyContactName?: string;

  emergencyContactPhone?: string;

  wallet: PassengerWallet;

  addresses: PassengerAddress[];
}