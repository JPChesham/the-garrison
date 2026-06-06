import { Clock, DoorOpen, Ticket } from "@/lib/icons";
import type { EventData } from "@/components/cards/EventCard";

export type EventCategory = "live-band" | "dj-night" | "acoustic";

export const regularNights = [
  {
    title: "FRIDAY NIGHTS",
    description: "Live bands from 9PM · Free entry",
  },
  {
    title: "SATURDAY NIGHTS",
    description: "DJ sets & live acts from 10PM",
  },
  {
    title: "OPEN MIC WEDNESDAY",
    description: "Sign up from 7PM · All welcome",
  },
];

export const events: EventData[] = [
  {
    slug: "the-red-kites",
    category: "live-band",
    featured: true,
    variant: "purple",
    image:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/d85c98a1f7-adfed7f210eaa5bcf8be.png",
    imageAlt: "rock band performing on stage, dramatic purple stage lighting",
    day: "FRI",
    date: "06",
    month: "JUN",
    tag: "LIVE BAND",
    tagVariant: "purple",
    title: "THE RED\nKITES",
    subtitle: "Classic Rock & Brit-Pop Covers",
    description:
      "The Red Kites bring the biggest sing-along anthems from Oasis to Arctic Monkeys. Expect a packed dancefloor, proper volume, and zero pretension. Free entry — just turn up and enjoy.",
    meta: [
      { icon: Clock, label: "9PM" },
      { icon: DoorOpen, label: "FREE ENTRY" },
    ],
    zIndex: 3,
  },
  {
    slug: "nineties-reloaded",
    category: "dj-night",
    featured: true,
    variant: "ember",
    image:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/5e78657ec7-f948a2a46abdb3e3c59d.png",
    imageAlt: "DJ performing nightclub, neon lights, crowd dancing",
    day: "SAT",
    date: "07",
    month: "JUN",
    tag: "DJ NIGHT",
    tagVariant: "amber",
    title: "NINETIES\nRELOADED",
    subtitle: "Britpop · Rave · Northern Soul",
    description:
      "A full-throttle trip through the decade that never died. Britpop bangers, rave classics, and Northern Soul floor-fillers until the early hours. Tickets available via our external partner.",
    meta: [
      { icon: Clock, label: "10PM" },
      { icon: Ticket, label: "£5 ON DOOR" },
    ],
    zIndex: 2,
    marginTop: "2rem",
    ticketUrl: "https://www.ticketmaster.co.uk/",
    ticketCta: "GET TICKETS",
  },
  {
    slug: "sarah-mellows",
    category: "acoustic",
    featured: true,
    variant: "electric",
    image:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/632b3e9791-4ebd0ad922a41ed435ff.png",
    imageAlt: "female singer acoustic guitar spotlight performance",
    day: "FRI",
    date: "13",
    month: "JUN",
    tag: "ACOUSTIC",
    tagVariant: "electric",
    title: "SARAH\nMELLOWS",
    subtitle: "Singer-Songwriter · Indie Folk",
    description:
      "Intimate acoustic sets from one of Yorkshire's finest singer-songwriters. Pull up a stool, grab a pint, and settle in for an evening of original material and stripped-back covers.",
    meta: [
      { icon: Clock, label: "8PM" },
      { icon: DoorOpen, label: "FREE ENTRY" },
    ],
    zIndex: 1,
    marginTop: "-1rem",
  },
  {
    slug: "northern-soul-all-nighter",
    category: "dj-night",
    featured: false,
    variant: "ember",
    image:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/5e78657ec7-f948a2a46abdb3e3c59d.png",
    imageAlt: "Northern soul dance floor, vintage lighting",
    day: "SAT",
    date: "21",
    month: "JUN",
    tag: "DJ NIGHT",
    tagVariant: "amber",
    title: "NORTHERN SOUL\nALL NIGHTER",
    subtitle: "Rare grooves · All-nighter",
    description:
      "Rare grooves and all-nighter energy. The dancefloor stays busy until closing. Free entry.",
    meta: [
      { icon: Clock, label: "9PM" },
      { icon: DoorOpen, label: "FREE ENTRY" },
    ],
    zIndex: 1,
  },
];

export function getFeaturedEvents() {
  return events.filter((e) => e.featured);
}

export function getEventBySlug(slug: string) {
  return events.find((e) => e.slug === slug);
}

export function getAllEventSlugs() {
  return events.map((e) => e.slug);
}
