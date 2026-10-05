import { afterEach, describe, expect, it, vi } from "vitest";
import {
  applyThemePreference,
  readThemePreference,
  subscribeThemePreference,
  themeInitScript,
  THEME_STORAGE_KEY,
} from "./theme";

afterEach(() => {
  localStorage.clear();
  document.documentElement.removeAttribute("data-theme");
});

describe("theme preference", () => {
  it("defaults to system", () => {
    expect(readThemePreference()).toBe("system");
  });

  it("persists an explicit theme and sets data-theme", () => {
    applyThemePreference("dark");
    expect(document.documentElement.dataset.theme).toBe("dark");
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe("dark");
    expect(readThemePreference()).toBe("dark");
  });

  it("system removes the attribute and the stored value", () => {
    applyThemePreference("light");
    applyThemePreference("system");
    expect(document.documentElement.hasAttribute("data-theme")).toBe(false);
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBeNull();
  });

  it("ignores garbage in storage", () => {
    localStorage.setItem(THEME_STORAGE_KEY, "purple");
    expect(readThemePreference()).toBe("system");
  });

  it("notifies subscribers", () => {
    const listener = vi.fn();
    const unsubscribe = subscribeThemePreference(listener);
    applyThemePreference("dark");
    unsubscribe();
    applyThemePreference("light");
    expect(listener).toHaveBeenCalledTimes(1);
  });

  it("init script applies a stored theme", () => {
    localStorage.setItem(THEME_STORAGE_KEY, "dark");
    new Function(themeInitScript)();
    expect(document.documentElement.dataset.theme).toBe("dark");
  });
});
