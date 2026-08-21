import {
  Star,
} from "lucide-react";

import {
  useServicesStore,
} from "../../store/servicesStore";

import type {
  ServiceStaff,
} from "../../types/services";

export default function ServiceStaffTable({
  staff,
  canManage,
}: {
  staff: ServiceStaff[];
  canManage: boolean;
}) {
  const toggleStaff =
    useServicesStore(
      (state) =>
        state.toggleStaff,
    );

  return (
    <div className="safari-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-slate-100 bg-slate-50/70 dark:border-white/[0.06] dark:bg-white/[0.02]">
            <tr>
              {[
                "Staff",
                "Role",
                "Phone",
                "Bookings",
                "Rating",
                "Status",
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
            {(staff ?? []).map(
              (member) => (
                <tr
                  key={
                    member.id
                  }
                  className="border-b border-slate-100 last:border-0 dark:border-white/[0.05]"
                >
                  <td className="px-5 py-4 font-semibold text-slate-900 dark:text-white">
                    {
                      member.name
                    }
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-500">
                    {
                      member.role
                    }
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-500">
                    {
                      member.phone
                    }
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-500">
                    {
                      member.completedBookings
                    }
                  </td>

                  <td className="px-5 py-4">
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-amber-600">
                      <Star
                        size={14}
                        className="fill-current"
                      />

                      {
                        member.rating
                      }
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <button
                      type="button"
                      disabled={
                        !canManage
                      }
                      onClick={() =>
                        toggleStaff(
                          member.id,
                        )
                      }
                      className={[
                        "rounded-full px-3 py-1 text-xs font-semibold",

                        member.active
                          ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                          : "bg-slate-100 text-slate-500 dark:bg-white/[0.06]",
                      ].join(
                        " ",
                      )}
                    >
                      {member.active
                        ? "Active"
                        : "Inactive"}
                    </button>
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