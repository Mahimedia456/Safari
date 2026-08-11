import type {
  AccessUserStatus,
} from "../../types/access";

const classes: Record<
  AccessUserStatus,
  string
> = {
  active:
    "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",

  suspended:
    "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",

  disabled:
    "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400",
};

export default function UserStatusBadge({
  status,
}: {
  status: AccessUserStatus;
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