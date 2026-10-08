import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const rpc = vi.fn();
vi.mock("@/lib/supabase/server", () => ({ getSupabaseAdmin: () => ({ rpc }) }));

const { handleStep1, handleStep2, hashIp, clientIp, readJsonBody, UNKNOWN_IP } = await import("@/lib/waitlist/server");
const { CONSENT_VERSION, WAITLIST_ERRORS } = await import("@/lib/waitlist/schema");

const NOW = 1_800_000_000_000;
const TOKEN = "6b1f6a0e-6f0e-4b5e-9a3f-2f7d2c1e8b11";

const body = (patch: Record<string, unknown> = {}) => ({
  email: "  Priya@SenseHub.io ",
  role: "emc_rf_engineer",
  marketing_opt_in: true,
  source: "hero",
  utm_source: "linkedin",
  referrer: "https://www.linkedin.com/",
  website: "",
  form_opened_at: NOW - 5_000,
  ...patch,
});

beforeEach(() => {
  rpc.mockReset();
  vi.stubEnv("WAITLIST_IP_SALT", "test-salt");
  vi.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

describe("handleStep1", () => {
  it("stores a normalised signup and returns the step 2 token", async () => {
    rpc.mockResolvedValue({ data: [{ status: "ok", step2_token: TOKEN }], error: null });

    const result = await handleStep1(body(), { ip: "203.0.113.7", now: NOW });

    expect(result).toEqual({ status: 200, body: { ok: true, step2_token: TOKEN } });
    expect(rpc).toHaveBeenCalledWith("waitlist_step1", {
      p_email: "priya@sensehub.io",
      p_role: "emc_rf_engineer",
      p_marketing_opt_in: true,
      p_consent_version: CONSENT_VERSION,
      p_source: "hero",
      p_utm_source: "linkedin",
      p_utm_medium: null,
      p_utm_campaign: null,
      p_referrer: "https://www.linkedin.com/",
      p_ip_hash: hashIp("203.0.113.7", "test-salt"),
      p_max_per_hour: 5,
    });
  });

  it("never sends the raw IP to the database", async () => {
    rpc.mockResolvedValue({ data: [{ status: "ok", step2_token: TOKEN }], error: null });
    await handleStep1(body(), { ip: "203.0.113.7", now: NOW });
    const args = JSON.stringify(rpc.mock.calls[0]);
    expect(args).not.toContain("203.0.113.7");
    expect(hashIp("203.0.113.7", "test-salt")).toMatch(/^[0-9a-f]{64}$/);
  });

  it("returns the same response shape for an existing email", async () => {
    const other = "0f3c1a52-9a55-4f3e-8d3b-5d0b7d9b8e21";
    rpc.mockResolvedValueOnce({ data: [{ status: "ok", step2_token: TOKEN }], error: null });
    rpc.mockResolvedValueOnce({ data: [{ status: "ok", step2_token: other }], error: null });

    const first = await handleStep1(body(), { ip: "203.0.113.7", now: NOW });
    const second = await handleStep1(body(), { ip: "203.0.113.7", now: NOW });

    expect(first.status).toBe(second.status);
    expect(Object.keys(first.body)).toEqual(Object.keys(second.body));
    expect(second.body).toEqual({ ok: true, step2_token: other });
  });

  it("silently accepts a filled honeypot without storing anything", async () => {
    const result = await handleStep1(body({ website: "https://spam.example" }), { ip: "203.0.113.7", now: NOW });
    expect(result.status).toBe(200);
    expect(result.body.ok).toBe(true);
    expect(rpc).not.toHaveBeenCalled();
  });

  it("rejects submissions made less than 2 seconds after the form opened", async () => {
    const result = await handleStep1(body({ form_opened_at: NOW - 1_500 }), { ip: "203.0.113.7", now: NOW });
    expect(result).toEqual({ status: 400, body: { ok: false, error: WAITLIST_ERRORS.tooFast } });
    expect(rpc).not.toHaveBeenCalled();
  });

  it("returns 429 when the database reports the rate limit", async () => {
    rpc.mockResolvedValue({ data: [{ status: "rate_limited", step2_token: null }], error: null });
    const result = await handleStep1(body(), { ip: "203.0.113.7", now: NOW });
    expect(result).toEqual({ status: 429, body: { ok: false, error: WAITLIST_ERRORS.rateLimited } });
  });

  it("returns field errors for invalid input", async () => {
    const result = await handleStep1(body({ email: "priya@sensehub", role: "" }), { ip: null, now: NOW });
    expect(result.status).toBe(400);
    expect(result.body).toMatchObject({
      ok: false,
      fieldErrors: { email: "Enter a valid email address, like you@company.com.", role: "Select your role." },
    });
    expect(rpc).not.toHaveBeenCalled();
  });

  it("puts requests without an IP in one shared rate-limit bucket", async () => {
    rpc.mockResolvedValue({ data: [{ status: "ok", step2_token: TOKEN }], error: null });
    await handleStep1(body(), { ip: null, now: NOW });
    expect(rpc.mock.calls[0][1].p_ip_hash).toBe(hashIp(UNKNOWN_IP, "test-salt"));
  });

  it("uses a keyed hash, so the same IP hashes differently under another salt", () => {
    expect(hashIp("203.0.113.7", "a")).not.toBe(hashIp("203.0.113.7", "b"));
  });

  it("fails closed when the IP salt is missing", async () => {
    vi.stubEnv("WAITLIST_IP_SALT", "");
    const result = await handleStep1(body(), { ip: "203.0.113.7", now: NOW });
    expect(result.status).toBe(500);
    expect(rpc).not.toHaveBeenCalled();
  });

  it("logs database errors without the email or IP", async () => {
    rpc.mockResolvedValue({ data: null, error: { code: "23514", message: "violates check" } });
    const result = await handleStep1(body(), { ip: "203.0.113.7", now: NOW });
    expect(result).toEqual({ status: 500, body: { ok: false, error: WAITLIST_ERRORS.generic } });
    const logged = JSON.stringify(vi.mocked(console.error).mock.calls);
    expect(logged).not.toContain("sensehub");
    expect(logged).not.toContain("203.0.113.7");
    expect(logged).not.toContain("violates check");
    expect(logged).toContain("23514");
  });
});

describe("handleStep2", () => {
  it("updates optional fields with a valid token", async () => {
    rpc.mockResolvedValue({ data: "ok", error: null });
    const result = await handleStep2(
      { step2_token: TOKEN, product_type: "connected_device", markets: ["fcc_us", "ce_ukca"], next_test_window: "3_6_months" },
      { ip: "203.0.113.7" },
    );
    expect(result).toEqual({ status: 200, body: { ok: true } });
    expect(rpc).toHaveBeenCalledWith("waitlist_step2", {
      p_token: TOKEN,
      p_product_type: "connected_device",
      p_markets: ["fcc_us", "ce_ukca"],
      p_next_test_window: "3_6_months",
      p_ip_hash: hashIp("203.0.113.7", "test-salt"),
      p_max_per_hour: 20,
    });
  });

  it("returns 429 when step 2 is rate limited", async () => {
    rpc.mockResolvedValue({ data: "rate_limited", error: null });
    const result = await handleStep2({ step2_token: TOKEN }, { ip: "203.0.113.7" });
    expect(result).toEqual({ status: 429, body: { ok: false, error: WAITLIST_ERRORS.rateLimited } });
  });

  it("sends null for an empty markets list", async () => {
    rpc.mockResolvedValue({ data: "ok", error: null });
    await handleStep2({ step2_token: TOKEN }, { ip: null });
    expect(rpc.mock.calls[0][1]).toMatchObject({ p_markets: null, p_product_type: null, p_next_test_window: null });
  });

  it("rejects an expired or already used token", async () => {
    rpc.mockResolvedValue({ data: "invalid", error: null });
    const result = await handleStep2({ step2_token: TOKEN, product_type: "other" }, { ip: null });
    expect(result).toEqual({ status: 401, body: { ok: false, error: WAITLIST_ERRORS.expired } });
  });

  it("rejects a malformed token without calling the database", async () => {
    const result = await handleStep2({ step2_token: "nope" }, { ip: null });
    expect(result.status).toBe(401);
    expect(rpc).not.toHaveBeenCalled();
  });

  it("rejects a missing token", async () => {
    const result = await handleStep2({ product_type: "other" }, { ip: null });
    expect(result.status).toBe(401);
    expect(rpc).not.toHaveBeenCalled();
  });

  it("rejects invalid optional values", async () => {
    const result = await handleStep2({ step2_token: TOKEN, markets: ["mars"] }, { ip: null });
    expect(result.status).toBe(400);
    expect(rpc).not.toHaveBeenCalled();
  });
});

describe("clientIp", () => {
  it("prefers the platform-set header over a spoofable X-Forwarded-For", () => {
    expect(
      clientIp(new Headers({ "x-forwarded-for": "6.6.6.6, 203.0.113.7", "x-vercel-forwarded-for": "203.0.113.7" })),
    ).toBe("203.0.113.7");
  });

  it("falls back to the first X-Forwarded-For address", () => {
    expect(clientIp(new Headers({ "x-forwarded-for": "203.0.113.7, 10.0.0.1" }))).toBe("203.0.113.7");
  });

  it("falls back to X-Real-IP, then null", () => {
    expect(clientIp(new Headers({ "x-real-ip": "198.51.100.2" }))).toBe("198.51.100.2");
    expect(clientIp(new Headers())).toBeNull();
  });
});

describe("readJsonBody", () => {
  const req = (body: string, headers: Record<string, string> = {}) =>
    new Request("http://localhost/api/waitlist", { method: "POST", body, headers });

  it("parses JSON", async () => {
    expect(await readJsonBody(req('{"a":1}'))).toEqual({ ok: true, body: { a: 1 } });
  });

  it("rejects bodies over 8 KB", async () => {
    expect(await readJsonBody(req(JSON.stringify({ x: "a".repeat(9000) })))).toEqual({ ok: false, status: 413 });
    expect(await readJsonBody(req("{}", { "content-length": "100000" }))).toEqual({ ok: false, status: 413 });
  });

  it("rejects malformed JSON", async () => {
    expect(await readJsonBody(req("{nope"))).toEqual({ ok: false, status: 400 });
  });
});
