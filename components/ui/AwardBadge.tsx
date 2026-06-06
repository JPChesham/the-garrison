import { cn } from "@/lib/utils/cn";

type AwardBadgeProps = {
  lines: { text: string; className?: string }[];
  size?: "sm" | "md" | "lg";
  borderColor?: "ember" | "purple" | "purple-light" | "amber";
  rotation?: 1 | 2 | 3;
  glow?: "ember" | "purple" | "blue" | "none";
  className?: string;
};

const sizeClasses = {
  sm: "h-20 w-20 p-1",
  md: "h-24 w-24 p-2",
  lg: "h-28 w-28 p-2",
};

const borderClasses = {
  ember: "border-ember",
  purple: "border-purple",
  "purple-light": "border-purple-light",
  amber: "border-amber",
};

const glowClasses = {
  ember: "stage-glow-ember",
  purple: "stage-glow-purple",
  blue: "stage-glow-blue",
  none: "",
};

const rotationClasses = {
  1: "badge-rotate-1",
  2: "badge-rotate-2",
  3: "badge-rotate-3",
};

export function AwardBadge({
  lines,
  size = "sm",
  borderColor = "ember",
  rotation,
  glow = "none",
  className,
}: AwardBadgeProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-full border-4 bg-charcoal-mid text-center",
        sizeClasses[size],
        borderClasses[borderColor],
        rotation && rotationClasses[rotation],
        glowClasses[glow],
        className,
      )}
    >
      {lines.map((line, i) => (
        <span
          key={i}
          className={cn(
            "font-bebas leading-tight",
            size === "lg" ? "text-sm" : "text-xs",
            line.className,
          )}
        >
          {line.text}
        </span>
      ))}
    </div>
  );
}
