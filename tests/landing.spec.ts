import { expect, test, type Page } from "@playwright/test";

const CAL_URL = "https://cal.com/crado-a7dbr4/30min";

/** The page really scrolls: a wheel gesture moves scrollY. */
async function expectPageScrolls(page: Page) {
  const before = await page.evaluate(() => window.scrollY);
  await page.mouse.move(700, 400);
  await page.mouse.wheel(0, before > 400 ? -300 : 300);
  await expect.poll(() => page.evaluate(() => window.scrollY)).not.toBe(before);
}

async function expectUnlocked(page: Page) {
  await expect
    .poll(() => page.evaluate(() => [document.documentElement.style.overflow, document.body.style.overflow]))
    .toEqual(["", ""]);
  await expect(page.locator('[data-booking]')).toHaveCount(0);
  await expectPageScrolls(page);
}

/** A real mouse click without Playwright's scroll-into-view, which moves the page for sticky elements. */
async function clickInPlace(page: Page, target: ReturnType<Page["locator"]>) {
  const b = (await target.boundingBox())!;
  await page.mouse.click(b.x + b.width / 2, b.y + b.height / 2);
}

/** Open booking from `cta` and wait until Cal's calendar has loaded. */
async function openCal(page: Page, cta: ReturnType<Page["locator"]>) {
  await clickInPlace(page, cta);
  await expect.poll(() => page.evaluate(() => document.documentElement.style.overflow)).toBe("hidden");
  const box = page.locator("cal-modal-box").last();
  await expect(box).toHaveAttribute("state", "loaded", { timeout: 30_000 });
  await expect(box.locator("iframe")).toHaveAttribute("src", /cal\.com\/crado-a7dbr4\/30min/);
  return box;
}

test.describe("Home page", () => {
  test("renders the approved hero and metadata", async ({ page }) => {
    const response = await page.goto("/");
    expect(response?.status()).toBe(200);
    await expect(page).toHaveTitle("Crado | Hardware Compliance Inside the Engineering Loop");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(/Compliance,\s*inside the\s*engineering loop\./);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", /^https:\/\/www\.crado\.io\/?$/);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
      "content",
      "https://www.crado.io/og/crado-og-1200x630.png",
    );
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute("content", "summary_large_image");
    const ld = JSON.parse((await page.locator('script[type="application/ld+json"]').textContent()) ?? "{}");
    expect(ld["@graph"].map((n: { "@type": string }) => n["@type"])).toEqual(["Organization", "WebSite", "WebPage"]);
  });

  test("hero message, action and illustration fit a 1366x768 laptop screen", async ({ page }) => {
    await page.setViewportSize({ width: 1366, height: 768 });
    await page.goto("/");
    for (const el of [
      page.getByRole("heading", { level: 1 }),
      page.getByText(/^Crado connects hardware revisions/),
      page.locator("#main").getByRole("link", { name: "Book a pilot call" }).first(),
      page.getByRole("link", { name: /Explore the system/ }),
      page.getByRole("img", { name: "Revisions drawn as stacked layers" }),
    ]) {
      const box = await el.boundingBox();
      expect(box && box.y + box.height).toBeLessThanOrEqual(768);
    }
  });

  test("primary navigation is Approach, System, Docs, Pilot", async ({ page }) => {
    await page.goto("/");
    const header = page.locator("header");
    await expect(header.getByRole("link")).toHaveText(["", "Approach", "System", "Docs", "Pilot"]);
    await header.getByRole("link", { name: "System" }).click();
    await expect(page.locator("#system")).toBeInViewport();
    await expect(page).toHaveURL(/\/$/);
  });

  test("header section link from /docs returns to the home section", async ({ page }) => {
    await page.goto("/docs");
    await page.locator("header").getByRole("link", { name: "Approach" }).click();
    await expect(page.locator("#approach")).toBeInViewport();
    await expect(page).toHaveURL(/\/$/);
  });

  test("legacy home anchors land on their replacement section", async ({ page }) => {
    await page.goto("/#pipeline");
    await expect(page.locator("#system")).toBeInViewport();
    await expect(page).toHaveURL(/\/$/);
  });

  test("investigation tabs advance, pause on hover and stop after manual selection", async ({ page }) => {
    await page.clock.install();
    await page.goto("/");
    const panel = page.locator("#application");
    await panel.scrollIntoViewIfNeeded();
    await page.mouse.move(0, 0);
    const tab = (name: string) => page.getByRole("tab", { name });
    await expect(tab("Report")).toHaveAttribute("aria-selected", "true");

    await page.clock.runFor(7_500);
    await expect(tab("Investigation")).toHaveAttribute("aria-selected", "true");

    await page.locator("#bench-panel").hover();
    await page.clock.runFor(15_000);
    await expect(tab("Investigation")).toHaveAttribute("aria-selected", "true");
    await page.mouse.move(0, 0);

    await tab("Retest record").click();
    await expect(page.getByRole("button", { name: "Play automatic stage sequence" })).toBeVisible();
    await page.mouse.move(0, 0);
    await page.clock.runFor(20_000);
    await expect(tab("Retest record")).toHaveAttribute("aria-selected", "true");

    await tab("Retest record").press("ArrowRight");
    await expect(tab("Report")).toHaveAttribute("aria-selected", "true");
    await expect(tab("Report")).toBeFocused();
  });

  test("reduced motion starts the sequences paused", async ({ browser }) => {
    const context = await browser.newContext({ reducedMotion: "reduce" });
    const page = await context.newPage();
    await page.goto("/");
    await expect(page.getByRole("button", { name: "Play automatic revision sequence" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Play automatic stage sequence" })).toBeVisible();
    await context.close();
  });
});

test.describe("Pilot booking", () => {
  test("every Pilot CTA links to the Cal.com event", async ({ page }) => {
    await page.goto("/");
    for (const name of ["Book a pilot call", "Pilot"]) {
      await expect(page.getByRole("link", { name, exact: true }).first()).toHaveAttribute("href", CAL_URL);
    }
  });

  test("dismissing by clicking the backdrop restores page scrolling", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => window.scrollTo(0, 1500));
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(1500);
    const cta = page.locator("header").getByRole("link", { name: "Pilot" });
    await openCal(page, cta);

    // While open the page must not scroll.
    await page.mouse.wheel(0, 300);
    await page.waitForTimeout(300);
    expect(await page.evaluate(() => window.scrollY)).toBe(1500);

    // Click the backdrop, outside the calendar.
    await page.mouse.click(8, 400);
    await expect(page.locator("cal-modal-box").last()).toBeHidden();
    await expectUnlocked(page);
    await expect(cta).toBeFocused();
  });

  test("Escape and repeated opening leave the page usable", async ({ page }) => {
    await page.goto("/");
    const cta = page.locator("#pilot").getByRole("link", { name: "Book a pilot call" });
    await cta.scrollIntoViewIfNeeded();
    for (let i = 0; i < 2; i++) {
      await openCal(page, cta);
      await page.keyboard.press("Escape");
      await expectUnlocked(page);
    }
  });

  test("a failed embed shows the direct link and closes cleanly", async ({ page }) => {
    await page.route("https://app.cal.com/embed/embed.js", (route) => route.abort());
    await page.goto("/");
    await page.getByRole("link", { name: "Book a pilot call" }).first().click();
    const dialog = page.getByRole("dialog", { name: "Book a pilot call" });
    const direct = dialog.getByRole("link", { name: "Open booking page" });
    await expect(direct).toHaveAttribute("href", CAL_URL);
    await expect(direct).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(dialog.getByRole("button", { name: "Close" })).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(direct).toBeFocused();
    await dialog.getByRole("button", { name: "Close" }).click();
    await expectUnlocked(page);
  });

  test("navigating away while booking is open releases the lock", async ({ page }) => {
    await page.route("https://app.cal.com/embed/embed.js", (route) => route.abort());
    await page.goto("/");
    await page.locator("header").getByRole("link", { name: "Docs" }).click();
    await expect(page).toHaveURL(/\/docs$/);
    await page.locator("header").getByRole("link", { name: "Pilot" }).click();
    await expect(page.getByRole("dialog", { name: "Book a pilot call" })).toBeVisible();
    await page.goBack();
    await expect(page).toHaveURL(/\/$/);
    await expectUnlocked(page);
  });

  test("mobile menu Pilot opens booking and returns focus to the menu button", async ({ page }) => {
    await page.route("https://app.cal.com/embed/embed.js", (route) => route.abort());
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    const menu = page.getByRole("button", { name: "Menu" });
    await menu.click();
    await page.locator("#site-menu").getByRole("link", { name: "Pilot" }).click();
    await expect(page.locator("#site-menu")).toHaveCount(0);
    await page.keyboard.press("Escape");
    await expectUnlocked(page);
    await expect(menu).toBeFocused();
  });
});

test.describe("Docs", () => {
  const ROUTES = [
    ["/docs", "Introduction", "Crado Docs | Emissions Investigation and Evidence"],
    ["/docs/core-concepts", "Products and revisions", "Revisions, requirements and evidence | Crado Docs"],
    ["/docs/evaluation", "Report confirmation", "Report confirmation and measurement comparisons | Crado Docs"],
    ["/docs/reference", "Regulatory coverage", "Regulatory coverage and worked examples | Crado Docs"],
    ["/docs/trust", "Workspace access", "Workspace access, data handling and security | Crado Docs"],
  ] as const;

  for (const [path, h1, title] of ROUTES) {
    test(`${path} renders with unique metadata`, async ({ page }) => {
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);
      await expect(page).toHaveTitle(title);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(h1);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        "href",
        `https://www.crado.io${path}`,
      );
      const ld = await page.locator('script[type="application/ld+json"]').textContent();
      expect(ld).toContain('"BreadcrumbList"');
      expect(ld).toContain('"TechArticle"');
    });
  }

  test("header Docs link is marked current", async ({ page }) => {
    await page.goto("/");
    await page.locator("header").getByRole("link", { name: "Docs" }).click();
    await expect(page).toHaveURL(/\/docs$/);
    await expect(page.locator("header").getByRole("link", { name: "Docs" })).toHaveAttribute("aria-current", "page");
  });

  test("sidebar moves between pages and marks the active section", async ({ page }) => {
    await page.goto("/docs");
    const nav = page.getByRole("navigation", { name: "Documentation sections" });
    await nav.getByRole("link", { name: "Measurement comparisons" }).click();
    await expect(page).toHaveURL(/\/docs\/evaluation#measurement-comparisons$/);
    await expect(page.locator("#measurement-comparisons")).toBeInViewport();
    await expect(nav.getByRole("link", { name: "Measurement comparisons" })).toHaveAttribute(
      "aria-current",
      "location",
    );
  });

  test("legacy anchors redirect to their new pages", async ({ page }) => {
    await page.goto("/docs#regulatory-standards");
    await expect(page).toHaveURL(/\/docs\/reference$/);
    await page.goto("/docs#tenant-isolation");
    await expect(page).toHaveURL(/\/docs\/trust$/);
    await page.goto("/docs#data-handling");
    await expect(page).toHaveURL(/\/docs\/trust#data-handling$/);
    await expect(page.locator("#data-handling")).toBeInViewport();
    await page.goto("/docs/get-started");
    await expect(page).toHaveURL(/\/docs$/);
  });

  test("search finds sections on other pages", async ({ page }) => {
    await page.goto("/docs");
    await page.getByLabel("SEARCH DOCUMENTATION").fill("margin convention");
    const results = page.locator("#search-results");
    await expect(results.getByRole("link").first()).toContainText("Supported rule evaluation");
    await page.getByLabel("SEARCH DOCUMENTATION").press("Enter");
    await expect(page).toHaveURL(/\/docs\/evaluation#supported-rule-evaluation$/);
  });

  test("copy buttons copy the code block", async ({ page, context }) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await page.goto("/docs/evaluation");
    await page.getByRole("button", { name: "Copy margin" }).click();
    await expect(page.getByRole("button", { name: "Copy margin" })).toHaveText("Copied");
    expect(await page.evaluate(() => navigator.clipboard.readText())).toContain("measured level");
  });

  test("mobile contents drawer opens, navigates and closes", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/docs");
    const toggle = page.getByRole("button", { name: "Contents" });
    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await page.keyboard.press("Escape");
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(toggle).toBeFocused();
  });
});

test.describe("Site files", () => {
  test("robots.txt allows crawling and points at the sitemap", async ({ request }) => {
    const body = await (await request.get("/robots.txt")).text();
    expect(body).toContain("User-Agent: *");
    expect(body).toContain("Sitemap: https://www.crado.io/sitemap.xml");
  });

  test("sitemap lists only public canonical routes, all of which resolve", async ({ request }) => {
    const body = await (await request.get("/sitemap.xml")).text();
    const urls = [...body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    expect(urls).toEqual([
      "https://www.crado.io/",
      "https://www.crado.io/docs",
      "https://www.crado.io/docs/core-concepts",
      "https://www.crado.io/docs/evaluation",
      "https://www.crado.io/docs/reference",
      "https://www.crado.io/docs/trust",
      "https://www.crado.io/privacy",
      "https://www.crado.io/terms",
    ]);
    for (const url of urls) {
      expect((await request.get(url.replace("https://www.crado.io", ""))).status()).toBe(200);
    }
  });

  test("social image and brand assets are served", async ({ request }) => {
    for (const path of ["/og/crado-og-1200x630.png", "/assets/crado-mark-black.png", "/assets/nvidia-inception-badge.png"]) {
      const res = await request.get(path);
      expect(res.status()).toBe(200);
      expect(res.headers()["content-type"]).toBe("image/png");
    }
  });

  test("unknown routes return 404", async ({ request }) => {
    expect((await request.get("/does-not-exist")).status()).toBe(404);
    expect((await request.get("/docs/does-not-exist")).status()).toBe(404);
  });

  test("footer shows the NVIDIA Inception membership and legal links", async ({ page }) => {
    await page.goto("/");
    const footer = page.locator("footer");
    await expect(footer.getByRole("img", { name: "NVIDIA Inception Program" })).toBeAttached();
    await expect(footer.getByText("Member of NVIDIA Inception")).toBeVisible();
    await footer.getByRole("link", { name: "Privacy" }).click();
    await expect(page.getByRole("heading", { level: 1, name: "Privacy Policy" })).toBeVisible();
  });
});
