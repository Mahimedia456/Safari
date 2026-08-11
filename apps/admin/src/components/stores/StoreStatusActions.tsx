import {
  useState,
} from "react";

import {
  Ban,
  Check,
  RotateCcw,
  X,
} from "lucide-react";

import type {
  StorePermissions,
} from "../../config/storePermissions";

import { useStoreStore } from "../../store/storeStore";

import type {
  SafariStore,
} from "../../types/store";

export default function StoreStatusActions({
  store,
  permissions,
}: {
  store: SafariStore;

  permissions:
    StorePermissions;
}) {
  const [
    action,
    setAction,
  ] = useState<
    | "reject"
    | "suspend"
    | null
  >(null);

  const [
    reason,
    setReason,
  ] = useState("");

  const setStatus =
    useStoreStore(
      (state) =>
        state.setStatus,
    );

  const confirm = () => {
    const value =
      reason.trim();

    if (
      !action ||
      !value
    ) {
      return;
    }

    setStatus(
      store.id,

      action ===
      "reject"
        ? "rejected"
        : "suspended",

      value,
    );

    setAction(null);

    setReason("");
  };

  return (
    <section className="safari-card p-5">
      <div
        className="
          text-sm
          font-semibold

          text-slate-950

          dark:text-white
        "
      >
        Store actions
      </div>

      <div
        className="
          mt-4

          flex
          flex-wrap
          gap-2
        "
      >
        {store.status ===
          "pending" &&
          permissions.approve && (
            <button
              type="button"
              onClick={() =>
                setStatus(
                  store.id,
                  "active",
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
              <Check size={16} />

              Approve
            </button>
          )}

        {store.status ===
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

                text-red-600

                dark:border-red-500/20
                dark:text-red-400
              "
            >
              <X size={16} />

              Reject
            </button>
          )}

        {store.status ===
          "active" &&
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

                text-red-600

                dark:border-red-500/20
                dark:text-red-400
              "
            >
              <Ban size={16} />

              Suspend
            </button>
          )}

        {(store.status ===
          "suspended" ||
          store.status ===
            "rejected") &&
          permissions.reactivate && (
            <button
              type="button"
              onClick={() =>
                setStatus(
                  store.id,
                  "active",
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

              dark:border-white/10
              dark:bg-[#151719]
              dark:text-white
            "
            value={reason}
            onChange={(
              event,
            ) =>
              setReason(
                event.target
                  .value,
              )
            }
          />

          <div className="mt-3 flex gap-2">
            <button
              type="button"
              onClick={
                confirm
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

                dark:border-white/10
              "
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </section>
  );
}