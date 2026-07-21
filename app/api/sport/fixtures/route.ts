import { NextResponse } from "next/server";
import { getSportFixtures } from "@/lib/football-data";
import { FIXTURES_REVALIDATE_SECONDS } from "@/lib/football-data/constants";

/** Only this route is dynamic — pages stay fully static. */
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const rawLimit = Number(searchParams.get("limit") ?? "12");
  const limit = Number.isFinite(rawLimit)
    ? Math.min(Math.max(Math.trunc(rawLimit), 1), 24)
    : 12;

  const fixtures = await getSportFixtures({ limit });

  return NextResponse.json(
    { fixtures, fetchedAt: new Date().toISOString() },
    {
      headers: {
        "Cache-Control": `public, s-maxage=${FIXTURES_REVALIDATE_SECONDS}, stale-while-revalidate=30`,
      },
    },
  );
}
