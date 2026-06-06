import type { LucideIcon } from "lucide-react";
import { Tv } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { cn } from "@/lib/utils/cn";

export type FixtureTeam = {
  name: string;
  icon: LucideIcon;
  iconClassName: string;
};

export type FixtureData = {
  label: string;
  labelClassName: string;
  dotClassName: string;
  live?: boolean;
  home: FixtureTeam;
  away: FixtureTeam;
  time: string;
  dateShort: string;
  broadcaster: string;
  broadcasterIconClassName: string;
};

type FixtureCardProps = {
  fixture: FixtureData;
};

function FixtureLabel({ fixture }: FixtureCardProps) {
  return (
    <div className="flex min-w-0 items-center gap-1.5">
      <span
        className={cn(
          "h-2 w-2 shrink-0 rounded-full",
          fixture.dotClassName,
          fixture.live && "live-dot",
        )}
      />
      <span
        className={cn(
          "truncate font-barlow text-xs font-extrabold uppercase tracking-widest",
          fixture.labelClassName,
        )}
      >
        {fixture.label}
      </span>
    </div>
  );
}

function FixtureMeta({ fixture }: FixtureCardProps) {
  return (
    <div className="shrink-0 text-right">
      <div className="font-barlow text-xs text-charcoal-light">
        {fixture.dateShort}
      </div>
      <div className="mt-1 flex items-center justify-end gap-1">
        <Tv className={cn("h-3 w-3 shrink-0", fixture.broadcasterIconClassName)} />
        <span className="font-barlow text-xs font-semibold text-white">
          {fixture.broadcaster}
        </span>
      </div>
    </div>
  );
}

export function FixtureCard({ fixture }: FixtureCardProps) {
  const HomeIcon = fixture.home.icon;
  const AwayIcon = fixture.away.icon;

  return (
    <ScrollReveal>
      <div className="fixture-scorecard overflow-hidden rounded-sm p-4 sm:p-5">
        <div className="mb-3 flex items-start justify-between gap-3 md:hidden">
          <FixtureLabel fixture={fixture} />
          <FixtureMeta fixture={fixture} />
        </div>
        <div className="flex items-center gap-3 sm:gap-5">
          <div className="hidden w-28 shrink-0 md:flex">
            <FixtureLabel fixture={fixture} />
          </div>
          <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-4">
            <div className="min-w-0 flex-1 text-center">
              <div className="mx-auto mb-1 flex h-10 w-10 items-center justify-center rounded-full bg-charcoal-light">
                <HomeIcon
                  className={cn("h-4 w-4", fixture.home.iconClassName)}
                />
              </div>
              <span className="font-bebas text-sm text-white">
                {fixture.home.name}
              </span>
            </div>
            <div className="shrink-0 text-center">
              <div className="font-bebas text-2xl text-ember">VS</div>
              <div className="font-barlow text-xs text-charcoal-light">
                {fixture.time}
              </div>
            </div>
            <div className="min-w-0 flex-1 text-center">
              <div className="mx-auto mb-1 flex h-10 w-10 items-center justify-center rounded-full bg-charcoal-light">
                <AwayIcon
                  className={cn("h-4 w-4", fixture.away.iconClassName)}
                />
              </div>
              <span className="font-bebas text-sm text-white">
                {fixture.away.name}
              </span>
            </div>
          </div>
          <div className="hidden shrink-0 md:block">
            <FixtureMeta fixture={fixture} />
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}
