import type {
  Ride,
  RideDriverOption,
  RideIncident,
} from "../types/ride";

export const dummyRides: Ride[] = [
  {
    id: "RIDE-10001",

    region: "Pakistan",

    city: "Lahore",

    passengerId: "PASS-1001",

    passengerName:
      "Ahmed Khan",

    passengerPhone:
      "+92 300 1112233",

    driverId: "DRV-1001",

    driverName:
      "Muhammad Bilal",

    driverPhone:
      "+92 301 5556622",

    vehicleId: "VEH-1001",

    vehicleName:
      "Toyota Corolla",

    vehiclePlate:
      "LEA-2026",

    rideType: "economy",

    status: "in_progress",

    pickup: {
      label:
        "Gulberg III, Lahore",

      latitude: 31.5204,

      longitude: 74.3587,
    },

    destination: {
      label:
        "DHA Phase 5, Lahore",

      latitude: 31.4697,

      longitude: 74.401,
    },

    distanceKm: 11.8,

    estimatedDurationMinutes: 28,

    estimatedFare: 780,

    paymentMethod: "cash",

    scheduled: false,

    requestedAt:
      "2026-07-24T13:05:00",

    timeline: [
      {
        id: "RTL-1",

        title:
          "Ride requested",

        description:
          "Passenger requested Economy ride.",

        createdAt:
          "2026-07-24T13:05:00",
      },

      {
        id: "RTL-2",

        title:
          "Driver assigned",

        description:
          "Muhammad Bilal accepted the ride.",

        createdAt:
          "2026-07-24T13:07:00",
      },

      {
        id: "RTL-3",

        title:
          "Ride started",

        createdAt:
          "2026-07-24T13:18:00",
      },
    ],
  },

  {
    id: "RIDE-10002",

    region: "Pakistan",

    city: "Islamabad",

    passengerId: "PASS-1002",

    passengerName:
      "Sara Ali",

    passengerPhone:
      "+92 321 8877665",

    driverId: "DRV-1002",

    driverName:
      "Usman Raza",

    driverPhone:
      "+92 333 1188221",

    vehicleId: "VEH-1002",

    vehicleName:
      "Honda City",

    vehiclePlate:
      "ICT-908",

    rideType: "comfort",

    status: "completed",

    pickup: {
      label:
        "F-7 Markaz, Islamabad",

      latitude: 33.7205,

      longitude: 73.0562,
    },

    destination: {
      label:
        "DHA Phase 2, Islamabad",

      latitude: 33.5254,

      longitude: 73.153,
    },

    distanceKm: 18.4,

    estimatedDurationMinutes: 36,

    actualDurationMinutes: 40,

    estimatedFare: 1400,

    finalFare: 1490,

    paymentMethod: "card",

    scheduled: false,

    requestedAt:
      "2026-07-24T09:15:00",

    completedAt:
      "2026-07-24T10:04:00",

    timeline: [
      {
        id: "RTL-4",
        title: "Ride requested",
        createdAt:
          "2026-07-24T09:15:00",
      },

      {
        id: "RTL-5",
        title: "Driver assigned",
        createdAt:
          "2026-07-24T09:18:00",
      },

      {
        id: "RTL-6",
        title: "Ride started",
        createdAt:
          "2026-07-24T09:24:00",
      },

      {
        id: "RTL-7",
        title: "Ride completed",
        createdAt:
          "2026-07-24T10:04:00",
      },
    ],
  },

  {
    id: "RIDE-10003",

    region: "Germany",

    city: "Berlin",

    passengerId: "PASS-1003",

    passengerName:
      "Daniel Weber",

    passengerPhone:
      "+49 151 8844221",

    rideType: "premium",

    status: "searching",

    pickup: {
      label:
        "Alexanderplatz, Berlin",

      latitude: 52.5219,

      longitude: 13.4132,
    },

    destination: {
      label:
        "Berlin Brandenburg Airport",

      latitude: 52.3667,

      longitude: 13.5033,
    },

    distanceKm: 24.1,

    estimatedDurationMinutes: 38,

    estimatedFare: 58,

    paymentMethod: "card",

    scheduled: false,

    requestedAt:
      "2026-07-24T13:10:00",

    timeline: [
      {
        id: "RTL-8",

        title:
          "Ride requested",

        createdAt:
          "2026-07-24T13:10:00",
      },

      {
        id: "RTL-9",

        title:
          "Searching for driver",

        createdAt:
          "2026-07-24T13:10:10",
      },
    ],
  },

  {
    id: "RIDE-10004",

    region: "Pakistan",

    city: "Karachi",

    passengerId: "PASS-1004",

    passengerName:
      "Hina Shah",

    passengerPhone:
      "+92 322 8899001",

    rideType: "economy",

    status: "cancelled",

    pickup: {
      label:
        "Clifton Block 5, Karachi",

      latitude: 24.8138,

      longitude: 67.0299,
    },

    destination: {
      label:
        "Jinnah International Airport",

      latitude: 24.9065,

      longitude: 67.1608,
    },

    distanceKm: 20.2,

    estimatedDurationMinutes: 35,

    estimatedFare: 1150,

    paymentMethod: "cash",

    scheduled: false,

    requestedAt:
      "2026-07-24T08:20:00",

    cancelledAt:
      "2026-07-24T08:24:00",

    cancelledBy:
      "passenger",

    cancellationReason:
      "Passenger changed travel plan.",

    timeline: [
      {
        id: "RTL-10",

        title:
          "Ride requested",

        createdAt:
          "2026-07-24T08:20:00",
      },

      {
        id: "RTL-11",

        title:
          "Ride cancelled",

        description:
          "Cancelled by passenger.",

        createdAt:
          "2026-07-24T08:24:00",
      },
    ],
  },

  {
    id: "RIDE-10005",

    region: "Pakistan",

    city: "Lahore",

    passengerId: "PASS-1005",

    passengerName:
      "Ayesha Noor",

    passengerPhone:
      "+92 300 4455667",

    rideType: "comfort",

    status: "requested",

    pickup: {
      label:
        "Johar Town, Lahore",

      latitude: 31.4697,

      longitude: 74.2728,
    },

    destination: {
      label:
        "Packages Mall, Lahore",

      latitude: 31.4702,

      longitude: 74.356,
    },

    distanceKm: 10.5,

    estimatedDurationMinutes: 25,

    estimatedFare: 920,

    paymentMethod: "wallet",

    scheduled: true,

    scheduledAt:
      "2026-07-25T18:30:00",

    requestedAt:
      "2026-07-24T12:00:00",

    timeline: [
      {
        id: "RTL-12",

        title:
          "Scheduled ride created",

        createdAt:
          "2026-07-24T12:00:00",
      },
    ],
  },
];

export const dummyAvailableDrivers: RideDriverOption[] = [
  {
    id: "DRV-1001",

    name:
      "Muhammad Bilal",

    phone:
      "+92 301 5556622",

    vehicle:
      "Toyota Corolla",

    vehiclePlate:
      "LEA-2026",

    rating: 4.9,

    distanceKm: 1.4,

    online: true,
  },

  {
    id: "DRV-1006",

    name:
      "Ali Hassan",

    phone:
      "+92 300 2299110",

    vehicle:
      "Honda Civic",

    vehiclePlate:
      "LEB-199",

    rating: 4.8,

    distanceKm: 2.1,

    online: true,
  },

  {
    id: "DRV-1007",

    name:
      "Hamza Raza",

    phone:
      "+92 333 8800112",

    vehicle:
      "Toyota Yaris",

    vehiclePlate:
      "LEC-781",

    rating: 4.7,

    distanceKm: 3.2,

    online: true,
  },
];

export const dummyRideIncidents: RideIncident[] = [
  {
    id: "RI-1001",

    rideId: "RIDE-10002",

    title:
      "Route dispute",

    description:
      "Passenger reported an unexpected route deviation.",

    priority: "medium",

    status:
      "investigating",

    reportedBy:
      "passenger",

    createdAt:
      "2026-07-24T10:12:00",
  },

  {
    id: "RI-1002",

    rideId: "RIDE-10004",

    title:
      "Cancellation complaint",

    description:
      "Passenger contacted support regarding cancellation charge.",

    priority: "low",

    status: "open",

    reportedBy:
      "passenger",

    createdAt:
      "2026-07-24T08:40:00",
  },
];