import {
  ChevronRight,
} from "lucide-react";

import {
  Link,
} from "react-router-dom";

import type {
  ServiceBooking,
} from "../../types/services";

import ServiceBookingStatusBadge from "./ServiceBookingStatusBadge";

export default function ServiceBookingTable({
  bookings,
}: {
  bookings:
    ServiceBooking[];
}) {
  return (
    <div className="safari-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-slate-100 bg-slate-50/70 dark:border-white/[0.06] dark:bg-white/[0.02]">
            <tr>
              {[
                "Booking",
                "Service",
                "Customer",
                "Schedule",
                "Staff",
                "Total",
                "Status",
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
            {(bookings ?? []).map(
              (booking) => (
                <tr
                  key={
                    booking.id
                  }
                  className="border-b border-slate-100 last:border-0 dark:border-white/[0.05]"
                >
                  <td className="px-5 py-4 font-semibold text-slate-900 dark:text-white">
                    {booking.id}
                  </td>

                  <td className="px-5 py-4">
                    <div className="text-sm font-medium text-slate-800 dark:text-slate-200">
                      {
                        booking.serviceName
                      }
                    </div>

                    <div className="mt-1 text-xs text-slate-400">
                      {
                        booking.businessName
                      }
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <div className="text-sm text-slate-700 dark:text-slate-300">
                      {
                        booking.customerName
                      }
                    </div>

                    <div className="mt-1 text-xs text-slate-400">
                      {
                        booking.customerPhone
                      }
                    </div>
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-500">
                    {
                      booking.scheduledDate
                    }
                    <br />
                    {
                      booking.scheduledTime
                    }
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-500">
                    {booking.staffName ??
                      "Unassigned"}
                  </td>

                  <td className="px-5 py-4 font-semibold text-slate-800 dark:text-slate-200">
                    Rs{" "}
                    {booking.total.toLocaleString()}
                  </td>

                  <td className="px-5 py-4">
                    <ServiceBookingStatusBadge
                      status={
                        booking.status
                      }
                    />
                  </td>

                  <td className="px-5 py-4">
                    <Link
                      to={`/services/bookings/${booking.id}`}
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
          </tbody>
        </table>
      </div>
    </div>
  );
}