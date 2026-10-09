import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { STORAGE_KEYS, STORAGE_PREFIX } from "./storage-keys";

function sourceFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return sourceFiles(path);
    return /\.tsx?$/.test(name) && !/\.test\.tsx?$/.test(name) ? [path] : [];
  });
}

describe("storage keys", () => {
  it('all start with "monedo:"', () => {
    for (const key of Object.values(STORAGE_KEYS))
      expect(key.startsWith(STORAGE_PREFIX)).toBe(true);
  });

  it("are only defined in storage-keys.ts and never wiped with clear()", () => {
    const offenders: string[] = [];
    for (const file of sourceFiles(join(process.cwd(), "src"))) {
      if (file.endsWith("storage-keys.ts")) continue;
      const code = readFileSync(file, "utf8");
      // Literal keys passed straight to the Storage API, or a full wipe of shared storage.
      if (/(get|set|remove)Item\(\s*["'`]/.test(code) || /Storage\.clear\(/.test(code)) {
        offenders.push(file);
      }
    }
    expect(offenders).toEqual([]);
  });
});
