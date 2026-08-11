import RewardLedgerTable from "../../components/rewards/RewardLedgerTable";

import {
  useRewardsStore,
} from "../../store/rewardsStore";

export default function RewardLedgerPage() {
  const entries =
    useRewardsStore(
      (state) =>
        state.ledgerEntries,
    );

  return (
    <div>
      <div className="mb-7">
        <div className="text-sm font-semibold text-safari-600 dark:text-safari-400">
          Safari Rewards
        </div>

        <h1 className="mt-1 text-3xl font-bold text-slate-950 dark:text-white">
          Reward Ledger
        </h1>

        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Complete passenger reward
          earning, redemption, bonus
          and adjustment activity.
        </p>
      </div>

      <RewardLedgerTable
        entries={entries}
      />
    </div>
  );
}