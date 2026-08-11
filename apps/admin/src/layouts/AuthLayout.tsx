import {
  Outlet,
} from "react-router-dom";

import SafariLogo from "../components/branding/SafariLogo";
import ThemeToggle from "../components/ui/ThemeToggle";

export default function AuthLayout() {
  return (
    <div
      className="
        min-h-screen

        bg-[#f6f7f9]

        dark:bg-[#090a0c]
      "
    >
      <header
        className="
          mx-auto
          flex h-20
          max-w-[1600px]
          items-center
          justify-between

          px-5

          sm:px-8
          lg:px-12
        "
      >
        <SafariLogo />

        <ThemeToggle />
      </header>

      <main
        className="
          flex
          min-h-[calc(100vh-80px)]
          items-center
          justify-center

          px-5
          pb-14
          pt-5
        "
      >
        <Outlet />
      </main>
    </div>
  );
}