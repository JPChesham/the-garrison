import type { SportContentData } from "@/lib/content/types";
import { fallbackSportContent } from "@/lib/content/fallbacks";
import { hygraphFetch } from "./client";

type HygraphSportContent = {
  intro: string | null;
  eyebrow: string | null;
  pageTitle: string | null;
  screensPromoTitle: string | null;
  screensPromoSubtitle: string | null;
  overlayHeadline: string | null;
  overlayBlurb: string | null;
  actionImageAlt: string | null;
  actionImage: { url: string } | null;
};

function mapSportContent(entry: HygraphSportContent): SportContentData {
  const fallback = fallbackSportContent;

  return {
    intro: entry.intro ?? fallback.intro,
    eyebrow: entry.eyebrow ?? fallback.eyebrow,
    pageTitle: entry.pageTitle ?? fallback.pageTitle,
    screensPromoTitle:
      entry.screensPromoTitle ?? fallback.screensPromoTitle,
    screensPromoSubtitle:
      entry.screensPromoSubtitle ?? fallback.screensPromoSubtitle,
    overlayHeadline: entry.overlayHeadline ?? fallback.overlayHeadline,
    overlayBlurb: entry.overlayBlurb ?? fallback.overlayBlurb,
    actionImage: {
      src: entry.actionImage?.url ?? fallback.actionImage.src,
      alt: entry.actionImageAlt ?? fallback.actionImage.alt,
    },
  };
}

export async function getSportContent(): Promise<SportContentData> {
  try {
    const data = await hygraphFetch<{ sportContents: HygraphSportContent[] }>(
      `query SportContent {
        sportContents(first: 1) {
          intro
          eyebrow
          pageTitle
          screensPromoTitle
          screensPromoSubtitle
          overlayHeadline
          overlayBlurb
          actionImageAlt
          actionImage { url }
        }
      }`,
    );

    const entry = data.sportContents[0];
    return entry ? mapSportContent(entry) : fallbackSportContent;
  } catch (error) {
    console.error("[hygraph] Failed to load sport content:", error);
    return fallbackSportContent;
  }
}
