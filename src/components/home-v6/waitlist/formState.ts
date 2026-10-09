/**
 * State logic for the v6 waitlist form, kept free of React so it can be unit tested
 * (tests/unit/waitlist-v6-form.test.ts). Validation and the personal-domain list come from the existing
 * src/lib/waitlist/schema.ts, the same code the API validates with.
 */
import { WAITLIST_ERRORS, emailSchema, isPersonalEmail, roleSchema, type WaitlistResponse } from "@/lib/waitlist/schema";

export type Step1Status = "idle" | "loading" | "success" | "rate" | "server" | "message";

export interface Step1State {
  email: string;
  /** The email field has lost focus at least once (errors show only after blur). */
  touched: boolean;
  role: string;
  updates: boolean;
  status: Step1Status;
  /** Server text for the "message" status (too fast, field errors). */
  message: string;
}

export const INITIAL_STEP1: Step1State = { email: "", touched: false, role: "", updates: false, status: "idle", message: "" };

export interface Step1View {
  emailValid: boolean;
  /** Invalid email after blur (design: error shows only after the field loses focus). */
  showError: boolean;
  /** Soft hint for a personal address; advisory, never blocks submit. */
  showPersonalHint: boolean;
  /** Role stays disabled until the email is valid. */
  roleDisabled: boolean;
  roleValid: boolean;
  /** Disabled until there is a valid email and a chosen role, and while submitting. */
  buttonDisabled: boolean;
  loading: boolean;
  formVisible: boolean;
}

export function isValidEmail(email: string): boolean {
  return emailSchema.safeParse(email).success;
}

export function deriveStep1View(s: Step1State): Step1View {
  const trimmed = s.email.trim();
  const emailValid = isValidEmail(trimmed);
  const loading = s.status === "loading";
  const showError = s.touched && trimmed.length > 0 && !emailValid;
  const roleValid = roleSchema.safeParse(s.role).success;
  return {
    emailValid,
    showError,
    showPersonalHint: emailValid && !showError && isPersonalEmail(trimmed),
    roleDisabled: !emailValid,
    roleValid,
    buttonDisabled: loading || !emailValid || !roleValid,
    loading,
    formVisible: s.status !== "success",
  };
}

/** Editing the email clears an earlier server outcome but keeps a submission in flight. */
export function withEmail(s: Step1State, email: string): Step1State {
  const status = s.status === "loading" ? "loading" : "idle";
  return { ...s, email, status, message: status === "idle" ? "" : s.message };
}

export type Step1Outcome =
  | { kind: "success"; token: string | null }
  | { kind: "rate" }
  | { kind: "server" }
  | { kind: "message"; text: string };

/** Maps an API response (status and parsed body, or null for a network failure) to the state the form shows. */
export function step1Outcome(status: number | null, body: WaitlistResponse | null): Step1Outcome {
  if (status === null) return { kind: "server" };
  if (body?.ok) return { kind: "success", token: body.step2_token ?? null };
  if (status === 429) return { kind: "rate" };
  if (status >= 500 || !body) return { kind: "server" };
  const field = body.fieldErrors?.email ?? body.fieldErrors?.role;
  return { kind: "message", text: field ?? body.error ?? WAITLIST_ERRORS.generic };
}

export function applyStep1Outcome(s: Step1State, outcome: Step1Outcome): Step1State {
  switch (outcome.kind) {
    case "success":
      return { ...s, status: "success", message: "" };
    case "rate":
      return { ...s, status: "rate", message: "" };
    case "server":
      return { ...s, status: "server", message: "" };
    case "message":
      return { ...s, status: "message", message: outcome.text };
  }
}

/** Step 2 answers. Every field is optional; the server only fills fields that are still empty. */
export interface Step2State {
  productType: string | null;
  markets: string[];
  nextWindow: string;
}

export const INITIAL_STEP2: Step2State = { productType: null, markets: [], nextWindow: "" };

export function toggleProductType(s: Step2State, value: string): Step2State {
  return { ...s, productType: s.productType === value ? null : value };
}

export function toggleMarket(s: Step2State, value: string): Step2State {
  return { ...s, markets: s.markets.includes(value) ? s.markets.filter((m) => m !== value) : [...s.markets, value] };
}

export function step2IsEmpty(s: Step2State): boolean {
  return !s.productType && s.markets.length === 0 && !s.nextWindow;
}

/** Request body for /api/waitlist/step-2. */
export function step2Body(s: Step2State, token: string) {
  return { step2_token: token, product_type: s.productType, markets: s.markets, next_test_window: s.nextWindow || null };
}

export type Step2Outcome = { kind: "saved" } | { kind: "error"; text: string };

export function step2Outcome(status: number | null, body: WaitlistResponse | null): Step2Outcome {
  if (status !== null && body?.ok) return { kind: "saved" };
  if (status === 429) return { kind: "error", text: WAITLIST_ERRORS.rateLimited };
  if (status === 401) return { kind: "error", text: WAITLIST_ERRORS.expired };
  return { kind: "error", text: (body && !body.ok && body.error) || WAITLIST_ERRORS.generic };
}
