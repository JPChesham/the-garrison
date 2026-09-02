import type { EventData } from "@/components/cards/EventCard";
import type { EventCategory } from "@/lib/content/events";
import { hygraphFetch } from "./client";

type HygraphCategory = "LIVE_BAND" | "DJ_NIGHT" | "ACOUSTIC" | "LIVE_SHOW";
type HygraphAccent = "PURPLE" | "EMBER" | "ELECTRIC" | "AMBER" | "GREEN";
type HygraphEntryType = "FREE" | "ON_DOOR" | "TICKETED";

type HygraphEvent = {
  slug: string;
  title: string;
  subtitle: string | null;
  description: { text: string } | null;
  featured: boolean | null;
  startsAt: string;
  tag: string | null;
  imageAlt: string | null;
  startTimeLabel: string | null;
  entryLabel: string | null;
  ticketUrl: string | null;
  ticketCta: string | null;
  image: { url: string } | null;
  category: HygraphCategory;
  tagVariant: HygraphAccent | null;
  cardVariant: HygraphAccent | null;
  entryType: HygraphEntryType | null;
};

const EVENT_FIELDS = `
  slug
  title
  subtitle
  description { text }
  featured
  startsAt
  tag
  imageAlt
  startTimeLabel
  entryLabel
  ticketUrl
  ticketCta
  image { url }
  category
  tagVariant
  cardVariant
  entryType
`;

const CATEGORY_MAP: Record<HygraphCategory, EventCategory> = {
  LIVE_BAND: "live-band",
  DJ_NIGHT: "dj-night",
  ACOUSTIC: "acoustic",
  LIVE_SHOW: "live-show",
};

const ACCENT_MAP: Record<
  HygraphAccent,
  EventData["tagVariant"]
> = {
  PURPLE: "purple",
  EMBER: "ember",
  ELECTRIC: "electric",
  AMBER: "amber",
  GREEN: "green",
};

function cardVariantFrom(
  accent: HygraphAccent | null,
): EventData["variant"] {
  if (!accent || accent === "AMBER") return "purple";
  if (accent === "GREEN") return "green";
  return ACCENT_MAP[accent] as EventData["variant"];
}

function calendarParts(startsAt: string) {
  const date = new Date(startsAt);
  const options = { timeZone: "Europe/London" } as const;

  return {
    day: new Intl.DateTimeFormat("en-GB", {
      ...options,
      weekday: "short",
    })
      .format(date)
      .toUpperCase(),
    date: new Intl.DateTimeFormat("en-GB", {
      ...options,
      day: "2-digit",
    }).format(date),
    month: new Intl.DateTimeFormat("en-GB", {
      ...options,
      month: "short",
    })
      .format(date)
      .toUpperCase(),
  };
}

function mapEvent(event: HygraphEvent, index: number, total: number): EventData {
  const calendar = calendarParts(event.startsAt);
  const isTicketed = event.entryType === "TICKETED" || Boolean(event.ticketUrl);
  const meta: EventData["meta"] = [];

  if (event.startTimeLabel) {
    meta.push({ icon: "clock", label: event.startTimeLabel });
  }

  if (event.entryLabel) {
    meta.push({
      icon: isTicketed ? "ticket" : "door",
      label: event.entryLabel,
    });
  }

  return {
    slug: event.slug,
    category: CATEGORY_MAP[event.category],
    featured: event.featured ?? false,
    variant: cardVariantFrom(event.cardVariant),
    image: event.image?.url,
    imageAlt: event.imageAlt ?? event.title.replaceAll("\n", " "),
    startsAt: event.startsAt,
    day: calendar.day,
    date: calendar.date,
    month: calendar.month,
    tag: event.tag ?? CATEGORY_MAP[event.category].replaceAll("-", " ").toUpperCase(),
    tagVariant: event.tagVariant ? ACCENT_MAP[event.tagVariant] : "purple",
    title: event.title,
    subtitle: event.subtitle ?? "",
    description: event.description?.text?.trim() ?? "",
    meta,
    zIndex: total - index,
    ticketUrl: event.ticketUrl ?? undefined,
    ticketCta: event.ticketCta ?? undefined,
    isFree: event.entryType === "FREE",
  };
}

export async function getEvents(): Promise<EventData[]> {
  try {
    const data = await hygraphFetch<{ events: HygraphEvent[] }>(
      `query Events {
        events(orderBy: startsAt_ASC) {
          ${EVENT_FIELDS}
        }
      }`,
    );

    return data.events.map((event, index) =>
      mapEvent(event, index, data.events.length),
    );
  } catch (error) {
    console.error("[hygraph] Failed to load events:", error);
    return [];
  }
}

export async function getFeaturedEvents(): Promise<EventData[]> {
  try {
    const data = await hygraphFetch<{ events: HygraphEvent[] }>(
      `query FeaturedEvents {
        events(where: { featured: true }, orderBy: startsAt_ASC) {
          ${EVENT_FIELDS}
        }
      }`,
    );

    return data.events.map((event, index) =>
      mapEvent(event, index, data.events.length),
    );
  } catch (error) {
    console.error("[hygraph] Failed to load featured events:", error);
    return [];
  }
}

export async function getEventBySlug(slug: string): Promise<EventData | null> {
  try {
    const data = await hygraphFetch<{ event: HygraphEvent | null }>(
      `query EventBySlug($slug: String!) {
        event(where: { slug: $slug }) {
          ${EVENT_FIELDS}
        }
      }`,
      { slug },
    );

    return data.event ? mapEvent(data.event, 0, 1) : null;
  } catch (error) {
    console.error("[hygraph] Failed to load event:", error);
    return null;
  }
}

export async function getAllEventSlugs(): Promise<string[]> {
  const events = await getEvents();
  return events.map((event) => event.slug);
}

function upcomingFromIso(now = new Date()) {
  const bucketMs = 5 * 60 * 1000;
  return new Date(Math.floor(now.getTime() / bucketMs) * bucketMs).toISOString();
}

export async function getNextUpcomingEvent(): Promise<EventData | null> {
  try {
    const from = upcomingFromIso();
    const data = await hygraphFetch<{ events: HygraphEvent[] }>(
      `query NextUpcomingEvent($from: DateTime!) {
        events(where: { startsAt_gte: $from }, orderBy: startsAt_ASC, first: 1) {
          ${EVENT_FIELDS}
        }
      }`,
      { from },
    );

    const event = data.events[0];
    return event ? mapEvent(event, 0, 1) : null;
  } catch (error) {
    console.error("[hygraph] Failed to load next upcoming event:", error);
    return null;
  }
}
