import type {
  RegionStatus,
} from "../../types/region";

const classes: Record<
  RegionStatus,
  string
> = {
  active:
    "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",

  maintenance:
    "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",

  disabled:
    "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400",
};

export default function RegionStatusBadge({
  status,
}: {
  status: RegionStatus;
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