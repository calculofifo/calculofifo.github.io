import { route } from "./paths";
import { expect, test } from "@playwright/test";

test("main navigation reaches every section", async ({ page, isMobile }) => {
  await page.goto(route("/"));
  const nav = page.getByRole("navigation", { name: "Principal" }).filter({ visible: true });
  for (const [label, path] of [
    ["Cursos", "/cursos"],
    ["Herramientas", "/herramientas"],
    ["Perfil", "/perfil"],
    ["Aprender", "/aprender"],
  ] as const) {
    await nav.getByRole("link", { name: label }).click();
    await expect(page).toHaveURL(route(path));
    await expect(nav.getByRole("link", { name: label })).toHaveAttribute("aria-current", "page");
  }
  // Bottom nav only on mobile, header nav only on desktop.
  await expect(nav).toHaveCount(1);
  expect(isMobile).toBe(await page.locator("nav.fixed").isVisible());
});

test("theme choice persists across reloads without flashing", async ({ page }) => {
  await page.goto(route("/design"));
  await page.getByRole("button", { name: "Cambiar tema" }).click();
  await page.getByRole("menuitemradio", { name: "Oscuro" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");

  await page.getByRole("button", { name: "Cambiar tema" }).click();
  await page.getByRole("menuitemradio", { name: "Sistema" }).click();
  await expect(page.locator("html")).not.toHaveAttribute("data-theme", /.*/);
});

test("skip link is the first focusable element", async ({ page, isMobile }) => {
  test.skip(isMobile, "keyboard navigation is a desktop concern");
  await page.goto(route("/"));
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "Saltar al contenido" });
  await expect(skip).toBeFocused();
  await expect(skip).toBeInViewport();
});

test("quiz demo gives immediate feedback", async ({ page }) => {
  await page.goto(route("/design#preguntas"));
  const quiz = page.locator("#preguntas");
  const check = quiz.getByRole("button", { name: "Comprobar" });
  await expect(check).toBeDisabled();
  await quiz.getByRole("radio", { name: /Pierde poder de compra/ }).click();
  await check.click();
  await expect(quiz.getByText("Correcto", { exact: true })).toBeVisible();
  await expect(quiz.getByRole("radio", { name: /Pierde poder de compra/ })).toBeDisabled();
});
