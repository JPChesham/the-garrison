import type { LegendData } from "@/components/cards/LegendCard";
import { hygraphFetch } from "./client";

type GenreAccent = "PURPLE_LIGHT" | "EMBER" | "ELECTRIC" | "AMBER";

type HygraphLegend = {
  slug: string;
  name: string;
  featured: boolean | null;
  genre: string | null;
  yearLabel: string | null;
  genreAccent: GenreAccent | null;
  bio: { text: string } | null;
  imageAlt: string | null;
  image: { url: string } | null;
};

const LEGEND_FIELDS = `
  slug
  name
  featured
  genre
  yearLabel
  genreAccent
  bio { text }
  imageAlt
  image { url }
`;

const GENRE_ACCENT_CLASS: Record<GenreAccent, string> = {
  PURPLE_LIGHT: "text-purple-light",
  EMBER: "text-ember",
  ELECTRIC: "text-electric",
  AMBER: "text-amber",
};

function mapLegend(legend: HygraphLegend): LegendData {
  return {
    slug: legend.slug,
    featured: legend.featured ?? false,
    image: legend.image?.url,
    imageAlt: legend.imageAlt ?? undefined,
    name: legend.name,
    genre: legend.genre ?? "",
    year: legend.yearLabel ?? "",
    genreClassName: legend.genreAccent
      ? GENRE_ACCENT_CLASS[legend.genreAccent]
      : "text-ember",
    bio: legend.bio?.text?.trim() ?? "",
  };
}

export async function getLegends(): Promise<LegendData[]> {
  try {
    const data = await hygraphFetch<{ legends: HygraphLegend[] }>(
      `query Legends {
        legends(orderBy: createdAt_ASC) {
          ${LEGEND_FIELDS}
        }
      }`,
    );

    return data.legends.map(mapLegend);
  } catch (error) {
    console.error("[hygraph] Failed to load legends:", error);
    return [];
  }
}

export async function getFeaturedLegends(): Promise<LegendData[]> {
  try {
    const data = await hygraphFetch<{ legends: HygraphLegend[] }>(
      `query FeaturedLegends {
        legends(where: { featured: true }, orderBy: createdAt_ASC) {
          ${LEGEND_FIELDS}
        }
      }`,
    );

    return data.legends.map(mapLegend);
  } catch (error) {
    console.error("[hygraph] Failed to load featured legends:", error);
    return [];
  }
}

export async function getLegendBySlug(
  slug: string,
): Promise<LegendData | null> {
  try {
    const data = await hygraphFetch<{ legend: HygraphLegend | null }>(
      `query LegendBySlug($slug: String!) {
        legend(where: { slug: $slug }) {
          ${LEGEND_FIELDS}
        }
      }`,
      { slug },
    );

    return data.legend ? mapLegend(data.legend) : null;
  } catch (error) {
    console.error("[hygraph] Failed to load legend:", error);
    return null;
  }
}

export async function getAllLegendSlugs(): Promise<string[]> {
  const legends = await getLegends();
  return legends.map((legend) => legend.slug);
}
