import {
  usePassengerStore,
} from "../../store/passengerStore";

import type {
  PassengerSupportCase,
  PassengerSupportStatus,
} from "../../types/passenger";

export default function PassengerSupportTable({
  cases,
  canManage,
}: {
  cases:
    PassengerSupportCase[];

  canManage: boolean;
}) {
  const setStatus =
    usePassengerStore(
      (state) =>
        state.setSupportStatus,
    );

  const statuses: PassengerSupportStatus[] =
    [
      "open",
      "in_progress",
      "resolved",
      "closed",
    ];

  return (
    <div className="safari-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-slate-100 bg-slate-50/70 dark:border-white/[0.06] dark:bg-white/[0.02]">
            <tr>
              {[
                "Case",
                "Passenger",
                "Subject",
                "Category",
                "Priority",
                "Created",
                "Status",
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
            {(cases ?? []).map(
              (supportCase) => (
                <tr
                  key={
                    supportCase.id
                  }
                  className="border-b border-slate-100 last:border-0 dark:border-white/[0.05]"
                >
                  <td className="px-5 py-4 font-semibold text-slate-900 dark:text-white">
                    {
                      supportCase.id
                    }
                  </td>

                  <td className="px-5 py-4 font-semibold text-safari-600 dark:text-safari-400">
                    {
                      supportCase.passengerId
                    }
                  </td>

                  <td className="max-w-sm px-5 py-4 text-sm text-slate-600 dark:text-slate-300">
                    {
                      supportCase.subject
                    }
                  </td>

                  <td className="px-5 py-4 text-sm capitalize text-slate-500">
                    {
                      supportCase.category
                    }
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={[
                        "rounded-full px-2.5 py-1 text-xs font-semibold capitalize",

                        supportCase.priority ===
                        "high"
                          ? "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400"
                          : supportCase.priority ===
                              "normal"
                            ? "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400"
                            : "bg-slate-100 text-slate-600 dark:bg-white/[0.06]",
                      ].join(" ")}
                    >
                      {
                        supportCase.priority
                      }
                    </span>
                  </td>

                  <td className="px-5 py-4 text-xs text-slate-400">
                    {new Date(
                      supportCase.createdAt,
                    ).toLocaleString()}
                  </td>

                  <td className="px-5 py-4">
                    {canManage ? (
                      <select
                        value={
                          supportCase.status
                        }
                        onChange={(
                          event,
                        ) =>
                          setStatus(
                            supportCase.id,
                            event.target
                              .value as PassengerSupportStatus,
                          )
                        }
                        className="safari-select"
                      >
                        {statuses.map(
                          (status) => (
                            <option
                              key={
                                status
                              }
                              value={
                                status
                              }
                            >
                              {status.replaceAll(
                                "_",
                                " ",
                              )}
                            </option>
                          ),
                        )}
                      </select>
                    ) : (
                      <span className="text-sm capitalize text-slate-500">
                        {supportCase.status.replaceAll(
                          "_",
                          " ",
                        )}
                      </span>
                    )}
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