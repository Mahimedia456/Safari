type Props = {
  status: string;
};

export default function ServiceBookingStatusBadge({
  status,
}: Props) {
  const normalized = status.toLowerCase();

  const classes =
    normalized === "completed"
      ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
      : normalized.includes("cancelled")
        ? "border-red-500/20 bg-red-500/10 text-red-700 dark:text-red-300"
        : normalized === "in_progress" ||
            normalized === "on_the_way"
          ? "border-blue-500/20 bg-blue-500/10 text-blue-700 dark:text-blue-300"
          : "border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-300";

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-bold capitalize ${classes}`}
    >
      {status.replaceAll("_", " ")}
    </span>
  );
}
