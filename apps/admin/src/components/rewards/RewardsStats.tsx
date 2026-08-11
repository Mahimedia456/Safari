import {
  BadgePercent,
  Gift,
  Sparkles,
  Users,
} from "lucide-react";

import type {
  PassengerRewardAccount,
  RewardCampaign,
} from "../../types/rewards";

export default function RewardsStats({
  passengers,
  campaigns,
}: {
  passengers: PassengerRewardAccount[];
  campaigns: RewardCampaign[];
}) {
  const points = passengers.reduce(
    (sum, passenger) => sum + passenger.availablePoints,
    0,
  );

  const earned = passengers.reduce(
    (sum, passenger) => sum + passenger.lifetimeEarned,
    0,
  );

  const activeCampaigns = campaigns.filter(
    (campaign) => campaign.active,
  ).length;

  const stats = [
    {
      label: "Reward Members",
      value: passengers.length,
      icon: Users,
    },
    {
      label: "Available Points",
      value: points.toLocaleString(),
      icon: Gift,
    },
    {
      label: "Lifetime Earned",
      value: earned.toLocaleString(),
      icon: Sparkles,
    },
    {
      label: "Active Campaigns",
      value: activeCampaigns,
      icon: BadgePercent,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.label}
            className="safari-card p-5"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-safari-50 text-safari-600 dark:bg-safari-500/10 dark:text-safari-400">
              <Icon size={19} />
            </div>

            <div className="mt-5 text-2xl font-bold text-slate-950 dark:text-white">
              {stat.value}
            </div>

            <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {stat.label}
            </div>
          </div>
        );
      })}
    </div>
  );
}