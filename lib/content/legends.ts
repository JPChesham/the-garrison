import type { LegendData } from "@/components/cards/LegendCard";

export const legends: LegendData[] = [
  {
    slug: "brooke-combe",
    featured: true,
    image:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg",
    name: "BROOKE\nCOMBE",
    genre: "Soul · R&B · Pop",
    year: "Played The Garrison · 2021",
    genreClassName: "text-purple-light",
    bio: "Brooke Combe brought soulful vocals and pop sensibility to a packed Friday crowd. Her set had the whole room singing along by the second song.",
  },
  {
    slug: "pablo-carrizo",
    featured: true,
    image:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg",
    name: "PABLO\nCARRIZO",
    genre: "Flamenco · World · Guitar",
    year: "Played The Garrison · 2022",
    genreClassName: "text-ember",
    bio: "Pablo Carrizo's flamenco guitar filled the room with energy and precision. A masterclass in world music that left the bar silent between songs.",
  },
  {
    slug: "kat-nolan",
    featured: true,
    image:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg",
    name: "KAT\nNOLAN",
    genre: "Indie · Alt-Rock · Punk",
    year: "Played The Garrison · 2022",
    genreClassName: "text-electric",
    bio: "Kat Nolan delivered raw indie-punk with attitude. One of the loudest, tightest sets we've hosted — proper Garrison energy.",
  },
  {
    slug: "marcus-webb",
    featured: true,
    image:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg",
    name: "MARCUS\nWEBB",
    genre: "Blues · Rock · Northern Soul",
    year: "Played The Garrison · 2023",
    genreClassName: "text-amber",
    bio: "Marcus Webb blended blues grit with Northern Soul grooves. The dancefloor didn't empty all night.",
  },
  {
    slug: "donna-bright",
    featured: true,
    image:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-7.jpg",
    name: "DONNA\nBRIGHT",
    genre: "Jazz · Neo-Soul · Vocal",
    year: "Played The Garrison · 2023",
    genreClassName: "text-purple-light",
    bio: "Donna Bright's jazz and neo-soul set was smooth, sophisticated, and completely captivating. A Sunday session to remember.",
  },
  {
    slug: "ricky-stone",
    featured: true,
    image:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg",
    name: "RICKY\nSTONE",
    genre: "Classic Rock · Metal · Covers",
    year: "Played The Garrison · 2024",
    genreClassName: "text-ember",
    bio: "Ricky Stone brought classic rock and metal covers at full volume. The kind of night where you lose your voice by halftime.",
  },
  {
    slug: "the-wildflowers",
    featured: false,
    image:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-6.jpg",
    name: "THE\nWILDFLOWERS",
    genre: "Indie · Folk · Acoustic",
    year: "Played The Garrison · 2020",
    genreClassName: "text-electric",
    bio: "The Wildflowers opened our acoustic series with harmonies and folk storytelling. A gentle but memorable evening.",
  },
  {
    slug: "dj-voltage",
    featured: false,
    image:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg",
    name: "DJ\nVOLTAGE",
    genre: "House · Disco · Club",
    year: "Played The Garrison · 2023",
    genreClassName: "text-purple-light",
    bio: "DJ Voltage kept Saturday night moving until 1AM. Disco, house, and club classics without the fluff.",
  },
];

export function getFeaturedLegends() {
  return legends.filter((l) => l.featured);
}

export function getLegendBySlug(slug: string) {
  return legends.find((l) => l.slug === slug);
}

export function getAllLegendSlugs() {
  return legends.map((l) => l.slug);
}
