import type {
  DriverVerificationStatus,
} from "../../types/driver";

const classes: Record<
  DriverVerificationStatus,
  string
> = {
  pending:
    "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",

  in_review:
    "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",

  verified:
    "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",

  rejected:
    "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400",

  expired:
    "bg-orange-50 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400",
};

export default function DriverVerificationBadge({
  status,
}: {
  status:
    DriverVerificationStatus;
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