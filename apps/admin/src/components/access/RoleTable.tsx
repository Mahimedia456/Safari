import {
  ChevronRight,
} from "lucide-react";

import {
  Link,
} from "react-router-dom";

import type {
  AccessRole,
} from "../../types/access";

import RoleBadge from "./RoleBadge";

export default function RoleTable({
  roles,
}: {
  roles: AccessRole[];
}) {
  return (
    <div className="safari-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-slate-100 bg-slate-50/70 dark:border-white/[0.06] dark:bg-white/[0.02]">
            <tr>
              {[
                "Role",
                "Description",
                "Modules",
                "Permissions",
                "Type",
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
            {roles.map(
              (role) => {
                const count =
                  role.permissions.reduce(
                    (
                      total,
                      permission,
                    ) =>
                      total +
                      permission.actions
                        .length,
                    0,
                  );

                return (
                  <tr
                    key={role.id}
                    className="border-b border-slate-100 last:border-0 dark:border-white/[0.05]"
                  >
                    <td className="px-5 py-4">
                      <div className="font-semibold text-slate-900 dark:text-white">
                        {role.name}
                      </div>

                      <div className="mt-2">
                        <RoleBadge
                          role={role.role}
                        />
                      </div>
                    </td>

                    <td className="max-w-sm px-5 py-4 text-sm text-slate-500">
                      {
                        role.description
                      }
                    </td>

                    <td className="px-5 py-4 font-semibold text-slate-700 dark:text-slate-300">
                      {
                        role.permissions.length
                      }
                    </td>

                    <td className="px-5 py-4 font-semibold text-slate-700 dark:text-slate-300">
                      {count}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-500">
                      {role.system
                        ? "System"
                        : "Custom"}
                    </td>

                    <td className="px-5 py-4">
                      <Link
                        to={`/access/roles/${role.id}`}
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 hover:bg-safari-50 hover:text-safari-600 dark:hover:bg-safari-500/10"
                      >
                        <ChevronRight
                          size={17}
                        />
                      </Link>
                    </td>
                  </tr>
                );
              },
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}