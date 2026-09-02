import type {
  HomeHeroContent,
  SocialImageItem,
} from "@/lib/content/types";
import {
  fallbackHomeHero,
  fallbackMarqueeItems,
  fallbackSocialImages,
} from "@/lib/content/fallbacks";
import { hygraphFetch } from "./client";

type HygraphHomeHero = {
  imageAlt: string | null;
  tagline: string | null;
  primaryCtaLabel: string | null;
  primaryCtaHref: string | null;
  secondaryCtaLabel: string | null;
  secondaryCtaHref: string | null;
  mobileImage: { url: string } | null;
  desktopImage: { url: string } | null;
};

type HygraphMarqueeItem = {
  text: string;
  sortOrder: number | null;
};

type HygraphSocialImage = {
  alt: string;
  sortOrder: number | null;
  colSpan: "SINGLE" | "WIDE" | null;
  image: { url: string } | null;
};

const COL_SPAN_MAP: Record<"SINGLE" | "WIDE", string> = {
  SINGLE: "col-span-1",
  WIDE: "col-span-1 md:col-span-2",
};

function mapHomeHero(entry: HygraphHomeHero): HomeHeroContent {
  return {
    mobileImage: entry.mobileImage?.url ?? fallbackHomeHero.mobileImage,
    desktopImage: entry.desktopImage?.url ?? fallbackHomeHero.desktopImage,
    imageAlt: entry.imageAlt ?? fallbackHomeHero.imageAlt,
    tagline: entry.tagline ?? fallbackHomeHero.tagline,
    primaryCtaLabel: entry.primaryCtaLabel ?? fallbackHomeHero.primaryCtaLabel,
    primaryCtaHref: entry.primaryCtaHref ?? fallbackHomeHero.primaryCtaHref,
    secondaryCtaLabel:
      entry.secondaryCtaLabel ?? fallbackHomeHero.secondaryCtaLabel,
    secondaryCtaHref:
      entry.secondaryCtaHref ?? fallbackHomeHero.secondaryCtaHref,
  };
}

export async function getHomeHero(): Promise<HomeHeroContent> {
  try {
    const data = await hygraphFetch<{ homeHeroes: HygraphHomeHero[] }>(
      `query HomeHero {
        homeHeroes(first: 1) {
          imageAlt
          tagline
          primaryCtaLabel
          primaryCtaHref
          secondaryCtaLabel
          secondaryCtaHref
          mobileImage { url }
          desktopImage { url }
        }
      }`,
    );

    const entry = data.homeHeroes[0];
    return entry ? mapHomeHero(entry) : fallbackHomeHero;
  } catch (error) {
    console.error("[hygraph] Failed to load home hero:", error);
    return fallbackHomeHero;
  }
}

export async function getMarqueeItems(): Promise<string[]> {
  try {
    const data = await hygraphFetch<{ marqueeItems: HygraphMarqueeItem[] }>(
      `query MarqueeItems {
        marqueeItems(orderBy: sortOrder_ASC) {
          text
          sortOrder
        }
      }`,
    );

    if (data.marqueeItems.length === 0) return fallbackMarqueeItems;
    return data.marqueeItems.map((item) => item.text);
  } catch (error) {
    console.error("[hygraph] Failed to load marquee items:", error);
    return fallbackMarqueeItems;
  }
}

export async function getSocialImages(): Promise<SocialImageItem[]> {
  try {
    const data = await hygraphFetch<{ socialImages: HygraphSocialImage[] }>(
      `query SocialImages {
        socialImages(orderBy: sortOrder_ASC) {
          alt
          sortOrder
          colSpan
          image { url }
        }
      }`,
    );

    if (data.socialImages.length === 0) return fallbackSocialImages;

    return data.socialImages.map((item, index) => ({
      src: item.image?.url ?? fallbackSocialImages[index]?.src ?? "",
      alt: item.alt,
      colSpan: item.colSpan
        ? COL_SPAN_MAP[item.colSpan]
        : (fallbackSocialImages[index]?.colSpan ?? "col-span-1"),
    }));
  } catch (error) {
    console.error("[hygraph] Failed to load social images:", error);
    return fallbackSocialImages;
  }
}
