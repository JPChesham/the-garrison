import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
import { Container } from "@/components/ui/Container";

type PageHeroProps = {
  eyebrow?: string;
  eyebrowClassName?: string;
  title: ReactNode;
  description?: string;
  variant?: "default" | "purple" | "electric" | "amber" | "pint";
  className?: string;
};

const variantClasses = {
  default: "bg-charcoal",
  purple: "purple-light-section",
  electric: "bg-charcoal",
  amber: "pint-gradient",
  pint: "pint-gradient",
};

export function PageHero({
  eyebrow,
  eyebrowClassName,
  title,
  description,
  variant = "default",
  className,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "pt-24 pb-12 xl:pb-16",
        variantClasses[variant],
        className,
      )}
    >
      <Container>
        {eyebrow ? (
          <p
            className={cn(
              "mb-3 font-barlow text-xs font-extrabold uppercase tracking-widest",
              eyebrowClassName ?? "text-charcoal-light",
            )}
          >
            {eyebrow}
          </p>
        ) : null}
        <h1 className="font-bebas text-[clamp(3rem,6vw,5.5rem)] leading-none tracking-wide text-white">
          {title}
        </h1>
        {description ? (
          <p className="mt-4 max-w-2xl font-barlow text-base text-charcoal-light">
            {description}
          </p>
        ) : null}
      </Container>
    </section>
  );
}
