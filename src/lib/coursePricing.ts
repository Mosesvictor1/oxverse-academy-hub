// Course pricing (Naira). Kept private — only shown on the payment page
// after a successful registration submission, never listed publicly.

export const COURSE_PRICES_NGN: Record<string, number> = {
  "frontend-development": 200_000,
  "backend-development": 200_000,
  "graphics-design": 150_000,
  "mobile-development": 200_000,
  "ui-ux-design": 150_000,
  "data-analysis": 300_000,
  "web3-blockchain": 300_000,
  "digital-marketing": 200_000,
  "full-stack-development": 400_000,
  "artificial-intelligence": 450_000,
  "ai-engineering": 200_000,
  "ai-automation": 150_000,
  "ai-vibe-coding": 150_000,
};

export const BANK_DETAILS = {
  accountName: "OXVERSE ACADEMY LTD",
  accountNumber: "1030013192",
  bankName: "UBA",
} as const;

export function formatNaira(amount: number): string {
  return `₦${amount.toLocaleString("en-NG")}`;
}

export function getCoursePrice(slug: string): number | undefined {
  return COURSE_PRICES_NGN[slug];
}
