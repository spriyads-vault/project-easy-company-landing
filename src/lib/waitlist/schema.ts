// zod/mini: same validation engine as zod, but tree-shakable, so the client bundle stays small.
import * as z from "zod/mini";

/** Version of the consent text shown next to the form. Bump it whenever that text changes. */
export const CONSENT_VERSION = "2026-10-08";

/** Minimum time between opening the form and submitting step 1 (anti-spam). */
export const MIN_FILL_MS = 2000;

export const ROLE_OPTIONS = [
  { value: "hardware_engineer", label: "Hardware / electronics engineer" },
  { value: "emc_rf_engineer", label: "EMC or RF engineer" },
  { value: "compliance_regulatory", label: "Compliance / regulatory" },
  { value: "engineering_lead", label: "Engineering lead or manager" },
  { value: "founder_executive", label: "Founder / executive" },
  { value: "test_lab_consultancy", label: "Test lab or consultancy" },
  { value: "other", label: "Other" },
] as const;

export const PRODUCT_TYPE_OPTIONS = [
  { value: "connected_device", label: "Connected device" },
  { value: "robotics_machinery", label: "Robotics or machinery" },
  { value: "industrial_equipment", label: "Industrial equipment" },
  { value: "aerospace_equipment", label: "Aerospace equipment" },
  { value: "other", label: "Other" },
] as const;

export const MARKET_OPTIONS = [
  { value: "fcc_us", label: "FCC (US)" },
  { value: "ce_ukca", label: "CE / UKCA (EU, UK)" },
  { value: "ised_ca", label: "ISED (Canada)" },
  { value: "other", label: "Other" },
] as const;

export const NEXT_TEST_WINDOW_OPTIONS = [
  { value: "lt_3_months", label: "Within 3 months" },
  { value: "3_6_months", label: "3–6 months" },
  { value: "6_12_months", label: "6–12 months" },
  { value: "no_date", label: "No date yet" },
] as const;

export const SOURCES = ["nav", "hero", "section", "final_cta_inline", "docs"] as const;

type Values<T extends readonly { value: string }[]> = T[number]["value"];
const values = <T extends readonly { value: string }[]>(opts: T) =>
  opts.map((o) => o.value) as [Values<T>, ...Values<T>[]];

export const roleSchema = z.enum(values(ROLE_OPTIONS), { error: "Select your role." });
export const productTypeSchema = z.enum(values(PRODUCT_TYPE_OPTIONS));
export const marketSchema = z.enum(values(MARKET_OPTIONS));
export const nextTestWindowSchema = z.enum(values(NEXT_TEST_WINDOW_OPTIONS));
export const sourceSchema = z.enum(SOURCES);

export type Role = z.infer<typeof roleSchema>;
export type ProductType = z.infer<typeof productTypeSchema>;
export type Market = z.infer<typeof marketSchema>;
export type NextTestWindow = z.infer<typeof nextTestWindowSchema>;
export type WaitlistSource = z.infer<typeof sourceSchema>;

export const EMAIL_MESSAGES = {
  required: "Enter your work email.",
  invalid: "Enter a valid email address, like you@company.com.",
} as const;

// Same pattern the design validates with: something@domain.tld with a 2+ character TLD.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const emailSchema = z.string({ error: EMAIL_MESSAGES.required }).check(
  z.trim(),
  z.toLowerCase(),
  z.minLength(1, EMAIL_MESSAGES.required),
  z.maxLength(254, EMAIL_MESSAGES.invalid),
  z.regex(EMAIL_PATTERN, EMAIL_MESSAGES.invalid),
);

/** The fields a visitor fills in on step 1. */
export const step1FieldsSchema = z.object({
  email: emailSchema,
  role: roleSchema,
  marketing_opt_in: z._default(z.boolean(), false),
});

const optionalText = (max: number) =>
  z.pipe(
    z.nullable(z.optional(z.string().check(z.trim(), z.maxLength(max)))),
    z.transform((v): string | null => (v ? v : null)),
  );

/** Full step 1 request body: fields plus attribution and anti-spam signals. */
export const step1RequestSchema = z.extend(step1FieldsSchema, {
  source: sourceSchema,
  utm_source: optionalText(200),
  utm_medium: optionalText(200),
  utm_campaign: optionalText(200),
  referrer: optionalText(2048),
  /** Honeypot: hidden from people, so any value means a bot filled it. */
  website: z._default(z.string().check(z.maxLength(500)), ""),
  /** Epoch ms when the form was opened. */
  form_opened_at: z.int().check(z.nonnegative()),
});

/** Step 2: every field optional. */
export const step2FieldsSchema = z.object({
  product_type: z._default(z.nullable(productTypeSchema), null),
  markets: z.pipe(
    z._default(z.array(marketSchema).check(z.maxLength(MARKET_OPTIONS.length)), []),
    z.transform((list: Market[]) => Array.from(new Set(list))),
  ),
  next_test_window: z._default(z.nullable(nextTestWindowSchema), null),
});

export const step2RequestSchema = z.extend(step2FieldsSchema, {
  step2_token: z.uuid(),
});

export type Step1Fields = z.infer<typeof step1FieldsSchema>;
export type Step1Request = z.input<typeof step1RequestSchema>;
export type Step2Fields = z.infer<typeof step2FieldsSchema>;
export type Step2Request = z.input<typeof step2RequestSchema>;

const PERSONAL_DOMAINS = ["gmail", "googlemail", "outlook", "hotmail", "live", "yahoo", "icloud", "me", "proton", "protonmail", "pm"];

/** Soft hint only: personal addresses are accepted, we just suggest a work email. */
export function isPersonalEmail(email: string): boolean {
  const domain = (email.trim().split("@")[1] ?? "").toLowerCase();
  if (!domain) return false;
  return PERSONAL_DOMAINS.some((p) => domain === `${p}.com` || domain.startsWith(`${p}.`));
}

/** Messages shown under the fields, keyed by field. Empty string means valid. */
export function step1FieldErrors(input: { email: string; role: string }): { email: string; role: string } {
  const email = emailSchema.safeParse(input.email);
  const role = roleSchema.safeParse(input.role);
  return {
    email: email.success ? "" : (email.error.issues[0]?.message ?? EMAIL_MESSAGES.invalid),
    role: role.success ? "" : "Select your role.",
  };
}

/** Response bodies shared by the API and the form. */
export type WaitlistResponse =
  | { ok: true; step2_token?: string }
  | { ok: false; error: string; fieldErrors?: Partial<Record<"email" | "role", string>> };

export const WAITLIST_ERRORS = {
  generic: "Something went wrong. Please try again, or email hello@crado.io.",
  tooFast: "That was quick. Please check your details and try again.",
  rateLimited: "Too many attempts from this network. Please try again in an hour.",
  expired: "This form has expired. Your place on the list is saved.",
} as const;
