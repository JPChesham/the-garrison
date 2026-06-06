import { EventCard } from "@/components/cards/EventCard";
import type { EventData } from "@/components/cards/EventCard";
import { cn } from "@/lib/utils/cn";

type EventsGridProps = {
  events: EventData[];
  className?: string;
  linkToDetail?: boolean;
};

export function EventsGrid({
  events,
  className,
  linkToDetail = true,
}: EventsGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 items-start gap-8 md:grid-cols-2 lg:grid-cols-3 xl:gap-12",
        className,
      )}
    >
      {events.map((event) => (
        <EventCard
          key={event.slug}
          event={event}
          linkToDetail={linkToDetail}
        />
      ))}
    </div>
  );
}
