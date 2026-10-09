import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export function Input({ className, type = "text", ...props }: ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-11 w-full min-w-0 rounded-md border border-border-control bg-surface px-3 text-base text-fg md:h-10 md:text-sm",
        "transition-colors duration-(--duration-fast) placeholder:text-fg-subtle",
        "hover:border-fg-subtle focus-visible:border-brand focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-focus",
        "disabled:cursor-not-allowed disabled:bg-surface-muted disabled:opacity-60",
        "aria-invalid:border-danger aria-invalid:focus-visible:outline-danger",
        className,
      )}
      {...props}
    />
  );
}

/** Numeric input with a fixed unit suffix (€, %, años…). */
export function InputWithUnit({
  unit,
  className,
  ...props
}: ComponentProps<"input"> & { unit: string }) {
  return (
    <div className={cn("relative", className)}>
      <Input inputMode="decimal" className="pr-10 font-mono tabular" {...props} />
      <span className="pointer-events-none absolute inset-y-0 right-3 grid place-items-center text-base text-fg-subtle md:text-sm">
        {unit}
      </span>
    </div>
  );
}
