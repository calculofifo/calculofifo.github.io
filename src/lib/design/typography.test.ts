import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * Guards the type floor: nothing below 12px (text-xs). 12px is reserved for labels and
 * badges; reading text is ≥16px (enforced by review, see CLAUDE.md).
 */
function sourceFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return sourceFiles(path);
    return /\.(tsx?|css)$/.test(name) && !name.endsWith(".test.ts") ? [path] : [];
  });
}

describe("type scale floor", () => {
  it("has no arbitrary font sizes below 12px", () => {
    const offenders: string[] = [];
    for (const file of sourceFiles(join(process.cwd(), "src"))) {
      const content = readFileSync(file, "utf8");
      for (const match of content.matchAll(/text-\[(\d+(?:\.\d+)?)(px|rem)\]/g)) {
        const px = match[2] === "rem" ? Number(match[1]) * 16 : Number(match[1]);
        if (px < 12) offenders.push(`${file}: ${match[0]}`);
      }
    }
    expect(offenders).toEqual([]);
  });
});
