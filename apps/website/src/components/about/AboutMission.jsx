import {
  ABOUT_ASSETS,
} from "../../lib/constants";

import SectionLabel from "../common/SectionLabel";

export default function AboutMission() {
  return (
    <section
      className="
        bg-white
        py-[var(--section-space)]
      "
    >
      <div
        className="
          px-[var(--page-gutter)]
        "
      >
        <SectionLabel number="02">
          Our mission
        </SectionLabel>

        <div
          className="
            mt-14
            grid
            gap-14
            lg:grid-cols-[0.8fr_1.2fr]
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
                text-[clamp(3.8rem,7vw,8rem)]
                font-semibold
                leading-[0.84]
                tracking-[-0.07em]
              "
            >
              CONNECT
              <br />
              MORE OF
              <br />
              EVERYDAY
              <br />
              LIFE.
            </h2>

            <p
              className="
                mt-16
                max-w-[470px]
                border-t
                border-black/15
                pt-7
                text-[15px]
                leading-[1.7]
                text-black/60
              "
            >
              Safari brings mobility,
              deliveries and local services
              together so everyday tasks can
              happen with less friction and
              greater confidence.
            </p>
          </div>

          <div
            className="
              relative
              min-h-[650px]
              overflow-hidden
              lg:min-h-[900px]
            "
          >
            <img
              src={ABOUT_ASSETS.city}
              alt="Everyday city life in Pakistan"
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