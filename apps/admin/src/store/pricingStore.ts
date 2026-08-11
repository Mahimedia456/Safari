import {
  create,
} from "zustand";

import {
  initialDriverCommission,
  initialRidePricing,
  initialSurgeSettings,
} from "../data/pricing";

import type {
  DriverCommissionSettings,
  FareCalculationInput,
  FareCalculationResult,
  RidePricingRule,
  SurgeSettings,
} from "../types/pricing";

interface PricingState {
  pricingRules:
    RidePricingRule[];

  surgeSettings:
    SurgeSettings[];

  driverCommission:
    DriverCommissionSettings[];

  updatePricingRule: (
    id: string,
    changes:
      Partial<RidePricingRule>,
  ) => void;

  togglePricingRule: (
    id: string,
  ) => void;

  updateSurgeSettings: (
    region:
      SurgeSettings["region"],
    changes:
      Partial<SurgeSettings>,
  ) => void;

  updateDriverCommission: (
    region:
      DriverCommissionSettings["region"],
    changes:
      Partial<DriverCommissionSettings>,
  ) => void;

  calculateFare: (
    input:
      FareCalculationInput,
  ) =>
    FareCalculationResult | null;
}

export const usePricingStore =
  create<PricingState>(
    (set, get) => ({
      pricingRules:
        initialRidePricing,

      surgeSettings:
        initialSurgeSettings,

      driverCommission:
        initialDriverCommission,

      updatePricingRule: (
        id,
        changes,
      ) => {
        set((state) => ({
          pricingRules:
            state.pricingRules.map(
              (rule) =>
                rule.id === id
                  ? {
                      ...rule,
                      ...changes,
                    }
                  : rule,
            ),
        }));
      },

      togglePricingRule: (
        id,
      ) => {
        set((state) => ({
          pricingRules:
            state.pricingRules.map(
              (rule) =>
                rule.id === id
                  ? {
                      ...rule,
                      enabled:
                        !rule.enabled,
                    }
                  : rule,
            ),
        }));
      },

      updateSurgeSettings: (
        region,
        changes,
      ) => {
        set((state) => ({
          surgeSettings:
            state.surgeSettings.map(
              (settings) =>
                settings.region ===
                region
                  ? {
                      ...settings,
                      ...changes,
                    }
                  : settings,
            ),
        }));
      },

      updateDriverCommission: (
        region,
        changes,
      ) => {
        set((state) => ({
          driverCommission:
            state.driverCommission.map(
              (settings) =>
                settings.region ===
                region
                  ? {
                      ...settings,
                      ...changes,
                    }
                  : settings,
            ),
        }));
      },

      calculateFare: (
        input,
      ) => {
        const rule =
          get().pricingRules.find(
            (item) =>
              item.region ===
                input.region &&
              item.rideType ===
                input.rideType &&
              item.enabled,
          );

        if (!rule) {
          return null;
        }

        const baseFare =
          rule.baseFare;

        const distanceFare =
          input.distanceKm *
          rule.perKm;

        const durationFare =
          input.durationMinutes *
          rule.perMinute;

        const paidWaitingMinutes =
          Math.max(
            0,
            input.waitingMinutes -
              rule.freeWaitingMinutes,
          );

        const waitingFare =
          paidWaitingMinutes *
          rule.waitingPerMinute;

        const bookingFee =
          rule.bookingFee;

        const subtotal =
          baseFare +
          distanceFare +
          durationFare +
          waitingFare +
          bookingFee;

        const multiplier =
          Math.max(
            1,
            input.surgeMultiplier,
          );

        const surgeAmount =
          subtotal *
          (multiplier - 1);

        const calculatedFare =
          subtotal +
          surgeAmount;

        const finalFare =
          Math.max(
            rule.minimumFare,
            calculatedFare,
          );

        return {
          baseFare,
          distanceFare,
          durationFare,
          waitingFare,
          bookingFee,
          subtotal,
          surgeAmount,
          calculatedFare,
          finalFare,
          currency:
            rule.currency,
        };
      },
    }),
  );