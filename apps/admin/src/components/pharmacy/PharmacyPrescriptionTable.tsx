import {
  Check,
  ChevronRight,
  X,
} from "lucide-react";

import {
  Link,
} from "react-router-dom";

import { getPharmacyPermissions } from "../../config/pharmacyPermissions";

import { useAuthStore } from "../../store/authStore";
import { usePharmacyStore } from "../../store/pharmacyStore";

import type {
  PharmacyPrescription,
} from "../../types/pharmacy";

import PrescriptionStatusBadge from "./PrescriptionStatusBadge";

type Props = {
  prescriptions:
    PharmacyPrescription[];
};

export default function PharmacyPrescriptionTable({
  prescriptions,
}: Props) {
  const user = useAuthStore(
    (state) => state.user,
  );

  const setPrescriptionStatus =
    usePharmacyStore(
      (state) =>
        state.setPrescriptionStatus,
    );

  if (!user) {
    return null;
  }

  const permissions =
    getPharmacyPermissions(
      user.role,
    );

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
                "Actions",
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
            {prescriptions.map(
              (prescription) => (
                <tr
                  key={
                    prescription.id
                  }
                  className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50 dark:border-white/[0.05] dark:hover:bg-white/[0.02]"
                >
                  <td className="px-5 py-4 font-semibold text-slate-900 dark:text-white">
                    {
                      prescription.id
                    }
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-300">
                    {
                      prescription.customerName
                    }
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-500">
                    {prescription.doctorName ??
                      "Not provided"}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-500">
                    {prescription.orderId ??
                      "Not linked"}
                  </td>

                  <td className="px-5 py-4 text-xs text-slate-400">
                    {new Date(
                      prescription.submittedAt,
                    ).toLocaleString()}
                  </td>

                  <td className="px-5 py-4">
                    <PrescriptionStatusBadge
                      status={
                        prescription.status
                      }
                    />
                  </td>

                  <td className="px-5 py-4">
                    {prescription.status ===
                      "pending" &&
                      permissions.reviewPrescriptions && (
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            title="Approve"
                            onClick={() =>
                              setPrescriptionStatus(
                                prescription.id,
                                "approved",
                                "Approved from prescription list.",
                              )
                            }
                            className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 transition hover:bg-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400"
                          >
                            <Check
                              size={15}
                            />
                          </button>

                          <button
                            type="button"
                            title="Reject"
                            onClick={() =>
                              setPrescriptionStatus(
                                prescription.id,
                                "rejected",
                                "Rejected from prescription list.",
                              )
                            }
                            className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-red-600 transition hover:bg-red-100 dark:bg-red-500/10 dark:text-red-400"
                          >
                            <X
                              size={15}
                            />
                          </button>
                        </div>
                      )}
                  </td>

                  <td className="px-5 py-4">
                    <Link
                      to={`/pharmacy/prescriptions/${prescription.id}`}
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-safari-50 hover:text-safari-600 dark:hover:bg-safari-500/10 dark:hover:text-safari-400"
                    >
                      <ChevronRight
                        size={17}
                      />
                    </Link>
                  </td>
                </tr>
              ),
            )}

            {prescriptions.length ===
              0 && (
              <tr>
                <td
                  colSpan={8}
                  className="px-5 py-14 text-center text-sm text-slate-400"
                >
                  No prescriptions
                  available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}