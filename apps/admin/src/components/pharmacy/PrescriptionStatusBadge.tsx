import type {
  PrescriptionStatus,
} from "../../types/pharmacy";

const classes: Record<
  PrescriptionStatus,
  string
> = {
  pending:
    "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",

  approved:
    "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",

  rejected:
    "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400",
};

export default function PrescriptionStatusBadge({
  status,
}: {
  status: PrescriptionStatus;
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