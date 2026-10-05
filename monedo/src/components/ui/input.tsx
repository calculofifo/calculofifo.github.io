import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export function Input({ className, type = "text", ...props }: ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-10 w-full min-w-0 rounded-md border border-border-control bg-surface px-3 text-base text-fg sm:text-sm",
        "transition-colors duration-(--duration-fast) placeholder:text-fg-subtle",
        "hover:border-fg-subtle focus-visible:border-brand focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-focus/40",
        "disabled:cursor-not-allowed disabled:bg-surface-muted disabled:opacity-60",
        "aria-invalid:border-danger aria-invalid:focus-visible:outline-danger/40",
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
      <span className="pointer-events-none absolute inset-y-0 right-3 grid place-items-center text-sm text-fg-subtle">
        {unit}
      </span>
    </div>
  );
}
