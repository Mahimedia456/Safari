import {
  ArrowLeft,
  Check,
  FileImage,
  X,
} from "lucide-react";

import {
  useState,
} from "react";

import {
  Link,
  Navigate,
  useParams,
} from "react-router-dom";

import PrescriptionStatusBadge from "../../components/pharmacy/PrescriptionStatusBadge";

import { getPharmacyPermissions } from "../../config/pharmacyPermissions";

import { useAuthStore } from "../../store/authStore";
import { usePharmacyStore } from "../../store/pharmacyStore";

export default function PharmacyPrescriptionDetailPage() {
  const {
    prescriptionId,
  } = useParams();

  const user =
    useAuthStore(
      (state) =>
        state.user,
    );

  const prescription =
    usePharmacyStore(
      (state) =>
        state.prescriptions.find(
          (item) =>
            item.id ===
            prescriptionId,
        ),
    );

  const setStatus =
    usePharmacyStore(
      (state) =>
        state.setPrescriptionStatus,
    );

  const [notes, setNotes] =
    useState(
      prescription?.notes ??
        "",
    );

  if (!prescription) {
    return (
      <Navigate
        to="/pharmacy/prescriptions"
        replace
      />
    );
  }

  if (!user) {
    return null;
  }

  const permissions =
    getPharmacyPermissions(
      user.role,
    );

  return (
    <div>
      <Link
        to="/pharmacy/prescriptions"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-safari-600"
      >
        <ArrowLeft
          size={16}
        />

        Prescriptions
      </Link>

      <div className="mt-5">
        <PrescriptionStatusBadge
          status={
            prescription.status
          }
        />

        <h1 className="mt-3 text-3xl font-bold text-slate-950 dark:text-white">
          {prescription.id}
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          {
            prescription.customerName
          }
        </p>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_0.8fr]">
        <section className="safari-card p-6">
          <h2 className="text-base font-semibold text-slate-950 dark:text-white">
            Uploaded prescription
          </h2>

          <div className="mt-5 flex min-h-[340px] items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-white/[0.02]">
            <div className="text-center">
              <FileImage
                size={36}
                className="mx-auto text-safari-500"
              />

              <div className="mt-3 font-semibold text-slate-700 dark:text-slate-300">
                {
                  prescription.imageName
                }
              </div>

              <div className="mt-1 text-xs text-slate-400">
                Actual prescription image
                will load from backend
                storage.
              </div>
            </div>
          </div>
        </section>

        <section className="safari-card p-6">
          <h2 className="text-base font-semibold text-slate-950 dark:text-white">
            Review
          </h2>

          <div className="mt-5 space-y-4">
            <Info
              label="Customer"
              value={
                prescription.customerName
              }
            />

            <Info
              label="Doctor"
              value={
                prescription.doctorName ??
                "Not provided"
              }
            />

            <Info
              label="Order"
              value={
                prescription.orderId ??
                "Not linked"
              }
            />

            <Info
              label="Submitted"
              value={new Date(
                prescription.submittedAt,
              ).toLocaleString()}
            />
          </div>

          <textarea
            rows={4}
            value={notes}
            onChange={(
              event,
            ) =>
              setNotes(
                event.target
                  .value,
              )
            }
            placeholder="Prescription review notes..."
            className="mt-5 w-full resize-none rounded-xl border border-slate-200 bg-white p-4 text-sm outline-none focus:border-safari-500 focus:ring-4 focus:ring-safari-500/10 dark:border-white/10 dark:bg-[#151719] dark:text-white"
          />

          {permissions.reviewPrescriptions &&
            prescription.status ===
              "pending" && (
              <div className="mt-4 flex gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setStatus(
                      prescription.id,
                      "approved",
                      notes.trim(),
                    )
                  }
                  className="inline-flex h-10 items-center gap-2 rounded-xl bg-safari-600 px-4 text-sm font-semibold text-white"
                >
                  <Check
                    size={16}
                  />

                  Approve
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setStatus(
                      prescription.id,
                      "rejected",
                      notes.trim(),
                    )
                  }
                  className="inline-flex h-10 items-center gap-2 rounded-xl border border-red-200 px-4 text-sm font-semibold text-red-600 dark:border-red-500/20 dark:text-red-400"
                >
                  <X
                    size={16}
                  />

                  Reject
                </button>
              </div>
            )}
        </section>
      </div>
    </div>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <div className="text-xs text-slate-400">
        {label}
      </div>

      <div className="mt-1 text-sm font-semibold text-slate-800 dark:text-slate-200">
        {value}
      </div>
    </div>
  );
}