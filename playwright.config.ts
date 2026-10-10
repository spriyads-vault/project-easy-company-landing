import { defineConfig, devices } from "@playwright/test";

const PORT = 3100;
/** The same site built with NEXT_PUBLIC_FF_HOMEPAGE_V6 on, into its own dist dir (next.config.ts). */
const PORT_V6 = 3101;
/** v6 plus NEXT_PUBLIC_FF_SECTION_PAGES (SCRUM-310), into a third dist dir. */
const PORT_SECTIONS = 3102;
/** v6 plus NEXT_PUBLIC_FF_SCROLL_SECTIONS (SCRUM-314); SECTION_PAGES is on too, to prove the override. */
const PORT_SCROLL = 3103;

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
    { name: "chromium", testIgnore: /(v6|sections|scroll)\//, use: { ...devices["Desktop Chrome"], baseURL: `http://localhost:${PORT}` } },
    // Flag on: the v6 homepage (tests/e2e/v6), section pages off.
    { name: "chromium-v6", testMatch: /v6\/.*\.spec\.ts/, use: { ...devices["Desktop Chrome"], baseURL: `http://localhost:${PORT_V6}` } },
    // v6 with the section pages on (tests/e2e/sections).
    { name: "chromium-sections", testMatch: /sections\/.*\.spec\.ts/, use: { ...devices["Desktop Chrome"], baseURL: `http://localhost:${PORT_SECTIONS}` } },
    // v6 with one scrolling homepage and clean section URLs (tests/e2e/scroll).
    { name: "chromium-scroll", testMatch: /scroll\/.*\.spec\.ts/, use: { ...devices["Desktop Chrome"], baseURL: `http://localhost:${PORT_SCROLL}` } },
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
    {
      command: `npm run build && npx next start -p ${PORT_SECTIONS}`,
      env: { NEXT_PUBLIC_FF_HOMEPAGE_V6: "1", NEXT_PUBLIC_FF_SECTION_PAGES: "1", NEXT_DIST_DIR: ".next-sections" },
      url: `http://localhost:${PORT_SECTIONS}`,
      reuseExistingServer: !process.env.CI,
      timeout: 240_000,
    },
    {
      command: `npm run build && npx next start -p ${PORT_SCROLL}`,
      env: { NEXT_PUBLIC_FF_HOMEPAGE_V6: "1", NEXT_PUBLIC_FF_SECTION_PAGES: "1", NEXT_PUBLIC_FF_SCROLL_SECTIONS: "1", NEXT_DIST_DIR: ".next-scroll" },
      url: `http://localhost:${PORT_SCROLL}`,
      reuseExistingServer: !process.env.CI,
      timeout: 240_000,
    },
  ],
});
