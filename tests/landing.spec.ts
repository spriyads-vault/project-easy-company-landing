import { expect, test, type Page } from "@playwright/test";

// Offsets (px) between the sticky header's bottom edge and each anchor target once scrolled.
// scroll-mt-32 (128px) minus the 65px header leaves 63px; the rest sit flush.
const HEADER_GAP: Record<string, number> = {
  thesis: 63,
  pipeline: 63,
  specifications: 63,
  architecture: 0,
  faq: 0,
};

async function expectBelowStickyHeader(page: Page, id: string) {
  const section = page.locator(`#${id}`);
  await expect(section).toBeInViewport();
  await expect
    .poll(async () => {
      const header = await page.locator("header").boundingBox();
      const target = await section.boundingBox();
      return header && target ? Math.round(target.y - (header.y + header.height)) : null;
    })
    .toBe(HEADER_GAP[id]);
}

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
    { label: "Thesis", id: "thesis" },
    { label: "System", id: "pipeline" },
    { label: "Specifications", id: "specifications" },
  ]) {
    test(`nav link "${label}" scrolls to #${id}`, async ({ page }) => {
      await page.goto("/");
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      const nav = page.getByRole("navigation", { name: "Primary Navigation" });
      await nav.getByRole("link", { name: label }).click();

      await expect(page).toHaveURL(new RegExp(`/#${id}$`));
      await expectBelowStickyHeader(page, id);
    });
  }

  for (const { label, id } of [
    { label: "Thesis", id: "thesis" },
    { label: "System", id: "pipeline" },
    { label: "Specifications", id: "specifications" },
  ]) {
    test(`header "${label}" from /docs routes to /#${id}, clear of the sticky header`, async ({ page }) => {
      await page.goto("/docs");
      await page.getByRole("navigation", { name: "Primary Navigation" }).getByRole("link", { name: label }).click();

      await expect(page).toHaveURL(new RegExp(`/#${id}$`));
      await expectBelowStickyHeader(page, id);
    });
  }

  for (const id of ["thesis", "pipeline", "specifications", "architecture", "faq"]) {
    test(`direct load of /#${id} lands on the section`, async ({ page }) => {
      await page.goto(`/#${id}`);
      await expectBelowStickyHeader(page, id);
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
    await page.getByRole("navigation", { name: "Primary Navigation" }).getByRole("link", { name: "System" }).click();
    await expect(page).toHaveURL(/\/#pipeline$/);
    await expectBelowStickyHeader(page, "pipeline");
  });
});

test.describe("Docs page", () => {
  test("header Docs link opens /docs and is marked active", async ({ page }) => {
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Primary Navigation" });
    await expect(nav.getByRole("link", { name: "Docs" })).not.toHaveAttribute("aria-current", "page");

    await nav.getByRole("link", { name: "Docs" }).click();
    await expect(page).toHaveURL(/\/docs$/);
    await expect(page.getByRole("heading", { level: 1, name: /System Architecture/ })).toBeVisible();
    await expect(nav.getByRole("link", { name: "Docs" })).toHaveAttribute("aria-current", "page");
  });

  for (const id of ["deterministic-gates", "regulatory-standards"]) {
    test(`sidebar link #${id} scrolls to its section`, async ({ page }) => {
      await page.goto("/docs");
      const sidebar = page.getByRole("navigation", { name: "Documentation" });
      await sidebar.getByRole("link", { name: `#${id}` }).click();

      await expect(page).toHaveURL(new RegExp(`/docs#${id}$`));
      await expect(page.locator(`#${id}`)).toBeInViewport();
      await expect(sidebar.getByRole("link", { name: `#${id}` })).toHaveAttribute("aria-current", "location");
    });
  }
});
