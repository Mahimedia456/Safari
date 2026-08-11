import type {
  GroceryOrderStatus,
} from "../../types/grocery";

const styles: Record<
  GroceryOrderStatus,
  string
> = {
  pending:
    "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",

  confirmed:
    "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",

  picking:
    "bg-orange-50 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400",

  packed:
    "bg-purple-50 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400",

  picked_up:
    "bg-cyan-50 text-cyan-700 dark:bg-cyan-500/10 dark:text-cyan-400",

  delivered:
    "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",

  cancelled:
    "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400",
};

export default function GroceryOrderStatusBadge({
  status,
}: {
  status: GroceryOrderStatus;
}) {
  return (
    <span
      className={[
        "inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold capitalize",
        styles[status],
      ].join(" ")}
    >
      {status.replace(
        "_",
        " ",
      )}
    </span>
  );
}