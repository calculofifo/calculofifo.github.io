import { cn } from "@/lib/utils";

/**
 * Abstract dot field with a compound-growth curve: dots below the curve are brand,
 * the rest neutral. Pure SVG, decorative, computed at render (no randomness → no
 * hydration mismatch).
 */
export function GrowthField({
  columns = 24,
  rows = 12,
  rate = 0.11,
  className,
}: {
  columns?: number;
  rows?: number;
  rate?: number;
  className?: string;
}) {
  const gap = 12;
  const width = columns * gap;
  const height = rows * gap;
  const max = (1 + rate) ** (columns - 1);
  const curveHeight = (col: number) => ((1 + rate) ** col / max) * (rows - 1);

  const dots: { x: number; y: number; filled: boolean; strength: number }[] = [];
  for (let c = 0; c < columns; c += 1) {
    const level = curveHeight(c);
    for (let r = 0; r < rows; r += 1) {
      const filled = r <= level;
      dots.push({
        x: c * gap + gap / 2,
        y: height - (r * gap + gap / 2),
        filled,
        strength: filled ? 0.35 + 0.65 * (r / Math.max(level, 1)) : 1,
      });
    }
  }

  const path = Array.from({ length: columns }, (_, c) => {
    const x = c * gap + gap / 2;
    const y = height - (curveHeight(c) * gap + gap / 2);
    return `${c === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join(" ");

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      aria-hidden
      className={cn("h-auto w-full", className)}
      preserveAspectRatio="xMidYMid meet"
    >
      {dots.map((dot) => (
        <circle
          key={`${dot.x}-${dot.y}`}
          cx={dot.x}
          cy={dot.y}
          r={dot.filled ? 2.2 : 1.4}
          className={dot.filled ? "fill-chart-1" : "fill-border-strong"}
          opacity={dot.filled ? dot.strength : 1}
        />
      ))}
      <path
        d={path}
        fill="none"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-brand-text"
      />
    </svg>
  );
}
