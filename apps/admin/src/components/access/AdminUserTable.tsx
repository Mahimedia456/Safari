import {
  ChevronRight,
} from "lucide-react";

import {
  Link,
} from "react-router-dom";

import type {
  AdminUser,
} from "../../types/access";

import RoleBadge from "./RoleBadge";
import UserStatusBadge from "./UserStatusBadge";

export default function AdminUserTable({
  users,
}: {
  users: AdminUser[];
}) {
  return (
    <div className="safari-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-slate-100 bg-slate-50/70 dark:border-white/[0.06] dark:bg-white/[0.02]">
            <tr>
              {[
                "User",
                "Role",
                "Region Scope",
                "Status",
                "Last Login",
                "",
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
            {users.map(
              (user) => (
                <tr
                  key={user.id}
                  className="border-b border-slate-100 last:border-0 dark:border-white/[0.05]"
                >
                  <td className="px-5 py-4">
                    <div className="font-semibold text-slate-900 dark:text-white">
                      {
                        user.fullName
                      }
                    </div>

                    <div className="mt-1 text-xs text-slate-400">
                      {user.email}
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <RoleBadge
                      role={
                        user.role
                      }
                    />
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-500">
                    {
                      user.regionScope
                    }
                  </td>

                  <td className="px-5 py-4">
                    <UserStatusBadge
                      status={
                        user.status
                      }
                    />
                  </td>

                  <td className="px-5 py-4 text-xs text-slate-400">
                    {user.lastLoginAt
                      ? new Date(
                          user.lastLoginAt,
                        ).toLocaleString()
                      : "Never"}
                  </td>

                  <td className="px-5 py-4">
                    <Link
                      to={`/access/users/${user.id}`}
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 hover:bg-safari-50 hover:text-safari-600 dark:hover:bg-safari-500/10"
                    >
                      <ChevronRight
                        size={17}
                      />
                    </Link>
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