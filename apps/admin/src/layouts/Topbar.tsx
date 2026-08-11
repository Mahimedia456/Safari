import {
  Bell,
  LogOut,
  Menu,
  Search,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

import ThemeToggle from "../components/ui/ThemeToggle";

import {
  useAuthStore,
} from "../store/authStore";

type Props = {
  /*
   * Current prop.
   */
  onMenuClick?: () => void;

  /*
   * Backwards compatibility
   * with older AdminLayout.
   */
  onOpenSidebar?: () => void;
};

export default function Topbar({
  onMenuClick,
  onOpenSidebar,
}: Props) {
  const navigate =
    useNavigate();

  const user =
    useAuthStore(
      (state) =>
        state.user,
    );

  const logout =
    useAuthStore(
      (state) =>
        state.logout,
    );

  const openSidebar =
    onMenuClick ??
    onOpenSidebar;

  const displayName =
    user?.fullName ||
    user?.email ||
    "Safari User";

  const handleLogout = () => {
    logout();

    navigate(
      "/login",
      {
        replace: true,
      },
    );
  };

  return (
    <header className="sticky top-0 z-30 h-[76px] border-b border-[var(--safari-border)] bg-[var(--safari-topbar)] backdrop-blur-xl">
      <div className="flex h-full items-center gap-3 px-4 sm:px-6 lg:px-8">
        {/* MOBILE MENU */}

        <button
          type="button"
          onClick={
            openSidebar
          }
          aria-label="Open navigation"
          className="safari-icon-button lg:hidden"
        >
          <Menu size={19} />
        </button>

        {/* SEARCH */}

        <div className="relative hidden w-full max-w-[430px] md:block">
          <Search
            size={17}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--safari-muted)]"
          />

          <input
            type="search"
            placeholder="Search Safari..."
            className="h-11 w-full rounded-[14px] border border-[var(--safari-border)] bg-[var(--safari-input-bg)] pl-11 pr-4 text-sm text-[var(--safari-text)] outline-none transition duration-200 placeholder:text-[var(--safari-placeholder)] hover:border-[var(--safari-border-hover)] focus:border-safari-500 focus:bg-[var(--safari-surface)] focus:ring-4 focus:ring-safari-500/10"
          />
        </div>

        {/* RIGHT SIDE */}

        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />

          {/* NOTIFICATIONS */}

          <button
            type="button"
            aria-label="Notifications"
            className="safari-icon-button relative"
          >
            <Bell size={18} />

            <span className="absolute right-[8px] top-[7px] h-2 w-2 rounded-full bg-safari-500 ring-2 ring-[var(--safari-topbar)]" />
          </button>

          <div className="mx-1 hidden h-8 w-px bg-[var(--safari-border)] sm:block" />

          {/* USER */}

          {user && (
            <div className="hidden min-w-0 items-center gap-3 sm:flex">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-safari-500 to-safari-700 text-[11px] font-black tracking-wide text-white shadow-sm">
                {getInitials(
                  displayName,
                )}
              </div>

              <div className="hidden min-w-0 xl:block">
                <div className="max-w-[180px] truncate text-[13px] font-bold text-[var(--safari-text-strong)]">
                  {displayName}
                </div>

                <div className="mt-0.5 max-w-[180px] truncate text-[11px] font-medium text-[var(--safari-muted)]">
                  {formatRole(
                    user.role,
                  )}
                </div>
              </div>
            </div>
          )}

          {/* LOGOUT */}

          <button
            type="button"
            onClick={
              handleLogout
            }
            className="ml-1 flex h-10 items-center gap-2 rounded-xl border border-[var(--safari-border)] bg-[var(--safari-surface)] px-3.5 text-[13px] font-semibold text-[var(--safari-text-secondary)] transition duration-200 hover:border-red-200 hover:bg-red-50 hover:text-red-600 dark:hover:border-red-500/20 dark:hover:bg-red-500/10 dark:hover:text-red-400"
          >
            <LogOut
              size={16}
            />

            <span className="hidden md:inline">
              Logout
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}

function getInitials(
  value: string,
) {
  const parts =
    value
      .trim()
      .split(/\s+/)
      .filter(Boolean);

  if (
    parts.length === 0
  ) {
    return "SA";
  }

  if (
    parts.length === 1
  ) {
    return parts[0]
      .slice(0, 2)
      .toUpperCase();
  }

  return (
    parts[0][0] +
    parts[
      parts.length - 1
    ][0]
  ).toUpperCase();
}

function formatRole(
  role: string,
) {
  return role
    .replaceAll(
      "_",
      " ",
    )
    .replace(
      /\b\w/g,
      (character) =>
        character.toUpperCase(),
    );
}