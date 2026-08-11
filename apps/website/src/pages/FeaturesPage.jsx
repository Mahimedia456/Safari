import {
  ArrowDown,
  ArrowUpRight,
  Bell,
  Bike,
  CarFront,
  Check,
  ChevronRight,
  CreditCard,
  Headphones,
  HeartPulse,
  MapPin,
  Navigation,
  PackageCheck,
  ReceiptText,
  ShieldCheck,
  ShoppingBasket,
  Smartphone,
  Store,
  UtensilsCrossed,
  WalletCards,
  Wrench,
} from "lucide-react";

import PageShell from "../components/layout/PageShell";
import DownloadCTA from "../components/home/DownloadCTA";

const coreFeatures = [
  {
    number: "01",
    icon: CarFront,
    title: "Ride",
    eyebrow: "Move around your city",
    description:
      "Request everyday rides, confirm your pickup, follow your route and stay connected throughout the journey.",
    image: "/images/services/ride.png",
    points: [
      "Pickup and destination selection",
      "Ride options",
      "Live trip tracking",
      "Trip history and receipts",
    ],
  },
  {
    number: "02",
    icon: UtensilsCrossed,
    title: "Food",
    eyebrow: "Your favourites, delivered",
    description:
      "Discover restaurants, browse menus, place your order and follow delivery from preparation to your door.",
    image: "/images/services/food.png",
    points: [
      "Restaurant discovery",
      "Menu browsing",
      "Order tracking",
      "Ratings and favourites",
    ],
  },
  {
    number: "03",
    icon: ShoppingBasket,
    title: "Grocery",
    eyebrow: "Everyday essentials",
    description:
      "Shop fresh groceries and household essentials from local stores without another trip across town.",
    image: "/images/services/grocery.png",
    points: [
      "Local grocery stores",
      "Product categories",
      "Scheduled or fast delivery",
      "Order history",
    ],
  },
  {
    number: "04",
    icon: HeartPulse,
    title: "Pharmacy",
    eyebrow: "Care when you need it",
    description:
      "Access everyday pharmacy and wellness essentials through participating local pharmacies.",
    image: "/images/services/pharmacy.png",
    points: [
      "Pharmacy discovery",
      "Health essentials",
      "Private order flow",
      "Delivery tracking",
    ],
  },
  {
    number: "05",
    icon: Wrench,
    title: "Services",
    eyebrow: "Trusted help around you",
    description:
      "Find local professionals for useful everyday services through one familiar Safari experience.",
    image: "/images/services/services.png",
    points: [
      "Service discovery",
      "Professional profiles",
      "Booking requests",
      "Status and support",
    ],
  },
];

const experienceFeatures = [
  {
    icon: MapPin,
    title: "Location aware",
    description:
      "Safari is designed around where you are, helping surface relevant rides, stores and services.",
  },
  {
    icon: Navigation,
    title: "Live journey",
    description:
      "Follow important movement and status updates throughout rides and deliveries.",
  },
  {
    icon: WalletCards,
    title: "Safari Wallet",
    description:
      "A central place for payment activity, credits and future Safari payment experiences.",
  },
  {
    icon: Bell,
    title: "Smart notifications",
    description:
      "Important trip, order, payment and account activity stays visible without unnecessary noise.",
  },
  {
    icon: ReceiptText,
    title: "Activity history",
    description:
      "Review previous journeys, orders and relevant transaction details from one place.",
  },
  {
    icon: Headphones,
    title: "Support",
    description:
      "Access contextual help and support when something needs attention.",
  },
];

const safetyFeatures = [
  {
    title: "Clear trip information",
    description:
      "Pickup, destination and journey details remain easy to understand throughout the experience.",
  },
  {
    title: "Account confidence",
    description:
      "Passenger and driver experiences are designed around clear account and profile information.",
  },
  {
    title: "Help when it matters",
    description:
      "Support and safety actions remain accessible from relevant areas of the Safari experience.",
  },
];

const ecosystem = [
  {
    icon: Smartphone,
    label: "Passengers",
    description:
      "One app for rides, orders, services, wallet and support.",
  },
  {
    icon: Bike,
    label: "Drivers",
    description:
      "Requests, earnings, trips and driver tools in a dedicated experience.",
  },
  {
    icon: Store,
    label: "Merchants",
    description:
      "Tools for food, grocery, pharmacy and service partners.",
  },
  {
    icon: PackageCheck,
    label: "Operations",
    description:
      "A connected platform designed to support service fulfilment at scale.",
  },
];

function FeatureHero() {
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
        src="/images/home/hero_karachi.png"
        alt="Safari in the city"
        className="
          absolute
          inset-0
          h-full
          w-full
          object-cover
        "
      />

      <div className="absolute inset-0 bg-black/45" />

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-r
          from-black/85
          via-black/35
          to-black/10
        "
      />

      <div
        className="
          absolute
          inset-x-0
          bottom-0
          h-[70%]
          bg-gradient-to-t
          from-black/85
          via-black/15
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
                text-white/55
              "
            >
              Safari Features
            </p>

            <h1
              className="
                max-w-[1450px]
                text-[clamp(4.5rem,11vw,12rem)]
                font-semibold
                leading-[0.78]
                tracking-[-0.08em]
              "
            >
              MORE
              <br />
              IN ONE
              <br />
              PLACE.
            </h1>
          </div>

          <div className="max-w-[370px] pb-2">
            <p
              className="
                text-[16px]
                leading-[1.65]
                tracking-[-0.02em]
                text-white/75
              "
            >
              From the morning ride to the
              evening order, Safari connects
              the everyday services around
              your city through one
              experience.
            </p>

            <a
              href="#core-features"
              className="
                mt-8
                inline-flex
                items-center
                gap-3
                text-[13px]
                font-semibold
              "
            >
              Explore features

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

function FeaturesIntro() {
  return (
    <section
      className="
        bg-safari-cream
        px-[var(--page-gutter)]
        py-[var(--section-space)]
      "
    >
      <div className="mx-auto max-w-[1800px]">
        <div
          className="
            flex
            items-center
            gap-4
            text-[10px]
            font-bold
            uppercase
            tracking-[0.16em]
          "
        >
          <span className="text-black/35">
            01
          </span>

          <span>One connected experience</span>
        </div>

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
          THE THINGS
          <br />
          YOU NEED.
          <br />
          CONNECTED.
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
              text-[11px]
              font-semibold
              uppercase
              tracking-[0.13em]
              text-black/40
            "
          >
            Safari Super App
          </p>

          <p
            className="
              max-w-[760px]
              text-[clamp(1.35rem,2vw,2.15rem)]
              font-medium
              leading-[1.45]
              tracking-[-0.035em]
            "
          >
            Instead of jumping between
            disconnected apps, Safari is built
            around one account, one familiar
            interface and one growing network
            of everyday services.
          </p>
        </div>
      </div>
    </section>
  );
}

function CoreFeatures() {
  return (
    <section
      id="core-features"
      className="relative bg-white"
    >
      <div
        className="
          bg-white
          px-[var(--page-gutter)]
          pb-20
          pt-[var(--section-space)]
        "
      >
        <div
          className="
            flex
            items-center
            gap-4
            text-[10px]
            font-bold
            uppercase
            tracking-[0.16em]
          "
        >
          <span className="text-black/35">
            02
          </span>

          <span>Core services</span>
        </div>

        <h2
          className="
            mt-14
            max-w-[1200px]
            text-[clamp(4rem,8vw,9rem)]
            font-semibold
            leading-[0.83]
            tracking-[-0.075em]
          "
        >
          ONE APP.
          <br />
          FIVE WAYS
          <br />
          TO DO MORE.
        </h2>
      </div>

      {coreFeatures.map(
        (feature, index) => {
          const Icon = feature.icon;

          return (
            <article
              key={feature.title}
              className="
                sticky
                top-[var(--header-height)]
                h-[calc(100vh-var(--header-height))]
                min-h-[700px]
                overflow-hidden
                bg-white
              "
              style={{
                zIndex: 30 + index,
              }}
            >
              <div
                className="
                  grid
                  h-full
                  lg:grid-cols-[0.43fr_0.57fr]
                "
              >
                <div
                  className="
                    flex
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
                        text-black/35
                      "
                    >
                      {feature.number}
                    </span>

                    <div
                      className="
                        flex
                        h-11
                        w-11
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-black/15
                      "
                    >
                      <Icon
                        size={19}
                        strokeWidth={1.5}
                      />
                    </div>
                  </div>

                  <div>
                    <p
                      className="
                        mb-5
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-[0.14em]
                        text-black/40
                      "
                    >
                      {feature.eyebrow}
                    </p>

                    <h3
                      className="
                        text-[clamp(4.5rem,9vw,9.5rem)]
                        font-semibold
                        leading-[0.78]
                        tracking-[-0.075em]
                      "
                    >
                      {feature.title}
                    </h3>

                    <p
                      className="
                        mt-8
                        max-w-[480px]
                        text-[15px]
                        leading-[1.65]
                        text-black/60
                      "
                    >
                      {feature.description}
                    </p>

                    <div
                      className="
                        mt-8
                        border-t
                        border-black/15
                        pt-6
                      "
                    >
                      {feature.points.map(
                        (point) => (
                          <div
                            key={point}
                            className="
                              flex
                              items-center
                              gap-3
                              py-2
                              text-[13px]
                              font-medium
                            "
                          >
                            <Check
                              size={15}
                              strokeWidth={1.8}
                              className="text-safari-green"
                            />

                            {point}
                          </div>
                        ),
                      )}
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
                    src={feature.image}
                    alt={`Safari ${feature.title}`}
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
                      bg-gradient-to-t
                      from-black/35
                      via-transparent
                      to-black/5
                    "
                  />

                  <span
                    className="
                      absolute
                      bottom-7
                      right-7
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-[0.15em]
                      text-white
                    "
                  >
                    Safari / {feature.title}
                  </span>
                </div>
              </div>
            </article>
          );
        },
      )}
    </section>
  );
}

function EverydayExperience() {
  return (
    <section
      className="
        bg-safari-black
        px-[var(--page-gutter)]
        py-[var(--section-space)]
        text-white
      "
    >
      <div className="mx-auto max-w-[1800px]">
        <div
          className="
            flex
            items-center
            gap-4
            text-[10px]
            font-bold
            uppercase
            tracking-[0.16em]
          "
        >
          <span className="text-white/30">
            03
          </span>

          <span>Across Safari</span>
        </div>

        <div
          className="
            mt-14
            grid
            gap-14
            lg:grid-cols-[1fr_390px]
            lg:items-end
          "
        >
          <h2
            className="
              text-[clamp(4rem,8.5vw,9.5rem)]
              font-semibold
              leading-[0.82]
              tracking-[-0.075em]
            "
          >
            DESIGNED
            <br />
            TO FEEL
            <br />
            FAMILIAR.
          </h2>

          <p
            className="
              max-w-[380px]
              text-[15px]
              leading-[1.65]
              text-white/55
            "
          >
            Core functions remain consistent
            whether you are booking a ride,
            following an order or reviewing
            your activity.
          </p>
        </div>

        <div
          className="
            mt-24
            grid
            border-t
            border-white/15
            md:grid-cols-2
            xl:grid-cols-3
          "
        >
          {experienceFeatures.map(
            (feature) => {
              const Icon = feature.icon;

              return (
                <article
                  key={feature.title}
                  className="
                    border-b
                    border-white/15
                    py-10
                    md:px-8
                    md:odd:border-r
                    md:first:pl-0
                    xl:border-r
                    xl:last:border-r-0
                  "
                >
                  <Icon
                    size={26}
                    strokeWidth={1.35}
                  />

                  <h3
                    className="
                      mt-16
                      text-[26px]
                      font-semibold
                      tracking-[-0.045em]
                    "
                  >
                    {feature.title}
                  </h3>

                  <p
                    className="
                      mt-4
                      max-w-[350px]
                      text-[14px]
                      leading-[1.7]
                      text-white/50
                    "
                  >
                    {feature.description}
                  </p>
                </article>
              );
            },
          )}
        </div>
      </div>
    </section>
  );
}

function WalletSection() {
  return (
    <section
      className="
        bg-safari-green
        px-[var(--page-gutter)]
        py-[var(--section-space)]
        text-white
      "
    >
      <div
        className="
          mx-auto
          grid
          max-w-[1800px]
          gap-16
          lg:grid-cols-[0.9fr_1.1fr]
          lg:items-center
        "
      >
        <div>
          <div
            className="
              flex
              items-center
              gap-4
              text-[10px]
              font-bold
              uppercase
              tracking-[0.16em]
            "
          >
            <span className="text-white/35">
              04
            </span>

            <span>Payments & wallet</span>
          </div>

          <h2
            className="
              mt-14
              text-[clamp(4rem,8vw,9rem)]
              font-semibold
              leading-[0.82]
              tracking-[-0.075em]
            "
          >
            ONE PLACE
            <br />
            FOR YOUR
            <br />
            ACTIVITY.
          </h2>

          <p
            className="
              mt-10
              max-w-[520px]
              text-[15px]
              leading-[1.7]
              text-white/65
            "
          >
            Safari Wallet is designed as the
            financial layer of the ecosystem —
            bringing payment activity, credits
            and transaction visibility into a
            familiar place.
          </p>
        </div>

        <div
          className="
            border
            border-white/20
            bg-black/10
            p-8
            md:p-12
          "
        >
          <div
            className="
              flex
              items-center
              justify-between
              border-b
              border-white/20
              pb-8
            "
          >
            <div>
              <p
                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.14em]
                  text-white/45
                "
              >
                Safari Wallet
              </p>

              <p
                className="
                  mt-3
                  text-[clamp(2.4rem,5vw,5rem)]
                  font-semibold
                  tracking-[-0.06em]
                "
              >
                Simple.
                <br />
                Connected.
              </p>
            </div>

            <WalletCards
              size={42}
              strokeWidth={1.2}
            />
          </div>

          <div
            className="
              grid
              gap-0
              sm:grid-cols-3
            "
          >
            {[
              {
                icon: CreditCard,
                label: "Payments",
              },
              {
                icon: ReceiptText,
                label: "Transactions",
              },
              {
                icon: WalletCards,
                label: "Credits",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className="
                    border-b
                    border-white/15
                    py-7
                    sm:border-b-0
                    sm:border-r
                    sm:px-6
                    sm:first:pl-0
                    sm:last:border-r-0
                  "
                >
                  <Icon
                    size={20}
                    strokeWidth={1.5}
                  />

                  <p
                    className="
                      mt-7
                      text-[13px]
                      font-semibold
                    "
                  >
                    {item.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function SafetySection() {
  return (
    <section
      className="
        bg-white
        px-[var(--page-gutter)]
        py-[var(--section-space)]
      "
    >
      <div className="mx-auto max-w-[1800px]">
        <div
          className="
            flex
            items-center
            gap-4
            text-[10px]
            font-bold
            uppercase
            tracking-[0.16em]
          "
        >
          <span className="text-black/35">
            05
          </span>

          <span>Safety & confidence</span>
        </div>

        <div
          className="
            mt-14
            grid
            gap-14
            lg:grid-cols-[minmax(0,1fr)_360px]
            lg:items-end
          "
        >
          <h2
            className="
              text-[clamp(4rem,8.5vw,9.5rem)]
              font-semibold
              leading-[0.82]
              tracking-[-0.075em]
            "
          >
            CONFIDENCE
            <br />
            IS PART OF
            <br />
            THE PRODUCT.
          </h2>

          <div>
            <ShieldCheck
              size={34}
              strokeWidth={1.3}
            />

            <p
              className="
                mt-7
                text-[15px]
                leading-[1.65]
                text-black/55
              "
            >
              Safety is not a separate screen.
              It influences how information,
              journeys and support are
              presented throughout Safari.
            </p>
          </div>
        </div>

        <div
          className="
            mt-24
            border-t
            border-black/15
          "
        >
          {safetyFeatures.map(
            (feature, index) => (
              <article
                key={feature.title}
                className="
                  grid
                  gap-6
                  border-b
                  border-black/15
                  py-10
                  md:grid-cols-[80px_0.8fr_1.2fr]
                "
              >
                <span
                  className="
                    text-[11px]
                    font-semibold
                    text-black/35
                  "
                >
                  0{index + 1}
                </span>

                <h3
                  className="
                    text-[clamp(1.7rem,3vw,3.3rem)]
                    font-semibold
                    leading-[1]
                    tracking-[-0.05em]
                  "
                >
                  {feature.title}
                </h3>

                <p
                  className="
                    max-w-[590px]
                    text-[15px]
                    leading-[1.7]
                    text-black/55
                  "
                >
                  {feature.description}
                </p>
              </article>
            ),
          )}
        </div>

        <a
          href="/safety"
          className="
            mt-12
            inline-flex
            items-center
            gap-2
            border-b
            border-black
            pb-1
            text-[13px]
            font-semibold
          "
        >
          Explore Safari Safety

          <ArrowUpRight
            size={16}
            strokeWidth={1.6}
          />
        </a>
      </div>
    </section>
  );
}

function EcosystemSection() {
  return (
    <section
      className="
        bg-safari-cream
        px-[var(--page-gutter)]
        py-[var(--section-space)]
      "
    >
      <div className="mx-auto max-w-[1800px]">
        <div
          className="
            flex
            items-center
            gap-4
            text-[10px]
            font-bold
            uppercase
            tracking-[0.16em]
          "
        >
          <span className="text-black/35">
            06
          </span>

          <span>The wider platform</span>
        </div>

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
          MORE THAN
          <br />
          A PASSENGER
          <br />
          APP.
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
          {ecosystem.map(
            (item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.label}
                  className="
                    min-h-[350px]
                    border-b
                    border-black/15
                    py-9
                    md:px-7
                    md:odd:border-r
                    md:first:pl-0
                    xl:border-r
                    xl:last:border-r-0
                  "
                >
                  <Icon
                    size={27}
                    strokeWidth={1.35}
                  />

                  <div className="mt-32">
                    <h3
                      className="
                        text-[27px]
                        font-semibold
                        tracking-[-0.05em]
                      "
                    >
                      {item.label}
                    </h3>

                    <p
                      className="
                        mt-4
                        max-w-[290px]
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
            },
          )}
        </div>
      </div>
    </section>
  );
}

function FeatureClosing() {
  return (
    <section
      className="
        relative
        min-h-[720px]
        overflow-hidden
        bg-black
        text-white
      "
    >
      <img
        src="/images/cities/karachi.png"
        alt="Karachi"
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
          bg-black/55
        "
      />

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-t
          from-black/90
          via-black/20
          to-black/20
        "
      />

      <div
        className="
          relative
          z-10
          flex
          min-h-[720px]
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
              text-[clamp(4.2rem,9.5vw,10.5rem)]
              font-semibold
              leading-[0.8]
              tracking-[-0.078em]
            "
          >
            BUILT TO
            <br />
            GROW WITH
            <br />
            YOUR CITY.
          </h2>

          <div>
            <p
              className="
                text-[15px]
                leading-[1.65]
                text-white/65
              "
            >
              Safari's platform is designed
              so new services and experiences
              can become part of the same
              connected ecosystem over time.
            </p>

            <a
              href="/about"
              className="
                mt-8
                inline-flex
                items-center
                gap-2
                text-[13px]
                font-semibold
              "
            >
              About Safari

              <ChevronRight
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

export default function FeaturesPage() {
  return (
    <PageShell>
      <FeatureHero />

      <FeaturesIntro />

      <CoreFeatures />

      <EverydayExperience />

      <WalletSection />

      <SafetySection />

      <EcosystemSection />

      <FeatureClosing />

      <DownloadCTA />
    </PageShell>
  );
}