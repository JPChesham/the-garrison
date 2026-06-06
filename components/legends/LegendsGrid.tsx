import { LegendCard } from "@/components/cards/LegendCard";
import type { LegendData } from "@/components/cards/LegendCard";
import { cn } from "@/lib/utils/cn";

type LegendsGridProps = {
  legends: LegendData[];
  layout?: "reel" | "grid";
  className?: string;
};

export function LegendsGrid({
  legends,
  layout = "grid",
  className,
}: LegendsGridProps) {
  if (layout === "reel") {
    return (
      <div className={cn("legends-reel px-6 pb-4 xl:px-12", className)}>
        {legends.map((legend) => (
          <LegendCard key={legend.slug} legend={legend} layout="reel" />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
        className,
      )}
    >
      {legends.map((legend) => (
        <LegendCard key={legend.slug} legend={legend} layout="grid" />
      ))}
    </div>
  );
}
