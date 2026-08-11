import type {
  MerchantStatus,
} from "../../types/merchant";

const styles: Record<
  MerchantStatus,
  string
> = {
  approved:
    "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",

  pending:
    "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",

  rejected:
    "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400",

  suspended:
    "bg-slate-100 text-slate-700 dark:bg-white/[0.06] dark:text-slate-300",
};

export default function MerchantStatusBadge({
  status,
}: {
  status: MerchantStatus;
}) {
  return (
    <span
      className={[
        "inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold capitalize",
        styles[status],
      ].join(" ")}
    >
      {status}
    </span>
  );
}