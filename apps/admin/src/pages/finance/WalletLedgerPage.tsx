import WalletLedgerTable from "../../components/finance/WalletLedgerTable";

import {
  useFinanceStore,
} from "../../store/financeStore";

export default function WalletLedgerPage() {
  const entries =
    useFinanceStore(
      (state) =>
        state.walletLedger,
    );

  return (
    <div>
      <div className="mb-7">
        <div className="text-sm font-semibold text-safari-600">
          Safari Wallet
        </div>

        <h1 className="mt-1 text-3xl font-bold text-slate-950 dark:text-white">
          Wallet Ledger
        </h1>
      </div>

      <WalletLedgerTable
        entries={entries}
      />
    </div>
  );
}