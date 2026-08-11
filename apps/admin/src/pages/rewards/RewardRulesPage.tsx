import RewardRuleTable from "../../components/rewards/RewardRuleTable";

import {
  getRewardsPermissions,
} from "../../config/rewardsPermissions";

import {
  useAuthStore,
} from "../../store/authStore";

export default function RewardRulesPage() {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return null;
  }

  const permissions = getRewardsPermissions(user.role);

  return (
    <div>
      <div className="mb-7">
        <div className="text-sm font-semibold text-safari-600">
          Safari Rewards
        </div>

        <h1 className="mt-1 text-3xl font-bold text-slate-950 dark:text-white">
          Earning Rules
        </h1>
      </div>

      <RewardRuleTable
        canManage={permissions.editRules}
      />
    </div>
  );
}