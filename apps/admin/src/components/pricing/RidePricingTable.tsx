import {
  usePricingStore,
} from "../../store/pricingStore";

import type {
  PricingRegion,
  RidePricingRule,
} from "../../types/pricing";

type Props = {
  region:
    PricingRegion;

  canEdit: boolean;
};

const numericFields: Array<{
  key:
    keyof Pick<
      RidePricingRule,
      | "baseFare"
      | "minimumFare"
      | "perKm"
      | "perMinute"
      | "bookingFee"
      | "waitingPerMinute"
      | "freeWaitingMinutes"
      | "cancellationFee"
    >;

  label: string;
}> = [
  {
    key: "baseFare",
    label: "Base",
  },
  {
    key: "minimumFare",
    label: "Minimum",
  },
  {
    key: "perKm",
    label: "Per KM",
  },
  {
    key: "perMinute",
    label: "Per Min",
  },
  {
    key: "bookingFee",
    label: "Booking",
  },
  {
    key: "waitingPerMinute",
    label: "Waiting",
  },
  {
    key: "freeWaitingMinutes",
    label: "Free Wait",
  },
  {
    key: "cancellationFee",
    label: "Cancel Fee",
  },
];

export default function RidePricingTable({
  region,
  canEdit,
}: Props) {
  const pricing =
    usePricingStore(
      (state) =>
        state.pricingRules,
    );

  const update =
    usePricingStore(
      (state) =>
        state.updatePricingRule,
    );

  const toggle =
    usePricingStore(
      (state) =>
        state.togglePricingRule,
    );

  const rows =
    pricing.filter(
      (item) =>
        item.region ===
        region,
    );

  return (
    <div className="safari-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-[1250px] w-full">
          <thead className="border-b border-slate-100 bg-slate-50/70 dark:border-white/[0.06] dark:bg-white/[0.02]">
            <tr>
              <th className="px-5 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Ride Type
              </th>

              {numericFields.map(
                (field) => (
                  <th
                    key={
                      field.key
                    }
                    className="px-3 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400"
                  >
                    {field.label}
                  </th>
                ),
              )}

              <th className="px-5 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {rows.map(
              (rule) => (
                <tr
                  key={
                    rule.id
                  }
                  className="border-b border-slate-100 last:border-0 dark:border-white/[0.05]"
                >
                  <td className="px-5 py-4">
                    <div className="font-semibold capitalize text-slate-900 dark:text-white">
                      {
                        rule.rideType
                      }
                    </div>

                    <div className="mt-1 text-xs text-slate-400">
                      {
                        rule.currency
                      }
                    </div>
                  </td>

                  {numericFields.map(
                    (field) => (
                      <td
                        key={
                          field.key
                        }
                        className="px-3 py-4"
                      >
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          disabled={
                            !canEdit
                          }
                          value={
                            rule[
                              field.key
                            ]
                          }
                          onChange={(
                            event,
                          ) =>
                            update(
                              rule.id,
                              {
                                [field.key]:
                                  Number(
                                    event
                                      .target
                                      .value,
                                  ),
                              },
                            )
                          }
                          className="w-24 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-safari-500 dark:border-white/10 dark:bg-[#151719] dark:text-white"
                        />
                      </td>
                    ),
                  )}

                  <td className="px-5 py-4">
                    <button
                      type="button"
                      disabled={
                        !canEdit
                      }
                      onClick={() =>
                        toggle(
                          rule.id,
                        )
                      }
                      className={[
                        "rounded-full px-3 py-1 text-xs font-semibold",

                        rule.enabled
                          ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                          : "bg-slate-100 text-slate-500 dark:bg-white/[0.06]",
                      ].join(" ")}
                    >
                      {rule.enabled
                        ? "Active"
                        : "Disabled"}
                    </button>
                  </td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}