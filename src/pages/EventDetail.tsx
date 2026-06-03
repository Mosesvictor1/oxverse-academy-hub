import { useMemo } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  Sparkles,
  Mic,
  ArrowRight,
  Check,
  Video,
  MessageCircle,
  Users,
} from "lucide-react";
import { SiteLayout, SectionEyebrow } from "@/components/site/SiteLayout";
import { SEO } from "@/components/site/SEO";
import { getEvent, useCountdownFlyer } from "@/lib/events";

export default function EventDetailPage() {
  const { slug = "" } = useParams();
  const event = useMemo(() => getEvent(slug), [slug]);
  const { flyer, label } = useCountdownFlyer(event?.dateISO ?? "");

  if (!event) return <Navigate to="/events" replace />;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: event.description,
    startDate: event.dateISO,
    eventAttendanceMode:
      "https://schema.org/OnlineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    image: [`https://oxverse.academy${flyer}`],
    location: {
      "@type": "VirtualLocation",
      url: `https://oxverse.academy/events/${event.slug}`,
    },
    organizer: {
      "@type": "Organization",
      name: "OxVerse Academy",
      url: "https://oxverse.academy",
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "NGN",
      availability: "https://schema.org/InStock",
      url: `https://oxverse.academy/events/${event.slug}`,
    },
    performer: event.speakers.map((s) => ({ "@type": "Person", name: s.name })),
  };

  return (
    <SiteLayout>
      <SEO
        title={`${event.title} — OxVerse Academy`}
        description={event.description}
        image={flyer}
        canonical={`https://oxverse.academy/events/${event.slug}`}
        type="article"
        jsonLd={jsonLd}
      />

      <section className="relative">
        <div className="absolute inset-0 grid-pattern opacity-40 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        <div className="absolute inset-0 radial-purple" />
        <div className="relative mx-auto max-w-7xl px-6 pt-24 pb-12 grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <SectionEyebrow>{event.type}</SectionEyebrow>
            <h1 className="mt-6 font-display text-4xl md:text-6xl font-bold tracking-tighter text-balance">
              {event.title}
            </h1>
            <p className="mt-5 max-w-xl text-lg text-ink-muted text-pretty">
              {event.tagline}
            </p>
            <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="size-3.5" /> {label}
            </p>

            <div className="mt-8 grid sm:grid-cols-3 gap-3">
              <Info icon={Calendar} label={event.date} />
              <Info icon={Clock} label={event.time} />
              <Info icon={Video} label={event.location} />
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={event.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#25D366] text-white px-7 py-4 font-semibold hover:opacity-90 transition shadow-lg shadow-[#25D366]/30"
              >
                <MessageCircle className="size-5" /> Join WhatsApp Community
              </a>
              <span className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm">
                <Sparkles className="size-4 text-primary" /> {event.price}
              </span>
            </div>
          </div>

          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="rounded-3xl overflow-hidden shadow-2xl shadow-primary/30 border border-border"
            >
              <img
                src={flyer}
                alt={`${event.title} flyer`}
                className="w-full h-auto"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-7 space-y-10">
          <div>
            <h2 className="font-display text-3xl font-bold tracking-tight">
              About this event
            </h2>
            <p className="mt-4 text-ink-muted text-pretty">{event.description}</p>

            <ul className="mt-6 space-y-3">
              {event.highlights.map((h) => (
                <li key={h} className="flex gap-3">
                  <span className="size-6 grid place-items-center rounded-full bg-primary/15 text-primary shrink-0">
                    <Check className="size-3.5" />
                  </span>
                  <span className="text-ink">{h}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-3xl font-bold tracking-tight">Speakers</h2>
            <div className="mt-6 grid sm:grid-cols-2 gap-5">
              {event.speakers.map((s) => (
                <div
                  key={s.name}
                  className="rounded-2xl border border-border p-6 bg-background"
                >
                  <div className="size-10 rounded-xl bg-primary/15 text-primary inline-flex items-center justify-center">
                    <Mic className="size-5" />
                  </div>
                  <p className="mt-4 font-display text-xl font-semibold">{s.name}</p>
                  <p className="text-sm text-ink-muted">{s.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside id="register" className="lg:col-span-5">
          <div className="rounded-3xl border border-border bg-gradient-to-br from-[#25D366]/10 via-background to-background p-8 sticky top-24 shadow-xl">
            <div className="size-14 grid place-items-center rounded-2xl bg-[#25D366] text-white">
              <MessageCircle className="size-7" />
            </div>
            <p className="mt-5 text-xs uppercase tracking-wider font-semibold text-[#128C7E]">
              Free registration
            </p>
            <h3 className="mt-2 font-display text-2xl font-bold tracking-tight">
              Join our WhatsApp community
            </h3>
            <p className="mt-3 text-sm text-ink-muted">
              Tap the button to join the official 0xVerse Academy WhatsApp group.
              You'll get the Google Meet link, reminders and event updates directly
              in chat.
            </p>

            <ul className="mt-5 space-y-2.5 text-sm">
              {[
                "Instant access — no forms to fill",
                "Live Google Meet link before the session",
                "Q&A and resources shared after the event",
              ].map((t) => (
                <li key={t} className="flex gap-2.5">
                  <Check className="size-4 text-[#25D366] shrink-0 mt-0.5" />
                  <span className="text-ink">{t}</span>
                </li>
              ))}
            </ul>

            <a
              href={event.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] text-white px-6 py-4 font-semibold hover:opacity-90 transition"
            >
              <MessageCircle className="size-5" /> Join WhatsApp Community
            </a>

            <p className="mt-3 text-xs text-ink-muted inline-flex items-center gap-1.5">
              <Users className="size-3.5" /> Hundreds of learners already inside.
            </p>

            <Link
              to="/courses"
              className="mt-5 block text-center text-sm text-ink-muted hover:text-ink underline underline-offset-4"
            >
              Explore our courses <ArrowRight className="inline size-3.5" />
            </Link>
          </div>
        </aside>
      </section>
    </SiteLayout>
  );
}

function Info({
  icon: Icon,
  label,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <div className="rounded-2xl border border-border p-4 bg-background flex items-center gap-3">
      <span className="size-9 grid place-items-center rounded-xl bg-primary/15 text-primary shrink-0">
        <Icon className="size-4" />
      </span>
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}
