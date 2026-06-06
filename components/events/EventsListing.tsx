"use client";

import { useMemo, useState } from "react";
import { EventsGrid } from "@/components/events/EventsGrid";
import { Container } from "@/components/ui/Container";
import type { EventCategory } from "@/lib/content/events";
import { events } from "@/lib/content/events";
import { cn } from "@/lib/utils/cn";

const filters: { label: string; value: EventCategory | "all" }[] = [
  { label: "ALL", value: "all" },
  { label: "LIVE BAND", value: "live-band" },
  { label: "DJ NIGHT", value: "dj-night" },
  { label: "ACOUSTIC", value: "acoustic" },
];

export function EventsListing() {
  const [active, setActive] = useState<EventCategory | "all">("all");

  const filtered = useMemo(
    () =>
      active === "all"
        ? events
        : events.filter((event) => event.category === active),
    [active],
  );

  return (
    <Container className="pb-16 xl:pb-24">
      <div className="mb-8 flex flex-wrap gap-3">
        {filters.map((filter) => (
          <button
            key={filter.value}
            type="button"
            onClick={() => setActive(filter.value)}
            className={cn(
              "rounded-sm border px-4 py-2 font-bebas text-sm tracking-widest transition-colors",
              active === filter.value
                ? "border-ember bg-ember text-white"
                : "border-charcoal-light text-charcoal-light hover:border-ember hover:text-ember",
            )}
          >
            {filter.label}
          </button>
        ))}
      </div>
      <EventsGrid events={filtered} />
    </Container>
  );
}
