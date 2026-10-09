/** First-touch attribution for waitlist sign-ups, kept in sessionStorage. Shared by every waitlist form. */

export const ATTRIBUTION_KEY = "crado:attribution";

export interface Attribution {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  referrer: string | null;
}

/** First-touch UTM parameters and referrer for this browser session. */
export function readAttribution(): Attribution {
  const empty: Attribution = { utm_source: null, utm_medium: null, utm_campaign: null, referrer: null };
  try {
    const stored = sessionStorage.getItem(ATTRIBUTION_KEY);
    if (stored) return { ...empty, ...(JSON.parse(stored) as Partial<Attribution>) };
  } catch {
    // Storage unavailable (private mode): fall through to the current URL.
  }
  const q = new URLSearchParams(window.location.search);
  return {
    utm_source: q.get("utm_source"),
    utm_medium: q.get("utm_medium"),
    utm_campaign: q.get("utm_campaign"),
    referrer: document.referrer || null,
  };
}

/** Records this session's first-touch UTM parameters and referrer, once. */
export function rememberAttribution(): void {
  try {
    if (!sessionStorage.getItem(ATTRIBUTION_KEY)) {
      const q = new URLSearchParams(window.location.search);
      sessionStorage.setItem(
        ATTRIBUTION_KEY,
        JSON.stringify({
          utm_source: q.get("utm_source"),
          utm_medium: q.get("utm_medium"),
          utm_campaign: q.get("utm_campaign"),
          referrer: document.referrer || null,
        }),
      );
    }
  } catch {
    // Ignore storage errors.
  }
}
