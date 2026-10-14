const DEFAULT_ENDPOINT =
  "https://api-eu-west-2.hygraph.com/v2/cmrkv3vdq001s07uojw31l6lt/master";

const MAX_RATE_LIMIT_RETRIES = 5;

export class HygraphError extends Error {
  constructor(
    message: string,
    readonly status?: number,
  ) {
    super(message);
    this.name = "HygraphError";
  }
}

type HygraphResponse<T> = {
  data?: T;
  errors?: { message: string }[];
};

export async function hygraphFetch<T>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> {
  const endpoint = process.env.HYGRAPH_ENDPOINT ?? DEFAULT_ENDPOINT;
  const token = process.env.HYGRAPH_TOKEN;

  if (!token) {
    throw new HygraphError("Missing HYGRAPH_TOKEN");
  }

  let response: Response;

  for (let attempt = 0; ; attempt++) {
    response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ query, variables }),
      // Static export: runs at build time only; dedupe identical queries across pages.
      cache: "force-cache",
    });

    if (response.status !== 429 || attempt >= MAX_RATE_LIMIT_RETRIES) break;

    // Parallel build workers can exceed Hygraph's rate limit; a failure here
    // would bake fallback content into the static HTML until the next build.
    const retryAfterSeconds = Number(response.headers.get("retry-after"));
    const delayMs = Number.isFinite(retryAfterSeconds) && retryAfterSeconds > 0
      ? retryAfterSeconds * 1000
      : 500 * 2 ** attempt + Math.random() * 250;
    await new Promise((resolve) => setTimeout(resolve, delayMs));
  }

  if (!response.ok) {
    throw new HygraphError(
      `Hygraph request failed (${response.status})`,
      response.status,
    );
  }

  const payload = (await response.json()) as HygraphResponse<T>;

  if (payload.errors?.length) {
    throw new HygraphError(payload.errors.map((error) => error.message).join("; "));
  }

  if (!payload.data) {
    throw new HygraphError("Hygraph returned no data");
  }

  return payload.data;
}
