import type { Page, Request } from "@playwright/test";

export const STEP2_TOKEN = "6b1f6a0e-6f0e-4b5e-9a3f-2f7d2c1e8b11";

export interface WaitlistMock {
  step1: Request[];
  step2: Request[];
}

/** Stubs the waitlist API so browser tests never touch Supabase. */
export async function mockWaitlistApi(
  page: Page,
  { step1Status = 200, step1Body }: { step1Status?: number; step1Body?: object } = {},
): Promise<WaitlistMock> {
  const calls: WaitlistMock = { step1: [], step2: [] };
  await page.route("**/api/waitlist", async (route) => {
    calls.step1.push(route.request());
    await route.fulfill({
      status: step1Status,
      contentType: "application/json",
      body: JSON.stringify(step1Body ?? { ok: true, step2_token: STEP2_TOKEN }),
    });
  });
  await page.route("**/api/waitlist/step-2", async (route) => {
    calls.step2.push(route.request());
    await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ ok: true }) });
  });
  return calls;
}

/** The server rejects submissions made within 2s of opening the form; real people take longer. */
export const humanPause = (page: Page) => page.waitForTimeout(2100);
