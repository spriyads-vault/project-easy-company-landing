import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";
import { ROLE_OPTIONS } from "../../../src/lib/waitlist/schema";
import { humanPause, mockWaitlistApi } from "../helpers";

// axe on the v6 homepage: WCAG 2.1 A/AA plus best practices, in each state the page can be in.

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

test("axe: every FAQ answer open, and the mobile menu open", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  for (const b of await page.locator("#faq h3 button").all()) if ((await b.getAttribute("aria-expanded")) === "false") await b.click();
  expect(await scan(page)).toEqual([]);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "Open menu" }).click();
  expect(await scan(page)).toEqual([]);
});

test("axe: waitlist error, hint, success and step 2 states", async ({ page }) => {
  await mockWaitlistApi(page);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#waitlist");
  const form = page.getByRole("form", { name: "Join the waitlist" });
  await form.getByLabel("Work email").fill("name@company");
  await form.getByLabel("Work email").blur();
  expect(await scan(page)).toEqual([]);
  await form.getByLabel("Work email").fill("someone@gmail.com");
  await form.getByLabel("Your role").selectOption(ROLE_OPTIONS[0].value);
  expect(await scan(page)).toEqual([]);
  await humanPause(page);
  await form.getByRole("button", { name: "Join the waitlist" }).click();
  await page.getByRole("link", { name: "Tell us about your product (optional)" }).click();
  expect(await scan(page)).toEqual([]);
});
