type Props = {
  status: string;
};

export default function MerchantStatusBadge({
  status,
}: Props) {
  const normalized = status.toLowerCase();

  const classes =
    normalized === "verified"
      ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
      : normalized === "rejected" ||
          normalized === "suspended"
        ? "border-red-500/20 bg-red-500/10 text-red-700 dark:text-red-300"
        : "border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-300";

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-bold capitalize ${classes}`}
    >
      {status.replaceAll("_", " ")}
    </span>
  );
}
