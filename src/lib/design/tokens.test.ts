import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { AA_TEXT, AA_UI, contrastRatio } from "./contrast";
import { colorTokens, textPairs, uiPairs, type ThemeName } from "./tokens";

const themes = Object.keys(colorTokens) as ThemeName[];

describe("contrastRatio", () => {
  it("matches known WCAG values", () => {
    expect(contrastRatio("#000000", "#ffffff")).toBeCloseTo(21, 5);
    expect(contrastRatio("#777777", "#ffffff")).toBeCloseTo(4.48, 2);
  });
});

describe.each(themes)("%s theme meets WCAG AA", (theme) => {
  const t = colorTokens[theme];
  it.each(textPairs)("text %s on %s ≥ 4.5:1", (fg, bg) => {
    expect(contrastRatio(t[fg], t[bg])).toBeGreaterThanOrEqual(AA_TEXT);
  });
  it.each(uiPairs)("ui %s on %s ≥ 3:1", (fg, bg) => {
    expect(contrastRatio(t[fg], t[bg])).toBeGreaterThanOrEqual(AA_UI);
  });
});

describe("tokens.ts mirrors globals.css", () => {
  const css = readFileSync(join(process.cwd(), "src/app/globals.css"), "utf8");
  const block = (selector: string) => {
    const start = css.indexOf(`${selector} {`);
    expect(start, `missing ${selector}`).toBeGreaterThan(-1);
    return css.slice(start, css.indexOf("}", start));
  };
  const blocks: Record<ThemeName, string[]> = {
    light: [block('[data-theme="light"]')],
    dark: [block('[data-theme="dark"]'), block(':root:not([data-theme="light"])')],
  };
  it.each(themes)("%s values match", (theme) => {
    for (const source of blocks[theme]) {
      for (const [name, value] of Object.entries(colorTokens[theme])) {
        expect(source, `--${name} in ${theme}`).toContain(`--${name}: ${value};`);
      }
    }
  });
});
