import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils/cn";

type FeatureRowProps = {
  icon: LucideIcon;
  iconBgClassName: string;
  title: string;
  description: string;
  className?: string;
};

export function FeatureRow({
  icon: Icon,
  iconBgClassName,
  title,
  description,
  className,
}: FeatureRowProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-4 rounded-sm border border-charcoal-light bg-charcoal-mid/60 p-4",
        className,
      )}
    >
      <div
        className={cn(
          "flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full",
          iconBgClassName,
        )}
      >
        <Icon className="h-5 w-5 text-white" />
      </div>
      <div>
        <p className="font-bebas text-xl leading-tight text-white">{title}</p>
        <p className="font-barlow text-sm font-semibold text-charcoal-light">
          {description}
        </p>
      </div>
    </div>
  );
}
