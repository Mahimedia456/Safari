import {
  useState,
} from "react";

import {
  Ban,
  Check,
  RotateCcw,
  X,
} from "lucide-react";

import { useMerchantStore } from "../../store/merchantStore";

import type {
  Merchant,
} from "../../types/merchant";

import type {
  MerchantPermissions,
} from "../../config/merchantPermissions";

export default function MerchantStatusActions({
  merchant,
  permissions,
}: {
  merchant: Merchant;

  permissions:
    MerchantPermissions;
}) {
  const setStatus =
    useMerchantStore(
      (state) =>
        state.setStatus,
    );

  const [
    reason,
    setReason,
  ] = useState("");

  const [
    action,
    setAction,
  ] = useState<
    | "reject"
    | "suspend"
    | null
  >(null);

  const confirmReasonAction =
    () => {
      if (!action) {
        return;
      }

      const value =
        reason.trim();

      if (!value) {
        return;
      }

      setStatus(
        merchant.id,

        action === "reject"
          ? "rejected"
          : "suspended",

        value,
      );

      setAction(null);

      setReason("");
    };

  return (
    <div className="safari-card p-5">
      <div
        className="
          text-sm
          font-semibold

          text-slate-950

          dark:text-white
        "
      >
        Account actions
      </div>

      <div
        className="
          mt-4

          flex
          flex-wrap
          gap-2
        "
      >
        {merchant.status ===
          "pending" &&
          permissions.approve && (
            <button
              type="button"
              onClick={() =>
                setStatus(
                  merchant.id,
                  "approved",
                )
              }
              className="
                inline-flex h-10
                items-center
                gap-2

                rounded-xl

                bg-safari-600

                px-4

                text-sm
                font-semibold

                text-white

                hover:bg-safari-700
              "
            >
              <Check
                size={16}
              />

              Approve
            </button>
          )}

        {merchant.status ===
          "pending" &&
          permissions.reject && (
            <button
              type="button"
              onClick={() =>
                setAction(
                  "reject",
                )
              }
              className="
                inline-flex h-10
                items-center
                gap-2

                rounded-xl

                border
                border-red-200

                px-4

                text-sm
                font-medium

                text-red-600

                dark:border-red-500/20
                dark:text-red-400
              "
            >
              <X size={16} />

              Reject
            </button>
          )}

        {merchant.status ===
          "approved" &&
          permissions.suspend && (
            <button
              type="button"
              onClick={() =>
                setAction(
                  "suspend",
                )
              }
              className="
                inline-flex h-10
                items-center
                gap-2

                rounded-xl

                border
                border-red-200

                px-4

                text-sm
                font-medium

                text-red-600

                dark:border-red-500/20
                dark:text-red-400
              "
            >
              <Ban size={16} />

              Suspend
            </button>
          )}

        {(merchant.status ===
          "suspended" ||
          merchant.status ===
            "rejected") &&
          permissions.reactivate && (
            <button
              type="button"
              onClick={() =>
                setStatus(
                  merchant.id,
                  "approved",
                )
              }
              className="
                inline-flex h-10
                items-center
                gap-2

                rounded-xl

                bg-safari-600

                px-4

                text-sm
                font-semibold

                text-white
              "
            >
              <RotateCcw
                size={16}
              />

              Reactivate
            </button>
          )}
      </div>

      {action && (
        <div
          className="
            mt-5

            rounded-xl

            bg-slate-50

            p-4

            dark:bg-white/[0.03]
          "
        >
          <label
            className="
              text-sm
              font-medium

              text-slate-700

              dark:text-slate-200
            "
          >
            {action ===
            "reject"
              ? "Rejection reason"
              : "Suspension reason"}
          </label>

          <textarea
            rows={3}
            value={reason}
            onChange={(
              event,
            ) =>
              setReason(
                event.target
                  .value,
              )
            }
            className="
              mt-2
              w-full

              resize-none

              rounded-xl

              border
              border-slate-200

              bg-white

              p-3

              text-sm

              outline-none

              dark:border-white/10
              dark:bg-[#151719]
              dark:text-white
            "
          />

          <div
            className="
              mt-3

              flex
              gap-2
            "
          >
            <button
              type="button"
              onClick={
                confirmReasonAction
              }
              className="
                h-9

                rounded-lg

                bg-red-600

                px-4

                text-xs
                font-semibold

                text-white
              "
            >
              Confirm
            </button>

            <button
              type="button"
              onClick={() => {
                setAction(null);
                setReason("");
              }}
              className="
                h-9

                rounded-lg

                border
                border-slate-200

                px-4

                text-xs
                font-medium

                dark:border-white/10
              "
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}