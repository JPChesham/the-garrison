"use client";

import { useEffect, useState } from "react";
import type { FixtureData } from "@/components/cards/FixtureCard";
import {
  FixturesList,
  FixturesListWithLink,
} from "@/components/sport/FixturesList";

const FIXTURES_POLL_INTERVAL_MS = 10_000;
const FIXTURES_API_URL = process.env.NEXT_PUBLIC_FIXTURES_API_URL;

type LiveFixturesProps = {
  limit?: number;
  className?: string;
  showViewAll?: boolean;
};

async function fetchFixtures(limit: number): Promise<FixtureData[]> {
  if (!FIXTURES_API_URL) {
    throw new Error("Missing NEXT_PUBLIC_FIXTURES_API_URL");
  }

  const response = await fetch(`${FIXTURES_API_URL}?limit=${limit}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Fixtures refresh failed (${response.status})`);
  }

  const data = (await response.json()) as { fixtures?: FixtureData[] };
  return data.fixtures ?? [];
}

export function LiveFixtures({
  limit = 12,
  className,
  showViewAll = false,
}: LiveFixturesProps) {
  const [fixtures, setFixtures] = useState<FixtureData[]>([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let inFlight = false;

    const clear = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = undefined;
      }
    };

    const schedule = () => {
      clear();
      timeoutId = setTimeout(() => {
        void refresh();
      }, FIXTURES_POLL_INTERVAL_MS);
    };

    const refresh = async () => {
      if (cancelled || inFlight) return;
      if (document.visibilityState === "hidden") {
        schedule();
        return;
      }

      inFlight = true;
      try {
        const next = await fetchFixtures(limit);
        if (!cancelled) {
          setFixtures(next);
          setHasLoaded(true);
        }
      } catch (error) {
        console.error("[sport] Live fixtures refresh failed:", error);
        if (!cancelled) setHasLoaded(true);
      } finally {
        inFlight = false;
        if (!cancelled) schedule();
      }
    };

    void refresh();

    const onVisible = () => {
      if (document.visibilityState === "visible") {
        clear();
        void refresh();
      }
    };

    document.addEventListener("visibilitychange", onVisible);

    return () => {
      cancelled = true;
      clear();
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [limit]);

  if (!hasLoaded) {
    return (
      <div
        className={`space-y-4 ${className ?? ""}`}
        aria-busy="true"
        aria-live="polite"
      >
        {Array.from({ length: Math.min(limit, 4) }, (_, index) => (
          <div
            key={index}
            className="fixture-scorecard h-[5.5rem] animate-pulse rounded-sm bg-charcoal-mid/80"
          />
        ))}
      </div>
    );
  }

  if (showViewAll) {
    return (
      <FixturesListWithLink
        fixtures={fixtures}
        className={className}
        showViewAll
      />
    );
  }

  return <FixturesList fixtures={fixtures} className={className} />;
}
