export type DriverStatus =
  | "active"
  | "offline"
  | "suspended"
  | "blocked";

export type DriverApplicationStatus =
  | "pending"
  | "under_review"
  | "approved"
  | "rejected";

export type DriverVerificationStatus =
  | "pending"
  | "verified"
  | "rejected"
  | "expired";

export type DriverDocumentType =
  | "cnic"
  | "passport"
  | "driving_license"
  | "background_check"
  | "profile_photo"
  | "vehicle_registration"
  | "insurance";

export interface DriverDocument {
  id: string;

  driverId: string;

  type: DriverDocumentType;

  documentNumber?: string;

  fileName: string;

  status:
    DriverVerificationStatus;

  issuedAt?: string;

  expiresAt?: string;

  reviewedAt?: string;
}

export interface DriverVehicle {
  id: string;

  driverId: string;

  make: string;
  model: string;

  year: number;

  color: string;

  plateNumber: string;

  category:
    | "bike"
    | "economy"
    | "comfort"
    | "premium";

  registrationStatus:
    DriverVerificationStatus;

  insuranceStatus:
    DriverVerificationStatus;

  active: boolean;
}

export interface DriverWallet {
  balance: number;

  pendingPayout: number;

  totalEarnings: number;

  totalCommission: number;

  currentMonthEarnings: number;

  freeRideUsed: number;

  freeRideRemaining: number;
}

export interface Driver {
  id: string;

  region:
    | "Pakistan"
    | "Germany";

  city: string;

  fullName: string;

  email: string;

  phone: string;

  status: DriverStatus;

  applicationStatus:
    DriverApplicationStatus;

  verificationStatus:
    DriverVerificationStatus;

  online: boolean;

  rating: number;

  totalRatings: number;

  totalRides: number;

  completedRides: number;

  cancelledRides: number;

  acceptanceRate: number;

  completionRate: number;

  joinedAt: string;

  lastOnlineAt?: string;

  vehicleId?: string;

  documents: DriverDocument[];

  wallet: DriverWallet;
}

export interface DriverApplication {
  id: string;

  driverId: string;

  applicantName: string;

  email: string;

  phone: string;

  region:
    | "Pakistan"
    | "Germany";

  city: string;

  status:
    DriverApplicationStatus;

  vehicleType:
    | "bike"
    | "economy"
    | "comfort"
    | "premium";

  submittedAt: string;

  reviewedAt?: string;

  reviewNotes?: string;
}

export interface DriverRating {
  id: string;

  driverId: string;

  passengerName: string;

  rideId: string;

  rating: number;

  comment?: string;

  createdAt: string;
}