import { useRewardsStore } from "../../store/rewardsStore";

export default function RewardCampaignTable({
  canManage,
}: {
  canManage: boolean;
}) {
  const campaigns = useRewardsStore(
    (state) => state.campaigns,
  );

  const toggleCampaign = useRewardsStore(
    (state) => state.toggleCampaign,
  );

  return (
    <div className="safari-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-slate-100 bg-slate-50/70 dark:border-white/[0.06] dark:bg-white/[0.02]">
            <tr>
              {[
                "Campaign",
                "Service",
                "Bonus",
                "Period",
                "Status",
              ].map((label) => (
                <th
                  key={label}
                  className="px-5 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400"
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {campaigns.map((campaign) => (
              <tr
                key={campaign.id}
                className="border-b border-slate-100 last:border-0 dark:border-white/[0.05]"
              >
                <td className="px-5 py-4">
                  <div className="font-semibold text-slate-900 dark:text-white">
                    {campaign.title}
                  </div>

                  <div className="mt-1 text-xs text-slate-400">
                    {campaign.description}
                  </div>
                </td>

                <td className="px-5 py-4 text-sm capitalize text-slate-500">
                  {campaign.service}
                </td>

                <td className="px-5 py-4 font-semibold text-safari-600 dark:text-safari-400">
                  {campaign.bonusMultiplier}x
                </td>

                <td className="px-5 py-4 text-xs text-slate-400">
                  {campaign.startDate}
                  {" → "}
                  {campaign.endDate}
                </td>

                <td className="px-5 py-4">
                  <button
                    type="button"
                    disabled={!canManage}
                    onClick={() =>
                      toggleCampaign(campaign.id)
                    }
                    className={[
                      "rounded-full px-3 py-1 text-xs font-semibold",

                      campaign.active
                        ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                        : "bg-slate-100 text-slate-500 dark:bg-white/[0.06]",
                    ].join(" ")}
                  >
                    {campaign.active ? "Active" : "Inactive"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}