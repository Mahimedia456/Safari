import {
  ArrowDown,
  Check,
  Clock3,
  Leaf,
  MapPin,
  PackageCheck,
  Search,
  ShoppingBasket,
  ShoppingBag,
  Sparkles,
  Store,
  Truck,
} from "lucide-react";

import PageShell from "../components/layout/PageShell";
import PageSectionLabel from "../components/shared/PageSectionLabel";
import ProductDownloadCTA from "../components/shared/ProductDownloadCTA";

const grocerySteps = [
  {
    number: "01",
    icon: MapPin,
    title: "Choose your location",
    description:
      "Safari uses your delivery area to surface relevant grocery stores and available products.",
  },
  {
    number: "02",
    icon: Search,
    title: "Browse essentials",
    description:
      "Explore fresh produce, pantry items, household products and everyday categories.",
  },
  {
    number: "03",
    icon: ShoppingBasket,
    title: "Build your basket",
    description:
      "Add products, review quantities and confirm the details of your grocery order.",
  },
  {
    number: "04",
    icon: Truck,
    title: "Follow delivery",
    description:
      "Stay informed as the store prepares your basket and delivery moves toward you.",
  },
];

const categories = [
  "Fresh produce",
  "Dairy and eggs",
  "Bakery",
  "Meat and poultry",
  "Pantry essentials",
  "Beverages",
  "Household care",
  "Personal care",
];

const groceryBenefits = [
  {
    icon: Leaf,
    title: "Fresh selection",
    description:
      "Discover fruit, vegetables and everyday food products from participating local stores.",
  },
  {
    icon: Store,
    title: "Local stores",
    description:
      "Shop from grocery partners operating around your delivery location.",
  },
  {
    icon: Clock3,
    title: "Convenient delivery",
    description:
      "Order daily essentials without adding another stop to your schedule.",
  },
  {
    icon: PackageCheck,
    title: "Order visibility",
    description:
      "Follow important preparation and delivery updates from checkout to arrival.",
  },
];

function GroceryHero() {
  return (
    <section className="relative min-h-[820px] overflow-hidden bg-black text-white lg:min-h-screen">
      <img
        src="/images/grocery/grocery-hero.png"
        alt="Fresh groceries in a contemporary Pakistani store"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/35 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[65%] bg-gradient-to-t from-black/85 via-transparent to-transparent" />

      <div className="relative z-10 flex min-h-[820px] flex-col justify-end px-[var(--page-gutter)] pb-12 pt-[calc(var(--header-height)+80px)] lg:min-h-screen lg:pb-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-end">
          <div>
            <p className="mb-8 text-[10px] font-bold uppercase tracking-[0.16em] text-white/60">
              Safari Grocery
            </p>

            <h1 className="text-[clamp(4.7rem,11vw,12rem)] font-semibold leading-[0.77] tracking-[-0.082em]">
              FRESH.
              <br />
              SIMPLE.
              <br />
              DELIVERED.
            </h1>
          </div>

          <div>
            <p className="text-[16px] leading-[1.65] text-white/75">
              Shop fresh groceries, pantry items and household essentials from
              stores around your city.
            </p>

            <a
              href="#grocery-process"
              className="mt-8 inline-flex items-center gap-3 text-[13px] font-semibold"
            >
              See how it works
              <ArrowDown size={16} strokeWidth={1.7} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function GroceryIntro() {
  return (
    <section className="bg-safari-cream px-[var(--page-gutter)] py-[var(--section-space)]">
      <div className="mx-auto max-w-[1800px]">
        <PageSectionLabel number="01">Everyday essentials</PageSectionLabel>

        <h2 className="mt-14 max-w-[1500px] text-[clamp(4rem,9vw,10rem)] font-semibold leading-[0.83] tracking-[-0.075em]">
          THE WEEKLY
          <br />
          SHOP.
          <br />
          WITHOUT
          <br />
          THE TRIP.
        </h2>

        <div className="mt-20 grid gap-12 border-t border-black/15 pt-9 lg:grid-cols-2">
          <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-black/40">
            Safari Grocery
          </p>

          <p className="max-w-[760px] text-[clamp(1.35rem,2.1vw,2.2rem)] font-medium leading-[1.45] tracking-[-0.035em]">
            Safari brings local grocery stores, everyday products and delivery
            progress into one familiar ordering experience.
          </p>
        </div>
      </div>
    </section>
  );
}

function GroceryProcess() {
  return (
    <section
      id="grocery-process"
      className="bg-white px-[var(--page-gutter)] py-[var(--section-space)]"
    >
      <div className="mx-auto max-w-[1800px]">
        <PageSectionLabel number="02">How grocery works</PageSectionLabel>

        <h2 className="mt-14 max-w-[1350px] text-[clamp(4rem,8vw,9rem)] font-semibold leading-[0.82] tracking-[-0.075em]">
          FROM STORE
          <br />
          TO DOOR.
        </h2>

        <div className="mt-24 grid border-t border-black/15 md:grid-cols-2 xl:grid-cols-4">
          {grocerySteps.map((step) => {
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

function GroceryStore() {
  return (
    <section className="bg-safari-black text-white">
      <div className="grid lg:grid-cols-2">
        <div className="relative min-h-[600px] lg:min-h-[900px]">
          <img
            src="/images/grocery/grocery-store.png"
            alt="A contemporary grocery store in Pakistan"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-col justify-between px-[var(--page-gutter)] py-[var(--section-space)]">
          <PageSectionLabel number="03" light>
            Stores around you
          </PageSectionLabel>

          <div className="mt-24">
            <Store size={34} strokeWidth={1.35} />

            <h2 className="mt-10 text-[clamp(4rem,7vw,8rem)] font-semibold leading-[0.82] tracking-[-0.073em]">
              LOCAL
              <br />
              STORES.
              <br />
              MORE
              <br />
              ACCESS.
            </h2>

            <p className="mt-10 max-w-[560px] text-[16px] leading-[1.7] text-white/60">
              Safari Grocery is designed to connect customers with participating
              stores operating in their delivery area.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function GroceryCategories() {
  return (
    <section className="bg-safari-cream px-[var(--page-gutter)] py-[var(--section-space)]">
      <div className="mx-auto grid max-w-[1800px] gap-16 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <PageSectionLabel number="04">Browse categories</PageSectionLabel>

          <h2 className="mt-14 text-[clamp(4rem,7vw,8rem)] font-semibold leading-[0.82] tracking-[-0.073em]">
            EVERYTHING
            <br />
            ON YOUR
            <br />
            LIST.
          </h2>
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

              <ShoppingBag size={18} strokeWidth={1.5} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function GroceryDelivery() {
  return (
    <section className="bg-white px-[var(--page-gutter)] py-[var(--section-space)]">
      <div className="mx-auto grid max-w-[1800px] gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="flex flex-col justify-between">
          <div>
            <PageSectionLabel number="05">Delivery</PageSectionLabel>

            <h2 className="mt-14 text-[clamp(4rem,7vw,8rem)] font-semibold leading-[0.82] tracking-[-0.073em]">
              READY
              <br />
              WHEN
              <br />
              YOU ARE.
            </h2>
          </div>

          <div className="mt-14 border-t border-black/15">
            {[
              "Store confirmation",
              "Basket preparation",
              "Delivery assignment",
              "Arrival progress",
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
            src="/images/grocery/grocery-delivery.png"
            alt="Grocery delivery arriving at a customer"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}

function GroceryBenefits() {
  return (
    <section className="bg-safari-green px-[var(--page-gutter)] py-[var(--section-space)] text-white">
      <div className="mx-auto max-w-[1800px]">
        <PageSectionLabel number="06" light>
          Built around daily life
        </PageSectionLabel>

        <h2 className="mt-14 max-w-[1400px] text-[clamp(4rem,8vw,9rem)] font-semibold leading-[0.82] tracking-[-0.075em]">
          MORE TIME.
          <br />
          FEWER
          <br />
          ERRANDS.
        </h2>

        <div className="mt-24 grid border-t border-white/20 md:grid-cols-2 xl:grid-cols-4">
          {groceryBenefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <article
                key={benefit.title}
                className="min-h-[350px] border-b border-white/20 py-9 md:px-7 md:odd:border-r xl:border-r xl:last:border-r-0"
              >
                <Icon size={27} strokeWidth={1.35} />

                <div className="mt-28">
                  <h3 className="text-[25px] font-semibold leading-none tracking-[-0.05em]">
                    {benefit.title}
                  </h3>

                  <p className="mt-5 text-[14px] leading-[1.7] text-white/60">
                    {benefit.description}
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

function GroceryProducts() {
  return (
    <section className="bg-white px-[var(--page-gutter)] py-[var(--section-space)]">
      <div className="mx-auto grid max-w-[1800px] gap-14 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="relative min-h-[620px] overflow-hidden lg:min-h-[820px]">
          <img
            src="/images/grocery/grocery-products.png"
            alt="Fresh produce and everyday grocery products"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>

        <div>
          <PageSectionLabel number="07">A complete basket</PageSectionLabel>

          <Sparkles size={32} strokeWidth={1.35} className="mt-14" />

          <h2 className="mt-8 text-[clamp(4rem,7vw,8rem)] font-semibold leading-[0.82] tracking-[-0.073em]">
            FRESH
            <br />
            TO
            <br />
            EVERYDAY.
          </h2>

          <p className="mt-10 max-w-[540px] text-[15px] leading-[1.7] text-black/55">
            From produce and pantry products to household and personal-care
            essentials, Safari Grocery is built around the complete everyday
            basket.
          </p>
        </div>
      </div>
    </section>
  );
}

export default function GroceryPage() {
  return (
    <PageShell>
      <GroceryHero />
      <GroceryIntro />
      <GroceryProcess />
      <GroceryStore />
      <GroceryCategories />
      <GroceryDelivery />
      <GroceryBenefits />
      <GroceryProducts />

      <ProductDownloadCTA
        eyebrow="Shop with Safari"
        title={"YOUR LIST.\nDELIVERED."}
        description="Browse fresh groceries and everyday essentials through one connected Safari experience."
      />
    </PageShell>
  );
}