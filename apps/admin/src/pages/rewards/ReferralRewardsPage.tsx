import {
  getRewardsPermissions,
} from "../../config/rewardsPermissions";

import {
  useAuthStore,
} from "../../store/authStore";

import {
  useRewardsStore,
} from "../../store/rewardsStore";

export default function ReferralRewardsPage() {
  const user = useAuthStore((state) => state.user);

  const settings = useRewardsStore(
    (state) => state.referral,
  );

  const update = useRewardsStore(
    (state) => state.updateReferral,
  );

  if (!user) {
    return null;
  }

  const permissions = getRewardsPermissions(user.role);

  return (
    <div>
      <div className="mb-7">
        <div className="text-sm font-semibold text-safari-600">
          Safari Referral Program
        </div>

        <h1 className="mt-1 text-3xl font-bold text-slate-950 dark:text-white">
          Referral Rewards
        </h1>
      </div>

      <section className="safari-card p-6">
        <div className="grid gap-5 md:grid-cols-3">
          <Field
            label="Referrer points"
            value={settings.referrerPoints}
            disabled={!permissions.editReferral}
            onChange={(value) =>
              update({
                referrerPoints: value,
              })
            }
          />

          <Field
            label="New passenger points"
            value={settings.referredPassengerPoints}
            disabled={!permissions.editReferral}
            onChange={(value) =>
              update({
                referredPassengerPoints: value,
              })
            }
          />

          <Field
            label="Minimum completed rides"
            value={settings.minimumCompletedRides}
            disabled={!permissions.editReferral}
            onChange={(value) =>
              update({
                minimumCompletedRides: value,
              })
            }
          />
        </div>

        <label className="mt-5 flex items-center gap-3 text-sm font-semibold text-slate-700 dark:text-slate-300">
          <input
            type="checkbox"
            checked={settings.enabled}
            disabled={!permissions.editReferral}
            onChange={(event) =>
              update({
                enabled: event.target.checked,
              })
            }
          />

          Enable referral rewards
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