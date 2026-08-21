export type PassengerStatus =
  | "pending"
  | "inactive"
  | "active"
  | "suspended"
  | "blocked";

export type PassengerVerificationStatus =
  | "pending"
  | "verified"
  | "flagged";

export type PassengerWallet = {
  balance: number;
  totalSpent: number;
  rideSpend: number;
  foodSpend: number;
  grocerySpend: number;
  pharmacySpend: number;
  servicesSpend: number;
  refundsReceived: number;
  pointsBalance: number;
};

export type PassengerAddress = {
  id: string;
  passengerId: string;
  label: string;
  address: string;
  city: string;
  latitude: number;
  longitude: number;
  default: boolean;
};

export type Passenger = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  avatarUrl?: string | null;
  status: PassengerStatus;
  region: "Pakistan";
  city: string;
  verificationStatus: PassengerVerificationStatus;
  joinedAt: string;
  lastActiveAt?: string | null;
  totalRides: number;
  completedRides: number;
  cancelledRides: number;
  rating: number;
  totalRatings: number;
  referralCode?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  wallet: PassengerWallet;
  addresses: PassengerAddress[];
};

export type PassengerRide = {
  id: string;
  passengerId: string;
  driverName?: string;
  status: string;
  rideType?: string;
  pickup: string;
  destination: string;
  amount: number;
  currency?: "PKR" | string;
  createdAt: string;
};

export type PassengerFlagStatus =
  | "open"
  | "reviewing"
  | "investigating"
  | "resolved";

export type PassengerFlag = {
  id: string;
  passengerId: string;
  title: string;
  description: string;
  severity: "low" | "medium" | "high" | "critical";
  status: PassengerFlagStatus;
  createdAt: string;
};

export type PassengerSupportStatus =
  | "open"
  | "in_progress"
  | "resolved"
  | "closed";

export type PassengerSupportCase = {
  id: string;
  passengerId: string;
  subject: string;
  category: string;
  priority: "low" | "normal" | "high";
  status: PassengerSupportStatus;
  createdAt: string;
};

export type AdminPassenger = {
  id: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  avatar_url: string | null;
  status: PassengerStatus;
  country_code: string;
  is_onboarded: boolean;
  created_at: string;
  last_seen_at: string | null;
};

export type AdminPassengerDetail = {
  passenger: Record<string, unknown>;
  addresses: Record<string, unknown>[];
  preferences: Record<string, unknown> | null;
  emergencyContacts: Record<string, unknown>[];
};
