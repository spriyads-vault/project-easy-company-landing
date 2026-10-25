import { readFileSync } from "node:fs";
import { expect, test, type Page } from "@playwright/test";
import { statusOf } from "../../../src/content/capability-status";
import { CATEGORY_LABEL, FAQ_V8, HERO, LEDGER, SAMPLE, V8_DESCRIPTION, V8_H1, V8_TITLE } from "../../../src/content/home-v8";

// Homepage v8, flag on (playwright.config.ts project "chromium-v8").

const BANNED = [
  "AI-powered",
  "leverage",
  "unlock",
  "transform",
  "empower",
  "revolutionary",
  "cutting-edge",
  "game-changing",
  "seamless",
  "root cause",
  "guaranteed",
  "certified",
  "compliance state",
  "learn across",
  "Northfield",
  "Create a workspace",
  "workspace is on its way",
  "15-minute",
  "15.109(c)",
  "in minutes",
];

async function reduced(page: Page) {
  await page.emulateMedia({ reducedMotion: "reduce" });
}

test.describe("v8 homepage", () => {
  test.beforeEach(async ({ page }) => reduced(page));

  test("renders the hero, every section in design order and one h1", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("h1")).toHaveText(V8_H1);
    await expect(page.getByText(HERO.eyebrow)).toBeVisible();
    const ids = await page.locator("main > section").evaluateAll((els) => els.map((e) => e.id));
    expect(ids).toEqual(["hero", "gap", "continuity", "workflows", "method", "capabilities", "faq", "start"]);
    await expect(page.locator("#sample-case")).toBeVisible();
    // Heading levels never skip.
    const levels = await page.locator("h1, h2, h3, h4").evaluateAll((els) => els.filter((e) => (e as HTMLElement).offsetParent !== null).map((e) => Number(e.tagName[1])));
    for (let i = 1; i < levels.length; i++) expect(levels[i] - levels[i - 1], `heading ${i}`).toBeLessThanOrEqual(1);
  });

  test("metadata, canonical and share images follow the v8 hero", async ({ page, request }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(V8_TITLE);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", V8_DESCRIPTION);
    expect(V8_DESCRIPTION.length).toBeLessThanOrEqual(160);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://www.crado.io/");
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute("content", "https://www.crado.io/");
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", V8_TITLE);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /index, follow/);
    await expect(page.locator('meta[property="og:image:alt"]')).toHaveAttribute("content", `Crado: ${V8_H1}`);
    for (const sel of ['meta[property="og:image"]', 'meta[name="twitter:image"]']) {
      const url = new URL((await page.locator(sel).getAttribute("content"))!);
      const res = await request.get(url.pathname + url.search);
      expect(res.status(), sel).toBe(200);
      const png = await res.body();
      expect([png.readUInt32BE(16), png.readUInt32BE(20)], sel).toEqual([1200, 630]);
    }
  });

  test("JSON-LD: Organization, WebSite, SoftwareApplication, FAQPage and BreadcrumbList; FAQ matches the page", async ({ page }) => {
    await page.goto("/");
    const data = (await page.locator('script[type="application/ld+json"]').allTextContents()).map((b) => JSON.parse(b) as Record<string, unknown>);
    expect(data.map((d) => d["@type"])).toEqual(["Organization", "WebSite", "SoftwareApplication", "FAQPage", "BreadcrumbList"]);
    expect(data[2]).not.toHaveProperty("aggregateRating");
    expect(data[2]).not.toHaveProperty("offers");
    expect(data[2]).toMatchObject({ description: V8_DESCRIPTION, url: "https://www.crado.io/" });
    const faq = data[3] as { mainEntity: { name: string; acceptedAnswer: { text: string } }[] };
    expect(faq.mainEntity.map((q) => [q.name, q.acceptedAnswer.text])).toEqual(FAQ_V8.map((f) => [f.q, f.a]));
    for (const f of FAQ_V8) {
      const item = page.locator("#faq details", { hasText: f.q });
      await item.locator("summary").click();
      await expect(item.getByText(f.a, { exact: true })).toBeVisible();
    }
  });

  test("copy: no banned words, no em dashes, sample case labelled, statuses from capability-status.ts", async ({ page }) => {
    await page.goto("/");
    const text = await page.locator("body").innerText();
    for (const word of BANNED) expect(text.toLowerCase(), word).not.toContain(word.toLowerCase());
    expect(text).not.toContain("—");
    expect(V8_TITLE + V8_DESCRIPTION).not.toContain("—");
    await expect(page.locator("#sample-case").getByText(SAMPLE.label, { exact: true })).toBeVisible();
    await expect(page.locator("main").getByText(SAMPLE.label, { exact: true })).toHaveCount(2);
    // Every ledger row shows exactly its capability's status.
    const rows = page.locator("#capabilities li");
    await expect(rows).toHaveCount(LEDGER.length);
    for (const [i, r] of LEDGER.entries()) await expect(rows.nth(i).locator("[data-status-tag]")).toHaveText(statusOf(r.capability));
    // Class A and BOM intake are on the roadmap.
    await expect(page.locator("#capabilities li", { hasText: "15.109(b)" }).locator("[data-status-tag]")).toHaveText(statusOf("fcc15109b"));
    await expect(page.locator("#start [data-status-tag]")).toHaveText(statusOf("bomIntake"));
  });

  test("capability filter shows one category at a time", async ({ page }) => {
    await page.goto("/");
    const group = page.getByRole("group", { name: "Filter capabilities" });
    await expect(group.getByRole("button", { name: "All" })).toHaveAttribute("aria-pressed", "true");
    for (const [key, label] of Object.entries(CATEGORY_LABEL)) {
      await group.getByRole("button", { name: label }).click();
      await expect(group.getByRole("button", { name: label })).toHaveAttribute("aria-pressed", "true");
      await expect(page.locator("#capabilities li")).toHaveCount(LEDGER.filter((r) => r.category === key).length);
    }
    await group.getByRole("button", { name: "All" }).click();
    await expect(page.locator("#capabilities li")).toHaveCount(LEDGER.length);
  });

  test("brand: the Crado mark and the unaltered NVIDIA Inception badge", async ({ page, request }) => {
    await page.goto("/");
    await expect(page.locator("header img").first()).toHaveAttribute("src", /crado-logo\.png/);
    const footer = page.locator("footer");
    await expect(footer.getByText("Member of NVIDIA Inception")).toBeVisible();
    const badge = footer.getByRole("img", { name: "NVIDIA Inception program member" });
    await expect(badge).toBeVisible();
    // Served as the original file (unoptimized), byte for byte.
    expect(await badge.getAttribute("src")).toBe("/assets/nvidia-inception-badge.png");
    const served = await (await request.get("/assets/nvidia-inception-badge.png")).body();
    expect(served.equals(readFileSync("public/assets/nvidia-inception-badge.png"))).toBe(true);
    await expect(footer).toContainText("© 2026 BloomX Analytica Limited");
  });

  for (const width of [390, 1024, 1440]) {
    test(`no horizontal scroll and no text overflowing its box at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/");
      await page.evaluate(() => document.fonts.ready);
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
      // Every piece of text sits inside each bordered or filled box around it (cards, chips, pills, inputs).
      const overflowing = await page.evaluate(() => {
        const out: string[] = [];
        const boxes = [...document.querySelectorAll<HTMLElement>("header *, main *, footer *")].filter((el) => {
          const cs = getComputedStyle(el);
          if (cs.display === "inline" || cs.display === "none" || el.closest("svg") || el.classList.contains("sr-only")) return false;
          return parseFloat(cs.borderTopWidth) > 0 || cs.boxShadow !== "none" || (cs.backgroundColor !== "rgba(0, 0, 0, 0)" && cs.backgroundColor !== "transparent");
        });
        for (const box of boxes) {
          const b = box.getBoundingClientRect();
          if (b.width === 0) continue;
          const walker = document.createTreeWalker(box, NodeFilter.SHOW_TEXT);
          for (let n = walker.nextNode(); n; n = walker.nextNode()) {
            const parent = n.parentElement!;
            // Skipped: screen-reader-only text, SVG text, closed FAQ answers and the off-screen honeypot.
            if (!n.textContent?.trim() || parent.closest(".sr-only, svg") || !parent.checkVisibility() || parent.closest("[aria-hidden='true'].absolute")) continue;
            const range = document.createRange();
            range.selectNodeContents(n);
            for (const r of range.getClientRects()) {
              if (r.width === 0) continue;
              if (r.left < b.left - 1 || r.right > b.right + 1 || r.top < b.top - 1 || r.bottom > b.bottom + 1) {
                out.push(`"${n.textContent.trim().slice(0, 40)}" outside ${box.tagName}.${box.className.toString().slice(0, 50)}`);
                break;
              }
            }
          }
        }
        return [...new Set(out)];
      });
      expect(overflowing).toEqual([]);
    });
  }

  test("old homepage anchors still land on a section", async ({ page }) => {
    await page.goto("/");
    for (const id of ["how-it-works", "use-cases", "change-review", "failure-investigation", "evidence", "agents", "join", "waitlist"]) {
      await expect(page.locator(`[id="${id}"]`), id).toHaveCount(1);
    }
  });

  test("llms.txt follows the v8 copy and statuses", async ({ request }) => {
    const txt = await (await request.get("/llms.txt")).text();
    expect(txt).toContain(`> ${V8_H1}`);
    expect(txt).toContain(`- FCC 15.109(b) Class A Evaluator (${statusOf("fcc15109b")})`);
    expect(txt).toContain(`- BOM intake: ${statusOf("bomIntake")}`);
    expect(txt).not.toContain("—");
  });
});

test.describe("v8 motion", () => {
  test("reduced motion: nothing is hidden or animating", async ({ page }) => {
    await reduced(page);
    await page.goto("/");
    expect(await page.evaluate(() => document.documentElement.hasAttribute("data-v8-motion"))).toBe(false);
    expect(await page.evaluate(() => document.getAnimations().filter((a) => a.playState === "running").length)).toBe(0);
    await expect(page.locator("#sample-case").getByText(SAMPLE.bench.text)).toBeVisible();
  });

  test("with motion: the hero diagram plays when it comes into view, and ends fully shown", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    expect(await page.evaluate(() => document.documentElement.hasAttribute("data-v8-motion"))).toBe(true);
    const root = page.locator(".v8-dz [data-anim-root]");
    await expect(root).toHaveClass(/v8-play/);
    await page.waitForTimeout(2200);
    const opacities = await root.locator('[data-a="fade"]').evaluateAll((els) => els.map((e) => getComputedStyle(e).opacity));
    expect(opacities.every((o) => o === "1")).toBe(true);
  });
});
