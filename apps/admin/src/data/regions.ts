import type {
  SafariRegion,
} from "../types/region";

export const dummyRegions: SafariRegion[] = [
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

      timezone:
        "Asia/Karachi",

      dateFormat:
        "DD/MM/YYYY",

      timeFormat: "12h",

      phonePrefix: "+92",
    },

    support: {
      supportEmail:
        "support.pk@safari.com",

      supportPhone:
        "+92 21 111 723274",

      emergencyPhone:
        "15",

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
      "2026-07-27T10:00:00",
  },

  {
    id: "REG-DE",

    code: "DE",

    name: "Germany",

    currency: "EUR",

    currencySymbol: "€",

    status: "active",

    flagEmoji: "🇩🇪",

    activeCities: [
      "Berlin",
      "Hamburg",
      "Munich",
      "Frankfurt",
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
        acceptingNewMerchants: false,
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
        enabled: false,
        acceptingNewDrivers: false,
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
      defaultLanguage: "German",

      supportedLanguages: [
        "German",
        "English",
      ],

      timezone:
        "Europe/Berlin",

      dateFormat:
        "DD.MM.YYYY",

      timeFormat: "24h",

      phonePrefix: "+49",
    },

    support: {
      supportEmail:
        "support.de@safari.com",

      supportPhone:
        "+49 30 555 8000",

      emergencyPhone:
        "112",

      emergencyMessage:
        "For emergencies, contact local emergency services immediately.",
    },

    operations: {
      passengerRegistrationEnabled: true,

      driverRegistrationEnabled: true,

      merchantRegistrationEnabled: true,

      rideBookingEnabled: true,

      scheduledRidesEnabled: true,

      cashPaymentsEnabled: false,

      cardPaymentsEnabled: true,

      walletPaymentsEnabled: true,
    },

    createdAt:
      "2026-01-01T09:00:00",

    updatedAt:
      "2026-07-27T10:00:00",
  },
];