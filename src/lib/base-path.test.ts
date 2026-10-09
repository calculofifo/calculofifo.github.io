import { describe, expect, it } from "vitest";
import { asset, BASE_PATH } from "./base-path";

describe("asset", () => {
  it("prefixes root-relative paths with the base path", () => {
    expect(asset("/brand/monedo-mark.svg")).toBe(`${BASE_PATH}/brand/monedo-mark.svg`);
  });
});
