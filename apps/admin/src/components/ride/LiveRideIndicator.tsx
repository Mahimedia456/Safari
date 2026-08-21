type Props = {
  status: string;
};

export default function LiveRideIndicator({ status }: Props) {
  const active =
    status === "in_progress" ||
    status === "driver_arriving" ||
    status === "driver_arrived";

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-[11px] font-bold capitalize ${
        active
          ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
          : "border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-300"
      }`}
    >
      <span
        className={`h-2 w-2 rounded-full ${
          active ? "animate-pulse bg-emerald-500" : "bg-amber-500"
        }`}
      />

      {status.replaceAll("_", " ")}
    </span>
  );
}
