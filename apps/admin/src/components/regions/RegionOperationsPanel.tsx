import {
  useRegionStore,
} from "../../store/regionStore";

import type {
  RegionOperations,
  SafariRegion,
} from "../../types/region";

type BooleanKey = keyof RegionOperations;

const options: Array<{
  key: BooleanKey;

  label: string;
}> = [
  {
    key:
      "passengerRegistrationEnabled",

    label:
      "Passenger Registration",
  },

  {
    key:
      "driverRegistrationEnabled",

    label:
      "Driver Registration",
  },

  {
    key:
      "merchantRegistrationEnabled",

    label:
      "Merchant Registration",
  },

  {
    key:
      "rideBookingEnabled",

    label:
      "Ride Booking",
  },

  {
    key:
      "scheduledRidesEnabled",

    label:
      "Scheduled Rides",
  },

  {
    key:
      "cashPaymentsEnabled",

    label:
      "Cash Payments",
  },

  {
    key:
      "cardPaymentsEnabled",

    label:
      "Card Payments",
  },

  {
    key:
      "walletPaymentsEnabled",

    label:
      "Wallet Payments",
  },
];

export default function RegionOperationsPanel({
  region,
  canEdit,
}: {
  region: SafariRegion;

  canEdit: boolean;
}) {
  const update =
    useRegionStore(
      (state) =>
        state.updateOperations,
    );

  return (
    <section className="safari-card p-6">
      <div>
        <div className="text-sm font-semibold text-safari-600">
          {region.flagEmoji}{" "}
          {region.name}
        </div>

        <h2 className="mt-1 text-xl font-bold text-slate-950 dark:text-white">
          Operational Controls
        </h2>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {options.map(
          (option) => {
            const active =
              region.operations[
                option.key
              ];

            return (
              <div
                key={option.key}
                className="flex items-center justify-between rounded-xl border border-slate-100 p-4 dark:border-white/[0.06]"
              >
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  {option.label}
                </span>

                <button
                  type="button"
                  disabled={
                    !canEdit
                  }
                  onClick={() =>
                    update(
                      region.id,
                      {
                        [option.key]:
                          !active,
                      },
                    )
                  }
                  className={[
                    "rounded-full px-3 py-1 text-xs font-semibold",

                    active
                      ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                      : "bg-slate-100 text-slate-500 dark:bg-white/[0.06]",

                    !canEdit
                      ? "cursor-default opacity-70"
                      : "",
                  ].join(" ")}
                >
                  {active
                    ? "Enabled"
                    : "Disabled"}
                </button>
              </div>
            );
          },
        )}
      </div>
    </section>
  );
}