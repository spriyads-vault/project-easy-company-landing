import { expect, test } from "@playwright/test";

const PAGES = [
  { path: "/docs", title: "Introduction | Crado Docs", h1: "Introduction", crumb: "Docs" },
  { path: "/docs/concepts", title: "Concepts | Crado Docs", h1: "Products and revisions", crumb: "Concepts" },
  { path: "/docs/evaluation", title: "Evaluation | Crado Docs", h1: "Report confirmation", crumb: "Evaluation" },
  { path: "/docs/reference", title: "Reference | Crado Docs", h1: "Regulatory coverage", crumb: "Reference" },
  { path: "/docs/trust", title: "Trust | Crado Docs", h1: "Workspace access", crumb: "Trust" },
  { path: "/docs/changelog", title: "Changelog | Crado Docs", h1: "Changelog", crumb: "Changelog" },
];

test.describe("docs", () => {
  for (const p of PAGES) {
    test(`${p.path} renders its title, h1, JSON-LD and Last updated`, async ({ page }) => {
      await page.goto(p.path);
      await expect(page).toHaveTitle(p.title);
      await expect(page.locator("h1")).toHaveText(p.h1);
      await expect(page.locator('meta[property="og:type"]')).toHaveAttribute("content", "article");
      await expect(page.getByText("Last updated 8 Oct 2026")).toBeVisible();

      const ld = JSON.parse((await page.locator('script[type="application/ld+json"]').first().textContent())!);
      const types = ld["@graph"].map((n: { "@type": string }) => n["@type"]);
      expect(types).toEqual(["TechArticle", "BreadcrumbList"]);
      const article = ld["@graph"][0];
      expect(article.headline).toBe(p.h1);
      expect(article.dateModified).toBe("2026-10-08");
      expect(article.url).toBe(`https://www.crado.io${p.path}`);
    });
  }

  test("Prev/Next walks every page in order", async ({ page }) => {
    await page.goto("/docs");
    const pager = page.getByRole("navigation", { name: "Previous and next pages" });
    for (const next of PAGES.slice(1)) {
      await pager.getByRole("link", { name: /NEXT/ }).click();
      await expect(page).toHaveURL(new RegExp(`${next.path}$`));
      await expect(page.locator("h1")).toHaveText(next.h1);
    }
    await expect(pager.getByRole("link", { name: /NEXT/ })).toHaveCount(0);
    await pager.getByRole("link", { name: /PREVIOUS/ }).click();
    await expect(page).toHaveURL(/\/docs\/trust$/);
  });

  test("sidebar links move between pages and search filters them", async ({ page }) => {
    await page.goto("/docs");
    const sidebar = page.getByRole("complementary", { name: "Documentation" });
    await sidebar.getByRole("link", { name: "Glossary" }).click();
    await expect(page).toHaveURL(/\/docs\/reference#glossary$/);
    await expect(page.locator("#glossary")).toBeInViewport();

    const search = sidebar.getByRole("searchbox", { name: "Search documentation" });
    await search.fill("evidence");
    await expect(sidebar.getByRole("link", { name: "Evidence and provenance" })).toBeVisible();
    await expect(sidebar.getByRole("link", { name: "Glossary" })).toHaveCount(0);
    await search.fill("zzzz");
    await expect(sidebar.getByText("No matching pages")).toBeVisible();
  });

  test("Cmd/Ctrl+K focuses the search", async ({ page }) => {
    await page.goto("/docs");
    const search = page.getByRole("complementary", { name: "Documentation" }).getByRole("searchbox");
    // The shortcut listener is attached after hydration, which can land after page.goto resolves when the machine is
    // busy. Retry the press until it is live (SCRUM-298).
    await expect(async () => {
      await page.keyboard.press("ControlOrMeta+k");
      await expect(search).toBeFocused({ timeout: 500 });
    }).toPass({ timeout: 10_000 });
  });

  test("on this page rail follows the scroll position", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/docs");
    const rail = page.getByRole("complementary", { name: "On this page" });
    await expect(rail).toBeVisible();
    await page.locator("#scope").scrollIntoViewIfNeeded();
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await expect(rail.locator('[aria-current="true"], [aria-current="location"]').last()).toContainText(/scope/i);
  });

  test("mobile contents drawer opens, traps focus, closes with Escape", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/docs/concepts");
    const button = page.getByRole("button", { name: /Contents/ });
    await button.click();
    const drawer = page.getByRole("dialog", { name: "Contents" });
    await expect(drawer).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(drawer).toBeHidden();
    await expect(button).toBeFocused();

    await button.click();
    await drawer.getByRole("link", { name: "Changelog" }).click();
    await expect(page).toHaveURL(/\/docs\/changelog/);
    await expect(drawer).toBeHidden();
  });

  test("Trust copy is carried over verbatim", async ({ page }) => {
    await page.goto("/docs/trust");
    await expect(
      page.getByText(
        "Each customer works in an isolated workspace. Uploaded sources, revision records and outputs are scoped to that workspace. Access for pilot participants is arranged during pilot scoping.",
      ),
    ).toBeVisible();
    await expect(page.getByRole("heading", { name: "Data handling" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Security status" })).toBeVisible();
  });

  test("docs content no longer mentions email or Slack filing", async ({ page }) => {
    for (const p of PAGES) {
      await page.goto(p.path);
      const article = await page.locator("main article, main").first().innerText();
      expect(article, p.path).not.toMatch(/\bSlack\b|email thread/i);
    }
  });

  test("header Join early access in docs records the docs source", async ({ page }) => {
    await page.goto("/docs");
    await expect(page.getByRole("navigation", { name: "Main" }).locator('[data-waitlist-source="docs"]')).toBeVisible();
  });
});
