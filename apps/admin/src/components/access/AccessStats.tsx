import {
  KeyRound,
  ShieldCheck,
  UserCog,
  Users,
} from "lucide-react";

import type {
  AccessRole,
  AdminUser,
} from "../../types/access";

export default function AccessStats({
  roles,
  users,
}: {
  roles: AccessRole[];

  users: AdminUser[];
}) {
  const activeUsers =
    users.filter(
      (user) =>
        user.status ===
        "active",
    ).length;

  const totalPermissions =
    roles.reduce(
      (total, role) =>
        total +
        role.permissions.reduce(
          (
            roleTotal,
            permission,
          ) =>
            roleTotal +
            permission.actions
              .length,
          0,
        ),
      0,
    );

  const stats = [
    {
      label:
        "System Roles",

      value:
        roles.length,

      icon:
        ShieldCheck,
    },

    {
      label:
        "Admin Users",

      value:
        users.length,

      icon: Users,
    },

    {
      label:
        "Active Users",

      value:
        activeUsers,

      icon:
        UserCog,
    },

    {
      label:
        "Permission Rules",

      value:
        totalPermissions,

      icon:
        KeyRound,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map(
        (stat) => {
          const Icon =
            stat.icon;

          return (
            <div
              key={stat.label}
              className="safari-card p-5"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-safari-50 text-safari-600 dark:bg-safari-500/10 dark:text-safari-400">
                <Icon size={19} />
              </div>

              <div className="mt-5 text-2xl font-bold text-slate-950 dark:text-white">
                {stat.value}
              </div>

              <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {stat.label}
              </div>
            </div>
          );
        },
      )}
    </div>
  );
}