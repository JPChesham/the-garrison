const API_BASE = "https://api.football-data.org/v4";
const LONDON = "Europe/London";

/** Matches the site's 10s client poll; warm containers reuse this cache. */
const CACHE_TTL_MS = 10_000;
/** football-data.org rejects ranges longer than 10 days. */
const LOOKAHEAD_DAYS = 10;
const DEFAULT_LIMIT = 12;
const MAX_LIMIT = 24;

const TRACKED_COMPETITIONS = {
  PL: {
    id: 2021,
    label: "Premier League",
    labelClassName: "text-electric",
    dotClassName: "bg-electric",
    broadcaster: "Sky Sports",
    broadcasterIconClassName: "text-electric",
  },
  ELC: {
    id: 2016,
    label: "Championship",
    labelClassName: "text-amber",
    dotClassName: "bg-amber",
    broadcaster: "Sky Sports",
    broadcasterIconClassName: "text-amber",
  },
  CL: {
    id: 2001,
    label: "Champions League",
    labelClassName: "text-purple-light",
    dotClassName: "bg-purple-light",
    broadcaster: "TNT Sports",
    broadcasterIconClassName: "text-purple-light",
  },
  WC: {
    id: 2000,
    label: "World Cup",
    labelClassName: "text-ember",
    dotClassName: "bg-ember",
    broadcaster: "BBC / ITV",
    broadcasterIconClassName: "text-ember",
  },
};

const TRACKED_COMPETITION_IDS = Object.values(TRACKED_COMPETITIONS)
  .map((c) => c.id)
  .join(",");

const LIVE_STATUSES = new Set(["LIVE", "IN_PLAY", "PAUSED"]);
const VISIBLE_STATUSES = new Set([
  "SCHEDULED",
  "TIMED",
  "LIVE",
  "IN_PLAY",
  "PAUSED",
  "POSTPONED",
  "SUSPENDED",
]);

let cachedMatches = null;
let cachedAt = 0;
let inFlight = null;

function getAllowedOrigins() {
  const raw =
    process.env.ALLOWED_ORIGINS ||
    "https://thegarrison.co.uk,https://www.thegarrison.co.uk,http://localhost:3000";
  return raw
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
}

function normalizeHeaders(headers = {}) {
  const normalized = {};
  for (const [key, value] of Object.entries(headers)) {
    normalized[key.toLowerCase()] = Array.isArray(value) ? value[0] : value;
  }
  return normalized;
}

function getMethod(event) {
  return (
    event?.http?.method ||
    event?.method ||
    event?.__ow_method ||
    "GET"
  ).toLowerCase();
}

function getHeaders(event) {
  return normalizeHeaders(
    event?.http?.headers || event?.headers || event?.__ow_headers || {},
  );
}

function corsHeaders(origin) {
  if (!origin) return {};
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

function jsonResponse(statusCode, body, origin) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": `public, max-age=${CACHE_TTL_MS / 1000}`,
      ...corsHeaders(origin),
    },
    body,
  };
}

function parseLimit(value) {
  const raw = Number(value ?? DEFAULT_LIMIT);
  if (!Number.isFinite(raw)) return DEFAULT_LIMIT;
  return Math.min(Math.max(Math.trunc(raw), 1), MAX_LIMIT);
}

function getDateRange(now = new Date()) {
  const dateTo = new Date(now.getTime() + LOOKAHEAD_DAYS * 24 * 60 * 60 * 1000);
  return {
    dateFrom: now.toISOString().slice(0, 10),
    dateTo: dateTo.toISOString().slice(0, 10),
  };
}

async function fetchMatches() {
  const token = process.env.FOOTBALL_DATA_API_TOKEN;
  if (!token) throw new Error("Missing FOOTBALL_DATA_API_TOKEN");

  const { dateFrom, dateTo } = getDateRange();
  const response = await fetch(
    `${API_BASE}/matches?competitions=${TRACKED_COMPETITION_IDS}&dateFrom=${dateFrom}&dateTo=${dateTo}`,
    { headers: { "X-Auth-Token": token } },
  );

  if (!response.ok) {
    let message = `football-data.org request failed (${response.status})`;
    try {
      const body = await response.json();
      if (body.message) message = body.message;
    } catch {
      // Ignore JSON parse errors on error responses.
    }
    throw new Error(message);
  }

  const data = await response.json();
  return data.matches ?? [];
}

async function getMatches() {
  if (cachedMatches && Date.now() - cachedAt < CACHE_TTL_MS) {
    return cachedMatches;
  }

  if (!inFlight) {
    inFlight = fetchMatches()
      .then((matches) => {
        cachedMatches = matches;
        cachedAt = Date.now();
        return matches;
      })
      .finally(() => {
        inFlight = null;
      });
  }

  return inFlight;
}

function getCompetition(match) {
  const code = match.competition?.code;
  if (code && TRACKED_COMPETITIONS[code]) return TRACKED_COMPETITIONS[code];

  return (
    Object.values(TRACKED_COMPETITIONS).find(
      (c) => c.id === match.competition?.id,
    ) ?? null
  );
}

function readScoreSide(side, team) {
  if (!side) return null;
  if (team === "home") return side.home ?? side.homeTeam ?? null;
  return side.away ?? side.awayTeam ?? null;
}

function displayTeamName(team) {
  if (team.tla) return team.tla;
  if (team.shortName) return team.shortName.toUpperCase();
  return team.name.toUpperCase();
}

function formatKickoffTime(utcDate) {
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

function formatDateShort(utcDate) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: LONDON,
    weekday: "short",
    day: "numeric",
    month: "short",
  })
    .format(new Date(utcDate))
    .toUpperCase();
}

function startOfLondonDay(date) {
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

function getFixtureLabel(utcDate, status, minute) {
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

function sortFixtures(a, b) {
  const aLive = LIVE_STATUSES.has(a.status);
  const bLive = LIVE_STATUSES.has(b.status);

  if (aLive !== bLive) return aLive ? -1 : 1;

  return new Date(a.utcDate).getTime() - new Date(b.utcDate).getTime();
}

function mapMatchToFixture(match) {
  const config = getCompetition(match);
  if (!config) return null;

  const live = LIVE_STATUSES.has(match.status);
  const homeScore = readScoreSide(match.score?.fullTime, "home");
  const awayScore = readScoreSide(match.score?.fullTime, "away");
  const showScore =
    live ||
    (match.status === "FINISHED" && homeScore != null && awayScore != null);

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

function mapMatchesToFixtures(matches) {
  return matches
    .filter((match) => VISIBLE_STATUSES.has(match.status))
    .sort(sortFixtures)
    .map(mapMatchToFixture)
    .filter(Boolean);
}

async function main(event = {}) {
  const headers = getHeaders(event);
  const method = getMethod(event);
  const requestOrigin = headers.origin || "";
  const origin = getAllowedOrigins().includes(requestOrigin)
    ? requestOrigin
    : null;

  // Browsers always send Origin cross-site; reject ones not on the allowlist.
  if (requestOrigin && !origin) {
    return {
      statusCode: 403,
      headers: { "Content-Type": "application/json" },
      body: { error: "Forbidden. Requests must come from an allowed origin." },
    };
  }

  if (method === "options") {
    return { statusCode: 204, headers: corsHeaders(origin) };
  }

  if (method !== "get") {
    return jsonResponse(405, { error: "Method not allowed." }, origin);
  }

  const limit = parseLimit(event.limit);

  try {
    const matches = await getMatches();
    const fixtures = mapMatchesToFixtures(matches).slice(0, limit);
    return jsonResponse(
      200,
      { fixtures, fetchedAt: new Date(cachedAt).toISOString() },
      origin,
    );
  } catch (error) {
    console.error("[football-data] Failed to load fixtures:", error);
    return jsonResponse(502, { error: "Failed to load fixtures." }, origin);
  }
}

exports.main = main;
