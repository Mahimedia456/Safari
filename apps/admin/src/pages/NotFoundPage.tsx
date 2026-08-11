import {
  ArrowLeft,
} from "lucide-react";

import {
  Link,
} from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div
      className="
        flex min-h-screen
        items-center
        justify-center

        bg-[#f6f7f9]

        px-5

        dark:bg-[#090a0c]
      "
    >
      <div
        className="
          max-w-md
          text-center
        "
      >
        <div
          className="
            text-7xl
            font-black

            tracking-tight

            text-safari-600
          "
        >
          404
        </div>

        <h1
          className="
            mt-4

            text-2xl
            font-bold

            text-slate-950

            dark:text-white
          "
        >
          Page not found
        </h1>

        <p
          className="
            mt-2

            text-sm

            text-slate-500

            dark:text-slate-400
          "
        >
          The Safari page you requested
          does not exist.
        </p>

        <Link
          to="/"
          className="
            mt-6

            inline-flex h-11
            items-center
            gap-2

            rounded-xl

            bg-safari-600

            px-5

            text-sm
            font-semibold

            text-white

            hover:bg-safari-700
          "
        >
          <ArrowLeft size={17} />

          Dashboard
        </Link>
      </div>
    </div>
  );
}