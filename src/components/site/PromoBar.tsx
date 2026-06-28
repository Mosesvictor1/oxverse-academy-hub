import { Rocket, X } from "lucide-react";
import { Link } from "react-router-dom";

export function PromoBar({ onDismiss }: { onDismiss: () => void }) {
  return (
    <div className="fixed top-0 inset-x-0 z-[60] h-10 bg-gradient-to-r from-primary via-purple-700 to-primary text-primary-foreground flex items-center px-3 sm:px-10 text-xs sm:text-sm shadow-md overflow-hidden">
      {/* animated shine */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 bg-gradient-to-r from-transparent via-white/25 to-transparent blur-md animate-[promo-shine_3.5s_linear_infinite]"
      />
      <style>{`@keyframes promo-shine { 0% { transform: translateX(0) } 100% { transform: translateX(400%) } }`}</style>

      <div className="relative mx-auto flex items-center gap-2 sm:gap-3 min-w-0">
        <Rocket className="size-4 shrink-0 hidden sm:inline animate-pulse" aria-hidden />
        <p className="truncate">
          <span className="hidden sm:inline font-semibold">Summer Tech Bootcamp 2026</span>
          <span className="sm:hidden font-semibold">Summer Bootcamp 2026</span>
          <span className="mx-2 hidden sm:inline opacity-70">•</span>
          <span className="hidden sm:inline">Registration open. Limited slots.</span>
        </p>
        <span className="hidden md:inline-flex items-center gap-1 rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider">
          Ages 11–18
        </span>
        <Link
          to="/summer-tech-bootcamp"
          className="shrink-0 rounded-full bg-white text-primary px-3 py-1 text-[11px] sm:text-xs font-semibold hover:bg-white/90 transition shadow-[0_0_18px_rgba(255,255,255,0.4)]"
        >
          Register
        </Link>
        <Link
          to="/summer-tech-bootcamp"
          className="hidden sm:inline-flex shrink-0 rounded-full border border-white/40 px-3 py-1 text-xs font-semibold hover:bg-white/10 transition"
        >
          Learn more
        </Link>
      </div>
      <button
        onClick={onDismiss}
        aria-label="Dismiss promotion"
        className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 rounded-md hover:bg-white/15 transition"
      >
        <X className="size-4" />
      </button>
    </div>
  );
}