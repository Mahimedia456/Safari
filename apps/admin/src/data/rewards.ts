import type {
  PassengerRewardAccount,
  RewardAdjustment,
  RewardCampaign,
  RewardLedgerEntry,
  RewardProgramRule,
  RewardRedemptionSettings,
  RewardReferralSettings,
} from "../types/rewards";

/* ======================================================
   PASSENGER REWARD ACCOUNTS
====================================================== */

export const passengerRewardsData:
  PassengerRewardAccount[] = [
    {
      id: "PRA-1001",

      passengerId: "PAS-1001",

      passengerName: "Ali Khan",

      email: "ali@example.com",

      phone: "+92 300 1111111",

      region: "Pakistan",

      availablePoints: 1450,

      lifetimeEarned: 3250,

      lifetimeRedeemed: 1800,

      expiringSoon: 200,

      tier: "gold",

      status: "active",

      updatedAt: "2026-07-27T10:30:00",
    },

    {
      id: "PRA-1002",

      passengerId: "PAS-1002",

      passengerName: "Sara Ahmed",

      email: "sara@example.com",

      phone: "+92 300 2222222",

      region: "Pakistan",

      availablePoints: 860,

      lifetimeEarned: 1760,

      lifetimeRedeemed: 900,

      expiringSoon: 80,

      tier: "silver",

      status: "active",

      updatedAt: "2026-07-27T09:20:00",
    },

    {
      id: "PRA-1003",

      passengerId: "PAS-1003",

      passengerName: "Hassan Malik",

      email: "hassan@example.com",

      phone: "+92 300 3333333",

      region: "Pakistan",

      availablePoints: 420,

      lifetimeEarned: 720,

      lifetimeRedeemed: 300,

      expiringSoon: 0,

      tier: "bronze",

      status: "active",

      updatedAt: "2026-07-26T17:10:00",
    },

    {
      id: "PRA-1004",

      passengerId: "PAS-1004",

      passengerName: "Anna Schmidt",

      email: "anna@example.de",

      phone: "+49 151 12345678",

      region: "Germany",

      availablePoints: 2380,

      lifetimeEarned: 4280,

      lifetimeRedeemed: 1900,

      expiringSoon: 300,

      tier: "platinum",

      status: "active",

      updatedAt: "2026-07-27T08:40:00",
    },

    {
      id: "PRA-1005",

      passengerId: "PAS-1005",

      passengerName: "Usman Tariq",

      email: "usman@example.com",

      phone: "+92 300 4444444",

      region: "Pakistan",

      availablePoints: 120,

      lifetimeEarned: 620,

      lifetimeRedeemed: 500,

      expiringSoon: 40,

      tier: "bronze",

      status: "active",

      updatedAt: "2026-07-25T12:00:00",
    },

    {
      id: "PRA-1006",

      passengerId: "PAS-1006",

      passengerName: "Julia Weber",

      email: "julia@example.de",

      phone: "+49 160 98765432",

      region: "Germany",

      availablePoints: 1680,

      lifetimeEarned: 2680,

      lifetimeRedeemed: 1000,

      expiringSoon: 150,

      tier: "gold",

      status: "active",

      updatedAt: "2026-07-24T11:30:00",
    },
  ];

/* ======================================================
   REWARD PROGRAM RULES

   IMPORTANT:
   Rules use "enabled", NOT "active".
====================================================== */

export const rewardRulesData:
  RewardProgramRule[] = [
    {
      id: "RULE-001",

      title: "Ride Rewards",

      description:
        "Earn Safari points from completed rides.",

      service: "ride",

      pointsPerUnit: 1,

      multiplier: 1,

      minimumSpend: 100,

      maximumPointsPerTransaction: 1000,

      enabled: true,

      createdAt: "2026-01-01T09:00:00",

      updatedAt: "2026-07-20T11:00:00",
    },

    {
      id: "RULE-002",

      title: "Food Rewards",

      description:
        "Earn Safari points on eligible food orders.",

      service: "food",

      pointsPerUnit: 1,

      multiplier: 1,

      minimumSpend: 200,

      maximumPointsPerTransaction: 1500,

      enabled: true,

      createdAt: "2026-02-01T09:00:00",

      updatedAt: "2026-07-20T11:00:00",
    },

    {
      id: "RULE-003",

      title: "Grocery Rewards",

      description:
        "Earn Safari points on eligible grocery orders.",

      service: "grocery",

      pointsPerUnit: 1,

      multiplier: 1,

      minimumSpend: 300,

      maximumPointsPerTransaction: 2000,

      enabled: true,

      createdAt: "2026-03-01T09:00:00",

      updatedAt: "2026-07-20T11:00:00",
    },

    {
      id: "RULE-004",

      title: "Services Rewards",

      description:
        "Earn Safari points from completed service bookings.",

      service: "services",

      pointsPerUnit: 2,

      multiplier: 1,

      minimumSpend: 500,

      maximumPointsPerTransaction: 2500,

      enabled: true,

      createdAt: "2026-04-01T09:00:00",

      updatedAt: "2026-07-20T11:00:00",
    },

    {
      id: "RULE-005",

      title: "Pharmacy Rewards",

      description:
        "Earn Safari points from eligible pharmacy orders.",

      service: "pharmacy",

      pointsPerUnit: 1,

      multiplier: 1,

      minimumSpend: 300,

      maximumPointsPerTransaction: 1500,

      enabled: true,

      createdAt: "2026-05-01T09:00:00",

      updatedAt: "2026-07-20T11:00:00",
    },
  ];

/* ======================================================
   REWARD CAMPAIGNS

   IMPORTANT:
   Campaigns use "bonusMultiplier",
   NOT "multiplier".
====================================================== */

export const rewardCampaignsData:
  RewardCampaign[] = [
    {
      id: "CMP-001",

      title: "Weekend Double Points",

      description:
        "Passengers earn double points on eligible weekend rides.",

      service: "ride",

      bonusMultiplier: 2,

      startDate: "2026-07-25",

      endDate: "2026-08-31",

      active: true,

      status: "active",
    },

    {
      id: "CMP-002",

      title: "Safari Food Bonus",

      description:
        "Extra reward points for Safari Food orders.",

      service: "food",

      bonusMultiplier: 1.5,

      startDate: "2026-07-20",

      endDate: "2026-08-15",

      active: true,

      status: "active",
    },

    {
      id: "CMP-003",

      title: "Pharmacy Launch Rewards",

      description:
        "Launch campaign for Safari Pharmacy.",

      service: "pharmacy",

      bonusMultiplier: 2,

      startDate: "2026-08-01",

      endDate: "2026-08-31",

      active: false,

      status: "draft",
    },

    {
      id: "CMP-004",

      title: "Grocery Weekend Bonus",

      description:
        "Bonus reward multiplier on eligible grocery orders.",

      service: "grocery",

      bonusMultiplier: 1.5,

      startDate: "2026-08-01",

      endDate: "2026-08-20",

      active: false,

      status: "draft",
    },

    {
      id: "CMP-005",

      title: "Home Services Rewards",

      description:
        "Earn extra points on eligible Safari Services bookings.",

      service: "services",

      bonusMultiplier: 2,

      startDate: "2026-07-10",

      endDate: "2026-07-31",

      active: true,

      status: "active",
    },
  ];

/* ======================================================
   REWARD LEDGER
====================================================== */

export const rewardLedgerData:
  RewardLedgerEntry[] = [
    {
      id: "LED-1001",

      passengerId: "PAS-1001",

      passengerName: "Ali Khan",

      type: "earned",

      points: 250,

      description:
        "Points earned from completed ride.",

      createdAt: "2026-07-27T10:30:00",
    },

    {
      id: "LED-1002",

      passengerId: "PAS-1002",

      passengerName: "Sara Ahmed",

      type: "redeemed",

      points: -100,

      description:
        "Points redeemed against Safari Food order.",

      createdAt: "2026-07-27T09:15:00",
    },

    {
      id: "LED-1003",

      passengerId: "PAS-1003",

      passengerName: "Hassan Malik",

      type: "bonus",

      points: 300,

      description:
        "Referral bonus credited.",

      createdAt: "2026-07-26T16:20:00",
    },

    {
      id: "LED-1004",

      passengerId: "PAS-1004",

      passengerName: "Anna Schmidt",

      type: "earned",

      points: 410,

      description:
        "Reward points earned from completed service booking.",

      createdAt: "2026-07-26T15:00:00",
    },

    {
      id: "LED-1005",

      passengerId: "PAS-1005",

      passengerName: "Usman Tariq",

      type: "expired",

      points: -40,

      description:
        "Reward points expired after validity period.",

      createdAt: "2026-07-25T12:00:00",
    },

    {
      id: "LED-1006",

      passengerId: "PAS-1006",

      passengerName: "Julia Weber",

      type: "adjustment",

      points: 100,

      description:
        "Manual reward adjustment by Safari Admin.",

      createdAt: "2026-07-24T11:30:00",
    },
  ];

/* ======================================================
   REWARD ADJUSTMENTS
====================================================== */

export const rewardAdjustmentsData:
  RewardAdjustment[] = [
    {
      id: "ADJ-1001",

      passengerId: "PAS-1001",

      passengerName: "Ali Khan",

      type: "credit",

      points: 50,

      reason:
        "Customer support goodwill credit.",

      createdBy: "Safari Admin",

      createdAt: "2026-07-26T14:00:00",
    },

    {
      id: "ADJ-1002",

      passengerId: "PAS-1004",

      passengerName: "Anna Schmidt",

      type: "credit",

      points: 100,

      reason:
        "Promotional correction.",

      createdBy: "Safari Admin",

      createdAt: "2026-07-25T12:00:00",
    },

    {
      id: "ADJ-1003",

      passengerId: "PAS-1002",

      passengerName: "Sara Ahmed",

      type: "debit",

      points: 50,

      reason:
        "Duplicate reward transaction correction.",

      createdBy: "Safari Admin",

      createdAt: "2026-07-24T10:00:00",
    },
  ];

/* ======================================================
   REFERRAL SETTINGS
====================================================== */

export const rewardReferralSettings:
  RewardReferralSettings = {
    enabled: true,

    referrerPoints: 500,

    referredPassengerPoints: 250,

    minimumCompletedRides: 1,

    maximumReferralsPerMonth: 20,
  };

/* ======================================================
   REDEMPTION SETTINGS
====================================================== */

export const rewardRedemptionSettings:
  RewardRedemptionSettings = {
    enabled: true,

    minimumPoints: 500,

    maximumPointsPerRedemption: 5000,

    pointsPerCurrencyUnit: 100,

    maximumPercentOfOrder: 50,

    expiryDays: 365,

    allowRideRedemption: true,

    allowFoodRedemption: true,

    allowGroceryRedemption: true,

    allowPharmacyRedemption: true,

    allowServicesRedemption: true,
  };

/* ======================================================
   OPTIONAL SUMMARY DATA
====================================================== */

export const rewardSummaryData = {
  totalPassengers: passengerRewardsData.length,

  totalAvailablePoints:
    passengerRewardsData.reduce(
      (total, passenger) =>
        total + passenger.availablePoints,
      0,
    ),

  lifetimeEarned:
    passengerRewardsData.reduce(
      (total, passenger) =>
        total + passenger.lifetimeEarned,
      0,
    ),

  lifetimeRedeemed:
    passengerRewardsData.reduce(
      (total, passenger) =>
        total + passenger.lifetimeRedeemed,
      0,
    ),

  activeCampaigns:
    rewardCampaignsData.filter(
      (campaign) => campaign.active,
    ).length,

  enabledRules:
    rewardRulesData.filter(
      (rule) => rule.enabled,
    ).length,
};

/* ======================================================
   BACKWARDS-COMPATIBILITY EXPORTS

   Keep these aliases so older pages/components
   can continue importing previous names.
====================================================== */

export const passengerRewards =
  passengerRewardsData;

export const rewardRules =
  rewardRulesData;

export const rewardCampaigns =
  rewardCampaignsData;

export const rewardLedger =
  rewardLedgerData;

export const rewardAdjustments =
  rewardAdjustmentsData;

export const referralSettings =
  rewardReferralSettings;

export const redemptionSettings =
  rewardRedemptionSettings;