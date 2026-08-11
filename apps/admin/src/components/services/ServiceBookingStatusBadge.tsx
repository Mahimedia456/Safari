import type {
  ServiceBookingStatus,
} from "../../types/services";

const classes: Record<
  ServiceBookingStatus,
  string
> = {
  pending:
    "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",

  confirmed:
    "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",

  assigned:
    "bg-purple-50 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400",

  in_progress:
    "bg-orange-50 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400",

  completed:
    "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",

  cancelled:
    "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400",
};

export default function ServiceBookingStatusBadge({
  status,
}: {
  status:
    ServiceBookingStatus;
}) {
  return (
    <span
      className={[
        "inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold capitalize",

        classes[status],
      ].join(" ")}
    >
      {status.replace(
        "_",
        " ",
      )}
    </span>
  );
}