/**
 * Integrations whose official mark may appear in product demos. Only switch one
 * on once it works today; until then demos show a neutral line icon. The marks
 * are already in /public/assets/marks, so enabling one is this one-line change.
 */
export const LIVE_INTEGRATIONS = {
  slack: false,
  whatsapp: false,
} as const;
