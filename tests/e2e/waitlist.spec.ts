import { expect, test } from "@playwright/test";
import { STEP2_TOKEN, humanPause, mockWaitlistApi } from "./helpers";

test.describe("waitlist modal", () => {
  test("opens from the nav and completes step 1 then step 2", async ({ page }) => {
    const calls = await mockWaitlistApi(page);
    await page.goto("/");
    await page.getByRole("navigation", { name: "Main" }).getByRole("button", { name: "Join early access" }).click();

    await expect(page.getByRole("dialog", { name: "Join early access" })).toBeVisible();
    // The dialog's name follows the current step's heading, so keep an unnamed locator for the rest.
    const dialog = page.getByRole("dialog");
    await dialog.getByLabel("Work email").fill("Priya@SenseHub.io");
    await dialog.getByLabel("Role").selectOption({ label: "EMC or RF engineer" });
    await dialog.getByText("Send me occasional product updates.").click();
    await humanPause(page);
    await dialog.getByRole("button", { name: "Join early access" }).click();

    await expect(page.getByRole("dialog", { name: "Help us shape your pilot" })).toBeVisible();
    await expect(dialog.locator("form").getByText("You're on the list.")).toBeVisible();
    const sent = calls.step1[0].postDataJSON();
    expect(sent).toMatchObject({ email: "Priya@SenseHub.io", role: "emc_rf_engineer", marketing_opt_in: true, source: "nav", website: "" });
    expect(typeof sent.form_opened_at).toBe("number");

    await dialog.getByRole("button", { name: "Connected device" }).click();
    await dialog.getByRole("button", { name: "FCC (US)" }).click();
    await dialog.getByRole("button", { name: "CE / UKCA (EU, UK)" }).click();
    await expect(dialog.getByRole("button", { name: "FCC (US)" })).toHaveAttribute("aria-pressed", "true");
    await dialog.getByLabel("Next compliance test").selectOption({ label: "3–6 months" });
    await dialog.getByRole("button", { name: "Submit" }).click();

    await expect(dialog.getByRole("heading", { name: "Thanks. We'll be in touch from hello@crado.io." })).toBeVisible();
    expect(calls.step2[0].postDataJSON()).toEqual({
      step2_token: STEP2_TOKEN,
      product_type: "connected_device",
      markets: ["fcc_us", "ce_ukca"],
      next_test_window: "3_6_months",
    });

    const call = dialog.getByRole("link", { name: /Book a 30-minute call/ });
    await expect(call).toHaveAttribute("href", "https://cal.com/crado-a7dbr4/30min");
    await expect(call).toHaveAttribute("target", "_blank");
    await expect(call).toHaveAttribute("rel", "noopener");
    const [popup] = await Promise.all([page.waitForEvent("popup"), call.click()]);
    expect(popup.url()).toContain("cal.com/crado-a7dbr4/30min");
    await popup.close();
  });

  test("Skip on step 2 goes to the final state without sending answers", async ({ page }) => {
    const calls = await mockWaitlistApi(page);
    await page.goto("/");
    await page.getByRole("button", { name: "Join early access" }).first().click();
    const dialog = page.getByRole("dialog");
    await dialog.getByLabel("Work email").fill("lee@sensehub.io");
    await dialog.getByLabel("Role").selectOption("hardware_engineer");
    await humanPause(page);
    await dialog.getByRole("button", { name: "Join early access" }).click();
    await dialog.getByRole("button", { name: "Skip" }).click();
    await expect(dialog.getByRole("heading", { name: /We'll be in touch/ })).toBeVisible();
    expect(calls.step2).toHaveLength(0);
  });

  test("shows the design's validation messages and the personal email hint", async ({ page }) => {
    const calls = await mockWaitlistApi(page);
    await page.goto("/");
    await page.getByRole("navigation", { name: "Main" }).getByRole("button", { name: "Join early access" }).click();
    const dialog = page.getByRole("dialog");

    await dialog.getByRole("button", { name: "Join early access" }).click();
    await expect(dialog.getByText("Enter your work email.")).toBeVisible();
    await expect(dialog.getByText("Select your role.")).toBeVisible();
    await expect(dialog.getByLabel("Work email")).toHaveAttribute("aria-invalid", "true");
    await expect(dialog.getByLabel("Work email")).toBeFocused();

    await dialog.getByLabel("Work email").fill("priya@sensehub");
    await dialog.getByRole("button", { name: "Join early access" }).click();
    await expect(dialog.getByText("Enter a valid email address, like you@company.com.")).toBeVisible();

    await dialog.getByLabel("Work email").fill("priya@gmail.com");
    await expect(dialog.getByText("A work email helps us match you to the right pilot.")).toBeVisible();
    expect(calls.step1).toHaveLength(0);
  });

  test("shows a friendly message when the server rate limits", async ({ page }) => {
    await mockWaitlistApi(page, {
      step1Status: 429,
      step1Body: { ok: false, error: "Too many attempts from this network. Please try again in an hour." },
    });
    await page.goto("/");
    await page.getByRole("navigation", { name: "Main" }).getByRole("button", { name: "Join early access" }).click();
    const dialog = page.getByRole("dialog");
    await dialog.getByLabel("Work email").fill("priya@sensehub.io");
    await dialog.getByLabel("Role").selectOption("other");
    await humanPause(page);
    await dialog.getByRole("button", { name: "Join early access" }).click();
    await expect(dialog.getByRole("alert")).toContainText("Too many attempts");
    await expect(dialog.getByRole("heading", { name: "Join early access" })).toBeVisible();
  });

  test("keyboard only: open, trap focus, Escape closes and focus returns", async ({ page }) => {
    await mockWaitlistApi(page);
    await page.goto("/");
    const trigger = page.getByRole("navigation", { name: "Main" }).getByRole("button", { name: "Join early access" });
    await trigger.focus();
    await page.keyboard.press("Enter");

    const dialog = page.getByRole("dialog");
    const email = dialog.getByLabel("Work email");
    await expect(email).toBeFocused();

    // Tab around the whole panel: focus never leaves the dialog.
    for (let i = 0; i < 10; i++) {
      await page.keyboard.press("Tab");
      expect(await dialog.evaluate((el) => el.contains(document.activeElement))).toBe(true);
    }
    for (let i = 0; i < 4; i++) {
      await page.keyboard.press("Shift+Tab");
      expect(await dialog.evaluate((el) => el.contains(document.activeElement))).toBe(true);
    }

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(trigger).toBeFocused();
  });

  test("keyboard only: complete step 1 with Enter", async ({ page }) => {
    const calls = await mockWaitlistApi(page);
    await page.goto("/");
    await page.getByRole("navigation", { name: "Main" }).getByRole("button", { name: "Join early access" }).focus();
    await page.keyboard.press("Enter");
    await expect(page.getByRole("dialog").getByLabel("Work email")).toBeFocused();
    await page.keyboard.type("priya@sensehub.io");
    await page.keyboard.press("Tab");
    await expect(page.getByRole("dialog").getByLabel("Role")).toBeFocused();
    // Typing on a focused select picks the matching option on every platform.
    await page.keyboard.type("EMC");
    await expect(page.getByRole("dialog").getByLabel("Role")).toHaveValue("emc_rf_engineer");
    await humanPause(page);
    await page.keyboard.press("Enter");
    await expect(page.getByRole("dialog", { name: "Help us shape your pilot" })).toBeVisible();
    expect(calls.step1).toHaveLength(1);
  });

  test("closing keeps entered details", async ({ page }) => {
    await mockWaitlistApi(page);
    await page.goto("/");
    const trigger = page.getByRole("navigation", { name: "Main" }).getByRole("button", { name: "Join early access" });
    await trigger.click();
    const dialog = page.getByRole("dialog");
    await dialog.getByLabel("Work email").fill("priya@sensehub.io");
    await dialog.getByRole("button", { name: "Close" }).click();
    await trigger.click();
    await expect(dialog.getByLabel("Work email")).toHaveValue("priya@sensehub.io");
  });

  test("hero and section buttons record their source", async ({ page }) => {
    const calls = await mockWaitlistApi(page);
    await page.goto("/");
    await page.locator('[data-waitlist-source="hero"]').first().click();
    const dialog = page.getByRole("dialog");
    await dialog.getByLabel("Work email").fill("priya@sensehub.io");
    await dialog.getByLabel("Role").selectOption("other");
    await humanPause(page);
    await dialog.getByRole("button", { name: "Join early access" }).click();
    await expect(dialog.locator("form").getByText("You're on the list.")).toBeVisible();
    expect(calls.step1[0].postDataJSON().source).toBe("hero");
  });
});

test.describe("inline waitlist", () => {
  test("completes both steps inside the final CTA section", async ({ page }) => {
    const calls = await mockWaitlistApi(page);
    await page.goto("/");
    const card = page.locator("[data-waitlist-inline]");
    await card.scrollIntoViewIfNeeded();
    await expect(card.getByRole("heading", { name: "Join early access" })).toBeVisible();

    await card.getByLabel("Work email").fill("priya@sensehub.io");
    await card.getByLabel("Role").selectOption({ label: "Compliance / regulatory" });
    await humanPause(page);
    await card.getByRole("button", { name: "Join early access" }).click();

    await expect(card.getByRole("heading", { name: "Help us shape your pilot" })).toBeFocused();
    expect(calls.step1[0].postDataJSON().source).toBe("final_cta_inline");
    await expect(page.getByRole("dialog")).toHaveCount(0);

    await card.getByRole("button", { name: "Industrial equipment" }).click();
    await card.getByRole("button", { name: "Submit" }).click();
    await expect(card.getByRole("heading", { name: /We'll be in touch/ })).toBeVisible();
    expect(calls.step2[0].postDataJSON()).toMatchObject({ product_type: "industrial_equipment", markets: [], next_test_window: null });
    await expect(card.getByRole("link", { name: /Book a 30-minute call/ })).toHaveAttribute("target", "_blank");
  });

  test("validation errors show inline", async ({ page }) => {
    await mockWaitlistApi(page);
    await page.goto("/");
    const card = page.locator("[data-waitlist-inline]");
    await card.getByRole("button", { name: "Join early access" }).click();
    await expect(card.getByText("Enter your work email.")).toBeVisible();
    await expect(card.getByText("Select your role.")).toBeVisible();
  });
});

test("the honeypot field is hidden from people and assistive tech", async ({ page }) => {
  await page.goto("/");
  const honeypot = page.locator("[data-waitlist-inline] input[name=website]");
  await expect(honeypot).toHaveAttribute("tabindex", "-1");
  await expect(page.locator("[data-waitlist-inline] [aria-hidden=true]:has(input[name=website])")).toHaveCount(1);
});
