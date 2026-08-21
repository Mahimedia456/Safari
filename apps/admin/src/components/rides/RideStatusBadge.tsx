import type {
  RideStatus,
} from "../../types/ride";

const classes: Record<string, string> = {
  requested:
    "bg-slate-100 text-slate-700 dark:bg-white/[0.06] dark:text-slate-300",
  searching:
    "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
  driver_assigned:
    "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",
  driver_arriving:
    "bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400",
  driver_arrived:
    "bg-purple-50 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400",
  waiting:
    "bg-purple-50 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400",
  in_progress:
    "bg-orange-50 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400",
  completed:
    "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
  cancelled:
    "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400",
  cancelled_by_passenger:
    "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400",
  cancelled_by_driver:
    "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400",
  cancelled_by_admin:
    "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400",
};

export default function RideStatusBadge({
  status,
}: {
  status: RideStatus | string;
}) {
  return (
    <span
      className={[
        "inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold capitalize",
        classes[status] ??
          "bg-slate-100 text-slate-700 dark:bg-white/[0.06] dark:text-slate-300",
      ].join(" ")}
    >
      {status.replaceAll("_", " ")}
    </span>
  );
}
