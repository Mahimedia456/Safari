import {
  useState,
} from "react";

import {
  Outlet,
} from "react-router-dom";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function AdminLayout() {
  const [
    mobileSidebarOpen,
    setMobileSidebarOpen,
  ] = useState(false);

  const [
    sidebarCollapsed,
    setSidebarCollapsed,
  ] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--safari-page)] text-[var(--safari-text)] transition-colors duration-300">
      <Sidebar
        mobileOpen={
          mobileSidebarOpen
        }
        onCloseMobile={() =>
          setMobileSidebarOpen(
            false,
          )
        }
        collapsed={
          sidebarCollapsed
        }
        onToggleCollapsed={() =>
          setSidebarCollapsed(
            (current) =>
              !current,
          )
        }
      />

      <div
        className={[
          "min-h-screen transition-[padding] duration-300 ease-out",

          sidebarCollapsed
            ? "lg:pl-[88px]"
            : "lg:pl-[272px]",
        ].join(" ")}
      >
        <Topbar
          onMenuClick={() =>
            setMobileSidebarOpen(
              true,
            )
          }
        />

        <main className="min-h-[calc(100vh-76px)]">
          <div className="mx-auto w-full max-w-[1800px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8 xl:px-9">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}