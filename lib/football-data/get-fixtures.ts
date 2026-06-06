import type { FixtureData } from "@/components/cards/FixtureCard";
import { footballDataFetch } from "./client";
import { TRACKED_COMPETITION_IDS } from "./constants";
import {
  getFixturesDateRange,
  mapMatchesToFixtures,
} from "./map-fixture";
import type { FootballDataMatchesResponse } from "./types";

export type GetSportFixturesOptions = {
  limit?: number;
};

export async function getSportFixtures(
  options: GetSportFixturesOptions = {},
): Promise<FixtureData[]> {
  const { limit = 12 } = options;

  try {
    const { dateFrom, dateTo } = getFixturesDateRange();
    const response = await footballDataFetch<FootballDataMatchesResponse>(
      `/matches?competitions=${TRACKED_COMPETITION_IDS}&dateFrom=${dateFrom}&dateTo=${dateTo}`,
    );

    return mapMatchesToFixtures(response.matches ?? []).slice(0, limit);
  } catch (error) {
    console.error("[football-data] Failed to load fixtures:", error);
    return [];
  }
}
