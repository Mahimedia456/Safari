import SectionLabel from "../common/SectionLabel";

export default function RideStory() {
  return (
    <section
      id="ride"
      className="
        relative
        bg-safari-black
        py-[var(--section-space)]
        text-white
      "
    >
      <div
        className="
          px-[var(--page-gutter)]
        "
      >
        <SectionLabel number="02">
          Safari Ride
        </SectionLabel>

        <div
          className="
            mt-14
            grid
            gap-12
            lg:grid-cols-[minmax(0,1fr)_360px]
            lg:items-end
          "
        >
          <h2
            className="
              text-[clamp(4rem,8.8vw,9.8rem)]
              font-semibold
              leading-[0.82]
              tracking-[-0.075em]
            "
          >
            THE CITY
            <br />
            IS CLOSER
            <br />
            THAN EVER.
          </h2>

          <p
            className="
              max-w-[350px]
              text-[15px]
              leading-[1.65]
              text-white/60
            "
          >
            Request your ride, follow the
            journey and move with confidence
            from pickup to destination.
          </p>
        </div>
      </div>

      <div
        className="
          relative
          mt-20
          h-[68vh]
          min-h-[560px]
          overflow-hidden
        "
      >
        <img
          src="https://images.pexels.com/photos/7200709/pexels-photo-7200709.jpeg?auto=compress&cs=tinysrgb&w=2200"
          alt="Urban ride"
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
            bg-gradient-to-r
            from-black/35
            via-transparent
            to-transparent
          "
        />

        <div
          className="
            absolute
            bottom-8
            left-[var(--page-gutter)]
            text-[10px]
            font-bold
            uppercase
            tracking-[0.15em]
          "
        >
          Move through your city
        </div>
      </div>
    </section>
  );
}