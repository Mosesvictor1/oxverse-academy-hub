import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { z } from "zod";
import { Check, Sparkles, Users, Bell, ArrowRight, Gift, Tag } from "lucide-react";
import { SiteLayout, SectionEyebrow } from "@/components/site/SiteLayout";
import { SEO } from "@/components/site/SEO";
import { courses } from "@/lib/courses";
import { SITE, whatsappLink } from "@/lib/site";

const KEY = "oxverse.waitlist.v1";
const WAITLIST_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbzNzrXtFYODhEIk3FsL2CaLH-IXyl3zmb3uovjG7JV6sLyaQGoGslI1S1NaT7vW_k93/exec";

type WaitlistEntry = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  courseSlug: string;
  courseTitle: string;
  experience: "None" | "Beginner" | "Intermediate" | "Advanced";
  reason: string;
  referralCode: string;
  joinedAt: string;
  position: number;
};

const schema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().min(7, "Enter a valid phone number").max(20),
  courseSlug: z.string().min(1, "Pick a course"),
  experience: z.enum(["None", "Beginner", "Intermediate", "Advanced"]),
  reason: z.string().trim().max(500).optional().default(""),
  referralCode: z
    .string()
    .trim()
    .max(40)
    .regex(/^[A-Za-z0-9_-]*$/, "Letters, numbers, dashes only")
    .optional()
    .default(""),
});

function getList(): WaitlistEntry[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]") as WaitlistEntry[];
  } catch {
    return [];
  }
}

export default function WaitlistPage() {
  console.log("Rendering WaitlistPage");
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    courseSlug: "",
    experience: "None" as WaitlistEntry["experience"],
    reason: "",
    referralCode: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState<WaitlistEntry | null>(null);
  const [remoteError, setRemoteError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const totalOnList = useMemo(() => getList().length, [success]);

  function update<K extends keyof typeof form>(k: K, v: (typeof form)[K]) {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k as string]) setErrors((e) => ({ ...e, [k as string]: "" }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Waitlist submit handler called", form);
    setRemoteError("");
    setIsSubmitting(true);
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => {
        errs[String(i.path[0])] = i.message;
      });
      setErrors(errs);
      setIsSubmitting(false);
      return;
    }
    const course = courses.find((c) => c.slug === parsed.data.courseSlug);
    const list = getList();
    if (
      list.some(
        (e) =>
          e.email.toLowerCase() === parsed.data.email.toLowerCase() &&
          e.courseSlug === parsed.data.courseSlug,
      )
    ) {
      setErrors({ email: "You're already on the waitlist for this course." });
      return;
    }
    const entry: WaitlistEntry = {
      id: crypto.randomUUID(),
      fullName: parsed.data.fullName,
      email: parsed.data.email,
      phone: parsed.data.phone,
      courseSlug: parsed.data.courseSlug,
      courseTitle: course?.title ?? "OxVerse cohort",
      experience: parsed.data.experience,
      reason: parsed.data.reason ?? "",
      referralCode: (parsed.data.referralCode ?? "").toUpperCase(),
      joinedAt: new Date().toISOString(),
      position: list.length + 1,
    };
    list.unshift(entry);
    localStorage.setItem(KEY, JSON.stringify(list));
    console.log("Waitlist entry saved locally:", entry);
    try {
      const response = await fetch(WAITLIST_ENDPOINT, {
        method: "POST",
       
        body: new URLSearchParams({
          fullName: entry.fullName,
          email: entry.email,
          phone: entry.phone,
          courseSlug: entry.courseSlug,
          courseTitle: entry.courseTitle,
          experience: entry.experience,
          reason: entry.reason,
          referralCode: entry.referralCode,
          discount: "20%",
          joinedAt: entry.joinedAt,
        }),
      });
      console.log("Waitlist submit response:", response);
      if (!response.ok) {
        throw new Error(`Waitlist submit failed: ${response.status}`);
      }
    } catch (error) {
      console.error(error);
      setRemoteError(
        "Your entry was saved locally, but we couldn't send it to the waitlist backend. Please try again or contact admissions.",
      );
    } finally {
      setIsSubmitting(false);
    }

    setSuccess(entry);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (success) {
    return (
      <SiteLayout>
        <SEO title="You're on the waitlist — OxVerse Academy" />
        <section className="mx-auto max-w-3xl px-6 pt-32 pb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl bg-gradient-to-br from-primary to-purple-900 text-primary-foreground p-10 shadow-2xl shadow-primary/30"
          >
            <Sparkles className="size-10" />
            <h1 className="mt-5 font-display text-4xl md:text-5xl font-bold tracking-tight">
              You're on the list, {success.fullName.split(" ")[0]}!
            </h1>
            <p className="mt-4 text-primary-foreground/85 text-pretty">
              You're <strong>#{success.position}</strong> on the waitlist for{" "}
              <strong>{success.courseTitle}</strong>. We'll email <strong>{success.email}</strong>{" "}
              the moment applications open.
            </p>
            <p className="mt-2 text-sm font-mono text-primary-foreground/60">
              Ref: {success.id.slice(0, 8).toUpperCase()}
            </p>
            <div className="mt-6 rounded-2xl bg-white/10 backdrop-blur p-5 border border-white/20">
              <div className="flex items-center gap-2 font-semibold">
                <Gift className="size-5" /> Your 20% discount is locked in
              </div>
              <p className="mt-2 text-sm text-primary-foreground/85">
                We'll email <strong>your personal referral link</strong> to{" "}
                <strong>{success.email}</strong> shortly. Share it with friends — you earn{" "}
                <strong>5% bonus</strong> on every signup that uses it.
              </p>
              {success.referralCode && (
                <p className="mt-2 text-xs text-primary-foreground/75">
                  Referral code applied: <span className="font-mono font-semibold">{success.referralCode}</span>
                </p>
              )}
            </div>
            {remoteError && (
              <div className="mt-6 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-700">
                {remoteError}
              </div>
            )}
          </motion.div>

          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            <a
              href={whatsappLink(
                `Hi OxVerse, I just joined the waitlist for ${success.courseTitle}.`,
              )}
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl border border-border p-6 hover:border-primary transition"
            >
              <p className="font-display text-lg font-semibold">Chat on WhatsApp</p>
              <p className="mt-1 text-sm text-ink-muted">
                Skip the queue — DM admissions directly.
              </p>
              <p className="mt-3 text-sm font-semibold text-primary inline-flex items-center gap-1">
                {SITE.phoneDisplay} <ArrowRight className="size-4" />
              </p>
            </a>
            <Link
              to="/courses"
              className="rounded-2xl border border-border p-6 hover:border-primary transition"
            >
              <p className="font-display text-lg font-semibold">Explore other courses</p>
              <p className="mt-1 text-sm text-ink-muted">Join more than one waitlist — no limit.</p>
              <p className="mt-3 text-sm font-semibold text-primary inline-flex items-center gap-1">
                Browse all <ArrowRight className="size-4" />
              </p>
            </Link>
          </div>
          <button
            onClick={() => {
              setSuccess(null);
              setForm({
                fullName: "",
                email: "",
                phone: "",
                courseSlug: "",
                experience: "None",
                reason: "",
                referralCode: "",
              });
            }}
            className="mt-8 text-sm text-ink-muted hover:text-ink underline underline-offset-4"
          >
            Add another person to the waitlist
          </button>
        </section>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <SEO
        title="Join the Waitlist - 0xVerse Academy"
        description="Reserve your seat for the next OxVerse cohort."
      />
      <section className="relative">
        <div className="absolute inset-0 grid-pattern opacity-50 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        <div className="absolute inset-0 radial-purple" />
        <div className="relative mx-auto max-w-7xl px-6 pt-24 pb-10">
          <SectionEyebrow>Limited cohort seats</SectionEyebrow>
          <h1 className="mt-6 font-display text-5xl md:text-7xl font-bold tracking-tighter text-balance max-w-3xl">
            Join the <span className="gradient-text">OxVerse waitlist.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-ink-muted text-pretty">
            Cohorts fill up fast. Reserve your spot and we'll notify you the moment applications
            open.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24 grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-7">
          <form
            onSubmit={(e) => {
              console.log("form onSubmit event");
              onSubmit(e);
            }}
            noValidate
            className="rounded-3xl border border-border bg-background p-8 lg:p-10 space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Full name" error={errors.fullName}>
                <input
                  className="input"
                  value={form.fullName}
                  onChange={(e) => update("fullName", e.target.value)}
                  placeholder="Victor Moses"
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
            </div>
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
            <Field label="Course you're interested in" error={errors.courseSlug}>
              <select
                className="input"
                value={form.courseSlug}
                onChange={(e) => update("courseSlug", e.target.value)}
                required
              >
                <option value="">Select a course…</option>
                {courses.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.title} — {c.duration}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Your current skill level">
              <div className="flex flex-wrap gap-2">
                {(["None", "Beginner", "Intermediate", "Advanced"] as const).map((lvl) => (
                  <button
                    type="button"
                    key={lvl}
                    onClick={() => update("experience", lvl)}
                    className={`rounded-full px-4 py-2 text-sm font-medium border transition ${form.experience === lvl ? "bg-ink text-background border-ink" : "border-border text-ink-muted hover:border-ink hover:text-ink"}`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </Field>
            <Field label="Why do you want to join? (optional)" error={errors.reason}>
              <textarea
                className="input resize-none"
                rows={4}
                value={form.reason}
                onChange={(e) => update("reason", e.target.value)}
                maxLength={500}
              />
            </Field>
            <div className="rounded-2xl border border-primary/30 bg-primary/5 p-5">
              <div className="flex items-center gap-2 text-primary font-semibold text-sm">
                <Tag className="size-4" /> Unlock 20% OFF + referral bonus
              </div>
              <p className="mt-1.5 text-xs text-ink-muted">
                Have a referral code? Enter it below — both you and your referrer benefit.
                After registering you'll receive <strong>your own referral link by email</strong> and
                earn <strong>5% bonus</strong> for every friend who signs up with it.
              </p>
              <div className="mt-4">
                <Field label="Referral code (optional)" error={errors.referralCode}>
                  <input
                    className="input uppercase tracking-wider"
                    value={form.referralCode}
                    onChange={(e) => update("referralCode", e.target.value.toUpperCase())}
                    placeholder="e.g. VICTOR-OX24"
                    maxLength={40}
                    autoComplete="off"
                  />
                </Field>
              </div>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              onClick={() => console.log("submit button clicked")}
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-ink text-background px-6 py-4 font-semibold hover:bg-primary transition disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? (
                <span className="inline-flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Submitting...
                </span>
              ) : (
                <>
                  Reserve my seat <ArrowRight className="size-4" />
                </>
              )}
            </button>
          </form>
        </div>

        <aside className="lg:col-span-5 space-y-4">
          <div className="rounded-3xl bg-gradient-to-br from-primary to-purple-900 text-primary-foreground p-8">
            <p className="text-sm uppercase tracking-wider text-primary-foreground/70 font-semibold">
              Why join the waitlist?
            </p>
            <ul className="mt-5 space-y-4">
              {[
                { i: Bell, t: "Be first to know", d: "Email + SMS the day applications open." },
                { i: Check, t: "Priority admission", d: "Waitlist members get reviewed first." },
                {
                  i: Users,
                  t: "Cohort previews",
                  d: "Meet your future classmates before day one.",
                },
                {
                  i: Sparkles,
                  t: "Early-bird perks",
                  d: "Exclusive discounts and payment plans.",
                },
              ].map((b) => (
                <li key={b.t} className="flex gap-3">
                  <span className="size-9 grid place-items-center rounded-xl bg-white/15 shrink-0">
                    <b.i className="size-4" />
                  </span>
                  <div>
                    <p className="font-semibold">{b.t}</p>
                    <p className="text-sm text-primary-foreground/80">{b.d}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-border p-6 bg-background">
            <p className="text-sm text-ink-muted">Already on the list</p>
            <p className="font-display text-4xl font-bold tracking-tighter mt-1">
              {50 + totalOnList}+ students
            </p>
          </div>
        </aside>
      </section>
    </SiteLayout>
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
