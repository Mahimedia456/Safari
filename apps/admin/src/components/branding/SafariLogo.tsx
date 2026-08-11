import { useThemeStore } from "../../store/themeStore";

type Props = {
  compact?: boolean;
  className?: string;
};

export default function SafariLogo({
  compact = false,
  className = "",
}: Props) {
  const theme =
    useThemeStore(
      (state) => state.theme,
    );

  const logoSource =
    theme === "dark"
      ? "/pakistan/Safari_Green_Light.png"
      : "/pakistan/Safari_Green_Dark.png";

  if (compact) {
    return (
      <div
        className={[
          "flex items-center",
          className,
        ].join(" ")}
      >
        <img
          src={logoSource}
          alt="Safari"
          className="
            h-9
            w-auto
            max-w-[115px]
            object-contain
            object-left
          "
        />
      </div>
    );
  }

  return (
    <div
      className={[
        "flex items-center",
        className,
      ].join(" ")}
    >
      <img
        src={logoSource}
        alt="Safari"
        className="
          h-11
          w-auto
          max-w-[150px]
          object-contain
          object-left
        "
      />
    </div>
  );
}