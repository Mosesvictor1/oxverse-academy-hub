import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { X, ArrowRight, Sparkles, Check } from "lucide-react";
import { whatsappLink } from "@/lib/site";

const STORAGE_KEY = "oxverse.summer-popup.v1";

function useLockBodyScroll(lock: boolean) {
  useEffect(() => {
    if (typeof document === "undefined" || !lock) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [lock]);
}

export function SummerPopup() {
  const [open, setOpen] = useState(false);
  const [dontShow, setDontShow] = useState(false);
  useLockBodyScroll(open);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem(STORAGE_KEY) === "1") return;
    const t = window.setTimeout(() => setOpen(true), 4000);
    return () => window.clearTimeout(t);
  }, []);

  function close() {
    setOpen(false);
    if (dontShow) {
      try {
        localStorage.setItem(STORAGE_KEY, "1");
      } catch {
        /* ignore */
      }
    }
  }

  if (!open) return null;

  const badges = [
    "Ages 11–18",
    "Beginner Friendly",
    "Physical Classes",
    "Certificate Included",
    "Laptop Access During Class",
  ];

  return (
    <div
      className="fixed inset-0 z-[95] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in"
      role="dialog"
      aria-modal="true"
      aria-label="Summer Tech Bootcamp 2026"
      onClick={close}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl border border-white/15 bg-background/95 backdrop-blur-xl shadow-2xl animate-in zoom-in-95"
      >
        <button
          onClick={close}
          aria-label="Close popup"
          className="absolute top-3 right-3 z-10 size-9 grid place-items-center rounded-full bg-background/90 border border-border hover:bg-primary hover:text-primary-foreground transition"
        >
          <X className="size-4" />
        </button>

        <div className="relative overflow-hidden rounded-t-3xl bg-gradient-to-br from-primary via-purple-700 to-purple-950 text-primary-foreground p-8">
          <div
            aria-hidden
            className="absolute -top-16 -right-16 size-56 rounded-full bg-white/10 blur-2xl"
          />
          <div
            aria-hidden
            className="absolute -bottom-20 -left-10 size-64 rounded-full bg-fuchsia-500/20 blur-3xl"
          />
          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="size-3.5" /> Summer 2026 • Now Open
            </div>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl font-bold tracking-tight text-balance">
              Turn This Holiday Into a Life-Changing Tech Experience
            </h2>
            <p className="mt-3 text-primary-foreground/85 text-pretty">
              Don't let your child spend the holiday only on games and social media. Help them gain
              practical digital skills in tech this summer.
            </p>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <ul className="grid sm:grid-cols-2 gap-2.5">
            {badges.map((b) => (
              <li
                key={b}
                className="flex items-center gap-2 rounded-xl border border-border bg-muted/40 px-3 py-2 text-sm"
              >
                <span className="size-6 grid place-items-center rounded-full bg-primary/15 text-primary shrink-0">
                  <Check className="size-3.5" />
                </span>
                <span className="font-medium">{b}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              to="/summer-tech-bootcamp"
              onClick={close}
              className="inline-flex items-center gap-2 rounded-full bg-ink text-background px-6 py-3 text-sm font-semibold hover:bg-primary transition"
            >
              Register Child <ArrowRight className="size-4" />
            </Link>
            <a
              href={whatsappLink("Hi OxVerse, I'd like to talk to admissions about the Summer Tech Bootcamp.")}
              target="_blank"
              rel="noreferrer"
              onClick={close}
              className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-semibold hover:border-ink transition"
            >
              Talk to Admissions
            </a>
          </div>

          <label className="mt-5 flex items-center gap-2 text-xs text-ink-muted cursor-pointer select-none">
            <input
              type="checkbox"
              checked={dontShow}
              onChange={(e) => setDontShow(e.target.checked)}
              className="size-3.5 accent-[hsl(var(--primary))]"
            />
            Don't show this again
          </label>
        </div>
      </div>
    </div>
  );
}