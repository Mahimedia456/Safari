export type RewardService =
  | "ride"
  | "food"
  | "grocery"
  | "pharmacy"
  | "services"
  | "all";

export type RewardLedgerType =
  | "earned"
  | "redeemed"
  | "expired"
  | "bonus"
  | "adjustment";

export type RewardCampaignStatus =
  | "draft"
  | "active"
  | "ended";

export type RewardAdjustmentType =
  | "credit"
  | "debit";

export type RewardPassengerStatus =
  | "active"
  | "suspended";

export type RewardTier =
  | "bronze"
  | "silver"
  | "gold"
  | "platinum";

/* ======================================================
   PASSENGER REWARD ACCOUNT
====================================================== */

export interface PassengerRewardAccount {
  id: string;

  passengerId: string;

  passengerName: string;

  email: string;

  phone: string;

  region:
    | "Pakistan"
    | "Pakistan";

  availablePoints: number;

  lifetimeEarned: number;

  lifetimeRedeemed: number;

  expiringSoon: number;

  tier: RewardTier;

  status:
    RewardPassengerStatus;

  updatedAt: string;
}

/* ======================================================
   REWARD RULE
====================================================== */

export interface RewardProgramRule {
  id: string;

  title: string;

  description: string;

  service: RewardService;

  pointsPerUnit: number;

  multiplier: number;

  minimumSpend: number;

  maximumPointsPerTransaction: number;

  enabled: boolean;

  createdAt: string;

  updatedAt: string;
}
/* ======================================================
   CAMPAIGN
====================================================== */

export interface RewardCampaign {
  id: string;

  title: string;

  description: string;

  service: RewardService;

  bonusMultiplier: number;

  startDate: string;

  endDate: string;

  active: boolean;

  status: RewardCampaignStatus;
}

/* ======================================================
   LEDGER
====================================================== */

export interface RewardLedgerEntry {
  id: string;

  passengerId: string;

  passengerName: string;

  type:
    RewardLedgerType;

  points: number;

  description: string;

  createdAt: string;
}

/* ======================================================
   REFERRAL
====================================================== */

export interface RewardReferralSettings {
  enabled: boolean;

  referrerPoints: number;

  referredPassengerPoints: number;

  minimumCompletedRides: number;

  maximumReferralsPerMonth: number;
}

/* ======================================================
   REDEMPTION
====================================================== */

export interface RewardRedemptionSettings {
  enabled: boolean;

  minimumPoints: number;

  maximumPointsPerRedemption: number;

  pointsPerCurrencyUnit: number;

  maximumPercentOfOrder: number;

  expiryDays: number;

  allowRideRedemption: boolean;

  allowFoodRedemption: boolean;

  allowGroceryRedemption: boolean;

  allowPharmacyRedemption: boolean;

  allowServicesRedemption: boolean;
}

/* ======================================================
   ADJUSTMENTS
====================================================== */

export interface RewardAdjustment {
  id: string;

  passengerId: string;

  passengerName: string;

  type:
    RewardAdjustmentType;

  points: number;

  reason: string;

  createdBy: string;

  createdAt: string;
}