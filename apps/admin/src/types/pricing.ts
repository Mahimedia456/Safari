export type PricingRegion =
  | "Pakistan"
  | "Germany";

export type PricingCurrency =
  | "PKR"
  | "EUR";

export type PricingRideType =
  | "bike"
  | "economy"
  | "comfort"
  | "premium";

export interface RidePricingRule {
  id: string;

  region: PricingRegion;

  currency:
    PricingCurrency;

  rideType:
    PricingRideType;

  enabled: boolean;

  baseFare: number;

  minimumFare: number;

  perKm: number;

  perMinute: number;

  bookingFee: number;

  waitingPerMinute: number;

  freeWaitingMinutes: number;

  cancellationFee: number;

  minimumCancellationMinutes: number;
}

export interface SurgeSettings {
  region: PricingRegion;

  enabled: boolean;

  minimumMultiplier: number;

  maximumMultiplier: number;

  demandThreshold: number;

  driverSupplyThreshold: number;

  manualMultiplier: number;

  manualOverride: boolean;
}

export interface DriverCommissionSettings {
  region: PricingRegion;

  standardCommissionPercent: number;

  freeRideProgramEnabled: boolean;

  monthlyFreeRideCount: number;

  freeRideCommissionPercent: number;

  commissionAfterFreeQuotaPercent: number;

  resetDay: number;
}

export interface FareCalculationInput {
  region: PricingRegion;

  rideType:
    PricingRideType;

  distanceKm: number;

  durationMinutes: number;

  waitingMinutes: number;

  surgeMultiplier: number;
}

export interface FareCalculationResult {
  baseFare: number;

  distanceFare: number;

  durationFare: number;

  waitingFare: number;

  bookingFee: number;

  subtotal: number;

  surgeAmount: number;

  calculatedFare: number;

  finalFare: number;

  currency:
    PricingCurrency;
}