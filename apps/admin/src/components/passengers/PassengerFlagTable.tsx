import {
  usePassengerStore,
} from "../../store/passengerStore";

import type {
  PassengerFlag,
  PassengerFlagStatus,
} from "../../types/passenger";

export default function PassengerFlagTable({
  flags,
  canManage,
}: {
  flags: PassengerFlag[];

  canManage: boolean;
}) {
  const setStatus =
    usePassengerStore(
      (state) =>
        state.setFlagStatus,
    );

  const statuses: PassengerFlagStatus[] =
    [
      "open",
      "reviewing",
      "resolved",
    ];

  return (
    <div className="safari-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-slate-100 bg-slate-50/70 dark:border-white/[0.06] dark:bg-white/[0.02]">
            <tr>
              {[
                "Flag",
                "Passenger",
                "Description",
                "Severity",
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
            {(flags ?? []).map(
              (flag) => (
                <tr
                  key={flag.id}
                  className="border-b border-slate-100 last:border-0 dark:border-white/[0.05]"
                >
                  <td className="px-5 py-4">
                    <div className="font-semibold text-slate-900 dark:text-white">
                      {flag.title}
                    </div>

                    <div className="mt-1 text-xs text-slate-400">
                      {flag.id}
                    </div>
                  </td>

                  <td className="px-5 py-4 text-sm font-semibold text-safari-600 dark:text-safari-400">
                    {
                      flag.passengerId
                    }
                  </td>

                  <td className="max-w-md px-5 py-4 text-sm text-slate-500">
                    {
                      flag.description
                    }
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={[
                        "rounded-full px-2.5 py-1 text-xs font-semibold capitalize",

                        flag.severity ===
                        "critical"
                          ? "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400"
                          : flag.severity ===
                              "high"
                            ? "bg-orange-50 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400"
                            : flag.severity ===
                                "medium"
                              ? "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400"
                              : "bg-slate-100 text-slate-600 dark:bg-white/[0.06]",
                      ].join(" ")}
                    >
                      {flag.severity}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-xs text-slate-400">
                    {new Date(
                      flag.createdAt,
                    ).toLocaleString()}
                  </td>

                  <td className="px-5 py-4">
                    {canManage ? (
                      <select
                        value={
                          flag.status
                        }
                        onChange={(
                          event,
                        ) =>
                          setStatus(
                            flag.id,
                            event.target
                              .value as PassengerFlagStatus,
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
                              {status}
                            </option>
                          ),
                        )}
                      </select>
                    ) : (
                      <span className="text-sm capitalize text-slate-500">
                        {flag.status}
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