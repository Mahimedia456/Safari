import type {
  Passenger,
  PassengerFlag,
  PassengerRide,
  PassengerSupportCase,
} from "../types/passenger";

export const dummyPassengers: Passenger[] = [
  {
    id: "PASS-1001",

    region: "Pakistan",
    city: "Lahore",

    fullName: "Ahmed Khan",

    email:
      "ahmed.khan@example.com",

    phone:
      "+92 300 1112233",

    status: "active",

    verificationStatus:
      "verified",

    joinedAt:
      "2025-08-12T10:00:00",

    lastActiveAt:
      "2026-07-27T11:34:00",

    totalRides: 182,

    completedRides: 174,

    cancelledRides: 8,

    rating: 4.8,

    totalRatings: 114,

    referralCode:
      "AHMEDSAFARI",

    emergencyContactName:
      "Ali Khan",

    emergencyContactPhone:
      "+92 321 9988776",

    wallet: {
      balance: 3250,

      totalSpent: 184600,

      rideSpend: 121300,

      foodSpend: 29400,

      grocerySpend: 18900,

      pharmacySpend: 7200,

      servicesSpend: 7800,

      refundsReceived: 3400,

      pointsBalance: 1280,
    },

    addresses: [
      {
        id: "PA-1001",

        passengerId:
          "PASS-1001",

        label: "Home",

        address:
          "Gulberg III, Lahore",

        city: "Lahore",

        latitude: 31.5204,

        longitude: 74.3587,

        default: true,
      },

      {
        id: "PA-1002",

        passengerId:
          "PASS-1001",

        label: "Work",

        address:
          "DHA Phase 5, Lahore",

        city: "Lahore",

        latitude: 31.4697,

        longitude: 74.401,

        default: false,
      },
    ],
  },

  {
    id: "PASS-1002",

    region: "Pakistan",
    city: "Islamabad",

    fullName: "Sara Ali",

    email:
      "sara.ali@example.com",

    phone:
      "+92 321 8877665",

    status: "active",

    verificationStatus:
      "verified",

    joinedAt:
      "2025-10-24T12:20:00",

    lastActiveAt:
      "2026-07-27T10:20:00",

    totalRides: 95,

    completedRides: 91,

    cancelledRides: 4,

    rating: 4.9,

    totalRatings: 64,

    referralCode:
      "SARARIDE",

    wallet: {
      balance: 1800,

      totalSpent: 112400,

      rideSpend: 78500,

      foodSpend: 18200,

      grocerySpend: 10400,

      pharmacySpend: 3100,

      servicesSpend: 2200,

      refundsReceived: 900,

      pointsBalance: 730,
    },

    addresses: [
      {
        id: "PA-2001",

        passengerId:
          "PASS-1002",

        label: "Home",

        address:
          "F-7, Islamabad",

        city: "Islamabad",

        latitude: 33.7205,

        longitude: 73.0562,

        default: true,
      },
    ],
  },

  {
    id: "PASS-1003",

    region: "Pakistan",
    city: "Berlin",

    fullName:
      "Daniel Weber",

    email:
      "daniel.weber@example.de",

    phone:
      "+92 151 8844221",

    status: "active",

    verificationStatus:
      "verified",

    joinedAt:
      "2025-06-17T08:15:00",

    lastActiveAt:
      "2026-07-27T08:55:00",

    totalRides: 224,

    completedRides: 218,

    cancelledRides: 6,

    rating: 4.92,

    totalRatings: 142,

    referralCode:
      "DANIELBERLIN",

    wallet: {
      balance: 48.5,

      totalSpent: 3410,

      rideSpend: 2740,

      foodSpend: 385,

      grocerySpend: 160,

      pharmacySpend: 45,

      servicesSpend: 80,

      refundsReceived: 64,

      pointsBalance: 1530,
    },

    addresses: [
      {
        id: "PA-3001",

        passengerId:
          "PASS-1003",

        label: "Home",

        address:
          "Clifton, Karachi",

        city: "Berlin",

        latitude: 52.5219,

        longitude: 13.4132,

        default: true,
      },
    ],
  },

  {
    id: "PASS-1004",

    region: "Pakistan",
    city: "Karachi",

    fullName:
      "Hina Shah",

    email:
      "hina.shah@example.com",

    phone:
      "+92 322 8899001",

    status: "suspended",

    verificationStatus:
      "flagged",

    joinedAt:
      "2026-01-14T09:20:00",

    lastActiveAt:
      "2026-07-22T17:40:00",

    totalRides: 41,

    completedRides: 32,

    cancelledRides: 9,

    rating: 4.1,

    totalRatings: 24,

    referralCode:
      "HINAKHI",

    wallet: {
      balance: 600,

      totalSpent: 37400,

      rideSpend: 31200,

      foodSpend: 4200,

      grocerySpend: 1200,

      pharmacySpend: 800,

      servicesSpend: 0,

      refundsReceived: 2500,

      pointsBalance: 90,
    },

    addresses: [
      {
        id: "PA-4001",

        passengerId:
          "PASS-1004",

        label: "Home",

        address:
          "Clifton Block 5, Karachi",

        city: "Karachi",

        latitude: 24.8138,

        longitude: 67.0299,

        default: true,
      },
    ],
  },

  {
    id: "PASS-1005",

    region: "Pakistan",
    city: "Karachi",

    fullName:
      "Sophie Müller",

    email:
      "sophie.mueller@example.de",

    phone:
      "+92 176 88997711",

    status: "blocked",

    verificationStatus:
      "flagged",

    joinedAt:
      "2026-03-01T11:00:00",

    lastActiveAt:
      "2026-07-18T15:10:00",

    totalRides: 22,

    completedRides: 13,

    cancelledRides: 9,

    rating: 3.7,

    totalRatings: 11,

    referralCode:
      "SOPHIEHH",

    wallet: {
      balance: 0,

      totalSpent: 286,

      rideSpend: 241,

      foodSpend: 45,

      grocerySpend: 0,

      pharmacySpend: 0,

      servicesSpend: 0,

      refundsReceived: 38,

      pointsBalance: 0,
    },

    addresses: [],
  },
];

export const dummyPassengerRides: PassengerRide[] = [
  {
    id: "RIDE-10001",

    passengerId:
      "PASS-1001",

    driverName:
      "Muhammad Bilal",

    pickup:
      "Gulberg III, Lahore",

    destination:
      "DHA Phase 5, Lahore",

    status: "completed",

    rideType: "economy",

    amount: 780,

    currency: "PKR",

    createdAt:
      "2026-07-24T13:05:00",
  },

  {
    id: "RIDE-10002",

    passengerId:
      "PASS-1002",

    driverName:
      "Usman Raza",

    pickup:
      "F-7 Markaz, Islamabad",

    destination:
      "DHA Phase 2, Islamabad",

    status: "completed",

    rideType: "comfort",

    amount: 1490,

    currency: "PKR",

    createdAt:
      "2026-07-24T09:15:00",
  },

  {
    id: "RIDE-10003",

    passengerId:
      "PASS-1003",

    pickup:
      "Clifton, Karachi",

    destination:
      "Jinnah International Airport",

    status: "cancelled",

    rideType: "premium",

    amount: 0,

    currency: "PKR",

    createdAt:
      "2026-07-24T13:10:00",
  },

  {
    id: "RIDE-10004",

    passengerId:
      "PASS-1004",

    pickup:
      "Clifton Block 5, Karachi",

    destination:
      "Jinnah International Airport",

    status: "cancelled",

    rideType: "economy",

    amount: 120,

    currency: "PKR",

    createdAt:
      "2026-07-24T08:20:00",
  },
];

export const dummyPassengerFlags: PassengerFlag[] = [
  {
    id: "PFLAG-1001",

    passengerId:
      "PASS-1004",

    title:
      "Repeated cancellations",

    description:
      "Passenger has a high cancellation ratio over recent rides.",

    severity: "medium",

    status: "reviewing",

    createdAt:
      "2026-07-22T18:00:00",
  },

  {
    id: "PFLAG-1002",

    passengerId:
      "PASS-1005",

    title:
      "Payment abuse suspected",

    description:
      "Multiple disputed charges and repeated account payment failures.",

    severity: "high",

    status: "open",

    createdAt:
      "2026-07-18T15:30:00",
  },
];

export const dummyPassengerSupportCases: PassengerSupportCase[] = [
  {
    id: "PSC-1001",

    passengerId:
      "PASS-1001",

    subject:
      "Charged more than estimated fare",

    category: "ride",

    status: "resolved",

    priority: "normal",

    createdAt:
      "2026-07-20T12:30:00",
  },

  {
    id: "PSC-1002",

    passengerId:
      "PASS-1004",

    subject:
      "Cancellation fee complaint",

    category: "payment",

    status:
      "in_progress",

    priority: "high",

    createdAt:
      "2026-07-24T09:20:00",
  },

  {
    id: "PSC-1003",

    passengerId:
      "PASS-1003",

    subject:
      "Unable to update saved address",

    category: "account",

    status: "open",

    priority: "low",

    createdAt:
      "2026-07-26T15:50:00",
  },
];