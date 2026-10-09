import { expect, test, type Page } from "@playwright/test";
import { ROLE_OPTIONS, WAITLIST_ERRORS } from "../../../src/lib/waitlist/schema";
import { STEP2_TOKEN, humanPause, mockWaitlistApi } from "../helpers";

// The v6 waitlist form with the API mocked: nothing here reaches Supabase.

const ROLE = ROLE_OPTIONS[1];

async function openForm(page: Page) {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#waitlist");
  const form = page.getByRole("form", { name: "Join the waitlist" });
  await expect(form).toBeVisible();
  return form;
}

async function fill(page: Page, email = "eng@acme.io") {
  const form = page.getByRole("form", { name: "Join the waitlist" });
  await form.getByLabel("Work email").fill(email);
  await form.getByLabel("Your role").selectOption(ROLE.value);
  return form;
}

test("fields gate each other: role waits for a valid email, the button for a role", async ({ page }) => {
  await mockWaitlistApi(page);
  const form = await openForm(page);
  const email = form.getByLabel("Work email");
  const role = form.getByLabel("Your role");
  const button = form.getByRole("button", { name: "Join the waitlist" });
  await expect(role).toBeDisabled();
  await expect(role).toHaveAccessibleDescription("Enter your email first");
  await expect(button).toBeDisabled();
  // Live role list (src/lib/waitlist/schema.ts).
  expect(await role.locator("option:not([disabled])").allTextContents()).toEqual(ROLE_OPTIONS.map((o) => o.label));
  await email.fill("eng@acme.io");
  await expect(role).toBeEnabled();
  await expect(button).toBeDisabled();
  await role.selectOption(ROLE.value);
  await expect(button).toBeEnabled();
  await expect(form.getByLabel("Send me occasional product updates.")).not.toBeChecked();
  await expect(form).toContainText("We'll use your details to contact you about Crado early access. See our Privacy policy.");
  await expect(form.getByRole("link", { name: "Privacy policy" })).toHaveAttribute("href", "/privacy");
});

test("invalid email: error after blur, aria-invalid, button stays disabled", async ({ page }) => {
  const calls = await mockWaitlistApi(page);
  const form = await openForm(page);
  const email = form.getByLabel("Work email");
  await email.fill("name@company");
  await expect(form.getByText("Enter a valid email address.")).toBeHidden();
  await email.blur();
  await expect(form.getByText("Enter a valid email address.")).toBeVisible();
  await expect(email).toHaveAttribute("aria-invalid", "true");
  await expect(email).toHaveAccessibleDescription("Enter a valid email address.");
  await expect(form.getByRole("button", { name: "Join the waitlist" })).toBeDisabled();
  await email.press("Enter");
  expect(calls.step1).toHaveLength(0);
});

test("personal address: soft hint that does not block", async ({ page }) => {
  await mockWaitlistApi(page);
  const form = await openForm(page);
  await form.getByLabel("Work email").fill("someone@gmail.com");
  await expect(form.getByText("A work email helps us prioritise engineering teams.")).toBeVisible();
  await form.getByLabel("Your role").selectOption(ROLE.value);
  await expect(form.getByRole("button", { name: "Join the waitlist" })).toBeEnabled();
});

test("success: the existing API body, the success panel, cal.com and the optional step 2", async ({ page }) => {
  const calls = await mockWaitlistApi(page);
  await openForm(page);
  await humanPause(page);
  const form = await fill(page);
  await form.getByLabel("Send me occasional product updates.").check();
  await form.getByRole("button", { name: "Join the waitlist" }).click();

  const status = page.getByRole("status").filter({ hasText: "You're on the list." });
  await expect(status).toBeVisible();
  await expect(page.getByRole("heading", { name: "You're on the list." })).toBeFocused();
  await expect(page.getByRole("form", { name: "Join the waitlist" })).toHaveCount(0);
  expect(calls.step1).toHaveLength(1);
  const body = calls.step1[0].postDataJSON();
  expect(body).toMatchObject({ email: "eng@acme.io", role: ROLE.value, marketing_opt_in: true, source: "final_cta_inline", website: "" });
  expect(Date.now() - body.form_opened_at).toBeGreaterThanOrEqual(2000);
  expect(Object.keys(body).sort()).toEqual(
    ["email", "form_opened_at", "marketing_opt_in", "referrer", "role", "source", "utm_campaign", "utm_medium", "utm_source", "website"].sort(),
  );

  const book = page.locator("#waitlist").getByRole("link", { name: /Book a case review/ });
  await expect(book).toHaveAttribute("href", "https://cal.com/crado-a7dbr4/30min");
  await expect(book).toHaveAttribute("target", "_blank");

  await page.getByRole("link", { name: "Tell us about your product (optional)" }).click();
  await expect(page.getByRole("heading", { name: "Help us shape your pilot" })).toBeFocused();
  await page.getByRole("button", { name: "Connected device" }).click();
  await page.getByRole("button", { name: "FCC (US)" }).click();
  await page.getByLabel("Next compliance test").selectOption("lt_3_months");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("Thanks. Your details are saved.")).toBeVisible();
  expect(calls.step2).toHaveLength(1);
  expect(calls.step2[0].postDataJSON()).toEqual({ step2_token: STEP2_TOKEN, product_type: "connected_device", markets: ["fcc_us"], next_test_window: "lt_3_months" });
});

test("step 2 with nothing chosen sends nothing", async ({ page }) => {
  const calls = await mockWaitlistApi(page);
  await openForm(page);
  await humanPause(page);
  await (await fill(page)).getByRole("button", { name: "Join the waitlist" }).click();
  await page.getByRole("link", { name: "Tell us about your product (optional)" }).click();
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByRole("heading", { name: "Help us shape your pilot" })).toHaveCount(0);
  expect(calls.step2).toHaveLength(0);
});

test("rate limit keeps the form and shows the design's message", async ({ page }) => {
  await mockWaitlistApi(page, { step1Status: 429, step1Body: { ok: false, error: WAITLIST_ERRORS.rateLimited } });
  await openForm(page);
  await humanPause(page);
  await (await fill(page)).getByRole("button", { name: "Join the waitlist" }).click();
  await expect(page.getByRole("status")).toContainText("Too many attempts from this network. Try again in an hour.");
  await expect(page.getByRole("form", { name: "Join the waitlist" })).toBeVisible();
});

test("server error offers email", async ({ page }) => {
  await mockWaitlistApi(page, { step1Status: 500, step1Body: { ok: false, error: WAITLIST_ERRORS.generic } });
  await openForm(page);
  await humanPause(page);
  await (await fill(page)).getByRole("button", { name: "Join the waitlist" }).click();
  await expect(page.getByRole("status")).toContainText("Something went wrong. Try again, or email us.");
  await expect(page.getByRole("status").getByRole("link", { name: "email us" })).toHaveAttribute("href", "mailto:hello@crado.io");
});

test("server validation message is shown (invalid email from the API)", async ({ page }) => {
  await mockWaitlistApi(page, {
    step1Status: 400,
    step1Body: { ok: false, error: "Enter a valid email address, like you@company.com.", fieldErrors: { email: "Enter a valid email address, like you@company.com." } },
  });
  await openForm(page);
  await humanPause(page);
  await (await fill(page)).getByRole("button", { name: "Join the waitlist" }).click();
  await expect(page.getByRole("status")).toContainText("Enter a valid email address, like you@company.com.");
});

test("keyboard order: email, role, checkbox, button", async ({ page }) => {
  await mockWaitlistApi(page);
  const form = await openForm(page);
  const email = form.getByLabel("Work email");
  await email.fill("eng@acme.io");
  await email.focus();
  await page.keyboard.press("Tab");
  await expect(form.getByLabel("Your role")).toBeFocused();
  await form.getByLabel("Your role").selectOption(ROLE.value);
  await page.keyboard.press("Tab");
  await expect(form.getByLabel("Send me occasional product updates.")).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(form.getByRole("button", { name: "Join the waitlist" })).toBeFocused();
});
