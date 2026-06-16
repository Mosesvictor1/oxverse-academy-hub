import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { X, ArrowRight, Gift, Share2, Mail, Wallet, UserPlus } from "lucide-react";

const STORAGE_KEY = "oxverse.referral-popup.v1";

function useLockBodyScroll(lock: boolean) {
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (!lock) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [lock]);
}

/**
 * Marketing popup that pitches the OxVerse referral program on the home page.
 * Shows once per browser (dismissible). Appears a few seconds after page load
 * so it doesn't compete with the event popup.
 */
export function ReferralPopup() {
  const [open, setOpen] = useState(false);
  useLockBodyScroll(open);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem(STORAGE_KEY) === "1") return;
    const t = window.setTimeout(() => setOpen(true), 6000);
    return () => window.clearTimeout(t);
  }, []);

  function dismiss() {
    setOpen(false);
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
  }

  if (!open) return null;

  const steps = [
    { i: UserPlus, t: "Register", d: "Sign up on OxVerse takes under a minute." },
    { i: Mail, t: "Get your link", d: "Your personal referral code & link are emailed to you instantly." },
    { i: Share2, t: "Share with friends", d: "Drop your link on WhatsApp, X, Instagram anywhere." },
    { i: Wallet, t: "Earn 5% cash", d: "When they enrol & pay, you earn 5% instantly to your email." },
  ];

  return (
    <div
      className="fixed inset-0 z-[95] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in"
      role="dialog"
      aria-modal="true"
      aria-label="Refer & earn with OxVerse"
      onClick={dismiss}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl bg-background border border-border shadow-2xl animate-in zoom-in-95"
      >
        <button
          onClick={dismiss}
          aria-label="Close referral popup"
          className="absolute top-3 right-3 z-10 size-9 grid place-items-center rounded-full bg-background/90 backdrop-blur border border-border hover:bg-primary hover:text-primary-foreground transition"
        >
          <X className="size-4" />
        </button>

        <div className="rounded-t-3xl bg-gradient-to-br from-primary to-purple-900 text-primary-foreground p-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider">
            <Gift className="size-3.5" /> Refer & earn
          </div>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl font-bold tracking-tight">
            Earn <span className="underline decoration-white/40">5% cash</span> on every friend you refer.
          </h2>
          <p className="mt-3 text-primary-foreground/85 text-pretty">
            Register on OxVerse, share your personal link, and earn 5% of the tuition every time
            someone enrols and pays through you paid out immediately.
          </p>
        </div>

        <div className="p-6 sm:p-8">
          <ol className="grid sm:grid-cols-2 gap-4">
            {steps.map((s, idx) => (
              <li key={s.t} className="rounded-2xl border border-border p-4 flex gap-3">
                <span className="size-9 grid place-items-center rounded-xl bg-primary/10 text-primary shrink-0">
                  <s.i className="size-4" />
                </span>
                <div>
                  <p className="text-xs font-mono text-ink-muted">Step {idx + 1}</p>
                  <p className="font-semibold">{s.t}</p>
                  <p className="text-sm text-ink-muted mt-0.5">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              to="/register"
              onClick={dismiss}
              className="inline-flex items-center gap-2 rounded-full bg-ink text-background px-6 py-3 text-sm font-semibold hover:bg-primary transition"
            >
              Register & get my link <ArrowRight className="size-4" />
            </Link>
            <Link
              to="/waitlist"
              onClick={dismiss}
              className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-semibold hover:border-ink transition"
            >
              Join the waitlist
            </Link>
            <button
              onClick={dismiss}
              className="text-sm text-ink-muted hover:text-ink underline underline-offset-4"
            >
              Maybe later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}