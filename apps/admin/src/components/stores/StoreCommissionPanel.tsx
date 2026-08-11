import {
  useState,
} from "react";

import {
  Percent,
} from "lucide-react";

import { useStoreStore } from "../../store/storeStore";

import type {
  SafariStore,
} from "../../types/store";

export default function StoreCommissionPanel({
  store,
  canEdit,
}: {
  store: SafariStore;

  canEdit: boolean;
}) {
  const [
    commission,
    setCommission,
  ] = useState(
    store.commissionPercentage,
  );

  const updateCommission =
    useStoreStore(
      (state) =>
        state.updateCommission,
    );

  const save = () => {
    if (
      commission < 0 ||
      commission > 100
    ) {
      return;
    }

    updateCommission(
      store.id,
      commission,
    );
  };

  return (
    <section className="safari-card p-6">
      <div
        className="
          flex
          items-start
          justify-between
          gap-4
        "
      >
        <div>
          <h2
            className="
              text-base
              font-semibold

              text-slate-950

              dark:text-white
            "
          >
            Commission
          </h2>

          <p
            className="
              mt-1

              text-sm
              text-slate-500

              dark:text-slate-400
            "
          >
            This rate applies only to
            this individual store.
          </p>
        </div>

        <div
          className="
            flex h-10 w-10
            items-center
            justify-center

            rounded-xl

            bg-safari-50

            text-safari-600

            dark:bg-safari-500/10
            dark:text-safari-400
          "
        >
          <Percent
            size={18}
          />
        </div>
      </div>

      <div
        className="
          mt-6

          max-w-xs
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
          Safari commission %
        </label>

        <input
          type="number"
          min="0"
          max="100"
          step="0.1"
          disabled={
            !canEdit
          }
          value={
            commission
          }
          onChange={(
            event,
          ) =>
            setCommission(
              Number(
                event.target
                  .value,
              ),
            )
          }
          className="
            safari-input
            mt-2
          "
        />

        {canEdit && (
          <button
            type="button"
            onClick={save}
            className="
              mt-3

              h-10

              rounded-xl

              bg-safari-600

              px-4

              text-sm
              font-semibold

              text-white

              hover:bg-safari-700
            "
          >
            Save commission
          </button>
        )}
      </div>
    </section>
  );
}