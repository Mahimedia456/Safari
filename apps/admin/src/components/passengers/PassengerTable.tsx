import {
  ChevronRight,
  ShieldAlert,
  Star,
} from "lucide-react";

import {
  Link,
} from "react-router-dom";

import type {
  Passenger,
} from "../../types/passenger";

import PassengerStatusBadge from "./PassengerStatusBadge";

export default function PassengerTable({
  passengers,
}: {
  passengers:
    Passenger[];
}) {
  return (
    <div className="safari-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-slate-100 bg-slate-50/70 dark:border-white/[0.06] dark:bg-white/[0.02]">
            <tr>
              {[
                "Passenger",
                "Region",
                "Status",
                "Verification",
                "Rides",
                "Rating",
                "Wallet",
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
                    className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50 dark:border-white/[0.05] dark:hover:bg-white/[0.02]"
                  >
                    <td className="px-5 py-4">
                      <div className="font-semibold text-slate-900 dark:text-white">
                        {
                          passenger.fullName
                        }
                      </div>

                      <div className="mt-1 text-xs text-slate-400">
                        {passenger.id}
                        {" · "}
                        {
                          passenger.phone
                        }
                      </div>
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-500">
                      {passenger.city}
                      <br />
                      {
                        passenger.region
                      }
                    </td>

                    <td className="px-5 py-4">
                      <PassengerStatusBadge
                        status={
                          passenger.status
                        }
                      />
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={[
                          "inline-flex items-center gap-1.5 text-sm font-semibold capitalize",

                          passenger.verificationStatus ===
                          "verified"
                            ? "text-emerald-600 dark:text-emerald-400"
                            : passenger.verificationStatus ===
                                "flagged"
                              ? "text-red-600 dark:text-red-400"
                              : "text-slate-400",
                        ].join(" ")}
                      >
                        {passenger.verificationStatus ===
                          "flagged" && (
                          <ShieldAlert
                            size={14}
                          />
                        )}

                        {
                          passenger.verificationStatus
                        }
                      </span>
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-500">
                      {
                        passenger.completedRides
                      }
                    </td>

                    <td className="px-5 py-4">
                      <span className="inline-flex items-center gap-1 font-semibold text-amber-500">
                        <Star
                          size={14}
                          className="fill-current"
                        />

                        {
                          passenger.rating
                        }
                      </span>
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 font-semibold text-slate-700 dark:text-slate-300">
                      {symbol}
                      {passenger.wallet.balance.toLocaleString()}
                    </td>

                    <td className="px-5 py-4">
                      <Link
                        to={`/passengers/${passenger.id}`}
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-safari-50 hover:text-safari-600 dark:hover:bg-safari-500/10"
                      >
                        <ChevronRight
                          size={17}
                        />
                      </Link>
                    </td>
                  </tr>
                );
              },
            )}

            {passengers.length ===
              0 && (
              <tr>
                <td
                  colSpan={8}
                  className="px-5 py-14 text-center text-sm text-slate-400"
                >
                  No passengers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}