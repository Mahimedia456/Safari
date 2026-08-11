export type RegionCode =
  | "PK"
  | "DE";

export type RegionName =
  | "Pakistan"
  | "Germany";

export type RegionStatus =
  | "active"
  | "maintenance"
  | "disabled";

export type RegionCurrency =
  | "PKR"
  | "EUR";

export type RegionServiceType =
  | "food"
  | "grocery"
  | "pharmacy"
  | "services";

export type RegionRideType =
  | "bike"
  | "economy"
  | "comfort"
  | "premium";

export interface RegionServiceAvailability {
  service: RegionServiceType;

  enabled: boolean;

  acceptingNewMerchants: boolean;
}

export interface RegionRideAvailability {
  rideType: RegionRideType;

  enabled: boolean;

  acceptingNewDrivers: boolean;
}

export interface RegionLocalization {
  defaultLanguage: string;

  supportedLanguages: string[];

  timezone: string;

  dateFormat: string;

  timeFormat:
    | "12h"
    | "24h";

  phonePrefix: string;
}

export interface RegionSupport {
  supportEmail: string;

  supportPhone: string;

  emergencyPhone: string;

  emergencyMessage: string;
}

export interface RegionOperations {
  passengerRegistrationEnabled: boolean;

  driverRegistrationEnabled: boolean;

  merchantRegistrationEnabled: boolean;

  rideBookingEnabled: boolean;

  scheduledRidesEnabled: boolean;

  cashPaymentsEnabled: boolean;

  cardPaymentsEnabled: boolean;

  walletPaymentsEnabled: boolean;
}

export interface SafariRegion {
  id: string;

  code: RegionCode;

  name: RegionName;

  currency: RegionCurrency;

  currencySymbol: string;

  status: RegionStatus;

  flagEmoji: string;

  activeCities: string[];

  services: RegionServiceAvailability[];

  rides: RegionRideAvailability[];

  localization: RegionLocalization;

  support: RegionSupport;

  operations: RegionOperations;

  createdAt: string;

  updatedAt: string;
}