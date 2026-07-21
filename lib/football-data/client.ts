const API_BASE = "https://api.football-data.org/v4";

export class FootballDataError extends Error {
  constructor(
    message: string,
    readonly status?: number,
  ) {
    super(message);
    this.name = "FootballDataError";
  }
}

export async function footballDataFetch<T>(path: string): Promise<T> {
  const token = process.env.FOOTBALL_DATA_API_TOKEN;

  if (!token) {
    throw new FootballDataError("Missing FOOTBALL_DATA_API_TOKEN");
  }

  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      "X-Auth-Token": token,
    },
    // Used only by the dynamic fixtures API route — never by static pages.
    cache: "no-store",
  });

  if (!response.ok) {
    let message = `football-data.org request failed (${response.status})`;

    try {
      const body = (await response.json()) as { message?: string };
      if (body.message) message = body.message;
    } catch {
      // Ignore JSON parse errors on error responses.
    }

    throw new FootballDataError(message, response.status);
  }

  return response.json() as Promise<T>;
}
