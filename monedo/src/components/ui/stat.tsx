import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Label + big figure + optional context. Hierarchy by type, not boxes. */
export function Stat({
  label,
  value,
  unit,
  hint,
  size = "md",
  className,
}: {
  label: ReactNode;
  value: ReactNode;
  /** Unit in the sans face, smaller than the figure: "min", "%", "€"… */
  unit?: string;
  hint?: ReactNode;
  size?: "md" | "lg";
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <dt className="text-sm text-fg-muted">{label}</dt>
      <dd
        className={cn(
          "font-mono tabular font-medium tracking-tight",
          size === "lg" ? "text-4xl sm:text-5xl" : "text-2xl",
        )}
      >
        {value}
        {unit ? (
          <span className="ml-1 font-sans text-[0.5em] font-medium tracking-normal text-fg-muted">
            {unit}
          </span>
        ) : null}
      </dd>
      {hint ? <dd className="text-sm text-fg-subtle">{hint}</dd> : null}
    </div>
  );
}
