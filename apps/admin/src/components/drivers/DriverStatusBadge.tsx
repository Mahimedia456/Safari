import type {
  DriverStatus,
} from "../../types/driver";

const classes: Record<
  DriverStatus,
  string
> = {
  active:
    "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
  offline:
    "bg-slate-100 text-slate-600 dark:bg-white/[0.06] dark:text-slate-300",
  suspended:
    "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
  blocked:
    "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400",
};

export default function DriverStatusBadge({
  status,
}: {
  status: DriverStatus | string;
}) {
  const safeClass =
    classes[
      status as DriverStatus
    ] ??
    "bg-slate-100 text-slate-600 dark:bg-white/[0.06] dark:text-slate-300";

  return (
    <span
      className={[
        "inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold capitalize",
        safeClass,
      ].join(" ")}
    >
      {status.replaceAll(
        "_",
        " ",
      )}
    </span>
  );
}
