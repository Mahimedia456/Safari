import type {
  Driver,
  DriverApplication,
  DriverRating,
  DriverVehicle,
} from "../types/driver";

export const dummyDrivers: Driver[] = [
  {
    id: "DRV-1001",

    region: "Pakistan",
    city: "Lahore",

    fullName:
      "Muhammad Bilal",

    email:
      "bilal.driver@safari.com",

    phone:
      "+92 301 5556622",

    status: "active",

    applicationStatus:
      "approved",

    verificationStatus:
      "verified",

    online: true,

    rating: 4.9,

    totalRatings: 628,

    totalRides: 1482,

    completedRides: 1434,

    cancelledRides: 48,

    acceptanceRate: 94,

    completionRate: 96.8,

    joinedAt:
      "2025-09-12T11:30:00",

    lastOnlineAt:
      "2026-07-24T13:20:00",

    vehicleId:
      "VEH-1001",

    documents: [
      {
        id: "DD-1001",

        driverId:
          "DRV-1001",

        type:
          "cnic",

        documentNumber:
          "35202-1234567-1",

        fileName:
          "bilal-cnic.jpg",

        status:
          "verified",

        reviewedAt:
          "2025-09-11T14:00:00",
      },

      {
        id: "DD-1002",

        driverId:
          "DRV-1001",

        type:
          "driving_license",

        documentNumber:
          "LHR-DL-887721",

        fileName:
          "bilal-license.jpg",

        status:
          "verified",

        issuedAt:
          "2024-04-15",

        expiresAt:
          "2029-04-15",

        reviewedAt:
          "2025-09-11T14:05:00",
      },

      {
        id: "DD-1003",

        driverId:
          "DRV-1001",

        type:
          "background_check",

        fileName:
          "bilal-background.pdf",

        status:
          "verified",

        reviewedAt:
          "2025-09-12T09:30:00",
      },

      {
        id: "DD-1004",

        driverId:
          "DRV-1001",

        type:
          "profile_photo",

        fileName:
          "bilal-profile.jpg",

        status:
          "verified",
      },
    ],

    wallet: {
      balance: 32640,

      pendingPayout: 18500,

      totalEarnings: 982400,

      totalCommission: 166320,

      currentMonthEarnings: 84400,

      freeRideUsed: 5,

      freeRideRemaining: 0,
    },
  },

  {
    id: "DRV-1002",

    region: "Pakistan",
    city: "Islamabad",

    fullName:
      "Usman Raza",

    email:
      "usman.driver@safari.com",

    phone:
      "+92 333 1188221",

    status: "active",

    applicationStatus:
      "approved",

    verificationStatus:
      "verified",

    online: false,

    rating: 4.8,

    totalRatings: 401,

    totalRides: 932,

    completedRides: 901,

    cancelledRides: 31,

    acceptanceRate: 91,

    completionRate: 96.7,

    joinedAt:
      "2025-11-18T12:00:00",

    lastOnlineAt:
      "2026-07-24T11:45:00",

    vehicleId:
      "VEH-1002",

    documents: [
      {
        id: "DD-2001",

        driverId:
          "DRV-1002",

        type:
          "cnic",

        fileName:
          "usman-cnic.jpg",

        status:
          "verified",
      },

      {
        id: "DD-2002",

        driverId:
          "DRV-1002",

        type:
          "driving_license",

        fileName:
          "usman-license.jpg",

        status:
          "verified",

        expiresAt:
          "2028-08-20",
      },

      {
        id: "DD-2003",

        driverId:
          "DRV-1002",

        type:
          "background_check",

        fileName:
          "usman-background.pdf",

        status:
          "verified",
      },
    ],

    wallet: {
      balance: 21800,

      pendingPayout: 11000,

      totalEarnings: 644500,

      totalCommission: 112100,

      currentMonthEarnings: 59200,

      freeRideUsed: 4,

      freeRideRemaining: 1,
    },
  },

  {
    id: "DRV-1003",

    region: "Pakistan",
    city: "Berlin",

    fullName:
      "Jonas Weber",

    email:
      "jonas.driver@safari.com",

    phone:
      "+92 151 11882211",

    status: "active",

    applicationStatus:
      "approved",

    verificationStatus:
      "verified",

    online: true,

    rating: 4.95,

    totalRatings: 812,

    totalRides: 1770,

    completedRides: 1732,

    cancelledRides: 38,

    acceptanceRate: 96,

    completionRate: 97.8,

    joinedAt:
      "2025-08-03T08:00:00",

    lastOnlineAt:
      "2026-07-24T13:28:00",

    vehicleId:
      "VEH-1003",

    documents: [
      {
        id: "DD-3001",

        driverId:
          "DRV-1003",

        type:
          "passport",

        fileName:
          "jonas-passport.jpg",

        status:
          "verified",
      },

      {
        id: "DD-3002",

        driverId:
          "DRV-1003",

        type:
          "driving_license",

        fileName:
          "jonas-license.jpg",

        status:
          "verified",

        expiresAt:
          "2030-04-11",
      },

      {
        id: "DD-3003",

        driverId:
          "DRV-1003",

        type:
          "background_check",

        fileName:
          "jonas-background.pdf",

        status:
          "verified",
      },
    ],

    wallet: {
      balance: 412.5,

      pendingPayout: 280,

      totalEarnings: 18450,

      totalCommission: 3410,

      currentMonthEarnings: 1640,

      freeRideUsed: 5,

      freeRideRemaining: 0,
    },
  },

  {
    id: "DRV-1004",

    region: "Pakistan",
    city: "Karachi",

    fullName:
      "Fahad Ahmed",

    email:
      "fahad.driver@safari.com",

    phone:
      "+92 300 9900112",

    status:
      "suspended",

    applicationStatus:
      "approved",

    verificationStatus:
      "verified",

    online: false,

    rating: 4.1,

    totalRatings: 188,

    totalRides: 420,

    completedRides: 382,

    cancelledRides: 38,

    acceptanceRate: 82,

    completionRate: 91,

    joinedAt:
      "2026-01-08T10:15:00",

    lastOnlineAt:
      "2026-07-20T18:10:00",

    vehicleId:
      "VEH-1004",

    documents: [
      {
        id: "DD-4001",

        driverId:
          "DRV-1004",

        type:
          "cnic",

        fileName:
          "fahad-cnic.jpg",

        status:
          "verified",
      },

      {
        id: "DD-4002",

        driverId:
          "DRV-1004",

        type:
          "driving_license",

        fileName:
          "fahad-license.jpg",

        status:
          "verified",
      },
    ],

    wallet: {
      balance: 8600,

      pendingPayout: 0,

      totalEarnings: 292400,

      totalCommission: 51600,

      currentMonthEarnings: 12400,

      freeRideUsed: 5,

      freeRideRemaining: 0,
    },
  },
];

export const dummyDriverApplications: DriverApplication[] = [
  {
    id: "DAPP-1001",

    driverId:
      "DRV-2001",

    applicantName:
      "Ali Hassan",

    email:
      "ali.hassan@example.com",

    phone:
      "+92 300 2299110",

    region: "Pakistan",

    city: "Lahore",

    status: "pending",

    vehicleType:
      "economy",

    submittedAt:
      "2026-07-24T09:30:00",
  },

  {
    id: "DAPP-1002",

    driverId:
      "DRV-2002",

    applicantName:
      "Hamza Tariq",

    email:
      "hamza.tariq@example.com",

    phone:
      "+92 333 8800112",

    region: "Pakistan",

    city: "Karachi",

    status:
      "under_review",

    vehicleType:
      "bike",

    submittedAt:
      "2026-07-23T16:20:00",
  },

  {
    id: "DAPP-1003",

    driverId:
      "DRV-2003",

    applicantName:
      "Lukas Schneider",

    email:
      "lukas.schneider@example.de",

    phone:
      "+92 151 99001122",

    region: "Pakistan",

    city: "Hamburg",

    status: "pending",

    vehicleType:
      "comfort",

    submittedAt:
      "2026-07-24T08:15:00",
  },
];

export const dummyDriverVehicles: DriverVehicle[] = [
  {
    id: "VEH-1001",

    driverId:
      "DRV-1001",

    make: "Toyota",

    model: "Corolla",

    year: 2021,

    color: "White",

    plateNumber:
      "LEA-2026",

    category:
      "economy",

    registrationStatus:
      "verified",

    insuranceStatus:
      "verified",

    active: true,
  },

  {
    id: "VEH-1002",

    driverId:
      "DRV-1002",

    make: "Honda",

    model: "City",

    year: 2022,

    color: "Silver",

    plateNumber:
      "ICT-908",

    category:
      "comfort",

    registrationStatus:
      "verified",

    insuranceStatus:
      "verified",

    active: true,
  },

  {
    id: "VEH-1003",

    driverId:
      "DRV-1003",

    make:
      "Mercedes-Benz",

    model: "C-Class",

    year: 2023,

    color: "Black",

    plateNumber:
      "B-SA 4821",

    category:
      "premium",

    registrationStatus:
      "verified",

    insuranceStatus:
      "verified",

    active: true,
  },

  {
    id: "VEH-1004",

    driverId:
      "DRV-1004",

    make: "Suzuki",

    model: "Swift",

    year: 2020,

    color: "Grey",

    plateNumber:
      "BKR-447",

    category:
      "economy",

    registrationStatus:
      "verified",

    insuranceStatus:
      "expired",

    active: false,
  },
];

export const dummyDriverRatings: DriverRating[] = [
  {
    id: "DRATE-1",

    driverId:
      "DRV-1001",

    passengerName:
      "Ahmed Khan",

    rideId:
      "RIDE-10001",

    rating: 5,

    comment:
      "Professional driver and clean car.",

    createdAt:
      "2026-07-23T17:20:00",
  },

  {
    id: "DRATE-2",

    driverId:
      "DRV-1002",

    passengerName:
      "Sara Ali",

    rideId:
      "RIDE-10002",

    rating: 4,

    comment:
      "Good ride but pickup took a little longer.",

    createdAt:
      "2026-07-24T10:10:00",
  },

  {
    id: "DRATE-3",

    driverId:
      "DRV-1004",

    passengerName:
      "Hina Shah",

    rideId:
      "RIDE-10004",

    rating: 2,

    comment:
      "Driver communication was poor.",

    createdAt:
      "2026-07-20T16:20:00",
  },
];