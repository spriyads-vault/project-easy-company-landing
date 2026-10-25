"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { INITIAL_STEP1, INITIAL_STEP2, applyStep1Outcome, deriveStep1View, step1Outcome, step2Body, step2IsEmpty, step2Outcome, toggleMarket, toggleProductType, withEmail, type Step1State, type Step2State } from "@/components/home-v6/waitlist/formState";
import { readAttribution, rememberAttribution } from "@/components/waitlist/attribution";
import { FORM } from "@/content/home-v8";
import { BOOKING_URL } from "@/lib/site";
import { MARKET_OPTIONS, NEXT_TEST_WINDOW_OPTIONS, PRODUCT_TYPE_OPTIONS, ROLE_OPTIONS, SOURCES, type WaitlistResponse, type WaitlistSource } from "@/lib/waitlist/schema";
import { WL_SOURCE_EVENT } from "./Motion";
import { Icon } from "./ui";

/** The inline form at the page end: the existing "final_cta_inline" source, or "nav" / "hero" after those buttons. */
const DEFAULT_SOURCE: WaitlistSource = "final_cta_inline";

const FIELD =
  "h-[52px] w-full rounded-v8-card border-0 bg-v8-input px-4 font-[inherit] text-[16px] text-v8-white shadow-[0_0_0_1px_var(--color-v8-ring-input)] outline-none transition-shadow duration-200 ease-v8-ui placeholder:text-v8-grey focus:shadow-[0_0_0_2px_var(--color-v8-focus)]";
const LABEL = "text-[16px] leading-6 font-[450]";
const BUTTON =
  "flex h-12 cursor-pointer items-center justify-center gap-2.5 rounded-full border-0 bg-v8-button px-7 text-[16px] leading-6 font-medium text-v8-page transition-[background-color,opacity,transform] duration-200 ease-v8-ui hover:bg-v8-white active:scale-[0.98] disabled:cursor-default disabled:hover:bg-v8-button disabled:active:scale-100";
const TEXT_LINK = "text-[16px] leading-6 font-[450] text-v8-white underline decoration-v8-ring-button underline-offset-4 hover:text-v8-white hover:decoration-v8-white";

async function post(url: string, body: object): Promise<{ status: number | null; data: WaitlistResponse | null }> {
  try {
    const res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    const data = (await res.json().catch(() => null)) as WaitlistResponse | null;
    return { status: res.status, data };
  } catch {
    return { status: null, data: null };
  }
}

function Chip({ pressed, onClick, children }: { pressed: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={`min-h-10 cursor-pointer rounded-full border-0 px-4 text-[15px] leading-5 transition-[background-color,color] duration-200 ease-v8-ui ${
        pressed ? "bg-v8-button text-v8-page" : "bg-transparent text-v8-white shadow-[0_0_0_1px_var(--color-v8-ring-button)] hover:bg-white/4"
      }`}
    >
      {children}
    </button>
  );
}

function Spinner() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true" className="motion-safe:animate-spin">
      <circle cx="9" cy="9" r="7" fill="none" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2" />
      <path d="M9 2 A7 7 0 0 1 16 9" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function ErrorText({ children }: { children: ReactNode }) {
  return (
    <span className="flex items-center gap-1.5 text-v8-error">
      <Icon name="error" size={18} />
      {children}
    </span>
  );
}

/**
 * The v8 waitlist (design: #start), wired to the existing /api/waitlist and /api/waitlist/step-2 routes with the
 * same request bodies, anti-spam signals (honeypot, form-open time), roles, consent text and final state as the
 * existing forms. The design's "Create a workspace" sign-up has no backend, so it is the waitlist instead.
 * State logic is shared with the v6 form (formState.ts, unit tested).
 */
export default function WaitlistFormV8() {
  const [st, setSt] = useState<Step1State>(INITIAL_STEP1);
  const [website, setWebsite] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [answers, setAnswers] = useState<Step2State>(INITIAL_STEP2);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [step2Error, setStep2Error] = useState("");
  const source = useRef<WaitlistSource>(DEFAULT_SOURCE);
  const openedAt = useRef(0);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const shownStep = useRef(1);
  const v = deriveStep1View(st);

  useEffect(() => {
    openedAt.current = Date.now();
    rememberAttribution();
    const onSource = (e: Event) => {
      const value = (e as CustomEvent<string>).detail;
      if ((SOURCES as readonly string[]).includes(value)) source.current = value as WaitlistSource;
    };
    window.addEventListener(WL_SOURCE_EVENT, onSource);
    return () => window.removeEventListener(WL_SOURCE_EVENT, onSource);
  }, []);

  // Follow keyboard and screen reader users into each new step.
  useEffect(() => {
    if (shownStep.current === step) return;
    shownStep.current = step;
    headingRef.current?.focus();
  }, [step]);

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
      source: source.current,
      website,
      form_opened_at: openedAt.current,
      ...readAttribution(),
    });
    const outcome = step1Outcome(status, data);
    setSt((p) => applyStep1Outcome(p, outcome));
    if (outcome.kind === "success") {
      setToken(outcome.token);
      setStep(2);
    }
  }

  async function submitStep2(e: FormEvent) {
    e.preventDefault();
    if (saving) return;
    setStep2Error("");
    if (step2IsEmpty(answers) || !token) {
      setStep(3);
      return;
    }
    setSaving(true);
    const { status, data } = await post("/api/waitlist/step-2", step2Body(answers, token));
    setSaving(false);
    const outcome = step2Outcome(status, data);
    if (outcome.kind === "saved") {
      setToken(null);
      setSaved(true);
      setStep(3);
    } else setStep2Error(outcome.text);
  }

  const error =
    st.status === "rate" ? FORM.rateLimit : st.status === "server" ? FORM.serverError : st.status === "message" ? st.message : "";

  return (
    <div className="min-w-0">
      <div aria-live="polite" className="sr-only">
        {step === 2 ? FORM.onList : step === 3 ? FORM.doneSaved : ""}
      </div>

      {step === 1 && (
        <form data-step="1" onSubmit={submit} noValidate aria-label={FORM.submit} className="flex flex-col gap-5">
          {/* Honeypot: hidden from people and assistive tech; any value marks a bot. */}
          <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
            <label>
              Website
              <input type="text" name="website" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
            </label>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="wl-email" className={LABEL}>
              {FORM.emailLabel}
            </label>
            <input
              id="wl-email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              required
              placeholder={FORM.emailPlaceholder}
              value={st.email}
              onChange={(e) => setSt((p) => withEmail(p, e.target.value))}
              onBlur={() => setSt((p) => ({ ...p, touched: true }))}
              readOnly={v.loading}
              aria-invalid={v.showError || undefined}
              aria-describedby="wl-email-help"
              className={FIELD}
            />
            <div id="wl-email-help" aria-live="polite" className="min-h-[21px] text-[15px] leading-[21px]">
              {error ? (
                <ErrorText>{error}</ErrorText>
              ) : v.showPersonalHint ? (
                <span className="text-v8-grey">{FORM.personalHint}</span>
              ) : !v.emailValid ? (
                <span className={v.showError ? "text-v8-error" : "text-v8-grey"}>{FORM.emailHelp}</span>
              ) : null}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="wl-role" className={LABEL}>
              {FORM.roleLabel}
            </label>
            <div className="relative">
              <select
                id="wl-role"
                name="role"
                required
                value={st.role}
                onChange={(e) => {
                  const role = e.target.value;
                  if (!v.loading) setSt((p) => ({ ...p, role }));
                }}
                className={`${FIELD} cursor-pointer appearance-none pr-11 ${st.role ? "" : "text-v8-grey"}`}
              >
                <option value="" disabled className="bg-v8-input text-v8-white">
                  {FORM.rolePlaceholder}
                </option>
                {ROLE_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value} className="bg-v8-input text-v8-white">
                    {o.label}
                  </option>
                ))}
              </select>
              <Icon name="expand_more" size={24} className="pointer-events-none absolute top-3.5 right-3.5 text-v8-muted" />
            </div>
          </div>

          <label className="flex cursor-pointer items-center gap-3 text-[16px] leading-6 text-v8-white">
            <input
              type="checkbox"
              name="marketing_opt_in"
              checked={st.updates}
              onChange={(e) => {
                const updates = e.target.checked;
                setSt((p) => ({ ...p, updates }));
              }}
              className="m-0 h-5 w-5 flex-none cursor-pointer accent-v8-focus"
            />
            {FORM.updates}
          </label>

          <div className="flex flex-col items-stretch gap-4 v8n:items-start">
            <button type="submit" disabled={v.buttonDisabled} aria-describedby="wl-consent" className={`${BUTTON} w-full v8n:w-auto ${v.emailValid && v.roleValid ? "opacity-100" : "opacity-40"}`}>
              {v.loading && <Spinner />}
              <span>{v.loading ? FORM.loading : FORM.submit}</span>
            </button>
            <a href={BOOKING_URL} target="_blank" rel="noopener" className={TEXT_LINK}>
              {FORM.book.label}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            {/* Live consent text (consent version 2026-10-08, src/lib/waitlist/schema.ts). */}
            <p id="wl-consent" className="m-0 text-[15px] leading-[21px] text-v8-grey">
              We&apos;ll use your details to contact you about Crado early access. See our{" "}
              <Link href="/privacy" className="text-v8-white underline underline-offset-[3px] hover:text-v8-white">
                Privacy policy
              </Link>
              .
            </p>
          </div>
        </form>
      )}

      {step === 2 && (
        <form data-step="2" onSubmit={submitStep2} noValidate className="flex flex-col gap-5 motion-safe:animate-[v8-step-in_300ms_var(--ease-v8-out)_both]">
          <span className="flex items-center gap-2 text-[16px] leading-6 text-v8-white">
            <Icon name="check_circle" size={20} />
            {FORM.onList}
          </span>
          <div className="flex flex-col gap-1.5">
            <h3 ref={headingRef} tabIndex={-1} className="m-0 text-[24px] leading-[30px] font-medium outline-none">
              {FORM.step2Title}
            </h3>
            <p className="m-0 text-[16px] leading-6 text-v8-muted">{FORM.step2Intro}</p>
          </div>
          <div role="group" aria-labelledby="wl2-build" className="flex flex-col gap-2.5">
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
          <div role="group" aria-labelledby="wl2-markets" className="flex flex-col gap-2.5">
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
                className={`${FIELD} cursor-pointer appearance-none pr-11 ${answers.nextWindow ? "" : "text-v8-grey"}`}
              >
                <option value="" disabled className="bg-v8-input text-v8-white">
                  Select a timeframe
                </option>
                {NEXT_TEST_WINDOW_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value} className="bg-v8-input text-v8-white">
                    {o.label}
                  </option>
                ))}
              </select>
              <Icon name="expand_more" size={24} className="pointer-events-none absolute top-3.5 right-3.5 text-v8-muted" />
            </div>
          </div>
          {step2Error && (
            <div role="alert" className="text-[15px] leading-[21px]">
              <ErrorText>{step2Error}</ErrorText>
            </div>
          )}
          <div className="flex flex-wrap gap-3">
            <button type="submit" disabled={saving} className={BUTTON}>
              {saving && <Spinner />}
              <span>{saving ? FORM.step2Saving : FORM.step2Save}</span>
            </button>
            <button
              type="button"
              onClick={() => setStep(3)}
              className="flex h-12 cursor-pointer items-center rounded-full border-0 bg-transparent px-7 text-[16px] leading-6 font-medium text-v8-white shadow-[0_0_0_1px_var(--color-v8-ring-button)] transition-[background-color,transform] duration-200 ease-v8-ui hover:bg-white/4 active:scale-[0.98]"
            >
              {FORM.step2Skip}
            </button>
          </div>
        </form>
      )}

      {step === 3 && (
        <div data-step="3" className="flex flex-col gap-3 py-2 motion-safe:animate-[v8-step-in_300ms_var(--ease-v8-out)_both]">
          <Icon name="check_circle" size={40} className="text-v8-white" />
          <h3 ref={headingRef} tabIndex={-1} className="m-0 mt-2 text-[24px] leading-[30px] font-medium text-balance outline-none">
            {FORM.doneTitle}
          </h3>
          {saved && <p className="m-0 text-[18px] leading-[29px] text-v8-muted">{FORM.doneSaved}</p>}
          <div className="mt-2 flex flex-col items-start gap-3">
            <a href={BOOKING_URL} target="_blank" rel="noopener" className={TEXT_LINK}>
              {FORM.doneBook} <span aria-hidden="true">→</span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <Link href="/docs" className={TEXT_LINK}>
              {FORM.doneDocs} <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
