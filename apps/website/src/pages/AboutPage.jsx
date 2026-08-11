import PageShell from "../components/layout/PageShell";

import AboutHero from "../components/about/AboutHero";
import AboutIntro from "../components/about/AboutIntro";
import AboutMission from "../components/about/AboutMission";
import AboutStory from "../components/about/AboutStory";
import AboutValues from "../components/about/AboutValues";
import AboutPakistan from "../components/about/AboutPakistan";
import AboutClosing from "../components/about/AboutClosing";

export default function AboutPage() {
  return (
    <PageShell>
      <AboutHero />
      <AboutIntro />
      <AboutMission />
      <AboutStory />
      <AboutValues />
      <AboutPakistan />
      <AboutClosing />
    </PageShell>
  );
}