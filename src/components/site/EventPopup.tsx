import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { X, ArrowRight, Calendar, Clock, Video, MessageCircle } from "lucide-react";
import { getFeaturedEvent, useCountdownFlyer, getCountdownStage } from "@/lib/events";

export function EventPopup() {
  const event = getFeaturedEvent();
  const { flyer, label, stage } = useCountdownFlyer(event?.dateISO ?? "");
  // Storage key includes the countdown stage so the popup re-opens
  // every time the flyer changes (3days → 2days → 1day → final).
  const storageKey = event ? `oxverse.event-popup.${event.slug}.${stage}` : "";
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!event) return;
    if (typeof window === "undefined") return;
    if (localStorage.getItem(storageKey) === "1") return;
    const t = window.setTimeout(() => setOpen(true), 1200);
    return () => window.clearTimeout(t);
  }, [event, storageKey]);

  function dismiss() {
    setOpen(false);
    try {
      localStorage.setItem(storageKey, "1");
    } catch {
      /* ignore */
    }
  }

  if (!event || !open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in"
      role="dialog"
      aria-modal="true"
      aria-label={event.title}
      onClick={dismiss}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-3xl bg-background border border-border shadow-2xl animate-in zoom-in-95"
      >
        <button
          onClick={dismiss}
          aria-label="Close event popup"
          className="absolute top-3 right-3 z-10 size-9 grid place-items-center rounded-full bg-background/90 backdrop-blur border border-border hover:bg-primary hover:text-primary-foreground transition"
        >
          <X className="size-4" />
        </button>

        <Link to={`/events/${event.slug}`} onClick={dismiss} className="block">
          <img
            src={flyer}
            alt={`${event.title} flyer`}
            className="w-full h-auto"
          />
        </Link>

        <div className="p-6 sm:p-8">
          <p className="text-xs uppercase tracking-wider font-semibold text-primary">
            {event.type} • {event.price} • {label}
          </p>
          <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold tracking-tight">
            {event.title}
          </h2>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink-muted">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="size-4" /> {event.date}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="size-4" /> {event.time}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Video className="size-4" /> {event.location}
            </span>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href={event.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              onClick={dismiss}
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] text-white px-6 py-3 text-sm font-semibold hover:opacity-90 transition"
            >
              <MessageCircle className="size-4" /> Join WhatsApp Community
            </a>
            <Link
              to={`/events/${event.slug}`}
              onClick={dismiss}
              className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-semibold hover:border-ink transition"
            >
              Event details <ArrowRight className="size-4" />
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