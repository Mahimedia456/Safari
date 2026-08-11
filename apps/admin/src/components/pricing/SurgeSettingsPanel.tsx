import {
  Activity,
} from "lucide-react";

import {
  usePricingStore,
} from "../../store/pricingStore";

import type {
  PricingRegion,
} from "../../types/pricing";

export default function SurgeSettingsPanel({
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
        state.surgeSettings.find(
          (item) =>
            item.region ===
            region,
        ),
    );

  const update =
    usePricingStore(
      (state) =>
        state.updateSurgeSettings,
    );

  if (!settings) {
    return null;
  }

  return (
    <section className="safari-card p-6">
      <div className="flex justify-between gap-4">
        <div>
          <div className="text-sm font-semibold text-safari-600 dark:text-safari-400">
            {region}
          </div>

          <h2 className="mt-1 text-xl font-bold text-slate-950 dark:text-white">
            Surge Pricing
          </h2>
        </div>

        <Activity className="text-safari-600" />
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <NumberInput
          label="Minimum multiplier"
          value={
            settings.minimumMultiplier
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
                minimumMultiplier:
                  value,
              },
            )
          }
        />

        <NumberInput
          label="Maximum multiplier"
          value={
            settings.maximumMultiplier
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
                maximumMultiplier:
                  value,
              },
            )
          }
        />

        <NumberInput
          label="Demand threshold"
          value={
            settings.demandThreshold
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
                demandThreshold:
                  value,
              },
            )
          }
        />

        <NumberInput
          label="Driver supply threshold"
          value={
            settings.driverSupplyThreshold
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
                driverSupplyThreshold:
                  value,
              },
            )
          }
        />

        <NumberInput
          label="Manual multiplier"
          value={
            settings.manualMultiplier
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
                manualMultiplier:
                  value,
              },
            )
          }
        />
      </div>

      <div className="mt-5 flex flex-wrap gap-6">
        <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
          <input
            type="checkbox"
            checked={
              settings.enabled
            }
            disabled={
              !canEdit
            }
            onChange={(
              event,
            ) =>
              update(
                region,
                {
                  enabled:
                    event.target
                      .checked,
                },
              )
            }
          />

          Surge enabled
        </label>

        <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
          <input
            type="checkbox"
            checked={
              settings.manualOverride
            }
            disabled={
              !canEdit
            }
            onChange={(
              event,
            ) =>
              update(
                region,
                {
                  manualOverride:
                    event.target
                      .checked,
                },
              )
            }
          />

          Manual override
        </label>
      </div>
    </section>
  );
}

function NumberInput({
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