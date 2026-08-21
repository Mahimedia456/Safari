import {
  ChevronRight,
} from "lucide-react";

import {
  Link,
} from "react-router-dom";

import type {
  DriverVehicle,
} from "../../types/driver";

import DriverVerificationBadge from "./DriverVerificationBadge";

export default function DriverVehicleTable({
  vehicles,
}: {
  vehicles:
    DriverVehicle[];
}) {
  return (
    <div className="safari-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-slate-100 bg-slate-50/70 dark:border-white/[0.06] dark:bg-white/[0.02]">
            <tr>
              {[
                "Vehicle",
                "Plate",
                "Category",
                "Year",
                "Registration",
                "Insurance",
                "Active",
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
            {(vehicles ?? []).map(
              (vehicle) => (
                <tr
                  key={
                    vehicle.id
                  }
                  className="border-b border-slate-100 last:border-0 dark:border-white/[0.05]"
                >
                  <td className="px-5 py-4">
                    <div className="font-semibold text-slate-900 dark:text-white">
                      {vehicle.make}{" "}
                      {vehicle.model}
                    </div>

                    <div className="mt-1 text-xs text-slate-400">
                      {vehicle.color} ·{" "}
                      {vehicle.id}
                    </div>
                  </td>

                  <td className="px-5 py-4 font-semibold text-slate-700 dark:text-slate-300">
                    {
                      vehicle.plateNumber
                    }
                  </td>

                  <td className="px-5 py-4 text-sm capitalize text-slate-500">
                    {
                      vehicle.category
                    }
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-500">
                    {vehicle.year}
                  </td>

                  <td className="px-5 py-4">
                    <DriverVerificationBadge
                      status={
                        vehicle.registrationStatus
                      }
                    />
                  </td>

                  <td className="px-5 py-4">
                    <DriverVerificationBadge
                      status={
                        vehicle.insuranceStatus
                      }
                    />
                  </td>

                  <td className="px-5 py-4 text-sm font-semibold">
                    <span
                      className={
                        vehicle.active
                          ? "text-emerald-600"
                          : "text-slate-400"
                      }
                    >
                      {vehicle.active
                        ? "Yes"
                        : "No"}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <Link
                      to={`/drivers/vehicles/${vehicle.id}`}
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