import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils/cn";

type ButtonVariant =
  | "primary"
  | "outline-white"
  | "outline-electric"
  | "outline-charcoal"
  | "outline-purple"
  | "ghost";

type ButtonSize = "sm" | "md" | "lg";

type ButtonBaseProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  glow?: boolean;
  className?: string;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-ember text-white hover:bg-ember-dark stage-glow-ember",
  "outline-white":
    "border-2 border-white bg-black/30 text-white hover:border-amber hover:text-amber",
  "outline-electric":
    "border-2 border-electric bg-black/30 text-electric hover:bg-electric hover:text-white",
  "outline-charcoal":
    "border-2 border-charcoal-light text-white hover:border-ember hover:text-ember",
  "outline-purple":
    "border-2 border-purple text-purple-light hover:bg-purple hover:text-white",
  ghost: "text-white hover:text-ember",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-5 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-10 py-4 text-xl",
};

type ButtonProps = ButtonBaseProps &
  ComponentPropsWithoutRef<"button"> & {
    href?: never;
  };

type ButtonLinkProps = ButtonBaseProps &
  ComponentPropsWithoutRef<typeof Link> & {
    href: string;
  };

export function Button({
  variant = "primary",
  size = "md",
  glow = false,
  className,
  children,
  ...props
}: ButtonProps | ButtonLinkProps) {
  const classes = cn(
    "inline-flex items-center justify-center rounded-sm font-bebas tracking-widest transition-colors",
    variantClasses[variant],
    sizeClasses[size],
    glow && variant === "primary" && "stage-glow-ember",
    className,
  );

  if ("href" in props && props.href) {
    const { href, ...linkProps } = props;
    const isExternal = href.startsWith("http");

    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          {...linkProps}
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={classes} {...linkProps}>
        {children}
      </Link>
    );
  }

  const buttonProps = props as ComponentPropsWithoutRef<"button">;
  return (
    <button type="button" className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
