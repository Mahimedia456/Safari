import {
  Headphones,
  MapPin,
  ShieldCheck,
} from "lucide-react";

import SectionLabel from "../common/SectionLabel";

const items = [
  {
    icon: MapPin,
    title: "Know your journey.",
    text:
      "Clear pickup, route and trip information from beginning to end.",
  },

  {
    icon: ShieldCheck,
    title: "Designed for confidence.",
    text:
      "Safety tools designed around passengers and drivers.",
  },

  {
    icon: Headphones,
    title: "Support when needed.",
    text:
      "Access help and support throughout the Safari experience.",
  },
];

export default function SafetyStory() {
  return (
    <section
      id="safety"
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
        <SectionLabel number="05">
          Safety
        </SectionLabel>

        <h2
          className="
            mt-14
            max-w-[1450px]
            text-[clamp(4rem,9vw,10rem)]
            font-semibold
            leading-[0.83]
            tracking-[-0.075em]
          "
        >
          BUILT AROUND
          <br />
          EVERY JOURNEY.
        </h2>

        <div
          className="
            mt-24
            grid
            border-t
            border-black/15
            lg:grid-cols-3
          "
        >
          {items.map(
            ({
              icon: Icon,
              title,
              text,
            }) => (
              <article
                key={title}
                className="
                  border-b
                  border-black/15
                  py-9
                  lg:border-b-0
                  lg:border-r
                  lg:px-8
                  lg:first:pl-0
                  lg:last:border-r-0
                "
              >
                <Icon
                  size={25}
                  strokeWidth={1.4}
                />

                <h3
                  className="
                    mt-16
                    text-2xl
                    font-semibold
                    tracking-[-0.04em]
                  "
                >
                  {title}
                </h3>

                <p
                  className="
                    mt-4
                    max-w-[330px]
                    text-[14px]
                    leading-[1.65]
                    text-black/55
                  "
                >
                  {text}
                </p>
              </article>
            ),
          )}
        </div>
      </div>
    </section>
  );
}