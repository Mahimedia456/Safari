import { ArrowUpRight } from "lucide-react";

import SectionLabel from "../common/SectionLabel";

import { SERVICES } from "../../lib/constants";

function ServicePanel({
  service,
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
        bg-white
      "
      style={{
        zIndex: 20 + index,
      }}
    >
      <div
        className="
          grid
          h-full
          lg:grid-cols-[0.42fr_0.58fr]
        "
      >
        <div
          className="
            relative
            flex
            flex-col
            justify-between
            bg-white
            px-[var(--page-gutter)]
            py-10
            lg:py-14
          "
        >
          <div
            className="
              flex
              items-start
              justify-between
              border-t
              border-black/15
              pt-5
            "
          >
            <span
              className="
                text-[11px]
                font-semibold
                text-black/40
              "
            >
              {service.number}
            </span>

            <span
              className="
                max-w-[180px]
                text-right
                text-[10px]
                font-bold
                uppercase
                tracking-[0.14em]
              "
            >
              {service.eyebrow}
            </span>
          </div>

          <div>
            <h3
              className="
                text-[clamp(4.5rem,9vw,9.5rem)]
                font-semibold
                leading-[0.78]
                tracking-[-0.075em]
              "
            >
              {service.title}
            </h3>

            <div
              className="
                mt-8
                grid
                gap-6
                border-t
                border-black/15
                pt-6
                sm:grid-cols-[1fr_auto]
                sm:items-end
              "
            >
              <p
                className="
                  max-w-[430px]
                  text-[15px]
                  leading-[1.6]
                  tracking-[-0.02em]
                  text-black/60
                "
              >
                {service.description}
              </p>

              <div
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-black/20
                "
              >
                <ArrowUpRight
                  size={18}
                  strokeWidth={1.6}
                />
              </div>
            </div>
          </div>
        </div>

        <div
          className="
            relative
            min-h-[420px]
            overflow-hidden
            bg-neutral-200
          "
        >
          <img
            src={service.image}
            alt={service.title}
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
              transition-transform
              duration-[1400ms]
              ease-out
              hover:scale-[1.025]
            "
          />

          <div
            className="
              absolute
              inset-0
              bg-gradient-to-t
              from-black/25
              via-transparent
              to-black/5
            "
          />

          <div
            className="
              absolute
              bottom-7
              right-7
              text-right
              text-[10px]
              font-bold
              uppercase
              tracking-[0.16em]
              text-white
            "
          >
            Safari / {service.title}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function ServicesStory() {
  return (
    <section
      id="services"
      className="
        relative
        bg-white
      "
    >
      <div
        className="
          relative
          z-10
          bg-white
          px-[var(--page-gutter)]
          pb-24
          pt-[var(--section-space)]
        "
      >
        <SectionLabel number="01">
          Everything around you
        </SectionLabel>

        <div
          className="
            mt-14
            grid
            gap-12
            lg:grid-cols-[minmax(0,1fr)_340px]
            lg:items-end
          "
        >
          <h2
            className="
              text-[clamp(4rem,8.5vw,9.5rem)]
              font-semibold
              leading-[0.83]
              tracking-[-0.075em]
            "
          >
            MORE
            <br />
            OF YOUR
            <br />
            CITY.
          </h2>

          <div>
            <p
              className="
                max-w-[330px]
                text-[15px]
                leading-[1.6]
                text-black/60
              "
            >
              Scroll through the Safari
              experience. Each part of your
              day stays connected in one app.
            </p>

            <p
              className="
                mt-5
                text-[10px]
                font-bold
                uppercase
                tracking-[0.15em]
                text-black/35
              "
            >
              Scroll to explore ↓
            </p>
          </div>
        </div>
      </div>

      <div>
        {SERVICES.map(
          (service, index) => (
            <ServicePanel
              key={service.id}
              service={service}
              index={index}
            />
          ),
        )}
      </div>
    </section>
  );
}