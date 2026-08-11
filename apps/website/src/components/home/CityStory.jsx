import { CITIES } from "../../lib/constants";

import SectionLabel from "../common/SectionLabel";

function CityPanel({
  city,
  index,
}) {
  return (
    <article
      className="
        sticky
        top-[var(--header-height)]
        h-[calc(100vh-var(--header-height))]
        min-h-[680px]
        overflow-hidden
        bg-black
        text-white
      "
      style={{
        zIndex: 50 + index,
      }}
    >
      <img
        src={city.image}
        alt={`${city.name}, Pakistan`}
        loading={
          index === 0
            ? "eager"
            : "lazy"
        }
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
          bg-black/20
        "
      />

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-t
          from-black/90
          via-black/10
          to-black/10
        "
      />

      <div
        className="
          relative
          z-10
          flex
          h-full
          flex-col
          justify-between
          px-[var(--page-gutter)]
          py-10
          lg:py-14
        "
      >
        <div
          className="
            flex
            items-center
            justify-between
            border-t
            border-white/30
            pt-5
          "
        >
          <span
            className="
              text-[11px]
              font-semibold
            "
          >
            {city.number}
          </span>

          <span
            className="
              text-[10px]
              font-bold
              uppercase
              tracking-[0.15em]
            "
          >
            Safari Pakistan
          </span>
        </div>

        <div>
          <p
            className="
              mb-4
              text-[13px]
              font-medium
              text-white/70
            "
          >
            {city.line}
          </p>

          <h3
            className="
              text-[clamp(4.8rem,13vw,14rem)]
              font-semibold
              uppercase
              leading-[0.76]
              tracking-[-0.08em]
            "
          >
            {city.name}.
          </h3>
        </div>
      </div>
    </article>
  );
}

export default function CityStory() {
  return (
    <section
      className="
        relative
        bg-black
      "
    >
      <div
        className="
          relative
          z-10
          bg-black
          px-[var(--page-gutter)]
          pb-24
          pt-[var(--section-space)]
          text-white
        "
      >
        <SectionLabel number="06">
          Made for Pakistan
        </SectionLabel>

        <div
          className="
            mt-14
            grid
            gap-12
            lg:grid-cols-[minmax(0,1fr)_350px]
            lg:items-end
          "
        >
          <h2
            className="
              text-[clamp(4rem,9vw,10rem)]
              font-semibold
              leading-[0.82]
              tracking-[-0.075em]
            "
          >
            YOUR CITY.
            <br />
            YOUR SAFARI.
          </h2>

          <p
            className="
              max-w-[340px]
              text-[15px]
              leading-[1.65]
              text-white/55
            "
          >
            Built around the rhythm,
            neighbourhoods and everyday
            movement of Pakistan.
          </p>
        </div>
      </div>

      {CITIES.map(
        (city, index) => (
          <CityPanel
            key={city.name}
            city={city}
            index={index}
          />
        ),
      )}
    </section>
  );
}