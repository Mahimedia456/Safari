import {
  ArrowDown,
  ArrowRight,
  BadgeCheck,
  CalendarClock,
  CarFront,
  Check,
  Clock3,
  FileCheck2,
  ShieldCheck,
  Smartphone,
  WalletCards,
} from "lucide-react";

import PageShell from "../components/layout/PageShell";
import PageSectionLabel from "../components/shared/PageSectionLabel";
import ProductDownloadCTA from "../components/shared/ProductDownloadCTA";

const benefits = [
  {
    icon: CalendarClock,
    title: "Work with flexibility",
    description:
      "Choose when you are available and organise driving around your own schedule.",
  },
  {
    icon: WalletCards,
    title: "See your activity",
    description:
      "Review completed journeys, earnings-related information and driver activity.",
  },
  {
    icon: Smartphone,
    title: "Dedicated driver experience",
    description:
      "Requests, navigation, trip status and account tools remain together in one app.",
  },
  {
    icon: ShieldCheck,
    title: "Support and safety",
    description:
      "Access relevant safety information and support throughout your time on the road.",
  },
];

const registrationSteps = [
  {
    number: "01",
    title: "Create your driver profile",
    description:
      "Provide your basic details and begin your Safari driver registration.",
  },
  {
    number: "02",
    title: "Submit required documents",
    description:
      "Upload the requested identity, licence, address and vehicle information.",
  },
  {
    number: "03",
    title: "Complete verification",
    description:
      "Your profile and documents move through the required review process.",
  },
  {
    number: "04",
    title: "Start accepting trips",
    description:
      "Once approved, use the Safari driver experience to go online and receive requests.",
  },
];

function DriveHero() {
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
        src="/images/drive/drive-hero.png"
        alt="Professional driver standing beside a car"
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
            lg:grid-cols-[minmax(0,1fr)_390px]
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
              Drive with Safari
            </p>

            <h1
              className="
                text-[clamp(4.8rem,11vw,12rem)]
                font-semibold
                leading-[0.77]
                tracking-[-0.082em]
              "
            >
              YOUR TIME.
              <br />
              YOUR ROAD.
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
              A professional driver platform
              designed around flexibility,
              journey visibility and the
              opportunity to keep moving.
            </p>

            <a
              href="#driver-benefits"
              className="
                mt-8
                inline-flex
                items-center
                gap-3
                text-[13px]
                font-semibold
              "
            >
              Why drive with Safari

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

function DriveIntro() {
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
          Opportunity through movement
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
          DRIVE ON
          <br />
          YOUR OWN
          <br />
          TERMS.
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
            Driver experience
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
            Safari is building a driver
            experience that respects the
            person behind every journey and
            keeps essential tools close at hand.
          </p>
        </div>
      </div>
    </section>
  );
}

function DriveBenefits() {
  return (
    <section
      id="driver-benefits"
      className="
        bg-white
        px-[var(--page-gutter)]
        py-[var(--section-space)]
      "
    >
      <div className="mx-auto max-w-[1800px]">
        <PageSectionLabel number="02">
          Why drive with Safari
        </PageSectionLabel>

        <div
          className="
            mt-14
            grid
            gap-14
            lg:grid-cols-[0.9fr_1.1fr]
          "
        >
          <h2
            className="
              text-[clamp(4rem,7.5vw,8.5rem)]
              font-semibold
              leading-[0.83]
              tracking-[-0.073em]
            "
          >
            BUILT
            <br />
            AROUND
            <br />
            YOUR DAY.
          </h2>

          <div
            className="
              grid
              border-t
              border-black/15
              md:grid-cols-2
            "
          >
            {benefits.map((benefit) => {
              const Icon = benefit.icon;

              return (
                <article
                  key={benefit.title}
                  className="
                    min-h-[330px]
                    border-b
                    border-black/15
                    py-8
                    md:px-7
                    md:odd:border-r
                  "
                >
                  <Icon
                    size={26}
                    strokeWidth={1.4}
                  />

                  <h3
                    className="
                      mt-24
                      text-[25px]
                      font-semibold
                      leading-none
                      tracking-[-0.05em]
                    "
                  >
                    {benefit.title}
                  </h3>

                  <p
                    className="
                      mt-5
                      text-[14px]
                      leading-[1.7]
                      text-black/55
                    "
                  >
                    {benefit.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function DriveHumanSection() {
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
            src="/images/drive/drive-driver.png"
            alt="Driver preparing a vehicle"
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
            Professional by design
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
              THE DRIVER
              <br />
              MATTERS.
            </h2>

            <p
              className="
                mt-10
                max-w-[560px]
                text-[16px]
                leading-[1.7]
                text-white/60
              "
            >
              Every Safari journey depends on
              the professionalism, time and
              responsibility of the driver
              completing it.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function DriveFlexibility() {
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
          lg:grid-cols-[1.1fr_0.9fr]
        "
      >
        <div>
          <PageSectionLabel number="04">
            Flexibility
          </PageSectionLabel>

          <h2
            className="
              mt-14
              text-[clamp(4rem,7.5vw,8.5rem)]
              font-semibold
              leading-[0.82]
              tracking-[-0.073em]
            "
          >
            MOVE
            <br />
            WHEN IT
            <br />
            WORKS
            <br />
            FOR YOU.
          </h2>

          <div
            className="
              mt-14
              border-t
              border-black/15
            "
          >
            {[
              "Choose when to go online",
              "Receive relevant trip requests",
              "Follow each journey clearly",
              "Review your completed activity",
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

        <div
          className="
            relative
            min-h-[620px]
            overflow-hidden
            lg:min-h-[850px]
          "
        >
          <img
            src="/images/drive/drive-earning.png"
            alt="Driver organising the working day"
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

function DriveRegistration() {
  return (
    <section
      className="
        bg-white
        px-[var(--page-gutter)]
        py-[var(--section-space)]
      "
    >
      <div className="mx-auto max-w-[1800px]">
        <PageSectionLabel number="05">
          Registration
        </PageSectionLabel>

        <div
          className="
            mt-14
            grid
            gap-16
            lg:grid-cols-[0.8fr_1.2fr]
          "
        >
          <div>
            <h2
              className="
                text-[clamp(4rem,7vw,8rem)]
                font-semibold
                leading-[0.82]
                tracking-[-0.073em]
              "
            >
              START
              <br />
              WITH FOUR
              <br />
              STEPS.
            </h2>

            <div
              className="
                mt-12
                flex
                items-center
                gap-4
                border-t
                border-black/15
                pt-6
                text-[14px]
                text-black/55
              "
            >
              <FileCheck2
                size={20}
                strokeWidth={1.5}
              />

              Required documents vary by
              vehicle and operating area.
            </div>
          </div>

          <div className="border-t border-black/15">
            {registrationSteps.map((step) => (
              <article
                key={step.number}
                className="
                  grid
                  gap-6
                  border-b
                  border-black/15
                  py-9
                  md:grid-cols-[70px_0.8fr_1.2fr]
                "
              >
                <span className="text-[11px] font-semibold text-black/35">
                  {step.number}
                </span>

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
                    max-w-[570px]
                    text-[14px]
                    leading-[1.7]
                    text-black/55
                  "
                >
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function DriveRequirements() {
  const requirements = [
    {
      icon: BadgeCheck,
      label: "Identity and profile verification",
    },
    {
      icon: FileCheck2,
      label: "Valid driving licence and documents",
    },
    {
      icon: CarFront,
      label: "Eligible vehicle information",
    },
    {
      icon: ShieldCheck,
      label: "Required safety and background checks",
    },
  ];

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
          Driver requirements
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
          READY FOR
          <br />
          THE ROAD.
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
          {requirements.map((requirement) => {
            const Icon = requirement.icon;

            return (
              <article
                key={requirement.label}
                className="
                  min-h-[300px]
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
                  strokeWidth={1.4}
                />

                <p
                  className="
                    mt-28
                    max-w-[270px]
                    text-[20px]
                    font-semibold
                    leading-[1.2]
                    tracking-[-0.035em]
                  "
                >
                  {requirement.label}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function DriveClosing() {
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
        src="/images/drive/drive-car.png"
        alt="Car moving through a Pakistani city"
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
          via-transparent
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
        <h2
          className="
            text-[clamp(4.2rem,9vw,10rem)]
            font-semibold
            leading-[0.8]
            tracking-[-0.078em]
          "
        >
          THE NEXT
          <br />
          JOURNEY
          <br />
          STARTS HERE.
        </h2>
      </div>
    </section>
  );
}

export default function DrivePage() {
  return (
    <PageShell>
      <DriveHero />
      <DriveIntro />
      <DriveBenefits />
      <DriveHumanSection />
      <DriveFlexibility />
      <DriveRegistration />
      <DriveRequirements />
      <DriveClosing />

      <ProductDownloadCTA
        eyebrow="Safari Driver"
        title={"READY TO\nDRIVE?"}
        description="Begin your Safari driver registration and prepare for the road ahead."
      />
    </PageShell>
  );
}