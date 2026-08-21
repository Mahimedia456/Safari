import {
  ChevronRight,
} from "lucide-react";

import {
  Link,
} from "react-router-dom";

import type {
  PharmacyPrescription,
} from "../../types/pharmacy";

import PrescriptionStatusBadge from "./PrescriptionStatusBadge";

export default function PrescriptionTable({
  prescriptions,
}: {
  prescriptions:
    PharmacyPrescription[];
}) {
  return (
    <div className="safari-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-slate-100 bg-slate-50/70 dark:border-white/[0.06] dark:bg-white/[0.02]">
            <tr>
              {[
                "Prescription",
                "Customer",
                "Doctor",
                "Order",
                "Submitted",
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
            {(prescriptions ?? []).map(
              (item) => (
                <tr
                  key={
                    item.id
                  }
                  className="border-b border-slate-100 last:border-0 dark:border-white/[0.05]"
                >
                  <td className="px-5 py-4 font-semibold text-slate-900 dark:text-white">
                    {item.id}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-300">
                    {
                      item.customerName
                    }
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-500">
                    {item.doctorName ??
                      "-"}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-500">
                    {item.orderId ??
                      "-"}
                  </td>

                  <td className="px-5 py-4 text-xs text-slate-400">
                    {new Date(
                      item.submittedAt,
                    ).toLocaleString()}
                  </td>

                  <td className="px-5 py-4">
                    <PrescriptionStatusBadge
                      status={
                        item.status
                      }
                    />
                  </td>

                  <td className="px-5 py-4">
                    <Link
                      to={`/pharmacy/prescriptions/${item.id}`}
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