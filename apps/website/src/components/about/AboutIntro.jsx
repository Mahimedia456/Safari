import SectionLabel from "../common/SectionLabel";
import RevealText from "../common/RevealText";

export default function AboutIntro() {
  return (
    <section
      id="about-intro"
      className="
        bg-safari-cream
        px-[var(--page-gutter)]
        py-[var(--section-space)]
      "
    >
      <div
        className="
          mx-auto
          max-w-[1800px]
        "
      >
        <SectionLabel number="01">
          Why Safari
        </SectionLabel>

        <RevealText
          as="h2"
          className="
            mt-14
            max-w-[1500px]
            text-[clamp(4rem,9vw,10rem)]
            font-semibold
            leading-[0.84]
            tracking-[-0.075em]
          "
        >
          EVERYDAY LIFE
          <br />
          SHOULD MOVE
          <br />
          BETTER.
        </RevealText>

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
              max-w-[460px]
              text-[12px]
              font-semibold
              uppercase
              tracking-[0.12em]
              text-black/45
            "
          >
            Our point of view
          </p>

          <p
            className="
              max-w-[720px]
              text-[clamp(1.35rem,2.1vw,2.2rem)]
              font-medium
              leading-[1.42]
              tracking-[-0.035em]
            "
          >
            Cities work better when people can
            move, access what they need and
            participate in opportunity without
            unnecessary friction.
          </p>
        </div>
      </div>
    </section>
  );
}