import { Car, ShieldCheck } from "lucide-react";

import type { Ride } from "../../types/ride";

import { useDriverStore } from "../../store/driverStore";

type Props = {
  ride: Ride;
  canDispatch?: boolean;
};

export default function RideDispatchPanel({
  ride,
  canDispatch = false,
}: Props) {
  const drivers =
    useDriverStore(
      (state) => state.drivers ?? [],
    );

  const availableDrivers =
    drivers.filter(
      (driver) =>
        driver.status === "active" &&
        driver.online,
    );

  return (
    <section className="safari-card p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-base font-semibold text-slate-950 dark:text-white">
            Driver Dispatch
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Ride {ride.id.slice(0, 8)} · {ride.city}
          </p>
        </div>

        <div className="inline-flex items-center gap-2 rounded-full bg-safari-500/10 px-3 py-1.5 text-xs font-semibold text-safari-700 dark:text-safari-300">
          <ShieldCheck size={14} />
          {canDispatch ? "Dispatch enabled" : "View only"}
        </div>
      </div>

      <div className="mt-5 space-y-3">
        {availableDrivers.length === 0 ? (
          <div className="rounded-xl border border-slate-200 p-5 text-sm text-slate-500 dark:border-white/10 dark:text-slate-400">
            No online drivers are currently available.
          </div>
        ) : (
          availableDrivers.slice(0, 6).map((driver) => (
            <div
              key={driver.id}
              className="flex items-center justify-between rounded-xl border border-slate-200 p-4 dark:border-white/10"
            >
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-safari-500/10 text-safari-600">
                  <Car size={18} />
                </div>

                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                    {driver.fullName}
                  </div>
                  <div className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                    {driver.city} · {driver.rating.toFixed(1)} rating
                  </div>
                </div>
              </div>

              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                Online
              </span>
            </div>
          ))
        )}
      </div>

      {canDispatch ? (
        <p className="mt-4 text-xs text-slate-400">
          Manual assignment will activate when the backend dispatch endpoint is enabled.
        </p>
      ) : null}
    </section>
  );
}
