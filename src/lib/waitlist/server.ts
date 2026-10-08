import "server-only";

import { createHmac } from "node:crypto";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import {
  CONSENT_VERSION,
  MIN_FILL_MS,
  WAITLIST_ERRORS,
  type WaitlistResponse,
  step1RequestSchema,
  step2RequestSchema,
} from "./schema";

export const RATE_LIMIT_PER_HOUR = 5;
export const STEP2_LIMIT_PER_HOUR = 20;
/** Requests whose IP cannot be determined share one bucket, so the limit can never be skipped. */
export const UNKNOWN_IP = "unknown";
/** Largest request body accepted (the real payloads are well under 1 KB). */
export const MAX_BODY_BYTES = 8 * 1024;

export interface HandlerResult {
  status: number;
  body: WaitlistResponse;
}

interface RequestContext {
  ip: string | null;
  now?: number;
}

/**
 * Logs without personal data. Only the error code is recorded: database messages can echo the offending
 * value (an email, say), so they are never logged.
 */
function logError(stage: string, error: unknown) {
  const code = typeof error === "object" && error && "code" in error ? String((error as { code: unknown }).code) : "unknown";
  console.error(`[waitlist] ${stage} failed`, { code });
}

/**
 * Visitor IP from headers the hosting platform sets (Vercel overwrites these, so clients cannot spoof them).
 * X-Forwarded-For is only a last resort: behind other proxies its first entry is client-controlled.
 */
export function clientIp(headers: Headers): string | null {
  const platform = headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() || headers.get("x-real-ip")?.trim();
  if (platform) return platform;
  return headers.get("x-forwarded-for")?.split(",")[0]?.trim() || null;
}

/** Keyed hash (HMAC-SHA256) of the IP. Raw IPs are never stored. */
export function hashIp(ip: string, salt: string): string {
  return createHmac("sha256", salt).update(ip).digest("hex");
}

/** Reads a JSON body, refusing anything over MAX_BODY_BYTES before parsing it. */
export async function readJsonBody(request: Request): Promise<{ ok: true; body: unknown } | { ok: false; status: number }> {
  const declared = Number(request.headers.get("content-length") ?? 0);
  if (declared > MAX_BODY_BYTES) return { ok: false, status: 413 };
  const text = await request.text();
  if (new TextEncoder().encode(text).length > MAX_BODY_BYTES) return { ok: false, status: 413 };
  try {
    return { ok: true, body: JSON.parse(text) as unknown };
  } catch {
    return { ok: false, status: 400 };
  }
}

function ipHashFor(ip: string | null, salt: string): string {
  return hashIp(ip ?? UNKNOWN_IP, salt);
}

function fieldErrorsFrom(issues: { path: PropertyKey[]; message: string }[]) {
  const out: Partial<Record<"email" | "role", string>> = {};
  for (const issue of issues) {
    const key = issue.path[0];
    if ((key === "email" || key === "role") && !out[key]) out[key] = issue.message;
  }
  return out;
}

export async function handleStep1(body: unknown, { ip, now = Date.now() }: RequestContext): Promise<HandlerResult> {
  const parsed = step1RequestSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors = fieldErrorsFrom(parsed.error.issues);
    return { status: 400, body: { ok: false, error: Object.values(fieldErrors)[0] ?? WAITLIST_ERRORS.generic, fieldErrors } };
  }
  const input = parsed.data;

  // Honeypot filled: look successful to the bot, store nothing.
  if (input.website.trim() !== "") {
    return { status: 200, body: { ok: true, step2_token: crypto.randomUUID() } };
  }

  if (now - input.form_opened_at < MIN_FILL_MS) {
    return { status: 400, body: { ok: false, error: WAITLIST_ERRORS.tooFast } };
  }

  const salt = process.env.WAITLIST_IP_SALT;
  if (!salt) {
    logError("step1 config", new Error("WAITLIST_IP_SALT is not set"));
    return { status: 500, body: { ok: false, error: WAITLIST_ERRORS.generic } };
  }

  try {
    const { data, error } = await getSupabaseAdmin().rpc("waitlist_step1", {
      p_email: input.email,
      p_role: input.role,
      p_marketing_opt_in: input.marketing_opt_in,
      p_consent_version: CONSENT_VERSION,
      p_source: input.source,
      p_utm_source: input.utm_source,
      p_utm_medium: input.utm_medium,
      p_utm_campaign: input.utm_campaign,
      p_referrer: input.referrer,
      p_ip_hash: ipHashFor(ip, salt),
      p_max_per_hour: RATE_LIMIT_PER_HOUR,
    });
    if (error) throw error;

    const row = (Array.isArray(data) ? data[0] : data) as { status?: string; step2_token?: string | null } | null;
    if (row?.status === "rate_limited") {
      return { status: 429, body: { ok: false, error: WAITLIST_ERRORS.rateLimited } };
    }
    if (row?.status !== "ok" || !row.step2_token) throw new Error("Unexpected waitlist_step1 result");

    // Identical for new and existing emails: no account enumeration.
    return { status: 200, body: { ok: true, step2_token: row.step2_token } };
  } catch (error) {
    logError("step1", error);
    return { status: 500, body: { ok: false, error: WAITLIST_ERRORS.generic } };
  }
}

export async function handleStep2(body: unknown, { ip }: RequestContext): Promise<HandlerResult> {
  const parsed = step2RequestSchema.safeParse(body);
  if (!parsed.success) {
    const tokenIssue = parsed.error.issues.some((i) => i.path[0] === "step2_token");
    return {
      status: tokenIssue ? 401 : 400,
      body: { ok: false, error: tokenIssue ? WAITLIST_ERRORS.expired : WAITLIST_ERRORS.generic },
    };
  }
  const input = parsed.data;

  const salt = process.env.WAITLIST_IP_SALT;
  if (!salt) {
    logError("step2 config", new Error("WAITLIST_IP_SALT is not set"));
    return { status: 500, body: { ok: false, error: WAITLIST_ERRORS.generic } };
  }

  try {
    const { data, error } = await getSupabaseAdmin().rpc("waitlist_step2", {
      p_token: input.step2_token,
      p_product_type: input.product_type,
      p_markets: input.markets.length ? input.markets : null,
      p_next_test_window: input.next_test_window,
      p_ip_hash: ipHashFor(ip, salt),
      p_max_per_hour: STEP2_LIMIT_PER_HOUR,
    });
    if (error) throw error;
    if (data === "rate_limited") return { status: 429, body: { ok: false, error: WAITLIST_ERRORS.rateLimited } };
    if (data !== "ok") return { status: 401, body: { ok: false, error: WAITLIST_ERRORS.expired } };
    return { status: 200, body: { ok: true } };
  } catch (error) {
    logError("step2", error);
    return { status: 500, body: { ok: false, error: WAITLIST_ERRORS.generic } };
  }
}
