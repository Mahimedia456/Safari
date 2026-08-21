import type {
  DriverCommissionSettings,
  RidePricingRule,
  SurgeSettings,
} from "../types/pricing";

export const initialRidePricing: RidePricingRule[] =
  [
    {
      id: "PRICE-PK-BIKE",

      region: "Pakistan",

      currency: "PKR",

      rideType: "bike",

      enabled: true,

      baseFare: 80,

      minimumFare: 120,

      perKm: 28,

      perMinute: 4,

      bookingFee: 10,

      waitingPerMinute: 3,

      freeWaitingMinutes: 3,

      cancellationFee: 80,

      minimumCancellationMinutes: 3,
    },

    {
      id: "PRICE-PK-ECONOMY",

      region: "Pakistan",

      currency: "PKR",

      rideType:
        "economy",

      enabled: true,

      baseFare: 140,

      minimumFare: 220,

      perKm: 42,

      perMinute: 6,

      bookingFee: 20,

      waitingPerMinute: 5,

      freeWaitingMinutes: 3,

      cancellationFee: 120,

      minimumCancellationMinutes: 3,
    },

    {
      id: "PRICE-PK-COMFORT",

      region: "Pakistan",

      currency: "PKR",

      rideType:
        "comfort",

      enabled: true,

      baseFare: 190,

      minimumFare: 300,

      perKm: 55,

      perMinute: 8,

      bookingFee: 30,

      waitingPerMinute: 7,

      freeWaitingMinutes: 3,

      cancellationFee: 180,

      minimumCancellationMinutes: 3,
    },

    {
      id: "PRICE-PK-PREMIUM",

      region: "Pakistan",

      currency: "PKR",

      rideType:
        "premium",

      enabled: true,

      baseFare: 300,

      minimumFare: 500,

      perKm: 85,

      perMinute: 12,

      bookingFee: 50,

      waitingPerMinute: 10,

      freeWaitingMinutes: 3,

      cancellationFee: 300,

      minimumCancellationMinutes: 3,
    },

    {
      id: "PRICE-DE-ECONOMY",

      region: "Pakistan",

      currency: "PKR",

      rideType:
        "economy",

      enabled: true,

      baseFare: 4.5,

      minimumFare: 8,

      perKm: 1.9,

      perMinute: 0.35,

      bookingFee: 1,

      waitingPerMinute: 0.4,

      freeWaitingMinutes: 3,

      cancellationFee: 6,

      minimumCancellationMinutes: 3,
    },

    {
      id: "PRICE-DE-COMFORT",

      region: "Pakistan",

      currency: "PKR",

      rideType:
        "comfort",

      enabled: true,

      baseFare: 6,

      minimumFare: 11,

      perKm: 2.4,

      perMinute: 0.45,

      bookingFee: 1.5,

      waitingPerMinute: 0.5,

      freeWaitingMinutes: 3,

      cancellationFee: 8,

      minimumCancellationMinutes: 3,
    },

    {
      id: "PRICE-DE-PREMIUM",

      region: "Pakistan",

      currency: "PKR",

      rideType:
        "premium",

      enabled: true,

      baseFare: 9,

      minimumFare: 16,

      perKm: 3.2,

      perMinute: 0.65,

      bookingFee: 2,

      waitingPerMinute: 0.75,

      freeWaitingMinutes: 3,

      cancellationFee: 12,

      minimumCancellationMinutes: 3,
    },
  ];

export const initialSurgeSettings: SurgeSettings[] =
  [
    {
      region: "Pakistan",

      enabled: true,

      minimumMultiplier: 1,

      maximumMultiplier: 2.5,

      demandThreshold: 25,

      driverSupplyThreshold: 10,

      manualMultiplier: 1,

      manualOverride: false,
    },

    {
      region: "Pakistan",

      enabled: true,

      minimumMultiplier: 1,

      maximumMultiplier: 2,

      demandThreshold: 20,

      driverSupplyThreshold: 8,

      manualMultiplier: 1,

      manualOverride: false,
    },
  ];

export const initialDriverCommission: DriverCommissionSettings[] =
  [
    {
      region: "Pakistan",

      standardCommissionPercent: 18,

      freeRideProgramEnabled: true,

      monthlyFreeRideCount: 5,

      freeRideCommissionPercent: 0,

      commissionAfterFreeQuotaPercent: 18,

      resetDay: 1,
    },

    {
      region: "Pakistan",

      standardCommissionPercent: 20,

      freeRideProgramEnabled: true,

      monthlyFreeRideCount: 5,

      freeRideCommissionPercent: 0,

      commissionAfterFreeQuotaPercent: 20,

      resetDay: 1,
    },
  ];