import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { EventsGrid } from "@/components/events/EventsGrid";
import { getFeaturedEvents } from "@/lib/content/events";

export function EventsSection() {
  const featuredEvents = getFeaturedEvents();

  return (
    <section id="events" className="purple-light-section py-16 xl:py-24">
      <Container>
        <SectionHeader
          eyebrow="— THE WALL OF SOUND · THIS MONTH"
          eyebrowClassName="text-purple-light"
          title={
            <>
              WHAT&apos;S <span className="text-ember">ON</span>
            </>
          }
          action={
            <Button variant="outline-charcoal" href="/events">
              ALL EVENTS →
            </Button>
          }
        />
        <EventsGrid events={featuredEvents} />
      </Container>
    </section>
  );
}
