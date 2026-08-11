import {
  Check,
  X,
} from "lucide-react";

import { getGroceryPermissions } from "../../config/groceryPermissions";

import { useAuthStore } from "../../store/authStore";
import { useGroceryStore } from "../../store/groceryStore";

export default function GroceryRefundsPage() {
  const user =
    useAuthStore(
      (state) =>
        state.user,
    );

  const refunds =
    useGroceryStore(
      (state) =>
        state.refunds,
    );

  const setRefundStatus =
    useGroceryStore(
      (state) =>
        state.setRefundStatus,
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
          Refunds
        </h1>
      </div>

      <div className="safari-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-slate-100 bg-slate-50/70 dark:border-white/[0.06] dark:bg-white/[0.02]">
              <tr>
                {[
                  "Refund",
                  "Order",
                  "Amount",
                  "Reason",
                  "Status",
                  "Actions",
                ].map(
                  (label) => (
                    <th
                      key={
                        label
                      }
                      className="px-5 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400"
                    >
                      {label}
                    </th>
                  ),
                )}
              </tr>
            </thead>

            <tbody>
              {refunds.map(
                (refund) => (
                  <tr
                    key={
                      refund.id
                    }
                    className="border-b border-slate-100 last:border-0 dark:border-white/[0.05]"
                  >
                    <td className="px-5 py-4 font-semibold text-slate-900 dark:text-white">
                      {
                        refund.id
                      }
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-500">
                      {
                        refund.orderId
                      }
                    </td>

                    <td className="px-5 py-4 font-semibold text-slate-800 dark:text-slate-200">
                      Rs{" "}
                      {
                        refund.amount
                      }
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-500">
                      {
                        refund.reason
                      }
                    </td>

                    <td className="px-5 py-4 text-sm capitalize text-slate-500">
                      {
                        refund.status
                      }
                    </td>

                    <td className="px-5 py-4">
                      {refund.status ===
                        "pending" &&
                        permissions.manageRefunds && (
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() =>
                                setRefundStatus(
                                  refund.id,
                                  "approved",
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
                                setRefundStatus(
                                  refund.id,
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
    </div>
  );
}