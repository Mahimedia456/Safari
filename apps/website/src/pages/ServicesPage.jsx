import {
  AirVent,
  ArrowDown,
  CalendarCheck,
  Check,
  CircleUserRound,
  Hammer,
  House,
  Lightbulb,
  MessageSquareMore,
  ShieldCheck,
  Star,
  Wrench,
} from "lucide-react";

import PageShell from "../components/layout/PageShell";
import PageSectionLabel from "../components/shared/PageSectionLabel";
import ProductDownloadCTA from "../components/shared/ProductDownloadCTA";

const serviceCategories = [
  {
    icon: Lightbulb,
    title: "Electrical",
    description:
      "Connect with professionals for ordinary household electrical tasks and inspections.",
  },
  {
    icon: Wrench,
    title: "Plumbing",
    description:
      "Request support for common kitchen, bathroom and household plumbing requirements.",
  },
  {
    icon: AirVent,
    title: "AC and appliances",
    description:
      "Find technicians for routine servicing, checks and repair-related requests.",
  },
  {
    icon: House,
    title: "Home maintenance",
    description:
      "Access a growing network of useful professionals for everyday property needs.",
  },
];

const bookingSteps = [
  {
    number: "01",
    title: "Select a service",
    description:
      "Choose the category that most closely matches the work you need.",
  },
  {
    number: "02",
    title: "Explain the task",
    description:
      "Provide useful details, location information and preferred availability.",
  },
  {
    number: "03",
    title: "Review the professional",
    description:
      "View relevant provider information before continuing with the request.",
  },
  {
    number: "04",
    title: "Follow the booking",
    description:
      "Stay informed as the request is accepted, scheduled and completed.",
  },
];

function ServicesHero() {
  return (
    <section className="relative min-h-[820px] overflow-hidden bg-black text-white lg:min-h-screen">
      <img
        src="/images/services-page/services-hero.png"
        alt="Professional home service in Pakistan"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/35 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[65%] bg-gradient-to-t from-black/85 via-transparent to-transparent" />

      <div className="relative z-10 flex min-h-[820px] flex-col justify-end px-[var(--page-gutter)] pb-12 pt-[calc(var(--header-height)+80px)] lg:min-h-screen lg:pb-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-end">
          <div>
            <p className="mb-8 text-[10px] font-bold uppercase tracking-[0.16em] text-white/60">
              Safari Services
            </p>

            <h1 className="text-[clamp(4.5rem,10.5vw,11.5rem)] font-semibold leading-[0.77] tracking-[-0.082em]">
              HELP.
              <br />
              AROUND
              <br />
              YOUR HOME.
            </h1>
          </div>

          <div>
            <p className="text-[16px] leading-[1.65] text-white/75">
              Find local professionals for useful everyday home and maintenance
              services through one connected experience.
            </p>

            <a
              href="#service-categories"
              className="mt-8 inline-flex items-center gap-3 text-[13px] font-semibold"
            >
              Explore services
              <ArrowDown size={16} strokeWidth={1.7} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicesIntro() {
  return (
    <section className="bg-safari-cream px-[var(--page-gutter)] py-[var(--section-space)]">
      <div className="mx-auto max-w-[1800px]">
        <PageSectionLabel number="01">Everyday professional help</PageSectionLabel>

        <h2 className="mt-14 max-w-[1500px] text-[clamp(4rem,9vw,10rem)] font-semibold leading-[0.83] tracking-[-0.075em]">
          THE RIGHT
          <br />
          HELP.
          <br />
          WITHOUT THE
          <br />
          SEARCH.
        </h2>

        <div className="mt-20 grid gap-12 border-t border-black/15 pt-9 lg:grid-cols-2">
          <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-black/40">
            Safari Services
          </p>

          <p className="max-w-[760px] text-[clamp(1.35rem,2.1vw,2.2rem)] font-medium leading-[1.45] tracking-[-0.035em]">
            Safari Services is designed to make local professional discovery,
            booking requests and status information easier to manage.
          </p>
        </div>
      </div>
    </section>
  );
}

function ServiceCategories() {
  return (
    <section
      id="service-categories"
      className="bg-white px-[var(--page-gutter)] py-[var(--section-space)]"
    >
      <div className="mx-auto max-w-[1800px]">
        <PageSectionLabel number="02">Service categories</PageSectionLabel>

        <h2 className="mt-14 max-w-[1350px] text-[clamp(4rem,8vw,9rem)] font-semibold leading-[0.82] tracking-[-0.075em]">
          SKILLED HELP
          <br />
          FOR REAL
          <br />
          NEEDS.
        </h2>

        <div className="mt-24 grid border-t border-black/15 md:grid-cols-2 xl:grid-cols-4">
          {serviceCategories.map((service) => {
            const Icon = service.icon;

            return (
              <article
                key={service.title}
                className="min-h-[380px] border-b border-black/15 py-9 md:px-7 md:odd:border-r xl:border-r xl:last:border-r-0"
              >
                <Icon size={27} strokeWidth={1.35} />

                <div className="mt-28">
                  <h3 className="text-[26px] font-semibold leading-none tracking-[-0.05em]">
                    {service.title}
                  </h3>

                  <p className="mt-5 text-[14px] leading-[1.7] text-black/55">
                    {service.description}
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

function ElectricianSection() {
  return (
    <section className="bg-safari-black text-white">
      <div className="grid lg:grid-cols-2">
        <div className="relative min-h-[600px] lg:min-h-[900px]">
          <img
            src="/images/services-page/services-electrician.png"
            alt="Professional electrician at work"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-col justify-between px-[var(--page-gutter)] py-[var(--section-space)]">
          <PageSectionLabel number="03" light>
            Electrical services
          </PageSectionLabel>

          <div className="mt-24">
            <Lightbulb size={34} strokeWidth={1.35} />

            <h2 className="mt-10 text-[clamp(4rem,7vw,8rem)] font-semibold leading-[0.82] tracking-[-0.073em]">
              PROFESSIONAL
              <br />
              WORK.
              <br />
              CLEARER
              <br />
              BOOKING.
            </h2>

            <p className="mt-10 max-w-[560px] text-[16px] leading-[1.7] text-white/60">
              Request qualified assistance for ordinary lighting, fixture,
              inspection and household electrical requirements.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function PlumbingSection() {
  return (
    <section className="bg-safari-cream px-[var(--page-gutter)] py-[var(--section-space)]">
      <div className="mx-auto grid max-w-[1800px] gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="flex flex-col justify-between">
          <div>
            <PageSectionLabel number="04">Plumbing</PageSectionLabel>

            <h2 className="mt-14 text-[clamp(4rem,7vw,8rem)] font-semibold leading-[0.82] tracking-[-0.073em]">
              FIX THE
              <br />
              PROBLEM.
              <br />
              KEEP THE
              <br />
              DAY MOVING.
            </h2>
          </div>

          <div className="mt-14 border-t border-black/15">
            {[
              "Kitchen fixtures",
              "Bathroom fittings",
              "Ordinary leak inspection",
              "Home plumbing maintenance",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-4 border-b border-black/15 py-5 text-[14px] font-medium"
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

        <div className="relative min-h-[620px] overflow-hidden lg:min-h-[850px]">
          <img
            src="/images/services-page/services-plumber.png"
            alt="Professional plumber repairing a fixture"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}

function TechnicianSection() {
  return (
    <section className="bg-white px-[var(--page-gutter)] py-[var(--section-space)]">
      <div className="mx-auto grid max-w-[1800px] gap-14 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="relative min-h-[620px] overflow-hidden lg:min-h-[820px]">
          <img
            src="/images/services-page/services-technician.png"
            alt="Technician servicing an air conditioner"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>

        <div>
          <PageSectionLabel number="05">Technicians</PageSectionLabel>

          <AirVent size={33} strokeWidth={1.35} className="mt-14" />

          <h2 className="mt-8 text-[clamp(4rem,7vw,8rem)] font-semibold leading-[0.82] tracking-[-0.073em]">
            SKILL
            <br />
            FOR THE
            <br />
            THINGS YOU
            <br />
            RELY ON.
          </h2>

          <p className="mt-10 max-w-[540px] text-[15px] leading-[1.7] text-black/55">
            Find technicians for routine AC, appliance and equipment-related
            inspection, servicing and repair requests.
          </p>
        </div>
      </div>
    </section>
  );
}

function BookingProcess() {
  return (
    <section className="bg-safari-green px-[var(--page-gutter)] py-[var(--section-space)] text-white">
      <div className="mx-auto max-w-[1800px]">
        <PageSectionLabel number="06" light>
          Booking process
        </PageSectionLabel>

        <h2 className="mt-14 max-w-[1400px] text-[clamp(4rem,8vw,9rem)] font-semibold leading-[0.82] tracking-[-0.075em]">
          FROM TASK
          <br />
          TO DONE.
        </h2>

        <div className="mt-24 border-t border-white/20">
          {bookingSteps.map((step) => (
            <article
              key={step.number}
              className="grid gap-6 border-b border-white/20 py-9 md:grid-cols-[70px_0.8fr_1.2fr]"
            >
              <span className="text-[11px] font-semibold text-white/40">
                {step.number}
              </span>

              <h3 className="text-[clamp(1.7rem,2.7vw,3rem)] font-semibold leading-none tracking-[-0.05em]">
                {step.title}
              </h3>

              <p className="max-w-[580px] text-[14px] leading-[1.7] text-white/60">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceConfidence() {
  const items = [
    {
      icon: CircleUserRound,
      title: "Professional profiles",
    },
    {
      icon: MessageSquareMore,
      title: "Clear task details",
    },
    {
      icon: CalendarCheck,
      title: "Booking visibility",
    },
    {
      icon: Star,
      title: "Ratings and feedback",
    },
    {
      icon: ShieldCheck,
      title: "Support access",
    },
    {
      icon: Hammer,
      title: "Growing service network",
    },
  ];

  return (
    <section className="bg-safari-cream px-[var(--page-gutter)] py-[var(--section-space)]">
      <div className="mx-auto max-w-[1800px]">
        <PageSectionLabel number="07">Confidence in the process</PageSectionLabel>

        <h2 className="mt-14 max-w-[1350px] text-[clamp(4rem,8vw,9rem)] font-semibold leading-[0.82] tracking-[-0.075em]">
          KNOW MORE
          <br />
          BEFORE THE
          <br />
          WORK STARTS.
        </h2>

        <div className="mt-24 grid border-t border-black/15 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className="min-h-[260px] border-b border-black/15 py-9 md:px-7 md:odd:border-r xl:border-r xl:last:border-r-0"
              >
                <Icon size={25} strokeWidth={1.4} />

                <h3 className="mt-24 text-[24px] font-semibold tracking-[-0.045em]">
                  {item.title}
                </h3>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function ServicesPage() {
  return (
    <PageShell>
      <ServicesHero />
      <ServicesIntro />
      <ServiceCategories />
      <ElectricianSection />
      <PlumbingSection />
      <TechnicianSection />
      <BookingProcess />
      <ServiceConfidence />

      <ProductDownloadCTA
        eyebrow="Book with Safari"
        title={"THE RIGHT\nHELP.\nCLOSER."}
        description="Discover professionals and request useful everyday services through Safari."
      />
    </PageShell>
  );
}