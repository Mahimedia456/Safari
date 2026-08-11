import {
  BadgeCheck,
  Building2,
} from "lucide-react";

import type {
  Merchant,
} from "../../types/merchant";

export default function MerchantBankPanel({
  merchant,
  canView,
}: {
  merchant: Merchant;
  canView: boolean;
}) {
  if (!canView) {
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
          Bank details
        </h2>

        <div
          className="
            mt-5

            rounded-xl

            bg-slate-50

            p-6

            text-center

            text-sm
            text-slate-400

            dark:bg-white/[0.03]
          "
        >
          Your role does not have
          permission to view banking
          information.
        </div>
      </div>
    );
  }

  const bank =
    merchant.bankDetails;

  return (
    <div className="safari-card p-6">
      <div
        className="
          flex
          items-center
          justify-between
        "
      >
        <h2
          className="
            text-base
            font-semibold

            text-slate-950

            dark:text-white
          "
        >
          Bank details
        </h2>

        {bank.verified && (
          <span
            className="
              flex
              items-center
              gap-1.5

              text-xs
              font-medium

              text-emerald-600

              dark:text-emerald-400
            "
          >
            <BadgeCheck
              size={15}
            />

            Verified
          </span>
        )}
      </div>

      <div
        className="
          mt-5

          rounded-xl

          border
          border-slate-100

          p-5

          dark:border-white/[0.06]
        "
      >
        <Building2
          className="
            text-safari-600

            dark:text-safari-400
          "
          size={22}
        />

        <div
          className="
            mt-4

            text-sm
            font-semibold

            text-slate-900

            dark:text-white
          "
        >
          {bank.bankName}
        </div>

        <div
          className="
            mt-1

            text-sm

            text-slate-500

            dark:text-slate-400
          "
        >
          {bank.accountTitle}
        </div>

        <div
          className="
            mt-4

            text-sm

            text-slate-700

            dark:text-slate-300
          "
        >
          {bank.accountNumber}
        </div>

        {bank.iban && (
          <div
            className="
              mt-2

              break-all

              text-xs

              text-slate-400
            "
          >
            IBAN: {bank.iban}
          </div>
        )}

        <div
          className="
            mt-3

            text-xs
            font-semibold

            text-safari-600

            dark:text-safari-400
          "
        >
          {bank.currency}
        </div>
      </div>
    </div>
  );
}