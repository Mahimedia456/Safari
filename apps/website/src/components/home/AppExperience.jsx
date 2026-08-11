import SectionLabel from "../common/SectionLabel";
import SafariScene from "../three/SafariScene";

export default function AppExperience() {
  return (
    <section
      className="
        relative
        bg-safari-green
        text-white
      "
    >
      <div
        className="
          grid
          min-h-[820px]
          lg:grid-cols-2
        "
      >
        <div
          className="
            flex
            flex-col
            justify-between
            px-[var(--page-gutter)]
            py-[var(--section-space)]
          "
        >
          <SectionLabel number="03">
            The Safari app
          </SectionLabel>

          <div className="mt-20">
            <h2 className="display-md">
              EVERYTHING
              <br />
              IN YOUR
              <br />
              HAND.
            </h2>

            <p
              className="
                mt-10
                max-w-[520px]
                editorial-copy
                text-white/75
              "
            >
              One familiar experience across
              rides, deliveries, payments and
              services.
            </p>
          </div>
        </div>

        <div
          className="
            min-h-[580px]
            lg:min-h-[820px]
          "
        >
          <SafariScene />
        </div>
      </div>
    </section>
  );
}