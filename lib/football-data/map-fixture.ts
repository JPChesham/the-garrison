import type { FixtureData } from "@/components/cards/FixtureCard";
import {
  TRACKED_COMPETITIONS,
  type TrackedCompetitionCode,
} from "./constants";
import type { FootballDataMatch, FootballDataTeam, MatchStatus } from "./types";

const LONDON = "Europe/London";

const LIVE_STATUSES = new Set<MatchStatus>(["LIVE", "IN_PLAY", "PAUSED"]);
const VISIBLE_STATUSES = new Set<MatchStatus>([
  "SCHEDULED",
  "TIMED",
  "LIVE",
  "IN_PLAY",
  "PAUSED",
  "POSTPONED",
  "SUSPENDED",
]);

function formatApiDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function getFixturesDateRange(now = new Date()) {
  const dateFrom = formatApiDate(now);
  const end = new Date(now);
  end.setUTCDate(end.getUTCDate() + 9);
  const dateTo = formatApiDate(end);

  return { dateFrom, dateTo };
}

function getCompetitionCode(
  match: FootballDataMatch,
): TrackedCompetitionCode | null {
  const code = match.competition.code as TrackedCompetitionCode | undefined;
  if (code && code in TRACKED_COMPETITIONS) return code;

  const byId = Object.values(TRACKED_COMPETITIONS).find(
    (c) => c.id === match.competition.id,
  );
  return byId?.code ?? null;
}

function readScoreSide(
  side: { home?: number | null; away?: number | null; homeTeam?: number | null; awayTeam?: number | null } | null | undefined,
  team: "home" | "away",
): number | null {
  if (!side) return null;

  if (team === "home") {
    return side.home ?? side.homeTeam ?? null;
  }

  return side.away ?? side.awayTeam ?? null;
}

function displayTeamName(team: FootballDataTeam): string {
  if (team.tla) return team.tla;
  if (team.shortName) return team.shortName.toUpperCase();
  return team.name.toUpperCase();
}

function formatKickoffTime(utcDate: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: LONDON,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })
    .format(new Date(utcDate))
    .replace(":00", "")
    .toUpperCase();
}

function formatDateShort(utcDate: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: LONDON,
    weekday: "short",
    day: "numeric",
    month: "short",
  })
    .format(new Date(utcDate))
    .toUpperCase();
}

function startOfLondonDay(date: Date): Date {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: LONDON,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);

  const year = Number(parts.find((p) => p.type === "year")?.value);
  const month = Number(parts.find((p) => p.type === "month")?.value);
  const day = Number(parts.find((p) => p.type === "day")?.value);

  return new Date(Date.UTC(year, month - 1, day));
}

function getFixtureLabel(
  utcDate: string,
  status: MatchStatus,
  minute: number | null | undefined,
): string {
  if (status === "POSTPONED") return "POSTPONED";
  if (status === "SUSPENDED") return "SUSPENDED";
  if (LIVE_STATUSES.has(status)) {
    return minute != null ? `LIVE · ${minute}'` : "LIVE";
  }

  const kickoffDay = startOfLondonDay(new Date(utcDate));
  const today = startOfLondonDay(new Date());
  const diffDays = Math.round(
    (kickoffDay.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
  );

  if (diffDays === 0) return "TODAY";
  if (diffDays === 1) return "TOMORROW";

  return formatDateShort(utcDate);
}

export function isLiveMatch(status: MatchStatus): boolean {
  return LIVE_STATUSES.has(status);
}

export function sortFixtures(a: FootballDataMatch, b: FootballDataMatch): number {
  const aLive = isLiveMatch(a.status);
  const bLive = isLiveMatch(b.status);

  if (aLive !== bLive) return aLive ? -1 : 1;

  return new Date(a.utcDate).getTime() - new Date(b.utcDate).getTime();
}

export function filterUpcomingMatches(matches: FootballDataMatch[]): FootballDataMatch[] {
  return matches.filter((match) => VISIBLE_STATUSES.has(match.status));
}

export function mapMatchToFixture(match: FootballDataMatch): FixtureData | null {
  const code = getCompetitionCode(match);
  if (!code) return null;

  const config = TRACKED_COMPETITIONS[code];
  const live = isLiveMatch(match.status);
  const homeScore = readScoreSide(match.score?.fullTime, "home");
  const awayScore = readScoreSide(match.score?.fullTime, "away");
  const showScore =
    live || (match.status === "FINISHED" && homeScore != null && awayScore != null);

  return {
    id: String(match.id),
    label: getFixtureLabel(match.utcDate, match.status, match.minute),
    labelClassName: live ? "text-ember" : config.labelClassName,
    dotClassName: live ? "bg-ember" : config.dotClassName,
    live,
    home: {
      name: displayTeamName(match.homeTeam),
      crest: match.homeTeam.crest ?? undefined,
    },
    away: {
      name: displayTeamName(match.awayTeam),
      crest: match.awayTeam.crest ?? undefined,
    },
    homeScore: showScore ? homeScore : undefined,
    awayScore: showScore ? awayScore : undefined,
    minute: live ? match.minute : undefined,
    time: formatKickoffTime(match.utcDate),
    dateShort: formatDateShort(match.utcDate),
    competition: config.label,
    broadcaster: config.broadcaster,
    broadcasterIconClassName: config.broadcasterIconClassName,
  };
}

export function mapMatchesToFixtures(matches: FootballDataMatch[]): FixtureData[] {
  return filterUpcomingMatches(matches)
    .sort(sortFixtures)
    .map(mapMatchToFixture)
    .filter((fixture): fixture is FixtureData => fixture != null);
}
