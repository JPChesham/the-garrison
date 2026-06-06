import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils/cn";

type FieldProps = ComponentPropsWithoutRef<"input"> & {
  label: string;
};

export function Input({ label, className, id, ...props }: FieldProps) {
  const inputId = id ?? label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div>
      <label
        htmlFor={inputId}
        className="mb-1 block font-bebas text-xs tracking-widest text-charcoal-light"
      >
        {label}
      </label>
      <input
        id={inputId}
        className={cn(
          "w-full rounded-sm border border-charcoal-light bg-charcoal px-3 py-2.5 font-barlow text-sm text-white transition-colors placeholder:text-charcoal-light focus:border-ember focus:outline-none",
          className,
        )}
        {...props}
      />
    </div>
  );
}
