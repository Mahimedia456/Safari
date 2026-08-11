import type {
  PassengerStatus,
} from "../../types/passenger";

const classes: Record<
  PassengerStatus,
  string
> = {
  active:
    "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",

  inactive:
    "bg-slate-100 text-slate-600 dark:bg-white/[0.06] dark:text-slate-300",

  suspended:
    "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",

  blocked:
    "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400",
};

export default function PassengerStatusBadge({
  status,
}: {
  status: PassengerStatus;
}) {
  return (
    <span
      className={[
        "inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold capitalize",

        classes[status],
      ].join(" ")}
    >
      {status}
    </span>
  );
}