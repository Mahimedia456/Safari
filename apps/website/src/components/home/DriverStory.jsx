import SectionLabel from "../common/SectionLabel";

import { HOME_ASSETS } from "../../lib/constants";

export default function DriverStory() {
  return (
    <section
      id="drive"
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
        <SectionLabel number="04">
          Drive with Safari
        </SectionLabel>

        <div
          className="
            mt-14
            grid
            gap-14
            lg:grid-cols-[0.82fr_1.18fr]
          "
        >
          <div
            className="
              flex
              flex-col
              justify-between
            "
          >
            <h2
              className="
                text-[clamp(4.2rem,8vw,9rem)]
                font-semibold
                leading-[0.8]
                tracking-[-0.075em]
              "
            >
              DRIVE
              <br />
              YOUR
              <br />
              WAY.
            </h2>

            <div
              className="
                mt-16
                border-t
                border-black/15
                pt-6
              "
            >
              <p
                className="
                  max-w-[440px]
                  text-[15px]
                  leading-[1.65]
                  text-black/60
                "
              >
                Choose when you drive and
                build opportunity around your
                own schedule.
              </p>

              <a
                href="#"
                className="
                  mt-8
                  inline-block
                  border-b
                  border-black
                  pb-1
                  text-[13px]
                  font-semibold
                "
              >
                Become a driver
              </a>
            </div>
          </div>

          <div
            className="
              relative
              min-h-[650px]
              overflow-hidden
              lg:min-h-[860px]
            "
          >
            <img
              src={HOME_ASSETS.driver}
              alt="Safari driver"
              className="
                absolute
                inset-0
                h-full
                w-full
                object-cover
              "
            />
          </div>
        </div>
      </div>
    </section>
  );
}