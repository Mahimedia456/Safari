import {
  create,
} from "zustand";

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
   STORE STATE
====================================================== */

interface RewardsStoreState {
  passengerRewards:
    PassengerRewardAccount[];

  rules:
    RewardProgramRule[];

  campaigns:
    RewardCampaign[];

  ledgerEntries:
    RewardLedgerEntry[];

  /*
   * Legacy alias.
   */
  ledger:
    RewardLedgerEntry[];

  referral:
    RewardReferralSettings;

  redemption:
    RewardRedemptionSettings;

  adjustmentsRewards:
    RewardAdjustment[];

  toggleCampaign: (
    campaignId: string,
  ) => void;

  updateRule: (
    ruleId: string,
    changes:
      Partial<RewardProgramRule>,
  ) => void;

  updateReferral: (
    changes:
      Partial<RewardReferralSettings>,
  ) => void;

  updateRedemption: (
    changes:
      Partial<RewardRedemptionSettings>,
  ) => void;

  adjustPoints: (
    passengerId: string,
    points: number,
    reason: string,
  ) => void;
}

/* ======================================================
   PASSENGER DATA
====================================================== */

const passengerRewards:
  PassengerRewardAccount[] = [
    {
      id: "PRA-1001",

      passengerId:
        "PAS-1001",

      passengerName:
        "Ali Khan",

      email:
        "ali@example.com",

      phone:
        "+92 300 1111111",

      region:
        "Pakistan",

      availablePoints: 1450,

      lifetimeEarned: 3250,

      lifetimeRedeemed: 1800,

      expiringSoon: 200,

      tier: "gold",

      status: "active",

      updatedAt:
        "2026-07-27T10:30:00",
    },

    {
      id: "PRA-1002",

      passengerId:
        "PAS-1002",

      passengerName:
        "Sara Ahmed",

      email:
        "sara@example.com",

      phone:
        "+92 300 2222222",

      region:
        "Pakistan",

      availablePoints: 860,

      lifetimeEarned: 1760,

      lifetimeRedeemed: 900,

      expiringSoon: 80,

      tier: "silver",

      status: "active",

      updatedAt:
        "2026-07-27T09:20:00",
    },

    {
      id: "PRA-1003",

      passengerId:
        "PAS-1003",

      passengerName:
        "Hassan Malik",

      email:
        "hassan@example.com",

      phone:
        "+92 300 3333333",

      region:
        "Pakistan",

      availablePoints: 420,

      lifetimeEarned: 720,

      lifetimeRedeemed: 300,

      expiringSoon: 0,

      tier: "bronze",

      status: "active",

      updatedAt:
        "2026-07-26T17:10:00",
    },

    {
      id: "PRA-1004",

      passengerId:
        "PAS-1004",

      passengerName:
        "Anna Schmidt",

      email:
        "anna@example.de",

      phone:
        "+49 151 12345678",

      region:
        "Germany",

      availablePoints: 2380,

      lifetimeEarned: 4280,

      lifetimeRedeemed: 1900,

      expiringSoon: 300,

      tier: "platinum",

      status: "active",

      updatedAt:
        "2026-07-27T08:40:00",
    },
  ];

/* ======================================================
   REWARD RULES
====================================================== */

const rules:
  RewardProgramRule[] = [
    {
      id: "RULE-001",

      title:
        "Ride Rewards",

      description:
        "Earn Safari points from completed rides.",

      service: "ride",

      pointsPerUnit: 1,

      multiplier: 1,

      minimumSpend: 100,

      maximumPointsPerTransaction:
        1000,

      /*
       * FIX:
       * RewardProgramRule uses enabled,
       * not active.
       */
      enabled: true,

      createdAt:
        "2026-01-01T09:00:00",

      updatedAt:
        "2026-07-20T11:00:00",
    },

    {
      id: "RULE-002",

      title:
        "Food Rewards",

      description:
        "Reward points for eligible Safari Food orders.",

      service: "food",

      pointsPerUnit: 1,

      multiplier: 1,

      minimumSpend: 200,

      maximumPointsPerTransaction:
        1500,

      enabled: true,

      createdAt:
        "2026-02-01T09:00:00",

      updatedAt:
        "2026-07-20T11:00:00",
    },

    {
      id: "RULE-003",

      title:
        "Grocery Rewards",

      description:
        "Reward points for grocery purchases.",

      service:
        "grocery",

      pointsPerUnit: 1,

      multiplier: 1,

      minimumSpend: 300,

      maximumPointsPerTransaction:
        2000,

      enabled: true,

      createdAt:
        "2026-03-01T09:00:00",

      updatedAt:
        "2026-07-20T11:00:00",
    },

    {
      id: "RULE-004",

      title:
        "Services Rewards",

      description:
        "Reward points from completed Safari Services bookings.",

      service:
        "services",

      pointsPerUnit: 2,

      multiplier: 1,

      minimumSpend: 500,

      maximumPointsPerTransaction:
        2500,

      enabled: true,

      createdAt:
        "2026-04-01T09:00:00",

      updatedAt:
        "2026-07-20T11:00:00",
    },
  ];

/* ======================================================
   CAMPAIGNS
====================================================== */

const campaigns:
  RewardCampaign[] = [
    {
      id: "CMP-001",

      title:
        "Weekend Double Points",

      description:
        "Passengers earn double points on eligible weekend rides.",

      service: "ride",

      /*
       * FIX:
       * RewardCampaign uses bonusMultiplier,
       * not multiplier.
       */
      bonusMultiplier: 2,

      startDate:
        "2026-07-25",

      endDate:
        "2026-08-31",

      active: true,

      status: "active",
    },

    {
      id: "CMP-002",

      title:
        "Safari Food Bonus",

      description:
        "Extra reward points for Safari Food orders.",

      service: "food",

      bonusMultiplier: 1.5,

      startDate:
        "2026-07-20",

      endDate:
        "2026-08-15",

      active: true,

      status: "active",
    },

    {
      id: "CMP-003",

      title:
        "Pharmacy Launch Rewards",

      description:
        "Launch campaign for Safari Pharmacy.",

      service:
        "pharmacy",

      bonusMultiplier: 2,

      startDate:
        "2026-08-01",

      endDate:
        "2026-08-31",

      active: false,

      status: "draft",
    },
  ];

/* ======================================================
   LEDGER
====================================================== */

const ledgerEntries:
  RewardLedgerEntry[] = [
    {
      id: "LED-1001",

      passengerId:
        "PAS-1001",

      passengerName:
        "Ali Khan",

      type: "earned",

      points: 250,

      description:
        "Points earned from completed ride.",

      createdAt:
        "2026-07-27T10:30:00",
    },

    {
      id: "LED-1002",

      passengerId:
        "PAS-1002",

      passengerName:
        "Sara Ahmed",

      type:
        "redeemed",

      points: -100,

      description:
        "Points redeemed against Safari Food order.",

      createdAt:
        "2026-07-27T09:15:00",
    },

    {
      id: "LED-1003",

      passengerId:
        "PAS-1003",

      passengerName:
        "Hassan Malik",

      type: "bonus",

      points: 300,

      description:
        "Referral bonus credited.",

      createdAt:
        "2026-07-26T16:20:00",
    },

    {
      id: "LED-1004",

      passengerId:
        "PAS-1004",

      passengerName:
        "Anna Schmidt",

      type: "earned",

      points: 410,

      description:
        "Reward points earned from completed service booking.",

      createdAt:
        "2026-07-26T15:00:00",
    },
  ];

/* ======================================================
   ADJUSTMENTS
====================================================== */

const adjustments:
  RewardAdjustment[] = [
    {
      id: "ADJ-1001",

      passengerId:
        "PAS-1001",

      passengerName:
        "Ali Khan",

      type: "credit",

      points: 50,

      reason:
        "Customer support goodwill credit.",

      createdBy:
        "Safari Admin",

      createdAt:
        "2026-07-26T14:00:00",
    },
  ];

/* ======================================================
   STORE
====================================================== */

export const useRewardsStore =
  create<RewardsStoreState>(
    (set) => ({
      passengerRewards,

      rules,

      campaigns,

      ledgerEntries,

      ledger:
        ledgerEntries,

      adjustmentsRewards:
        adjustments,

      referral: {
        enabled: true,

        referrerPoints: 500,

        referredPassengerPoints:
          250,

        minimumCompletedRides:
          1,

        maximumReferralsPerMonth:
          20,
      },

      redemption: {
        enabled: true,

        minimumPoints: 500,

        maximumPointsPerRedemption:
          5000,

        pointsPerCurrencyUnit:
          100,

        maximumPercentOfOrder:
          50,

        expiryDays: 365,

        allowRideRedemption:
          true,

        allowFoodRedemption:
          true,

        allowGroceryRedemption:
          true,

        allowPharmacyRedemption:
          true,

        allowServicesRedemption:
          true,
      },

      /* ==================================================
         CAMPAIGN ACTION
      ================================================== */

      toggleCampaign: (
        campaignId,
      ) => {
        set((state) => ({
          campaigns:
            state.campaigns.map(
              (campaign) => {
                if (
                  campaign.id !==
                  campaignId
                ) {
                  return campaign;
                }

                const active =
                  !campaign.active;

                return {
                  ...campaign,

                  active,

                  status: active
                    ? "active"
                    : "draft",
                };
              },
            ),
        }));
      },

      /* ==================================================
         RULE ACTION
      ================================================== */

      updateRule: (
        ruleId,
        changes,
      ) => {
        set((state) => ({
          rules:
            state.rules.map(
              (rule) =>
                rule.id ===
                ruleId
                  ? {
                      ...rule,
                      ...changes,

                      id:
                        rule.id,

                      updatedAt:
                        new Date().toISOString(),
                    }
                  : rule,
            ),
        }));
      },

      /* ==================================================
         REFERRAL SETTINGS
      ================================================== */

      updateReferral: (
        changes,
      ) => {
        set((state) => ({
          referral: {
            ...state.referral,
            ...changes,
          },
        }));
      },

      /* ==================================================
         REDEMPTION SETTINGS
      ================================================== */

      updateRedemption: (
        changes,
      ) => {
        set((state) => ({
          redemption: {
            ...state.redemption,
            ...changes,
          },
        }));
      },

      /* ==================================================
         MANUAL POINT ADJUSTMENT
      ================================================== */

      adjustPoints: (
        passengerId,
        points,
        reason,
      ) => {
        set((state) => {
          const passenger =
            state.passengerRewards.find(
              (item) =>
                item.passengerId ===
                passengerId,
            );

          if (!passenger) {
            return state;
          }

          const now =
            new Date().toISOString();

          const actualPoints =
            Math.trunc(points);

          if (
            actualPoints === 0
          ) {
            return state;
          }

          const nextBalance =
            Math.max(
              0,
              passenger.availablePoints +
                actualPoints,
            );

          const appliedPoints =
            nextBalance -
            passenger.availablePoints;

          if (
            appliedPoints === 0
          ) {
            return state;
          }

          const updatedPassengers =
            state.passengerRewards.map(
              (item) => {
                if (
                  item.passengerId !==
                  passengerId
                ) {
                  return item;
                }

                return {
                  ...item,

                  availablePoints:
                    nextBalance,

                  lifetimeEarned:
                    appliedPoints > 0
                      ? item.lifetimeEarned +
                        appliedPoints
                      : item.lifetimeEarned,

                  lifetimeRedeemed:
                    appliedPoints < 0
                      ? item.lifetimeRedeemed +
                        Math.abs(
                          appliedPoints,
                        )
                      : item.lifetimeRedeemed,

                  updatedAt: now,
                };
              },
            );

          const adjustment:
            RewardAdjustment = {
              id:
                `ADJ-${Date.now()}`,

              passengerId:
                passenger.passengerId,

              passengerName:
                passenger.passengerName,

              type:
                appliedPoints >= 0
                  ? "credit"
                  : "debit",

              points:
                Math.abs(
                  appliedPoints,
                ),

              reason,

              createdBy:
                "Safari Admin",

              createdAt: now,
            };

          const ledgerEntry:
            RewardLedgerEntry = {
              id:
                `LED-${Date.now()}`,

              passengerId:
                passenger.passengerId,

              passengerName:
                passenger.passengerName,

              type:
                "adjustment",

              points:
                appliedPoints,

              description:
                `Manual adjustment: ${reason}`,

              createdAt: now,
            };

          const nextLedger = [
            ledgerEntry,
            ...state.ledgerEntries,
          ];

          return {
            passengerRewards:
              updatedPassengers,

            adjustmentsRewards: [
              adjustment,
              ...state.adjustmentsRewards,
            ],

            ledgerEntries:
              nextLedger,

            ledger:
              nextLedger,
          };
        });
      },
    }),
  );