import type {
  LucideIcon,
} from "lucide-react";

type Props = {
  icon: LucideIcon;

  eyebrow: string;

  title: string;

  description?: string;
};

export default function SettingsSectionHeader({
  icon: Icon,
  eyebrow,
  title,
  description,
}: Props) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-safari-50 text-safari-600 dark:bg-safari-500/10 dark:text-safari-400">
        <Icon size={20} />
      </div>

      <div>
        <div className="text-xs font-bold uppercase tracking-[0.12em] text-safari-600 dark:text-safari-400">
          {eyebrow}
        </div>

        <h2 className="mt-1 text-xl font-bold text-slate-950 dark:text-white">
          {title}
        </h2>

        {description && (
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}