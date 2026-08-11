import {
  AlertTriangle,
  ArrowDown,
  BadgeCheck,
  BellRing,
  CarFront,
  Check,
  Headphones,
  MapPinned,
  MessageCircleMore,
  PhoneCall,
  ShieldCheck,
  UserCheck,
} from "lucide-react";

import PageShell from "../components/layout/PageShell";
import PageSectionLabel from "../components/shared/PageSectionLabel";
import ProductDownloadCTA from "../components/shared/ProductDownloadCTA";

const safetyPrinciples = [
  {
    icon: UserCheck,
    title: "Know who you're travelling with",
    description:
      "Relevant profile, vehicle and journey information should remain clear throughout the experience.",
  },
  {
    icon: MapPinned,
    title: "Understand your journey",
    description:
      "Pickup, destination and active-trip information help keep movement visible.",
  },
  {
    icon: BellRing,
    title: "Access important actions",
    description:
      "Safety and support actions should be reachable from the moments where they matter.",
  },
  {
    icon: Headphones,
    title: "Reach human support",
    description:
      "When something needs attention, Safari is designed to guide users toward relevant help.",
  },
];

const supportItems = [
  {
    icon: MessageCircleMore,
    title: "Contextual help",
    description:
      "Support information can be connected to the ride, order or account activity involved.",
  },
  {
    icon: PhoneCall,
    title: "Escalation paths",
    description:
      "Serious or urgent concerns should have clear routes for escalation and review.",
  },
  {
    icon: AlertTriangle,
    title: "Incident reporting",
    description:
      "Users should be able to explain what happened and provide relevant journey details.",
  },
];

function SafetyHero() {
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
        src="/images/safety/safety-hero.png"
        alt="Safe and comfortable city journey"
        className="
          absolute
          inset-0
          h-full
          w-full
          object-cover
        "
      />

      <div className="absolute inset-0 bg-black/30" />

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
          h-[65%]
          bg-gradient-to-t
          from-black/85
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
              Safari Safety
            </p>

            <h1
              className="
                text-[clamp(4.7rem,11vw,12rem)]
                font-semibold
                leading-[0.77]
                tracking-[-0.082em]
              "
            >
              CONFIDENCE
              <br />
              IN EVERY
              <br />
              JOURNEY.
            </h1>
          </div>

          <div>
            <p
              className="
                text-[16px]
                leading-[1.65]
                text-white/75
              "
            >
              Safety influences how journeys,
              people, information and support
              come together across Safari.
            </p>

            <a
              href="#safety-principles"
              className="
                mt-8
                inline-flex
                items-center
                gap-3
                text-[13px]
                font-semibold
              "
            >
              Explore our approach

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

function SafetyIntro() {
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
          Our approach
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
          SAFETY IS
          <br />
          PART OF THE
          <br />
          EXPERIENCE.
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
            More than a feature
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
            Confidence begins with clear
            information, responsible platform
            design and access to support when a
            situation needs attention.
          </p>
        </div>
      </div>
    </section>
  );
}

function SafetyPrinciples() {
  return (
    <section
      id="safety-principles"
      className="
        bg-white
        px-[var(--page-gutter)]
        py-[var(--section-space)]
      "
    >
      <div className="mx-auto max-w-[1800px]">
        <PageSectionLabel number="02">
          Across every journey
        </PageSectionLabel>

        <h2
          className="
            mt-14
            max-w-[1350px]
            text-[clamp(4rem,8vw,9rem)]
            font-semibold
            leading-[0.82]
            tracking-[-0.075em]
          "
        >
          CLEARER
          <br />
          INFORMATION.
          <br />
          BETTER
          <br />
          DECISIONS.
        </h2>

        <div
          className="
            mt-24
            grid
            border-t
            border-black/15
            md:grid-cols-2
            xl:grid-cols-4
          "
        >
          {safetyPrinciples.map((principle) => {
            const Icon = principle.icon;

            return (
              <article
                key={principle.title}
                className="
                  min-h-[370px]
                  border-b
                  border-black/15
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
                      text-[24px]
                      font-semibold
                      leading-[1.05]
                      tracking-[-0.05em]
                    "
                  >
                    {principle.title}
                  </h3>

                  <p
                    className="
                      mt-5
                      text-[14px]
                      leading-[1.7]
                      text-black/55
                    "
                  >
                    {principle.description}
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

function PassengerSafety() {
  return (
    <section className="bg-safari-black text-white">
      <div className="grid lg:grid-cols-2">
        <div
          className="
            relative
            min-h-[600px]
            lg:min-h-[900px]
          "
        >
          <img
            src="/images/safety/safety-passenger.png"
            alt="Passenger travelling comfortably"
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
            Passenger safety
          </PageSectionLabel>

          <div className="mt-24">
            <h2
              className="
                text-[clamp(4rem,7vw,8rem)]
                font-semibold
                leading-[0.82]
                tracking-[-0.073em]
              "
            >
              STAY
              <br />
              INFORMED
              <br />
              FROM START
              <br />
              TO FINISH.
            </h2>

            <div
              className="
                mt-12
                border-t
                border-white/20
              "
            >
              {[
                "Driver and vehicle information",
                "Pickup and destination details",
                "Active journey visibility",
                "Trip support and reporting",
              ].map((item) => (
                <div
                  key={item}
                  className="
                    flex
                    items-center
                    gap-4
                    border-b
                    border-white/20
                    py-5
                    text-[14px]
                    text-white/70
                  "
                >
                  <Check
                    size={16}
                    strokeWidth={1.8}
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

function DriverSafety() {
  return (
    <section
      className="
        bg-safari-cream
        px-[var(--page-gutter)]
        py-[var(--section-space)]
      "
    >
      <div
        className="
          mx-auto
          grid
          max-w-[1800px]
          gap-14
          lg:grid-cols-[0.9fr_1.1fr]
        "
      >
        <div
          className="
            flex
            flex-col
            justify-between
          "
        >
          <div>
            <PageSectionLabel number="04">
              Driver safety
            </PageSectionLabel>

            <h2
              className="
                mt-14
                text-[clamp(4rem,7vw,8rem)]
                font-semibold
                leading-[0.82]
                tracking-[-0.073em]
              "
            >
              SAFER
              <br />
              ROADS BEGIN
              <br />
              WITH CLEAR
              <br />
              TOOLS.
            </h2>
          </div>

          <p
            className="
              mt-14
              max-w-[530px]
              border-t
              border-black/15
              pt-7
              text-[15px]
              leading-[1.7]
              text-black/55
            "
          >
            Driver safety depends on responsible
            verification, understandable requests,
            appropriate journey information and
            accessible support.
          </p>
        </div>

        <div
          className="
            relative
            min-h-[620px]
            overflow-hidden
            lg:min-h-[850px]
          "
        >
          <img
            src="/images/safety/safety-driver.png"
            alt="Professional driver focused on the road"
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
    </section>
  );
}

function SafetySupport() {
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
          grid
          max-w-[1800px]
          gap-14
          lg:grid-cols-[1.1fr_0.9fr]
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
            src="/images/safety/safety-support.png"
            alt="Safari customer support"
            className="
              absolute
              inset-0
              h-full
              w-full
              object-cover
            "
          />
        </div>

        <div>
          <PageSectionLabel number="05">
            Help when needed
          </PageSectionLabel>

          <h2
            className="
              mt-14
              text-[clamp(4rem,7vw,8rem)]
              font-semibold
              leading-[0.82]
              tracking-[-0.073em]
            "
          >
            SUPPORT
            <br />
            SHOULD FEEL
            <br />
            HUMAN.
          </h2>

          <div className="mt-14 border-t border-black/15">
            {supportItems.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className="
                    grid
                    gap-5
                    border-b
                    border-black/15
                    py-7
                    md:grid-cols-[45px_1fr]
                  "
                >
                  <Icon
                    size={21}
                    strokeWidth={1.5}
                  />

                  <div>
                    <h3
                      className="
                        text-[20px]
                        font-semibold
                        tracking-[-0.04em]
                      "
                    >
                      {item.title}
                    </h3>

                    <p
                      className="
                        mt-3
                        text-[14px]
                        leading-[1.7]
                        text-black/55
                      "
                    >
                      {item.description}
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

function SafetyCommitment() {
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
          number="06"
          light
        >
          Shared responsibility
        </PageSectionLabel>

        <h2
          className="
            mt-14
            max-w-[1450px]
            text-[clamp(4rem,8.7vw,9.8rem)]
            font-semibold
            leading-[0.82]
            tracking-[-0.075em]
          "
        >
          SAFER CITIES
          <br />
          TAKE ALL
          <br />
          OF US.
        </h2>

        <div
          className="
            mt-20
            grid
            gap-12
            border-t
            border-white/20
            pt-9
            lg:grid-cols-2
          "
        >
          <ShieldCheck
            size={42}
            strokeWidth={1.3}
          />

          <p
            className="
              max-w-[720px]
              text-[clamp(1.3rem,2vw,2rem)]
              font-medium
              leading-[1.5]
              tracking-[-0.03em]
              text-white/75
            "
          >
            Safari’s role is to build responsible
            systems, set clear expectations and
            improve the platform as real-world
            needs evolve.
          </p>
        </div>
      </div>
    </section>
  );
}

export default function SafetyPage() {
  return (
    <PageShell>
      <SafetyHero />
      <SafetyIntro />
      <SafetyPrinciples />
      <PassengerSafety />
      <DriverSafety />
      <SafetySupport />
      <SafetyCommitment />

      <ProductDownloadCTA
        eyebrow="Move with confidence"
        title={"SAFARI\nGOES WITH\nYOU."}
        description="Access your journeys, activity and relevant support through the Safari app."
      />
    </PageShell>
  );
}