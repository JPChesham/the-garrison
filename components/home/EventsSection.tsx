import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { EventsGrid } from "@/components/events/EventsGrid";
import { getFeaturedEvents } from "@/lib/hygraph/get-events";

export async function EventsSection() {
  const featuredEvents = await getFeaturedEvents();

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
        {featuredEvents.length > 0 ? (
          <EventsGrid events={featuredEvents} />
        ) : (
          <p className="font-barlow text-base text-charcoal-light">
            Upcoming events coming soon.
          </p>
        )}
      </Container>
    </section>
  );
}
