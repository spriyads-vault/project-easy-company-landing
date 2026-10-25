import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";
import { FORM } from "../../../src/content/home-v8";
import { ROLE_OPTIONS } from "../../../src/lib/waitlist/schema";
import { humanPause, mockWaitlistApi } from "../helpers";

// axe on the v8 homepage: WCAG 2.1 A/AA plus best practices, at three widths and in each waitlist state.

async function scan(page: Page) {
  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "best-practice"]).analyze();
  return results.violations.map((v) => `${v.impact} ${v.id}: ${v.nodes.map((n) => n.target.join(" ")).slice(0, 5).join(", ")}`);
}

for (const width of [1440, 834, 390]) {
  test(`axe finds no violations at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    expect(await scan(page)).toEqual([]);
  });
}

test("axe: waitlist error, step 2 and final states", async ({ page }) => {
  await mockWaitlistApi(page);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const f = page.getByRole("form", { name: FORM.submit });
  await f.getByLabel(FORM.emailLabel).fill("name@company");
  await f.getByLabel(FORM.emailLabel).blur();
  expect(await scan(page)).toEqual([]);
  await f.getByLabel(FORM.emailLabel).fill("eng@acme.io");
  await f.getByLabel(FORM.roleLabel).selectOption(ROLE_OPTIONS[0].value);
  await humanPause(page);
  await f.getByRole("button", { name: FORM.submit }).click();
  await expect(page.getByRole("heading", { name: FORM.step2Title })).toBeVisible();
  expect(await scan(page)).toEqual([]);
  await page.getByRole("button", { name: FORM.step2Skip }).click();
  await expect(page.getByRole("heading", { name: FORM.doneTitle })).toBeVisible();
  expect(await scan(page)).toEqual([]);
});
