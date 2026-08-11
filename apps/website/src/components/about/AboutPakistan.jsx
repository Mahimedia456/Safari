import {
  ABOUT_ASSETS,
} from "../../lib/constants";

import SectionLabel from "../common/SectionLabel";

export default function AboutPakistan() {
  return (
    <>
      <section
        className="
          bg-safari-cream
          py-[var(--section-space)]
        "
      >
        <div
          className="
            px-[var(--page-gutter)]
          "
        >
          <SectionLabel number="05">
            Opportunity
          </SectionLabel>

          <div
            className="
              mt-14
              grid
              gap-14
              lg:grid-cols-[1.05fr_0.95fr]
            "
          >
            <div
              className="
                relative
                min-h-[620px]
                overflow-hidden
                lg:min-h-[860px]
              "
            >
              <img
                src={ABOUT_ASSETS.driver}
                alt="Professional driver in Pakistan"
                className="
                  absolute
                  inset-0
                  h-full
                  w-full
                  object-cover
                "
              />
            </div>

            <div
              className="
                flex
                flex-col
                justify-between
              "
            >
              <h2
                className="
                  text-[clamp(3.8rem,7vw,8rem)]
                  font-semibold
                  leading-[0.83]
                  tracking-[-0.07em]
                "
              >
                MOVEMENT
                <br />
                CREATES
                <br />
                OPPORTUNITY.
              </h2>

              <p
                className="
                  mt-16
                  max-w-[520px]
                  border-t
                  border-black/15
                  pt-7
                  text-[15px]
                  leading-[1.7]
                  text-black/60
                "
              >
                A better city platform should
                work for everyone around it —
                passengers, drivers,
                merchants, professionals and
                neighbourhood businesses.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        className="
          relative
          min-h-[760px]
          overflow-hidden
          bg-black
          text-white
          lg:min-h-screen
        "
      >
        <img
          src={ABOUT_ASSETS.pakistan}
          alt="Modern Pakistan"
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
            bg-black/30
          "
        />

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-black/90
            via-black/15
            to-black/15
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
            py-14
            lg:min-h-screen
          "
        >
          <p
            className="
              mb-7
              text-[10px]
              font-bold
              uppercase
              tracking-[0.16em]
              text-white/55
            "
          >
            Built in Pakistan
          </p>

          <h2
            className="
              max-w-[1500px]
              text-[clamp(4.2rem,10vw,11rem)]
              font-semibold
              leading-[0.8]
              tracking-[-0.078em]
            "
          >
            MADE FOR
            <br />
            WHAT COMES
            <br />
            NEXT.
          </h2>
        </div>
      </section>
    </>
  );
}