export const BRAND = {
  name: "Safari",
  country: "Pakistan",
  tagline: "Your city. One app.",
  description:
    "Safari brings mobility, food, grocery, pharmacy and everyday services together in one connected experience.",
  lightLogo: "/brand/logo-light.svg",
  darkLogo: "/brand/logo-dark.svg",
  favicon: "/brand/favicon.svg",
};

/*
|--------------------------------------------------------------------------
| Main navigation
|--------------------------------------------------------------------------
*/

export const PRIMARY_NAVIGATION = [
  {
    label: "Features",
    href: "/features",
  },
  {
    label: "Ride",
    href: "/ride",
  },
  {
    label: "Drive",
    href: "/drive",
  },
  {
    label: "Food",
    href: "/food",
  },
  {
    label: "Services",
    href: "/services",
  },
];

export const MORE_NAVIGATION = [
  {
    label: "Grocery",
    href: "/grocery",
    description: "Fresh groceries and daily essentials.",
  },
  {
    label: "Pharmacy",
    href: "/pharmacy",
    description: "Everyday care and wellness essentials.",
  },
  {
    label: "Merchants",
    href: "/merchants",
    description: "Grow your business with Safari.",
  },
  {
    label: "About",
    href: "/about",
    description: "Learn more about Safari Pakistan.",
  },
];

export const MOBILE_NAVIGATION = [
  {
    label: "Home",
    href: "/",
    number: "01",
  },
  {
    label: "Features",
    href: "/features",
    number: "02",
  },
  {
    label: "Ride",
    href: "/ride",
    number: "03",
  },
  {
    label: "Drive",
    href: "/drive",
    number: "04",
  },
  {
    label: "Food",
    href: "/food",
    number: "05",
  },
  {
    label: "Grocery",
    href: "/grocery",
    number: "06",
  },
  {
    label: "Pharmacy",
    href: "/pharmacy",
    number: "07",
  },
  {
    label: "Services",
    href: "/services",
    number: "08",
  },
  {
    label: "Merchants",
    href: "/merchants",
    number: "09",
  },
  {
    label: "About",
    href: "/about",
    number: "10",
  },
];

/*
|--------------------------------------------------------------------------
| Backward-compatible navigation aliases
|--------------------------------------------------------------------------
|
| Existing components may still import NAVIGATION or NAV_LINKS.
| These aliases prevent older page components from breaking.
|
*/

export const NAVIGATION = [
  {
    label: "Home",
    href: "/",
  },
  ...PRIMARY_NAVIGATION,
  ...MORE_NAVIGATION.map(({ label, href }) => ({
    label,
    href,
  })),
];

export const NAV_LINKS = NAVIGATION;

/*
|--------------------------------------------------------------------------
| Footer
|--------------------------------------------------------------------------
*/

export const FOOTER_LINKS = [
  {
    title: "Explore",
    links: [
      {
        label: "Home",
        href: "/",
      },
      {
        label: "Features",
        href: "/features",
      },
      {
        label: "Ride",
        href: "/ride",
      },
      {
        label: "Drive",
        href: "/drive",
      },
      {
        label: "Food",
        href: "/food",
      },
    ],
  },
  {
    title: "Everyday",
    links: [
      {
        label: "Grocery",
        href: "/grocery",
      },
      {
        label: "Pharmacy",
        href: "/pharmacy",
      },
      {
        label: "Services",
        href: "/services",
      },
      {
        label: "Merchants",
        href: "/merchants",
      },
    ],
  },
  {
    title: "Safari",
    links: [
      {
        label: "About",
        href: "/about",
      },
      {
        label: "Safety",
        href: "/safety",
        disabled: true,
      },
      {
        label: "Help Centre",
        href: "/help",
        disabled: true,
      },
      {
        label: "Contact",
        href: "/contact",
        disabled: true,
      },
    ],
  },
  {
    title: "Legal",
    links: [
      {
        label: "Privacy Policy",
        href: "/legal/privacy",
        disabled: true,
      },
      {
        label: "Terms of Service",
        href: "/legal/terms",
        disabled: true,
      },
      {
        label: "Cookie Policy",
        href: "/legal/cookie-policy",
        disabled: true,
      },
    ],
  },
];

export const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: "#",
  },
  {
    label: "Facebook",
    href: "#",
  },
  {
    label: "LinkedIn",
    href: "#",
  },
];

export const DOWNLOAD_LINKS = {
  apple: "#",
  google: "#",
};

/*
|--------------------------------------------------------------------------
| Home assets
|--------------------------------------------------------------------------
*/

export const HOME_ASSETS = {
  hero: "/images/home/hero_karachi.png",
  driver: "/images/driver/driver.png",

  ride: "/images/services/ride.png",
  food: "/images/services/food.png",
  grocery: "/images/services/grocery.png",
  pharmacy: "/images/services/pharmacy.png",
  services: "/images/services/services.png",

  karachi: "/images/cities/karachi.png",
  lahore: "/images/cities/lahore.png",
  islamabad: "/images/cities/islamabad.png",
};

/*
|--------------------------------------------------------------------------
| About page assets
|--------------------------------------------------------------------------
*/

export const ABOUT_ASSETS = {
  hero: "/images/about/about-hero.png",
  city: "/images/about/about-city.png",
  people: "/images/about/about-people.png",
  driver: "/images/about/about-driver.png",
  pakistan: "/images/about/about-pakistan.png",
};

/*
|--------------------------------------------------------------------------
| About page content
|--------------------------------------------------------------------------
*/

export const ABOUT_VALUES = [
  {
    number: "01",
    title: "Local by design",
    description:
      "Safari is being designed around the realities, cities, communities and everyday needs of Pakistan.",
  },
  {
    number: "02",
    title: "People first",
    description:
      "Every Safari experience should create practical value for customers, drivers, merchants and service professionals.",
  },
  {
    number: "03",
    title: "Trust through clarity",
    description:
      "Clear information, responsible operations and useful support should remain central to every interaction.",
  },
  {
    number: "04",
    title: "Built to improve",
    description:
      "We approach technology and operations as systems that should continuously learn, adapt and become more useful.",
  },
];

export const ABOUT_STATS = [
  {
    value: "01",
    label: "Connected platform",
    description:
      "Mobility and everyday services designed to work through one Safari ecosystem.",
  },
  {
    value: "05",
    label: "Core services",
    description:
      "Ride, food, grocery, pharmacy and local professional services.",
  },
  {
    value: "PK",
    label: "Pakistan first",
    description:
      "The current website and product direction is focused specifically on Pakistan.",
  },
];

export const ABOUT_MISSION = {
  eyebrow: "Our mission",
  title: "Make daily life move better.",
  description:
    "Safari is building a connected platform that helps people move, order and access useful services through experiences designed for Pakistan.",
};

export const ABOUT_STORY = [
  {
    number: "01",
    title: "Start with movement",
    description:
      "Reliable mobility can improve access to work, education, family and opportunity.",
  },
  {
    number: "02",
    title: "Connect everyday needs",
    description:
      "Food, groceries, pharmacy products and local services belong in one coherent experience.",
  },
  {
    number: "03",
    title: "Grow with Pakistan",
    description:
      "Safari aims to build alongside local drivers, businesses, professionals and communities.",
  },
];

export const ABOUT_PRINCIPLES = ABOUT_VALUES;

/*
|--------------------------------------------------------------------------
| Services
|--------------------------------------------------------------------------
*/

export const SERVICES = [
  {
    id: "ride",
    number: "01",
    title: "Ride",
    eyebrow: "Go anywhere",
    description:
      "Book everyday rides across your city through a clear and familiar experience.",
    image: "/images/services/ride.png",
    href: "/ride",
  },
  {
    id: "food",
    number: "02",
    title: "Food",
    eyebrow: "Whatever you are craving",
    description:
      "Discover restaurants around you and bring your favourites to your door.",
    image: "/images/services/food.png",
    href: "/food",
  },
  {
    id: "grocery",
    number: "03",
    title: "Grocery",
    eyebrow: "Everyday essentials",
    description:
      "Fresh produce, pantry items and household essentials from stores around you.",
    image: "/images/services/grocery.png",
    href: "/grocery",
  },
  {
    id: "pharmacy",
    number: "04",
    title: "Pharmacy",
    eyebrow: "Care when you need it",
    description:
      "Access pharmacy, wellness and personal-care essentials from participating stores.",
    image: "/images/services/pharmacy.png",
    href: "/pharmacy",
  },
  {
    id: "services",
    number: "05",
    title: "Services",
    eyebrow: "Help around your home",
    description:
      "Find professionals for useful everyday home and maintenance services.",
    image: "/images/services/services.png",
    href: "/services",
  },
];

/*
|--------------------------------------------------------------------------
| Home page aliases
|--------------------------------------------------------------------------
|
| These aliases support older components that may import service data using
| alternative names.
|
*/

export const HOME_SERVICES = SERVICES;
export const SERVICE_ITEMS = SERVICES;

/*
|--------------------------------------------------------------------------
| Feature page content
|--------------------------------------------------------------------------
*/

export const CORE_FEATURES = [
  {
    number: "01",
    title: "Ride",
    description:
      "Request everyday city mobility through a clear pickup, destination and journey experience.",
    href: "/ride",
  },
  {
    number: "02",
    title: "Food",
    description:
      "Browse participating restaurants and follow your order from preparation to delivery.",
    href: "/food",
  },
  {
    number: "03",
    title: "Grocery",
    description:
      "Shop fresh groceries, pantry products and household essentials from local stores.",
    href: "/grocery",
  },
  {
    number: "04",
    title: "Pharmacy",
    description:
      "Access ordinary pharmacy, wellness and personal-care essentials through participating partners.",
    href: "/pharmacy",
  },
  {
    number: "05",
    title: "Services",
    description:
      "Discover local professionals for useful home, maintenance and technical services.",
    href: "/services",
  },
];

export const FEATURES = CORE_FEATURES;

/*
|--------------------------------------------------------------------------
| Cities
|--------------------------------------------------------------------------
*/

export const CITIES = [
  {
    id: "karachi",
    name: "Karachi",
    image: "/images/cities/karachi.png",
    status: "Planned",
  },
  {
    id: "lahore",
    name: "Lahore",
    image: "/images/cities/lahore.png",
    status: "Planned",
  },
  {
    id: "islamabad",
    name: "Islamabad",
    image: "/images/cities/islamabad.png",
    status: "Planned",
  },
];

/*
|--------------------------------------------------------------------------
| Common company information
|--------------------------------------------------------------------------
*/

export const COMPANY_INFO = {
  name: "Safari Pakistan",
  country: "Pakistan",
  email: "hello@safari.pk",
  supportEmail: "support@safari.pk",
  merchantEmail: "merchants@safari.pk",
  driverEmail: "drivers@safari.pk",
  businessEmail: "business@safari.pk",
  careersEmail: "careers@safari.pk",
  mediaEmail: "media@safari.pk",
};

export const CONTACT_EMAILS = {
  general: COMPANY_INFO.email,
  support: COMPANY_INFO.supportEmail,
  merchants: COMPANY_INFO.merchantEmail,
  drivers: COMPANY_INFO.driverEmail,
  business: COMPANY_INFO.businessEmail,
  careers: COMPANY_INFO.careersEmail,
  media: COMPANY_INFO.mediaEmail,
};