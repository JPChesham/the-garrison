import Link from "next/link";
import { FixtureCard } from "@/components/cards/FixtureCard";
import type { FixtureData } from "@/components/cards/FixtureCard";
import { cn } from "@/lib/utils/cn";

type FixturesListProps = {
  fixtures: FixtureData[];
  className?: string;
  emptyMessage?: string;
};

export function FixturesList({
  fixtures,
  className,
  emptyMessage = "No upcoming fixtures in the next 10 days for the Premier League, Championship, Champions League, or World Cup. Check back soon.",
}: FixturesListProps) {
  if (fixtures.length === 0) {
    return (
      <div
        className={cn(
          "rounded-sm border border-charcoal-light/30 bg-charcoal-mid px-5 py-8 text-center",
          className,
        )}
      >
        <p className="font-barlow text-sm text-charcoal-light">{emptyMessage}</p>
        {!process.env.FOOTBALL_DATA_API_TOKEN && (
          <p className="mt-3 font-barlow text-xs text-charcoal-light/80">
            Add{" "}
            <code className="text-white">FOOTBALL_DATA_API_TOKEN</code> to load
            live fixtures from football-data.org.
          </p>
        )}
      </div>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      {fixtures.map((fixture) => (
        <FixtureCard key={fixture.id} fixture={fixture} />
      ))}
    </div>
  );
}

type FixturesListWithLinkProps = FixturesListProps & {
  showViewAll?: boolean;
};

export function FixturesListWithLink({
  showViewAll = false,
  ...props
}: FixturesListWithLinkProps) {
  return (
    <div>
      <FixturesList {...props} />
      {showViewAll && props.fixtures.length > 0 && (
        <div className="mt-6 text-center">
          <Link
            href="/sport"
            className="font-barlow text-sm font-semibold uppercase tracking-wider text-electric hover:underline"
          >
            View all fixtures →
          </Link>
        </div>
      )}
    </div>
  );
}
