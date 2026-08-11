import {
  ChevronRight,
  RadioTower,
  Star,
} from "lucide-react";

import {
  Link,
} from "react-router-dom";

import type {
  Driver,
} from "../../types/driver";

import DriverStatusBadge from "./DriverStatusBadge";
import DriverVerificationBadge from "./DriverVerificationBadge";

export default function DriverTable({
  drivers,
}: {
  drivers: Driver[];
}) {
  return (
    <div className="safari-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-slate-100 bg-slate-50/70 dark:border-white/[0.06] dark:bg-white/[0.02]">
            <tr>
              {[
                "Driver",
                "Region",
                "Status",
                "Verification",
                "Online",
                "Rating",
                "Rides",
                "",
              ].map(
                (label) => (
                  <th
                    key={label}
                    className="whitespace-nowrap px-5 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400"
                  >
                    {label}
                  </th>
                ),
              )}
            </tr>
          </thead>

          <tbody>
            {drivers.map(
              (driver) => (
                <tr
                  key={
                    driver.id
                  }
                  className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50 dark:border-white/[0.05] dark:hover:bg-white/[0.02]"
                >
                  <td className="px-5 py-4">
                    <div className="font-semibold text-slate-900 dark:text-white">
                      {
                        driver.fullName
                      }
                    </div>

                    <div className="mt-1 text-xs text-slate-400">
                      {driver.id} ·{" "}
                      {driver.phone}
                    </div>
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-500">
                    {driver.city}
                    <br />
                    {
                      driver.region
                    }
                  </td>

                  <td className="px-5 py-4">
                    <DriverStatusBadge
                      status={
                        driver.status
                      }
                    />
                  </td>

                  <td className="px-5 py-4">
                    <DriverVerificationBadge
                      status={
                        driver.verificationStatus
                      }
                    />
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={[
                        "inline-flex items-center gap-2 text-sm font-semibold",

                        driver.online
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-slate-400",
                      ].join(" ")}
                    >
                      <RadioTower
                        size={14}
                      />

                      {driver.online
                        ? "Online"
                        : "Offline"}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-amber-500">
                      <Star
                        size={14}
                        className="fill-current"
                      />

                      {
                        driver.rating
                      }
                    </span>
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-500">
                    {
                      driver.completedRides
                    }
                  </td>

                  <td className="px-5 py-4">
                    <Link
                      to={`/drivers/${driver.id}`}
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 hover:bg-safari-50 hover:text-safari-600 dark:hover:bg-safari-500/10"
                    >
                      <ChevronRight
                        size={17}
                      />
                    </Link>
                  </td>
                </tr>
              ),
            )}

            {drivers.length ===
              0 && (
              <tr>
                <td
                  colSpan={8}
                  className="px-5 py-14 text-center text-sm text-slate-400"
                >
                  No drivers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}