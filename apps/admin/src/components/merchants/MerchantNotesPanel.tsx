import {
  useState,
} from "react";

import {
  MessageSquarePlus,
} from "lucide-react";

import { useAuthStore } from "../../store/authStore";
import { useMerchantStore } from "../../store/merchantStore";

import type {
  Merchant,
} from "../../types/merchant";

export default function MerchantNotesPanel({
  merchant,
  canAdd,
}: {
  merchant: Merchant;
  canAdd: boolean;
}) {
  const [
    note,
    setNote,
  ] = useState("");

  const user =
    useAuthStore(
      (state) =>
        state.user,
    );

  const addNote =
    useMerchantStore(
      (state) =>
        state.addNote,
    );

  const handleAdd = () => {
    const value =
      note.trim();

    if (!value) {
      return;
    }

    addNote(
      merchant.id,
      value,
      user?.fullName ||
        "Safari User",
    );

    setNote("");
  };

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
        Internal notes
      </h2>

      {canAdd && (
        <div className="mt-5">
          <textarea
            value={note}
            onChange={(
              event,
            ) =>
              setNote(
                event.target
                  .value,
              )
            }
            rows={3}
            className="
              w-full

              resize-none

              rounded-xl

              border
              border-slate-200

              bg-white

              p-4

              text-sm

              outline-none

              focus:border-safari-500
              focus:ring-4
              focus:ring-safari-500/10

              dark:border-white/10
              dark:bg-[#151719]
              dark:text-white
            "
            placeholder="Add internal note..."
          />

          <button
            type="button"
            onClick={
              handleAdd
            }
            className="
              mt-3

              inline-flex
              h-10
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
            <MessageSquarePlus
              size={16}
            />

            Add note
          </button>
        </div>
      )}

      <div className="mt-6 space-y-3">
        {merchant.notes.map(
          (item) => (
            <div
              key={
                item.id
              }
              className="
                rounded-xl

                border
                border-slate-100

                p-4

                dark:border-white/[0.06]
              "
            >
              <p
                className="
                  text-sm
                  leading-6

                  text-slate-700

                  dark:text-slate-300
                "
              >
                {item.text}
              </p>

              <div
                className="
                  mt-3

                  text-xs

                  text-slate-400
                "
              >
                {item.author} ·{" "}
                {new Date(
                  item.createdAt,
                ).toLocaleString()}
              </div>
            </div>
          ),
        )}

        {merchant.notes.length ===
          0 && (
          <div
            className="
              py-8
              text-center

              text-sm
              text-slate-400
            "
          >
            No internal notes yet.
          </div>
        )}
      </div>
    </div>
  );
}