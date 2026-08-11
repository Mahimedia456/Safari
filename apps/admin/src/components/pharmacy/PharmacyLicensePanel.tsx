import {
  BadgeCheck,
  CalendarClock,
  FileCheck2,
} from "lucide-react";

import type {
  PharmacyLicense,
} from "../../types/pharmacy";

export default function PharmacyLicensePanel({
  license,
}: {
  license: PharmacyLicense;
}) {
  return (
    <section className="safari-card p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-sm font-semibold text-safari-600 dark:text-safari-400">
            Pharmacy compliance
          </div>

          <h2 className="mt-1 text-xl font-bold text-slate-950 dark:text-white">
            Pharmacy License
          </h2>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-safari-50 text-safari-600 dark:bg-safari-500/10 dark:text-safari-400">
          <FileCheck2
            size={20}
          />
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Detail
          label="License Number"
          value={
            license.licenseNumber
          }
        />

        <Detail
          label="Authority"
          value={
            license.authority
          }
        />

        <Detail
          label="Issued"
          value={
            license.issuedAt
          }
        />

        <Detail
          label="Expires"
          value={
            license.expiresAt
          }
        />
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <span
          className={[
            "inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold capitalize",

            license.status ===
            "valid"
              ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
              : license.status ===
                "expiring"
              ? "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400"
              : "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400",
          ].join(" ")}
        >
          <CalendarClock
            size={14}
          />

          {license.status}
        </span>

        {license.verified && (
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">
            <BadgeCheck
              size={14}
            />

            Verified
          </span>
        )}
      </div>
    </section>
  );
}

function Detail({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-slate-100 p-4 dark:border-white/[0.06]">
      <div className="text-xs text-slate-400">
        {label}
      </div>

      <div className="mt-2 text-sm font-semibold text-slate-800 dark:text-slate-200">
        {value}
      </div>
    </div>
  );
}