import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/** Linear progress bar. `value` is a fraction between 0 and 1. */
export function Progress({
  value,
  label,
  tone = "brand",
  className,
  ...props
}: Omit<ComponentProps<"div">, "children"> & {
  value: number;
  label: string;
  tone?: "brand" | "amber";
}) {
  const clamped = Math.min(1, Math.max(0, value));
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(clamped * 100)}
      className={cn("h-1.5 w-full overflow-hidden rounded-full bg-surface-muted", className)}
      {...props}
    >
      <div
        className={cn(
          "h-full origin-left rounded-full transition-transform duration-(--duration-slow) ease-(--ease-out)",
          tone === "brand" ? "bg-brand" : "bg-amber",
        )}
        style={{ transform: `scaleX(${clamped})` }}
      />
    </div>
  );
}
