import {
  CheckCircle2,
  Clock3,
  FileText,
  XCircle,
} from "lucide-react";

import type {
  Merchant,
} from "../../types/merchant";

export default function MerchantDocumentsPanel({
  merchant,
}: {
  merchant: Merchant;
}) {
  return (
    <div className="safari-card p-6">
      <h2
        className="
          text-base
          font-semibold

          text-slate-950

          dark:text-white
        "
      >
        Documents
      </h2>

      <div className="mt-5 space-y-3">
        {merchant.documents.map(
          (document) => {
            const StatusIcon =
              document.status ===
              "verified"
                ? CheckCircle2
                : document.status ===
                    "rejected"
                  ? XCircle
                  : Clock3;

            return (
              <div
                key={
                  document.id
                }
                className="
                  flex
                  items-center
                  gap-4

                  rounded-xl

                  border
                  border-slate-100

                  p-4

                  dark:border-white/[0.06]
                "
              >
                <div
                  className="
                    flex h-10 w-10
                    shrink-0
                    items-center
                    justify-center

                    rounded-xl

                    bg-slate-100

                    text-slate-500

                    dark:bg-white/[0.05]
                  "
                >
                  <FileText
                    size={18}
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <div
                    className="
                      font-medium

                      text-slate-900

                      dark:text-white
                    "
                  >
                    {
                      document.name
                    }
                  </div>

                  <div
                    className="
                      mt-1

                      text-xs
                      text-slate-400
                    "
                  >
                    {document.number ||
                      "No document number"}
                  </div>
                </div>

                <div
                  className="
                    flex
                    items-center
                    gap-1.5

                    text-xs
                    capitalize

                    text-slate-500
                  "
                >
                  <StatusIcon
                    size={15}
                  />

                  {
                    document.status
                  }
                </div>
              </div>
            );
          },
        )}
      </div>
    </div>
  );
}