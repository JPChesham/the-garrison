import { cn } from "@/lib/utils/cn";

type DateBadgeVariant = "amber" | "ember" | "electric";

type DateBadgeProps = {
  day: string;
  date: string;
  month: string;
  variant?: DateBadgeVariant;
  className?: string;
};

const variantClasses: Record<DateBadgeVariant, string> = {
  amber: "bg-amber text-charcoal",
  ember: "bg-ember text-white",
  electric: "bg-electric text-white",
};

export function DateBadge({
  day,
  date,
  month,
  variant = "amber",
  className,
}: DateBadgeProps) {
  return (
    <div
      className={cn(
        "flex-shrink-0 rounded-sm px-4 py-2 text-center font-bebas leading-none",
        variantClasses[variant],
        className,
      )}
    >
      <div className="text-base">{day}</div>
      <div className="text-5xl leading-none">{date}</div>
      <div className="text-xs">{month}</div>
    </div>
  );
}
