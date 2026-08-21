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
  getSidebarNavigationForRole,
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
    getSidebarNavigationForRole(
      user.role,
    );

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
    <>
      {isMobileOpen ? (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={closeMobile}
          className="fixed inset-0 z-40 bg-slate-950/45 backdrop-blur-[2px] lg:hidden"
        />
      ) : null}

      <aside
        className={[
          "fixed inset-y-0 left-0 z-50 flex w-[244px] flex-col",
          "border-r border-[var(--safari-border)]",
          "bg-[var(--safari-sidebar)]",
          "shadow-[var(--safari-sidebar-shadow)]",
          "transition-all duration-300",
          collapsed
            ? "lg:w-[76px]"
            : "lg:w-[232px]",
          isMobileOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0",
        ].join(" ")}
      >
        <div
          className={[
            "flex h-[68px] shrink-0 items-center border-b border-[var(--safari-border)]",
            collapsed
              ? "justify-between px-4 lg:justify-center lg:px-2"
              : "justify-between px-4",
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

          {collapsed ? (
            <div className="hidden lg:block">
              <SafariLogo />
            </div>
          ) : null}

          <button
            type="button"
            onClick={closeMobile}
            aria-label="Close navigation"
            className="safari-icon-button lg:hidden"
          >
            <X size={18} />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-2.5 py-3">
          <nav className="space-y-1">
            {sections.map(
              (section) => {
                const item =
                  section.items[0];

                if (!item) {
                  return null;
                }

                const Icon =
                  item.icon;

                const active =
                  isModuleActive(
                    location.pathname,
                    item.path,
                  );

                return (
                  <NavLink
                    key={
                      section.title
                    }
                    to={item.path}
                    end={
                      item.path ===
                      "/"
                    }
                    onClick={() =>
                      closeMobile?.()
                    }
                    title={
                      collapsed
                        ? section.title
                        : undefined
                    }
                    className={[
                      "group flex min-h-[42px] items-center rounded-xl text-[12.5px] font-semibold transition",
                      collapsed
                        ? "lg:justify-center lg:px-2"
                        : "gap-2.5 px-2.5",
                      active
                        ? "bg-[var(--safari-nav-active)] text-[var(--safari-nav-active-text)]"
                        : "text-[var(--safari-sidebar-text)] hover:bg-[var(--safari-nav-hover)] hover:text-[var(--safari-text-strong)]",
                    ].join(" ")}
                  >
                    <span
                      className={[
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                        active
                          ? "bg-[var(--safari-nav-icon-active)] text-safari-600 dark:text-safari-400"
                          : "text-[var(--safari-sidebar-icon)]",
                      ].join(" ")}
                    >
                      <Icon
                        size={16}
                        strokeWidth={1.9}
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
                      {section.title}
                    </span>
                  </NavLink>
                );
              },
            )}
          </nav>
        </div>

        <div className="shrink-0 border-t border-[var(--safari-border)] p-2.5">
          <button
            type="button"
            onClick={handleLogout}
            className={[
              "flex h-10 w-full items-center rounded-xl text-xs font-semibold text-red-500 transition hover:bg-red-50 dark:hover:bg-red-500/10",
              collapsed
                ? "lg:justify-center"
                : "gap-2.5 px-2.5",
            ].join(" ")}
          >
            <LogOut size={16} />
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

          {onToggleCollapsed ? (
            <button
              type="button"
              onClick={
                onToggleCollapsed
              }
              className={[
                "mt-1 hidden h-9 w-full items-center rounded-xl text-[11px] font-semibold text-[var(--safari-muted)] hover:bg-[var(--safari-nav-hover)] lg:flex",
                collapsed
                  ? "justify-center"
                  : "gap-2.5 px-2.5",
              ].join(" ")}
            >
              {collapsed ? (
                <ChevronRight
                  size={16}
                />
              ) : (
                <>
                  <ChevronLeft
                    size={16}
                  />
                  Collapse
                </>
              )}
            </button>
          ) : null}
        </div>
      </aside>
    </>
  );
}

function isModuleActive(
  pathname: string,
  path: string,
) {
  if (path === "/") {
    return pathname === "/";
  }

  const root =
    path
      .split("/")
      .filter(Boolean)[0];

  return root
    ? pathname.startsWith(
        `/${root}`,
      )
    : false;
}
