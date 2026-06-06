export type MatchStatus =
  | "SCHEDULED"
  | "TIMED"
  | "LIVE"
  | "IN_PLAY"
  | "PAUSED"
  | "FINISHED"
  | "POSTPONED"
  | "SUSPENDED"
  | "CANCELLED";

export type FootballDataTeam = {
  id: number;
  name: string;
  shortName?: string | null;
  tla?: string | null;
  crest?: string | null;
};

export type FootballDataCompetition = {
  id: number;
  name: string;
  code?: string | null;
};

export type FootballDataScoreSide = {
  home?: number | null;
  away?: number | null;
  homeTeam?: number | null;
  awayTeam?: number | null;
};

export type FootballDataMatch = {
  id: number;
  utcDate: string;
  status: MatchStatus;
  minute?: number | null;
  matchday?: number | null;
  stage?: string | null;
  competition: FootballDataCompetition;
  homeTeam: FootballDataTeam;
  awayTeam: FootballDataTeam;
  score?: {
    fullTime?: FootballDataScoreSide | null;
    halfTime?: FootballDataScoreSide | null;
  } | null;
};

export type FootballDataMatchesResponse = {
  matches: FootballDataMatch[];
  resultSet?: {
    count?: number;
  };
};
