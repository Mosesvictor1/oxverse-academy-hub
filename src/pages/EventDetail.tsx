import { useMemo, useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { z } from "zod";
import {
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  Mic,
  ArrowRight,
  Check,
  Video,
} from "lucide-react";
import { SiteLayout, SectionEyebrow } from "@/components/site/SiteLayout";
import { SEO } from "@/components/site/SEO";
import { getEvent } from "@/lib/events";
import { whatsappLink } from "@/lib/site";

const ENDPOINT =
  "https://script.google.com/macros/s/AKfycbzNzrXtFYODhEIk3FsL2CaLH-IXyl3zmb3uovjG7JV6sLyaQGoGslI1S1NaT7vW_k93/exec";

const schema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().min(7, "Enter a valid phone number").max(20),
  experience: z.enum(["None", "Beginner", "Intermediate", "Advanced"]),
  expectation: z.string().trim().max(500).optional().default(""),
});

export default function EventDetailPage() {
  const { slug = "" } = useParams();
  const event = useMemo(() => getEvent(slug), [slug]);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    experience: "None" as "None" | "Beginner" | "Intermediate" | "Advanced",
    expectation: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [remoteError, setRemoteError] = useState("");

  if (!event) return <Navigate to="/events" replace />;

  function update<K extends keyof typeof form>(k: K, v: (typeof form)[K]) {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k as string]) setErrors((e) => ({ ...e, [k as string]: "" }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setRemoteError("");
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => {
        errs[String(i.path[0])] = i.message;
      });
      setErrors(errs);
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        body: new URLSearchParams({
          formType: "event-registration",
          eventSlug: event.slug,
          eventTitle: event.title,
          eventDate: event.date,
          fullName: parsed.data.fullName,
          email: parsed.data.email,
          phone: parsed.data.phone,
          experience: parsed.data.experience,
          expectation: parsed.data.expectation ?? "",
          joinedAt: new Date().toISOString(),
        }),
      });
      if (!res.ok) throw new Error(`Submit failed: ${res.status}`);
      setSuccess(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error(err);
      setRemoteError(
        "We couldn't submit your registration. Please try again or message us on WhatsApp.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: event.description,
    startDate: event.dateISO,
    eventAttendanceMode:
      "https://schema.org/OnlineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    image: [`https://oxverse.academy${event.flyer}`],
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
        image={event.flyer}
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

            <div className="mt-8 grid sm:grid-cols-3 gap-3">
              <Info icon={Calendar} label={event.date} />
              <Info icon={Clock} label={event.time} />
              <Info icon={Video} label={event.location} />
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#register"
                className="inline-flex items-center gap-2 rounded-full bg-ink text-background px-7 py-4 font-semibold hover:bg-primary transition"
              >
                Register Now <ArrowRight className="size-4" />
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
                src={event.flyer}
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
          {success ? (
            <div className="rounded-3xl bg-gradient-to-br from-primary to-purple-900 text-primary-foreground p-8 shadow-2xl shadow-primary/30">
              <Sparkles className="size-10" />
              <h3 className="mt-5 font-display text-3xl font-bold tracking-tight">
                You're registered, {form.fullName.split(" ")[0]}!
              </h3>
              <p className="mt-3 text-primary-foreground/85">
                We've saved your spot for <strong>{event.title}</strong>. The Google
                Meet link and reminder will be sent to <strong>{form.email}</strong>{" "}
                before {event.date}.
              </p>
              <div className="mt-6 grid gap-3">
                <a
                  href={whatsappLink(
                    `Hi 0xVerse, I just registered for "${event.title}". Please add me to the event reminders.`,
                  )}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-2xl bg-white/15 hover:bg-white/20 transition p-4 text-sm font-semibold inline-flex items-center justify-between"
                >
                  Get reminders on WhatsApp <ArrowRight className="size-4" />
                </a>
                <Link
                  to="/courses"
                  className="rounded-2xl bg-white/15 hover:bg-white/20 transition p-4 text-sm font-semibold inline-flex items-center justify-between"
                >
                  Explore our courses <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>
          ) : (
            <form
              onSubmit={onSubmit}
              noValidate
              className="rounded-3xl border border-border bg-background p-8 space-y-5 sticky top-24"
            >
              <div>
                <p className="text-xs uppercase tracking-wider font-semibold text-primary">
                  Reserve your seat
                </p>
                <h3 className="mt-2 font-display text-2xl font-bold tracking-tight">
                  Register for the event
                </h3>
                <p className="mt-1 text-sm text-ink-muted">
                  100% free. Limited seats — Google Meet link sent on confirmation.
                </p>
              </div>

              <Field label="Full name" error={errors.fullName}>
                <input
                  className="input"
                  value={form.fullName}
                  onChange={(e) => update("fullName", e.target.value)}
                  placeholder="Your full name"
                  maxLength={100}
                  required
                />
              </Field>
              <Field label="Email" error={errors.email}>
                <input
                  className="input"
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="you@email.com"
                  maxLength={255}
                  required
                />
              </Field>
              <Field label="Phone / WhatsApp" error={errors.phone}>
                <input
                  className="input"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  placeholder="+234 …"
                  maxLength={20}
                  required
                />
              </Field>
              <Field label="Your current skill level">
                <div className="flex flex-wrap gap-2">
                  {(["None", "Beginner", "Intermediate", "Advanced"] as const).map(
                    (lvl) => (
                      <button
                        type="button"
                        key={lvl}
                        onClick={() => update("experience", lvl)}
                        className={`rounded-full px-4 py-2 text-sm font-medium border transition ${form.experience === lvl ? "bg-ink text-background border-ink" : "border-border text-ink-muted hover:border-ink hover:text-ink"}`}
                      >
                        {lvl}
                      </button>
                    ),
                  )}
                </div>
              </Field>
              <Field
                label="What do you hope to learn? (optional)"
                error={errors.expectation}
              >
                <textarea
                  className="input resize-none"
                  rows={3}
                  value={form.expectation}
                  onChange={(e) => update("expectation", e.target.value)}
                  maxLength={500}
                />
              </Field>

              {remoteError && (
                <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-700">
                  {remoteError}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-ink text-background px-6 py-4 font-semibold hover:bg-primary transition disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Registering...
                  </span>
                ) : (
                  <>
                    Register Now <ArrowRight className="size-4" />
                  </>
                )}
              </button>
            </form>
          )}
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

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-ink">{label}</span>
      <div className="mt-2">{children}</div>
      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
    </label>
  );
}