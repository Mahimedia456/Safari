import {
  ArrowDown,
} from "lucide-react";

import {
  ABOUT_ASSETS,
} from "../../lib/constants";

export default function AboutHero() {
  return (
    <section
      className="
        relative
        min-h-[820px]
        overflow-hidden
        bg-black
        text-white
        lg:min-h-screen
      "
    >
      <img
        src={ABOUT_ASSETS.hero}
        alt="People moving through a Pakistani city"
        className="
          absolute
          inset-0
          h-full
          w-full
          object-cover
        "
      />

      <div
        className="
          absolute
          inset-0
          bg-black/25
        "
      />

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-r
          from-black/75
          via-black/20
          to-transparent
        "
      />

      <div
        className="
          absolute
          inset-x-0
          bottom-0
          h-2/3
          bg-gradient-to-t
          from-black/75
          via-transparent
          to-transparent
        "
      />

      <div
        className="
          relative
          z-10
          flex
          min-h-[820px]
          flex-col
          justify-end
          px-[var(--page-gutter)]
          pb-12
          pt-[calc(var(--header-height)+80px)]
          lg:min-h-screen
          lg:pb-16
        "
      >
        <div
          className="
            grid
            gap-10
            lg:grid-cols-[minmax(0,1fr)_360px]
            lg:items-end
          "
        >
          <div>
            <p
              className="
                mb-8
                text-[10px]
                font-bold
                uppercase
                tracking-[0.16em]
                text-white/60
              "
            >
              About Safari
            </p>

            <h1
              className="
                max-w-[1400px]
                text-[clamp(4.6rem,11vw,12rem)]
                font-semibold
                leading-[0.79]
                tracking-[-0.08em]
              "
            >
              BUILT FOR
              <br />
              THE WAY
              <br />
              WE MOVE.
            </h1>
          </div>

          <div
            className="
              max-w-[350px]
              pb-2
            "
          >
            <p
              className="
                text-[16px]
                leading-[1.6]
                tracking-[-0.02em]
                text-white/80
              "
            >
              Safari is building a connected
              everyday platform around the
              people, businesses and cities
              of Pakistan.
            </p>

            <a
              href="#about-intro"
              className="
                mt-8
                inline-flex
                items-center
                gap-3
                text-[13px]
                font-semibold
              "
            >
              Our story

              <ArrowDown
                size={16}
                strokeWidth={1.7}
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}