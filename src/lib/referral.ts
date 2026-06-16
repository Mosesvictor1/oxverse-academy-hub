const KEY = "oxverse.referral.v1";

export function saveReferralCode(code: string) {
  if (typeof window === "undefined") return;
  const clean = (code || "").trim().toUpperCase();
  if (!clean) return;
  try {
    localStorage.setItem(KEY, clean);
  } catch {
    /* ignore */
  }
}

export function getStoredReferralCode(): string {
  if (typeof window === "undefined") return "";
  try {
    return (localStorage.getItem(KEY) || "").toUpperCase();
  } catch {
    return "";
  }
}

/**
 * Reads a referral code from:
 *  1. an explicit `routeParam` value (e.g. /register/:ref)
 *  2. the `?ref=` query string
 *  3. localStorage (persisted from a previous visit)
 *
 * When a code is found via 1 or 2, it is persisted to localStorage so it
 * survives navigation if the user doesn't complete registration immediately.
 */
export function getReferralCodeFromUrl(routeParam?: string): string {
  if (typeof window === "undefined") return (routeParam || "").toUpperCase();
  const fromRoute = (routeParam || "").trim();
  const fromQuery = new URLSearchParams(window.location.search).get("ref") || "";
  const incoming = (fromRoute || fromQuery).trim().toUpperCase();
  if (incoming) {
    saveReferralCode(incoming);
    return incoming;
  }
  return getStoredReferralCode();
}

export function clearReferralCode() {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
}