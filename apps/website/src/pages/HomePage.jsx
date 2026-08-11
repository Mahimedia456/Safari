import PageShell from "../components/layout/PageShell";

import Hero from "../components/home/Hero";
import IntroStory from "../components/home/IntroStory";
import ServicesStory from "../components/home/ServicesStory";
import RideStory from "../components/home/RideStory";
import AppExperience from "../components/home/AppExperience";
import DriverStory from "../components/home/DriverStory";
import SafetyStory from "../components/home/SafetyStory";
import CityStory from "../components/home/CityStory";
import DownloadCTA from "../components/home/DownloadCTA";

export default function HomePage() {
  return (
    <PageShell>
      <Hero />

      <IntroStory />

      <ServicesStory />

      <RideStory />

      <AppExperience />

      <DriverStory />

      <SafetyStory />

      <CityStory />

      <DownloadCTA />
    </PageShell>
  );
}