"use client";

import dynamic from "next/dynamic";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import type { WaitlistSource } from "@/lib/waitlist/schema";
import { rememberAttribution } from "./attribution";

// Modal code loads on first interaction (SEO hand-off performance notes).
const WaitlistDialog = dynamic(() => import("./WaitlistDialog"), { ssr: false });

interface WaitlistContextValue {
  open: (source: WaitlistSource, trigger?: HTMLElement | null) => void;
}

const WaitlistContext = createContext<WaitlistContextValue | null>(null);

export function useWaitlist(): WaitlistContextValue {
  const ctx = useContext(WaitlistContext);
  if (!ctx) throw new Error("useWaitlist must be used inside <WaitlistProvider>");
  return ctx;
}

export { readAttribution, type Attribution } from "./attribution";

interface WaitlistProviderProps {
  children: ReactNode;
  /** Source used when the page opens with #join. */
  hashSource?: WaitlistSource;
}

export default function WaitlistProvider({ children, hashSource = "section" }: WaitlistProviderProps) {
  const [state, setState] = useState<{ mounted: boolean; open: boolean; source: WaitlistSource; key: number }>({
    mounted: false,
    open: false,
    source: "nav",
    key: 0,
  });
  const triggerRef = useRef<HTMLElement | null>(null);
  const finishedRef = useRef(false);

  const open = useCallback((source: WaitlistSource, trigger?: HTMLElement | null) => {
    triggerRef.current = trigger ?? (document.activeElement as HTMLElement | null);
    const fresh = finishedRef.current;
    finishedRef.current = false;
    setState((s) => ({ mounted: true, open: true, source, key: fresh ? s.key + 1 : s.key }));
  }, []);

  const close = useCallback(() => {
    setState((s) => ({ ...s, open: false }));
    const trigger = triggerRef.current;
    window.setTimeout(() => trigger?.focus?.(), 0);
  }, []);

  // Record first-touch attribution once per session.
  useEffect(() => {
    rememberAttribution();
  }, []);

  // Deep link: /#join opens the form.
  useEffect(() => {
    if (window.location.hash !== "#join") return;
    const t = window.setTimeout(() => open(hashSource), 300);
    return () => window.clearTimeout(t);
  }, [open, hashSource]);

  const value = useMemo(() => ({ open }), [open]);

  return (
    <WaitlistContext.Provider value={value}>
      {children}
      {state.mounted && (
        <WaitlistDialog
          key={state.key}
          open={state.open}
          source={state.source}
          onClose={close}
          onFinished={() => {
            finishedRef.current = true;
          }}
        />
      )}
    </WaitlistContext.Provider>
  );
}
