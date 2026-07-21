import {
  CommunitySection,
  DrinksSection,
  EventsSection,
  HeroSection,
  LegendsSection,
  LiveMusicSection,
  SocialSection,
  SportSection,
  TickerBand,
} from "@/components/home";
import { SectionDivider } from "@/components/ui/SectionDivider";

export default function Home() {
  return (
    <>
      <HeroSection />
      <TickerBand />
      <SectionDivider />
      <EventsSection />
      <SectionDivider />
      <SportSection />
      <SectionDivider />
      <LegendsSection />
      <SectionDivider />
      <DrinksSection />
      <SectionDivider />
      <LiveMusicSection />
      <SectionDivider />
      <SocialSection />
      <SectionDivider />
      <CommunitySection />
    </>
  );
}
