export type DriverStatus =
  | "active"
  | "offline"
  | "suspended"
  | "blocked";

export type DriverVerificationStatus =
  | "pending"
  | "in_review"
  | "verified"
  | "rejected"
  | "expired";

export type DriverOnboardingStatus =
  | "draft"
  | "pending"
  | "submitted"
  | "under_review"
  | "approved"
  | "rejected"
  | "suspended";

export type DriverDocumentStatus = DriverVerificationStatus;

export type DriverDocument = {
  id: string;
  driverId: string;
  type: string;
  documentNumber?: string;
  fileName: string;
  status: DriverDocumentStatus;
  issuedAt?: string;
  expiresAt?: string;
  reviewedAt?: string;
};

export type DriverWallet = {
  balance: number;
  pendingPayout: number;
  totalEarnings: number;
  totalCommission: number;
  currentMonthEarnings: number;
  freeRideUsed: number;
  freeRideRemaining: number;
};

export type Driver = {
  id: string;
  region: "Pakistan";
  city: string;
  fullName: string;
  email: string;
  phone: string;
  status: DriverStatus | string;
  applicationStatus: DriverOnboardingStatus;
  verificationStatus: DriverVerificationStatus;
  online: boolean;
  rating: number;
  totalRatings: number;
  totalRides: number;
  completedRides: number;
  cancelledRides: number;
  acceptanceRate: number;
  completionRate: number;
  joinedAt: string;
  lastOnlineAt?: string | null;
  vehicleId?: string;
  documents: DriverDocument[];
  wallet: DriverWallet;
};

export type DriverApplication = {
  id: string;
  driverId: string;
  applicantName: string;
  email: string;
  phone: string;
  city: string;
  region: "Pakistan";
  vehicleType: string;
  submittedAt: string;
  status: DriverOnboardingStatus;
  reviewNotes?: string;
};

export type DriverVehicle = {
  id: string;
  driverId: string;
  make: string;
  model: string;
  year: number;
  color: string;
  plateNumber: string;
  category: string;
  registrationStatus: DriverDocumentStatus;
  insuranceStatus: DriverDocumentStatus;
  active: boolean;
};

export type DriverRating = {
  id: string;
  driverId: string;
  rideId: string;
  passengerName: string;
  rating: number;
  comment?: string;
  createdAt: string;
};

export type AdminDriverListItem = {
  id: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  avatar_url: string | null;
  status: string;
  country_code: string;
  is_onboarded: boolean;
  created_at: string;
  driver_profile: {
    user_id: string;
    onboarding_status: DriverOnboardingStatus;
    verification_status: DriverVerificationStatus;
    operating_city: string | null;
    driving_license_number: string | null;
    is_online: boolean;
    is_available: boolean;
    created_at: string;
    updated_at: string;
  } | null;
};

export type AdminDriverDetail = {
  profile: Record<string, unknown>;
  driverProfile: Record<string, unknown>;
  vehicles: Record<string, unknown>[];
  documents: Record<string, unknown>[];
  events: Record<string, unknown>[];
};
