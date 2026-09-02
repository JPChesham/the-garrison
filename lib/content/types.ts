export type EventCategory = "live-band" | "dj-night" | "acoustic" | "live-show";

export type SiteConfig = {
  name: string;
  tagline: string;
  address: string;
  addressShort: string;
  phone: string;
  phoneHref: string;
  email: string;
  gigsEmail: string;
  instagram: string;
  instagramHandle: string;
  facebook: string;
};

export type OpeningHoursSlot = {
  days: string;
  hours: string;
};

export type OwnerQuote = {
  text: string;
  name: string;
  role: string;
  avatar: string;
};

export type VisitDetails = {
  parking: string;
  transit: string;
  accessibility: string;
  walkIns: string;
};

export type SiteSettings = {
  siteConfig: SiteConfig;
  openingHours: OpeningHoursSlot[];
  ownerQuote: OwnerQuote;
  visitInfo: VisitDetails;
  mapEmbedUrl: string;
  seoTitle: string;
  seoDescription: string;
};

export type HomeHeroContent = {
  mobileImage: string;
  desktopImage: string;
  imageAlt: string;
  tagline: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
};

export type SocialImageItem = {
  src: string;
  alt: string;
  colSpan: string;
};

export type DrinksContentData = {
  eyebrow: string;
  headline: string;
  tagline: string;
  body: string;
  image: { src: string; alt: string };
  stats: { value: string; label: string; valueClassName: string }[];
  happyHour: { title: string; times: string; detail: string };
};

export type SportContentData = {
  intro: string;
  eyebrow: string;
  pageTitle: string;
  screensPromoTitle: string;
  screensPromoSubtitle: string;
  overlayHeadline: string;
  overlayBlurb: string;
  actionImage: { src: string; alt: string };
};

export type RegularNightData = {
  title: string;
  description: string;
  iconKey: "guitar" | "music" | "mic";
};
