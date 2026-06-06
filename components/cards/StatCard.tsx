import { cn } from "@/lib/utils/cn";

type StatCardProps = {
  value: string;
  label: string;
  valueClassName?: string;
  className?: string;
};

export function StatCard({
  value,
  label,
  valueClassName = "text-amber",
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "rounded-sm border border-charcoal-light bg-black/40 p-4 text-center",
        className,
      )}
    >
      <div
        className={cn(
          "font-bebas text-4xl leading-none",
          valueClassName,
        )}
      >
        {value}
      </div>
      <div className="mt-2 font-barlow text-xs font-semibold uppercase leading-tight tracking-wider text-white">
        {label.split("\n").map((line, i) => (
          <span key={i} className="block">
            {line}
          </span>
        ))}
      </div>
    </div>
  );
}
