import { expect, test, type Page } from "@playwright/test";

const STEP_IDS = ["change-review", "failure-investigation", "evidence"] as const;

/** Opacity of each sticky scene layer, in step order. */
const layerOpacities = (page: Page) =>
  page.locator("[data-layer]").evaluateAll((els) => els.map((e) => Number(getComputedStyle(e).opacity)));

/** Scroll so the given step block is centred, as the design's goTo does. */
async function centreStep(page: Page, id: string) {
  await page.evaluate((id) => {
    const b = document.getElementById(id)!.getBoundingClientRect();
    window.scrollTo(0, b.top + window.scrollY + b.height / 2 - window.innerHeight / 2);
  }, id);
}

test.describe("hero", () => {
  test("renders on the hero band with the tools strip", async ({ page }) => {
    await page.goto("/");
    const hero = page.locator("[data-hero]");
    await expect(hero.getByText("Case threads")).toBeVisible();
    await expect(hero.locator("svg[data-chrome]")).toBeVisible();
    await expect(page.locator("h1 [data-chrome]")).toHaveAttribute("aria-hidden", "true");

    const buttons = [hero.getByRole("button", { name: "Join early access" }), hero.getByRole("link", { name: "Read the docs" })];
    for (const b of buttons) expect((await b.boundingBox())!.height).toBe(52);

    await expect(hero.getByText("READS YOUR LAB REPORTS")).toBeVisible();
    await expect(hero.getByRole("list", { name: "Report formats" }).getByRole("listitem")).toHaveText(["PDF", "TXT", "MD"]);
    await expect(hero.getByText("CONNECTORS ON THE ROADMAP")).toBeVisible();
    const strip = hero.getByRole("list", { name: "Connectors on the roadmap" });
    await expect(strip.getByRole("listitem")).toHaveCount(7);

    // Tooltips: "<Tool> · Roadmap" on hover and on keyboard focus.
    const altium = strip.locator("[tabindex]").first();
    await expect(altium).toHaveText(/^Altium/);
    await altium.hover();
    await expect(page.getByRole("tooltip", { name: "Altium Designer · Roadmap" })).toBeVisible();
    await altium.focus();
    await expect(altium).toHaveAccessibleDescription("Altium Designer · Roadmap");
    await expect(strip.getByRole("tooltip")).toHaveText([
      "Altium Designer · Roadmap",
      "KiCad · Roadmap",
      "Cadence OrCAD · Roadmap",
      "SolidWorks · Roadmap",
      "Autodesk Fusion · Roadmap",
      "Siemens Teamcenter (PLM) · Roadmap",
      "Arena PLM · Git · Jira · Roadmap",
    ]);

    await expect(hero.getByRole("img", { name: /Case 0042/ })).toBeVisible();
    await expect(hero.getByText("Rev D report", { exact: true })).toBeVisible();
  });

  test("the h1 is real text and the only h1", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Compliance, inside the engineering loop.");
  });
});

test.describe("product frame", () => {
  test("scales from about 82% of the content width to full width and plays the Finding once", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    const frame = page.locator("[data-pframe]");
    await expect(page.getByText("Product walkthrough · video coming soon")).toBeVisible();
    await expect(frame.getByRole("button")).toHaveCount(0);

    const layoutWidth = await frame.evaluate((f) => (f as HTMLElement).offsetWidth);
    // Just entering the viewport: scaled down.
    await frame.evaluate((f) => window.scrollTo(0, f.getBoundingClientRect().top + window.scrollY - window.innerHeight + 20));
    await expect.poll(async () => (await frame.boundingBox())!.width).toBeLessThan(layoutWidth * 0.8);
    // Centred: full width, and the Finding has played.
    await frame.evaluate((f) => {
      const b = f.getBoundingClientRect();
      window.scrollTo(0, b.top + window.scrollY + (f as HTMLElement).offsetHeight / 2 - window.innerHeight / 2);
    });
    await expect.poll(async () => Math.round((await frame.boundingBox())!.width)).toBe(layoutWidth);
    await expect(frame).toHaveAttribute("data-played", "");
    // Scrolling back up shrinks it again.
    await frame.evaluate((f) => window.scrollTo(0, f.getBoundingClientRect().top + window.scrollY - window.innerHeight + 20));
    await expect.poll(async () => (await frame.boundingBox())!.width).toBeLessThan(layoutWidth * 0.8);
  });
});

test.describe("sticky steps", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test("nav links land on steps 01, 02 and 03", async ({ page }) => {
    await page.goto("/");
    for (const [i, name] of [
      [0, /Change review/],
      [1, /Failure investigation/],
      [2, /Evidence and communications/],
    ] as const) {
      await page.getByRole("button", { name: "Product", exact: true }).click();
      await page.getByRole("menuitem", { name }).click();
      await expect(page).toHaveURL(new RegExp(`#${STEP_IDS[i]}$`));
      await expect(page.locator(`#${STEP_IDS[i]}-title`)).toBeInViewport();
      await expect.poll(() => layerOpacities(page)).toEqual([0, 1, 2].map((k) => (k === i ? 1 : 0)));
    }
  });

  test("shows the right scene for each step scrolling down and up, never blank", async ({ page }) => {
    await page.goto("/");
    await expect.poll(() => layerOpacities(page)).toEqual([1, 0, 0]);

    const range = await page.locator("[data-steps]").evaluate((el) => {
      const b = el.getBoundingClientRect();
      return { top: b.top + window.scrollY - window.innerHeight, bottom: b.bottom + window.scrollY };
    });
    const positions: number[] = [];
    for (let y = range.top; y <= range.bottom; y += 120) positions.push(y);

    for (const ys of [positions, [...positions].reverse()]) {
      for (const y of ys) {
        await page.evaluate((v) => window.scrollTo(0, v), y);
        await page.waitForTimeout(40);
        const ops = await layerOpacities(page);
        // Mid cross-fade the two layers sum to ~1; there is never a frame with nothing showing.
        expect(ops.reduce((a, b) => a + b, 0), `y=${y}`).toBeGreaterThan(0.9);
      }
    }

    for (const order of [STEP_IDS, [...STEP_IDS].reverse()]) {
      for (const id of order) {
        await centreStep(page, id);
        const i = STEP_IDS.indexOf(id);
        await expect.poll(() => layerOpacities(page), { message: id }).toEqual([0, 1, 2].map((k) => (k === i ? 1 : 0)));
        await expect(page.locator(`#${id}`)).toHaveAttribute("data-on", "");
        await expect(page.locator("[data-layer]").nth(i)).toHaveAttribute("aria-hidden", "false");
      }
    }
  });

  test("only the active scene animates", async ({ page }) => {
    await page.goto("/");
    await centreStep(page, "failure-investigation");
    await expect(page.locator("[data-layer]").nth(1).locator("[data-scene-box]")).toHaveAttribute("data-run", "");
    expect(await page.locator("[data-layer] [data-run]").count()).toBe(1);
    // Scrolled away: nothing in the section runs.
    await page.locator("#faq").scrollIntoViewIfNeeded();
    await expect(page.locator("[data-steps] [data-run]")).toHaveCount(0);
  });

  test("mobile stacks each step with its scene inline, without a sticky box", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await expect(page.locator("[data-layer]").first()).toBeHidden();
    let prevBottom = 0;
    for (const id of STEP_IDS) {
      const step = page.locator(`#${id}`);
      const scene = step.locator("[data-scene-box]");
      await scene.scrollIntoViewIfNeeded();
      await expect(scene).toBeVisible();
      const box = (await scene.boundingBox())!;
      const t = (await page.locator(`#${id}-title`).boundingBox())!;
      expect(box.y).toBeGreaterThan(t.y); // scene follows its own text
      expect(Math.round(box.width / box.height * 3)).toBe(4); // 4:3 box
      const top = await step.evaluate((e) => e.getBoundingClientRect().top + window.scrollY);
      expect(top).toBeGreaterThan(prevBottom);
      prevBottom = await step.evaluate((e) => e.getBoundingClientRect().bottom + window.scrollY);
    }
    const sticky = await page.locator("[data-steps] .sticky").evaluate((el) => getComputedStyle(el.parentElement!).display);
    expect(sticky).toBe("none");
  });
});

test.describe("reduced motion", () => {
  test.use({ reducedMotion: "reduce", viewport: { width: 1440, height: 900 } });

  test("shows static final states: full-size frame, instant scene swaps, nothing running", async ({ page }) => {
    await page.goto("/");
    const frame = page.locator("[data-pframe]");
    const layoutWidth = await frame.evaluate((f) => (f as HTMLElement).offsetWidth);
    await frame.evaluate((f) => window.scrollTo(0, f.getBoundingClientRect().top + window.scrollY - window.innerHeight + 20));
    expect(Math.round((await frame.boundingBox())!.width)).toBe(layoutWidth);
    for (const row of await frame.locator("[data-ps]").all()) expect(await row.evaluate((e) => getComputedStyle(e).opacity)).toBe("1");

    await centreStep(page, "evidence");
    // Instant swap: no transition, so the next frame already shows step 03 alone.
    await expect.poll(() => layerOpacities(page), { timeout: 500 }).toEqual([0, 0, 1]);
    expect(await page.locator("[data-steps] [data-run]").count()).toBe(0);
    await page.waitForTimeout(300);
    const running = await page.evaluate(() => document.getAnimations().filter((a) => a.playState === "running").length);
    expect(running).toBe(0);
  });
});
