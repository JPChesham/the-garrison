import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils/cn";

type SelectProps = ComponentPropsWithoutRef<"select"> & {
  label: string;
  options: string[];
};

export function Select({
  label,
  options,
  className,
  id,
  ...props
}: SelectProps) {
  const selectId = id ?? label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div>
      <label
        htmlFor={selectId}
        className="mb-1 block font-bebas text-xs tracking-widest text-charcoal-light"
      >
        {label}
      </label>
      <select
        id={selectId}
        className={cn(
          "w-full rounded-sm border border-charcoal-light bg-charcoal px-3 py-2.5 font-barlow text-sm text-white transition-colors focus:border-ember focus:outline-none",
          className,
        )}
        {...props}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
