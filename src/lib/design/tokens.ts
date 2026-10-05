/**
 * Mirror of the colour tokens in src/app/globals.css.
 * Used by the /design page and by the contrast test; keep both in sync.
 */
export const colorTokens = {
  light: {
    bg: "#fafafa",
    surface: "#ffffff",
    "surface-muted": "#f4f4f5",
    "surface-raised": "#ffffff",
    border: "#e4e4e7",
    "border-strong": "#d4d4d8",
    "border-control": "#8b8b94",
    fg: "#09090b",
    "fg-muted": "#52525b",
    "fg-subtle": "#686871",
    brand: "#046c4e",
    "brand-hover": "#035a41",
    "brand-fg": "#ffffff",
    "brand-text": "#046c4e",
    "brand-subtle": "#e9f6f0",
    "brand-subtle-fg": "#035238",
    amber: "#d97706",
    "amber-text": "#a1490a",
    "amber-subtle": "#fdf4e3",
    success: "#12733d",
    "success-subtle": "#e8f5ec",
    danger: "#c4231d",
    "danger-fg": "#ffffff",
    "danger-subtle": "#fdeceb",
    focus: "#059669",
    "chart-1": "#046c4e",
    "chart-2": "#a1a1aa",
  },
  dark: {
    bg: "#09090b",
    surface: "#111113",
    "surface-muted": "#18181b",
    "surface-raised": "#1c1c20",
    border: "#27272a",
    "border-strong": "#3f3f46",
    "border-control": "#71717a",
    fg: "#fafafa",
    "fg-muted": "#a1a1aa",
    "fg-subtle": "#8a8a93",
    brand: "#0b7a59",
    "brand-hover": "#086549",
    "brand-fg": "#ffffff",
    "brand-text": "#3ccf98",
    "brand-subtle": "#0d2a20",
    "brand-subtle-fg": "#7ee2bb",
    amber: "#f5a524",
    "amber-text": "#f7b955",
    "amber-subtle": "#2a1f0b",
    success: "#4ade80",
    "success-subtle": "#0f2a19",
    danger: "#f87171",
    "danger-fg": "#09090b",
    "danger-subtle": "#2c1212",
    focus: "#34d399",
    "chart-1": "#3ccf98",
    "chart-2": "#52525b",
  },
} as const;

export type ThemeName = keyof typeof colorTokens;
export type ColorToken = keyof (typeof colorTokens)["light"];

type Pair = readonly [foreground: ColorToken, background: ColorToken];

/** Text pairs that must reach 4.5:1. */
export const textPairs: readonly Pair[] = [
  ["fg", "bg"],
  ["fg", "surface"],
  ["fg", "surface-muted"],
  ["fg-muted", "bg"],
  ["fg-muted", "surface"],
  ["fg-muted", "surface-muted"],
  ["fg-subtle", "bg"],
  ["fg-subtle", "surface"],
  ["fg-subtle", "surface-muted"],
  ["brand-fg", "brand"],
  ["brand-fg", "brand-hover"],
  ["brand-text", "bg"],
  ["brand-text", "surface"],
  ["brand-subtle-fg", "brand-subtle"],
  ["amber-text", "surface"],
  ["amber-text", "amber-subtle"],
  ["success", "surface"],
  ["success", "success-subtle"],
  ["danger", "surface"],
  ["danger", "danger-subtle"],
  ["danger-fg", "danger"],
];

/** Non-text UI pairs (focus rings, control borders, progress fills) that must reach 3:1. */
export const uiPairs: readonly Pair[] = [
  ["focus", "bg"],
  ["focus", "surface"],
  ["border-control", "surface"],
  ["border-control", "bg"],
  ["chart-1", "surface"],
  ["amber", "surface"],
];
