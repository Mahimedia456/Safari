import {
  Bell,
  LogOut,
  Menu,
} from "lucide-react";

import {
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";

import ThemeToggle from "../components/ui/ThemeToggle";

import {
  getContextNavigationForRole,
} from "../config/navigation";

import {
  useAuthStore,
} from "../store/authStore";

type Props = {
  onMenuClick?: () => void;
  onOpenSidebar?: () => void;
};

export default function Topbar({
  onMenuClick,
  onOpenSidebar,
}: Props) {
  const navigate =
    useNavigate();

  const location =
    useLocation();

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

  const context =
    user
      ? getContextNavigationForRole(
          user.role,
          location.pathname,
        )
      : null;

  const handleLogout =
    () => {
      logout();

      navigate(
        "/login",
        {
          replace: true,
        },
      );
    };

  return (
    <header className="sticky top-0 z-30 border-b border-[var(--safari-border)] bg-[var(--safari-topbar)]/95 backdrop-blur-xl">
      <div className="flex h-[68px] items-center gap-3 px-4 sm:px-6 lg:px-7">
        <button
          type="button"
          onClick={openSidebar}
          aria-label="Open navigation"
          className="safari-icon-button lg:hidden"
        >
          <Menu size={19} />
        </button>

        <div className="min-w-0">
          <div className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-safari-600 dark:text-safari-400">
            Safari Pakistan
          </div>

          <div className="truncate text-sm font-extrabold text-[var(--safari-text-strong)]">
            {context?.title ??
              "Control Center"}
          </div>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />

          <button
            type="button"
            aria-label="Notifications"
            className="safari-icon-button relative"
          >
            <Bell size={18} />
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="flex h-10 items-center gap-2 rounded-xl border border-[var(--safari-border)] bg-[var(--safari-surface)] px-3 text-[12px] font-semibold text-[var(--safari-text-secondary)] transition hover:text-red-500"
          >
            <LogOut size={15} />
            <span className="hidden sm:inline">
              Logout
            </span>
          </button>
        </div>
      </div>

      {context &&
      context.items.length > 1 ? (
        <div className="border-t border-[var(--safari-border-soft)] px-4 sm:px-6 lg:px-7">
          <div className="safari-sidebar-scroll flex min-h-[46px] items-center gap-1 overflow-x-auto py-1.5">
            {context.items.map(
              (item) => {
                const Icon =
                  item.icon;

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={
                      item.path ===
                      "/"
                    }
                    className={({
                      isActive,
                    }) => [
                      "inline-flex shrink-0 items-center gap-2 rounded-xl px-3 py-2 text-[12px] font-semibold transition",
                      isActive
                        ? "bg-safari-500/10 text-safari-700 dark:text-safari-300"
                        : "text-[var(--safari-muted)] hover:bg-[var(--safari-nav-hover)] hover:text-[var(--safari-text-strong)]",
                    ].join(" ")}
                  >
                    <Icon
                      size={15}
                      strokeWidth={1.8}
                    />
                    {item.label}
                  </NavLink>
                );
              },
            )}
          </div>
        </div>
      ) : null}
    </header>
  );
}
