import { Sparkles, X } from "lucide-react";
import { Link } from "react-router-dom";

export function PromoBar({ onDismiss }: { onDismiss: () => void }) {
  return (
    <div className="fixed top-0 inset-x-0 z-[60] h-10 bg-gradient-to-r from-primary via-purple-700 to-primary text-primary-foreground flex items-center justify-center px-10 text-xs sm:text-sm shadow-md">
      <Sparkles className="size-4 mr-2 shrink-0 hidden sm:inline" aria-hidden />
      <p className="truncate">
        <span className="hidden sm:inline">🎉 Limited time: </span>
        <strong>20% OFF</strong> all courses <span className="hidden sm:inline">+ <strong>5% referral bonus</strong></span>.{" "}
        <Link
          to="/waitlist"
          className="underline font-semibold underline-offset-2 hover:opacity-90"
        >
          Register to unlock →
        </Link>
      </p>
      <button
        onClick={onDismiss}
        aria-label="Dismiss promotion"
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-md hover:bg-white/15 transition"
      >
        <X className="size-4" />
      </button>
    </div>
  );
}