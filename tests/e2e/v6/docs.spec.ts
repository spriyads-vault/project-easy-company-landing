import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";
import { DOCS_PAGES } from "../../../src/lib/docs-pages";

// Docs, legal pages and the 404 in the v6 design, flag on (SCRUM-296; playwright.config.ts project "chromium-v6").

/** The same site with the flag off (main's pages); the legal text is compared against it. */
const FLAG_OFF = "http://localhost:3100";

const BANNED = ["AI-powered", "leverage", "unlock", "transform", "empower", "revolutionary", "cutting-edge", "game-changing", "seamless"];

const OTHER_PAGES = ["/privacy", "/terms", "/no-such-page"];
const ALL_PAGES = [...DOCS_PAGES.map((p) => p.path), ...OTHER_PAGES];

async function scan(page: Page) {
  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "best-practice"]).analyze();
  return results.violations.map((v) => `${v.impact} ${v.id}: ${v.nodes.map((n) => n.target.join(" ")).slice(0, 5).join(", ")}`);
}

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
});

test.describe("v6 shell on every page", () => {
  for (const path of ALL_PAGES) {
    test(`${path}: light page, Plex preloaded, v6 announcement, header and footer waitlist`, async ({ page }) => {
      await page.goto(path);
      await expect(page.locator("[data-site-v6]")).toHaveCount(1);
      expect(await page.evaluate(() => getComputedStyle(document.documentElement).colorScheme)).toBe("light");
      expect(await page.locator("[data-site-v6]").evaluate((e) => getComputedStyle(e).backgroundColor)).toBe("rgb(248, 247, 246)");

      // IBM Plex only: three preloaded files, and the v3 faces are not loaded.
      await expect(page.locator('link[rel="preload"][as="font"]')).toHaveCount(3);
      const faces = await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue("--font-plex-sans"));
      expect(faces).toContain("IBM Plex Sans");
      expect(await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue("--font-inter"))).toBe("");

      await expect(page.getByRole("complementary", { name: "Announcement" })).toBeVisible();
      const nav = page.getByRole("navigation", { name: "Main" });
      await expect(nav.getByRole("link", { name: "How it works" })).toHaveAttribute("href", "/#how");
      await expect(page.getByRole("banner").getByRole("link", { name: "Book a case review" })).toHaveAttribute("href", "/#book");
      await expect(page.getByRole("navigation", { name: "Footer" }).getByRole("link", { name: "Coverage" })).toHaveAttribute("href", "/#coverage");
      await expect(page.locator("h1")).toHaveCount(1);
    });
  }

  test("Join the waitlist goes to the footer form from every page", async ({ page }) => {
    for (const path of ALL_PAGES) {
      await page.goto(path);
      await page.getByRole("complementary", { name: "Announcement" }).getByRole("link", { name: /Join the waitlist/ }).click();
      await expect(page).toHaveURL(/#waitlist$/);
      await expect(page.getByRole("form", { name: "Join the waitlist" }).getByLabel("Work email"), path).toBeInViewport();
    }
  });

  test("the docs waitlist sends the existing docs source; legal pages the inline-form source", async ({ page }) => {
    const sources: string[] = [];
    await page.route("**/api/waitlist", async (route) => {
      sources.push(JSON.parse(route.request().postData() ?? "{}").source);
      await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ ok: true, step2_token: "6b1f6a0e-6f0e-4b5e-9a3f-2f7d2c1e8b11" }) });
    });
    for (const [i, path] of ["/docs/concepts", "/privacy"].entries()) {
      await page.goto(`${path}#waitlist`);
      const form = page.getByRole("form", { name: "Join the waitlist" });
      await form.getByLabel("Work email").fill("engineer@example.com");
      await form.getByLabel("Your role").selectOption({ index: 1 });
      await page.waitForTimeout(2100);
      await form.getByRole("button", { name: "Join the waitlist" }).click();
      await expect.poll(() => sources.length).toBe(i + 1);
    }
    expect(sources).toEqual(["docs", "final_cta_inline"]);
  });

  test("off the homepage, the mobile menu's section links go to the homepage", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/docs");
    await page.getByRole("button", { name: "Open menu" }).click();
    await page.getByRole("navigation", { name: "Menu links" }).getByRole("link", { name: "Agents" }).click();
    await expect(page).toHaveURL(/\/#agents$/);
  });
});

test.describe("v6 docs", () => {
  for (const p of DOCS_PAGES) {
    test(`${p.path}: metadata, canonical and JSON-LD are unchanged`, async ({ page }) => {
      await page.goto(p.path);
      await expect(page).toHaveTitle(p.title);
      await expect(page.locator("h1")).toHaveText(p.headline);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `https://www.crado.io${p.path}`);
      await expect(page.locator('meta[property="og:type"]')).toHaveAttribute("content", "article");
      await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", /\/og\/crado-og-1200x630\.png$/);
      const ld = JSON.parse((await page.locator('script[type="application/ld+json"]').first().textContent())!);
      expect(ld["@graph"].map((n: { "@type": string }) => n["@type"])).toEqual(["TechArticle", "BreadcrumbList"]);
      await expect(page.getByText("Last updated 8 Oct 2026")).toBeVisible();
      const levels = await page.locator("main h1, main h2, main h3").evaluateAll((els) => els.map((e) => Number(e.tagName[1])));
      const skips = levels.filter((l, i) => i > 0 && l - levels[i - 1] > 1).length;
      expect(skips, "skipped heading levels").toBe(0);
    });
  }

  test("approved copy: Not covered is an H2 in the reference contents; likely causes, not candidate explanations", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/docs/reference");
    await expect(page.getByRole("heading", { level: 2, name: "Not covered" })).toHaveAttribute("id", "not-covered");
    await page.getByRole("complementary", { name: "On this page" }).getByRole("link", { name: "Not covered" }).click();
    await expect(page).toHaveURL(/#not-covered$/);
    for (const path of ["/docs", "/docs/concepts"]) {
      await page.goto(path);
      const text = await page.locator("main").innerText();
      expect(text, path).not.toMatch(/candidate explanation/i);
      expect(text, path).toMatch(/likely causes/i);
    }
  });

  test("type: H1 Plex Serif 52/58, H2 34/40, H3 24/32, body Plex Sans 17/28, code Plex Mono 14/22", async ({ page }) => {
    await page.goto("/docs/evaluation");
    const style = (sel: string) =>
      page.locator(sel).first().evaluate((e) => {
        const s = getComputedStyle(e);
        return `${s.fontFamily.split(",")[0]} ${s.fontSize}/${s.lineHeight}`;
      });
    expect(await style("main h1")).toMatch(/IBM Plex Serif.* 52px\/58px/);
    expect(await style("main h2")).toMatch(/IBM Plex Serif.* 34px\/40px/);
    expect(await style("main h3")).toMatch(/IBM Plex Serif.* 24px\/32px/);
    expect(await style("main article > p:nth-of-type(2)")).toMatch(/IBM Plex Sans.* 17px\/28px/);
    expect(await style("main pre")).toMatch(/IBM Plex Mono.* 14px\/22px/);
  });

  test("1440: 240px sidebar, 72ch content, 200px rail", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/docs");
    const box = async (name: string) => (await page.getByRole("complementary", { name }).boundingBox())!;
    expect((await box("Documentation")).width).toBe(240);
    expect((await box("On this page")).width).toBe(200);
    const main = (await page.locator("main").boundingBox())!;
    const ch = await page.locator("main").evaluate((e) => {
      const probe = document.createElement("span");
      probe.style.cssText = "position:absolute;visibility:hidden;width:72ch";
      e.appendChild(probe);
      const w = probe.getBoundingClientRect().width;
      probe.remove();
      return w;
    });
    expect(Math.abs(main.width - ch)).toBeLessThan(1);
    await expect(page.getByRole("navigation", { name: "On this page" })).toBeHidden();
  });

  test("834: drawer instead of the sidebar, the list above the content open", async ({ page }) => {
    await page.setViewportSize({ width: 834, height: 1112 });
    await page.goto("/docs/concepts");
    await expect(page.getByRole("complementary", { name: "Documentation" })).toBeHidden();
    await expect(page.getByRole("complementary", { name: "On this page" })).toBeHidden();
    const toc = page.getByRole("navigation", { name: "On this page" });
    await expect(toc.getByRole("link", { name: "Glossary" })).toHaveCount(0);
    await expect(toc.getByRole("link", { name: "Evidence and provenance" })).toBeVisible();
    await expect(toc.getByRole("button")).toHaveAttribute("aria-expanded", "true");
    await toc.getByRole("button").click();
    await expect(toc.getByRole("link", { name: "Evidence and provenance" })).toBeHidden();
    await expect(toc.getByRole("button")).toHaveAttribute("aria-expanded", "false");
  });

  test("390: one column, the list above the content collapsed until opened", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/docs/concepts");
    const toc = page.getByRole("navigation", { name: "On this page" });
    await expect(toc.getByRole("button")).toHaveAttribute("aria-expanded", "false");
    await expect(toc.getByRole("link", { name: "Evidence and provenance" })).toBeHidden();
    await toc.getByRole("button").click();
    await toc.getByRole("link", { name: "Evidence and provenance" }).click();
    await expect(page).toHaveURL(/#evidence$/);
    // The heading lands below the header and the contents bar.
    const top = await page.locator("#evidence").evaluate((e) => e.getBoundingClientRect().top);
    expect(top).toBeGreaterThanOrEqual(64 + 48);
  });

  test("drawer: opens from the bar, traps focus, closes with Escape, links navigate", async ({ page }) => {
    await page.setViewportSize({ width: 834, height: 1112 });
    await page.goto("/docs/concepts");
    const button = page.getByRole("button", { name: "Contents" });
    await button.click();
    const drawer = page.getByRole("dialog", { name: "Contents" });
    await expect(drawer).toBeVisible();
    await expect(drawer.getByRole("button", { name: "Close contents" })).toBeFocused();
    await page.keyboard.press("Shift+Tab");
    await expect(drawer.locator(":focus")).toHaveCount(1);
    await page.keyboard.press("Escape");
    await expect(drawer).toBeHidden();
    await expect(button).toBeFocused();

    await button.click();
    await drawer.getByRole("searchbox", { name: "Search documentation" }).fill("gloss");
    await drawer.getByRole("link", { name: "Glossary" }).click();
    await expect(page).toHaveURL(/\/docs\/reference#glossary$/);
    await expect(drawer).toBeHidden();
  });

  test("Cmd/Ctrl+K: focuses the sidebar search at 1440, opens the drawer at 834", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/docs");
    const search = page.getByRole("complementary", { name: "Documentation" }).getByRole("searchbox");
    await expect(async () => {
      await page.keyboard.press("ControlOrMeta+k");
      await expect(search).toBeFocused({ timeout: 500 });
    }).toPass({ timeout: 10_000 });
    await search.fill("zzzz");
    await expect(page.getByRole("complementary", { name: "Documentation" }).getByText("No matching pages")).toBeVisible();

    await page.setViewportSize({ width: 834, height: 1112 });
    await page.goto("/docs");
    await expect(async () => {
      await page.keyboard.press("ControlOrMeta+k");
      await expect(page.getByRole("dialog", { name: "Contents" })).toBeVisible({ timeout: 500 });
    }).toPass({ timeout: 10_000 });
  });

  test("rail follows the scroll position", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/docs");
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.locator("#scope").scrollIntoViewIfNeeded();
    await expect(page.getByRole("complementary", { name: "On this page" }).locator('[aria-current="location"]')).toContainText(/scope/i);
  });

  test("code block: copy button hover, focus and copied states", async ({ page, context }) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await page.goto("/docs/evaluation");
    const copy = page.getByRole("button", { name: "Copy margin" });
    const border = () => copy.evaluate((e) => getComputedStyle(e).borderColor);
    const rest = await border();
    await copy.hover();
    await expect.poll(border).not.toBe(rest);
    await copy.focus();
    await page.keyboard.press("Enter");
    await expect(page.getByRole("button", { name: "margin copied" })).toHaveText("Copied");
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe("margin (dB) = measured level (dBµV/m) − limit (dBµV/m)");
    await expect(page.getByRole("button", { name: "Copy margin" })).toHaveText("Copy", { timeout: 3000 });
  });

  test("tables scroll sideways at 390 and hold the first column", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/docs/reference");
    const region = page.getByRole("region", { name: "Regulatory coverage" });
    const first = region.locator("tbody td").first();
    const before = (await first.boundingBox())!.x;
    await region.evaluate((e) => (e.scrollLeft = 200));
    expect((await first.boundingBox())!.x).toBe(before);
    await expect(region).toHaveAttribute("tabindex", "0");
  });

  test("callouts: Sky note, Sunshine caution, grey Roadmap", async ({ page }) => {
    const bg = (p: Page, tone: string) => p.locator(`[data-callout="${tone}"]`).first().evaluate((e) => getComputedStyle(e).backgroundColor);
    await page.goto("/docs/concepts");
    expect(await bg(page, "accent")).toBe("rgb(175, 217, 250)");
    expect(await bg(page, "violet")).toBe("rgb(226, 224, 218)");
    await page.goto("/docs");
    expect(await bg(page, "warn")).toBe("rgb(255, 227, 110)");
  });

  test("feedback: buttons still thank the reader", async ({ page }) => {
    await page.goto("/docs/trust");
    await page.getByRole("button", { name: "Yes" }).click();
    await expect(page.getByText("Thanks for the feedback.")).toBeVisible();
  });

  test("redirects and prev/next are unchanged", async ({ page }) => {
    await page.goto("/docs/core-concepts");
    await expect(page).toHaveURL(/\/docs\/concepts$/);
    const pager = page.getByRole("navigation", { name: "Previous and next pages" });
    await pager.getByRole("link", { name: /NEXT/ }).click();
    await expect(page).toHaveURL(/\/docs\/evaluation$/);
  });
});

test.describe("v6 legal pages", () => {
  for (const path of ["/privacy", "/terms"]) {
    test(`${path}: the legal text is exactly main's`, async ({ page, browser }) => {
      const text = (sel: string) => (p: Page) => p.locator(sel).evaluateAll((els) => els.map((e) => e.textContent ?? "").join("").replace(/\s+/g, " ").trim());
      const off = await browser.newPage();
      await off.goto(FLAG_OFF + path);
      const expected = await text("main")(off);
      await off.close();
      await page.goto(path);
      expect(await text("main [data-legal-text]")(page)).toBe(expected);
      expect(expected.length).toBeGreaterThan(1000);
    });

    test(`${path}: one 72ch column, the section list at the top, print hides the chrome`, async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto(path);
      const toc = page.getByRole("navigation", { name: "On this page" });
      const first = toc.getByRole("link").first();
      const target = (await first.getAttribute("href"))!;
      await first.click();
      await expect(page.locator(`[id="${target.slice(1)}"]`)).toBeInViewport();
      const textWidth = await page.locator("[data-legal-text]").last().evaluate((e) => e.getBoundingClientRect().width);
      expect(textWidth).toBeLessThanOrEqual(760);
      await page.emulateMedia({ media: "print" });
      await expect(toc).toBeHidden();
      await expect(page.getByRole("banner")).toBeHidden();
      await expect(page.locator("footer")).toBeHidden();
      await expect(page.locator("h1")).toBeVisible();
    });
  }
});

test.describe("v6 404", () => {
  test("Page not found, two ways on and a still record block", async ({ page }) => {
    const res = await page.goto("/no-such-page");
    expect(res?.status()).toBe(404);
    await expect(page).toHaveTitle("Page not found | Crado");
    await expect(page.locator("h1")).toHaveText("Page not found");
    await expect(page.getByText("The page may have moved. Try the docs or go back home.")).toBeVisible();
    const recovery = page.getByRole("navigation", { name: "Recovery" });
    await expect(recovery.getByRole("link", { name: "Go to homepage" })).toHaveAttribute("href", "/");
    await expect(recovery.getByRole("link", { name: "Read the docs" })).toHaveAttribute("href", "/docs");
    await expect(page.locator('canvas[data-record-block="still"]')).toHaveAttribute("aria-hidden", "true");
  });
});

test.describe("v6 docs quality", () => {
  test("copy: no banned words or em dashes", async ({ page }) => {
    for (const path of ALL_PAGES) {
      await page.goto(path);
      const text = await page.evaluate(() => document.body.innerText + " " + document.title);
      for (const w of BANNED) expect(text.toLowerCase(), `${path}: ${w}`).not.toContain(w.toLowerCase());
      expect(text, path).not.toContain("—");
    }
  });

  test("no horizontal scroll, no layout shift, no console errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (m) => m.type() === "error" && !m.text().includes("404") && errors.push(m.text()));
    page.on("pageerror", (e) => errors.push(e.message));
    await page.addInitScript(() => {
      (window as unknown as { __cls: number }).__cls = 0;
      new PerformanceObserver((list) => {
        for (const e of list.getEntries() as unknown as { value: number; hadRecentInput: boolean }[]) if (!e.hadRecentInput) (window as unknown as { __cls: number }).__cls += e.value;
      }).observe({ type: "layout-shift", buffered: true });
    });
    for (const width of [390, 834, 1024, 1280, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      for (const path of ["/docs", "/docs/reference", "/privacy", "/no-such-page"]) {
        await page.goto(path);
        await page.waitForLoadState("networkidle");
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
        expect(overflow, `${path} at ${width}px`).toBe(0);
        expect(await page.evaluate(() => (window as unknown as { __cls: number }).__cls), `CLS ${path} at ${width}`).toBe(0);
      }
    }
    expect(errors).toEqual([]);
  });

  for (const width of [1440, 834, 390]) {
    test(`axe finds no violations at ${width}px (docs, legal, 404, drawer)`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      for (const path of ["/docs", "/docs/concepts", "/docs/evaluation", "/docs/reference", "/privacy", "/terms", "/no-such-page"]) {
        await page.goto(path);
        expect(await scan(page), `${path} at ${width}`).toEqual([]);
      }
      if (width < 1024) {
        await page.goto("/docs/concepts");
        await page.getByRole("button", { name: "Contents" }).click();
        await expect(page.getByRole("dialog", { name: "Contents" })).toBeVisible();
        expect(await scan(page), `drawer at ${width}`).toEqual([]);
        await page.keyboard.press("Escape");
        if (width < 641) await page.getByRole("navigation", { name: "On this page" }).getByRole("button").click();
        expect(await scan(page), `list above the content at ${width}`).toEqual([]);
      }
    });
  }
});
