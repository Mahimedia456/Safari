import {
  ArrowDown,
  ArrowRight,
  CarFront,
  Check,
  Clock3,
  LocateFixed,
  MapPin,
  Navigation,
  ReceiptText,
  ShieldCheck,
  Star,
} from "lucide-react";

import PageShell from "../components/layout/PageShell";
import PageSectionLabel from "../components/shared/PageSectionLabel";
import ProductDownloadCTA from "../components/shared/ProductDownloadCTA";

const rideSteps = [
  {
    number: "01",
    title: "Choose your pickup.",
    description:
      "Use your current location or select the place where you want the driver to meet you.",
    icon: LocateFixed,
  },
  {
    number: "02",
    title: "Tell us where you're going.",
    description:
      "Search for your destination and review the journey before confirming.",
    icon: MapPin,
  },
  {
    number: "03",
    title: "Choose your ride.",
    description:
      "Compare available ride categories and select the experience that fits your journey.",
    icon: CarFront,
  },
  {
    number: "04",
    title: "Follow the journey.",
    description:
      "Stay informed from driver matching and pickup through arrival and trip completion.",
    icon: Navigation,
  },
];

const rideFeatures = [
  {
    icon: Clock3,
    title: "Clear arrival updates",
    description:
      "See important timing and driver-arrival information throughout the pickup experience.",
  },
  {
    icon: Navigation,
    title: "Live journey visibility",
    description:
      "Follow movement and route information during your active journey.",
  },
  {
    icon: ShieldCheck,
    title: "Safety access",
    description:
      "Relevant safety and support actions remain available during your ride.",
  },
  {
    icon: ReceiptText,
    title: "Trip records",
    description:
      "Review previous journeys, ratings and receipt information from your activity.",
  },
];

function RideHero() {
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
        src="/images/ride/ride-hero.png"
        alt="Safari vehicle moving through a Pakistani city"
        className="
          absolute
          inset-0
          h-full
          w-full
          object-cover
        "
      />

      <div className="absolute inset-0 bg-black/25" />

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-r
          from-black/85
          via-black/25
          to-transparent
        "
      />

      <div
        className="
          absolute
          inset-x-0
          bottom-0
          h-[70%]
          bg-gradient-to-t
          from-black/80
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
            gap-12
            lg:grid-cols-[minmax(0,1fr)_380px]
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
              Safari Ride
            </p>

            <h1
              className="
                text-[clamp(5rem,12vw,13rem)]
                font-semibold
                leading-[0.76]
                tracking-[-0.082em]
              "
            >
              YOUR CITY.
              <br />
              YOUR WAY.
            </h1>
          </div>

          <div className="max-w-[370px]">
            <p
              className="
                text-[16px]
                leading-[1.65]
                text-white/75
              "
            >
              Request everyday rides with a
              clear pickup experience, live
              journey information and support
              built around every trip.
            </p>

            <a
              href="#how-rides-work"
              className="
                mt-8
                inline-flex
                items-center
                gap-3
                text-[13px]
                font-semibold
              "
            >
              See how it works

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

function RideIntro() {
  return (
    <section
      className="
        bg-safari-cream
        px-[var(--page-gutter)]
        py-[var(--section-space)]
      "
    >
      <div className="mx-auto max-w-[1800px]">
        <PageSectionLabel number="01">
          Designed for everyday movement
        </PageSectionLabel>

        <h2
          className="
            mt-14
            max-w-[1500px]
            text-[clamp(4rem,9vw,10rem)]
            font-semibold
            leading-[0.83]
            tracking-[-0.075em]
          "
        >
          FROM WHERE
          <br />
          YOU ARE TO
          <br />
          WHERE YOU GO.
        </h2>

        <div
          className="
            mt-20
            grid
            gap-12
            border-t
            border-black/15
            pt-9
            lg:grid-cols-2
          "
        >
          <p
            className="
              text-[10px]
              font-bold
              uppercase
              tracking-[0.15em]
              text-black/40
            "
          >
            Safari Ride
          </p>

          <p
            className="
              max-w-[760px]
              text-[clamp(1.35rem,2.1vw,2.2rem)]
              font-medium
              leading-[1.45]
              tracking-[-0.035em]
            "
          >
            A ride experience should make the
            journey easier to understand — from
            selecting a pickup to arriving at
            your destination.
          </p>
        </div>
      </div>
    </section>
  );
}

function RideHowItWorks() {
  return (
    <section
      id="how-rides-work"
      className="
        bg-white
        px-[var(--page-gutter)]
        py-[var(--section-space)]
      "
    >
      <div className="mx-auto max-w-[1800px]">
        <PageSectionLabel number="02">
          How it works
        </PageSectionLabel>

        <div
          className="
            mt-14
            grid
            gap-16
            lg:grid-cols-[0.9fr_1.1fr]
          "
        >
          <div>
            <h2
              className="
                text-[clamp(4rem,7.5vw,8.5rem)]
                font-semibold
                leading-[0.83]
                tracking-[-0.072em]
              "
            >
              FOUR
              <br />
              SIMPLE
              <br />
              STEPS.
            </h2>

            <p
              className="
                mt-10
                max-w-[490px]
                text-[15px]
                leading-[1.7]
                text-black/55
              "
            >
              Safari keeps the important decisions
              visible and the journey easy to
              follow.
            </p>
          </div>

          <div className="border-t border-black/15">
            {rideSteps.map((step) => {
              const Icon = step.icon;

              return (
                <article
                  key={step.number}
                  className="
                    grid
                    gap-6
                    border-b
                    border-black/15
                    py-8
                    md:grid-cols-[60px_55px_1fr]
                  "
                >
                  <span className="text-[11px] font-semibold text-black/35">
                    {step.number}
                  </span>

                  <Icon
                    size={22}
                    strokeWidth={1.4}
                  />

                  <div>
                    <h3
                      className="
                        text-[clamp(1.6rem,2.5vw,2.8rem)]
                        font-semibold
                        leading-none
                        tracking-[-0.05em]
                      "
                    >
                      {step.title}
                    </h3>

                    <p
                      className="
                        mt-4
                        max-w-[590px]
                        text-[14px]
                        leading-[1.7]
                        text-black/55
                      "
                    >
                      {step.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function RidePickup() {
  return (
    <section className="bg-safari-black text-white">
      <div className="grid lg:grid-cols-2">
        <div
          className="
            relative
            min-h-[580px]
            lg:min-h-[900px]
          "
        >
          <img
            src="/images/ride/ride-pickup.png"
            alt="Passenger meeting a Safari driver"
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
            px-[var(--page-gutter)]
            py-[var(--section-space)]
          "
        >
          <PageSectionLabel
            number="03"
            light
          >
            A clearer pickup
          </PageSectionLabel>

          <div className="mt-24">
            <h2
              className="
                text-[clamp(4rem,7vw,8rem)]
                font-semibold
                leading-[0.82]
                tracking-[-0.072em]
              "
            >
              KNOW
              <br />
              WHAT TO
              <br />
              EXPECT.
            </h2>

            <p
              className="
                mt-10
                max-w-[570px]
                text-[16px]
                leading-[1.7]
                text-white/60
              "
            >
              Driver, vehicle, location and
              arrival details are presented
              clearly so both sides can find
              each other with less friction.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function RideJourney() {
  return (
    <section
      className="
        bg-white
        px-[var(--page-gutter)]
        py-[var(--section-space)]
      "
    >
      <div className="mx-auto max-w-[1800px]">
        <PageSectionLabel number="04">
          During your journey
        </PageSectionLabel>

        <div
          className="
            mt-14
            grid
            gap-14
            lg:grid-cols-[0.9fr_1.1fr]
          "
        >
          <div
            className="
              relative
              min-h-[620px]
              overflow-hidden
              lg:min-h-[820px]
            "
          >
            <img
              src="/images/ride/ride-journey.png"
              alt="Passenger travelling through the city"
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
                text-[clamp(4rem,7vw,8rem)]
                font-semibold
                leading-[0.82]
                tracking-[-0.072em]
              "
            >
              STAY
              <br />
              INFORMED.
              <br />
              KEEP
              <br />
              MOVING.
            </h2>

            <div
              className="
                mt-16
                border-t
                border-black/15
              "
            >
              {[
                "Journey and route information",
                "Driver and vehicle details",
                "Contextual support access",
                "Trip completion and rating",
              ].map((item) => (
                <div
                  key={item}
                  className="
                    flex
                    items-center
                    gap-4
                    border-b
                    border-black/15
                    py-5
                    text-[14px]
                    font-medium
                  "
                >
                  <Check
                    size={16}
                    strokeWidth={1.8}
                    className="text-safari-green"
                  />

                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function RideFeatureGrid() {
  return (
    <section
      className="
        bg-safari-green
        px-[var(--page-gutter)]
        py-[var(--section-space)]
        text-white
      "
    >
      <div className="mx-auto max-w-[1800px]">
        <PageSectionLabel
          number="05"
          light
        >
          Built into every trip
        </PageSectionLabel>

        <h2
          className="
            mt-14
            max-w-[1400px]
            text-[clamp(4rem,8.5vw,9.5rem)]
            font-semibold
            leading-[0.82]
            tracking-[-0.075em]
          "
        >
          THE DETAILS
          <br />
          THAT KEEP
          <br />
          YOU MOVING.
        </h2>

        <div
          className="
            mt-24
            grid
            border-t
            border-white/20
            md:grid-cols-2
            xl:grid-cols-4
          "
        >
          {rideFeatures.map((feature) => {
            const Icon = feature.icon;

            return (
              <article
                key={feature.title}
                className="
                  min-h-[340px]
                  border-b
                  border-white/20
                  py-9
                  md:px-7
                  md:odd:border-r
                  xl:border-r
                  xl:last:border-r-0
                "
              >
                <Icon
                  size={27}
                  strokeWidth={1.35}
                />

                <div className="mt-28">
                  <h3
                    className="
                      text-[25px]
                      font-semibold
                      leading-none
                      tracking-[-0.05em]
                    "
                  >
                    {feature.title}
                  </h3>

                  <p
                    className="
                      mt-5
                      text-[14px]
                      leading-[1.7]
                      text-white/60
                    "
                  >
                    {feature.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function RideClosing() {
  return (
    <section
      className="
        relative
        min-h-[760px]
        overflow-hidden
        bg-black
        text-white
      "
    >
      <img
        src="/images/ride/ride-city.png"
        alt="Traffic and movement in Pakistan"
        className="
          absolute
          inset-0
          h-full
          w-full
          object-cover
        "
      />

      <div className="absolute inset-0 bg-black/40" />

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-t
          from-black/90
          via-black/15
          to-black/10
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
        "
      >
        <div
          className="
            grid
            gap-12
            lg:grid-cols-[minmax(0,1fr)_340px]
            lg:items-end
          "
        >
          <h2
            className="
              text-[clamp(4.2rem,9vw,10rem)]
              font-semibold
              leading-[0.8]
              tracking-[-0.078em]
            "
          >
            EVERY ROAD
            <br />
            STARTS
            <br />
            SOMEWHERE.
          </h2>

          <a
            href="/safety"
            className="
              inline-flex
              items-center
              gap-3
              text-[13px]
              font-semibold
            "
          >
            Explore ride safety

            <ArrowRight
              size={17}
              strokeWidth={1.7}
            />
          </a>
        </div>
      </div>
    </section>
  );
}

export default function RidePage() {
  return (
    <PageShell>
      <RideHero />
      <RideIntro />
      <RideHowItWorks />
      <RidePickup />
      <RideJourney />
      <RideFeatureGrid />
      <RideClosing />

      <ProductDownloadCTA
        eyebrow="Book with Safari"
        title={"YOUR NEXT\nRIDE STARTS\nHERE."}
        description="Request rides, follow your journey and keep your trip activity together in Safari."
      />
    </PageShell>
  );
}