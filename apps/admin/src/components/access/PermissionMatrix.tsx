import {
  useAccessStore,
} from "../../store/accessStore";

import type {
  AccessRole,
  PermissionAction,
  PermissionModule,
} from "../../types/access";

const modules: PermissionModule[] = [
  "dashboard",
  "rides",
  "pricing",
  "drivers",
  "passengers",
  "merchants",
  "stores",
  "food",
  "grocery",
  "pharmacy",
  "services",
  "rewards",
  "finance",
  "regions",
  "roles",
  "settings",
];

const actions: PermissionAction[] = [
  "view",
  "create",
  "edit",
  "delete",
  "approve",
  "reject",
  "suspend",
  "refund",
  "payout",
  "export",
  "manage",
];

export default function PermissionMatrix({
  role,
  canEdit,
}: {
  role: AccessRole;

  canEdit: boolean;
}) {
  const toggle =
    useAccessStore(
      (state) =>
        state.togglePermission,
    );

  const hasPermission = (
    module: PermissionModule,
    action: PermissionAction,
  ) =>
    role.permissions
      .find(
        (permission) =>
          permission.module ===
          module,
      )
      ?.actions.includes(
        action,
      ) ?? false;

  return (
    <div className="safari-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-[1250px] w-full">
          <thead className="border-b border-slate-100 bg-slate-50/70 dark:border-white/[0.06] dark:bg-white/[0.02]">
            <tr>
              <th className="sticky left-0 z-10 bg-slate-50 px-5 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:bg-[#16181a]">
                Module
              </th>

              {actions.map(
                (action) => (
                  <th
                    key={action}
                    className="px-4 py-4 text-center text-[11px] font-bold uppercase tracking-wider text-slate-400"
                  >
                    {action}
                  </th>
                ),
              )}
            </tr>
          </thead>

          <tbody>
            {modules.map(
              (module) => (
                <tr
                  key={module}
                  className="border-b border-slate-100 last:border-0 dark:border-white/[0.05]"
                >
                  <td className="sticky left-0 bg-white px-5 py-4 font-semibold capitalize text-slate-900 dark:bg-[#111315] dark:text-white">
                    {module}
                  </td>

                  {actions.map(
                    (action) => {
                      const checked =
                        hasPermission(
                          module,
                          action,
                        );

                      return (
                        <td
                          key={
                            action
                          }
                          className="px-4 py-4 text-center"
                        >
                          <input
                            type="checkbox"
                            checked={
                              checked
                            }
                            disabled={
                              !canEdit
                            }
                            onChange={() =>
                              toggle(
                                role.id,
                                module,
                                action,
                              )
                            }
                            className="h-4 w-4 accent-safari-600"
                          />
                        </td>
                      );
                    },
                  )}
                </tr>
              ),
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}