import {
  Check,
  X,
} from "lucide-react";

import { getGroceryPermissions } from "../../config/groceryPermissions";

import { useAuthStore } from "../../store/authStore";
import { useGroceryStore } from "../../store/groceryStore";

export default function GrocerySubstitutionsPage() {
  const user =
    useAuthStore(
      (state) =>
        state.user,
    );

  const substitutions =
    useGroceryStore(
      (state) =>
        state.substitutions,
    );

  const setDecision =
    useGroceryStore(
      (state) =>
        state.setSubstitutionDecision,
    );

  if (!user) {
    return null;
  }

  const permissions =
    getGroceryPermissions(
      user.role,
    );

  return (
    <div>
      <div className="mb-7">
        <div className="text-sm font-semibold text-safari-600 dark:text-safari-400">
          Safari Grocery
        </div>

        <h1 className="mt-1 text-3xl font-bold text-slate-950 dark:text-white">
          Substitutions
        </h1>
      </div>

      <div className="space-y-4">
        {(substitutions ?? []).map(
          (item) => (
            <div
              key={
                item.id
              }
              className="safari-card p-5"
            >
              <div className="text-xs font-semibold text-safari-600 dark:text-safari-400">
                {item.orderId}
              </div>

              <div className="mt-3 grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-center">
                <div>
                  <div className="text-xs uppercase tracking-wide text-slate-400">
                    Unavailable
                  </div>

                  <div className="mt-1 font-semibold text-slate-900 dark:text-white">
                    {
                      item.unavailableProductName
                    }
                  </div>
                </div>

                <div className="text-center text-slate-400">
                  →
                </div>

                <div>
                  <div className="text-xs uppercase tracking-wide text-slate-400">
                    Suggested
                  </div>

                  <div className="mt-1 font-semibold text-slate-900 dark:text-white">
                    {
                      item.suggestedProductName
                    }
                  </div>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between gap-3">
                <span className="text-sm capitalize text-slate-500">
                  {
                    item.customerDecision
                  }
                </span>

                {item.customerDecision ===
                  "pending" &&
                  permissions.manageSubstitutions && (
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          setDecision(
                            item.id,
                            "accepted",
                          )
                        }
                        className="flex h-9 items-center gap-2 rounded-lg bg-safari-600 px-3 text-xs font-semibold text-white"
                      >
                        <Check
                          size={14}
                        />

                        Accept
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setDecision(
                            item.id,
                            "rejected",
                          )
                        }
                        className="flex h-9 items-center gap-2 rounded-lg border border-red-200 px-3 text-xs font-semibold text-red-600 dark:border-red-500/20 dark:text-red-400"
                      >
                        <X
                          size={14}
                        />

                        Reject
                      </button>
                    </div>
                  )}
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  );
}