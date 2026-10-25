import { expect, test } from "@playwright/test";
import { statusOf } from "../../../src/content/capability-status";
import { BENCHMARK, LIMITS_15_109, TEST_COUNT, TRUTH_STATES } from "../../../src/content/docs-spec";

// The docs as the method, coverage and security specification (NEXT_PUBLIC_FF_DOCS_SPEC on in the chromium-v8 build).

const PAGES = [
  { path: "/docs", title: "Method & Coverage | Crado Docs", h1: "Method, coverage and security" },
  { path: "/docs/concepts", title: "The four truth states | Crado Docs", h1: "The four truth states" },
  { path: "/docs/reference", title: "Deterministic arithmetic and coverage | Crado Docs", h1: "Deterministic arithmetic and coverage" },
  { path: "/docs/evaluation", title: "Validation | Crado Docs", h1: "Validation" },
  { path: "/docs/trust", title: "Security and workspace isolation | Crado Docs", h1: "Security and workspace isolation" },
  { path: "/docs/changelog", title: "Changelog | Crado Docs", h1: "Changelog" },
];

const BANNED = ["AI-powered", "leverage", "unlock", "transform", "empower", "revolutionary", "cutting-edge", "game-changing", "seamless"];
const INTERNAL = ["Crado Flux", "Flux Scan", "Jev", "Claude", "Anthropic", "OpenAI", "TypeScript", "finding-peak", "engine-checks", "limit-evaluation", "compare-measurements"];

test.describe("docs specification", () => {
  for (const p of PAGES) {
    test(`${p.path}: title, one h1, JSON-LD date, and copy rules`, async ({ page }) => {
      const res = await page.goto(p.path);
      expect(res?.status()).toBe(200);
      await expect(page).toHaveTitle(p.title);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("h1")).toHaveText(p.h1);
      await expect(page.getByText("Last updated 25 Oct 2026")).toBeVisible();
      const ld = JSON.parse((await page.locator('script[type="application/ld+json"]').first().textContent())!);
      expect(ld["@graph"][0].dateModified).toBe("2026-10-25");
      const text = await page.locator("article").innerText();
      expect(text).not.toContain("—");
      for (const w of [...BANNED, ...INTERNAL]) expect(text, w).not.toContain(w);
      expect(text).not.toMatch(/third-party AI|compliance statement|15\.109\(c\)/i);
      // Every id on the page is unique.
      const ids = await page.locator("[id]").evaluateAll((els) => els.map((e) => e.id));
      expect(new Set(ids).size, "duplicate ids").toBe(ids.length);
    });
  }

  test("/docs overview has every anchor the homepage footer links to", async ({ page }) => {
    await page.goto("/docs");
    for (const id of ["epistemic-model", "observed", "known", "inferred", "missing", "deterministic-arithmetic", "coverage", "validation", "security"]) {
      await expect(page.locator(`[id="${id}"]`), id).toHaveCount(1);
    }
    for (const t of TRUTH_STATES) await expect(page.locator(`#${t.overviewId}`)).toContainText(t.definition);
    await expect(page.locator("article")).toContainText(TEST_COUNT);
    await expect(page.locator("article")).toContainText(BENCHMARK);
  });

  test("/docs/reference: the 15.109 limit tables, Class A status from capability-status.ts, and refusals", async ({ page }) => {
    await page.goto("/docs/reference");
    const table = page.getByRole("region", { name: "47 CFR 15.109 radiated emission limits" });
    for (const r of LIMITS_15_109) {
      const row = table.locator("tr", { hasText: r.band });
      await expect(row).toContainText(r.classB);
      await expect(row).toContainText(r.classA);
    }
    await expect(page.locator("p", { hasText: "Class A at 10 m is listed" })).toContainText(statusOf("fcc15109b"));
    await expect(page.getByRole("region", { name: "Refusal rules" })).toContainText(statusOf("detectorConversion"));
  });

  test("/docs/evaluation states the verified figures", async ({ page }) => {
    await page.goto("/docs/evaluation");
    await expect(page.locator("article")).toContainText(TEST_COUNT);
    await expect(page.locator("article")).toContainText(BENCHMARK);
  });

  test("sitemap still lists the same docs URLs", async ({ request }) => {
    const xml = await (await request.get("/sitemap.xml")).text();
    for (const p of PAGES) expect(xml).toContain(`<loc>https://www.crado.io${p.path}</loc>`);
  });
});
