import {
  ChevronLeft,
  ChevronRight,
  LogOut,
  X,
} from "lucide-react";

import {
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";

import SafariLogo from "../components/branding/SafariLogo";

import {
  getNavigationForRole,
} from "../config/navigation";

import {
  useAuthStore,
} from "../store/authStore";

type Props = {
  mobileOpen?: boolean;

  onCloseMobile?: () => void;

  open?: boolean;

  onClose?: () => void;

  collapsed?: boolean;

  onToggleCollapsed?: () => void;
};

export default function Sidebar({
  mobileOpen,
  onCloseMobile,

  open,
  onClose,

  collapsed = false,

  onToggleCollapsed,
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

  const isMobileOpen =
    mobileOpen ??
    open ??
    false;

  const closeMobile =
    onCloseMobile ??
    onClose;

  if (!user) {
    return null;
  }

  const sections =
    getNavigationForRole(
      user.role,
    );

  const displayName =
    user.fullName ||
    user.email ||
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
    <>
      {isMobileOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={
            closeMobile
          }
          className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-[3px] lg:hidden"
        />
      )}

      <aside
        className={[
          "fixed inset-y-0 left-0 z-50 flex w-[280px] flex-col",
          "border-r border-[var(--safari-border)]",
          "bg-[var(--safari-sidebar)]",
          "shadow-[var(--safari-sidebar-shadow)]",
          "transition-all duration-300 ease-out",

          collapsed
            ? "lg:w-[88px]"
            : "lg:w-[272px]",

          isMobileOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0",
        ].join(" ")}
      >
        {/* Logo */}

        <div
          className={[
            "flex h-[76px] shrink-0 items-center",
            "border-b border-[var(--safari-border)]",
            collapsed
              ? "justify-between px-5 lg:justify-center lg:px-3"
              : "justify-between px-5",
          ].join(" ")}
        >
          <div
            className={
              collapsed
                ? "lg:hidden"
                : ""
            }
          >
            <SafariLogo />
          </div>

          {collapsed && (
            <div className="hidden lg:block">
              <SafariLogo />
            </div>
          )}

          <button
            type="button"
            onClick={
              closeMobile
            }
            aria-label="Close navigation"
            className="safari-icon-button lg:hidden"
          >
            <X size={18} />
          </button>
        </div>

        {/* User */}

        <div className="shrink-0 px-3.5 py-4">
          <div
            className={[
              "relative flex items-center gap-3 overflow-hidden rounded-2xl",
              "border border-[var(--safari-border-soft)]",
              "bg-[var(--safari-surface-soft)] p-3",
              "transition duration-200",

              collapsed
                ? "lg:justify-center lg:px-2"
                : "",
            ].join(" ")}
          >
            <div className="absolute inset-y-0 left-0 w-[3px] bg-safari-500/80" />

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-safari-500 to-safari-700 text-[12px] font-black tracking-wide text-white shadow-sm">
              {getInitials(
                displayName,
              )}
            </div>

            <div
              className={[
                "min-w-0 flex-1",

                collapsed
                  ? "lg:hidden"
                  : "",
              ].join(" ")}
            >
              <div className="truncate text-[13px] font-bold text-[var(--safari-text-strong)]">
                {displayName}
              </div>

              <div className="mt-0.5 truncate text-[11px] font-medium text-[var(--safari-muted)]">
                {formatRole(
                  user.role,
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}

        <div className="safari-sidebar-scroll min-h-0 flex-1 overflow-y-auto px-3 pb-4">
          <nav className="space-y-6">
            {sections.map(
              (section) => (
                <section
                  key={
                    section.title
                  }
                >
                  <div
                    className={[
                      "mb-2 px-3",
                      "text-[10px] font-extrabold uppercase tracking-[0.18em]",
                      "text-[var(--safari-sidebar-section)]",

                      collapsed
                        ? "lg:hidden"
                        : "",
                    ].join(" ")}
                  >
                    {
                      section.title
                    }
                  </div>

                  <div className="space-y-1">
                    {section.items.map(
                      (item) => {
                        const Icon =
                          item.icon;

                        const active =
                          isNavigationActive(
                            location.pathname,
                            item.path,
                          );

                        return (
                          <NavLink
                            key={`${section.title}-${item.path}`}
                            to={
                              item.path
                            }
                            end={
                              item.path ===
                              "/"
                            }
                            onClick={() =>
                              closeMobile?.()
                            }
                            title={
                              collapsed
                                ? item.label
                                : undefined
                            }
                            className={[
                              "group relative flex min-h-[44px] items-center rounded-xl",
                              "text-[13px] font-semibold",
                              "transition-all duration-200",

                              collapsed
                                ? "lg:justify-center lg:px-2"
                                : "gap-3 px-3",

                              active
                                ? "bg-[var(--safari-nav-active)] text-[var(--safari-nav-active-text)] shadow-[var(--safari-nav-shadow)]"
                                : "text-[var(--safari-sidebar-text)] hover:bg-[var(--safari-nav-hover)] hover:text-[var(--safari-text-strong)]",
                            ].join(" ")}
                          >
                            <span
                              className={[
                                "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                                "transition-all duration-200",

                                active
                                  ? "bg-[var(--safari-nav-icon-active)] text-safari-600 dark:text-safari-400"
                                  : "text-[var(--safari-sidebar-icon)] group-hover:text-safari-600 dark:group-hover:text-safari-400",
                              ].join(" ")}
                            >
                              <Icon
                                size={17}
                                strokeWidth={
                                  1.9
                                }
                              />
                            </span>

                            <span
                              className={[
                                "min-w-0 flex-1 truncate",

                                collapsed
                                  ? "lg:hidden"
                                  : "",
                              ].join(" ")}
                            >
                              {
                                item.label
                              }
                            </span>

                            {active &&
                              !collapsed && (
                                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-safari-500 shadow-[0_0_0_4px_rgba(16,185,129,0.08)]" />
                              )}
                          </NavLink>
                        );
                      },
                    )}
                  </div>
                </section>
              ),
            )}
          </nav>
        </div>

        {/* Footer */}

        <div className="shrink-0 border-t border-[var(--safari-border)] bg-[var(--safari-sidebar-footer)] p-3">
          <button
            type="button"
            onClick={
              handleLogout
            }
            title={
              collapsed
                ? "Logout"
                : undefined
            }
            className={[
              "flex h-11 w-full items-center rounded-xl",
              "text-sm font-semibold text-red-500",
              "transition duration-200",
              "hover:bg-red-50 dark:hover:bg-red-500/10",

              collapsed
                ? "lg:justify-center lg:px-2"
                : "gap-3 px-3",
            ].join(" ")}
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center">
              <LogOut
                size={17}
              />
            </span>

            <span
              className={
                collapsed
                  ? "lg:hidden"
                  : ""
              }
            >
              Logout
            </span>
          </button>

          {onToggleCollapsed && (
            <button
              type="button"
              onClick={
                onToggleCollapsed
              }
              className={[
                "mt-1 hidden h-10 w-full items-center rounded-xl",
                "text-xs font-semibold text-[var(--safari-muted)]",
                "transition duration-200",
                "hover:bg-[var(--safari-nav-hover)] hover:text-[var(--safari-text-strong)]",
                "lg:flex",

                collapsed
                  ? "justify-center"
                  : "gap-3 px-3",
              ].join(" ")}
            >
              {collapsed ? (
                <ChevronRight
                  size={17}
                />
              ) : (
                <>
                  <ChevronLeft
                    size={17}
                  />

                  <span>
                    Collapse
                  </span>
                </>
              )}
            </button>
          )}
        </div>
      </aside>
    </>
  );
}

function isNavigationActive(
  pathname: string,
  path: string,
) {
  if (path === "/") {
    return pathname === "/";
  }

  return (
    pathname === path ||
    pathname.startsWith(
      `${path}/`,
    )
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
    .replaceAll("_", " ")
    .replace(
      /\b\w/g,
      (character) =>
        character.toUpperCase(),
    );
}