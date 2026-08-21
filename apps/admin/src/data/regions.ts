import type {
  SafariMarket,
} from "../types/region";

export const dummyMarkets: SafariMarket[] = [
  {
    id: "REG-PK",
    code: "PK",
    name: "Pakistan",
    currency: "PKR",
    currencySymbol: "Rs ",
    status: "active",
    flagEmoji: "🇵🇰",

    activeCities: [
      "Karachi",
      "Lahore",
      "Islamabad",
      "Rawalpindi",
    ],

    services: [
      {
        service: "food",
        enabled: true,
        acceptingNewMerchants: true,
      },
      {
        service: "grocery",
        enabled: true,
        acceptingNewMerchants: true,
      },
      {
        service: "pharmacy",
        enabled: true,
        acceptingNewMerchants: true,
      },
      {
        service: "services",
        enabled: true,
        acceptingNewMerchants: true,
      },
    ],

    rides: [
      {
        rideType: "bike",
        enabled: true,
        acceptingNewDrivers: true,
      },
      {
        rideType: "economy",
        enabled: true,
        acceptingNewDrivers: true,
      },
      {
        rideType: "comfort",
        enabled: true,
        acceptingNewDrivers: true,
      },
      {
        rideType: "premium",
        enabled: true,
        acceptingNewDrivers: true,
      },
    ],

    localization: {
      defaultLanguage: "English",
      supportedLanguages: [
        "English",
        "Urdu",
      ],
      timezone: "Asia/Karachi",
      dateFormat: "DD/MM/YYYY",
      timeFormat: "12h",
      phonePrefix: "+92",
    },

    support: {
      supportEmail:
        "support.pk@safari.com",
      supportPhone:
        "+92 21 111 723274",
      emergencyPhone: "15",
      emergencyMessage:
        "For immediate emergency assistance, contact local authorities first.",
    },

    operations: {
      passengerRegistrationEnabled: true,
      driverRegistrationEnabled: true,
      merchantRegistrationEnabled: true,
      rideBookingEnabled: true,
      scheduledRidesEnabled: true,
      cashPaymentsEnabled: true,
      cardPaymentsEnabled: true,
      walletPaymentsEnabled: true,
    },

    createdAt:
      "2026-01-01T09:00:00",
    updatedAt:
      new Date().toISOString(),
  },
];
