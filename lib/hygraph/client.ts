/** ISR / Data Cache TTL for all Hygraph Content API requests (5 minutes). */
export const HYGRAPH_REVALIDATE_SECONDS = 300;

const DEFAULT_ENDPOINT =
  "https://api-eu-west-2.hygraph.com/v2/cmrkv3vdq001s07uojw31l6lt/master";

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

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ query, variables }),
    // Next.js 16 defaults fetch to uncached; opt in explicitly for sitewide ISR.
    cache: "force-cache",
    next: {
      revalidate: HYGRAPH_REVALIDATE_SECONDS,
      tags: ["hygraph"],
    },
  });

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
