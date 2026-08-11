import {
  getRewardsPermissions,
} from "../../config/rewardsPermissions";

import {
  useAuthStore,
} from "../../store/authStore";

import {
  useRewardsStore,
} from "../../store/rewardsStore";

export default function RewardRedemptionPage() {
  const user = useAuthStore((state) => state.user);

  const settings = useRewardsStore(
    (state) => state.redemption,
  );

  const update = useRewardsStore(
    (state) => state.updateRedemption,
  );

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
          Redemption Rules
        </h1>
      </div>

      <section className="safari-card p-6">
        <div className="grid gap-5 md:grid-cols-2">
          <Field
            label="Points per currency unit"
            value={settings.pointsPerCurrencyUnit}
            disabled={!permissions.editRedemption}
            onChange={(value) =>
              update({
                pointsPerCurrencyUnit: value,
              })
            }
          />

          <Field
            label="Minimum redemption points"
            value={settings.minimumPoints}
            disabled={!permissions.editRedemption}
            onChange={(value) =>
              update({
                minimumPoints: value,
              })
            }
          />

          <Field
            label="Maximum % of order"
            value={settings.maximumPercentOfOrder}
            disabled={!permissions.editRedemption}
            onChange={(value) =>
              update({
                maximumPercentOfOrder: value,
              })
            }
          />

          <Field
            label="Points expiry days"
            value={settings.expiryDays}
            disabled={!permissions.editRedemption}
            onChange={(value) =>
              update({
                expiryDays: value,
              })
            }
          />
        </div>

        <label className="mt-5 flex items-center gap-3 text-sm font-semibold text-slate-700 dark:text-slate-300">
          <input
            type="checkbox"
            checked={settings.enabled}
            disabled={!permissions.editRedemption}
            onChange={(event) =>
              update({
                enabled: event.target.checked,
              })
            }
          />

          Enable points redemption
        </label>
      </section>
    </div>
  );
}

function Field({
  label,
  value,
  disabled,
  onChange,
}: {
  label: string;
  value: number;
  disabled: boolean;
  onChange: (value: number) => void;
}) {
  return (
    <label>
      <span className="text-xs font-semibold text-slate-500">
        {label}
      </span>

      <input
        type="number"
        min="0"
        value={value}
        disabled={disabled}
        onChange={(event) =>
          onChange(Number(event.target.value))
        }
        className="safari-input mt-2"
      />
    </label>
  );
}