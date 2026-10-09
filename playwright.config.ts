import { defineConfig, devices } from "@playwright/test";

const PORT = 3100;
// Cloud/dev containers ship Chromium here; locally Playwright uses its own download.
const executablePath = process.env.PLAYWRIGHT_CHROMIUM_PATH;

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: "on-first-retry",
    ...(executablePath ? { launchOptions: { executablePath } } : {}),
  },
  projects: [
    { name: "mobile", use: { ...devices["Pixel 7"] } },
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
  ],
  webServer: {
    // Build the static export and serve it like GitHub Pages (base path, 404.html).
    // E2E_SKIP_BUILD=1 reuses an existing out/ (CI builds it in a previous step).
    command: `${process.env.E2E_SKIP_BUILD ? "" : "npm run build && "}node scripts/serve-static.mjs ${PORT}`,
    url: `http://localhost:${PORT}/monedo/`,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
});
