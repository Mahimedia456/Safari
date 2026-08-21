import {
  Clock3,
} from "lucide-react";

import { getServicesPermissions } from "../../config/servicesPermissions";

import { useAuthStore } from "../../store/authStore";
import { useServicesStore } from "../../store/servicesStore";

export default function ServiceAvailabilityPage() {
  const user =
    useAuthStore(
      (state) =>
        state.user,
    );

  const availability =
    useServicesStore(
      (state) =>
        state.availability,
    );

  const toggleAvailability =
    useServicesStore(
      (state) =>
        state.toggleAvailability,
    );

  if (!user) {
    return null;
  }

  const permissions =
    getServicesPermissions(
      user.role,
    );

  return (
    <div>
      <div className="mb-7">
        <div className="text-sm font-semibold text-safari-600 dark:text-safari-400">
          Safari Services
        </div>

        <h1 className="mt-1 text-3xl font-bold text-slate-950 dark:text-white">
          Availability
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Business operating hours for
          service bookings.
        </p>
      </div>

      <div className="safari-card p-6">
        <div className="space-y-3">
          {(availability ?? []).map(
            (item) => (
              <div
                key={
                  item.id
                }
                className="flex flex-col gap-3 rounded-xl border border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between dark:border-white/[0.06]"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-safari-50 text-safari-600 dark:bg-safari-500/10 dark:text-safari-400">
                    <Clock3
                      size={16}
                    />
                  </div>

                  <div>
                    <div className="font-semibold text-slate-900 dark:text-white">
                      {item.day}
                    </div>

                    <div className="mt-1 text-xs text-slate-400">
                      {item.enabled
                        ? `${item.startTime} – ${item.endTime}`
                        : "Closed"}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  disabled={
                    !permissions.manageAvailability
                  }
                  onClick={() =>
                    toggleAvailability(
                      item.id,
                    )
                  }
                  className={[
                    "rounded-full px-3 py-1 text-xs font-semibold",

                    item.enabled
                      ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                      : "bg-slate-100 text-slate-500 dark:bg-white/[0.06]",
                  ].join(
                    " ",
                  )}
                >
                  {item.enabled
                    ? "Open"
                    : "Closed"}
                </button>
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
}