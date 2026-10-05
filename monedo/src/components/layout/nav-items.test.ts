import { describe, expect, it } from "vitest";
import { isActivePath } from "./nav-items";

describe("isActivePath", () => {
  it("matches the exact path and nested paths", () => {
    expect(isActivePath("/cursos", "/cursos")).toBe(true);
    expect(isActivePath("/cursos/fundamentos-del-dinero", "/cursos")).toBe(true);
  });
  it("does not match siblings that share a prefix", () => {
    expect(isActivePath("/cursosx", "/cursos")).toBe(false);
  });
});
