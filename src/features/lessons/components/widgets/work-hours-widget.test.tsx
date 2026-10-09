import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { parseEuroInput, WorkHoursWidget } from "./work-hours-widget";

describe("parseEuroInput", () => {
  it.each([
    ["90", 90],
    ["89,99", 89.99],
    ["1.234,50", 1234.5],
    [" 12 € ", 12],
  ])("%s → %s", (input, expected) => {
    expect(parseEuroInput(input)).toBe(expected);
  });
  it.each(["", "abc", "1,2,3", "-5"])("rejects %j", (input) => {
    expect(parseEuroInput(input)).toBeNaN();
  });
});

describe("WorkHoursWidget", () => {
  it("shows the hours for the default values and updates with presets", () => {
    render(<WorkHoursWidget defaultPrice={90} defaultHourlyWage={8} />);
    expect(screen.getByText(/11 h 15 min de trabajo/)).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: /Móvil/ }));
    expect(screen.getByText(/75 h de trabajo/)).toBeTruthy();
    expect(screen.getByRole("button", { name: /Móvil/ }).getAttribute("aria-pressed")).toBe("true");
  });

  it("flags an invalid price", () => {
    render(<WorkHoursWidget defaultPrice={90} defaultHourlyWage={8} />);
    fireEvent.change(screen.getByLabelText("Precio de lo que quieres"), {
      target: { value: "abc" },
    });
    expect(screen.getByText(/Escribe un precio válido/)).toBeTruthy();
  });
});
