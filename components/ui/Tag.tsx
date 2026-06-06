import { cn } from "@/lib/utils/cn";

type TagVariant = "purple" | "ember" | "amber" | "electric";

type TagProps = {
  children: string;
  variant?: TagVariant;
  className?: string;
};

const variantClasses: Record<TagVariant, string> = {
  purple: "bg-purple text-white",
  ember: "bg-ember text-white",
  amber: "bg-amber text-charcoal",
  electric: "bg-electric text-white",
};

export function Tag({ children, variant = "purple", className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-block rounded-sm px-2 py-1 font-bebas text-xs tracking-widest",
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
