import { describe, expect, it } from "vitest";
import {
  INITIAL_STEP1,
  INITIAL_STEP2,
  applyStep1Outcome,
  deriveStep1View,
  step1Outcome,
  step2Body,
  step2IsEmpty,
  step2Outcome,
  toggleMarket,
  toggleProductType,
  withEmail,
  type Step1State,
} from "@/components/home-v6/waitlist/formState";
import { ROLE_OPTIONS, WAITLIST_ERRORS } from "@/lib/waitlist/schema";

const ROLE = ROLE_OPTIONS[0].value;
const state = (patch: Partial<Step1State>): Step1State => ({ ...INITIAL_STEP1, ...patch });

describe("v6 waitlist form: step 1 view", () => {
  it("starts with role and button disabled and no messages", () => {
    const v = deriveStep1View(INITIAL_STEP1);
    expect(v).toMatchObject({ emailValid: false, showError: false, showPersonalHint: false, roleDisabled: true, buttonDisabled: true, formVisible: true });
  });

  it("shows the email error only after blur, and never for an empty field", () => {
    expect(deriveStep1View(state({ email: "name@company" })).showError).toBe(false);
    expect(deriveStep1View(state({ email: "name@company", touched: true })).showError).toBe(true);
    expect(deriveStep1View(state({ email: "", touched: true })).showError).toBe(false);
  });

  it("enables the role once the email is valid, and the button once a role is chosen", () => {
    const valid = state({ email: "eng@acme.io" });
    expect(deriveStep1View(valid)).toMatchObject({ roleDisabled: false, buttonDisabled: true });
    expect(deriveStep1View({ ...valid, role: ROLE }).buttonDisabled).toBe(false);
    expect(deriveStep1View({ ...valid, role: "not-a-role" }).buttonDisabled).toBe(true);
  });

  it("gives a soft hint for personal addresses without blocking submit", () => {
    const v = deriveStep1View(state({ email: "someone@gmail.com", role: ROLE }));
    expect(v.showPersonalHint).toBe(true);
    expect(v.buttonDisabled).toBe(false);
    expect(deriveStep1View(state({ email: "eng@acme.io" })).showPersonalHint).toBe(false);
  });

  it("disables the button while loading and hides the form on success", () => {
    expect(deriveStep1View(state({ email: "eng@acme.io", role: ROLE, status: "loading" }))).toMatchObject({ loading: true, buttonDisabled: true });
    expect(deriveStep1View(state({ status: "success" })).formVisible).toBe(false);
  });

  it("clears an earlier error when the email changes, but not a submission in flight", () => {
    expect(withEmail(state({ status: "server" }), "a@b.co").status).toBe("idle");
    expect(withEmail(state({ status: "message", message: "x" }), "a@b.co").message).toBe("");
    expect(withEmail(state({ status: "loading" }), "a@b.co").status).toBe("loading");
  });

  it("starts with marketing opt-in unticked", () => {
    expect(INITIAL_STEP1.updates).toBe(false);
  });
});

describe("v6 waitlist form: API outcomes", () => {
  it("maps success, rate limit, server errors and validation messages", () => {
    expect(step1Outcome(200, { ok: true, step2_token: "t" })).toEqual({ kind: "success", token: "t" });
    expect(step1Outcome(429, { ok: false, error: WAITLIST_ERRORS.rateLimited })).toEqual({ kind: "rate" });
    expect(step1Outcome(500, { ok: false, error: WAITLIST_ERRORS.generic })).toEqual({ kind: "server" });
    expect(step1Outcome(null, null)).toEqual({ kind: "server" });
    expect(step1Outcome(502, null)).toEqual({ kind: "server" });
    expect(step1Outcome(400, { ok: false, error: WAITLIST_ERRORS.tooFast })).toEqual({ kind: "message", text: WAITLIST_ERRORS.tooFast });
    expect(step1Outcome(400, { ok: false, error: "x", fieldErrors: { email: "Enter a valid email address, like you@company.com." } })).toEqual({
      kind: "message",
      text: "Enter a valid email address, like you@company.com.",
    });
  });

  it("applies an outcome to the state", () => {
    const s = state({ email: "eng@acme.io", role: ROLE, status: "loading" });
    expect(applyStep1Outcome(s, { kind: "success", token: "t" }).status).toBe("success");
    expect(applyStep1Outcome(s, { kind: "rate" }).status).toBe("rate");
    expect(applyStep1Outcome(s, { kind: "message", text: "m" })).toMatchObject({ status: "message", message: "m", email: "eng@acme.io" });
  });
});

describe("v6 waitlist form: step 2", () => {
  it("toggles answers and knows when nothing was chosen", () => {
    expect(step2IsEmpty(INITIAL_STEP2)).toBe(true);
    const a = toggleMarket(toggleProductType(INITIAL_STEP2, "connected_device"), "fcc_us");
    expect(a).toEqual({ productType: "connected_device", markets: ["fcc_us"], nextWindow: "" });
    expect(toggleProductType(a, "connected_device").productType).toBeNull();
    expect(toggleMarket(a, "fcc_us").markets).toEqual([]);
    expect(step2IsEmpty(a)).toBe(false);
  });

  it("builds the existing step-2 request body", () => {
    expect(step2Body({ productType: null, markets: ["ce_ukca"], nextWindow: "" }, "tok")).toEqual({
      step2_token: "tok",
      product_type: null,
      markets: ["ce_ukca"],
      next_test_window: null,
    });
  });

  it("maps step-2 responses", () => {
    expect(step2Outcome(200, { ok: true })).toEqual({ kind: "saved" });
    expect(step2Outcome(401, { ok: false, error: WAITLIST_ERRORS.expired })).toEqual({ kind: "error", text: WAITLIST_ERRORS.expired });
    expect(step2Outcome(429, null)).toEqual({ kind: "error", text: WAITLIST_ERRORS.rateLimited });
    expect(step2Outcome(null, null)).toEqual({ kind: "error", text: WAITLIST_ERRORS.generic });
  });
});
