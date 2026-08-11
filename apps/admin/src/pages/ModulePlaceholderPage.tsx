import {
  Construction,
} from "lucide-react";

import {
  useLocation,
} from "react-router-dom";

function createTitle(
  pathname: string,
) {
  const segment =
    pathname
      .split("/")
      .filter(Boolean)
      .at(-1);

  if (!segment) {
    return "Dashboard";
  }

  return segment
    .replace(/-/g, " ")
    .split(" ")
    .map(
      (word) =>
        word.charAt(0)
          .toUpperCase() +
        word.slice(1),
    )
    .join(" ");
}

export default function ModulePlaceholderPage() {
  const location =
    useLocation();

  const title =
    createTitle(
      location.pathname,
    );

  return (
    <div>
      <div className="mb-8">
        <div
          className="
            text-sm
            font-semibold

            text-safari-600

            dark:text-safari-400
          "
        >
          Safari
        </div>

        <h1
          className="
            mt-1

            text-3xl
            font-bold
            tracking-tight

            text-slate-950

            dark:text-white
          "
        >
          {title}
        </h1>
      </div>

      <section
        className="
          safari-card

          flex
          min-h-[430px]
          items-center
          justify-center

          p-8
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
              mx-auto

              flex h-12 w-12
              items-center
              justify-center

              rounded-xl

              bg-safari-50

              text-safari-600

              dark:bg-safari-500/10
              dark:text-safari-400
            "
          >
            <Construction
              size={22}
            />
          </div>

          <h2
            className="
              mt-4

              text-lg
              font-semibold

              text-slate-900

              dark:text-white
            "
          >
            {title}
          </h2>

          <p
            className="
              mt-2

              text-sm
              leading-6

              text-slate-500

              dark:text-slate-400
            "
          >
            The foundation and route are
            ready. This module will be
            implemented in its dedicated
            Safari development phase.
          </p>
        </div>
      </section>
    </div>
  );
}