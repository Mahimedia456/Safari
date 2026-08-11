import {
  Menu,
} from "lucide-react";
import {
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  Link,
  useLocation,
} from "react-router-dom";

import {
  BRAND,
  PRIMARY_NAVIGATION,
} from "../../lib/constants";

import MobileMenu from "./MobileMenu";

function isActivePath(currentPath, href) {
  if (href === "/") {
    return currentPath === "/";
  }

  return currentPath.startsWith(href);
}

const DESKTOP_NAVIGATION = [
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
  {
    label: "About",
    href: "/about",
  },
];

export default function Header() {
  const location = useLocation();

  const [isScrolled, setIsScrolled] =
    useState(false);

  const [isMobileOpen, setIsMobileOpen] =
    useState(false);

  const closeMobileMenu = useCallback(() => {
    setIsMobileOpen(false);
  }, []);

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 18);
    }

    handleScroll();

    window.addEventListener(
      "scroll",
      handleScroll,
      {
        passive: true,
      },
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll,
      );
    };
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  const useSolidHeader = isScrolled;

  return (
    <>
      <header
        className={`
          fixed
          inset-x-0
          top-0
          z-[80]
          border-b
          transition-all
          duration-300
          ${
            useSolidHeader
              ? "border-black/10 bg-safari-cream/95 text-black shadow-[0_14px_40px_rgba(0,0,0,0.07)] backdrop-blur-xl"
              : "border-white/15 bg-transparent text-white"
          }
        `}
      >
        <div
          className="
            mx-auto
            flex
            min-h-[84px]
            max-w-[1920px]
            items-center
            justify-between
            gap-6
            px-[var(--page-gutter)]
          "
        >
          <Link
            to="/"
            aria-label="Safari home"
            className="
              relative
              z-10
              inline-flex
              shrink-0
              items-center
            "
          >
            <img
              src={
                useSolidHeader
                  ? BRAND.darkLogo
                  : BRAND.lightLogo
              }
              alt="Safari"
              className="
                h-[34px]
                w-auto
                sm:h-[38px]
                xl:h-[41px]
              "
            />
          </Link>

          <nav
            aria-label="Primary navigation"
            className="
              hidden
              min-w-0
              flex-1
              items-center
              justify-center
              gap-1
              2xl:flex
            "
          >
            {DESKTOP_NAVIGATION.map(
              (item) => {
                const isActive =
                  isActivePath(
                    location.pathname,
                    item.href,
                  );

                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={`
                      relative
                      inline-flex
                      min-h-[54px]
                      shrink-0
                      items-center
                      px-3
                      text-[14px]
                      font-semibold
                      tracking-[-0.015em]
                      transition-colors
                      duration-300
                      2xl:px-4
                      ${
                        useSolidHeader
                          ? "hover:text-safari-green"
                          : "hover:text-white"
                      }
                      ${
                        isActive
                          ? useSolidHeader
                            ? "text-safari-green"
                            : "text-white"
                          : useSolidHeader
                            ? "text-black/62"
                            : "text-white/72"
                      }
                    `}
                  >
                    {item.label}

                    <span
                      className={`
                        absolute
                        inset-x-3
                        bottom-[5px]
                        h-[2px]
                        origin-left
                        transition-transform
                        duration-300
                        2xl:inset-x-4
                        ${
                          useSolidHeader
                            ? "bg-safari-green"
                            : "bg-white"
                        }
                        ${
                          isActive
                            ? "scale-x-100"
                            : "scale-x-0"
                        }
                      `}
                    />
                  </Link>
                );
              },
            )}
          </nav>

          <div
            className="
              flex
              shrink-0
              items-center
              gap-3
            "
          >
            <a
              href="/#download"
              className={`
                hidden
                min-h-[50px]
                min-w-[166px]
                items-center
                justify-center
                px-6
                text-[13px]
                font-semibold
                transition-all
                duration-300
                lg:inline-flex
                ${
                  useSolidHeader
                    ? "bg-safari-green text-white hover:bg-black"
                    : "bg-white text-black hover:bg-safari-green hover:text-white"
                }
              `}
            >
              Download Safari
            </a>

            <button
              type="button"
              aria-label="Open navigation menu"
              aria-expanded={isMobileOpen}
              onClick={() =>
                setIsMobileOpen(true)
              }
              className={`
                inline-flex
                h-12
                w-12
                items-center
                justify-center
                rounded-full
                border
                transition-all
                duration-300
                2xl:hidden
                ${
                  useSolidHeader
                    ? "border-black/15 hover:bg-black hover:text-white"
                    : "border-white/25 hover:bg-white hover:text-black"
                }
              `}
            >
              <Menu
                size={22}
                strokeWidth={1.7}
              />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={isMobileOpen}
        onClose={closeMobileMenu}
      />
    </>
  );
}