import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";
import { AGENTS, COVERAGE, FAQ_V6 } from "../../../src/content/home-v6";
import { SECTION_CLOSING_BODY, SECTION_CLOSING_H2, SECTION_PAGES_COPY, SECTION_SLUGS, SECTION_WAITLIST_TITLE } from "../../../src/content/section-pages";
import { CAPABILITIES } from "../../../src/content/capability-status";
import { ROLE_OPTIONS, WAITLIST_ERRORS } from "../../../src/lib/waitlist/schema";
import { humanPause, mockWaitlistApi } from "../helpers";

// Section pages with clean URLs (SCRUM-310): NEXT_PUBLIC_FF_HOMEPAGE_V6 and NEXT_PUBLIC_FF_SECTION_PAGES on
// (playwright.config.ts project "chromium-sections").

const SITE = "https://www.crado.io";
const PATHS = SECTION_SLUGS.map((s) => `/${s}`);
/** Every page with the v6 shell. */
const ALL = ["/", ...PATHS, "/docs", "/docs/concepts", "/docs/evaluation", "/docs/reference", "/docs/trust", "/docs/changelog", "/privacy", "/terms", "/no-such-page"];
const slugify = (t: string) =>
  t
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

async function jsonLdTypes(page: Page): Promise<string[]> {
  const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
  return blocks.flatMap((b) => {
    const d = JSON.parse(b);
    return d["@graph"] ? d["@graph"].map((n: { "@type": string }) => n["@type"]) : [d["@type"]];
  });
}

async function scan(page: Page) {
  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "best-practice"]).analyze();
  return results.violations.map((v) => `${v.impact} ${v.id}: ${v.nodes.map((n) => n.target.join(" ")).slice(0, 5).join(", ")}`);
}

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
});

test.describe("section pages", () => {
  for (const slug of SECTION_SLUGS) {
    const copy = SECTION_PAGES_COPY[slug];
    test(`/${slug}: H1, intro, closing, title, description, canonical, share image and breadcrumb`, async ({ page, request }) => {
      const res = await page.goto(`/${slug}`);
      expect(res?.status()).toBe(200);
      await expect(page).toHaveTitle(copy.title);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("h1")).toHaveText(copy.h1);
      await expect(page.getByText(copy.intro, { exact: true })).toBeVisible();
      await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", copy.description);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `${SITE}/${slug}`);
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /index, follow/);

      const closing = page.getByRole("heading", { level: 2, name: SECTION_CLOSING_H2 });
      if (slug === "waitlist") {
        // The form is the page: no closing block.
        await expect(closing).toHaveCount(0);
      } else {
        await expect(closing).toBeVisible();
        const band = page.locator("section", { has: closing });
        await expect(band.getByText(SECTION_CLOSING_BODY, { exact: true })).toBeVisible();
        await expect(band.getByRole("link")).toHaveCount(1);
        await expect(band.getByRole("link", { name: "Join the waitlist" })).toHaveAttribute("href", "/waitlist");
      }

      for (const prop of ['meta[property="og:image"]', 'meta[name="twitter:image"]']) {
        const url = (await page.locator(prop).getAttribute("content"))!;
        expect(url).toContain(`${SITE}/section-pages/${slug}/`);
        const img = await request.get(url.replace(SITE, ""));
        expect(img.status(), prop).toBe(200);
        expect(img.headers()["content-type"]).toBe("image/png");
      }

      const crumbs = JSON.parse((await page.locator('script[type="application/ld+json"]').first().textContent())!);
      expect(crumbs["@type"]).toBe("BreadcrumbList");
      expect(crumbs.itemListElement.map((i: { item: string }) => i.item)).toEqual([`${SITE}/`, `${SITE}/${slug}`]);
      expect(await jsonLdTypes(page)).toEqual(slug === "faq" ? ["BreadcrumbList", "FAQPage"] : ["BreadcrumbList"]);

      const levels = await page.locator("main h1, main h2, main h3, footer h2, footer h3").evaluateAll((els) =>
        els.filter((e) => (e as HTMLElement).offsetParent !== null).map((e) => Number(e.tagName[1])),
      );
      for (let i = 1; i < levels.length; i++) expect(levels[i] - levels[i - 1], `heading ${i}`).toBeLessThanOrEqual(1);
    });
  }

  test("the internal route redirects to the clean path", async ({ page }) => {
    await page.goto("/section-pages/agents");
    await expect(page).toHaveURL(/\/agents$/);
  });

  test("/how-it-works: the essay with its chart, the layer stack and the three beliefs", async ({ page }) => {
    await page.goto("/how-it-works");
    await expect(page.getByRole("img", { name: "Chart: the evidence gap" })).toBeVisible();
    for (const t of ["Your engineers", "Crado agents", "Crado rules engine", "Your product record"]) await expect(page.getByText(t, { exact: true })).toBeVisible();
    for (const t of ["Every change should arrive with its evidence.", "A record that follows the revision.", "Agents investigate. Engineers decide."])
      await expect(page.getByRole("heading", { name: t })).toBeVisible();
  });

  test("/agents: every agent, with its status from capability-status.ts", async ({ page }) => {
    await page.goto("/agents");
    await expect(page.locator("#agents li")).toHaveCount(AGENTS.length);
    for (const a of AGENTS) {
      const item = page.locator("#agents li", { has: page.getByRole("heading", { name: a.name }) });
      await expect(item.locator("[data-status]")).toHaveText(CAPABILITIES[a.capability].status);
    }
  });

  test("/coverage: the whole table, the distance note and the docs reference", async ({ page }) => {
    await page.goto("/coverage");
    await expect(page.getByRole("table", { name: "What Crado checks today" }).getByRole("row")).toHaveCount(COVERAGE.length + 1);
    await expect(page.getByText("Crado refuses a comparison when the test distance or detector does not match the limit.")).toBeVisible();
    await expect(page.getByRole("link", { name: /Regulatory coverage in the docs/ })).toHaveAttribute("href", "/docs/reference");
  });

  test("/faq: all six questions; FAQ 06 is the generated answer; each question has its own anchor", async ({ page }) => {
    await page.goto("/faq");
    const questions = page.getByRole("heading", { level: 2 }).getByRole("button");
    await expect(questions).toHaveCount(FAQ_V6.length);
    for (const f of FAQ_V6) await expect(page.locator(`[id="${slugify(f.q)}"]`)).toHaveCount(1);
    await page.getByRole("button", { name: FAQ_V6[5].q }).click();
    await expect(page.getByText(FAQ_V6[5].a)).toBeVisible();
    const ld = JSON.parse((await page.locator('script[type="application/ld+json"]').nth(1).textContent())!);
    expect(ld.mainEntity.map((e: { name: string }) => e.name)).toEqual(FAQ_V6.map((f) => f.q));
  });

  test("/faq#question opens that answer; the link button shares it", async ({ page, context }) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    const target = FAQ_V6[3];
    const id = slugify(target.q);
    await page.goto(`/faq#${id}`);
    const button = page.getByRole("button", { name: target.q });
    await expect(button).toHaveAttribute("aria-expanded", "true");
    await expect(page.getByText(target.a)).toBeVisible();
    await expect(page.locator(`[id="${id}"]`)).toBeInViewport();
    await expect(page.getByRole("button", { name: FAQ_V6[1].q })).toHaveAttribute("aria-expanded", "false");

    // From another question: the hash changes and that answer opens too.
    const other = FAQ_V6[4];
    await page.evaluate((h) => (window.location.hash = h), slugify(other.q));
    await expect(page.getByRole("button", { name: other.q })).toHaveAttribute("aria-expanded", "true");

    await page.getByRole("link", { name: `Copy link to "${target.q}"` }).click();
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(`http://localhost:3102/faq#${id}`);
  });

  test("/waitlist: one form (no footer waitlist), posting the existing source value", async ({ page }) => {
    const calls = await mockWaitlistApi(page);
    await page.goto("/waitlist");
    await expect(page.getByRole("form", { name: "Join the waitlist" })).toHaveCount(1);
    await expect(page.locator("footer #waitlist")).toHaveCount(0);
    await expect(page.locator("footer")).toBeVisible();
    const form = page.getByRole("form", { name: "Join the waitlist" });
    await form.getByLabel("Work email").fill("eng@acme.io");
    await form.getByLabel("Your role").selectOption(ROLE_OPTIONS[1].value);
    await humanPause(page);
    await form.getByRole("button", { name: "Join the waitlist" }).click();
    await expect(page.getByRole("status").filter({ hasText: "You're on the list." })).toBeVisible();
    expect(calls.step1).toHaveLength(1);
    expect(calls.step1[0].postDataJSON()).toMatchObject({ email: "eng@acme.io", source: "final_cta_inline" });
    // Success panel: no booking link; the optional step 2 opens in place.
    const main = page.locator("main");
    await expect(main.locator('a[href*="cal.com"]')).toHaveCount(0);
    await expect(main.getByText(/case review/i)).toHaveCount(0);
    await main.getByRole("button", { name: "Tell us about your product (optional)" }).click();
    await expect(page.getByRole("heading", { name: "Help us shape your pilot" })).toBeFocused();
  });

  for (const [name, status, body, message] of [
    ["rate limit", 429, { ok: false, error: WAITLIST_ERRORS.rateLimited }, "Too many attempts from this network. Try again in an hour."],
    ["server error", 500, { ok: false, error: WAITLIST_ERRORS.generic }, "Something went wrong. Try again, or email us."],
  ] as const) {
    test(`/waitlist: ${name} keeps the form and shows the message`, async ({ page }) => {
      await mockWaitlistApi(page, { step1Status: status, step1Body: body });
      await page.goto("/waitlist");
      const form = page.getByRole("form", { name: "Join the waitlist" });
      await form.getByLabel("Work email").fill("eng@acme.io");
      await form.getByLabel("Your role").selectOption(ROLE_OPTIONS[1].value);
      await humanPause(page);
      await form.getByRole("button", { name: "Join the waitlist" }).click();
      await expect(page.getByRole("status")).toContainText(message);
      await expect(form).toBeVisible();
    });
  }
});

test.describe("clean URLs", () => {
  test("no nav, menu, footer or announcement link contains #, on any page", async ({ page }) => {
    for (const path of ALL) {
      await page.goto(path);
      const hrefs = await page
        .locator('header a, nav[aria-label="Main"] a, nav[aria-label="Menu links"] a, dialog[aria-label="Menu"] a, footer a, aside[aria-label="Announcement"] a')
        .evaluateAll((els) => els.map((e) => e.getAttribute("href") ?? ""));
      expect(hrefs.length, path).toBeGreaterThan(10);
      expect(hrefs.filter((h) => h.includes("#")), path).toEqual([]);
    }
  });

  test("links go to the new paths; the current page is marked in the nav", async ({ page }) => {
    await page.goto("/docs");
    const nav = page.getByRole("navigation", { name: "Main" });
    for (const [label, href] of [["How it works", "/how-it-works"], ["Agents", "/agents"], ["Coverage", "/coverage"], ["FAQ", "/faq"]])
      await expect(nav.getByRole("link", { name: label })).toHaveAttribute("href", href);
    await expect(page.getByRole("complementary", { name: "Announcement" }).getByRole("link", { name: /Join the waitlist/ })).toHaveAttribute("href", "/waitlist");
    const footer = page.getByRole("navigation", { name: "Footer" });
    await expect(footer.getByRole("link", { name: "Join the waitlist" })).toHaveAttribute("href", "/waitlist");
    await expect(footer.getByRole("link", { name: "How it works" })).toHaveAttribute("href", "/how-it-works");
    await expect(footer.getByRole("link", { name: /case review/i })).toHaveCount(0);
    const cta = page.getByRole("banner").getByRole("link", { name: "Join the waitlist" });
    await expect(cta).toHaveAttribute("href", "/waitlist");
    await expect(cta).not.toHaveAttribute("target", /.+/);
    await expect(page.locator("footer").getByRole("heading", { name: SECTION_WAITLIST_TITLE })).toBeVisible();
    await expect(nav.locator("[aria-current]")).toHaveCount(0);

    for (const [path, label] of [["/how-it-works", "How it works"], ["/agents", "Agents"], ["/coverage", "Coverage"], ["/faq", "FAQ"]]) {
      await page.goto(path);
      await expect(nav.getByRole("link", { name: label })).toHaveAttribute("aria-current", "page");
      await expect(nav.locator("[aria-current]")).toHaveCount(1);
    }
  });

  test("mobile menu: section and waitlist links are paths; the menu closes on navigation", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await page.getByRole("button", { name: "Open menu" }).click();
    const menu = page.getByRole("navigation", { name: "Menu links" });
    const dialog = page.getByRole("dialog", { name: "Menu" });
    await expect(dialog.getByRole("link", { name: "Join the waitlist" })).toHaveAttribute("href", "/waitlist");
    await expect(dialog.getByRole("link", { name: "Join the waitlist" })).toHaveCount(1);
    await expect(dialog.getByText(/case review/i)).toHaveCount(0);
    await menu.getByRole("link", { name: "Coverage" }).click();
    await expect(page).toHaveURL(/\/coverage$/);
    await expect(page.getByRole("dialog", { name: "Menu" })).toBeHidden();
    await page.getByRole("button", { name: "Open menu" }).click();
    await expect(page.getByRole("navigation", { name: "Menu links" }).getByRole("link", { name: "Coverage" })).toHaveAttribute("aria-current", "page");
  });

  const OLD: [string, string][] = [
    ["how", "/how-it-works"],
    ["how-it-works", "/how-it-works"],
    ["evidence", "/how-it-works"],
    ["agents", "/agents"],
    ["change-review", "/agents"],
    ["failure-investigation", "/agents"],
    ["coverage", "/coverage"],
    ["use-cases", "/coverage"],
    ["faq", "/faq"],
    ["waitlist", "/waitlist"],
    ["join", "/waitlist"],
    ["book", "/waitlist"],
  ];
  for (const [hash, path] of OLD) {
    test(`/#${hash} ends on ${path}, without an extra history entry`, async ({ page }) => {
      await page.goto("/docs");
      await page.goto(`/#${hash}`);
      await expect(page).toHaveURL(new RegExp(`${path}$`));
      await expect(page.locator("h1")).toHaveText(SECTION_PAGES_COPY[path.slice(1) as keyof typeof SECTION_PAGES_COPY].h1);
      await page.goBack();
      await expect(page).toHaveURL(/\/docs$/);
    });
  }

  test("/#product stays on the homepage", async ({ page }) => {
    await page.goto("/#product");
    await page.waitForTimeout(300);
    await expect(page).toHaveURL(/\/#product$/);
  });

  test("no page links to cal.com or mentions a case review; no call to action contains #", async ({ page }) => {
    const CTA_TEXT = /Join the waitlist|Read how it works|How Crado works|All agents|Full coverage|See all questions|Book|Regulatory coverage in the docs|Go to homepage|Read the docs/;
    for (const path of ALL) {
      await page.goto(path);
      const links = await page.locator("a").evaluateAll((els) => els.map((e) => ({ href: e.getAttribute("href") ?? "", text: (e.textContent ?? "").trim() })));
      expect(links.filter((l) => /cal\.com/i.test(l.href)), path).toEqual([]);
      expect(links.filter((l) => CTA_TEXT.test(l.text) && l.href.includes("#")), path).toEqual([]);
      expect(await page.locator("body").innerText(), path).not.toMatch(/case review/i);
      await expect(page.locator("#book"), path).toHaveCount(0);
    }
  });
});

test.describe("homepage teasers", () => {
  test("order kept; How it works, Agents, Coverage and FAQ are teasers with links", async ({ page }) => {
    await page.goto("/");
    const labels = await page.locator("main > section").evaluateAll((els) => els.map((e) => e.getAttribute("data-screen-label")));
    expect(labels).toEqual(["Hero", "Commitments", "Essay", "How it works", "In the product", "Agents", "Coverage", "Commitment cards", "FAQ", "Closing"]);

    const hero = page.locator('section[data-screen-label="Hero"]');
    await expect(hero.getByRole("link")).toHaveCount(2);
    await expect(hero.getByRole("link", { name: "Join the waitlist" })).toHaveAttribute("href", "/waitlist");
    await expect(hero.getByRole("link", { name: "Read how it works" })).toHaveAttribute("href", "/how-it-works");
    const closing = page.locator('section[data-screen-label="Closing"]');
    await expect(closing.getByRole("heading", { name: SECTION_CLOSING_H2 })).toBeVisible();
    await expect(closing.getByText(SECTION_CLOSING_BODY, { exact: true })).toBeVisible();
    await expect(closing.getByRole("link")).toHaveCount(1);
    await expect(closing.getByRole("link", { name: "Join the waitlist" })).toHaveAttribute("href", "/waitlist");

    await expect(page.getByRole("img", { name: "Chart: the evidence gap" })).toBeVisible();
    await expect(page.locator("#how").getByText("Your product record")).toHaveCount(0);
    await expect(page.locator("#how").getByRole("link", { name: "How Crado works →" })).toHaveAttribute("href", "/how-it-works");

    const statuses = await page.locator("#agents li [data-status]").allTextContents();
    expect(statuses).toEqual(["LIVE", "ROADMAP", "ROADMAP"]);
    await expect(page.locator("#agents").getByRole("link", { name: "All agents →" })).toHaveAttribute("href", "/agents");

    const rows = page.getByRole("table", { name: "What Crado checks today" }).getByRole("row");
    await expect(rows).toHaveCount(1 + COVERAGE.filter((r) => CAPABILITIES[r.capability].status === "LIVE").length);
    await expect(page.locator("#coverage").getByRole("link", { name: "Full coverage →" })).toHaveAttribute("href", "/coverage");

    await expect(page.locator("#faq h3 button")).toHaveCount(3);
    await expect(page.locator("#faq").getByRole("link", { name: "See all questions →" })).toHaveAttribute("href", "/faq");
  });

  test("homepage JSON-LD: SoftwareApplication stays, FAQPage moves to /faq", async ({ page }) => {
    await page.goto("/");
    expect(await jsonLdTypes(page)).toEqual(["Organization", "WebSite", "SoftwareApplication", "BreadcrumbList"]);
  });
});

test.describe("sitemap and llms.txt", () => {
  test("sitemap lists every section page; llms.txt lists them except /waitlist", async ({ request }) => {
    const sitemap = await (await request.get("/sitemap.xml")).text();
    for (const p of PATHS) expect(sitemap).toContain(`<loc>${SITE}${p}</loc>`);
    const llms = await (await request.get("/llms.txt")).text();
    for (const p of PATHS.filter((p) => p !== "/waitlist")) expect(llms).toContain(`(${SITE}${p})`);
    expect(llms).not.toContain(`${SITE}/waitlist`);
  });
});

test.describe("section pages quality", () => {
  for (const width of [1440, 834, 390]) {
    test(`axe finds no violations at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      for (const path of ["/", ...PATHS]) {
        await page.goto(path);
        expect(await scan(page), `${path} at ${width}`).toEqual([]);
      }
      await page.goto("/faq#where-does-my-data-go");
      expect(await scan(page), `faq deep link at ${width}`).toEqual([]);
      if (width === 390) {
        await page.getByRole("button", { name: "Open menu" }).click();
        expect(await scan(page), "menu open").toEqual([]);
      }
    });
  }

  test("no horizontal scroll, no layout shift, no console errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
    page.on("pageerror", (e) => errors.push(e.message));
    await page.addInitScript(() => {
      (window as unknown as { __cls: number }).__cls = 0;
      new PerformanceObserver((list) => {
        for (const e of list.getEntries() as unknown as { value: number; hadRecentInput: boolean }[]) if (!e.hadRecentInput) (window as unknown as { __cls: number }).__cls += e.value;
      }).observe({ type: "layout-shift", buffered: true });
    });
    for (const width of [390, 834, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      for (const path of PATHS) {
        await page.goto(path);
        await page.waitForLoadState("networkidle");
        expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth), `${path} at ${width}`).toBe(0);
        expect(await page.evaluate(() => (window as unknown as { __cls: number }).__cls), `CLS ${path} at ${width}`).toBe(0);
      }
    }
    expect(errors).toEqual([]);
  });

  test("copy: no banned words or em dashes on the new pages", async ({ page }) => {
    const banned = ["AI-powered", "leverage", "unlock", "transform", "empower", "revolutionary", "cutting-edge", "game-changing", "seamless"];
    for (const path of PATHS) {
      await page.goto(path);
      const text = await page.evaluate(() => document.body.innerText + " " + document.title + " " + (document.querySelector('meta[name="description"]')?.getAttribute("content") ?? ""));
      for (const w of banned) expect(text.toLowerCase(), `${path}: ${w}`).not.toContain(w.toLowerCase());
      expect(text, path).not.toContain("—");
    }
  });
});
