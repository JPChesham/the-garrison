import type { RegularNightData } from "@/lib/content/types";
import { fallbackRegularNights } from "@/lib/content/fallbacks";
import { hygraphFetch } from "./client";

type HygraphRegularNight = {
  title: string;
  description: string | null;
  sortOrder: number | null;
  iconKey: string | null;
};

function mapIconKey(iconKey: string | null): RegularNightData["iconKey"] {
  if (iconKey === "music" || iconKey === "mic" || iconKey === "guitar") {
    return iconKey;
  }
  return "guitar";
}

export async function getRegularNights(): Promise<RegularNightData[]> {
  try {
    const data = await hygraphFetch<{
      regularNights: HygraphRegularNight[];
    }>(
      `query RegularNights {
        regularNights(orderBy: sortOrder_ASC) {
          title
          description
          sortOrder
          iconKey
        }
      }`,
    );

    if (data.regularNights.length === 0) return fallbackRegularNights;

    return data.regularNights.map((night, index) => ({
      title: night.title,
      description:
        night.description ??
        fallbackRegularNights[index]?.description ??
        "",
      iconKey: mapIconKey(
        night.iconKey ?? fallbackRegularNights[index]?.iconKey ?? "guitar",
      ),
    }));
  } catch (error) {
    console.error("[hygraph] Failed to load regular nights:", error);
    return fallbackRegularNights;
  }
}
