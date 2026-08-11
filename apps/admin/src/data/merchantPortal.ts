import type {
  MerchantEarningEntry,
  MerchantPayoutEntry,
  MerchantPortalProfile,
} from "../types/merchantPortal";

export const dummyMerchantProfiles: MerchantPortalProfile[] = [
  {
    id: "MER-FOOD-001",

    role: "food_merchant",

    businessName:
      "Safari Food House",

    ownerName:
      "Food Merchant",

    email:
      "food@safari.com",

    phone:
      "+92 300 1111111",

    region: "Pakistan",

    currency: "PKR",

    commissionPercent: 15,

    bankName:
      "Meezan Bank",

    accountTitle:
      "Safari Food House",

    accountNumberMasked:
      "**** 1245",

    businessAddress:
      "Main Boulevard",

    city: "Lahore",

    enabled: true,
  },

  {
    id: "MER-GRO-001",

    role:
      "grocery_merchant",

    businessName:
      "Safari Fresh Mart",

    ownerName:
      "Grocery Merchant",

    email:
      "grocery@safari.com",

    phone:
      "+92 300 2222222",

    region: "Pakistan",

    currency: "PKR",

    commissionPercent: 10,

    bankName:
      "HBL",

    accountTitle:
      "Safari Fresh Mart",

    accountNumberMasked:
      "**** 9832",

    businessAddress:
      "Commercial Market",

    city: "Rawalpindi",

    enabled: true,
  },

  {
    id: "MER-PHA-001",

    role:
      "pharmacy_merchant",

    businessName:
      "Safari Health Pharmacy",

    ownerName:
      "Pharmacy Merchant",

    email:
      "pharmacy@safari.com",

    phone:
      "+92 300 3333333",

    region: "Pakistan",

    currency: "PKR",

    commissionPercent: 10,

    bankName:
      "Bank Alfalah",

    accountTitle:
      "Safari Health Pharmacy",

    accountNumberMasked:
      "**** 6642",

    businessAddress:
      "Blue Area",

    city: "Islamabad",

    enabled: true,
  },

  {
    id: "MER-SER-001",

    role:
      "services_merchant",

    businessName:
      "Safari Home Services",

    ownerName:
      "Services Merchant",

    email:
      "services@safari.com",

    phone:
      "+92 300 4444444",

    region: "Pakistan",

    currency: "PKR",

    commissionPercent: 15,

    bankName:
      "UBL",

    accountTitle:
      "Safari Home Services",

    accountNumberMasked:
      "**** 7739",

    businessAddress:
      "DHA Phase 5",

    city: "Lahore",

    enabled: true,
  },
];

export const dummyMerchantEarnings: MerchantEarningEntry[] = [
  {
    id: "EARN-F-001",

    merchantRole:
      "food_merchant",

    referenceId:
      "FOOD-5011",

    grossAmount: 2850,

    commissionPercent: 15,

    commissionAmount: 427.5,

    refundAmount: 0,

    netAmount: 2422.5,

    currency: "PKR",

    status: "settled",

    createdAt:
      "2026-07-26T13:40:00",
  },

  {
    id: "EARN-F-002",

    merchantRole:
      "food_merchant",

    referenceId:
      "FOOD-5012",

    grossAmount: 4200,

    commissionPercent: 15,

    commissionAmount: 630,

    refundAmount: 250,

    netAmount: 3320,

    currency: "PKR",

    status: "pending",

    createdAt:
      "2026-07-27T11:15:00",
  },

  {
    id: "EARN-G-001",

    merchantRole:
      "grocery_merchant",

    referenceId:
      "GRO-4412",

    grossAmount: 6250,

    commissionPercent: 10,

    commissionAmount: 625,

    refundAmount: 0,

    netAmount: 5625,

    currency: "PKR",

    status: "settled",

    createdAt:
      "2026-07-26T14:15:00",
  },

  {
    id: "EARN-G-002",

    merchantRole:
      "grocery_merchant",

    referenceId:
      "GRO-4413",

    grossAmount: 8900,

    commissionPercent: 10,

    commissionAmount: 890,

    refundAmount: 400,

    netAmount: 7610,

    currency: "PKR",

    status: "pending",

    createdAt:
      "2026-07-27T12:45:00",
  },

  {
    id: "EARN-P-001",

    merchantRole:
      "pharmacy_merchant",

    referenceId:
      "PHA-9002",

    grossAmount: 3400,

    commissionPercent: 10,

    commissionAmount: 340,

    refundAmount: 0,

    netAmount: 3060,

    currency: "PKR",

    status: "settled",

    createdAt:
      "2026-07-26T16:10:00",
  },

  {
    id: "EARN-S-001",

    merchantRole:
      "services_merchant",

    referenceId:
      "SB-10001",

    grossAmount: 4150,

    commissionPercent: 15,

    commissionAmount: 622.5,

    refundAmount: 0,

    netAmount: 3527.5,

    currency: "PKR",

    status: "settled",

    createdAt:
      "2026-07-26T17:15:00",
  },

  {
    id: "EARN-S-002",

    merchantRole:
      "services_merchant",

    referenceId:
      "SB-10002",

    grossAmount: 7200,

    commissionPercent: 15,

    commissionAmount: 1080,

    refundAmount: 500,

    netAmount: 5620,

    currency: "PKR",

    status: "pending",

    createdAt:
      "2026-07-27T09:20:00",
  },
];

export const dummyMerchantPayouts: MerchantPayoutEntry[] = [
  {
    id: "MPAY-F-001",

    merchantRole:
      "food_merchant",

    amount: 58400,

    currency: "PKR",

    bankName:
      "Meezan Bank",

    accountMasked:
      "**** 1245",

    status: "paid",

    requestedAt:
      "2026-07-22T10:00:00",

    processedAt:
      "2026-07-23T15:30:00",
  },

  {
    id: "MPAY-F-002",

    merchantRole:
      "food_merchant",

    amount: 32450,

    currency: "PKR",

    bankName:
      "Meezan Bank",

    accountMasked:
      "**** 1245",

    status: "pending",

    requestedAt:
      "2026-07-27T10:30:00",
  },

  {
    id: "MPAY-G-001",

    merchantRole:
      "grocery_merchant",

    amount: 72900,

    currency: "PKR",

    bankName: "HBL",

    accountMasked:
      "**** 9832",

    status: "paid",

    requestedAt:
      "2026-07-23T11:00:00",

    processedAt:
      "2026-07-24T13:00:00",
  },

  {
    id: "MPAY-P-001",

    merchantRole:
      "pharmacy_merchant",

    amount: 42800,

    currency: "PKR",

    bankName:
      "Bank Alfalah",

    accountMasked:
      "**** 6642",

    status: "processing",

    requestedAt:
      "2026-07-26T09:00:00",
  },

  {
    id: "MPAY-S-001",

    merchantRole:
      "services_merchant",

    amount: 61650,

    currency: "PKR",

    bankName: "UBL",

    accountMasked:
      "**** 7739",

    status: "pending",

    requestedAt:
      "2026-07-27T08:30:00",
  },
];