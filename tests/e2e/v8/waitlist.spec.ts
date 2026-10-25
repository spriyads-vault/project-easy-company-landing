import { expect, test, type Page } from "@playwright/test";
import { FORM, HERO, START } from "../../../src/content/home-v8";
import { BOOKING_URL } from "../../../src/lib/site";
import { MARKET_OPTIONS, NEXT_TEST_WINDOW_OPTIONS, PRODUCT_TYPE_OPTIONS, ROLE_OPTIONS, WAITLIST_ERRORS } from "../../../src/lib/waitlist/schema";
import { STEP2_TOKEN, humanPause, mockWaitlistApi } from "../helpers";

// The v8 waitlist with the API mocked: nothing here reaches Supabase. Same endpoints, bodies and protections as the
// existing forms.

const ROLE = ROLE_OPTIONS[1];

function form(page: Page) {
  return page.getByRole("form", { name: FORM.submit });
}

async function fillStep1(page: Page, email = "eng@acme.io") {
  await form(page).getByLabel(FORM.emailLabel).fill(email);
  await form(page).getByLabel(FORM.roleLabel).selectOption(ROLE.value);
}

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
});

test("every waitlist call to action lands on the form and focuses the email field", async ({ page }) => {
  await page.goto("/");
  const joins = page.locator('a[href="#get-started"]');
  // The header's "Start a workspace" and the hero's primary call to action.
  expect(await joins.count()).toBeGreaterThanOrEqual(2);
  await page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Start a workspace" }).click();
  await expect(page).toHaveURL(/#get-started$/);
  await expect(form(page).getByLabel(FORM.emailLabel)).toBeFocused();
  await page.goto("/");
  await page.locator("#hero").getByRole("link", { name: HERO.primary }).click();
  await expect(form(page).getByLabel(FORM.emailLabel)).toBeFocused();
});

test("step 1 fields, existing roles and the existing consent text", async ({ page }) => {
  await page.goto("/");
  const f = form(page);
  const role = f.getByLabel(FORM.roleLabel);
  expect(await role.locator("option:not([disabled])").allTextContents()).toEqual(ROLE_OPTIONS.map((o) => o.label));
  await expect(f.getByLabel(FORM.updates)).not.toBeChecked();
  await expect(f).toContainText("We'll use your details to contact you about Crado early access. See our Privacy policy.");
  await expect(f.getByRole("link", { name: "Privacy policy" })).toHaveAttribute("href", "/privacy");
  await expect(f.getByRole("link", { name: /30-minute walkthrough/ })).toHaveAttribute("href", BOOKING_URL);
  await expect(f.getByRole("link", { name: START.sample })).toHaveAttribute("href", "#sample-case");
  const button = f.getByRole("button", { name: FORM.submit });
  await expect(button).toBeDisabled();
  await f.getByLabel(FORM.emailLabel).fill("eng@acme.io");
  await expect(button).toBeDisabled();
  await role.selectOption(ROLE.value);
  await expect(button).toBeEnabled();
});

test("completes step 1 and step 2 against the mocked API, with the existing request bodies", async ({ page }) => {
  const calls = await mockWaitlistApi(page);
  await page.goto("/");
  await page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Start a workspace" }).click();
  await fillStep1(page);
  await form(page).getByLabel(FORM.updates).check();
  await humanPause(page);
  await form(page).getByRole("button", { name: FORM.submit }).click();

  await expect(page.getByRole("heading", { name: FORM.step2Title })).toBeFocused();
  expect(calls.step1).toHaveLength(1);
  const body1 = calls.step1[0].postDataJSON();
  expect(body1).toMatchObject({ email: "eng@acme.io", role: ROLE.value, marketing_opt_in: true, source: "nav", website: "" });
  expect(typeof body1.form_opened_at).toBe("number");
  expect(Object.keys(body1).sort()).toEqual(["email", "form_opened_at", "marketing_opt_in", "referrer", "role", "source", "utm_campaign", "utm_medium", "utm_source", "website"]);

  await page.getByRole("button", { name: PRODUCT_TYPE_OPTIONS[0].label }).click();
  await page.getByRole("button", { name: MARKET_OPTIONS[0].label }).click();
  await page.getByRole("button", { name: MARKET_OPTIONS[1].label }).click();
  await page.getByLabel("Next compliance test").selectOption(NEXT_TEST_WINDOW_OPTIONS[0].value);
  await page.getByRole("button", { name: FORM.step2Save }).click();

  await expect(page.getByRole("heading", { name: FORM.doneTitle })).toBeFocused();
  expect(calls.step2).toHaveLength(1);
  expect(calls.step2[0].postDataJSON()).toEqual({
    step2_token: STEP2_TOKEN,
    product_type: PRODUCT_TYPE_OPTIONS[0].value,
    markets: [MARKET_OPTIONS[0].value, MARKET_OPTIONS[1].value],
    next_test_window: NEXT_TEST_WINDOW_OPTIONS[0].value,
  });
  await expect(page.getByRole("link", { name: /Book a 30-minute call/ })).toHaveAttribute("href", BOOKING_URL);
  await expect(page.getByRole("link", { name: /Read the docs/ })).toHaveAttribute("href", "/docs");
});

test("Skip on step 2 goes to the final state without sending answers", async ({ page }) => {
  const calls = await mockWaitlistApi(page);
  await page.goto("/");
  await fillStep1(page);
  await humanPause(page);
  await form(page).getByRole("button", { name: FORM.submit }).click();
  await page.getByRole("button", { name: FORM.step2Skip }).click();
  await expect(page.getByRole("heading", { name: FORM.doneTitle })).toBeVisible();
  expect(calls.step1[0].postDataJSON().source).toBe("final_cta_inline");
  expect(calls.step2).toHaveLength(0);
});

test("invalid email keeps the button disabled; personal email gets the soft hint", async ({ page }) => {
  const calls = await mockWaitlistApi(page);
  await page.goto("/");
  const email = form(page).getByLabel(FORM.emailLabel);
  await email.fill("name@company");
  await email.blur();
  await expect(email).toHaveAttribute("aria-invalid", "true");
  await expect(email).toHaveAccessibleDescription(FORM.emailHelp);
  await email.press("Enter");
  expect(calls.step1).toHaveLength(0);
  await email.fill("someone@gmail.com");
  await expect(email).toHaveAccessibleDescription(FORM.personalHint);
});

test("rate limit and server errors show the existing messages", async ({ page }) => {
  await mockWaitlistApi(page, { step1Status: 429, step1Body: { ok: false, error: WAITLIST_ERRORS.rateLimited } });
  await page.goto("/");
  await fillStep1(page);
  await humanPause(page);
  await form(page).getByRole("button", { name: FORM.submit }).click();
  await expect(form(page).getByText(WAITLIST_ERRORS.rateLimited)).toBeVisible();
});

test("the honeypot is hidden from people and assistive tech", async ({ page }) => {
  await page.goto("/");
  const trap = form(page).locator('input[name="website"]');
  await expect(trap).toHaveCount(1);
  await expect(trap).toHaveAttribute("tabindex", "-1");
  expect(await trap.evaluate((el) => !!el.closest('[aria-hidden="true"]'))).toBe(true);
  const box = await trap.boundingBox();
  expect(box === null || box.x < 0).toBe(true);
});
