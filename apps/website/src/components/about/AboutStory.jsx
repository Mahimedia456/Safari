import {
  ABOUT_ASSETS,
} from "../../lib/constants";

export default function AboutStory() {
  return (
    <section
      className="
        bg-safari-black
        text-white
      "
    >
      <div
        className="
          grid
          lg:grid-cols-2
        "
      >
        <div
          className="
            relative
            min-h-[620px]
            lg:min-h-[900px]
          "
        >
          <img
            src={ABOUT_ASSETS.people}
            alt="People in contemporary Pakistan"
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
          <div>
            <p
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-[0.16em]
                text-white/40
              "
            >
              03 / Built around people
            </p>

            <h2
              className="
                mt-12
                text-[clamp(3.8rem,7vw,8rem)]
                font-semibold
                leading-[0.84]
                tracking-[-0.07em]
              "
            >
              TECHNOLOGY
              <br />
              SHOULD FEEL
              <br />
              HUMAN.
            </h2>
          </div>

          <p
            className="
              mt-20
              max-w-[570px]
              text-[17px]
              leading-[1.65]
              text-white/65
            "
          >
            Safari is not about putting more
            technology between people and
            their city. It is about removing
            friction — making everyday
            movement, access and opportunity
            feel simpler.
          </p>
        </div>
      </div>
    </section>
  );
}