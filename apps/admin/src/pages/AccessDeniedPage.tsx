import {
  ShieldX,
} from "lucide-react";

import {
  Link,
} from "react-router-dom";

export default function AccessDeniedPage() {
  return (
    <div
      className="
        flex min-h-[calc(100vh-150px)]
        items-center
        justify-center
      "
    >
      <div
        className="
          w-full
          max-w-md
          text-center
        "
      >
        <div
          className="
            mx-auto

            flex h-14 w-14
            items-center
            justify-center

            rounded-2xl

            bg-red-50

            text-red-600

            dark:bg-red-500/10
            dark:text-red-400
          "
        >
          <ShieldX size={25} />
        </div>

        <h1
          className="
            mt-5

            text-2xl
            font-bold

            text-slate-950

            dark:text-white
          "
        >
          Access denied
        </h1>

        <p
          className="
            mt-2

            text-sm
            leading-6

            text-slate-500

            dark:text-slate-400
          "
        >
          Your Safari account does not
          have permission to access this
          module.
        </p>

        <Link
          to="/"
          className="
            mt-6

            inline-flex h-11
            items-center
            justify-center

            rounded-xl

            bg-safari-600

            px-5

            text-sm
            font-semibold

            text-white

            transition

            hover:bg-safari-700
          "
        >
          Back to dashboard
        </Link>
      </div>
    </div>
  );
}