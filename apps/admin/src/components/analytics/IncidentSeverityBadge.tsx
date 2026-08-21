type Props = {
  severity: string;
};

export default function IncidentSeverityBadge({
  severity,
}: Props) {
  const normalized = severity.toLowerCase();

  const classes =
    normalized === "critical" ||
    normalized === "high"
      ? "border-red-500/20 bg-red-500/10 text-red-700 dark:text-red-300"
      : normalized === "medium"
        ? "border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-300"
        : "border-zinc-500/20 bg-zinc-500/10 text-zinc-700 dark:text-zinc-300";

  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-bold capitalize ${classes}`}
    >
      {severity}
    </span>
  );
}
