/**
 * Feature flags. NEXT_PUBLIC_ values are inlined at build time. next.config.ts reads the same variable to choose
 * the homepage module; keep the accepted values in sync.
 */
const on = (v: string | undefined) => ["1", "true", "on"].includes((v ?? "").toLowerCase());

/** Homepage v6 (light design). Default off: the v3 homepage stays. */
export const HOMEPAGE_V6 = on(process.env.NEXT_PUBLIC_FF_HOMEPAGE_V6);
