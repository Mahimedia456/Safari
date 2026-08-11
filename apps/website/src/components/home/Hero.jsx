import { ArrowDown } from "lucide-react";

import { HOME_ASSETS } from "../../lib/constants";

export default function Hero() {
  return (
    <section
      className="
        relative
        min-h-[760px]
        overflow-hidden
        bg-safari-black
        text-white
        md:min-h-[900px]
        lg:min-h-screen
      "
    >
      <img
        src={HOME_ASSETS.hero}
        alt="Karachi city"
        className="
          absolute
          inset-0
          h-full
          w-full
          object-cover
          object-center
        "
      />

      <div
        className="
          absolute
          inset-0
          bg-black/15
        "
      />

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-r
          from-black/70
          via-black/20
          to-black/5
        "
      />

      <div
        className="
          absolute
          inset-x-0
          bottom-0
          h-[72%]
          bg-gradient-to-t
          from-black/85
          via-black/15
          to-transparent
        "
      />

      <div
        className="
          relative
          z-10
          flex
          min-h-[760px]
          flex-col
          justify-end
          px-[var(--page-gutter)]
          pb-12
          pt-[calc(var(--header-height)+60px)]
          md:min-h-[900px]
          md:pb-16
          lg:min-h-screen
        "
      >
        <div
          className="
            grid
            gap-10
            lg:grid-cols-[minmax(0,1fr)_340px]
            lg:items-end
          "
        >
          <h1
            className="
              max-w-[1320px]
              text-[clamp(4.8rem,12vw,13rem)]
              font-semibold
              leading-[0.77]
              tracking-[-0.08em]
            "
          >
            MOVE
            <br />
            YOUR
            <br />
            CITY.
          </h1>

          <div
            className="
              max-w-[320px]
              pb-2
              lg:pb-6
            "
          >
            <p
              className="
                text-[17px]
                font-medium
                leading-[1.5]
                tracking-[-0.025em]
                text-white/90
              "
            >
              One app for the way Pakistan
              rides, eats, shops and moves.
            </p>

            <a
              href="#intro"
              className="
                mt-8
                inline-flex
                items-center
                gap-3
                text-[13px]
                font-semibold
              "
            >
              Explore Safari

              <ArrowDown
                size={16}
                strokeWidth={1.8}
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}