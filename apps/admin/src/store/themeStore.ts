import { create } from "zustand";

export type ThemeMode =
  | "light"
  | "dark";

type ThemeState = {
  theme: ThemeMode;

  initialized: boolean;

  initializeTheme: () => void;

  setTheme: (
    theme: ThemeMode,
  ) => void;

  toggleTheme: () => void;
};

const STORAGE_KEY =
  "safari_admin_theme";

function getStoredTheme():
  ThemeMode | null {
  if (
    typeof window ===
    "undefined"
  ) {
    return null;
  }

  const value =
    window.localStorage.getItem(
      STORAGE_KEY,
    );

  if (
    value === "light" ||
    value === "dark"
  ) {
    return value;
  }

  return null;
}

function getSystemTheme():
  ThemeMode {
  if (
    typeof window ===
    "undefined"
  ) {
    return "light";
  }

  return window.matchMedia(
    "(prefers-color-scheme: dark)",
  ).matches
    ? "dark"
    : "light";
}

function applyTheme(
  theme: ThemeMode,
) {
  if (
    typeof document ===
    "undefined"
  ) {
    return;
  }

  const root =
    document.documentElement;

  root.classList.toggle(
    "dark",
    theme === "dark",
  );

  root.dataset.theme =
    theme;

  root.style.colorScheme =
    theme;
}

export const useThemeStore =
  create<ThemeState>(
    (set, get) => ({
      theme: "light",

      initialized: false,

      initializeTheme: () => {
        /*
         * main.tsx can safely call this
         * more than once.
         */
        if (
          get().initialized
        ) {
          applyTheme(
            get().theme,
          );

          return;
        }

        const theme =
          getStoredTheme() ??
          getSystemTheme();

        applyTheme(theme);

        set({
          theme,
          initialized: true,
        });
      },

      setTheme: (
        theme,
      ) => {
        applyTheme(theme);

        if (
          typeof window !==
          "undefined"
        ) {
          window.localStorage.setItem(
            STORAGE_KEY,
            theme,
          );
        }

        set({
          theme,
          initialized: true,
        });
      },

      toggleTheme: () => {
        const nextTheme =
          get().theme === "dark"
            ? "light"
            : "dark";

        applyTheme(
          nextTheme,
        );

        if (
          typeof window !==
          "undefined"
        ) {
          window.localStorage.setItem(
            STORAGE_KEY,
            nextTheme,
          );
        }

        set({
          theme: nextTheme,
          initialized: true,
        });
      },
    }),
  );