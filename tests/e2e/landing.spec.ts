import { expect, test } from "@playwright/test";

test.describe("landing page", () => {
  test("renders the hero, metadata and sections in design order", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle("Crado | Hardware compliance inside the engineering loop");
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      "Crado keeps EMC test evidence tied to each product revision, investigates radiated-emissions failures and checks results against FCC Part 15 limits.",
    );
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://www.crado.io/");
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("h1")).toHaveText("Compliance, inside the engineering loop.");

    const ids = await page.locator("main > section[id]").evaluateAll((els) => els.map((e) => e.id));
    expect(ids).toEqual(["change-review", "evidence", "failure-investigation", "how-it-works", "use-cases", "agents", "faq"]);
  });

  test("hero copy follows the approved wording and ships no integration logos", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("In early access, agents trace design changes to the tests and certifications they touch.")).toBeVisible();
    await expect(page.getByText("WORKS WITH YOUR LAB REPORTS · PDF · TEXT · MARKDOWN")).toBeVisible();
    const external = await page.locator("img").evaluateAll((imgs) =>
      imgs.map((i) => (i as HTMLImageElement).currentSrc || (i as HTMLImageElement).src).filter((s) => !s.startsWith(location.origin)),
    );
    expect(external).toEqual([]);
  });

  test("copy avoids banned words and invented people", async ({ page }) => {
    await page.goto("/");
    const text = (await page.locator("body").innerText()).toLowerCase();
    for (const word of ["ai-powered", "leverage", "unlock", "transform", "empower", "revolutionary", "cutting-edge", "game-changing", "seamless"]) {
      expect(text, word).not.toContain(word);
    }
    expect(text).not.toContain("—");
    expect(text).not.toContain("sam lee");
  });

  test("FAQ JSON-LD matches the visible answers word for word", async ({ page }) => {
    await page.goto("/");
    const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
    const types = blocks.map((b) => JSON.parse(b)["@type"]);
    expect(types).toEqual(expect.arrayContaining(["Organization", "WebSite", "SoftwareApplication", "FAQPage"]));
    expect(blocks.join(" ")).not.toMatch(/"(aggregateRating|review|reviews|offers)"\s*:/);

    const faq = JSON.parse(blocks.find((b) => b.includes('"FAQPage"'))!);
    const org = JSON.parse(blocks.find((b) => b.includes('"Organization"'))!);
    expect(org.sameAs).toEqual(["https://www.linkedin.com/company/crado-io/"]);

    const section = page.locator("#faq");
    for (const q of faq.mainEntity) {
      await expect(section.getByRole("button", { name: q.name })).toBeVisible();
      const answer = section.getByText(q.acceptedAnswer.text, { exact: true });
      await expect(answer).toHaveCount(1);
    }
  });

  test("FAQ accordion toggles with aria-expanded", async ({ page }) => {
    await page.goto("/");
    const first = page.locator("#faq").getByRole("button", { name: "What is Crado?" });
    const second = page.locator("#faq").getByRole("button", { name: "Does Crado certify products or replace a test lab?" });
    await expect(first).toHaveAttribute("aria-expanded", "true");
    await expect(second).toHaveAttribute("aria-expanded", "false");
    await second.click();
    await expect(second).toHaveAttribute("aria-expanded", "true");
    await expect(page.getByText("No. Crado does not issue certifications", { exact: false })).toBeVisible();
  });

  test("no horizontal scroll at 390px", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });

  test("footer links, LinkedIn and the NVIDIA Inception badge", async ({ page }) => {
    await page.goto("/");
    const footer = page.locator("footer");
    await expect(footer.getByRole("link", { name: "Privacy" })).toHaveAttribute("href", "/privacy");
    await expect(footer.getByRole("link", { name: "Terms" })).toHaveAttribute("href", "/terms");
    await expect(footer.getByRole("link", { name: "LinkedIn" })).toHaveAttribute("href", "https://www.linkedin.com/company/crado-io/");
    const badge = footer.getByRole("img", { name: "NVIDIA Inception member" });
    await expect(badge).toHaveAttribute("src", "/assets/nvidia-inception-badge.png");
    await expect(badge).toHaveAttribute("width", "74");
    await expect(badge).toHaveAttribute("height", "32");
    expect(await footer.locator('a[href="#"]').count()).toBe(0);
    expect(await page.locator('main a[href="#"]').count()).toBe(0);
  });
});

test.describe("navigation", () => {
  test("Product dropdown works with the keyboard", async ({ page }) => {
    await page.goto("/");
    const button = page.getByRole("button", { name: "Product", exact: true });
    const menu = page.getByRole("menu", { name: "Product" });
    await button.focus();
    await page.keyboard.press("ArrowDown");
    await expect(button).toHaveAttribute("aria-expanded", "true");
    await expect(menu.getByRole("menuitem").first()).toBeFocused();
    await page.keyboard.press("ArrowDown");
    await expect(menu.getByRole("menuitem", { name: /Failure investigation/ })).toBeFocused();
    await page.keyboard.press("ArrowUp");
    await page.keyboard.press("ArrowUp");
    await expect(menu.getByRole("menuitem", { name: /Evaluation engine/ })).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(button).toHaveAttribute("aria-expanded", "false");
    await expect(button).toBeFocused();
    await expect(menu).toBeHidden();
  });

  test("Product dropdown opens on click and closes on outside click", async ({ page }) => {
    await page.goto("/");
    const button = page.getByRole("button", { name: "Product", exact: true });
    await button.click();
    await expect(page.getByRole("menu", { name: "Product" })).toBeVisible();
    // Click well away from the menu (it overlaps the hero heading).
    await page.mouse.click(1200, 500);
    await expect(page.getByRole("menu", { name: "Product" })).toBeHidden();
  });

  test("dropdown item scrolls to its section", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Product", exact: true }).click();
    await page.getByRole("menuitem", { name: /Failure investigation/ }).click();
    await expect(page).toHaveURL(/#failure-investigation$/);
    await expect(page.locator("#failure-investigation-title")).toBeInViewport();
  });

  test("scrollspy marks the section in view", async ({ page }) => {
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Main" });
    await page.locator("#how-it-works").scrollIntoViewIfNeeded();
    await page.evaluate(() => window.scrollBy(0, 1));
    await expect(nav.getByRole("link", { name: "How it works" })).toHaveAttribute("data-active", "true");
    await page.locator("#use-cases").evaluate((el) => window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 60));
    await expect(nav.getByRole("link", { name: "Use cases" })).toHaveAttribute("data-active", "true");
    await page.locator("#change-review").evaluate((el) => window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 60));
    await expect(nav.getByRole("button", { name: "Product", exact: true })).toHaveAttribute("data-active", "true");
  });

  test("mobile menu opens, navigates and returns focus", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    const open = page.getByRole("button", { name: "Open menu" });
    await open.click();
    const menu = page.getByRole("dialog", { name: "Menu" });
    await expect(menu).toBeVisible();
    await expect(menu.getByRole("button", { name: "Close menu" })).toBeFocused();

    await page.keyboard.press("Escape");
    await expect(menu).toBeHidden();
    await expect(open).toBeFocused();

    await open.click();
    await menu.getByRole("button", { name: "Product", exact: true }).click();
    await menu.getByRole("link", { name: /Change review/ }).click();
    await expect(menu).toBeHidden();
    await expect(page).toHaveURL(/#change-review$/);
  });

  test("mobile menu Join opens the waitlist and focus returns to the menu button", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await page.getByRole("button", { name: "Open menu" }).click();
    await page.getByRole("dialog", { name: "Menu" }).getByRole("button", { name: "Join early access" }).click();
    const dialog = page.getByRole("dialog", { name: "Join early access" });
    await expect(dialog).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("button", { name: "Open menu" })).toBeFocused();
  });

  test("/#join opens the waitlist", async ({ page }) => {
    await page.goto("/#join");
    await expect(page.getByRole("dialog", { name: "Join early access" })).toBeVisible();
  });
});

test.describe("motion", () => {
  test("reduced motion renders static diagrams with nothing animating", async ({ browser }) => {
    const context = await browser.newContext({ reducedMotion: "reduce" });
    const page = await context.newPage();
    await page.goto("/");
    const diagrams = page.locator("[data-diagram]");
    expect(await diagrams.count()).toBeGreaterThanOrEqual(5);
    for (const d of await diagrams.all()) {
      if (await d.isVisible()) await d.scrollIntoViewIfNeeded();
    }
    await page.waitForTimeout(800);
    const running = await page.evaluate(() => document.getAnimations().filter((a) => a.playState === "running").length);
    expect(running).toBe(0);
    // Final states, as the design renders them when motion is off.
    const finals: [string, string][] = [
      ['[data-diagram="statement-frame"]', "Draft · awaiting engineer review"],
      ['[data-diagram="change"]', "Suggested check · near-field scan at 144 MHz"],
      ['[data-diagram="lanes"]', "Reviewed by EMC engineer"],
      ['[aria-label="Product principles"]', "Unknown stays unknown."],
    ];
    for (const [root, text] of finals) {
      const el = page.locator(root).getByText(text, { exact: false }).filter({ visible: true }).first();
      await el.scrollIntoViewIfNeeded();
      await expect(el, text).toBeVisible();
      expect(await el.evaluate((n) => Number(getComputedStyle(n).opacity)), text).toBe(1);
    }
    // Every "At risk" status is showing in the change review diagram.
    const atRisk = page.locator('[data-diagram="change"]').getByText("At risk").filter({ visible: true });
    expect(await atRisk.evaluateAll((els) => els.filter((e) => Number(getComputedStyle(e).opacity) === 1).length)).toBeGreaterThanOrEqual(4);
    await context.close();
  });

  test("diagrams keep their size while animating (no layout shift)", async ({ page }) => {
    await page.goto("/");
    const cls = await page.evaluate(async () => {
      let total = 0;
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries() as (PerformanceEntry & { value: number; hadRecentInput: boolean })[]) {
          if (!entry.hadRecentInput) total += entry.value;
        }
      }).observe({ type: "layout-shift", buffered: true });
      for (let y = 0; y < document.body.scrollHeight; y += 500) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 250));
      }
      await new Promise((r) => setTimeout(r, 1500));
      return total;
    });
    expect(cls).toBeLessThan(0.02);
  });
});
