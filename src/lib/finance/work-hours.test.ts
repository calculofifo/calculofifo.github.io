import { describe, expect, it } from "vitest";
import { hourlyWage, workHoursFor, yearlyCost } from "./work-hours";

describe("workHoursFor", () => {
  it("splits exact hours into hours and minutes", () => {
    expect(workHoursFor(90, 8)).toEqual({ hours: 11.25, wholeHours: 11, minutes: 15 });
  });

  it("handles whole hours", () => {
    expect(workHoursFor(600, 8)).toEqual({ hours: 75, wholeHours: 75, minutes: 0 });
  });

  it("rounds to the nearest minute and carries 60 minutes into the next hour", () => {
    // 59.999 min → 60 → 1 h 0 min, never "0 h 60 min"
    expect(workHoursFor(7.9999, 8)).toMatchObject({ wholeHours: 1, minutes: 0 });
  });

  it("returns zero for a free item", () => {
    expect(workHoursFor(0, 8)).toEqual({ hours: 0, wholeHours: 0, minutes: 0 });
  });

  it("handles cents", () => {
    expect(workHoursFor(1.5, 9)).toMatchObject({ wholeHours: 0, minutes: 10 });
  });

  it.each([
    [10, 0],
    [10, -5],
    [-1, 8],
    [Number.NaN, 8],
    [10, Number.POSITIVE_INFINITY],
  ])("rejects price=%s wage=%s", (price, wage) => {
    expect(workHoursFor(price, wage)).toBeNull();
  });
});

describe("hourlyWage", () => {
  it("divides pay by hours", () => {
    expect(hourlyWage(40, 5)).toBe(8);
  });
  it("rejects zero or negative hours", () => {
    expect(hourlyWage(40, 0)).toBeNull();
    expect(hourlyWage(40, -2)).toBeNull();
  });
  it("rejects negative pay and non-finite input", () => {
    expect(hourlyWage(-1, 5)).toBeNull();
    expect(hourlyWage(Number.NaN, 5)).toBeNull();
  });
});

describe("yearlyCost", () => {
  it("multiplies by 12 without float noise", () => {
    expect(yearlyCost(12.99)).toBe(155.88);
  });
  it("treats invalid amounts as zero", () => {
    expect(yearlyCost(-5)).toBe(0);
    expect(yearlyCost(Number.NaN)).toBe(0);
  });
});
