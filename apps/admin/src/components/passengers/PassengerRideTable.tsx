import {
  ExternalLink,
} from "lucide-react";

import {
  Link,
} from "react-router-dom";

import type {
  PassengerRide,
} from "../../types/passenger";

export default function PassengerRideTable({
  rides,
}: {
  rides: PassengerRide[];
}) {
  return (
    <div className="safari-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-slate-100 bg-slate-50/70 dark:border-white/[0.06] dark:bg-white/[0.02]">
            <tr>
              {[
                "Ride",
                "Driver",
                "Pickup",
                "Destination",
                "Type",
                "Amount",
                "Status",
                "",
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
            {(rides ?? []).map(
              (ride) => (
                <tr
                  key={ride.id}
                  className="border-b border-slate-100 last:border-0 dark:border-white/[0.05]"
                >
                  <td className="px-5 py-4 font-semibold text-slate-900 dark:text-white">
                    {ride.id}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-500">
                    {ride.driverName ??
                      "Not assigned"}
                  </td>

                  <td className="max-w-[220px] px-5 py-4 text-sm text-slate-500">
                    {ride.pickup}
                  </td>

                  <td className="max-w-[220px] px-5 py-4 text-sm text-slate-500">
                    {ride.destination}
                  </td>

                  <td className="px-5 py-4 text-sm capitalize text-slate-500">
                    {ride.rideType}
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 font-semibold text-slate-800 dark:text-slate-200">
                    {ride.currency ===
                    "PKR"
                      ? "Rs "
                      : "Rs "}
                    {ride.amount.toLocaleString()}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={
                        ride.status ===
                        "completed"
                          ? "rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                          : "rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-700 dark:bg-red-500/10 dark:text-red-400"
                      }
                    >
                      {ride.status}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <Link
                      to={`/rides/${ride.id}`}
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 hover:bg-safari-50 hover:text-safari-600 dark:hover:bg-safari-500/10"
                    >
                      <ExternalLink
                        size={15}
                      />
                    </Link>
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