import type {
  DrinksContentData,
  HomeHeroContent,
  RegularNightData,
  SiteConfig,
  SiteSettings,
  SocialImageItem,
  SportContentData,
} from "./types";

export const defaultSiteConfig: SiteConfig = {
  name: "THE GARRISON",
  tagline: "Barnsley's Home of Live Music & Sport",
  address: "47 Market Street, Barnsley, S70 1SQ",
  addressShort: "47 Market St, Barnsley S70 1SQ",
  phone: "01226 983727",
  phoneHref: "tel:01226983727",
  email: "hello@thegarrison.co.uk",
  gigsEmail: "gigs@thegarrison.co.uk",
  instagram: "https://instagram.com/the.garrison",
  instagramHandle: "@the.garrison",
  facebook: "https://www.facebook.com/TheGarrisonBarnsley",
};

export const fallbackSiteSettings: SiteSettings = {
  siteConfig: defaultSiteConfig,
  openingHours: [
    { days: "MON–THU", hours: "4PM – 11PM" },
    { days: "FRI–SAT", hours: "12PM – 1AM" },
    { days: "SUNDAY", hours: "12PM – 10PM" },
  ],
  ownerQuote: {
    text: `"We've been here since 2018, serving proper pints to proper people. No gimmicks. No VIP nonsense. Just great music, great sport, and the best atmosphere in South Yorkshire."`,
    name: "DAVE HARTLEY",
    role: "Founder & Landlord",
    avatar:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-9.jpg",
  },
  visitInfo: {
    parking:
      "Town centre parking within walking distance. Market Street car parks open until late on event nights.",
    transit:
      "Barnsley Interchange is a 10-minute walk. Regular buses stop on Market Street.",
    accessibility:
      "Step-free access from Market Street. If you need anything on the night, ask any member of staff.",
    walkIns:
      "Walk-ins always welcome. No table reservations — just turn up and grab a spot.",
  },
  mapEmbedUrl:
    "https://www.openstreetmap.org/export/embed.html?bbox=-1.4900,53.5480,-1.4700,53.5580&layer=mapnik&marker=53.5535,-1.4797",
  seoTitle: "The Garrison | Barnsley's Home of Live Music & Sport",
  seoDescription:
    "Live music most Fridays & Saturdays, all major sport on 6 big screens, and the best pint in Barnsley. Est. 2018.",
};

export const fallbackHomeHero: HomeHeroContent = {
  mobileImage:
    "https://storage.googleapis.com/uxpilot-auth.appspot.com/ee7f9e6bc3-700077247e6a682d9942.png",
  desktopImage:
    "https://storage.googleapis.com/uxpilot-auth.appspot.com/ee7f9e6bc3-c312b491b90e191b0810.png",
  imageAlt:
    "packed concert crowd under intense purple and blue stage lighting, silhouettes raised hands, smoke haze, live music venue",
  tagline: "No Frills. All Thrills. Est. 2018.",
  primaryCtaLabel: "SEE EVENTS",
  primaryCtaHref: "#events",
  secondaryCtaLabel: "LIVE SPORT",
  secondaryCtaHref: "#sport",
};

export const fallbackMarqueeItems = [
  "🎸 LIVE MUSIC MOST FRIDAYS & SATURDAYS",
  "⚽ ALL MAJOR SPORT LIVE ON 6 BIG SCREENS",
  "🍺 BEST PINT IN BARNSLEY — GUARANTEED",
];

export const liveMusicImage = {
  src: "https://storage.googleapis.com/uxpilot-auth.appspot.com/3d8801a478-4eebd11d3b05907b1749.png",
  alt: "electric guitarist on stage dramatic purple blue stage lighting",
};

export const fallbackSocialImages: SocialImageItem[] = [
  {
    src: "https://storage.googleapis.com/uxpilot-auth.appspot.com/bd278420e7-901a7310270c8ea44f95.png",
    alt: "crowded pub interior people laughing drinks raised",
    colSpan: "col-span-1",
  },
  {
    src: "https://storage.googleapis.com/uxpilot-auth.appspot.com/385c3273fe-ea50df0494dab2e539e1.png",
    alt: "live band performing small venue crowd watching",
    colSpan: "col-span-1 md:col-span-2",
  },
  {
    src: "https://storage.googleapis.com/uxpilot-auth.appspot.com/aa81b2b095-6ad446da7282890fef4b.png",
    alt: "pint glasses lined up on bar",
    colSpan: "col-span-1",
  },
  {
    src: "https://storage.googleapis.com/uxpilot-auth.appspot.com/c18f0870ae-de025edbabf939b43996.png",
    alt: "football fans watching big screen pub cheering",
    colSpan: "col-span-1",
  },
  {
    src: "https://storage.googleapis.com/uxpilot-auth.appspot.com/daf0f01154-dd09aa11f5b6002ef93f.png",
    alt: "DJ set nightclub neon lights dancing crowd",
    colSpan: "col-span-1",
  },
];

export const fallbackDrinksContent: DrinksContentData = {
  eyebrow: "— THE MIDNIGHT POUR",
  headline: "THE BEST\nPINT IN\nBARNSLEY.\nPERIOD.",
  tagline: "119.5 seconds. No shortcuts. No compromises.",
  body: "Every Guinness poured to perfection. Every time. We've been doing this since 2018 and we're not about to cut corners now.",
  image: {
    src: "https://storage.googleapis.com/uxpilot-auth.appspot.com/638c8fd61f-0f3dceeb9b511d185172.png",
    alt: "perfect Guinness pint glass close up, creamy white head, dark stout",
  },
  stats: [
    { value: "12", label: "Draught\nLines", valueClassName: "text-amber" },
    { value: "40+", label: "Craft\nBottles", valueClassName: "text-ember" },
    {
      value: "£4.50",
      label: "Happy\nHour",
      valueClassName: "text-purple-light",
    },
  ],
  happyHour: {
    title: "HAPPY HOUR",
    times: "Mon–Fri · 4PM – 7PM",
    detail: "All draught pints £4.50. All day Sunday.",
  },
};

export const fallbackSportContent: SportContentData = {
  intro:
    "Six big screens. Sky Sports, TNT, ITV, and BBC. Premier League, Championship, Champions League, and World Cup — live at The Garrison.",
  eyebrow: "— LIVE ON THE BIG SCREENS",
  pageTitle: "SPORT FIXTURES",
  screensPromoTitle: "6 SCREENS. ALL THE ACTION.",
  screensPromoSubtitle: "Sky Sports · TNT · ITV · BBC",
  overlayHeadline: "EVERY MATCH.\nEVERY SCREEN.",
  overlayBlurb: "The biggest moments in sport, live at The Garrison.",
  actionImage: {
    src: "https://storage.googleapis.com/uxpilot-auth.appspot.com/8aed88afdc-13ed7db99d358a4eae58.png",
    alt: "football match action shot dramatic lighting, stadium crowd roaring",
  },
};

export const fallbackRegularNights: RegularNightData[] = [
  {
    title: "FRIDAY NIGHTS",
    description: "Live bands from 9PM · Free entry",
    iconKey: "guitar",
  },
  {
    title: "SATURDAY NIGHTS",
    description: "DJ sets & live acts from 10PM",
    iconKey: "music",
  },
  {
    title: "OPEN MIC WEDNESDAY",
    description: "Sign up from 7PM · All welcome",
    iconKey: "mic",
  },
];
