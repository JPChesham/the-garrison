export type TrackedCompetitionCode = "PL" | "ELC" | "CL" | "WC";

export type CompetitionConfig = {
  code: TrackedCompetitionCode;
  id: number;
  label: string;
  labelClassName: string;
  dotClassName: string;
  broadcaster: string;
  broadcasterIconClassName: string;
};

export const TRACKED_COMPETITIONS: Record<
  TrackedCompetitionCode,
  CompetitionConfig
> = {
  PL: {
    code: "PL",
    id: 2021,
    label: "Premier League",
    labelClassName: "text-electric",
    dotClassName: "bg-electric",
    broadcaster: "Sky Sports",
    broadcasterIconClassName: "text-electric",
  },
  ELC: {
    code: "ELC",
    id: 2016,
    label: "Championship",
    labelClassName: "text-amber",
    dotClassName: "bg-amber",
    broadcaster: "Sky Sports",
    broadcasterIconClassName: "text-amber",
  },
  CL: {
    code: "CL",
    id: 2001,
    label: "Champions League",
    labelClassName: "text-purple-light",
    dotClassName: "bg-purple-light",
    broadcaster: "TNT Sports",
    broadcasterIconClassName: "text-purple-light",
  },
  WC: {
    code: "WC",
    id: 2000,
    label: "World Cup",
    labelClassName: "text-ember",
    dotClassName: "bg-ember",
    broadcaster: "BBC / ITV",
    broadcasterIconClassName: "text-ember",
  },
};

export const TRACKED_COMPETITION_IDS = Object.values(TRACKED_COMPETITIONS)
  .map((c) => c.id)
  .join(",");

export const FIXTURES_REVALIDATE_SECONDS = 60;
export const FIXTURES_LOOKAHEAD_DAYS = 15;
