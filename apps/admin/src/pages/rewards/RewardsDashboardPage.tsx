import {
  Link,
} from "react-router-dom";

import RewardsStats from "../../components/rewards/RewardsStats";

import {
  useRewardsStore,
} from "../../store/rewardsStore";

export default function RewardsDashboardPage() {
  const passengers = useRewardsStore(
    (state) => state.passengerRewards,
  );

  const campaigns = useRewardsStore(
    (state) => state.campaigns,
  );

  return (
    <div>
      <div className="mb-7">
        <div className="text-sm font-semibold text-safari-600 dark:text-safari-400">
          Safari Rewards
        </div>

        <h1 className="mt-1 text-3xl font-bold text-slate-950 dark:text-white">
          Rewards & Points
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Control earning, redemption,
          referrals and loyalty campaigns.
        </p>
      </div>

      <RewardsStats
        passengers={passengers}
        campaigns={campaigns}
      />

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          ["Earning Rules", "/rewards/rules"],
          ["Redemption", "/rewards/redemption"],
          ["Referrals", "/rewards/referrals"],
          ["Campaigns", "/rewards/campaigns"],
          ["Passenger Points", "/rewards/passengers"],
          ["Points Ledger", "/rewards/ledger"],
          ["Manual Adjustment", "/rewards/adjustments"],
        ].map(([label, path]) => (
          <Link
            key={path}
            to={path}
            className="safari-card p-5 transition hover:-translate-y-0.5"
          >
            <div className="font-semibold text-slate-900 dark:text-white">
              {label}
            </div>

            <div className="mt-2 text-sm font-semibold text-safari-600">
              Manage →
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}