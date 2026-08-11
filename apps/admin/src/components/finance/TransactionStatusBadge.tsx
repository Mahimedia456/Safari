import type {
  TransactionStatus,
} from "../../types/finance";

const statusClasses: Record<
  TransactionStatus,
  string
> = {
  pending:
    "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",

  processing:
    "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",

  completed:
    "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",

  failed:
    "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400",

  refunded:
    "bg-purple-50 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400",
};

export default function TransactionStatusBadge({
  status,
}: {
  status: TransactionStatus;
}) {
  return (
    <span
      className={[
        "inline-flex rounded-full px-2.5 py-1 text-xs font-semibold capitalize",
        statusClasses[status],
      ].join(" ")}
    >
      {status}
    </span>
  );
}