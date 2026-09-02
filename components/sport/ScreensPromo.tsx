import { Tv } from "lucide-react";
import { cn } from "@/lib/utils/cn";

type ScreensPromoProps = {
  title: string;
  subtitle: string;
  className?: string;
};

export function ScreensPromo({
  title,
  subtitle,
  className,
}: ScreensPromoProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-sm border border-electric bg-charcoal-mid px-5 py-3 stage-glow-blue",
        className,
      )}
    >
      <Tv className="h-5 w-5 text-electric xl:h-6 xl:w-6" />
      <div>
        <p className="font-bebas text-lg leading-tight text-white">{title}</p>
        <p className="font-barlow text-xs font-semibold uppercase tracking-wider text-charcoal-light">
          {subtitle}
        </p>
      </div>
    </div>
  );
}
