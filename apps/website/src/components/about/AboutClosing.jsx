import {
  ArrowUpRight,
} from "lucide-react";

export default function AboutClosing() {
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
          max-w-[1800px]
        "
      >
        <p
          className="
            text-[10px]
            font-bold
            uppercase
            tracking-[0.16em]
            text-white/55
          "
        >
          Move with Safari
        </p>

        <div
          className="
            mt-12
            grid
            gap-16
            lg:grid-cols-[minmax(0,1fr)_300px]
            lg:items-end
          "
        >
          <h2
            className="
              text-[clamp(4.2rem,10vw,11rem)]
              font-semibold
              leading-[0.8]
              tracking-[-0.075em]
            "
          >
            LET'S MOVE
            <br />
            FORWARD.
          </h2>

          <div>
            <p
              className="
                text-[15px]
                leading-[1.65]
                text-white/70
              "
            >
              Discover what Safari is building
              for everyday life across
              Pakistan.
            </p>

            <a
              href="/#services"
              className="
                mt-8
                inline-flex
                items-center
                gap-2
                border-b
                border-white/60
                pb-1
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
      </div>
    </section>
  );
}