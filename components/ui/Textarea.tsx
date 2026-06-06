import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils/cn";

type TextareaProps = ComponentPropsWithoutRef<"textarea"> & {
  label: string;
};

export function Textarea({ label, className, id, ...props }: TextareaProps) {
  const textareaId = id ?? label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div>
      <label
        htmlFor={textareaId}
        className="mb-1 block font-bebas text-xs tracking-widest text-charcoal-light"
      >
        {label}
      </label>
      <textarea
        id={textareaId}
        className={cn(
          "w-full resize-none rounded-sm border border-charcoal-light bg-charcoal px-3 py-2.5 font-barlow text-sm text-white transition-colors placeholder:text-charcoal-light focus:border-ember focus:outline-none",
          className,
        )}
        {...props}
      />
    </div>
  );
}
