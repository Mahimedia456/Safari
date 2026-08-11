import type {
  AccountRole,
} from "../../types/auth";

const classes: Record<
  AccountRole,
  string
> = {
  super_admin:
    "bg-purple-50 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400",

  admin:
    "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",

  operations_manager:
    "bg-orange-50 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400",

  finance_manager:
    "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",

  support:
    "bg-cyan-50 text-cyan-700 dark:bg-cyan-500/10 dark:text-cyan-400",

  food_merchant:
    "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400",

  grocery_merchant:
    "bg-lime-50 text-lime-700 dark:bg-lime-500/10 dark:text-lime-400",

  pharmacy_merchant:
    "bg-pink-50 text-pink-700 dark:bg-pink-500/10 dark:text-pink-400",

  services_merchant:
    "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
};

export default function RoleBadge({
  role,
}: {
  role: AccountRole;
}) {
  return (
    <span
      className={[
        "inline-flex rounded-full px-2.5 py-1 text-xs font-semibold",

        classes[role],
      ].join(" ")}
    >
      {role.replaceAll(
        "_",
        " ",
      )}
    </span>
  );
}