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
  revalidateSeconds = 300,
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
    next: { revalidate: revalidateSeconds },
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
