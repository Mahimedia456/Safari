export type FinanceRegion =
  | "Pakistan"
  | "Germany";

export type FinanceCurrency =
  | "PKR"
  | "EUR";

export type FinanceModule =
  | "ride"
  | "food"
  | "grocery"
  | "pharmacy"
  | "services"
  | "wallet";

export type TransactionType =
  | "payment"
  | "refund"
  | "commission"
  | "payout"
  | "wallet_credit"
  | "wallet_debit";

export type TransactionStatus =
  | "pending"
  | "processing"
  | "completed"
  | "failed"
  | "refunded";

export interface FinanceTransaction {
  id: string;

  region: FinanceRegion;
  currency: FinanceCurrency;

  module: FinanceModule;
  type: TransactionType;

  referenceId: string;

  customerName?: string;
  partnerName?: string;

  grossAmount: number;
  commissionAmount: number;
  partnerAmount: number;

  paymentMethod:
    | "cash"
    | "card"
    | "wallet"
    | "bank";

  status: TransactionStatus;

  createdAt: string;
}

export type CommissionPartnerType =
  | "driver"
  | "food_merchant"
  | "grocery_merchant"
  | "pharmacy_merchant"
  | "services_merchant";

export interface CommissionRecord {
  id: string;

  region: FinanceRegion;
  currency: FinanceCurrency;

  partnerId: string;
  partnerName: string;

  partnerType:
    CommissionPartnerType;

  referenceId: string;

  grossAmount: number;

  commissionPercent: number;
  commissionAmount: number;

  partnerNetAmount: number;

  createdAt: string;
}

export type PayoutRecipientType =
  | "driver"
  | "merchant";

export type PayoutStatus =
  | "pending"
  | "approved"
  | "processing"
  | "paid"
  | "rejected";

export interface FinancePayout {
  id: string;

  region: FinanceRegion;
  currency: FinanceCurrency;

  recipientId: string;
  recipientName: string;

  recipientType:
    PayoutRecipientType;

  amount: number;

  bankName: string;
  accountMasked: string;

  status: PayoutStatus;

  requestedAt: string;
  processedAt?: string;
}

export type FinanceRefundStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "processed";

export interface FinanceRefund {
  id: string;

  region: FinanceRegion;
  currency: FinanceCurrency;

  module: FinanceModule;

  referenceId: string;
  transactionId: string;

  customerName: string;

  amount: number;
  reason: string;

  status:
    FinanceRefundStatus;

  createdAt: string;
}

export interface WalletLedgerEntry {
  id: string;

  region: FinanceRegion;
  currency: FinanceCurrency;

  ownerId: string;
  ownerName: string;

  ownerType:
    | "passenger"
    | "driver"
    | "merchant";

  direction:
    | "credit"
    | "debit";

  amount: number;

  description: string;

  balanceAfter: number;

  createdAt: string;
}

export interface SettlementRecord {
  id: string;

  region: FinanceRegion;
  currency: FinanceCurrency;

  period: string;

  partnerType:
    | "drivers"
    | "merchants";

  grossVolume: number;

  commission: number;

  refunds: number;

  payoutAmount: number;

  status:
    | "open"
    | "closed";

  createdAt: string;
}