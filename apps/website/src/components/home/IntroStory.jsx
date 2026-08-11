import RevealText from "../common/RevealText";
import SectionLabel from "../common/SectionLabel";

export default function IntroStory() {
  return (
    <section
      id="intro"
      className="
        safari-section
        safari-section-space
        bg-safari-cream
      "
    >
      <div
        className="
          mx-auto
          max-w-[1800px]
        "
      >
        <SectionLabel number="00">
          Safari Pakistan
        </SectionLabel>

        <RevealText
          as="h2"
          className="
            mt-14
            max-w-[1500px]
            text-[clamp(3.8rem,9vw,10rem)]
            font-semibold
            leading-[0.86]
            tracking-[-0.07em]
          "
        >
          ONE APP.
          <br />
          MORE OF
          <br />
          YOUR CITY.
        </RevealText>

        <div
          className="
            mt-16
            grid
            gap-10
            lg:grid-cols-2
          "
        >
          <div />

          <RevealText
            className="
              max-w-[660px]
              editorial-copy
            "
          >
            Safari brings the things you do
            every day into one connected
            experience — getting around,
            ordering food, shopping for
            essentials and accessing local
            services.
          </RevealText>
        </div>
      </div>
    </section>
  );
}