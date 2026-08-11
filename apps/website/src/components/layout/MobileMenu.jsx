import { useEffect } from "react";
import { ArrowRight, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import {
  BRAND,
  MOBILE_NAVIGATION,
  SOCIAL_LINKS,
} from "../../lib/constants";

function isActivePath(currentPath, href) {
  if (href === "/") {
    return currentPath === "/";
  }

  return currentPath.startsWith(href);
}

export default function MobileMenu({
  isOpen,
  onClose,
}) {
  const location = useLocation();

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () => {
      document.body.style.overflow =
        previousOverflow;

      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    onClose();
  }, [location.pathname, onClose]);

  return (
    <div
      aria-hidden={!isOpen}
      className={`
        fixed
        inset-0
        z-[100]
        bg-safari-black
        text-white
        transition-all
        duration-500
        ${
          isOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-4 opacity-0"
        }
      `}
    >
      <div
        className="
          flex
          h-full
          flex-col
          overflow-y-auto
          px-[var(--page-gutter)]
        "
      >
        <div
          className="
            flex
            min-h-[var(--header-height)]
            items-center
            justify-between
            border-b
            border-white/15
          "
        >
          <Link
            to="/"
            onClick={onClose}
            aria-label="Safari home"
            className="inline-flex items-center"
          >
            <img
              src={BRAND.lightLogo}
              alt="Safari"
              className="
                h-[30px]
                w-auto
                sm:h-[34px]
              "
            />
          </Link>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation menu"
            className="
              inline-flex
              h-12
              w-12
              items-center
              justify-center
              rounded-full
              border
              border-white/20
              transition-colors
              hover:bg-white
              hover:text-black
            "
          >
            <X
              size={21}
              strokeWidth={1.6}
            />
          </button>
        </div>

        <div
          className="
            grid
            flex-1
            gap-16
            py-12
            lg:grid-cols-[1fr_360px]
          "
        >
          <nav aria-label="Mobile navigation">
            <div className="border-t border-white/15">
              {MOBILE_NAVIGATION.map(
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
                      onClick={onClose}
                      className={`
                        group
                        grid
                        grid-cols-[42px_1fr_auto]
                        items-center
                        border-b
                        border-white/15
                        py-4
                        transition-colors
                        sm:py-5
                        ${
                          isActive
                            ? "text-white"
                            : "text-white/58 hover:text-white"
                        }
                      `}
                    >
                      <span
                        className="
                          text-[9px]
                          font-semibold
                          tracking-[0.12em]
                          text-white/30
                        "
                      >
                        {item.number}
                      </span>

                      <span
                        className="
                          text-[clamp(2rem,8vw,4.8rem)]
                          font-semibold
                          leading-none
                          tracking-[-0.055em]
                        "
                      >
                        {item.label}
                      </span>

                      <ArrowRight
                        size={19}
                        strokeWidth={1.5}
                        className="
                          -translate-x-2
                          opacity-0
                          transition-all
                          duration-300
                          group-hover:translate-x-0
                          group-hover:opacity-100
                        "
                      />
                    </Link>
                  );
                },
              )}
            </div>
          </nav>

          <aside
            className="
              flex
              flex-col
              justify-end
              border-t
              border-white/15
              pt-8
              lg:border-l
              lg:border-t-0
              lg:pl-10
              lg:pt-0
            "
          >
            <p
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-[0.16em]
                text-white/35
              "
            >
              Available in Pakistan
            </p>

            <h2
              className="
                mt-5
                max-w-[320px]
                text-[clamp(2.4rem,7vw,4.5rem)]
                font-semibold
                leading-[0.9]
                tracking-[-0.06em]
              "
            >
              YOUR CITY.
              <br />
              ONE APP.
            </h2>

            <a
              href="/#download"
              onClick={onClose}
              className="
                mt-9
                inline-flex
                min-h-[58px]
                items-center
                justify-between
                gap-8
                bg-safari-green
                px-6
                text-[13px]
                font-semibold
                text-white
                transition-transform
                hover:-translate-y-1
              "
            >
              Download Safari

              <ArrowRight
                size={17}
                strokeWidth={1.7}
              />
            </a>

            <div
              className="
                mt-10
                flex
                flex-wrap
                gap-x-6
                gap-y-3
                border-t
                border-white/15
                pt-6
              "
            >
              {SOCIAL_LINKS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="
                    text-[11px]
                    font-semibold
                    text-white/45
                    transition-colors
                    hover:text-white
                  "
                >
                  {item.label}
                </a>
              ))}
            </div>
          </aside>
        </div>

        <div
          className="
            flex
            flex-col
            gap-3
            border-t
            border-white/15
            py-5
            text-[10px]
            font-medium
            uppercase
            tracking-[0.12em]
            text-white/35
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <span>
            © {new Date().getFullYear()} Safari
            Pakistan
          </span>

          <span>Built for everyday movement</span>
        </div>
      </div>
    </div>
  );
}