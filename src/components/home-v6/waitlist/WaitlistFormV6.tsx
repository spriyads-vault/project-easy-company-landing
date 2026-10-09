"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { readAttribution, rememberAttribution } from "@/components/waitlist/attribution";
import { WAITLIST_COPY as C } from "@/content/home-v6";
import { BOOKING_URL, CONTACT_EMAIL } from "@/lib/site";
import {
  MARKET_OPTIONS,
  NEXT_TEST_WINDOW_OPTIONS,
  PRODUCT_TYPE_OPTIONS,
  ROLE_OPTIONS,
  type WaitlistResponse,
} from "@/lib/waitlist/schema";
import { SMALL } from "../ui";
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
  type Step2State,
} from "./formState";
import s from "./WaitlistForm.module.css";

/** Attribution value for this form (the existing "final_cta_inline" source: the inline form at the page end). */
const SOURCE = "final_cta_inline";

const FIELD =
  "h-12 w-full rounded-v6-button border bg-v6-card px-4 font-v6-sans text-[16px] leading-none text-v6-ink transition-[border-color,background-color,color] duration-150 ease-v6-ui placeholder:text-v6-muted";
const LABEL = "font-v6-sans text-[14px] leading-5 font-medium";
const HELP = "font-v6-sans text-[12px] leading-4";
const LINK = "py-[11px] font-v6-sans text-[15px] leading-[22px] font-medium text-v6-primary underline-offset-[3px] hover:text-v6-primary-hover hover:underline";

async function post(url: string, body: object): Promise<{ status: number | null; data: WaitlistResponse | null }> {
  try {
    const res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    const data = (await res.json().catch(() => null)) as WaitlistResponse | null;
    return { status: res.status, data };
  } catch {
    return { status: null, data: null };
  }
}

function Chevron() {
  return (
    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" className="pointer-events-none absolute top-5 right-4 text-v6-muted">
      <polyline points="1,1.5 6,6.5 11,1.5" />
    </svg>
  );
}

function Chip({ pressed, onClick, children }: { pressed: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={`min-h-11 cursor-pointer rounded-full border px-4 font-v6-sans text-[14px] leading-5 transition-colors duration-150 ease-v6-ui hover:border-v6-ink ${
        pressed ? "border-v6-ink bg-v6-ink text-v6-on-dark" : "border-v6-line-strong bg-v6-card text-v6-ink"
      }`}
    >
      {children}
    </button>
  );
}

/**
 * The v6 waitlist (design: footer #waitlist and the Waitlist states frame), posting to the existing
 * /api/waitlist and /api/waitlist/step-2 routes unchanged. Anti-spam signals are the same as the v3 form: a hidden
 * honeypot field and the time the form was opened (the server refuses anything faster than 2 seconds). Role
 * options, consent text and step 2 fields come from the live code (src/lib/waitlist/schema.ts, WaitlistForm.tsx).
 */
export default function WaitlistFormV6() {
  const [st, setSt] = useState<Step1State>(INITIAL_STEP1);
  const [website, setWebsite] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [step2, setStep2] = useState<"closed" | "open" | "saving" | "saved">("closed");
  const [answers, setAnswers] = useState<Step2State>(INITIAL_STEP2);
  const [step2Error, setStep2Error] = useState("");
  const openedAt = useRef(0);
  const successRef = useRef<HTMLHeadingElement>(null);
  const step2Ref = useRef<HTMLHeadingElement>(null);
  const v = deriveStep1View(st);

  useEffect(() => {
    openedAt.current = Date.now();
    rememberAttribution();
  }, []);

  // Follow keyboard and screen reader users into the panel that replaces the form, and into step 2.
  useEffect(() => {
    if (st.status === "success") successRef.current?.focus();
  }, [st.status]);
  useEffect(() => {
    if (step2 === "open") step2Ref.current?.focus();
  }, [step2]);

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (v.buttonDisabled) {
      setSt((p) => ({ ...p, touched: true }));
      return;
    }
    setSt((p) => ({ ...p, status: "loading", message: "" }));
    const { status, data } = await post("/api/waitlist", {
      email: st.email,
      role: st.role,
      marketing_opt_in: st.updates,
      source: SOURCE,
      website,
      form_opened_at: openedAt.current,
      ...readAttribution(),
    });
    const outcome = step1Outcome(status, data);
    if (outcome.kind === "success") setToken(outcome.token);
    setSt((p) => applyStep1Outcome(p, outcome));
  }

  async function submitStep2(e: FormEvent) {
    e.preventDefault();
    if (step2 === "saving") return;
    setStep2Error("");
    if (step2IsEmpty(answers) || !token) {
      setStep2("closed");
      return;
    }
    setStep2("saving");
    const { status, data } = await post("/api/waitlist/step-2", step2Body(answers, token));
    const outcome = step2Outcome(status, data);
    if (outcome.kind === "saved") {
      setToken(null);
      setStep2("saved");
    } else {
      setStep2Error(outcome.text);
      setStep2("open");
    }
  }

  const emailDesc = v.showError ? "wl-email-error" : v.showPersonalHint ? "wl-email-hint" : undefined;

  return (
    <div className={`${s.wrap} flex flex-col`}>
      {v.formVisible && (
        <form onSubmit={submit} noValidate aria-label={C.submit} className={s.form}>
          {/* Honeypot: hidden from people and assistive tech; any value marks a bot. */}
          <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
            <label>
              Website
              <input type="text" name="website" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
            </label>
          </div>

          <div className={`${s.email} flex min-w-0 flex-col gap-2`}>
            <label htmlFor="wl-email" className={LABEL}>
              {C.emailLabel}
            </label>
            <input
              id="wl-email"
              type="email"
              name="email"
              autoComplete="email"
              inputMode="email"
              placeholder={C.emailPlaceholder}
              value={st.email}
              onChange={(e) => setSt((p) => withEmail(p, e.target.value))}
              onBlur={() => setSt((p) => ({ ...p, touched: true }))}
              readOnly={v.loading}
              aria-invalid={v.showError || undefined}
              aria-describedby={emailDesc}
              className={`${FIELD} ${v.showError ? "border-v6-missing-ink" : "border-v6-line-input hover:border-v6-ink"}`}
            />
            {v.showError && (
              <span id="wl-email-error" className={`${HELP} text-v6-missing-ink`}>
                {C.emailError}
              </span>
            )}
            {v.showPersonalHint && (
              <span id="wl-email-hint" className={`${HELP} text-v6-muted`}>
                {C.personalHint}
              </span>
            )}
          </div>

          <div className={`${s.role} flex min-w-0 flex-col gap-2`}>
            <label htmlFor="wl-role" className={LABEL}>
              {C.roleLabel}
            </label>
            <div className="relative">
              <select
                id="wl-role"
                name="role"
                value={st.role}
                disabled={v.roleDisabled}
                aria-describedby={v.roleDisabled ? "wl-role-help" : undefined}
                onChange={(e) => {
                  const role = e.target.value;
                  if (!v.loading) setSt((p) => ({ ...p, role }));
                }}
                className={`${FIELD} cursor-pointer appearance-none border-v6-line-input pr-10 transition-opacity disabled:cursor-not-allowed disabled:bg-v6-alt disabled:text-v6-muted ${
                  v.roleDisabled ? "" : "hover:border-v6-ink"
                } ${st.role ? "" : "text-v6-muted"} ${v.loading ? "pointer-events-none" : ""}`}
              >
                <option value="" disabled>
                  {C.rolePlaceholder}
                </option>
                {ROLE_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              <Chevron />
            </div>
            {v.roleDisabled && (
              <span id="wl-role-help" className={`${HELP} text-v6-muted`}>
                {C.roleHelp}
              </span>
            )}
          </div>

          <label className={`${s.check} flex min-h-11 cursor-pointer items-center gap-3 ${SMALL} text-v6-muted ${v.loading ? "pointer-events-none" : ""}`}>
            <input
              type="checkbox"
              name="marketing_opt_in"
              checked={st.updates}
              onChange={(e) => {
                const updates = e.target.checked;
                setSt((p) => ({ ...p, updates }));
              }}
              className="m-0 h-[18px] w-[18px] flex-none accent-v6-primary"
            />
            {C.updates}
          </label>

          <button
            type="submit"
            disabled={v.buttonDisabled}
            className={`${s.btn} inline-flex items-center justify-center gap-2 rounded-v6-button border-0 px-5 font-v6-sans text-[15px] leading-none font-medium whitespace-nowrap transition-[background-color,color,transform] duration-150 ease-v6-ui ${
              v.loading
                ? "cursor-progress bg-v6-primary text-v6-on-primary"
                : v.buttonDisabled
                  ? "cursor-not-allowed bg-v6-alt text-v6-muted"
                  : "cursor-pointer bg-v6-primary text-v6-on-primary hover:bg-v6-primary-hover active:translate-y-px"
            }`}
          >
            {v.loading ? (
              <>
                <span aria-hidden="true" className="h-3.5 w-3.5 rounded-full border-2 border-v6-spinner-track border-t-v6-on-primary motion-safe:animate-v6-spin" />
                <span>{C.loading}</span>
              </>
            ) : (
              <span>{C.submit}</span>
            )}
          </button>

          {/* Live consent text (consent version 2026-10-08, src/lib/waitlist/schema.ts). */}
          <p className={`${s.consent} m-0 ${HELP} text-v6-muted`}>
            We&apos;ll use your details to contact you about Crado early access. See our{" "}
            <Link href="/privacy" className="text-v6-primary underline underline-offset-2 hover:text-v6-primary-hover">
              Privacy policy
            </Link>
            .
          </p>
        </form>
      )}

      <div className={st.status === "success" ? "flex flex-col gap-2 rounded-v6-card bg-v6-mint p-6 text-v6-ink motion-safe:animate-v6-in" : "flex flex-col"}>
        {/* Success, rate-limit and server-error messages are announced from this region. */}
        <div role="status" aria-live="polite" className="flex flex-col gap-2">
          {st.status === "success" && (
            <>
              <h4 ref={successRef} tabIndex={-1} className="m-0 font-v6-serif text-[length:var(--v6-h3)] leading-(--v6-h3-lh) font-normal outline-none">
                {C.successTitle}
              </h4>
              {/* Design: "We've sent a confirmation to …". No confirmation email is sent today, so this uses the live
                  form's wording instead (flagged in the PR). */}
              <p className="m-0 font-v6-sans text-[length:var(--v6-body)] leading-(--v6-body-lh)">We&apos;ll be in touch from {CONTACT_EMAIL}.</p>
            </>
          )}
          {st.status === "rate" && <p className={`m-0 mt-3 ${SMALL} text-v6-missing-ink motion-safe:animate-v6-in`}>{C.rateLimit}</p>}
          {st.status === "server" && (
            <p className={`m-0 mt-3 ${SMALL} text-v6-missing-ink motion-safe:animate-v6-in`}>
              {C.serverError}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-v6-missing-ink underline hover:text-v6-missing-ink">
                {C.serverErrorLink}
              </a>
              .
            </p>
          )}
          {st.status === "message" && <p className={`m-0 mt-3 ${SMALL} text-v6-missing-ink motion-safe:animate-v6-in`}>{st.message}</p>}
        </div>
        {st.status === "success" && (
          <>
            {step2 === "saved" ? (
              <p className="m-0 mt-2 font-v6-sans text-[15px] leading-[22px] font-medium">Thanks. Your details are saved.</p>
            ) : (
              <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1">
                {step2 === "closed" && token && (
                  <a
                    href="#waitlist-step-2"
                    onClick={(e) => {
                      e.preventDefault();
                      setStep2("open");
                    }}
                    className={LINK}
                  >
                    {C.step2Link}
                  </a>
                )}
                <a href={BOOKING_URL} target="_blank" rel="noopener" className={LINK}>
                  {C.book}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </div>
            )}

            {(step2 === "open" || step2 === "saving") && (
              <form id="waitlist-step-2" onSubmit={submitStep2} noValidate className="mt-4 flex flex-col gap-5 rounded-v6-card bg-v6-card p-5">
                <div className="flex flex-col gap-1">
                  <h5 ref={step2Ref} tabIndex={-1} className="m-0 font-v6-serif text-[22px] leading-[30px] font-normal outline-none">
                    Help us shape your pilot
                  </h5>
                  <p className={`m-0 ${SMALL} text-v6-muted`}>Optional. Takes 15 seconds.</p>
                </div>
                <div role="group" aria-labelledby="wl2-build" className="flex flex-col gap-2">
                  <span id="wl2-build" className={LABEL}>
                    What are you building?
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {PRODUCT_TYPE_OPTIONS.map((o) => (
                      <Chip key={o.value} pressed={answers.productType === o.value} onClick={() => setAnswers((a) => toggleProductType(a, o.value))}>
                        {o.label}
                      </Chip>
                    ))}
                  </div>
                </div>
                <div role="group" aria-labelledby="wl2-markets" className="flex flex-col gap-2">
                  <span id="wl2-markets" className={LABEL}>
                    Which markets?
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {MARKET_OPTIONS.map((o) => (
                      <Chip key={o.value} pressed={answers.markets.includes(o.value)} onClick={() => setAnswers((a) => toggleMarket(a, o.value))}>
                        {o.label}
                      </Chip>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="wl2-next" className={LABEL}>
                    Next compliance test
                  </label>
                  <div className="relative">
                    <select
                      id="wl2-next"
                      value={answers.nextWindow}
                      onChange={(e) => {
                        const nextWindow = e.target.value;
                        setAnswers((a) => ({ ...a, nextWindow }));
                      }}
                      className={`${FIELD} cursor-pointer appearance-none border-v6-line-input pr-10 hover:border-v6-ink ${answers.nextWindow ? "" : "text-v6-muted"}`}
                    >
                      <option value="" disabled>
                        Select a timeframe
                      </option>
                      {NEXT_TEST_WINDOW_OPTIONS.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                    <Chevron />
                  </div>
                </div>
                {step2Error && <p className={`m-0 ${SMALL} text-v6-missing-ink`}>{step2Error}</p>}
                <div className="flex flex-wrap gap-3">
                  <button
                    type="submit"
                    disabled={step2 === "saving"}
                    className="inline-flex h-11 cursor-pointer items-center rounded-v6-button border-0 bg-v6-primary px-5 font-v6-sans text-[15px] leading-none font-medium text-v6-on-primary transition-colors duration-150 ease-v6-ui hover:bg-v6-primary-hover active:translate-y-px disabled:cursor-progress"
                  >
                    {step2 === "saving" ? "Saving…" : "Submit"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep2("closed")}
                    className="inline-flex h-11 cursor-pointer items-center rounded-v6-button border border-v6-line-strong bg-transparent px-5 font-v6-sans text-[15px] leading-none font-medium text-v6-ink transition-colors duration-150 ease-v6-ui hover:border-v6-ink active:translate-y-px"
                  >
                    Skip
                  </button>
                </div>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
}
