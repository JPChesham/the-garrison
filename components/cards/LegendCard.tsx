import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";

export type LegendData = {
  slug: string;
  featured?: boolean;
  image: string;
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

export function LegendCard({ legend, layout = "reel" }: LegendCardProps) {
  return (
    <Link
      href={`/legends/${legend.slug}`}
      className={cn(
        "legend-card block overflow-hidden rounded-sm",
        layout === "reel"
          ? "w-[280px] flex-shrink-0"
          : "w-full",
      )}
    >
      <Image
        src={legend.image}
        alt={legend.name.replace("\n", " ")}
        width={280}
        height={380}
        className={cn(
          "grayscale-img object-cover",
          layout === "reel" ? "h-[380px] w-[280px]" : "aspect-[280/380] w-full",
        )}
      />
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
