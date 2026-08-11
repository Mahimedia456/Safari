import {
  ABOUT_VALUES,
} from "../../lib/constants";

import SectionLabel from "../common/SectionLabel";

export default function AboutValues() {
  return (
    <section
      className="
        bg-white
        px-[var(--page-gutter)]
        py-[var(--section-space)]
      "
    >
      <div
        className="
          mx-auto
          max-w-[1800px]
        "
      >
        <SectionLabel number="04">
          What guides us
        </SectionLabel>

        <h2
          className="
            mt-14
            max-w-[1300px]
            text-[clamp(4rem,8.5vw,9rem)]
            font-semibold
            leading-[0.83]
            tracking-[-0.075em]
          "
        >
          THE PRINCIPLES
          <br />
          WE MOVE BY.
        </h2>

        <div
          className="
            mt-24
            border-t
            border-black/15
          "
        >
          {ABOUT_VALUES.map((value) => (
            <article
              key={value.number}
              className="
                grid
                gap-6
                border-b
                border-black/15
                py-9
                md:grid-cols-[80px_0.8fr_1.2fr]
                md:items-start
              "
            >
              <span
                className="
                  text-[11px]
                  font-semibold
                  text-black/35
                "
              >
                {value.number}
              </span>

              <h3
                className="
                  text-[clamp(1.8rem,3vw,3.6rem)]
                  font-semibold
                  leading-none
                  tracking-[-0.055em]
                "
              >
                {value.title}
              </h3>

              <p
                className="
                  max-w-[580px]
                  text-[15px]
                  leading-[1.7]
                  text-black/55
                "
              >
                {value.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}