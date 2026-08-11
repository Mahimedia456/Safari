import {
  ArrowDown,
  BadgeCheck,
  Check,
  HeartPulse,
  Leaf,
  LockKeyhole,
  PackageCheck,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Store,
  Truck,
} from "lucide-react";

import PageShell from "../components/layout/PageShell";
import PageSectionLabel from "../components/shared/PageSectionLabel";
import ProductDownloadCTA from "../components/shared/ProductDownloadCTA";

const pharmacySteps = [
  {
    number: "01",
    icon: Search,
    title: "Find essentials",
    description:
      "Browse everyday pharmacy, wellness and personal-care categories from participating stores.",
  },
  {
    number: "02",
    icon: Store,
    title: "Choose a pharmacy",
    description:
      "View available pharmacy partners operating around your delivery location.",
  },
  {
    number: "03",
    icon: ShoppingBag,
    title: "Review your order",
    description:
      "Confirm the relevant products, quantity, delivery details and required information.",
  },
  {
    number: "04",
    icon: Truck,
    title: "Receive discreetly",
    description:
      "Follow important delivery updates while the order moves safely toward you.",
  },
];

const pharmacyPrinciples = [
  {
    icon: ShieldCheck,
    title: "Trusted partners",
    description:
      "Safari Pharmacy is designed around participating local pharmacies and responsible fulfilment.",
  },
  {
    icon: LockKeyhole,
    title: "Private ordering",
    description:
      "Health-related orders should be handled through a discreet and respectful experience.",
  },
  {
    icon: BadgeCheck,
    title: "Clear information",
    description:
      "Products, order details and fulfilment updates remain visible throughout the process.",
  },
  {
    icon: HeartPulse,
    title: "Everyday wellness",
    description:
      "Access ordinary pharmacy, personal-care and wellness essentials when needed.",
  },
];

function PharmacyHero() {
  return (
    <section className="relative min-h-[820px] overflow-hidden bg-black text-white lg:min-h-screen">
      <img
        src="/images/pharmacy/pharmacy-hero.png"
        alt="Modern pharmacy in Pakistan"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/35 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[65%] bg-gradient-to-t from-black/85 via-transparent to-transparent" />

      <div className="relative z-10 flex min-h-[820px] flex-col justify-end px-[var(--page-gutter)] pb-12 pt-[calc(var(--header-height)+80px)] lg:min-h-screen lg:pb-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-end">
          <div>
            <p className="mb-8 text-[10px] font-bold uppercase tracking-[0.16em] text-white/60">
              Safari Pharmacy
            </p>

            <h1 className="text-[clamp(4.5rem,10.5vw,11.5rem)] font-semibold leading-[0.77] tracking-[-0.082em]">
              CARE.
              <br />
              WHEN YOU
              <br />
              NEED IT.
            </h1>
          </div>

          <div>
            <p className="text-[16px] leading-[1.65] text-white/75">
              Discover pharmacy, wellness and personal-care essentials through
              participating local partners.
            </p>

            <a
              href="#pharmacy-process"
              className="mt-8 inline-flex items-center gap-3 text-[13px] font-semibold"
            >
              Explore the experience
              <ArrowDown size={16} strokeWidth={1.7} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function PharmacyIntro() {
  return (
    <section className="bg-safari-cream px-[var(--page-gutter)] py-[var(--section-space)]">
      <div className="mx-auto max-w-[1800px]">
        <PageSectionLabel number="01">Everyday health access</PageSectionLabel>

        <h2 className="mt-14 max-w-[1500px] text-[clamp(4rem,9vw,10rem)] font-semibold leading-[0.83] tracking-[-0.075em]">
          CARE
          <br />
          SHOULD FEEL
          <br />
          CLOSER.
        </h2>

        <div className="mt-20 grid gap-12 border-t border-black/15 pt-9 lg:grid-cols-2">
          <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-black/40">
            Safari Pharmacy
          </p>

          <p className="max-w-[760px] text-[clamp(1.35rem,2.1vw,2.2rem)] font-medium leading-[1.45] tracking-[-0.035em]">
            Safari Pharmacy is designed to connect everyday health and wellness
            needs with a clear, private and convenient ordering experience.
          </p>
        </div>
      </div>
    </section>
  );
}

function PharmacyProcess() {
  return (
    <section
      id="pharmacy-process"
      className="bg-white px-[var(--page-gutter)] py-[var(--section-space)]"
    >
      <div className="mx-auto max-w-[1800px]">
        <PageSectionLabel number="02">How it works</PageSectionLabel>

        <h2 className="mt-14 max-w-[1350px] text-[clamp(4rem,8vw,9rem)] font-semibold leading-[0.82] tracking-[-0.075em]">
          SIMPLE.
          <br />
          PRIVATE.
          <br />
          INFORMED.
        </h2>

        <div className="mt-24 grid border-t border-black/15 md:grid-cols-2 xl:grid-cols-4">
          {pharmacySteps.map((step) => {
            const Icon = step.icon;

            return (
              <article
                key={step.number}
                className="min-h-[390px] border-b border-black/15 py-9 md:px-7 md:odd:border-r xl:border-r xl:last:border-r-0"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-black/35">
                    {step.number}
                  </span>
                  <Icon size={25} strokeWidth={1.4} />
                </div>

                <div className="mt-28">
                  <h3 className="text-[clamp(1.9rem,3vw,3.1rem)] font-semibold leading-none tracking-[-0.055em]">
                    {step.title}
                  </h3>

                  <p className="mt-5 text-[14px] leading-[1.7] text-black/55">
                    {step.description}
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

function PharmacyStore() {
  return (
    <section className="bg-safari-black text-white">
      <div className="grid lg:grid-cols-2">
        <div className="relative min-h-[600px] lg:min-h-[900px]">
          <img
            src="/images/pharmacy/pharmacy-store.png"
            alt="Pharmacist helping a customer"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-col justify-between px-[var(--page-gutter)] py-[var(--section-space)]">
          <PageSectionLabel number="03" light>
            Pharmacy partners
          </PageSectionLabel>

          <div className="mt-24">
            <Store size={34} strokeWidth={1.35} />

            <h2 className="mt-10 text-[clamp(4rem,7vw,8rem)] font-semibold leading-[0.82] tracking-[-0.073em]">
              CARE
              <br />
              THROUGH
              <br />
              TRUSTED
              <br />
              STORES.
            </h2>

            <p className="mt-10 max-w-[560px] text-[16px] leading-[1.7] text-white/60">
              Safari is designed to work with participating pharmacies that can
              support responsible product handling and fulfilment.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function PharmacyCategories() {
  const categories = [
    "Everyday pharmacy",
    "Wellness",
    "Personal care",
    "Baby care",
    "First aid",
    "Vitamins and supplements",
    "Health devices",
    "Household health",
  ];

  return (
    <section className="bg-safari-cream px-[var(--page-gutter)] py-[var(--section-space)]">
      <div className="mx-auto grid max-w-[1800px] gap-16 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <PageSectionLabel number="04">Useful categories</PageSectionLabel>

          <h2 className="mt-14 text-[clamp(4rem,7vw,8rem)] font-semibold leading-[0.82] tracking-[-0.073em]">
            EVERYDAY
            <br />
            HEALTH.
            <br />
            ONE PLACE.
          </h2>

          <p className="mt-10 max-w-[500px] text-[15px] leading-[1.7] text-black/55">
            Product availability and fulfilment requirements may vary by pharmacy,
            location and applicable rules.
          </p>
        </div>

        <div className="border-t border-black/15">
          {categories.map((category, index) => (
            <article
              key={category}
              className="grid grid-cols-[55px_1fr_auto] items-center border-b border-black/15 py-6"
            >
              <span className="text-[11px] font-semibold text-black/35">
                {String(index + 1).padStart(2, "0")}
              </span>

              <h3 className="text-[clamp(1.5rem,2.5vw,2.7rem)] font-semibold tracking-[-0.045em]">
                {category}
              </h3>

              <Leaf size={18} strokeWidth={1.5} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function PharmacyDelivery() {
  return (
    <section className="bg-white px-[var(--page-gutter)] py-[var(--section-space)]">
      <div className="mx-auto grid max-w-[1800px] gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="flex flex-col justify-between">
          <div>
            <PageSectionLabel number="05">Discreet delivery</PageSectionLabel>

            <h2 className="mt-14 text-[clamp(4rem,7vw,8rem)] font-semibold leading-[0.82] tracking-[-0.073em]">
              CARE
              <br />
              DELIVERED
              <br />
              WITH
              <br />
              RESPECT.
            </h2>
          </div>

          <div className="mt-14 border-t border-black/15">
            {[
              "Order review",
              "Pharmacy confirmation",
              "Secure preparation",
              "Discreet delivery progress",
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
            src="/images/pharmacy/pharmacy-delivery.png"
            alt="Pharmacy delivery arriving at a customer"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}

function PharmacyPrinciples() {
  return (
    <section className="bg-safari-green px-[var(--page-gutter)] py-[var(--section-space)] text-white">
      <div className="mx-auto max-w-[1800px]">
        <PageSectionLabel number="06" light>
          Responsible by design
        </PageSectionLabel>

        <h2 className="mt-14 max-w-[1400px] text-[clamp(4rem,8vw,9rem)] font-semibold leading-[0.82] tracking-[-0.075em]">
          TRUST IN
          <br />
          EVERY
          <br />
          STEP.
        </h2>

        <div className="mt-24 grid border-t border-white/20 md:grid-cols-2 xl:grid-cols-4">
          {pharmacyPrinciples.map((principle) => {
            const Icon = principle.icon;

            return (
              <article
                key={principle.title}
                className="min-h-[350px] border-b border-white/20 py-9 md:px-7 md:odd:border-r xl:border-r xl:last:border-r-0"
              >
                <Icon size={27} strokeWidth={1.35} />

                <div className="mt-28">
                  <h3 className="text-[25px] font-semibold leading-none tracking-[-0.05em]">
                    {principle.title}
                  </h3>

                  <p className="mt-5 text-[14px] leading-[1.7] text-white/60">
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

function PharmacyCare() {
  return (
    <section className="bg-white px-[var(--page-gutter)] py-[var(--section-space)]">
      <div className="mx-auto grid max-w-[1800px] gap-14 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="relative min-h-[620px] overflow-hidden lg:min-h-[820px]">
          <img
            src="/images/pharmacy/pharmacy-care.png"
            alt="Family supporting everyday wellness at home"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>

        <div>
          <PageSectionLabel number="07">Everyday wellbeing</PageSectionLabel>

          <Sparkles size={32} strokeWidth={1.35} className="mt-14" />

          <h2 className="mt-8 text-[clamp(4rem,7vw,8rem)] font-semibold leading-[0.82] tracking-[-0.073em]">
            CARE
            <br />
            LIVES
            <br />
            AT HOME.
          </h2>

          <p className="mt-10 max-w-[540px] text-[15px] leading-[1.7] text-black/55">
            Safari Pharmacy supports access to ordinary wellness and
            personal-care essentials. It is not a replacement for professional
            medical advice or emergency care.
          </p>
        </div>
      </div>
    </section>
  );
}

export default function PharmacyPage() {
  return (
    <PageShell>
      <PharmacyHero />
      <PharmacyIntro />
      <PharmacyProcess />
      <PharmacyStore />
      <PharmacyCategories />
      <PharmacyDelivery />
      <PharmacyPrinciples />
      <PharmacyCare />

      <ProductDownloadCTA
        eyebrow="Safari Pharmacy"
        title={"EVERYDAY\nCARE.\nCLOSER."}
        description="Access participating pharmacies and everyday wellness essentials through Safari."
      />
    </PageShell>
  );
}