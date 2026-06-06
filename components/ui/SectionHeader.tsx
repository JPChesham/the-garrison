import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type SectionHeaderProps = {
  eyebrow: string;
  eyebrowClassName?: string;
  title: ReactNode;
  action?: ReactNode;
  className?: string;
};

export function SectionHeader({
  eyebrow,
  eyebrowClassName,
  title,
  action,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-10 flex items-end justify-between",
        className,
      )}
    >
      <div>
        <p
          className={cn(
            "mb-2 font-barlow text-xs font-extrabold uppercase tracking-widest",
            eyebrowClassName ?? "text-charcoal-light",
          )}
        >
          {eyebrow}
        </p>
        <h2 className="font-bebas text-[clamp(3rem,6vw,5.5rem)] leading-none tracking-wide text-white">
          {title}
        </h2>
      </div>
      {action}
    </div>
  );
}
