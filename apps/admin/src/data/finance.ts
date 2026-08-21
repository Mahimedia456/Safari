import type {
  CommissionRecord,
  FinancePayout,
  FinanceRefund,
  FinanceTransaction,
  SettlementRecord,
  WalletLedgerEntry,
} from "../types/finance";

export const dummyFinanceTransactions: FinanceTransaction[] = [
  {
    id: "TXN-10001",

    region: "Pakistan",
    currency: "PKR",

    module: "ride",
    type: "payment",

    referenceId: "RIDE-10001",

    customerName: "Ahmed Khan",
    partnerName: "Muhammad Bilal",

    grossAmount: 1000,

    commissionAmount: 180,
    partnerAmount: 820,

    paymentMethod: "cash",

    status: "completed",

    createdAt:
      "2026-07-26T12:30:00",
  },

  {
    id: "TXN-10002",

    region: "Pakistan",
    currency: "PKR",

    module: "food",
    type: "payment",

    referenceId: "FOOD-5011",

    customerName: "Sara Ali",
    partnerName: "Burger Junction",

    grossAmount: 2850,

    commissionAmount: 427.5,
    partnerAmount: 2422.5,

    paymentMethod: "card",

    status: "completed",

    createdAt:
      "2026-07-26T13:40:00",
  },

  {
    id: "TXN-10003",

    region: "Pakistan",
    currency: "PKR",

    module: "grocery",
    type: "payment",

    referenceId: "GRO-4412",

    customerName: "Ayesha Noor",
    partnerName: "Fresh Mart",

    grossAmount: 6250,

    commissionAmount: 625,
    partnerAmount: 5625,

    paymentMethod: "wallet",

    status: "completed",

    createdAt:
      "2026-07-26T14:15:00",
  },

  {
    id: "TXN-10004",

    region: "Pakistan",
    currency: "PKR",

    module: "ride",
    type: "payment",

    referenceId: "RIDE-10031",

    customerName: "Daniel Weber",
    partnerName: "Jonas Weber",

    grossAmount: 48,

    commissionAmount: 9.6,
    partnerAmount: 38.4,

    paymentMethod: "card",

    status: "completed",

    createdAt:
      "2026-07-26T15:20:00",
  },

  {
    id: "TXN-10005",

    region: "Pakistan",
    currency: "PKR",

    module: "pharmacy",
    type: "payment",

    referenceId: "PHA-9002",

    customerName: "Ahmed Khan",
    partnerName: "Health Plus Pharmacy",

    grossAmount: 3400,

    commissionAmount: 340,
    partnerAmount: 3060,

    paymentMethod: "card",

    status: "completed",

    createdAt:
      "2026-07-26T16:10:00",
  },

  {
    id: "TXN-10006",

    region: "Pakistan",
    currency: "PKR",

    module: "services",
    type: "payment",

    referenceId: "SB-10001",

    customerName: "Areeba Khan",
    partnerName: "Sparkle Home Services",

    grossAmount: 4150,

    commissionAmount: 622.5,
    partnerAmount: 3527.5,

    paymentMethod: "card",

    status: "completed",

    createdAt:
      "2026-07-26T17:15:00",
  },
];

export const dummyCommissionRecords: CommissionRecord[] = [
  {
    id: "COM-1001",

    region: "Pakistan",
    currency: "PKR",

    partnerId: "DRV-1001",
    partnerName: "Muhammad Bilal",

    partnerType: "driver",

    referenceId: "RIDE-10001",

    grossAmount: 1000,

    commissionPercent: 18,

    commissionAmount: 180,

    partnerNetAmount: 820,

    createdAt:
      "2026-07-26T12:30:00",
  },

  {
    id: "COM-1002",

    region: "Pakistan",
    currency: "PKR",

    partnerId: "MER-FOOD-1",
    partnerName: "Burger Junction",

    partnerType: "food_merchant",

    referenceId: "FOOD-5011",

    grossAmount: 2850,

    commissionPercent: 15,

    commissionAmount: 427.5,

    partnerNetAmount: 2422.5,

    createdAt:
      "2026-07-26T13:40:00",
  },

  {
    id: "COM-1003",

    region: "Pakistan",
    currency: "PKR",

    partnerId: "MER-GRO-1",
    partnerName: "Fresh Mart",

    partnerType:
      "grocery_merchant",

    referenceId: "GRO-4412",

    grossAmount: 6250,

    commissionPercent: 10,

    commissionAmount: 625,

    partnerNetAmount: 5625,

    createdAt:
      "2026-07-26T14:15:00",
  },

  {
    id: "COM-1004",

    region: "Pakistan",
    currency: "PKR",

    partnerId: "MER-PHA-1",
    partnerName:
      "Health Plus Pharmacy",

    partnerType:
      "pharmacy_merchant",

    referenceId: "PHA-9002",

    grossAmount: 3400,

    commissionPercent: 10,

    commissionAmount: 340,

    partnerNetAmount: 3060,

    createdAt:
      "2026-07-26T16:10:00",
  },

  {
    id: "COM-1005",

    region: "Pakistan",
    currency: "PKR",

    partnerId: "MER-SER-1",
    partnerName:
      "Sparkle Home Services",

    partnerType:
      "services_merchant",

    referenceId: "SB-10001",

    grossAmount: 4150,

    commissionPercent: 15,

    commissionAmount: 622.5,

    partnerNetAmount: 3527.5,

    createdAt:
      "2026-07-26T17:15:00",
  },
];

export const dummyFinancePayouts: FinancePayout[] = [
  {
    id: "PAY-DRV-1001",

    region: "Pakistan",
    currency: "PKR",

    recipientId: "DRV-1001",
    recipientName: "Muhammad Bilal",

    recipientType: "driver",

    amount: 18500,

    bankName: "HBL",

    accountMasked: "**** 8921",

    status: "pending",

    requestedAt:
      "2026-07-26T09:00:00",
  },

  {
    id: "PAY-DRV-1002",

    region: "Pakistan",
    currency: "PKR",

    recipientId: "DRV-1003",
    recipientName: "Jonas Weber",

    recipientType: "driver",

    amount: 280,

    bankName: "N26",

    accountMasked: "**** 4412",

    status: "approved",

    requestedAt:
      "2026-07-26T08:15:00",
  },

  {
    id: "PAY-MER-1001",

    region: "Pakistan",
    currency: "PKR",

    recipientId: "MER-FOOD-1",
    recipientName: "Burger Junction",

    recipientType: "merchant",

    amount: 58400,

    bankName: "Meezan Bank",

    accountMasked: "**** 7712",

    status: "processing",

    requestedAt:
      "2026-07-25T16:20:00",
  },

  {
    id: "PAY-MER-1002",

    region: "Pakistan",
    currency: "PKR",

    recipientId: "MER-GRO-1",
    recipientName: "Fresh Mart",

    recipientType: "merchant",

    amount: 72900,

    bankName: "Bank Alfalah",

    accountMasked: "**** 1098",

    status: "paid",

    requestedAt:
      "2026-07-24T14:20:00",

    processedAt:
      "2026-07-25T11:30:00",
  },
];

export const dummyFinanceRefunds: FinanceRefund[] = [
  {
    id: "FREF-1001",

    region: "Pakistan",
    currency: "PKR",

    module: "ride",

    referenceId: "RIDE-10004",
    transactionId: "TXN-R-4401",

    customerName: "Hina Shah",

    amount: 120,

    reason:
      "Cancellation fee reversed by support.",

    status: "approved",

    createdAt:
      "2026-07-25T10:20:00",
  },

  {
    id: "FREF-1002",

    region: "Pakistan",
    currency: "PKR",

    module: "services",

    referenceId: "SB-10003",
    transactionId: "TXN-S-7781",

    customerName: "Sara Ahmed",

    amount: 500,

    reason:
      "Partial service issue.",

    status: "pending",

    createdAt:
      "2026-07-26T11:30:00",
  },
];

export const dummyWalletLedger: WalletLedgerEntry[] = [
  {
    id: "WL-1001",

    region: "Pakistan",
    currency: "PKR",

    ownerId: "PASS-1001",
    ownerName: "Ahmed Khan",

    ownerType: "passenger",

    direction: "credit",

    amount: 1000,

    description:
      "Wallet top-up",

    balanceAfter: 3250,

    createdAt:
      "2026-07-26T10:10:00",
  },

  {
    id: "WL-1002",

    region: "Pakistan",
    currency: "PKR",

    ownerId: "DRV-1001",
    ownerName: "Muhammad Bilal",

    ownerType: "driver",

    direction: "credit",

    amount: 820,

    description:
      "Ride earnings RIDE-10001",

    balanceAfter: 32640,

    createdAt:
      "2026-07-26T12:31:00",
  },

  {
    id: "WL-1003",

    region: "Pakistan",
    currency: "PKR",

    ownerId: "PASS-1003",
    ownerName: "Daniel Weber",

    ownerType: "passenger",

    direction: "debit",

    amount: 48,

    description:
      "Ride payment",

    balanceAfter: 48.5,

    createdAt:
      "2026-07-26T15:21:00",
  },
];

export const dummySettlements: SettlementRecord[] = [
  {
    id: "SET-2026-07-PK-DRV",

    region: "Pakistan",
    currency: "PKR",

    period: "July 2026",

    partnerType: "drivers",

    grossVolume: 928000,

    commission: 158400,

    refunds: 8300,

    payoutAmount: 761300,

    status: "open",

    createdAt:
      "2026-07-26T20:00:00",
  },

  {
    id: "SET-2026-07-PK-MER",

    region: "Pakistan",
    currency: "PKR",

    period: "July 2026",

    partnerType: "merchants",

    grossVolume: 1742000,

    commission: 218400,

    refunds: 28600,

    payoutAmount: 1495000,

    status: "open",

    createdAt:
      "2026-07-26T20:00:00",
  },

  {
    id: "SET-2026-07-DE-DRV",

    region: "Pakistan",
    currency: "PKR",

    period: "July 2026",

    partnerType: "drivers",

    grossVolume: 18450,

    commission: 3410,

    refunds: 220,

    payoutAmount: 14820,

    status: "open",

    createdAt:
      "2026-07-26T20:00:00",
  },
];