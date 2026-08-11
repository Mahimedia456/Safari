import type {
  PayoutStatus,
} from "../../types/finance";

const classes: Record<
  PayoutStatus,
  string
> = {
  pending:
    "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",

  approved:
    "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",

  processing:
    "bg-purple-50 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400",

  paid:
    "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",

  rejected:
    "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400",
};

export default function PayoutStatusBadge({
  status,
}: {
  status: PayoutStatus;
}) {
  return (
    <span
      className={[
        "inline-flex rounded-full px-2.5 py-1 text-xs font-semibold capitalize",
        classes[status],
      ].join(" ")}
    >
      {status}
    </span>
  );
}