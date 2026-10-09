import { expect, test, type Page } from "@playwright/test";
import { getLesson } from "../src/content";

const COURSE = "/cursos/fundamentos-del-dinero";
const LESSON = `${COURSE}/el-dinero-es-tiempo`;
const lesson = getLesson("fundamentos-del-dinero", "el-dinero-es-tiempo")!;
const questions = lesson.blocks.flatMap((b) => (b.type === "quiz" ? b.questions : []));

const primary = (page: Page) =>
  page.getByRole("button", { name: /^(Continuar|Comprobar|Terminar lección)$/ });
const title = (page: Page) => page.locator("#lesson-step-title");

/** Walks the whole lesson answering every question correctly. */
async function completeLesson(page: Page, isMobile: boolean) {
  for (let guard = 0; guard < 40; guard += 1) {
    if (await page.getByText("Has terminado «El dinero es tiempo»").isVisible()) return;

    if (isMobile) {
      const width = await page.evaluate(() => [document.documentElement.scrollWidth, innerWidth]);
      expect(width[0], "no horizontal scroll").toBeLessThanOrEqual(width[1]!);
      const bar = await primary(page).boundingBox();
      const viewport = page.viewportSize()!;
      expect(bar!.y + bar!.height, "action bar inside the viewport").toBeLessThanOrEqual(
        viewport.height,
      );
      expect(bar!.height).toBeGreaterThanOrEqual(44);
    }

    const heading = (await title(page).textContent()) ?? "";
    const question = questions.find((q) => q.prompt === heading);
    if (question) {
      const correct = question.options.find((o) => o.id === question.correctOptionId)!;
      await expect(page.getByRole("button", { name: "Comprobar" })).toBeDisabled();
      await page.getByRole("radio", { name: correct.text, exact: true }).click();
      await page.getByRole("button", { name: "Comprobar" }).click();
      await expect(page.getByText("Correcto", { exact: true })).toBeVisible();
    } else if (heading === "¿Lo compras ya?") {
      await expect(page.getByRole("button", { name: "Continuar" })).toBeDisabled();
      await page.getByRole("radio", { name: "Lo pienso y decido no comprarlo" }).click();
      await expect(page.getByText("Qué pasa")).toBeVisible();
    }
    await primary(page).click();
    await expect(title(page)).not.toHaveText(heading);
  }
  throw new Error("Lesson did not finish");
}

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => localStorage.clear());
});

test("start course 1, complete lesson 1.1 and see the progress", async ({ page, isMobile }) => {
  await page.goto(COURSE);
  await page.getByRole("link", { name: "Empezar el curso" }).click();
  await expect(page).toHaveURL(LESSON);
  await expect(title(page)).toHaveText("Al terminar sabrás…");

  await completeLesson(page, isMobile);
  await expect(page.getByText("Lección completada").first()).toBeVisible();
  await expect(page.getByText("4/4")).toBeVisible();

  await page.getByRole("link", { name: "Volver al curso" }).click();
  await expect(page).toHaveURL(COURSE);
  await expect(page.getByText("1/6 lecciones")).toBeVisible();
});

test("resumes at the last step after a reload", async ({ page }) => {
  await page.goto(LESSON);
  await expect(title(page)).toHaveText("Al terminar sabrás…");
  for (const next of [
    "El precio real no está en la etiqueta",
    "Primero, tu precio por hora",
    "Las zapatillas de Lucía",
  ]) {
    await primary(page).click();
    await expect(title(page)).toHaveText(next);
  }
  await page.reload();
  await expect(title(page)).toHaveText("Las zapatillas de Lucía");
  await expect(page.getByText("Retomamos donde lo dejaste.")).toBeVisible();

  await page.getByRole("button", { name: "Empezar desde el principio" }).click();
  await expect(title(page)).toHaveText("Al terminar sabrás…");
});

test("keyboard navigation with arrows, gated on questions", async ({ page, isMobile }) => {
  test.skip(isMobile, "keyboard navigation is a desktop concern");
  await page.goto(LESSON);
  await expect(title(page)).toHaveText("Al terminar sabrás…");
  await page.keyboard.press("ArrowRight");
  await expect(title(page)).toHaveText("El precio real no está en la etiqueta");
  // Focus moves to the new step title for screen readers.
  await expect(title(page)).toBeFocused();
  await page.keyboard.press("ArrowLeft");
  await expect(title(page)).toHaveText("Al terminar sabrás…");

  // Jump to the first question from the syllabus is not allowed before reaching it.
  const firstQuestion = page.getByRole("button", { name: "Pregunta 1", exact: true });
  await expect(firstQuestion).toBeDisabled();
});

test("unknown lessons are 404", async ({ page }) => {
  const response = await page.goto(`${COURSE}/no-existe`);
  expect(response?.status()).toBe(404);
});
