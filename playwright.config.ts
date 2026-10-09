import { defineConfig, devices } from "@playwright/test";

const PORT = 3100;
/** The same site built with NEXT_PUBLIC_FF_HOMEPAGE_V6 on, into its own dist dir (next.config.ts). */
const PORT_V6 = 3101;

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? "github" : "list",
  use: {
    trace: "on-first-retry",
  },
  projects: [
    // Flag off: the current homepage, docs, legal pages and SEO files.
    { name: "chromium", testIgnore: /v6\//, use: { ...devices["Desktop Chrome"], baseURL: `http://localhost:${PORT}` } },
    // Flag on: the v6 homepage (tests/e2e/v6).
    { name: "chromium-v6", testMatch: /v6\/.*\.spec\.ts/, use: { ...devices["Desktop Chrome"], baseURL: `http://localhost:${PORT_V6}` } },
  ],
  webServer: [
    {
      command: `npm run build && npx next start -p ${PORT}`,
      env: { NEXT_PUBLIC_FF_HOMEPAGE_V6: "0" },
      url: `http://localhost:${PORT}`,
      reuseExistingServer: !process.env.CI,
      timeout: 240_000,
    },
    {
      command: `npm run build && npx next start -p ${PORT_V6}`,
      env: { NEXT_PUBLIC_FF_HOMEPAGE_V6: "1", NEXT_DIST_DIR: ".next-v6" },
      url: `http://localhost:${PORT_V6}`,
      reuseExistingServer: !process.env.CI,
      timeout: 240_000,
    },
  ],
});
