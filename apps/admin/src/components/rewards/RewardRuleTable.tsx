import { useRewardsStore } from "../../store/rewardsStore";

export default function RewardRuleTable({
  canManage,
}: {
  canManage: boolean;
}) {
  const rules = useRewardsStore((state) => state.rules);

  const updateRule = useRewardsStore(
    (state) => state.updateRule,
  );

  return (
    <div className="safari-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-slate-100 bg-slate-50/70 dark:border-white/[0.06] dark:bg-white/[0.02]">
            <tr>
              {[
                "Service",
                "Points Per Unit",
                "Multiplier",
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
            {rules.map((rule) => (
              <tr
                key={rule.id}
                className="border-b border-slate-100 last:border-0 dark:border-white/[0.05]"
              >
                <td className="px-5 py-4 font-semibold capitalize text-slate-900 dark:text-white">
                  {rule.service}
                </td>

                <td className="px-5 py-4">
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    disabled={!canManage}
                    value={rule.pointsPerUnit}
                    onChange={(event) =>
                      updateRule(rule.id, {
                        pointsPerUnit: Number(
                          event.target.value,
                        ),
                      })
                    }
                    className="safari-input w-28"
                  />
                </td>

                <td className="px-5 py-4">
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    disabled={!canManage}
                    value={rule.multiplier}
                    onChange={(event) =>
                      updateRule(rule.id, {
                        multiplier: Number(event.target.value),
                      })
                    }
                    className="safari-input w-28"
                  />
                </td>

                <td className="px-5 py-4">
                  <button
                    type="button"
                    disabled={!canManage}
                    onClick={() =>
                      updateRule(rule.id, {
                        enabled: !rule.enabled,
                      })
                    }
                    className={[
                      "rounded-full px-3 py-1 text-xs font-semibold",

                      rule.enabled
                        ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                        : "bg-slate-100 text-slate-500 dark:bg-white/[0.06]",
                    ].join(" ")}
                  >
                    {rule.enabled ? "Active" : "Disabled"}
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