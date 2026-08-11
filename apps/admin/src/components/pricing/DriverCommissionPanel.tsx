import {
  Percent,
} from "lucide-react";

import {
  usePricingStore,
} from "../../store/pricingStore";

import type {
  PricingRegion,
} from "../../types/pricing";

export default function DriverCommissionPanel({
  region,
  canEdit,
}: {
  region:
    PricingRegion;

  canEdit: boolean;
}) {
  const settings =
    usePricingStore(
      (state) =>
        state.driverCommission.find(
          (item) =>
            item.region ===
            region,
        ),
    );

  const update =
    usePricingStore(
      (state) =>
        state.updateDriverCommission,
    );

  if (!settings) {
    return null;
  }

  return (
    <section className="safari-card p-6">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-sm font-semibold text-safari-600 dark:text-safari-400">
            {region}
          </div>

          <h2 className="mt-1 text-xl font-bold text-slate-950 dark:text-white">
            Driver Commission
          </h2>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-safari-50 text-safari-600 dark:bg-safari-500/10">
          <Percent size={18} />
        </div>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <Field
          label="Standard commission %"
          value={
            settings.standardCommissionPercent
          }
          disabled={
            !canEdit
          }
          onChange={(
            value,
          ) =>
            update(
              region,
              {
                standardCommissionPercent:
                  value,
              },
            )
          }
        />

        <Field
          label="Commission after free quota %"
          value={
            settings.commissionAfterFreeQuotaPercent
          }
          disabled={
            !canEdit
          }
          onChange={(
            value,
          ) =>
            update(
              region,
              {
                commissionAfterFreeQuotaPercent:
                  value,
              },
            )
          }
        />
      </div>
    </section>
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

  onChange: (
    value: number,
  ) => void;
}) {
  return (
    <label>
      <span className="text-xs font-semibold text-slate-500">
        {label}
      </span>

      <input
        type="number"
        min="0"
        max="100"
        step="0.1"
        value={value}
        disabled={disabled}
        onChange={(
          event,
        ) =>
          onChange(
            Number(
              event.target
                .value,
            ),
          )
        }
        className="safari-input mt-2"
      />
    </label>
  );
}