import {
  Check,
  X,
} from "lucide-react";

import {
  useDriverStore,
} from "../../store/driverStore";

import type {
  DriverDocument,
} from "../../types/driver";

import DriverVerificationBadge from "./DriverVerificationBadge";

export default function DriverDocumentTable({
  driverId,
  documents,
  canManage,
}: {
  driverId: string;

  documents:
    DriverDocument[];

  canManage: boolean;
}) {
  const setStatus =
    useDriverStore(
      (state) =>
        state.setDocumentStatus,
    );

  return (
    <div className="safari-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-slate-100 bg-slate-50/70 dark:border-white/[0.06] dark:bg-white/[0.02]">
            <tr>
              {[
                "Document",
                "Number",
                "File",
                "Expiry",
                "Status",
                "Actions",
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
            {documents.map(
              (document) => (
                <tr
                  key={
                    document.id
                  }
                  className="border-b border-slate-100 last:border-0 dark:border-white/[0.05]"
                >
                  <td className="px-5 py-4 font-semibold capitalize text-slate-900 dark:text-white">
                    {document.type.replaceAll(
                      "_",
                      " ",
                    )}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-500">
                    {document.documentNumber ??
                      "-"}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-500">
                    {
                      document.fileName
                    }
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-500">
                    {document.expiresAt ??
                      "-"}
                  </td>

                  <td className="px-5 py-4">
                    <DriverVerificationBadge
                      status={
                        document.status
                      }
                    />
                  </td>

                  <td className="px-5 py-4">
                    {canManage && (
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            setStatus(
                              driverId,
                              document.id,
                              "verified",
                            )
                          }
                          className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
                        >
                          <Check
                            size={15}
                          />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            setStatus(
                              driverId,
                              document.id,
                              "rejected",
                            )
                          }
                          className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400"
                        >
                          <X
                            size={15}
                          />
                        </button>
                      </div>
                    )}
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