import {
  Apple,
  ArrowUpRight,
  Play,
} from "lucide-react";

function StoreButton({
  type,
  href = "#",
}) {
  const isApple = type === "apple";

  return (
    <a
      href={href}
      aria-label={
        isApple
          ? "Download Safari on the App Store"
          : "Get Safari on Google Play"
      }
      className="
        group
        inline-flex
        min-h-[68px]
        min-w-[210px]
        items-center
        gap-4
        border
        border-white/25
        bg-black
        px-5
        py-3
        text-white
        transition-all
        duration-500
        hover:border-white
        hover:bg-white
        hover:text-black
      "
    >
      {isApple ? (
        <Apple
          size={30}
          strokeWidth={1.7}
        />
      ) : (
        <Play
          size={28}
          strokeWidth={1.7}
        />
      )}

      <span className="text-left">
        <span
          className="
            block
            text-[9px]
            font-semibold
            uppercase
            tracking-[0.11em]
            opacity-60
          "
        >
          {isApple
            ? "Download on the"
            : "Get it on"}
        </span>

        <span
          className="
            mt-0.5
            block
            text-[18px]
            font-semibold
            leading-none
            tracking-[-0.035em]
          "
        >
          {isApple
            ? "App Store"
            : "Google Play"}
        </span>
      </span>
    </a>
  );
}

export default function DownloadCTA() {
  return (
    <section
      id="download"
      className="
        relative
        overflow-hidden
        bg-safari-green
        px-[var(--page-gutter)]
        py-[var(--section-space)]
        text-white
      "
    >
      <div
        className="
          pointer-events-none
          absolute
          -right-[18vw]
          top-1/2
          h-[70vw]
          w-[70vw]
          -translate-y-1/2
          rounded-full
          border
          border-white/10
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -right-[8vw]
          top-1/2
          h-[48vw]
          w-[48vw]
          -translate-y-1/2
          rounded-full
          border
          border-white/10
        "
      />

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-[1800px]
        "
      >
        <p
          className="
            text-[10px]
            font-bold
            uppercase
            tracking-[0.15em]
            text-white/55
          "
        >
          Available soon
        </p>

        <div
          className="
            mt-12
            grid
            gap-16
            lg:grid-cols-[minmax(0,1fr)_420px]
            lg:items-end
          "
        >
          <h2
            className="
              max-w-[1350px]
              text-[clamp(4.2rem,10vw,11rem)]
              font-semibold
              leading-[0.8]
              tracking-[-0.075em]
            "
          >
            TAKE SAFARI
            <br />
            WITH YOU.
          </h2>

          <div>
            <p
              className="
                max-w-[390px]
                text-[15px]
                leading-[1.65]
                text-white/70
              "
            >
              Your rides, deliveries and
              everyday services in one place.
              Get Safari for iPhone and
              Android.
            </p>

            <div
              className="
                mt-8
                flex
                flex-col
                gap-3
                sm:flex-row
                lg:flex-col
                xl:flex-row
              "
            >
              <StoreButton
                type="apple"
                href="#"
              />

              <StoreButton
                type="google"
                href="#"
              />
            </div>
          </div>
        </div>

        <div
          className="
            mt-24
            flex
            flex-col
            gap-5
            border-t
            border-white/25
            pt-6
            md:flex-row
            md:items-center
            md:justify-between
          "
        >
          <p
            className="
              max-w-[580px]
              text-[14px]
              leading-[1.6]
              text-white/70
            "
          >
            One connected experience built
            around the way your city moves.
          </p>

          <a
            href="#services"
            className="
              inline-flex
              items-center
              gap-2
              text-[13px]
              font-semibold
            "
          >
            Explore Safari

            <ArrowUpRight
              size={16}
              strokeWidth={1.7}
            />
          </a>
        </div>
      </div>
    </section>
  );
}