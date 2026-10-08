import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

for (const path of ["/", "/docs", "/docs/concepts", "/no-such-page"]) {
  test(`axe finds no WCAG A/AA violations on ${path}`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(path);
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
    const summary = results.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).slice(0, 5).join(", ")}`);
    expect(summary).toEqual([]);
  });
}

test("axe finds no violations in the open waitlist dialog", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("navigation", { name: "Main" }).getByRole("button", { name: "Join early access" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  const results = await new AxeBuilder({ page }).include('[role="dialog"]').analyze();
  expect(results.violations.map((v) => v.id)).toEqual([]);
});

test("every page has one h1, landmarks and a skip link", async ({ page }) => {
  for (const path of ["/", "/docs", "/docs/trust", "/privacy", "/no-such-page"]) {
    await page.goto(path);
    await expect(page.locator("h1"), path).toHaveCount(1);
    await expect(page.locator("main#main"), path).toHaveCount(1);
    const skip = page.getByRole("link", { name: "Skip to content" });
    await expect(skip, path).toHaveAttribute("href", "#main");
  }
});
