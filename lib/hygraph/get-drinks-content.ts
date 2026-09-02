import type { DrinksContentData } from "@/lib/content/types";
import { fallbackDrinksContent } from "@/lib/content/fallbacks";
import { hygraphFetch } from "./client";

type AccentVariant = "PURPLE" | "EMBER" | "ELECTRIC" | "AMBER" | "GREEN";

type HygraphDrinksContent = {
  eyebrow: string | null;
  headline: string | null;
  tagline: string | null;
  body: { text: string } | null;
  imageAlt: string | null;
  image: { url: string } | null;
  stats: {
    value: string;
    label: string;
    sortOrder: number | null;
    valueAccent: AccentVariant | null;
  }[];
  happyHour: {
    title: string;
    times: string | null;
    detail: string | null;
  } | null;
};

const ACCENT_CLASS: Record<AccentVariant, string> = {
  PURPLE: "text-purple-light",
  EMBER: "text-ember",
  ELECTRIC: "text-electric",
  AMBER: "text-amber",
  GREEN: "text-green",
};

function mapDrinksContent(entry: HygraphDrinksContent): DrinksContentData {
  const fallback = fallbackDrinksContent;

  return {
    eyebrow: entry.eyebrow ?? fallback.eyebrow,
    headline: entry.headline ?? fallback.headline,
    tagline: entry.tagline ?? fallback.tagline,
    body: entry.body?.text?.trim() || fallback.body,
    image: {
      src: entry.image?.url ?? fallback.image.src,
      alt: entry.imageAlt ?? fallback.image.alt,
    },
    stats:
      entry.stats.length > 0
        ? [...entry.stats]
            .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
            .map((stat) => ({
              value: stat.value,
              label: stat.label,
              valueClassName: stat.valueAccent
                ? ACCENT_CLASS[stat.valueAccent]
                : "text-amber",
            }))
        : fallback.stats,
    happyHour: entry.happyHour
      ? {
          title: entry.happyHour.title,
          times: entry.happyHour.times ?? fallback.happyHour.times,
          detail: entry.happyHour.detail ?? fallback.happyHour.detail,
        }
      : fallback.happyHour,
  };
}

export async function getDrinksContent(): Promise<DrinksContentData> {
  try {
    const data = await hygraphFetch<{
      drinksContents: HygraphDrinksContent[];
    }>(
      `query DrinksContent {
        drinksContents(first: 1) {
          eyebrow
          headline
          tagline
          body { text }
          imageAlt
          image { url }
          stats {
            value
            label
            sortOrder
            valueAccent
          }
          happyHour {
            title
            times
            detail
          }
        }
      }`,
    );

    const entry = data.drinksContents[0];
    return entry ? mapDrinksContent(entry) : fallbackDrinksContent;
  } catch (error) {
    console.error("[hygraph] Failed to load drinks content:", error);
    return fallbackDrinksContent;
  }
}
