import { expect, test } from "@playwright/test";

test.describe("Crado landing page", () => {
  test("loads successfully", async ({ page }) => {
    const response = await page.goto("/");
    expect(response?.status()).toBe(200);
    await expect(page).toHaveTitle(/Crado — Deterministic Hardware Compliance Engine/);
    await expect(
      page.getByRole("heading", { level: 1, name: "Hardware compliance in engineering loops." }),
    ).toBeVisible();
    await expect(page.getByRole("img", { name: /Crado - Enterprise Hardware/ })).toBeVisible();
  });

  for (const { label, id } of [
    { label: "Architecture", id: "architecture" },
    { label: "Pipeline", id: "pipeline" },
    { label: "Specifications", id: "specifications" },
  ]) {
    test(`nav link "${label}" scrolls to #${id}`, async ({ page }) => {
      await page.goto("/");
      const nav = page.getByRole("navigation", { name: "Primary Navigation" });
      await nav.getByRole("link", { name: label }).click();

      await expect(page).toHaveURL(new RegExp(`#${id}$`));
      await expect(page.locator(`#${id}`)).toBeInViewport();
      await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(0);
    });
  }

  test("#faq anchor scrolls to the FAQ section and the accordion toggles", async ({ page }) => {
    await page.goto("/#faq");
    await expect(page.locator("#faq")).toBeInViewport();

    const first = page.getByRole("button", { name: /How does deterministic mapping work\?/ });
    const second = page.getByRole("button", { name: /Is Crado SOC2 Compliant\?/ });
    await expect(first).toHaveAttribute("aria-expanded", "true");

    await second.click();
    await expect(second).toHaveAttribute("aria-expanded", "true");
    await expect(first).toHaveAttribute("aria-expanded", "false");
    await expect(page.getByText(/security documentation and audit status/)).toBeVisible();
  });

  for (const { where, scope } of [
    { where: "header", scope: "header" },
    { where: "hero", scope: "main" },
  ]) {
    test(`"Book a pilot" in the ${where} opens the Cal.com modal`, async ({ page }) => {
      await page.goto("/");
      // Visible label is "Book a pilot"; the accessible name comes from aria-label.
      const cta = page
        .locator(scope)
        .getByRole("button", { name: "Book a compliance pilot scoping call" });
      await expect(cta).toContainText("Book a pilot");
      await expect(cta).toHaveAttribute("data-cal-link", "crado-a7dbr4/30min");
      await expect(cta).toHaveAttribute("data-cal-namespace", "crado");

      // Cal's embed.js is fetched from app.cal.com after hydration; its click
      // handler only exists once that script has run.
      await page.waitForFunction(() => {
        const cal = (window as unknown as { Cal?: { loaded?: boolean; ns?: Record<string, unknown> } })
          .Cal;
        return !!cal?.loaded && !!cal.ns?.crado;
      });

      const modal = page.locator("cal-modal-box");
      await expect(async () => {
        if ((await modal.count()) === 0) await cta.click();
        await expect(modal.first()).toBeAttached({ timeout: 2_000 });
      }).toPass({ timeout: 30_000 });

      // The <cal-modal-box> host has no box of its own; its shadow root holds the
      // visible dialog and the booking iframe.
      await expect(modal.first()).toHaveAttribute("state", "loaded", { timeout: 20_000 });
      const iframe = modal.first().locator("iframe");
      await expect(iframe).toBeVisible();
      await expect(iframe).toHaveAttribute("src", /cal\.com\/crado-a7dbr4\/30min/);
    });
  }
});

test.describe("Legal pages", () => {
  for (const { link, path, title } of [
    { link: "Privacy", path: "/privacy", title: "Privacy Policy" },
    { link: "Terms", path: "/terms", title: "Terms and Conditions" },
  ]) {
    test(`footer "${link}" link opens ${path}`, async ({ page }) => {
      await page.goto("/");
      await page.locator("footer").getByRole("link", { name: link }).click();
      await expect(page).toHaveURL(new RegExp(`${path}$`));
      await expect(page.getByRole("heading", { level: 1, name: title })).toBeVisible();
      await expect(page.getByRole("heading", { level: 2 }).first()).toHaveText("1. Introduction");
      await expect(page.locator("header")).toBeVisible();
      await expect(page.locator("footer")).toBeVisible();
    });
  }

  test("header nav on a legal page returns to the home section", async ({ page }) => {
    await page.goto("/privacy");
    await page.getByRole("navigation", { name: "Primary Navigation" }).getByRole("link", { name: "Specifications" }).click();
    await expect(page).toHaveURL(/\/#specifications$/);
    await expect(page.locator("#specifications")).toBeInViewport();
  });
});
