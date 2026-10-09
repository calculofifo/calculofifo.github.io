import { cn } from "@/lib/utils";
import { MARK_PATH, WORDMARK_CAP_HEIGHT, WORDMARK_PATH, WORDMARK_WIDTH } from "./wordmark-path";

/**
 * Brand symbol: an "M" drawn as a line chart whose right shoulder rises higher.
 * Uses `fill-brand` so the tile adapts to light/dark; the stroke is always brand-fg.
 * Below 20px pass `small` for a heavier stroke that survives favicon sizes.
 */
export function LogoMark({ className, small = false }: { className?: string; small?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={cn("size-6 shrink-0", className)}>
      <rect width="24" height="24" rx="6.5" className="fill-brand" />
      <path
        d={MARK_PATH}
        fill="none"
        className="stroke-brand-fg"
        strokeWidth={small ? 2.8 : 2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const MARK = 96;
const GAP = 28;
const VIEW_WIDTH = Math.ceil(MARK + GAP + WORDMARK_WIDTH);

/** Full lockup (symbol + outlined wordmark). Wordmark uses currentColor; size it by height. */
export function Logo({ className, title = "Monedo" }: { className?: string; title?: string }) {
  return (
    <svg
      viewBox={`0 0 ${VIEW_WIDTH} ${MARK}`}
      role="img"
      aria-label={title}
      className={cn("h-6 w-auto shrink-0 text-fg", className)}
    >
      <g transform="scale(4)">
        <rect width="24" height="24" rx="6.5" className="fill-brand" />
        <path
          d={MARK_PATH}
          fill="none"
          className="stroke-brand-fg"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <path
        transform={`translate(${MARK + GAP} ${MARK / 2 + WORDMARK_CAP_HEIGHT / 2})`}
        fill="currentColor"
        d={WORDMARK_PATH}
      />
    </svg>
  );
}
