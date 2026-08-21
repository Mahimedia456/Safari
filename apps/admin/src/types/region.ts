export type MarketCode =
  "PK";

export type MarketName =
  "Pakistan";

export type MarketStatus =
  | "active"
  | "maintenance"
  | "disabled";

export type MarketCurrency =
  "PKR";

export type MarketServiceType =
  | "food"
  | "grocery"
  | "pharmacy"
  | "services";

export type MarketRideType =
  | "bike"
  | "economy"
  | "comfort"
  | "premium";

export interface MarketServiceAvailability {
  service: MarketServiceType;
  enabled: boolean;
  acceptingNewMerchants: boolean;
}

export interface MarketRideAvailability {
  rideType: MarketRideType;
  enabled: boolean;
  acceptingNewDrivers: boolean;
}

export interface MarketLocalization {
  defaultLanguage: string;
  supportedLanguages: string[];
  timezone: string;
  dateFormat: string;
  timeFormat: "12h" | "24h";
  phonePrefix: string;
}

export interface MarketSupport {
  supportEmail: string;
  supportPhone: string;
  emergencyPhone: string;
  emergencyMessage: string;
}

export interface MarketOperations {
  passengerRegistrationEnabled: boolean;
  driverRegistrationEnabled: boolean;
  merchantRegistrationEnabled: boolean;
  rideBookingEnabled: boolean;
  scheduledRidesEnabled: boolean;
  cashPaymentsEnabled: boolean;
  cardPaymentsEnabled: boolean;
  walletPaymentsEnabled: boolean;
}

export interface SafariMarket {
  id: string;
  code: MarketCode;
  name: MarketName;
  currency: MarketCurrency;
  currencySymbol: string;
  status: MarketStatus;
  flagEmoji: string;
  activeCities: string[];
  services: MarketServiceAvailability[];
  rides: MarketRideAvailability[];
  localization: MarketLocalization;
  support: MarketSupport;
  operations: MarketOperations;
  createdAt: string;
  updatedAt: string;
}
