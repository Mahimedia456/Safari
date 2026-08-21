import type {
  SafariStore,
  StoreOpeningHours,
} from "../types/store";

export const defaultOpeningHours: StoreOpeningHours[] =
  [
    {
      day: "Monday",
      enabled: true,
      open: "09:00",
      close: "23:00",
    },
    {
      day: "Tuesday",
      enabled: true,
      open: "09:00",
      close: "23:00",
    },
    {
      day: "Wednesday",
      enabled: true,
      open: "09:00",
      close: "23:00",
    },
    {
      day: "Thursday",
      enabled: true,
      open: "09:00",
      close: "23:00",
    },
    {
      day: "Friday",
      enabled: true,
      open: "14:00",
      close: "23:59",
    },
    {
      day: "Saturday",
      enabled: true,
      open: "10:00",
      close: "23:59",
    },
    {
      day: "Sunday",
      enabled: true,
      open: "10:00",
      close: "23:00",
    },
  ];

export const dummyStores: SafariStore[] =
  [
    {
      id: "ST-1001",

      merchantId: "MER-1001",
      merchantName: "Burger District",

      name: "Burger District Gulberg",

      slug: "burger-district-gulberg",

      type: "food",

      status: "active",

      email: "gulberg@burgerdistrict.pk",

      phone: "+92 300 1112201",

      country: "Pakistan",

      city: "Lahore",

      address:
        "MM Alam Road, Gulberg III, Lahore",

      latitude: 31.5204,
      longitude: 74.3587,

      commissionPercentage: 14,

      minimumOrder: 500,

      deliveryRadiusKm: 8,

      createdAt: "2026-07-05",

      approvedAt: "2026-07-06",

      totalOrders: 1135,

      grossSales: 1785000,

      openingHours:
        defaultOpeningHours.map(
          (item) => ({
            ...item,
          }),
        ),
    },

    {
      id: "ST-1002",

      merchantId: "MER-1001",

      merchantName:
        "Burger District",

      name:
        "Burger District DHA",

      slug:
        "burger-district-dha",

      type: "food",

      status: "active",

      email:
        "dha@burgerdistrict.pk",

      phone:
        "+92 300 1112202",

      country:
        "Pakistan",

      city: "Lahore",

      address:
        "DHA Phase 5, Lahore",

      latitude: 31.473,
      longitude: 74.401,

      commissionPercentage: 16,

      minimumOrder: 600,

      deliveryRadiusKm: 10,

      createdAt:
        "2026-07-08",

      approvedAt:
        "2026-07-09",

      totalOrders: 707,

      grossSales: 1110000,

      openingHours:
        defaultOpeningHours.map(
          (item) => ({
            ...item,
          }),
        ),
    },

    {
      id: "ST-1003",

      merchantId: "MER-1002",

      merchantName:
        "Fresh Basket",

      name:
        "Fresh Basket F-7",

      slug:
        "fresh-basket-f7",

      type: "grocery",

      status: "pending",

      email:
        "f7@freshbasket.pk",

      phone:
        "+92 301 6789001",

      country:
        "Pakistan",

      city:
        "Islamabad",

      address:
        "F-7 Markaz, Islamabad",

      latitude: 33.7205,
      longitude: 73.0562,

      commissionPercentage: 9,

      minimumOrder: 1000,

      deliveryRadiusKm: 12,

      createdAt:
        "2026-07-21",

      totalOrders: 0,

      grossSales: 0,

      openingHours:
        defaultOpeningHours.map(
          (item) => ({
            ...item,
          }),
        ),
    },

    {
      id: "ST-1004",

      merchantId: "MER-1003",

      merchantName:
        "HealthFirst Pharmacy",

      name:
        "HealthFirst Clifton",

      slug:
        "healthfirst-clifton",

      type: "pharmacy",

      status: "pending",

      email:
        "clifton@healthfirst.pk",

      phone:
        "+92 322 1114401",

      country:
        "Pakistan",

      city: "Karachi",

      address:
        "Clifton Block 5, Karachi",

      latitude: 24.8138,
      longitude: 67.0299,

      commissionPercentage: 6.5,

      minimumOrder: 300,

      deliveryRadiusKm: 8,

      createdAt:
        "2026-07-22",

      totalOrders: 0,

      grossSales: 0,

      openingHours:
        defaultOpeningHours.map(
          (item) => ({
            ...item,
          }),
        ),
    },

    {
      id: "ST-1005",

      merchantId: "MER-1004",

      merchantName:
        "Sparkle Home Services",

      name:
        "Sparkle Home Services",

      slug:
        "sparkle-home-services",

      type: "services",

      status: "active",

      email:
        "bookings@sparklehome.pk",

      phone:
        "+92 333 7682201",

      country:
        "Pakistan",

      city:
        "Rawalpindi",

      address:
        "Bahria Town Phase 7, Rawalpindi",

      latitude: 33.5207,
      longitude: 73.123,

      commissionPercentage: 12,

      deliveryRadiusKm: 25,

      createdAt:
        "2026-06-15",

      approvedAt:
        "2026-06-17",

      totalOrders: 481,

      grossSales: 1580000,

      openingHours:
        defaultOpeningHours.map(
          (item) => ({
            ...item,
          }),
        ),
    },

    {
      id: "ST-1006",

      merchantId: "MER-1005",

      merchantName:
        "Pizza Republic",

      name:
        "Pizza Republic Johar Town",

      slug:
        "pizza-republic-johar-town",

      type: "food",

      status: "suspended",

      email:
        "johar@pizzarepublic.pk",

      phone:
        "+92 310 9933101",

      country:
        "Pakistan",

      city: "Lahore",

      address:
        "Johar Town, Lahore",

      latitude: 31.4697,
      longitude: 74.2728,

      commissionPercentage: 18,

      minimumOrder: 700,

      deliveryRadiusKm: 9,

      createdAt:
        "2026-04-02",

      approvedAt:
        "2026-04-03",

      suspensionReason:
        "Store temporarily suspended due to unresolved customer complaints.",

      totalOrders: 2181,

      grossSales: 3145000,

      openingHours:
        defaultOpeningHours.map(
          (item) => ({
            ...item,
          }),
        ),
    },

    {
      id: "ST-1007",

      merchantId: "MER-1007",

      merchantName:
        "Berlin Bites",

      name:
        "Berlin Bites Mitte",

      slug:
        "berlin-bites-mitte",

      type: "food",

      status: "active",

      email:
        "mitte@berlinbites.de",

      phone:
        "+92 151 2345601",

      country:
        "Pakistan",

      city: "Berlin",

      address:
        "Alexanderplatz 8, Berlin",

      latitude: 52.5219,
      longitude: 13.4132,

      commissionPercentage: 19,

      minimumOrder: 12,

      deliveryRadiusKm: 7,

      createdAt:
        "2026-06-10",

      approvedAt:
        "2026-06-12",

      totalOrders: 923,

      grossSales: 28400,

      openingHours:
        defaultOpeningHours.map(
          (item) => ({
            ...item,
          }),
        ),
    },
  ];