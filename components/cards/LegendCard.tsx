import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";

export type LegendData = {
  slug: string;
  featured?: boolean;
  image?: string;
  imageAlt?: string;
  name: string;
  genre: string;
  year: string;
  genreClassName: string;
  bio: string;
};

type LegendCardProps = {
  legend: LegendData;
  layout?: "reel" | "grid";
};

function displayName(name: string) {
  return name.replaceAll("\n", " ");
}

function initials(name: string) {
  return displayName(name)
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("");
}

function LegendPortrait({
  legend,
  layout,
}: {
  legend: LegendData;
  layout: "reel" | "grid";
}) {
  const alt = legend.imageAlt ?? displayName(legend.name);
  const sizeClass =
    layout === "reel" ? "h-[380px] w-[280px]" : "aspect-[280/380] w-full";

  if (legend.image) {
    return (
      <Image
        src={legend.image}
        alt={alt}
        width={280}
        height={380}
        className={cn("grayscale-img object-cover", sizeClass)}
      />
    );
  }

  return (
    <div
      className={cn(
        "grayscale-img flex items-center justify-center bg-charcoal-mid",
        sizeClass,
      )}
      aria-hidden="true"
    >
      <span className="font-bebas text-6xl leading-none text-ember">
        {initials(legend.name)}
      </span>
    </div>
  );
}

export function LegendCard({ legend, layout = "reel" }: LegendCardProps) {
  return (
    <Link
      href={`/legends/${legend.slug}`}
      className={cn(
        "legend-card block overflow-hidden rounded-sm",
        layout === "reel" ? "w-[280px] flex-shrink-0" : "w-full",
      )}
    >
      <LegendPortrait legend={legend} layout={layout} />
      <div className="legend-glow" />
      <div className="legend-name">
        <p className="font-bebas text-[2.2rem] leading-none whitespace-pre-line text-white">
          {legend.name}
        </p>
        <p
          className={cn(
            "mt-1 font-barlow text-xs font-semibold uppercase tracking-widest",
            legend.genreClassName,
          )}
        >
          {legend.genre}
        </p>
        <p className="mt-1 font-barlow text-xs text-charcoal-light">
          {legend.year}
        </p>
      </div>
    </Link>
  );
}
