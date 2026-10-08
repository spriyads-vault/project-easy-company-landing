import { describe, expect, it } from "vitest";
import {
  EMAIL_MESSAGES,
  emailSchema,
  isPersonalEmail,
  step1FieldErrors,
  step1RequestSchema,
  step2RequestSchema,
} from "@/lib/waitlist/schema";

const validStep1 = {
  email: "priya@sensehub.io",
  role: "emc_rf_engineer",
  marketing_opt_in: false,
  source: "nav",
  form_opened_at: 1,
};

describe("emailSchema", () => {
  it("trims and lowercases", () => {
    expect(emailSchema.parse("  Priya@SenseHub.IO ")).toBe("priya@sensehub.io");
  });

  it.each([
    ["", EMAIL_MESSAGES.required],
    ["   ", EMAIL_MESSAGES.required],
    ["priya@sensehub", EMAIL_MESSAGES.invalid],
    ["priya.sensehub.io", EMAIL_MESSAGES.invalid],
    ["pri ya@sensehub.io", EMAIL_MESSAGES.invalid],
    ["priya@sensehub.i", EMAIL_MESSAGES.invalid],
  ])("rejects %j with the design's message", (value, message) => {
    const result = emailSchema.safeParse(value);
    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.message).toBe(message);
  });

  it("rejects addresses longer than 254 characters", () => {
    const long = `${"a".repeat(250)}@x.io`;
    expect(emailSchema.safeParse(long).success).toBe(false);
  });

  it("accepts a 254 character address", () => {
    const exact = `${"a".repeat(249)}@x.io`;
    expect(exact).toHaveLength(254);
    expect(emailSchema.safeParse(exact).success).toBe(true);
  });
});

describe("step1RequestSchema", () => {
  it("accepts a valid request and defaults optional fields", () => {
    const { marketing_opt_in, ...rest } = validStep1;
    void marketing_opt_in;
    const data = step1RequestSchema.parse(rest);
    expect(data.marketing_opt_in).toBe(false);
    expect(data.website).toBe("");
    expect(data.utm_source).toBeNull();
    expect(data.referrer).toBeNull();
  });

  it.each([
    "hardware_engineer",
    "emc_rf_engineer",
    "compliance_regulatory",
    "engineering_lead",
    "founder_executive",
    "test_lab_consultancy",
    "other",
  ])("accepts role %s", (role) => {
    expect(step1RequestSchema.safeParse({ ...validStep1, role }).success).toBe(true);
  });

  it("rejects an unknown role with the design's message", () => {
    const result = step1RequestSchema.safeParse({ ...validStep1, role: "intern" });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.message).toBe("Select your role.");
  });

  it("rejects a missing role", () => {
    const { role, ...rest } = validStep1;
    void role;
    expect(step1RequestSchema.safeParse(rest).success).toBe(false);
  });

  it.each(["nav", "hero", "section", "final_cta_inline", "docs"])("accepts source %s", (source) => {
    expect(step1RequestSchema.safeParse({ ...validStep1, source }).success).toBe(true);
  });

  it("rejects an unknown source", () => {
    expect(step1RequestSchema.safeParse({ ...validStep1, source: "footer-banner" }).success).toBe(false);
  });

  it("turns empty attribution strings into null", () => {
    const data = step1RequestSchema.parse({ ...validStep1, utm_source: "  ", referrer: "" });
    expect(data.utm_source).toBeNull();
    expect(data.referrer).toBeNull();
  });

  it("requires form_opened_at", () => {
    const { form_opened_at, ...rest } = validStep1;
    void form_opened_at;
    expect(step1RequestSchema.safeParse(rest).success).toBe(false);
  });
});

describe("step2RequestSchema", () => {
  const token = "6b1f6a0e-6f0e-4b5e-9a3f-2f7d2c1e8b11";

  it("accepts only a token and defaults the rest", () => {
    expect(step2RequestSchema.parse({ step2_token: token })).toEqual({
      step2_token: token,
      product_type: null,
      markets: [],
      next_test_window: null,
    });
  });

  it("accepts every enum value", () => {
    const data = step2RequestSchema.parse({
      step2_token: token,
      product_type: "aerospace_equipment",
      markets: ["fcc_us", "ce_ukca", "ised_ca", "other"],
      next_test_window: "6_12_months",
    });
    expect(data.markets).toHaveLength(4);
  });

  it("removes duplicate markets", () => {
    const data = step2RequestSchema.parse({ step2_token: token, markets: ["fcc_us", "fcc_us"] });
    expect(data.markets).toEqual(["fcc_us"]);
  });

  it.each([
    { product_type: "spaceship" },
    { markets: ["mars"] },
    { next_test_window: "tomorrow" },
    { step2_token: "not-a-uuid" },
  ])("rejects %j", (patch) => {
    expect(step2RequestSchema.safeParse({ step2_token: token, ...patch }).success).toBe(false);
  });
});

describe("isPersonalEmail", () => {
  it.each(["a@gmail.com", "a@outlook.com", "a@hotmail.co.uk", "a@yahoo.com", "a@icloud.com", "a@proton.me", "A@GMAIL.COM"])(
    "flags %s",
    (email) => expect(isPersonalEmail(email)).toBe(true),
  );

  it.each(["a@sensehub.io", "a@mailgmail.com", "a@", ""])("does not flag %j", (email) => {
    expect(isPersonalEmail(email)).toBe(false);
  });
});

describe("step1FieldErrors", () => {
  it("returns the design's messages", () => {
    expect(step1FieldErrors({ email: "", role: "" })).toEqual({
      email: "Enter your work email.",
      role: "Select your role.",
    });
    expect(step1FieldErrors({ email: "x@y", role: "other" })).toEqual({
      email: "Enter a valid email address, like you@company.com.",
      role: "",
    });
  });
});
