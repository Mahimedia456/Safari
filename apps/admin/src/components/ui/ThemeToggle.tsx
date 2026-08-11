import {
  Moon,
  Sun,
} from "lucide-react";

import {
  useThemeStore,
} from "../../store/themeStore";

export default function ThemeToggle() {
  const theme =
    useThemeStore(
      (state) => state.theme,
    );

  const toggleTheme =
    useThemeStore(
      (state) =>
        state.toggleTheme,
    );

  const dark =
    theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={
        dark
          ? "Switch to light mode"
          : "Switch to dark mode"
      }
      title={
        dark
          ? "Light mode"
          : "Dark mode"
      }
      className="safari-icon-button"
    >
      <span
        className={[
          "transition-all duration-300",
          dark
            ? "rotate-0 scale-100"
            : "-rotate-12 scale-100",
        ].join(" ")}
      >
        {dark ? (
          <Sun size={18} />
        ) : (
          <Moon size={18} />
        )}
      </span>
    </button>
  );
}