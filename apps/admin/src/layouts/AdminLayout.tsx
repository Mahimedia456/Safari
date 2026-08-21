import {
  useState,
} from "react";

import {
  Outlet,
} from "react-router-dom";

import AdminDataBootstrap from "../components/app/AdminDataBootstrap";

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
    <AdminDataBootstrap>
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
              ? "lg:pl-[76px]"
              : "lg:pl-[232px]",
          ].join(" ")}
        >
          <Topbar
            onMenuClick={() =>
              setMobileSidebarOpen(
                true,
              )
            }
          />

          <main className="min-h-[calc(100vh-116px)]">
            <div className="mx-auto w-full max-w-[1800px] px-4 py-5 sm:px-6 lg:px-7 lg:py-6 xl:px-8">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </AdminDataBootstrap>
  );
}
