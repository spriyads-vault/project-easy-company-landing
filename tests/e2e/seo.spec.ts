import { expect, test } from "@playwright/test";

const DOCS = ["/docs", "/docs/concepts", "/docs/evaluation", "/docs/reference", "/docs/trust", "/docs/changelog"];

test("robots.txt matches the hand-off", async ({ request }) => {
  const res = await request.get("/robots.txt");
  expect(res.status()).toBe(200);
  const body = await res.text();
  expect(body).toContain("User-Agent: *");
  expect(body).toContain("Allow: /");
  expect(body).toContain("Sitemap: https://www.crado.io/sitemap.xml");
});

test("sitemap lists exactly the public routes and each resolves", async ({ request }) => {
  const xml = await (await request.get("/sitemap.xml")).text();
  const locs = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
  expect(locs).toEqual(["https://www.crado.io/", ...DOCS.map((p) => `https://www.crado.io${p}`)]);
  expect(xml).toContain("2026-10-08");
  for (const loc of locs) {
    const res = await request.get(new URL(loc).pathname);
    expect(res.status(), loc).toBe(200);
  }
});

test("llms.txt, site.webmanifest and icons are served", async ({ request }) => {
  const llms = await request.get("/llms.txt");
  expect(llms.status()).toBe(200);
  expect(await llms.text()).toContain("[Trust](https://www.crado.io/docs/trust)");
  const manifest = await (await request.get("/site.webmanifest")).json();
  expect(manifest.background_color).toBe("#0A0A0B");
  for (const path of ["/favicon.ico", "/icon.svg", "/apple-touch-icon.png", "/icon-192.png", "/icon-512.png", "/og/crado-og-1200x630.png", "/assets/crado-logo.png", "/assets/nvidia-inception-badge.png"]) {
    expect((await request.get(path)).status(), path).toBe(200);
  }
});

test("redirect map returns 301", async ({ request }) => {
  for (const [from, to] of [
    ["/docs/core-concepts", "/docs/concepts"],
    ["/docs/get-started", "/docs"],
  ]) {
    const res = await request.get(from, { maxRedirects: 0 });
    expect(res.status(), from).toBe(301);
    expect(res.headers()["location"]).toBe(to);
  }
});

test("pages that are not in this build return 404", async ({ request }) => {
  expect((await request.get("/docs/guides")).status()).toBe(404);
  expect((await request.get("/no-such-page")).status()).toBe(404);
});

test("404 page follows the design", async ({ page }) => {
  await page.goto("/no-such-page");
  await expect(page).toHaveTitle("Page not found | Crado");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("This page isn't here.");
  await expect(page.locator('meta[name="robots"]').first()).toHaveAttribute("content", /noindex/);
  const recovery = page.getByRole("navigation", { name: "Recovery" });
  await expect(recovery.getByRole("link", { name: "Go to the home page" })).toHaveAttribute("href", "/");
  await expect(recovery.getByRole("link", { name: "Read the docs" })).toHaveAttribute("href", "/docs");
});

test("home and docs pages carry canonical, Open Graph, Twitter and robots tags", async ({ page }) => {
  for (const path of ["/", ...DOCS]) {
    await page.goto(path);
    const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
    expect(canonical, path).toBe(path === "/" ? "https://www.crado.io/" : `https://www.crado.io${path}`);
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute("content", canonical!);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", "https://www.crado.io/og/crado-og-1200x630.png");
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute("content", "summary_large_image");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /index, follow/);
    const description = await page.locator('meta[name="description"]').getAttribute("content");
    expect(description!.length, path).toBeLessThanOrEqual(160);
  }
});
