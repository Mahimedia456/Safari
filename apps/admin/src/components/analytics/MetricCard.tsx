import type { LucideIcon } from "lucide-react";

type Props = {
  title: string;
  value: string | number;
  caption?: string;
  icon: LucideIcon;
};

export default function MetricCard({
  title,
  value,
  caption,
  icon: Icon,
}: Props) {
  return (
    <div className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-zinc-950">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-zinc-500 dark:text-zinc-400">
            {title}
          </p>

          <p className="mt-3 text-3xl font-black tracking-[-0.04em] text-zinc-950 dark:text-white">
            {value}
          </p>

          {caption ? (
            <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
              {caption}
            </p>
          ) : null}
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-950 dark:bg-zinc-900 dark:text-white">
          <Icon size={20} />
        </div>
      </div>
    </div>
  );
}
