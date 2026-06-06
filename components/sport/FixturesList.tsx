import { FixtureCard } from "@/components/cards/FixtureCard";
import type { FixtureData } from "@/components/cards/FixtureCard";
import { cn } from "@/lib/utils/cn";

type FixturesListProps = {
  fixtures: FixtureData[];
  className?: string;
};

export function FixturesList({ fixtures, className }: FixturesListProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {fixtures.map((fixture) => (
        <FixtureCard key={fixture.label} fixture={fixture} />
      ))}
    </div>
  );
}
