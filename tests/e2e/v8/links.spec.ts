import { expect, test, type Page } from "@playwright/test";
import { BOOKING_URL, LINKEDIN_URL } from "../../../src/lib/site";

// Every header and footer link on the v8 homepage, and on the pages that keep the v3 shell, resolves: paths return 200
// and every #anchor exists on the page it points to. No page is left without a link to it.

async function links(page: Page, scope: string) {
  return page.locator(`${scope} a[href]`).evaluateAll((els) => [...new Set(els.map((e) => e.getAttribute("href")!))]);
}

async function checkHrefs(page: Page, hrefs: string[], base: string) {
  const request = page.context().request;
  for (const href of hrefs) {
    if (href.startsWith("mailto:")) {
      expect(href).toMatch(/^mailto:hello@crado\.io(\?subject=\w+)?$/);
      continue;
    }
    if (/^https?:/.test(href)) {
      expect([LINKEDIN_URL, BOOKING_URL], href).toContain(href);
      continue;
    }
    const url = new URL(href, `http://x${base}`);
    const res = await request.get(url.pathname);
    expect(res.status(), href).toBe(200);
    if (url.hash) {
      const target = url.pathname === base ? page : await page.context().newPage();
      if (target !== page) await target.goto(url.pathname);
      await expect(target.locator(`[id="${decodeURIComponent(url.hash.slice(1))}"]`), href).toHaveCount(1);
      if (target !== page) await target.close();
    }
  }
}

test("v8 header and footer links all resolve", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const header = await links(page, "header");
  const footer = await links(page, "footer");
  for (const must of ["#product-graph", "#engine", "#workflow", "/docs", "#faq", "#sample-case", "#get-started"]) expect(header).toContain(must);
  for (const must of ["/privacy", "/terms", "/docs", "/docs#observed", "/docs#known", "/docs#inferred", "/docs#missing", "/docs#deterministic-arithmetic", "/docs#coverage", "/docs#security"]) {
    expect(footer).toContain(must);
  }
  await checkHrefs(page, [...header, ...footer], "/");
});

test("v8 header: centre links on wide screens, the two pills, and no sign-in", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: "Primary" });
  for (const name of ["Product Graph", "Verification Engine", "Revision Loop", "Method & Coverage", "FAQ", "Sample case", "Start a workspace"]) {
    await expect(nav.getByRole("link", { name, exact: true })).toBeVisible();
  }
  await expect(nav.getByRole("link", { name: /sign in/i })).toHaveCount(0);
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(nav.getByRole("link", { name: "Start a workspace" })).toBeVisible();
});

test("/docs/changelog stays reachable from the docs navigation", async ({ page }) => {
  await page.goto("/docs");
  await expect(page.locator('a[href^="/docs/changelog"]').first()).toBeAttached();
});

for (const path of ["/docs", "/docs/changelog", "/privacy", "/terms"]) {
  test(`${path} keeps working, and its header and footer links resolve against the v8 homepage`, async ({ page }) => {
    const res = await page.goto(path);
    expect(res?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    // The v8 shell: announcement bar, v8 header and footer (not the old v3 nav or "PILOT PROGRAMME" strip).
    await expect(page.locator("[data-announcement]")).toBeVisible();
    await expect(page.getByRole("navigation", { name: "Primary" })).toBeVisible();
    await expect(page.getByText("PILOT PROGRAMME")).toHaveCount(0);
    await expect(page.getByRole("navigation", { name: "Main" })).toHaveCount(0);
    const hrefs = [...(await links(page, "[data-announcement]")), ...(await links(page, "header")), ...(await links(page, "footer"))];
    await checkHrefs(page, hrefs, path);
  });
}

test("an unknown page is a 404 with the not-found page in the v8 shell", async ({ page }) => {
  const res = await page.goto("/no-such-page");
  expect(res?.status()).toBe(404);
  await expect(page.locator("h1")).toHaveText("This page isn't here.");
  await expect(page.getByRole("navigation", { name: "Primary" })).toBeVisible();
});

test("docs use the terracotta accent, not the v3 blue, and mark Method & Coverage as current", async ({ page }) => {
  await page.goto("/docs");
  const accent = await page.evaluate(() => getComputedStyle(document.querySelector("[data-site-v8]")!).getPropertyValue("--color-accent").trim());
  expect(accent.toLowerCase()).not.toContain("2e4bff");
  // Inline docs links are underlined in the accent.
  const underline = await page.locator("article p a").first().evaluate((a) => getComputedStyle(a).textDecorationColor);
  expect(underline).toBe("rgb(171, 81, 46)");
  await expect(page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Method & Coverage" })).toHaveAttribute("aria-current", "page");
});

test("the homepage announcement bar links to the waitlist and slides away on scroll", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const bar = page.locator("[data-announcement] a");
  await expect(bar).toHaveAttribute("href", "#get-started");
  await expect(bar).toBeInViewport();
  await page.evaluate(() => scrollTo(0, 1200));
  await expect(bar).not.toBeInViewport();
  await expect(page.getByRole("navigation", { name: "Primary" })).toBeInViewport();
});

test("sitemap and robots are unchanged and every sitemap URL resolves", async ({ request }) => {
  const robots = await (await request.get("/robots.txt")).text();
  expect(robots).toContain("Sitemap: https://www.crado.io/sitemap.xml");
  const xml = await (await request.get("/sitemap.xml")).text();
  const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
  expect(urls).toEqual(["/", "/docs", "/docs/concepts", "/docs/evaluation", "/docs/reference", "/docs/trust", "/docs/changelog"].map((p) => `https://www.crado.io${p}`));
  for (const u of urls) expect((await request.get(new URL(u).pathname)).status(), u).toBe(200);
  expect((await request.get("/site.webmanifest")).status()).toBe(200);
});
