import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Locator, type Page } from "@playwright/test";
import { AGENTS, FAQ_V6, V6_TITLE } from "../../../src/content/home-v6";

// One scrolling homepage with clean section URLs (SCRUM-314): NEXT_PUBLIC_FF_HOMEPAGE_V6 and
// NEXT_PUBLIC_FF_SCROLL_SECTIONS on, plus NEXT_PUBLIC_FF_SECTION_PAGES to prove the override (project "chromium-scroll").

const SITE = "https://www.crado.io";
/** Path → the id of the section it lands on. */
const SECTIONS = { "/product": "product", "/agents": "agents", "/coverage": "coverage", "/faq": "faq", "/waitlist": "waitlist" } as const;
const PATHS = Object.keys(SECTIONS) as (keyof typeof SECTIONS)[];
const NAV = { Product: "/product", Agents: "/agents", Coverage: "/coverage", FAQ: "/faq" } as const;
const HEADER = 64;
const slugify = (t: string) =>
  t
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/** The target sits just below the sticky header, or the page is scrolled to its end with the target below the header. */
async function expectLanded(page: Page, target: Locator) {
  await expect
    .poll(
      async () => {
        const top = await target.evaluate((el) => el.getBoundingClientRect().top);
        const atEnd = await page.evaluate(() => Math.ceil(window.scrollY + window.innerHeight) >= document.documentElement.scrollHeight - 1);
        return Math.abs(top - HEADER) <= 2 || (atEnd && top >= HEADER - 2);
      },
      { timeout: 5_000 },
    )
    .toBe(true);
}

/** Waits until the homepage's ScrollRouter is listening (it marks <html> once hydrated). */
const ready = (page: Page) => expect(page.locator("html")).toHaveAttribute("data-scroll-router", "ready");
const section = (page: Page, path: keyof typeof SECTIONS) => page.locator(`#${SECTIONS[path]}`);
const mark = async (page: Page) => {
  await ready(page);
  await page.evaluate(() => ((window as unknown as { __marker: number }).__marker = 1));
};
const marked = (page: Page) => page.evaluate(() => (window as unknown as { __marker?: number }).__marker);

async function scan(page: Page) {
  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "best-practice"]).analyze();
  return results.violations.map((v) => `${v.impact} ${v.id}: ${v.nodes.map((n) => n.target.join(" ")).slice(0, 5).join(", ")}`);
}

test.describe("nav scrolls on the homepage", () => {
  for (const [label, path] of Object.entries(NAV) as [keyof typeof NAV, keyof typeof SECTIONS][]) {
    test(`${label}: no reload, URL ${path}, section below the header, heading focused, aria-current`, async ({ page }) => {
      await page.goto("/");
      await mark(page);
      const link = page.getByRole("navigation", { name: "Main" }).getByRole("link", { name: label });
      await expect(link).toHaveAttribute("href", path);
      await link.click();
      await expect(page).toHaveURL(path);
      await expectLanded(page, section(page, path));
      expect(await marked(page)).toBe(1);
      await expect(section(page, path).locator("h2").first()).toBeFocused();
      await expect(link).toHaveAttribute("aria-current", "true");
    });
  }

  test("footer, announcement and calls to action scroll too; the waitlist focuses the email field", async ({ page }) => {
    await page.goto("/");
    await mark(page);
    await page.getByRole("contentinfo").getByRole("link", { name: "Coverage" }).click();
    await expect(page).toHaveURL("/coverage");
    await expectLanded(page, section(page, "/coverage"));

    await page.getByRole("complementary", { name: "Announcement" }).getByRole("link", { name: /Join the waitlist/ }).click();
    await expect(page).toHaveURL("/waitlist");
    await expectLanded(page, section(page, "/waitlist"));
    await expect(page.locator('#waitlist input[type="email"]')).toBeFocused();

    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await page.locator("main").getByRole("link", { name: "Read how it works" }).first().click();
    await expect(page).toHaveURL("/product");
    await expectLanded(page, section(page, "/product"));
    expect(await marked(page)).toBe(1);
  });

  test("scrolling moves the underline but never the URL", async ({ page }) => {
    await page.goto("/");
    await page.locator("#coverage").scrollIntoViewIfNeeded();
    await page.evaluate(() => window.scrollTo({ top: document.getElementById("coverage")!.getBoundingClientRect().top + window.scrollY - 64, behavior: "instant" }));
    await expect(page.getByRole("navigation", { name: "Main" }).getByRole("link", { name: "Coverage" })).toHaveAttribute("aria-current", "true");
    await expect(page).toHaveURL("/");
  });

  test("with reduced motion the jump has no animation", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await ready(page);
    await page.getByRole("navigation", { name: "Main" }).getByRole("link", { name: "FAQ" }).click();
    // Synchronously after the click: already there.
    const top = await page.evaluate(() => document.getElementById("faq")!.getBoundingClientRect().top);
    expect(Math.abs(top - HEADER)).toBeLessThanOrEqual(2);
  });

  test("without reduced motion it scrolls smoothly", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto("/");
    await ready(page);
    const mid = await page.evaluate(
      () =>
        new Promise<number>((resolve) => {
          (document.querySelector('nav[aria-label="Main"] a[href="/faq"]') as HTMLElement).click();
          requestAnimationFrame(() => requestAnimationFrame(() => resolve(document.getElementById("faq")!.getBoundingClientRect().top)));
        }),
    );
    expect(mid).toBeGreaterThan(HEADER + 50);
    await expectLanded(page, page.locator("#faq"));
  });
});

test.describe("mobile menu", () => {
  test.use({ viewport: { width: 390, height: 844 } });
  test("closes, then scrolls to the section and pushes the path", async ({ page }) => {
    await page.goto("/");
    await mark(page);
    await page.getByRole("button", { name: "Open menu" }).click();
    const menu = page.getByRole("dialog", { name: "Menu" });
    await menu.getByRole("link", { name: "Agents" }).click();
    await expect(menu).toBeHidden();
    await expect(page).toHaveURL("/agents");
    await expectLanded(page, page.locator("#agents"));
    expect(await marked(page)).toBe(1);
    await expect(page.locator("#agents h2").first()).toBeFocused();
  });
});

test.describe("direct loads and history", () => {
  for (const path of PATHS) {
    test(`${path} renders the homepage and lands on its section`, async ({ page }) => {
      const res = await page.goto(path);
      expect(res?.status()).toBe(200);
      await expect(page).toHaveURL(path);
      await expect(page).toHaveTitle(V6_TITLE);
      await expect(page.locator("h1")).toHaveCount(1);
      await expectLanded(page, section(page, path));
    });
  }

  test("/how-it-works lands on the same section and shows /product, with no extra history entry", async ({ page }) => {
    await page.goto("/how-it-works");
    await expect(page).toHaveURL("/product");
    expect(await page.evaluate(() => history.length)).toBe(2);
    await expectLanded(page, page.locator("#product"));
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `${SITE}/`);
  });

  test("Product in the nav, mobile menu and footer; the section keeps its pill and H2; the hero button keeps its text", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("navigation", { name: "Main" }).getByRole("link", { name: "Product", exact: true })).toHaveAttribute("href", "/product");
    await expect(page.getByRole("contentinfo").getByRole("link", { name: "Product", exact: true })).toHaveAttribute("href", "/product");
    await expect(page.getByRole("dialog", { name: "Menu", includeHidden: true }).getByRole("link", { name: "Product", exact: true, includeHidden: true })).toHaveAttribute("href", "/product");
    await expect(page.getByRole("link", { name: "How it works", exact: true })).toHaveCount(0);
    await expect(page.locator("#product").getByText("How it works", { exact: true })).toBeVisible();
    await expect(page.locator("#product h2")).toHaveText("A record your engineers can check");
    await expect(page.locator("main").getByRole("link", { name: "Read how it works" }).first()).toHaveAttribute("href", "/product");
    // The "In the product" band moved aside for the section id.
    await expect(page.locator("#in-the-product")).toHaveCount(1);
    await expect(page.locator("[id=product]")).toHaveCount(1);
  });

  test("/waitlist focuses the email field", async ({ page }) => {
    await page.goto("/waitlist");
    await expect(page.locator('#waitlist input[type="email"]')).toBeFocused();
  });

  test("Back and Forward return to the previous section", async ({ page }) => {
    await page.goto("/agents");
    await expectLanded(page, page.locator("#agents"));
    await mark(page);
    await page.getByRole("navigation", { name: "Main" }).getByRole("link", { name: "FAQ" }).click();
    await expect(page).toHaveURL("/faq");
    await expectLanded(page, page.locator("#faq"));
    await page.goBack();
    await expect(page).toHaveURL("/agents");
    await expectLanded(page, page.locator("#agents"));
    await page.goForward();
    await expect(page).toHaveURL("/faq");
    await expectLanded(page, page.locator("#faq"));
    expect(await marked(page)).toBe(1);
  });

  test("the router keeps Next's pathname in step, and Back from docs restores the reading position", async ({ page }) => {
    await page.goto("/");
    await mark(page);
    await page.getByRole("navigation", { name: "Main" }).getByRole("link", { name: "Coverage" }).click();
    await expect(page).toHaveURL("/coverage");
    // Next's own history entry marker is kept on the pushed entry.
    expect(await page.evaluate(() => !!(history.state as { __NA?: boolean } | null)?.__NA)).toBe(true);
    await page.evaluate(() => window.scrollBy({ top: 300, behavior: "instant" }));
    const y = await page.evaluate(() => window.scrollY);
    // A programmatic click, so Playwright does not scroll the footer link into view first.
    await page.getByRole("contentinfo").getByRole("link", { name: "Privacy", exact: true }).evaluate((a: HTMLElement) => a.click());
    await expect(page).toHaveURL("/privacy");
    await page.goBack();
    await expect(page).toHaveURL("/coverage");
    await expect.poll(() => page.evaluate(() => Math.round(window.scrollY))).toBe(Math.round(y));
  });

  test("/faq?q=<slug> opens that answer and scrolls to it", async ({ page }) => {
    const f = FAQ_V6[3];
    const slug = slugify(f.q);
    await page.goto(`/faq?q=${slug}`);
    const row = page.locator(`[data-faq-slug="${slug}"]`);
    await expect(row.getByRole("button", { name: f.q })).toHaveAttribute("aria-expanded", "true");
    await expect(row.getByText(f.a, { exact: true })).toBeVisible();
    await expectLanded(page, row);
    // Each answer's own link uses the same form, never a hash.
    await expect(row.getByRole("link", { name: `Link to "${f.q}"` })).toHaveAttribute("href", `/faq?q=${slug}`);
  });

  test("old hash links end on their path without a new history entry", async ({ context }) => {
    const OLD = { agents: "/agents", faq: "/faq", "change-review": "/agents", "failure-investigation": "/agents", evidence: "/product", "how-it-works": "/product", book: "/waitlist" } as const;
    for (const [hash, path] of Object.entries(OLD)) {
      const page = await context.newPage();
      await page.goto(`/#${hash}`);
      await expect(page).toHaveURL(path);
      expect(await page.evaluate(() => history.length)).toBe(2);
      await expectLanded(page, section(page, path as keyof typeof SECTIONS));
      await page.close();
    }
  });
});

test.describe("from other pages", () => {
  for (const [label, path] of Object.entries(NAV) as [keyof typeof NAV, keyof typeof SECTIONS][]) {
    test(`docs nav "${label}" loads the homepage on its section`, async ({ page }) => {
      await page.goto("/docs");
      await page.getByRole("navigation", { name: "Main" }).getByRole("link", { name: label }).click();
      await expect(page).toHaveURL(path);
      await expect(page).toHaveTitle(V6_TITLE);
      await expectLanded(page, section(page, path));
    });
  }

  test("legal and 404 pages link to the section paths", async ({ page }) => {
    for (const p of ["/privacy", "/no-such-page"]) {
      await page.goto(p);
      await page.getByRole("contentinfo").getByRole("link", { name: "Agents" }).click();
      await expect(page).toHaveURL("/agents");
      await expectLanded(page, page.locator("#agents"));
    }
  });
});

test.describe("links and SEO", () => {
  test("no # in nav, footer, announcement or call-to-action links", async ({ page }) => {
    for (const p of ["/", "/docs", "/privacy"]) {
      await page.goto(p);
      const hrefs = await page
        .locator('header a, dialog a, footer a, aside[aria-label="Announcement"] a, main section[data-band="dark"] a, main a[class*="rounded-v6-button"]')
        .evaluateAll((els) => els.map((e) => e.getAttribute("href") ?? ""));
      expect(hrefs.length).toBeGreaterThan(5);
      expect(hrefs.filter((h) => h.includes("#")), p).toEqual([]);
    }
  });

  test("the homepage has the full sections (SECTION_PAGES is overridden)", async ({ page, request }) => {
    await page.goto("/");
    await expect(page.locator("#agents li")).toHaveCount(AGENTS.length);
    await expect(page.locator("#faq h3 button")).toHaveCount(FAQ_V6.length);
    await expect(page.locator("#product h3").first()).toBeVisible();
    await expect(page.locator("#coverage table, #coverage [role=table]").first()).toBeVisible();
    await expect(page.getByRole("link", { name: /All agents|Full coverage|See all questions|How Crado works →/ })).toHaveCount(0);
    expect((await request.get("/section-pages/agents")).status()).toBe(404);
  });

  test("every section path has canonical / and the homepage metadata and JSON-LD", async ({ page }) => {
    await page.goto("/");
    const homeDescription = await page.locator('meta[name="description"]').getAttribute("content");
    for (const p of ["/", ...PATHS]) {
      await page.goto(p);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `${SITE}/`);
      await expect(page.locator('meta[property="og:url"]')).toHaveAttribute("content", `${SITE}/`);
      await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", homeDescription!);
      const types = (await page.locator('script[type="application/ld+json"]').allTextContents()).map((t) => JSON.parse(t)["@type"]);
      expect(types).toContain("FAQPage");
    }
  });

  test("sitemap lists only real pages; llms.txt lists the homepage", async ({ request }) => {
    const sitemap = await (await request.get("/sitemap.xml")).text();
    const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    expect(locs[0]).toBe(`${SITE}/`);
    for (const p of PATHS) expect(locs).not.toContain(`${SITE}${p}`);
    for (const loc of locs) expect((await request.get(loc.replace(SITE, ""))).status(), loc).toBe(200);
    const llms = await (await request.get("/llms.txt")).text();
    expect(llms).toContain(`- [Home](${SITE}/)`);
    for (const p of PATHS) expect(llms).not.toContain(`${SITE}${p})`);
  });
});

test.describe("accessibility", () => {
  for (const width of [1440, 834, 390]) {
    test(`axe finds no violations at ${width}px, on / and after a scroll to /faq`, async ({ page }) => {
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/");
      expect(await scan(page)).toEqual([]);
      await page.goto("/faq?q=" + slugify(FAQ_V6[2].q));
      await expectLanded(page, page.locator(`[data-faq-slug="${slugify(FAQ_V6[2].q)}"]`));
      expect(await scan(page)).toEqual([]);
    });
  }
});
