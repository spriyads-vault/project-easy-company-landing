import { expect, test } from "@playwright/test";

// Both flags off (SCRUM-310): the section page paths are 404s, exactly as before.

test("section page paths are 404s with the flags off", async ({ request }) => {
  for (const p of ["/how-it-works", "/agents", "/coverage", "/faq", "/waitlist"]) expect((await request.get(p)).status(), p).toBe(404);
});
