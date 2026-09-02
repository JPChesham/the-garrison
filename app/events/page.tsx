import type { Metadata } from "next";
import { Guitar, Mic, Music, type LucideIcon } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { EventsListing } from "@/components/events/EventsListing";
import { FeatureRow } from "@/components/cards/FeatureRow";
import { Container } from "@/components/ui/Container";
import { SectionDivider } from "@/components/ui/SectionDivider";
import type { RegularNightData } from "@/lib/content/types";
import { getEvents } from "@/lib/hygraph/get-events";
import { getRegularNights } from "@/lib/hygraph/get-regular-nights";

export const metadata: Metadata = {
  title: "What's On | The Garrison",
  description:
    "Live music, DJ nights, and acoustic sessions at The Garrison, Barnsley.",
};

const ICON_MAP: Record<
  RegularNightData["iconKey"],
  { icon: LucideIcon; iconBgClassName: string }
> = {
  guitar: { icon: Guitar, iconBgClassName: "bg-purple" },
  music: { icon: Music, iconBgClassName: "bg-electric" },
  mic: { icon: Mic, iconBgClassName: "bg-ember" },
};

export default async function EventsPage() {
  const [events, regularNights] = await Promise.all([
    getEvents(),
    getRegularNights(),
  ]);

  return (
    <>
      <PageHero
        variant="purple"
        eyebrow="— THE WALL OF SOUND"
        eyebrowClassName="text-purple-light"
        title={
          <>
            WHAT&apos;S <span className="text-ember">ON</span>
          </>
        }
        description="Upcoming gigs, DJ nights, and acoustic sessions. Free entry unless stated — ticketed events link to our external partner."
      />
      <EventsListing events={events} />
      <SectionDivider />
      <section className="bg-charcoal py-16 xl:py-24">
        <Container>
          <p className="mb-3 font-barlow text-xs font-extrabold uppercase tracking-widest text-purple-light">
            — EVERY WEEK
          </p>
          <h2 className="mb-8 font-bebas text-4xl text-white">
            REGULAR <span className="text-purple-light">NIGHTS</span>
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {regularNights.map((night) => {
              const { icon, iconBgClassName } = ICON_MAP[night.iconKey];
              return (
                <FeatureRow
                  key={night.title}
                  icon={icon}
                  iconBgClassName={iconBgClassName}
                  title={night.title}
                  description={night.description}
                />
              );
            })}
          </div>
        </Container>
      </section>
    </>
  );
}
