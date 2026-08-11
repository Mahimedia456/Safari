import {
  create,
} from "zustand";

import {
  dummyCommissionRecords,
  dummyFinancePayouts,
  dummyFinanceRefunds,
  dummyFinanceTransactions,
  dummySettlements,
  dummyWalletLedger,
} from "../data/finance";

import type {
  CommissionRecord,
  FinancePayout,
  FinanceRefund,
  FinanceRefundStatus,
  FinanceTransaction,
  PayoutStatus,
  SettlementRecord,
  WalletLedgerEntry,
} from "../types/finance";

interface FinanceState {
  transactions:
    FinanceTransaction[];

  commissions:
    CommissionRecord[];

  payouts:
    FinancePayout[];

  refunds:
    FinanceRefund[];

  walletLedger:
    WalletLedgerEntry[];

  settlements:
    SettlementRecord[];

  setPayoutStatus: (
    payoutId: string,
    status: PayoutStatus,
  ) => void;

  setRefundStatus: (
    refundId: string,
    status: FinanceRefundStatus,
  ) => void;

  toggleSettlement: (
    settlementId: string,
  ) => void;
}

export const useFinanceStore =
  create<FinanceState>(
    (set) => ({
      transactions:
        dummyFinanceTransactions,

      commissions:
        dummyCommissionRecords,

      payouts:
        dummyFinancePayouts,

      refunds:
        dummyFinanceRefunds,

      walletLedger:
        dummyWalletLedger,

      settlements:
        dummySettlements,

      setPayoutStatus: (
        payoutId,
        status,
      ) => {
        set((state) => ({
          payouts:
            state.payouts.map(
              (payout) =>
                payout.id ===
                payoutId
                  ? {
                      ...payout,

                      status,

                      processedAt:
                        status ===
                        "paid"
                          ? new Date().toISOString()
                          : payout.processedAt,
                    }
                  : payout,
            ),
        }));
      },

      setRefundStatus: (
        refundId,
        status,
      ) => {
        set((state) => ({
          refunds:
            state.refunds.map(
              (refund) =>
                refund.id ===
                refundId
                  ? {
                      ...refund,
                      status,
                    }
                  : refund,
            ),
        }));
      },

      toggleSettlement: (
        settlementId,
      ) => {
        set((state) => ({
          settlements:
            state.settlements.map(
              (settlement) =>
                settlement.id ===
                settlementId
                  ? {
                      ...settlement,

                      status:
                        settlement.status ===
                        "open"
                          ? "closed"
                          : "open",
                    }
                  : settlement,
            ),
        }));
      },
    }),
  );