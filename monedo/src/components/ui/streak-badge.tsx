import { Flame } from "lucide-react";
import { cn } from "@/lib/utils";

/** Amber is reserved for achievements and streaks. */
export function StreakBadge({ days, className }: { days: number; className?: string }) {
  const active = days > 0;
  return (
    <span
      className={cn(
        "inline-flex h-7 items-center gap-1.5 rounded-full px-2.5 text-sm font-medium",
        active ? "bg-amber-subtle text-amber-text" : "bg-surface-muted text-fg-subtle",
        className,
      )}
    >
      <Flame aria-hidden className={cn("size-3.5", active && "fill-current")} />
      <span className="font-mono tabular">{days}</span>
      <span className="sr-only">{days === 1 ? "día de racha" : "días de racha"}</span>
      <span aria-hidden>{days === 1 ? "día" : "días"}</span>
    </span>
  );
}
