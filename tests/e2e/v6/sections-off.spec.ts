import { expect, test } from "@playwright/test";
import { AGENTS, FAQ_V6 } from "../../../src/content/home-v6";

// v6 on, NEXT_PUBLIC_FF_SECTION_PAGES off (SCRUM-310): the section pages do not exist and the homepage is as on main.

test("section page paths are 404s", async ({ request }) => {
  for (const p of ["/how-it-works", "/agents", "/coverage", "/faq", "/waitlist", "/section-pages/agents/opengraph-image/card"]) expect((await request.get(p)).status(), p).toBe(404);
});

test("homepage keeps the anchor links, the full sections and FAQPage", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("navigation", { name: "Main" }).getByRole("link", { name: "Agents" })).toHaveAttribute("href", "#agents");
  await expect(page.getByRole("complementary", { name: "Announcement" }).getByRole("link", { name: /Join the waitlist/ })).toHaveAttribute("href", "#waitlist");
  await expect(page.locator("#agents li")).toHaveCount(AGENTS.length);
  await expect(page.locator("#faq h3 button")).toHaveCount(FAQ_V6.length);
  await expect(page.getByRole("link", { name: /All agents|Full coverage|See all questions|How Crado works →/ })).toHaveCount(0);
  const types = (await page.locator('script[type="application/ld+json"]').allTextContents()).map((t) => JSON.parse(t)["@type"]);
  expect(types).toContain("FAQPage");
  await page.goto("/#agents");
  await page.waitForTimeout(300);
  await expect(page).toHaveURL(/\/#agents$/);
});

test("sitemap and llms.txt do not list the section pages", async ({ request }) => {
  const sitemap = await (await request.get("/sitemap.xml")).text();
  const llms = await (await request.get("/llms.txt")).text();
  for (const p of ["/how-it-works", "/agents", "/coverage", "/faq", "/waitlist"]) {
    expect(sitemap).not.toContain(`crado.io${p}<`);
    expect(llms).not.toContain(`crado.io${p})`);
  }
});

test("scroll sections off (SCRUM-314): no scroll router, #how keeps its id, nav clicks stay hash anchors", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("section#how")).toHaveCount(1);
  await expect(page.locator("section#how-it-works")).toHaveCount(0);
  await expect(page.locator("html")).not.toHaveAttribute("data-scroll-router", /.*/);
  await page.getByRole("navigation", { name: "Main" }).getByRole("link", { name: "FAQ" }).click();
  await expect(page).toHaveURL(/\/#faq$/);
});
