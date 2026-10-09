import { expect, test, type Page } from "@playwright/test";
import { CAPABILITIES, statusOf } from "../../../src/content/capability-status";
import { AGENTS, COVERAGE, FAQ_V6, V6_DESCRIPTION, V6_H1, V6_TITLE } from "../../../src/content/home-v6";

// Homepage v6, flag on (playwright.config.ts project "chromium-v6").

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
  "copilot",
  "magic",
  "root cause",
  "autonomous",
  "runs itself",
  "only tool",
  "all-in-one",
];

async function settle(page: Page) {
  await page.waitForLoadState("networkidle");
  await page.evaluate(() => document.fonts.ready);
}

test.describe("v6 homepage", () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
  });

  test("metadata, canonical and share images follow the v6 copy", async ({ page, request }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(V6_TITLE);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", V6_DESCRIPTION);
    expect(V6_DESCRIPTION.length).toBeLessThanOrEqual(160);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://www.crado.io/");
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute("content", "https://www.crado.io/");
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", V6_TITLE);
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute("content", "summary_large_image");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /index, follow/);
    await expect(page.locator('meta[property="og:image:alt"]')).toHaveAttribute("content", `Crado: ${V6_H1}`);
    for (const sel of ['meta[property="og:image"]', 'meta[name="twitter:image"]']) {
      const url = new URL((await page.locator(sel).getAttribute("content"))!);
      const res = await request.get(url.pathname + url.search);
      expect(res.status(), sel).toBe(200);
      expect(res.headers()["content-type"]).toBe("image/png");
      const png = await res.body();
      expect([png.readUInt32BE(16), png.readUInt32BE(20)], sel).toEqual([1200, 630]);
    }
    await expect(page.locator('meta[property="og:image:width"]')).toHaveAttribute("content", "1200");
  });

  test("JSON-LD: Organization, WebSite, SoftwareApplication, FAQPage and BreadcrumbList", async ({ page }) => {
    await page.goto("/");
    const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
    const data = blocks.map((b) => JSON.parse(b) as Record<string, unknown>);
    expect(data.map((d) => d["@type"])).toEqual(["Organization", "WebSite", "SoftwareApplication", "FAQPage", "BreadcrumbList"]);
    for (const d of data) expect(d["@context"]).toBe("https://schema.org");
    const app = data[2];
    expect(app).not.toHaveProperty("aggregateRating");
    expect(app).not.toHaveProperty("offers");
    expect(app).not.toHaveProperty("review");
    expect(app).toMatchObject({ name: "Crado", applicationCategory: "BusinessApplication", operatingSystem: "Web", url: "https://www.crado.io/" });
    const faq = data[3] as { mainEntity: { name: string; acceptedAnswer: { text: string } }[] };
    expect(faq.mainEntity.map((q) => [q.name, q.acceptedAnswer.text])).toEqual(FAQ_V6.map((f) => [f.q, f.a]));
    // The visible FAQ says exactly what the JSON-LD says.
    for (const f of FAQ_V6) {
      await expect(page.getByRole("button", { name: f.q })).toBeVisible();
      await expect(page.locator(`[role="region"]`, { hasText: f.a })).toHaveCount(1);
    }
    expect(data[4]).toMatchObject({ itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://www.crado.io/" }] });
    expect(data[0]).toMatchObject({ name: "Crado", url: "https://www.crado.io/", logo: "https://www.crado.io/assets/crado-logo.png" });
  });

  test("one h1 and a heading order with no skipped levels", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("h1")).toHaveText(V6_H1);
    const levels = await page.locator("main h1, main h2, main h3, main h4, footer h2, footer h3, footer h4").evaluateAll((els) =>
      els.filter((e) => (e as HTMLElement).offsetParent !== null).map((e) => Number(e.tagName[1])),
    );
    for (let i = 1; i < levels.length; i++) expect(levels[i] - levels[i - 1], `heading ${i}`).toBeLessThanOrEqual(1);
    await expect(page.locator('canvas[data-record-block="hero"]')).toHaveAttribute("aria-hidden", "true");
    await expect(page.locator("main#main")).toHaveCount(1);
    await expect(page.getByRole("link", { name: "Skip to content" })).toHaveAttribute("href", "#main");
  });

  test("statuses come from capability-status.ts", async ({ page }) => {
    await page.goto("/");
    const agentTags = await page.locator("#agents li [data-status]").allTextContents();
    expect(agentTags).toEqual(AGENTS.map((a) => statusOf(a.capability)));
    const coverageTags = await page.locator('#coverage [role="row"] [data-status]').allTextContents();
    expect(coverageTags).toEqual(COVERAGE.map((r) => statusOf(r.capability)));
    await expect(page.locator("#how")).toContainText(`Email, team chat and change tickets: ${CAPABILITIES.sourcesEmailChatTickets.status}.`);
  });

  test("nav links land 64px below the top", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Main" });
    for (const [label, id] of [
      ["How it works", "how"],
      ["Agents", "agents"],
      ["Coverage", "coverage"],
      ["FAQ", "faq"],
    ]) {
      await nav.getByRole("link", { name: label }).click();
      await expect.poll(() => page.evaluate((i) => Math.round(document.getElementById(i)!.getBoundingClientRect().top), id), { message: id }).toBe(64);
      await expect(nav.getByRole("link", { name: label })).toHaveAttribute("aria-current", "true");
    }
  });

  test("old v3 anchors land on the nearest v6 section", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    for (const [hash, section] of [
      ["change-review", "agents"],
      ["failure-investigation", "product"],
      ["evidence", "how"],
      ["how-it-works", "how"],
      ["use-cases", "coverage"],
      ["join", "waitlist"],
    ]) {
      await page.goto(`/#${hash}`);
      await settle(page);
      const { top, atEnd } = await page.evaluate((id) => {
        const el = document.documentElement;
        return { top: Math.round(document.getElementById(id)!.getBoundingClientRect().top), atEnd: Math.ceil(scrollY + innerHeight) >= el.scrollHeight };
      }, section);
      // Lands 64px below the top, unless the page ends first (the waitlist sits in the footer).
      if (atEnd) expect(top, `${hash} → ${section}`).toBeLessThanOrEqual(900);
      else expect(Math.abs(top - 64), `${hash} → ${section} (${top})`).toBeLessThanOrEqual(1);
    }
  });

  test("announcement, footer and mobile menu go to #waitlist", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("link", { name: "Join the waitlist →" })).toHaveAttribute("href", "#waitlist");
    await expect(page.getByRole("navigation", { name: "Footer" }).getByRole("link", { name: "Join the waitlist" })).toHaveAttribute("href", "#waitlist");
    await page.setViewportSize({ width: 390, height: 844 });
    await page.getByRole("button", { name: "Open menu" }).click();
    const menu = page.getByRole("dialog", { name: "Menu" });
    await expect(menu).toBeVisible();
    await menu.getByRole("link", { name: "Join the waitlist" }).click();
    await expect(menu).toBeHidden();
    await expect.poll(() => page.evaluate(() => Math.round(document.getElementById("waitlist")!.getBoundingClientRect().top))).toBe(64);
    expect(new URL(page.url()).hash).toBe("#waitlist");
  });

  test("mobile menu traps focus, closes on Escape and returns focus", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await expect(page.getByRole("navigation", { name: "Main" })).toBeHidden();
    const open = page.getByRole("button", { name: "Open menu" });
    await open.focus();
    await page.keyboard.press("Enter");
    const menu = page.getByRole("dialog", { name: "Menu" });
    await expect(menu).toBeVisible();
    for (let i = 0; i < 10; i++) {
      await page.keyboard.press("Tab");
      expect(await page.evaluate(() => !!document.activeElement?.closest("dialog"))).toBe(true);
    }
    await page.keyboard.press("Escape");
    await expect(menu).toBeHidden();
    await expect(open).toBeFocused();
  });

  test("keyboard: nav, FAQ and waitlist are reachable in order", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    const order: string[] = [];
    for (let i = 0; i < 12; i++) {
      await page.keyboard.press("Tab");
      order.push(await page.evaluate(() => (document.activeElement?.textContent || document.activeElement?.getAttribute("aria-label") || "").trim()));
    }
    expect(order.slice(0, 9)).toEqual([
      "Skip to content",
      "Join the waitlist →",
      "Crado home",
      "How it works",
      "Agents",
      "Coverage",
      "FAQ",
      "Book a case review",
      "Book a case review",
    ]);
    // FAQ: Enter and Space toggle the answer.
    const q = page.getByRole("button", { name: FAQ_V6[1].q });
    await q.focus();
    await expect(q).toHaveAttribute("aria-expanded", "false");
    await page.keyboard.press("Enter");
    await expect(q).toHaveAttribute("aria-expanded", "true");
    await expect(page.getByText(FAQ_V6[1].a)).toBeVisible();
    await page.keyboard.press("Space");
    await expect(q).toHaveAttribute("aria-expanded", "false");
    await expect(page.getByText(FAQ_V6[1].a)).toBeHidden();
    // The first answer starts open.
    await expect(page.getByRole("button", { name: FAQ_V6[0].q })).toHaveAttribute("aria-expanded", "true");
    // Every focusable element shows a visible focus ring.
    const ring = await page.evaluate(() => {
      const el = document.activeElement as HTMLElement;
      const s = getComputedStyle(el);
      return [s.outlineStyle, s.outlineWidth];
    });
    expect(ring).toEqual(["solid", "2px"]);
  });

  test("links and anchors resolve", async ({ page, request }) => {
    await page.goto("/");
    const hrefs = await page.locator("a[href]").evaluateAll((as) => [...new Set(as.map((a) => a.getAttribute("href")!))]);
    for (const href of hrefs) {
      if (href.startsWith("#")) {
        expect(await page.locator(`[id="${href.slice(1)}"]`).count(), href).toBe(1);
      } else if (href.startsWith("/")) {
        const [path, hash] = href.split("#");
        const res = await request.get(path);
        expect(res.status(), href).toBe(200);
        if (hash) expect(await res.text(), href).toContain(`id="${hash}"`);
      } else {
        expect(href, href).toMatch(/^(https:\/\/(cal\.com\/crado-a7dbr4\/30min|www\.linkedin\.com\/company\/crado-io\/)|mailto:hello@crado\.io)$/);
      }
    }
    const how = page.getByRole("link", { name: "Read how it works" });
    await expect(how).toHaveCount(2);
    for (const l of await how.all()) await expect(l).toHaveAttribute("href", "/docs#how-it-works");
    await page.goto("/docs#how-it-works");
    await expect(page.locator("#how-it-works")).toHaveText("How Crado reaches a result");
  });

  test("logos: the Crado mark in the nav, the NVIDIA badge in the footer, nothing else", async ({ page }) => {
    await page.goto("/");
    const mark = page.locator("header [data-logo-mark]");
    await expect(mark).toHaveCount(1);
    const box = (await mark.boundingBox())!;
    expect([Math.round(box.width), Math.round(box.height)]).toEqual([28, 32]);
    expect(await mark.evaluate((e) => getComputedStyle(e).maskImage)).toContain("crado-logo.png");
    const imgs = await page.locator("img").evaluateAll((els) => els.map((e) => ({ src: e.getAttribute("src"), alt: e.getAttribute("alt"), inFooter: !!e.closest("footer"), w: (e as HTMLImageElement).naturalWidth, h: (e as HTMLImageElement).naturalHeight })));
    expect(imgs).toHaveLength(1);
    expect(imgs[0]).toMatchObject({ alt: "NVIDIA Inception program member", inFooter: true });
    expect(imgs[0].src).toContain("nvidia-inception-badge.png");
    const badge = (await page.locator("footer img").boundingBox())!;
    // Unaltered proportions (501×217).
    expect(Math.abs(badge.width / badge.height - 501 / 217)).toBeLessThan(0.03);
    await expect(page.locator("footer")).toContainText("Member of NVIDIA Inception");
  });

  test("copy: no banned words, no em dashes, no placeholders", async ({ page }) => {
    await page.goto("/");
    // Open every FAQ answer so its text is included.
    for (const b of await page.locator("#faq h3 button").all()) if ((await b.getAttribute("aria-expanded")) === "false") await b.click();
    const text = await page.evaluate(() => document.body.innerText + " " + document.title + " " + (document.querySelector('meta[name="description"]')?.getAttribute("content") ?? ""));
    for (const w of BANNED) expect(text.toLowerCase(), w).not.toContain(w.toLowerCase());
    expect(text).not.toContain("—");
    expect(text).not.toMatch(/\[CONSENT TEXT|lorem|TODO/i);
  });

  test("no horizontal scroll at any width", async ({ page }) => {
    for (const width of [320, 360, 390, 640, 641, 768, 834, 1023, 1024, 1280, 1440, 1920]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/");
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow, `${width}px`).toBe(0);
    }
  });
});

test.describe("v6 homepage with motion", () => {
  test("no console errors, no layout shift while loading and scrolling", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
    page.on("pageerror", (e) => errors.push(e.message));
    await page.addInitScript(() => {
      (window as unknown as { __cls: number }).__cls = 0;
      new PerformanceObserver((list) => {
        for (const e of list.getEntries() as unknown as { value: number; hadRecentInput: boolean }[]) if (!e.hadRecentInput) (window as unknown as { __cls: number }).__cls += e.value;
      }).observe({ type: "layout-shift", buffered: true });
    });
    for (const width of [1440, 834, 390]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/");
      await settle(page);
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 600) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 30));
        }
      });
      expect(await page.evaluate(() => (window as unknown as { __cls: number }).__cls), `CLS at ${width}`).toBe(0);
    }
    expect(errors).toEqual([]);
  });

  test("the hero block animates on screen and pauses off screen", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    const hero = page.locator('canvas[data-record-block="hero"]');
    const frame = () => hero.evaluate((c: HTMLCanvasElement) => c.toDataURL());
    const a = await frame();
    await page.waitForTimeout(300);
    expect(await frame()).not.toBe(a);
    await page.evaluate(() => window.scrollTo(0, 4000));
    await page.waitForTimeout(200);
    const b = await frame();
    await page.waitForTimeout(300);
    expect(await frame()).toBe(b);
  });

  test("reduced motion: the hero block holds still", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    const hero = page.locator('canvas[data-record-block="hero"]');
    await page.waitForTimeout(200);
    const a = await hero.evaluate((c: HTMLCanvasElement) => c.toDataURL());
    await page.waitForTimeout(400);
    expect(await hero.evaluate((c: HTMLCanvasElement) => c.toDataURL())).toBe(a);
    expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe("auto");
  });
});

test("llms.txt follows the v6 copy and generated statuses", async ({ request }) => {
  const res = await request.get("/llms.txt");
  expect(res.status()).toBe(200);
  const body = await res.text();
  expect(body).toContain(`> ${V6_H1}`);
  for (const a of AGENTS) expect(body).toContain(`- ${a.name} (${statusOf(a.capability)})`);
  expect(body).toContain("[Trust](https://www.crado.io/docs/trust)");
  expect(body).not.toContain("—");
});
