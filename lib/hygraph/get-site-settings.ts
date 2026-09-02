import type { SiteSettings } from "@/lib/content/types";
import { fallbackSiteSettings } from "@/lib/content/fallbacks";
import { hygraphFetch } from "./client";

type HygraphSiteSettings = {
  venueName: string;
  tagline: string | null;
  address: string | null;
  addressShort: string | null;
  phone: string | null;
  phoneHref: string | null;
  email: string | null;
  gigsEmail: string | null;
  instagramUrl: string | null;
  instagramHandle: string | null;
  facebookUrl: string | null;
  mapEmbedUrl: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
  openingHours: { days: string; hours: string; sortOrder: number | null }[];
  ownerQuote: {
    quoteText: string;
    name: string;
    role: string | null;
    avatar: { url: string } | null;
  } | null;
  visitInfo: {
    walkIns: string | null;
    parking: string | null;
    transit: string | null;
    accessibility: string | null;
  } | null;
};

function mapSiteSettings(entry: HygraphSiteSettings): SiteSettings {
  const fallback = fallbackSiteSettings;

  return {
    siteConfig: {
      name: entry.venueName || fallback.siteConfig.name,
      tagline: entry.tagline ?? fallback.siteConfig.tagline,
      address: entry.address ?? fallback.siteConfig.address,
      addressShort: entry.addressShort ?? fallback.siteConfig.addressShort,
      phone: entry.phone ?? fallback.siteConfig.phone,
      phoneHref: entry.phoneHref ?? fallback.siteConfig.phoneHref,
      email: entry.email ?? fallback.siteConfig.email,
      gigsEmail: entry.gigsEmail ?? fallback.siteConfig.gigsEmail,
      instagram: entry.instagramUrl ?? fallback.siteConfig.instagram,
      instagramHandle:
        entry.instagramHandle ?? fallback.siteConfig.instagramHandle,
      facebook: entry.facebookUrl ?? fallback.siteConfig.facebook,
    },
    openingHours:
      entry.openingHours.length > 0
        ? [...entry.openingHours]
            .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
            .map((slot) => ({ days: slot.days, hours: slot.hours }))
        : fallback.openingHours,
    ownerQuote: entry.ownerQuote
      ? {
          text: entry.ownerQuote.quoteText,
          name: entry.ownerQuote.name,
          role: entry.ownerQuote.role ?? fallback.ownerQuote.role,
          avatar:
            entry.ownerQuote.avatar?.url ?? fallback.ownerQuote.avatar,
        }
      : fallback.ownerQuote,
    visitInfo: {
      walkIns: entry.visitInfo?.walkIns ?? fallback.visitInfo.walkIns,
      parking: entry.visitInfo?.parking ?? fallback.visitInfo.parking,
      transit: entry.visitInfo?.transit ?? fallback.visitInfo.transit,
      accessibility:
        entry.visitInfo?.accessibility ?? fallback.visitInfo.accessibility,
    },
    mapEmbedUrl: entry.mapEmbedUrl ?? fallback.mapEmbedUrl,
    seoTitle: entry.seoTitle ?? fallback.seoTitle,
    seoDescription: entry.seoDescription ?? fallback.seoDescription,
  };
}

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const data = await hygraphFetch<{
      siteSettingsEntries: HygraphSiteSettings[];
    }>(
      `query SiteSettings {
        siteSettingsEntries(first: 1) {
          venueName
          tagline
          address
          addressShort
          phone
          phoneHref
          email
          gigsEmail
          instagramUrl
          instagramHandle
          facebookUrl
          mapEmbedUrl
          seoTitle
          seoDescription
          openingHours {
            days
            hours
            sortOrder
          }
          ownerQuote {
            quoteText
            name
            role
            avatar { url }
          }
          visitInfo {
            walkIns
            parking
            transit
            accessibility
          }
        }
      }`,
    );

    const entry = data.siteSettingsEntries[0];
    return entry ? mapSiteSettings(entry) : fallbackSiteSettings;
  } catch (error) {
    console.error("[hygraph] Failed to load site settings:", error);
    return fallbackSiteSettings;
  }
}
