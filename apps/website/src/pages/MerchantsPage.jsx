import {
  ArrowDown,
  ArrowRight,
  BarChart3,
  Check,
  ClipboardList,
  Clock3,
  Handshake,
  PackageCheck,
  ReceiptText,
  ShoppingBag,
  Smartphone,
  Store,
  TrendingUp,
  UsersRound,
} from "lucide-react";

import PageShell from "../components/layout/PageShell";
import PageSectionLabel from "../components/shared/PageSectionLabel";

const merchantTypes = [
  {
    icon: Store,
    title: "Restaurants",
    description:
      "Receive food orders, coordinate preparation and manage fulfilment through a dedicated merchant experience.",
  },
  {
    icon: ShoppingBag,
    title: "Grocery stores",
    description:
      "Connect local grocery inventory and everyday products with customers around your delivery area.",
  },
  {
    icon: PackageCheck,
    title: "Pharmacies",
    description:
      "Support responsible pharmacy and wellness-product fulfilment through participating local stores.",
  },
  {
    icon: Handshake,
    title: "Service providers",
    description:
      "Connect professional skills with customers looking for useful local services.",
  },
];

const merchantTools = [
  {
    icon: ClipboardList,
    title: "Order management",
    description:
      "View new requests, preparation status and fulfilment information from one workspace.",
  },
  {
    icon: Clock3,
    title: "Operating controls",
    description:
      "Manage availability, service hours and important operational settings.",
  },
  {
    icon: ReceiptText,
    title: "Activity records",
    description:
      "Review completed orders, transactions and relevant merchant activity.",
  },
  {
    icon: BarChart3,
    title: "Business insights",
    description:
      "Understand performance trends through clear operational and sales information.",
  },
];

const onboardingSteps = [
  {
    number: "01",
    title: "Tell us about your business",
    description:
      "Provide business details, category, operating location and contact information.",
  },
  {
    number: "02",
    title: "Submit required information",
    description:
      "Share applicable business, identity, banking and operational documentation.",
  },
  {
    number: "03",
    title: "Prepare your catalogue",
    description:
      "Add relevant products, menus, service information, availability and pricing.",
  },
  {
    number: "04",
    title: "Complete review",
    description:
      "Safari reviews the provided information before enabling the merchant experience.",
  },
];

function MerchantHero() {
  return (
    <section className="relative min-h-[820px] overflow-hidden bg-black text-white lg:min-h-screen">
      <img
        src="/images/merchants/merchant-hero.png"
        alt="Pakistani business owner inside a local business"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/35 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[65%] bg-gradient-to-t from-black/85 via-transparent to-transparent" />

      <div className="relative z-10 flex min-h-[820px] flex-col justify-end px-[var(--page-gutter)] pb-12 pt-[calc(var(--header-height)+80px)] lg:min-h-screen lg:pb-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-end">
          <div>
            <p className="mb-8 text-[10px] font-bold uppercase tracking-[0.16em] text-white/60">
              Safari Merchants
            </p>

            <h1 className="text-[clamp(4.5rem,10.5vw,11.5rem)] font-semibold leading-[0.77] tracking-[-0.082em]">
              YOUR
              <br />
              BUSINESS.
              <br />
              MOVING.
            </h1>
          </div>

          <div>
            <p className="text-[16px] leading-[1.65] text-white/75">
              Connect your restaurant, store, pharmacy or service business with
              customers across the Safari ecosystem.
            </p>

            <a
              href="#merchant-types"
              className="mt-8 inline-flex items-center gap-3 text-[13px] font-semibold"
            >
              Explore merchant opportunities
              <ArrowDown size={16} strokeWidth={1.7} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function MerchantIntro() {
  return (
    <section className="bg-safari-cream px-[var(--page-gutter)] py-[var(--section-space)]">
      <div className="mx-auto max-w-[1800px]">
        <PageSectionLabel number="01">Grow with Safari</PageSectionLabel>

        <h2 className="mt-14 max-w-[1500px] text-[clamp(4rem,9vw,10rem)] font-semibold leading-[0.83] tracking-[-0.075em]">
          MORE
          <br />
          CUSTOMERS.
          <br />
          ONE
          <br />
          PLATFORM.
        </h2>

        <div className="mt-20 grid gap-12 border-t border-black/15 pt-9 lg:grid-cols-2">
          <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-black/40">
            Merchant ecosystem
          </p>

          <p className="max-w-[760px] text-[clamp(1.35rem,2.1vw,2.2rem)] font-medium leading-[1.45] tracking-[-0.035em]">
            Safari is building merchant tools that bring orders, fulfilment,
            activity and business visibility into one connected workspace.
          </p>
        </div>
      </div>
    </section>
  );
}

function MerchantTypes() {
  return (
    <section
      id="merchant-types"
      className="bg-white px-[var(--page-gutter)] py-[var(--section-space)]"
    >
      <div className="mx-auto max-w-[1800px]">
        <PageSectionLabel number="02">Who can partner</PageSectionLabel>

        <h2 className="mt-14 max-w-[1350px] text-[clamp(4rem,8vw,9rem)] font-semibold leading-[0.82] tracking-[-0.075em]">
          LOCAL
          <br />
          BUSINESS.
          <br />
          WIDER
          <br />
          REACH.
        </h2>

        <div className="mt-24 grid border-t border-black/15 md:grid-cols-2 xl:grid-cols-4">
          {merchantTypes.map((type) => {
            const Icon = type.icon;

            return (
              <article
                key={type.title}
                className="min-h-[390px] border-b border-black/15 py-9 md:px-7 md:odd:border-r xl:border-r xl:last:border-r-0"
              >
                <Icon size={27} strokeWidth={1.35} />

                <div className="mt-28">
                  <h3 className="text-[25px] font-semibold leading-none tracking-[-0.05em]">
                    {type.title}
                  </h3>

                  <p className="mt-5 text-[14px] leading-[1.7] text-black/55">
                    {type.description}
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

function MerchantRestaurant() {
  return (
    <section className="bg-safari-black text-white">
      <div className="grid lg:grid-cols-2">
        <div className="relative min-h-[600px] lg:min-h-[900px]">
          <img
            src="/images/merchants/merchant-restaurant.png"
            alt="Restaurant team preparing customer orders"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-col justify-between px-[var(--page-gutter)] py-[var(--section-space)]">
          <PageSectionLabel number="03" light>
            Orders and fulfilment
          </PageSectionLabel>

          <div className="mt-24">
            <ClipboardList size={34} strokeWidth={1.35} />

            <h2 className="mt-10 text-[clamp(4rem,7vw,8rem)] font-semibold leading-[0.82] tracking-[-0.073em]">
              FROM
              <br />
              ORDER
              <br />
              TO READY.
            </h2>

            <p className="mt-10 max-w-[560px] text-[16px] leading-[1.7] text-white/60">
              Receive customer requests, manage preparation status and coordinate
              fulfilment through a clear merchant workflow.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function MerchantDashboard() {
  return (
    <section className="bg-safari-cream px-[var(--page-gutter)] py-[var(--section-space)]">
      <div className="mx-auto grid max-w-[1800px] gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="flex flex-col justify-between">
          <div>
            <PageSectionLabel number="04">Merchant workspace</PageSectionLabel>

            <h2 className="mt-14 text-[clamp(4rem,7vw,8rem)] font-semibold leading-[0.82] tracking-[-0.073em]">
              KEEP
              <br />
              OPERATIONS
              <br />
              IN VIEW.
            </h2>

            <p className="mt-10 max-w-[530px] text-[15px] leading-[1.7] text-black/55">
              Safari’s merchant experience is designed to keep requests,
              availability, fulfilment and relevant business activity together.
            </p>
          </div>

          <div className="mt-14 border-t border-black/15">
            {[
              "New order visibility",
              "Preparation status",
              "Availability controls",
              "Completed activity",
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
            src="/images/merchants/merchant-dashboard.png"
            alt="Merchant managing orders through a tablet"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}

function MerchantTools() {
  return (
    <section className="bg-safari-green px-[var(--page-gutter)] py-[var(--section-space)] text-white">
      <div className="mx-auto max-w-[1800px]">
        <PageSectionLabel number="05" light>
          Merchant tools
        </PageSectionLabel>

        <h2 className="mt-14 max-w-[1400px] text-[clamp(4rem,8vw,9rem)] font-semibold leading-[0.82] tracking-[-0.075em]">
          RUN THE
          <br />
          DAY WITH
          <br />
          MORE
          <br />
          CONTROL.
        </h2>

        <div className="mt-24 grid border-t border-white/20 md:grid-cols-2 xl:grid-cols-4">
          {merchantTools.map((tool) => {
            const Icon = tool.icon;

            return (
              <article
                key={tool.title}
                className="min-h-[360px] border-b border-white/20 py-9 md:px-7 md:odd:border-r xl:border-r xl:last:border-r-0"
              >
                <Icon size={27} strokeWidth={1.35} />

                <div className="mt-28">
                  <h3 className="text-[25px] font-semibold leading-none tracking-[-0.05em]">
                    {tool.title}
                  </h3>

                  <p className="mt-5 text-[14px] leading-[1.7] text-white/60">
                    {tool.description}
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

function MerchantGrowth() {
  return (
    <section className="bg-white px-[var(--page-gutter)] py-[var(--section-space)]">
      <div className="mx-auto grid max-w-[1800px] gap-14 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="relative min-h-[620px] overflow-hidden lg:min-h-[820px]">
          <img
            src="/images/merchants/merchant-growth.png"
            alt="Pakistani business owner and team"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>

        <div>
          <PageSectionLabel number="06">Business growth</PageSectionLabel>

          <TrendingUp size={33} strokeWidth={1.35} className="mt-14" />

          <h2 className="mt-8 text-[clamp(4rem,7vw,8rem)] font-semibold leading-[0.82] tracking-[-0.073em]">
            GROW
            <br />
            WITH YOUR
            <br />
            CITY.
          </h2>

          <p className="mt-10 max-w-[540px] text-[15px] leading-[1.7] text-black/55">
            Safari can help participating businesses reach more customers while
            keeping the operational relationship clear and manageable.
          </p>
        </div>
      </div>
    </section>
  );
}

function MerchantOnboarding() {
  return (
    <section className="bg-safari-cream px-[var(--page-gutter)] py-[var(--section-space)]">
      <div className="mx-auto max-w-[1800px]">
        <PageSectionLabel number="07">Become a Safari merchant</PageSectionLabel>

        <div className="mt-14 grid gap-16 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 className="text-[clamp(4rem,7vw,8rem)] font-semibold leading-[0.82] tracking-[-0.073em]">
              START
              <br />
              WITH FOUR
              <br />
              STEPS.
            </h2>

            <div className="mt-12 flex items-center gap-4 border-t border-black/15 pt-6 text-[14px] text-black/55">
              <UsersRound size={21} strokeWidth={1.5} />
              Requirements vary by business category and location.
            </div>
          </div>

          <div className="border-t border-black/15">
            {onboardingSteps.map((step) => (
              <article
                key={step.number}
                className="grid gap-6 border-b border-black/15 py-9 md:grid-cols-[70px_0.8fr_1.2fr]"
              >
                <span className="text-[11px] font-semibold text-black/35">
                  {step.number}
                </span>

                <h3 className="text-[clamp(1.7rem,2.7vw,3rem)] font-semibold leading-none tracking-[-0.05em]">
                  {step.title}
                </h3>

                <p className="max-w-[580px] text-[14px] leading-[1.7] text-black/55">
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

function MerchantCTA() {
  return (
    <section className="relative overflow-hidden bg-safari-black px-[var(--page-gutter)] py-[var(--section-space)] text-white">
      <div className="pointer-events-none absolute -right-[20vw] top-1/2 h-[70vw] w-[70vw] -translate-y-1/2 rounded-full border border-white/10" />

      <div className="relative z-10 mx-auto max-w-[1800px]">
        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/45">
          Partner with Safari
        </p>

        <div className="mt-12 grid gap-14 lg:grid-cols-[minmax(0,1fr)_400px] lg:items-end">
          <h2 className="text-[clamp(4.2rem,9vw,10rem)] font-semibold leading-[0.8] tracking-[-0.075em]">
            LET'S
            <br />
            GROW
            <br />
            TOGETHER.
          </h2>

          <div>
            <p className="text-[15px] leading-[1.7] text-white/60">
              Register your interest in joining Safari as a restaurant, grocery,
              pharmacy or service partner.
            </p>

            <a
              href="/contact"
              className="mt-9 inline-flex min-h-[58px] items-center justify-between gap-8 bg-safari-green px-6 text-[13px] font-semibold"
            >
              Become a partner
              <ArrowRight size={17} strokeWidth={1.7} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function MerchantsPage() {
  return (
    <PageShell>
      <MerchantHero />
      <MerchantIntro />
      <MerchantTypes />
      <MerchantRestaurant />
      <MerchantDashboard />
      <MerchantTools />
      <MerchantGrowth />
      <MerchantOnboarding />
      <MerchantCTA />
    </PageShell>
  );
}