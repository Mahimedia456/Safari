import {
  Gift,
} from "lucide-react";

import {
  usePricingStore,
} from "../../store/pricingStore";

import type {
  PricingRegion,
} from "../../types/pricing";

export default function FreeRideProgramPanel({
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
            Free Ride Program
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Driver ki first eligible
            monthly rides par commission
            control.
          </p>
        </div>

        <Gift className="text-safari-600" />
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <label>
          <span className="text-xs font-semibold text-slate-500">
            Monthly free rides
          </span>

          <input
            type="number"
            min="0"
            value={
              settings.monthlyFreeRideCount
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
                  monthlyFreeRideCount:
                    Number(
                      event
                        .target
                        .value,
                    ),
                },
              )
            }
            className="safari-input mt-2"
          />
        </label>

        <label>
          <span className="text-xs font-semibold text-slate-500">
            Free ride commission %
          </span>

          <input
            type="number"
            min="0"
            max="100"
            value={
              settings.freeRideCommissionPercent
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
                  freeRideCommissionPercent:
                    Number(
                      event
                        .target
                        .value,
                    ),
                },
              )
            }
            className="safari-input mt-2"
          />
        </label>

        <label>
          <span className="text-xs font-semibold text-slate-500">
            After quota %
          </span>

          <input
            type="number"
            min="0"
            max="100"
            value={
              settings.commissionAfterFreeQuotaPercent
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
                  commissionAfterFreeQuotaPercent:
                    Number(
                      event
                        .target
                        .value,
                    ),
                },
              )
            }
            className="safari-input mt-2"
          />
        </label>

        <label>
          <span className="text-xs font-semibold text-slate-500">
            Monthly reset day
          </span>

          <input
            type="number"
            min="1"
            max="28"
            value={
              settings.resetDay
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
                  resetDay:
                    Number(
                      event
                        .target
                        .value,
                    ),
                },
              )
            }
            className="safari-input mt-2"
          />
        </label>
      </div>

      <label className="mt-5 flex items-center gap-3">
        <input
          type="checkbox"
          checked={
            settings.freeRideProgramEnabled
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
                freeRideProgramEnabled:
                  event.target
                    .checked,
              },
            )
          }
        />

        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
          Enable monthly free ride
          program
        </span>
      </label>
    </section>
  );
}