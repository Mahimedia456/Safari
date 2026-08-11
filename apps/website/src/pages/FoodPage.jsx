import {
  ArrowDown,
  ArrowRight,
  Check,
  ChefHat,
  Clock3,
  Heart,
  MapPin,
  PackageCheck,
  Search,
  ShoppingBag,
  Star,
  Store,
  UtensilsCrossed,
} from "lucide-react";

import PageShell from "../components/layout/PageShell";
import PageSectionLabel from "../components/shared/PageSectionLabel";
import ProductDownloadCTA from "../components/shared/ProductDownloadCTA";

const foodSteps = [
  {
    icon: Search,
    number: "01",
    title: "Discover",
    description:
      "Explore nearby restaurants, cuisines and food categories available around you.",
  },
  {
    icon: UtensilsCrossed,
    number: "02",
    title: "Choose",
    description:
      "Browse menus, select your meal and review your order before checkout.",
  },
  {
    icon: ShoppingBag,
    number: "03",
    title: "Order",
    description:
      "Place your order through a familiar Safari checkout experience.",
  },
  {
    icon: PackageCheck,
    number: "04",
    title: "Follow",
    description:
      "Stay informed as your restaurant prepares and the delivery moves toward you.",
  },
];

const foodFeatures = [
  {
    icon: MapPin,
    title: "Nearby discovery",
    description:
      "Find restaurants and food options relevant to your current location.",
  },
  {
    icon: Heart,
    title: "Favourites",
    description:
      "Return to restaurants and meals you enjoy without starting over.",
  },
  {
    icon: Clock3,
    title: "Order progress",
    description:
      "Follow key order and delivery-status updates from confirmation to arrival.",
  },
  {
    icon: Star,
    title: "Ratings",
    description:
      "Use customer feedback to make more informed restaurant and meal choices.",
  },
];

function FoodHero() {
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
        src="/images/food/food-hero.png"
        alt="Premium food in a Pakistani restaurant"
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
              Safari Food
            </p>

            <h1
              className="
                text-[clamp(4.8rem,11vw,12rem)]
                font-semibold
                leading-[0.77]
                tracking-[-0.082em]
              "
            >
              GOOD FOOD.
              <br />
              CLOSER.
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
              Discover local restaurants,
              choose what you are craving and
              follow your order to the door.
            </p>

            <a
              href="#food-discovery"
              className="
                mt-8
                inline-flex
                items-center
                gap-3
                text-[13px]
                font-semibold
              "
            >
              Explore Safari Food

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

function FoodIntro() {
  return (
    <section
      id="food-discovery"
      className="
        bg-safari-cream
        px-[var(--page-gutter)]
        py-[var(--section-space)]
      "
    >
      <div className="mx-auto max-w-[1800px]">
        <PageSectionLabel number="01">
          Whatever you are craving
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
          MORE CHOICE.
          <br />
          LESS
          <br />
          SEARCHING.
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
            Food around your city
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
            Safari Food is designed to make
            restaurant discovery, menu
            selection and delivery progress
            easier to understand.
          </p>
        </div>
      </div>
    </section>
  );
}

function FoodHowItWorks() {
  return (
    <section
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
          FROM MENU
          <br />
          TO YOUR
          <br />
          DOOR.
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
          {foodSteps.map((step) => {
            const Icon = step.icon;

            return (
              <article
                key={step.number}
                className="
                  min-h-[390px]
                  border-b
                  border-black/15
                  py-9
                  md:px-7
                  md:odd:border-r
                  xl:border-r
                  xl:last:border-r-0
                "
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-black/35">
                    {step.number}
                  </span>

                  <Icon
                    size={24}
                    strokeWidth={1.4}
                  />
                </div>

                <div className="mt-28">
                  <h3
                    className="
                      text-[clamp(2rem,3vw,3.2rem)]
                      font-semibold
                      leading-none
                      tracking-[-0.055em]
                    "
                  >
                    {step.title}
                  </h3>

                  <p
                    className="
                      mt-5
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
    </section>
  );
}

function RestaurantSection() {
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
            src="/images/food/food-restaurant.png"
            alt="Restaurant preparing food"
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
            Local restaurants
          </PageSectionLabel>

          <div className="mt-24">
            <ChefHat
              size={34}
              strokeWidth={1.35}
            />

            <h2
              className="
                mt-10
                text-[clamp(4rem,7vw,8rem)]
                font-semibold
                leading-[0.82]
                tracking-[-0.073em]
              "
            >
              DISCOVER
              <br />
              WHAT YOUR
              <br />
              CITY IS
              <br />
              COOKING.
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
              From familiar favourites to
              restaurants you have not tried
              yet, Safari creates a growing
              window into food around you.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function FoodDelivery() {
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
              Delivery progress
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
              FOLLOW
              <br />
              EVERY
              <br />
              IMPORTANT
              <br />
              STEP.
            </h2>
          </div>

          <div className="mt-14 border-t border-black/15">
            {[
              "Order confirmation",
              "Restaurant preparation",
              "Delivery assignment",
              "Arrival progress",
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
            src="/images/food/food-delivery.png"
            alt="Food delivery arriving at a customer"
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

function FoodFeatures() {
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
          Made for repeat cravings
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
          FIND IT.
          <br />
          LOVE IT.
          <br />
          ORDER AGAIN.
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
          {foodFeatures.map((feature) => {
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

function FoodMerchant() {
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
            src="/images/food/food-table.png"
            alt="Selection of food available through Safari"
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
          <PageSectionLabel number="06">
            Restaurant partners
          </PageSectionLabel>

          <Store
            size={33}
            strokeWidth={1.35}
            className="mt-14"
          />

          <h2
            className="
              mt-8
              text-[clamp(4rem,7vw,8rem)]
              font-semibold
              leading-[0.82]
              tracking-[-0.073em]
            "
          >
            GROW
            <br />
            WITH
            <br />
            SAFARI.
          </h2>

          <p
            className="
              mt-10
              max-w-[520px]
              text-[15px]
              leading-[1.7]
              text-black/55
            "
          >
            Safari Food is designed to connect
            restaurants with more customers
            through ordering, delivery and
            merchant-management tools.
          </p>

          <a
            href="/merchants"
            className="
              mt-9
              inline-flex
              items-center
              gap-3
              border-b
              border-black
              pb-1
              text-[13px]
              font-semibold
            "
          >
            Partner with Safari

            <ArrowRight
              size={16}
              strokeWidth={1.7}
            />
          </a>
        </div>
      </div>
    </section>
  );
}

export default function FoodPage() {
  return (
    <PageShell>
      <FoodHero />
      <FoodIntro />
      <FoodHowItWorks />
      <RestaurantSection />
      <FoodDelivery />
      <FoodFeatures />
      <FoodMerchant />

      <ProductDownloadCTA
        eyebrow="Order with Safari"
        title={"WHAT ARE\nYOU CRAVING?"}
        description="Discover restaurants, place your order and follow delivery through the Safari app."
      />
    </PageShell>
  );
}