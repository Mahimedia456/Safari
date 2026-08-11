import {
  ChevronRight,
} from "lucide-react";

import {
  Link,
} from "react-router-dom";

import type {
  DriverApplication,
} from "../../types/driver";

export default function DriverApplicationTable({
  applications,
}: {
  applications:
    DriverApplication[];
}) {
  return (
    <div className="safari-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-slate-100 bg-slate-50/70 dark:border-white/[0.06] dark:bg-white/[0.02]">
            <tr>
              {[
                "Application",
                "Applicant",
                "Region",
                "Vehicle Type",
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
            {applications.map(
              (application) => (
                <tr
                  key={
                    application.id
                  }
                  className="border-b border-slate-100 last:border-0 dark:border-white/[0.05]"
                >
                  <td className="px-5 py-4 font-semibold text-slate-900 dark:text-white">
                    {
                      application.id
                    }
                  </td>

                  <td className="px-5 py-4">
                    <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                      {
                        application.applicantName
                      }
                    </div>

                    <div className="mt-1 text-xs text-slate-400">
                      {
                        application.phone
                      }
                    </div>
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-500">
                    {application.city}
                    <br />
                    {
                      application.region
                    }
                  </td>

                  <td className="px-5 py-4 text-sm capitalize text-slate-500">
                    {
                      application.vehicleType
                    }
                  </td>

                  <td className="px-5 py-4 text-xs text-slate-400">
                    {new Date(
                      application.submittedAt,
                    ).toLocaleString()}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={[
                        "rounded-full px-2.5 py-1 text-xs font-semibold capitalize",

                        application.status ===
                        "approved"
                          ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                          : application.status ===
                              "rejected"
                            ? "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400"
                            : "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
                      ].join(" ")}
                    >
                      {application.status.replaceAll(
                        "_",
                        " ",
                      )}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <Link
                      to={`/drivers/applications/${application.id}`}
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