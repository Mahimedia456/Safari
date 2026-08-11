import {
  ArrowUpRight,
  Globe2,
  MapPin,
} from "lucide-react";
import { Link } from "react-router-dom";

import {
  BRAND,
  FOOTER_LINKS,
  SOCIAL_LINKS,
} from "../../lib/constants";

function FooterLink({ item }) {
  if (item.disabled) {
    return (
      <span
        title="Coming soon"
        className="
          inline-flex
          cursor-not-allowed
          items-center
          gap-2
          text-[13px]
          font-medium
          text-white/25
        "
      >
        {item.label}

        <span
          className="
            rounded-full
            border
            border-white/15
            px-2
            py-0.5
            text-[7px]
            font-bold
            uppercase
            tracking-[0.1em]
            text-white/30
          "
        >
          Soon
        </span>
      </span>
    );
  }

  return (
    <Link
      to={item.href}
      className="
        inline-flex
        w-fit
        items-center
        text-[13px]
        font-medium
        text-white/55
        transition-colors
        hover:text-white
      "
    >
      {item.label}
    </Link>
  );
}

export default function Footer() {
  const currentYear =
    new Date().getFullYear();

  return (
    <footer
      className="
        bg-safari-black
        px-[var(--page-gutter)]
        text-white
      "
    >
      <div
        className="
          mx-auto
          max-w-[1800px]
          border-t
          border-white/15
          pb-8
          pt-16
          sm:pt-20
          lg:pt-24
        "
      >
        <div
          className="
            grid
            gap-16
            xl:grid-cols-[0.95fr_2.05fr]
          "
        >
          <div>
            <Link
              to="/"
              aria-label="Safari home"
              className="inline-flex"
            >
              <img
                src={BRAND.lightLogo}
                alt="Safari"
                className="
                  h-[35px]
                  w-auto
                  sm:h-[41px]
                "
              />
            </Link>

            <h2
              className="
                mt-12
                max-w-[650px]
                text-[clamp(3.4rem,6.4vw,7.2rem)]
                font-semibold
                leading-[0.82]
                tracking-[-0.07em]
              "
            >
              YOUR CITY.
              <br />
              ONE APP.
            </h2>

            <p
              className="
                mt-9
                max-w-[500px]
                text-[14px]
                leading-[1.75]
                text-white/48
              "
            >
              Move, order and access useful
              everyday services through one
              connected Safari experience.
            </p>

            <div
              className="
                mt-10
                flex
                flex-wrap
                gap-3
              "
            >
              <div
                className="
                  inline-flex
                  min-h-[46px]
                  items-center
                  gap-3
                  border
                  border-white/15
                  px-4
                  text-[11px]
                  font-semibold
                  text-white/60
                "
              >
                <MapPin
                  size={15}
                  strokeWidth={1.6}
                />

                Pakistan
              </div>

              <div
                className="
                  inline-flex
                  min-h-[46px]
                  items-center
                  gap-3
                  border
                  border-white/15
                  px-4
                  text-[11px]
                  font-semibold
                  text-white/60
                "
              >
                <Globe2
                  size={15}
                  strokeWidth={1.6}
                />

                English
              </div>
            </div>
          </div>

          <div
            className="
              grid
              grid-cols-2
              gap-x-8
              gap-y-14
              border-t
              border-white/15
              pt-10
              md:grid-cols-4
              xl:border-l
              xl:border-t-0
              xl:pl-14
              xl:pt-0
            "
          >
            {FOOTER_LINKS.map((group) => (
              <div key={group.title}>
                <h3
                  className="
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.16em]
                    text-white/30
                  "
                >
                  {group.title}
                </h3>

                <div
                  className="
                    mt-7
                    flex
                    flex-col
                    items-start
                    gap-4
                  "
                >
                  {group.links.map((item) => (
                    <FooterLink
                      key={`${group.title}-${item.label}`}
                      item={item}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          className="
            mt-20
            border-y
            border-white/15
            py-8
          "
        >
          <div
            className="
              flex
              flex-col
              gap-8
              md:flex-row
              md:items-center
              md:justify-between
            "
          >
            <div>
              <p
                className="
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.16em]
                  text-white/30
                "
              >
                Follow Safari
              </p>

              <div
                className="
                  mt-5
                  flex
                  flex-wrap
                  gap-x-7
                  gap-y-3
                "
              >
                {SOCIAL_LINKS.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target={
                      item.href === "#"
                        ? undefined
                        : "_blank"
                    }
                    rel={
                      item.href === "#"
                        ? undefined
                        : "noreferrer"
                    }
                    className="
                      group
                      inline-flex
                      items-center
                      gap-2
                      text-[13px]
                      font-semibold
                      text-white/55
                      transition-colors
                      hover:text-white
                    "
                  >
                    {item.label}

                    <ArrowUpRight
                      size={14}
                      strokeWidth={1.6}
                      className="
                        transition-transform
                        group-hover:-translate-y-0.5
                        group-hover:translate-x-0.5
                      "
                    />
                  </a>
                ))}
              </div>
            </div>

            <a
              href="/#download"
              className="
                inline-flex
                min-h-[54px]
                items-center
                justify-between
                gap-10
                bg-safari-green
                px-6
                text-[12px]
                font-semibold
                transition-colors
                hover:bg-white
                hover:text-black
              "
            >
              Download Safari

              <ArrowUpRight
                size={17}
                strokeWidth={1.7}
              />
            </a>
          </div>
        </div>

        <div
          className="
            flex
            flex-col
            gap-4
            pt-7
            text-[9px]
            font-semibold
            uppercase
            tracking-[0.12em]
            text-white/28
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <p>
            © {currentYear} Safari Pakistan.
            All rights reserved.
          </p>

          <p>Built for Pakistan.</p>
        </div>
      </div>
    </footer>
  );
}