"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { BOOKING_URL, CONTACT_EMAIL, LOGO_PATH } from "@/lib/site";
import {
  MARKET_OPTIONS,
  NEXT_TEST_WINDOW_OPTIONS,
  PRODUCT_TYPE_OPTIONS,
  ROLE_OPTIONS,
  WAITLIST_ERRORS,
  isPersonalEmail,
  step1FieldErrors,
  type Market,
  type NextTestWindow,
  type ProductType,
  type WaitlistResponse,
  type WaitlistSource,
} from "@/lib/waitlist/schema";
import { readAttribution } from "./WaitlistProvider";

export type WaitlistStep = 1 | 2 | 3;

interface WaitlistFormProps {
  source: WaitlistSource;
  /** "modal" renders inside the dialog; "inline" is the framed card in the final CTA section. */
  variant: "modal" | "inline";
  /** Heading level for the step titles: h2 in the dialog, h3 inside the CTA section. */
  headingLevel?: 2 | 3;
  /** Lets the dialog label itself with the current step's heading. */
  onTitleId?: (id: string) => void;
  onStepChange?: (step: WaitlistStep) => void;
}

const fieldBase =
  "h-10 w-full rounded-md border bg-surface-2 px-3 font-sans text-sm text-fg outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-fg-faint focus:border-accent-text focus:shadow-[0_0_0_3px_var(--color-accent-soft)]";

function ErrorLine({ id, children }: { id: string; children: ReactNode }) {
  return (
    <span id={id} className="flex items-center gap-1.5 text-xs text-danger">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="flex-none" aria-hidden="true">
        <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 8v5M12 16h.01" />
      </svg>
      {children}
    </span>
  );
}

function Chevron() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="pointer-events-none absolute top-[13px] right-3 text-fg-muted" aria-hidden="true">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function Check({ size, className }: { size: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={`flex-none ${className ?? ""}`} aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function Chip({ pressed, onClick, children }: { pressed: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={`h-8 cursor-pointer rounded-full border px-3 font-sans text-[13px] transition-[border-color,background-color] duration-150 hover:border-line-8 ${
        pressed ? "border-accent-text bg-accent-soft text-fg" : "border-line-5 bg-transparent text-fg-4"
      }`}
    >
      {children}
    </button>
  );
}

const primaryBtn =
  "flex h-10 cursor-pointer items-center justify-center gap-2 rounded-md border-0 bg-fg px-4 font-sans text-sm font-medium text-bg transition-colors hover:bg-white disabled:cursor-default";

export default function WaitlistForm({ source, variant, headingLevel = 2, onTitleId, onStepChange }: WaitlistFormProps) {
  const uid = useId().replace(/:/g, "");
  const ids = {
    t1: `wl-${uid}-title-1`,
    t2: `wl-${uid}-title-2`,
    t3: `wl-${uid}-title-3`,
    email: `wl-${uid}-email`,
    emailErr: `wl-${uid}-email-err`,
    emailHint: `wl-${uid}-email-hint`,
    role: `wl-${uid}-role`,
    roleErr: `wl-${uid}-role-err`,
    consent: `wl-${uid}-consent`,
    build: `wl-${uid}-build`,
    markets: `wl-${uid}-markets`,
    next: `wl-${uid}-next`,
    formErr: `wl-${uid}-form-err`,
  };
  const H = headingLevel === 2 ? "h2" : "h3";

  const [step, setStep] = useState<WaitlistStep>(1);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [optIn, setOptIn] = useState(false);
  const [website, setWebsite] = useState("");
  const [touched, setTouched] = useState({ email: false, role: false });
  const [serverFieldErrors, setServerFieldErrors] = useState<Partial<Record<"email" | "role", string>>>({});
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [productType, setProductType] = useState<ProductType | null>(null);
  const [markets, setMarkets] = useState<Market[]>([]);
  const [nextWindow, setNextWindow] = useState<NextTestWindow | "">("");
  const openedAt = useRef<number>(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const roleRef = useRef<HTMLSelectElement>(null);
  const shownStep = useRef<WaitlistStep>(1);

  useEffect(() => {
    openedAt.current = Date.now();
  }, []);

  useEffect(() => {
    onTitleId?.(step === 1 ? ids.t1 : step === 2 ? ids.t2 : ids.t3);
    onStepChange?.(step);
    // Only a real step change moves focus (not mount, and not Strict Mode's repeated effect run).
    if (shownStep.current === step) return;
    shownStep.current = step;
    // Move focus into the new step so keyboard and screen reader users follow along.
    const target = rootRef.current?.querySelector<HTMLElement>(`[data-step="${step}"] [data-autofocus]`);
    target?.focus({ preventScroll: variant === "modal" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  const clientErrors = step1FieldErrors({ email, role });
  const emailError = serverFieldErrors.email || (touched.email ? clientErrors.email : "");
  const roleError = serverFieldErrors.role || (touched.role ? clientErrors.role : "");
  const showHint = !emailError && isPersonalEmail(email);

  async function submitStep1(e: FormEvent) {
    e.preventDefault();
    if (loading) return;
    setTouched({ email: true, role: true });
    setServerFieldErrors({});
    setFormError("");
    if (clientErrors.email || clientErrors.role) {
      (clientErrors.email ? emailRef : roleRef).current?.focus();
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          role,
          marketing_opt_in: optIn,
          source,
          website,
          form_opened_at: openedAt.current,
          ...readAttribution(),
        }),
      });
      const data = (await res.json().catch(() => null)) as WaitlistResponse | null;
      if (!data?.ok) {
        if (data?.fieldErrors && Object.keys(data.fieldErrors).length) setServerFieldErrors(data.fieldErrors);
        else setFormError(data?.error ?? WAITLIST_ERRORS.generic);
        return;
      }
      setToken(data.step2_token ?? null);
      setStep(2);
    } catch {
      setFormError(WAITLIST_ERRORS.generic);
    } finally {
      setLoading(false);
    }
  }

  async function submitStep2(e: FormEvent) {
    e.preventDefault();
    if (loading) return;
    setFormError("");
    const nothingChosen = !productType && markets.length === 0 && !nextWindow;
    if (nothingChosen || !token) {
      setStep(3);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/waitlist/step-2", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          step2_token: token,
          product_type: productType,
          markets,
          next_test_window: nextWindow || null,
        }),
      });
      const data = (await res.json().catch(() => null)) as WaitlistResponse | null;
      if (!data?.ok) {
        setFormError(data?.error ?? WAITLIST_ERRORS.generic);
        return;
      }
      setToken(null);
      setStep(3);
    } catch {
      setFormError(WAITLIST_ERRORS.generic);
    } finally {
      setLoading(false);
    }
  }

  const stepClass = variant === "modal" || step > 1 ? "motion-safe:animate-step-in" : "";

  return (
    <div ref={rootRef} className="font-sans text-fg">
      <Image src={LOGO_PATH} alt="Crado" width={18} height={20} className="block h-5 w-auto" />

      <div aria-live="polite" className="sr-only">
        {step === 2 ? "You're on the list." : step === 3 ? "Thanks. Your details are saved." : ""}
      </div>

      {step === 1 && (
        <form data-step="1" noValidate onSubmit={submitStep1} className={`mt-5 flex flex-col gap-[18px] ${stepClass}`}>
          <div className="flex flex-col gap-1.5">
            <H id={ids.t1} tabIndex={-1} data-autofocus className="m-0 font-display text-[22px] leading-[1.2] font-bold tracking-[-0.02em] outline-none">
              Join early access
            </H>
            <p className="m-0 text-sm leading-[1.55] text-pretty text-fg-6">
              We&apos;re onboarding a small number of hardware teams. Tell us who you are and we&apos;ll be in touch about a pilot.
            </p>
          </div>

          {/* Honeypot: hidden from people and assistive tech. */}
          <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
            <label>
              Website
              <input type="text" name="website" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
            </label>
          </div>

          <div className={variant === "inline" ? "grid gap-[18px] min-[560px]:grid-cols-2" : "contents"}>
            <div className="flex flex-col gap-1.5">
              <label htmlFor={ids.email} className="text-[13px] font-medium">
                Work email <span className="text-accent-text" aria-hidden="true">*</span>
              </label>
              <input
                ref={emailRef}
                id={ids.email}
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                required
                aria-required="true"
                aria-invalid={emailError ? true : undefined}
                aria-describedby={emailError ? ids.emailErr : showHint ? ids.emailHint : undefined}
                placeholder="you@company.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (serverFieldErrors.email) setServerFieldErrors((s) => ({ ...s, email: undefined }));
                }}
                onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                className={`${fieldBase} ${emailError ? "border-danger" : "border-line-5"}`}
              />
              {emailError && <ErrorLine id={ids.emailErr}>{emailError}</ErrorLine>}
              {showHint && (
                <span id={ids.emailHint} className="text-xs text-fg-6">
                  A work email helps us match you to the right pilot.
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor={ids.role} className="text-[13px] font-medium">
                Role <span className="text-accent-text" aria-hidden="true">*</span>
              </label>
              <div className="relative">
                <select
                  ref={roleRef}
                  id={ids.role}
                  name="role"
                  required
                  aria-required="true"
                  aria-invalid={roleError ? true : undefined}
                  aria-describedby={roleError ? ids.roleErr : undefined}
                  value={role}
                  onChange={(e) => {
                    setRole(e.target.value);
                    setTouched((t) => ({ ...t, role: true }));
                  }}
                  onBlur={() => setTouched((t) => ({ ...t, role: true }))}
                  className={`${fieldBase} cursor-pointer appearance-none pr-[34px] ${role ? "text-fg" : "text-fg-faint"} ${roleError ? "border-danger" : "border-line-5"}`}
                >
                  <option value="" disabled>
                    Select your role
                  </option>
                  {ROLE_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
                <Chevron />
              </div>
              {roleError && <ErrorLine id={ids.roleErr}>{roleError}</ErrorLine>}
            </div>
          </div>

          <p id={ids.consent} className="m-0 text-xs leading-[1.5] text-fg-faint">
            We&apos;ll use your details to contact you about Crado early access. See our{" "}
            <Link href="/privacy" className="text-fg-6 underline underline-offset-2 hover:text-fg">
              Privacy policy
            </Link>
            .
          </p>

          <label className="flex cursor-pointer items-center gap-2.5 self-start text-[13px] text-fg-3">
            <input type="checkbox" name="marketing_opt_in" checked={optIn} onChange={(e) => setOptIn(e.target.checked)} className="peer sr-only" />
            <span
              aria-hidden="true"
              className={`flex h-4 w-4 flex-none items-center justify-center rounded-xs border text-on-accent peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent ${
                optIn ? "border-accent bg-accent" : "border-line-8 bg-transparent"
              }`}
            >
              {optIn && <Check size={11} />}
            </span>
            Send me occasional product updates.
          </label>

          {formError && (
            <div role="alert" id={ids.formErr}>
              <ErrorLine id={`${ids.formErr}-line`}>{formError}</ErrorLine>
            </div>
          )}

          <button type="submit" disabled={loading} aria-describedby={ids.consent} className={`${primaryBtn} ${loading ? "opacity-85" : ""}`}>
            {loading && (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" className="motion-safe:animate-spin" aria-hidden="true">
                <circle cx="12" cy="12" r="9" strokeOpacity=".2" />
                <path d="M12 3a9 9 0 0 1 9 9" />
              </svg>
            )}
            {loading ? "Joining…" : "Join early access"}
          </button>
        </form>
      )}

      {step === 2 && (
        <form data-step="2" noValidate onSubmit={submitStep2} className={`mt-5 flex flex-col gap-[18px] ${stepClass}`}>
          <span className="flex items-center gap-2 text-[13px] text-ok">
            <Check size={14} />
            You&apos;re on the list.
          </span>
          <div className="flex flex-col gap-1.5">
            <H id={ids.t2} tabIndex={-1} data-autofocus className="m-0 font-display text-[22px] leading-[1.2] font-bold tracking-[-0.02em] outline-none">
              Help us shape your pilot
            </H>
            <p className="m-0 text-sm text-fg-6">Optional. Takes 15 seconds.</p>
          </div>

          <div role="group" aria-labelledby={ids.build} className="flex flex-col gap-2">
            <span id={ids.build} className="text-[13px] font-medium">
              What are you building?
            </span>
            <div className="flex flex-wrap gap-2">
              {PRODUCT_TYPE_OPTIONS.map((o) => (
                <Chip key={o.value} pressed={productType === o.value} onClick={() => setProductType((v) => (v === o.value ? null : o.value))}>
                  {o.label}
                </Chip>
              ))}
            </div>
          </div>

          <div role="group" aria-labelledby={ids.markets} className="flex flex-col gap-2">
            <span id={ids.markets} className="text-[13px] font-medium">
              Which markets?
            </span>
            <div className="flex flex-wrap gap-2">
              {MARKET_OPTIONS.map((o) => (
                <Chip
                  key={o.value}
                  pressed={markets.includes(o.value)}
                  onClick={() => setMarkets((list) => (list.includes(o.value) ? list.filter((m) => m !== o.value) : [...list, o.value]))}
                >
                  {o.label}
                </Chip>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor={ids.next} className="text-[13px] font-medium">
              Next compliance test
            </label>
            <div className="relative">
              <select
                id={ids.next}
                value={nextWindow}
                onChange={(e) => setNextWindow(e.target.value as NextTestWindow)}
                className={`${fieldBase} cursor-pointer appearance-none border-line-5 pr-[34px] ${nextWindow ? "text-fg" : "text-fg-faint"}`}
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

          {formError && (
            <div role="alert">
              <ErrorLine id={`${ids.formErr}-2`}>{formError}</ErrorLine>
            </div>
          )}

          <div className="flex gap-2">
            <button type="submit" disabled={loading} className={`${primaryBtn} flex-1 ${loading ? "opacity-85" : ""}`}>
              {loading ? "Saving…" : "Submit"}
            </button>
            <button
              type="button"
              onClick={() => setStep(3)}
              className="h-10 cursor-pointer rounded-md border border-line-5 bg-transparent px-[18px] font-sans text-sm text-fg-3 transition-colors hover:bg-surface-6"
            >
              Skip
            </button>
          </div>
        </form>
      )}

      {step === 3 && (
        <div data-step="3" className={`mt-5 flex flex-col gap-4 ${stepClass}`}>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[rgb(74_222_128/0.12)] text-ok">
            <Check size={18} />
          </span>
          <H id={ids.t3} tabIndex={-1} data-autofocus className="m-0 font-display text-[22px] leading-[1.25] font-bold tracking-[-0.02em] text-balance outline-none">
            Thanks. We&apos;ll be in touch from {CONTACT_EMAIL}.
          </H>
          <div className="flex flex-col gap-2.5 text-sm font-medium">
            <a href={BOOKING_URL} target="_blank" rel="noopener" className="group inline-flex gap-1.5 self-start">
              Book a 30-minute call <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-[3px]">→</span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <Link href="/docs" className="group inline-flex gap-1.5 self-start text-fg-4 hover:text-fg">
              Read the docs <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-[3px]">→</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
