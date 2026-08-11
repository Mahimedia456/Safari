import {
  useState,
} from "react";

import {
  getPassengerPermissions,
} from "../../config/passengerPermissions";

import {
  useAuthStore,
} from "../../store/authStore";

import {
  usePassengerStore,
} from "../../store/passengerStore";

export default function PassengerWalletsPage() {
  const user =
    useAuthStore(
      (state) =>
        state.user,
    );

  const passengers =
    usePassengerStore(
      (state) =>
        state.passengers,
    );

  const adjust =
    usePassengerStore(
      (state) =>
        state.adjustWalletBalance,
    );

  const [
    amounts,
    setAmounts,
  ] = useState<
    Record<string, string>
  >({});

  if (!user) {
    return null;
  }

  const permissions =
    getPassengerPermissions(
      user.role,
    );

  return (
    <div>
      <div className="mb-7">
        <div className="text-sm font-semibold text-safari-600">
          Passenger Finance
        </div>

        <h1 className="mt-1 text-3xl font-bold text-slate-950 dark:text-white">
          Passenger Wallets
        </h1>
      </div>

      <div className="safari-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-slate-100 bg-slate-50/70 dark:border-white/[0.06] dark:bg-white/[0.02]">
              <tr>
                {[
                  "Passenger",
                  "Region",
                  "Balance",
                  "Total Spend",
                  "Refunds",
                  "Points",
                  "Adjustment",
                ].map(
                  (label) => (
                    <th
                      key={label}
                      className="px-5 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400"
                    >
                      {label}
                    </th>
                  ),
                )}
              </tr>
            </thead>

            <tbody>
              {passengers.map(
                (passenger) => {
                  const symbol =
                    passenger.region ===
                    "Germany"
                      ? "€"
                      : "Rs ";

                  return (
                    <tr
                      key={
                        passenger.id
                      }
                      className="border-b border-slate-100 last:border-0 dark:border-white/[0.05]"
                    >
                      <td className="px-5 py-4">
                        <div className="font-semibold text-slate-900 dark:text-white">
                          {
                            passenger.fullName
                          }
                        </div>

                        <div className="mt-1 text-xs text-slate-400">
                          {passenger.id}
                        </div>
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-500">
                        {
                          passenger.region
                        }
                      </td>

                      <td className="px-5 py-4 font-semibold text-slate-800 dark:text-slate-200">
                        {symbol}
                        {passenger.wallet.balance.toLocaleString()}
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-500">
                        {symbol}
                        {passenger.wallet.totalSpent.toLocaleString()}
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-500">
                        {symbol}
                        {passenger.wallet.refundsReceived.toLocaleString()}
                      </td>

                      <td className="px-5 py-4 text-sm font-semibold text-safari-600">
                        {
                          passenger.wallet.pointsBalance
                        }
                      </td>

                      <td className="px-5 py-4">
                        {permissions.adjustWallet ? (
                          <div className="flex min-w-[240px] gap-2">
                            <input
                              type="number"
                              value={
                                amounts[
                                  passenger.id
                                ] ?? ""
                              }
                              onChange={(
                                event,
                              ) =>
                                setAmounts(
                                  (
                                    current,
                                  ) => ({
                                    ...current,

                                    [passenger.id]:
                                      event
                                        .target
                                        .value,
                                  }),
                                )
                              }
                              placeholder="+ / -"
                              className="safari-input w-28"
                            />

                            <button
                              type="button"
                              onClick={() => {
                                const amount =
                                  Number(
                                    amounts[
                                      passenger
                                        .id
                                    ] ??
                                      0,
                                  );

                                if (
                                  !Number.isFinite(
                                    amount,
                                  ) ||
                                  amount ===
                                    0
                                ) {
                                  return;
                                }

                                adjust(
                                  passenger.id,
                                  amount,
                                );

                                setAmounts(
                                  (
                                    current,
                                  ) => ({
                                    ...current,
                                    [passenger.id]:
                                      "",
                                  }),
                                );
                              }}
                              className="rounded-xl bg-safari-600 px-4 text-sm font-semibold text-white"
                            >
                              Apply
                            </button>
                          </div>
                        ) : (
                          <span className="text-xs text-slate-400">
                            Read only
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                },
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}