import { cn } from "@/lib/utils/cn";

export function SectionDivider({ className }: { className?: string }) {
  return <div className={cn("section-divider", className)} />;
}
