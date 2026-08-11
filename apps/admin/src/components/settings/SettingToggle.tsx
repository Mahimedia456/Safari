type Props = {
  label: string;

  description?: string;

  checked: boolean;

  disabled?: boolean;

  onChange: (
    checked: boolean,
  ) => void;
};

export default function SettingToggle({
  label,
  description,
  checked,
  disabled = false,
  onChange,
}: Props) {
  return (
    <div className="flex items-center justify-between gap-5 rounded-xl border border-slate-100 p-4 dark:border-white/[0.06]">
      <div>
        <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">
          {label}
        </div>

        {description && (
          <p className="mt-1 text-xs leading-5 text-slate-400">
            {description}
          </p>
        )}
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() =>
          onChange(!checked)
        }
        className={[
          "relative h-7 w-12 shrink-0 rounded-full transition",

          checked
            ? "bg-safari-600"
            : "bg-slate-200 dark:bg-white/10",

          disabled
            ? "cursor-not-allowed opacity-50"
            : "",
        ].join(" ")}
      >
        <span
          className={[
            "absolute top-1 h-5 w-5 rounded-full bg-white shadow transition",

            checked
              ? "left-6"
              : "left-1",
          ].join(" ")}
        />
      </button>
    </div>
  );
}