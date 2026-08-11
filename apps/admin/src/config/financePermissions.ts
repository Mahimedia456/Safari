import type {
  AccountRole,
} from "../types/auth";

export interface FinancePermissions {
  view: boolean;

  viewTransactions: boolean;
  viewRevenue: boolean;

  manageCommissions: boolean;

  viewPayouts: boolean;
  managePayouts: boolean;

  viewRefunds: boolean;
  manageRefunds: boolean;

  viewWalletLedger: boolean;

  manageSettlements: boolean;
}

export function getFinancePermissions(
  role: AccountRole,
): FinancePermissions {
  switch (role) {
    case "super_admin":
    case "admin":
      return {
        view: true,

        viewTransactions: true,
        viewRevenue: true,

        manageCommissions: true,

        viewPayouts: true,
        managePayouts: true,

        viewRefunds: true,
        manageRefunds: true,

        viewWalletLedger: true,

        manageSettlements: true,
      };

    case "finance_manager":
      return {
        view: true,

        viewTransactions: true,
        viewRevenue: true,

        manageCommissions: true,

        viewPayouts: true,
        managePayouts: true,

        viewRefunds: true,
        manageRefunds: true,

        viewWalletLedger: true,

        manageSettlements: true,
      };

    case "operations_manager":
      return {
        view: true,

        viewTransactions: true,
        viewRevenue: true,

        manageCommissions: false,

        viewPayouts: true,
        managePayouts: false,

        viewRefunds: true,
        manageRefunds: false,

        viewWalletLedger: false,

        manageSettlements: false,
      };

    case "support":
      return {
        view: false,

        viewTransactions: true,
        viewRevenue: false,

        manageCommissions: false,

        viewPayouts: false,
        managePayouts: false,

        viewRefunds: true,
        manageRefunds: false,

        viewWalletLedger: false,

        manageSettlements: false,
      };

    default:
      return {
        view: false,

        viewTransactions: false,
        viewRevenue: false,

        manageCommissions: false,

        viewPayouts: false,
        managePayouts: false,

        viewRefunds: false,
        manageRefunds: false,

        viewWalletLedger: false,

        manageSettlements: false,
      };
  }
}