import { Link, useParams, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { z } from "zod";
import { Sparkles, ArrowRight, GraduationCap, Gift, Check, Tag } from "lucide-react";
import { SiteLayout, SectionEyebrow } from "@/components/site/SiteLayout";
import { SEO } from "@/components/site/SEO";
import { courses } from "@/lib/courses";
import { HEARD_FROM_OPTIONS, NIGERIAN_STATES, submitToSheet } from "@/lib/formOptions";
import { whatsappLink } from "@/lib/site";
import { getReferralCodeFromUrl, saveReferralCode } from "@/lib/referral";

const schema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().min(7, "Enter a valid phone number").max(20),
  courseSlug: z.string().min(1, "Pick a course"),
  experience: z.enum(["None", "Beginner", "Intermediate", "Advanced"]),
  location: z.string().min(1, "Select your location"),
  heardFrom: z.string().min(1, "Let us know how you heard about us"),
  reason: z.string().trim().max(500).optional().default(""),
  ref: z
    .string()
    .trim()
    .max(40)
    .regex(/^[A-Za-z0-9_-]*$/, "Letters, numbers, dashes only")
    .optional()
    .default(""),
});

export default function RegisterPage() {
  const [params] = useSearchParams();
  const routeParams = useParams();
  const initialCourse = params.get("course") || "";
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    courseSlug: initialCourse,
    experience: "None" as "None" | "Beginner" | "Intermediate" | "Advanced",
    location: "",
    heardFrom: "",
    reason: "",
    ref: "",
  });

  useEffect(() => {
    const code = getReferralCodeFromUrl(routeParams.ref);
    if (code) setForm((f) => (f.ref ? f : { ...f, ref: code }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routeParams.ref]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<typeof form | null>(null);
  const [remoteError, setRemoteError] = useState("");

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
      parsed.error.issues.forEach((i) => (errs[String(i.path[0])] = i.message));
      setErrors(errs);
      return;
    }
    setSubmitting(true);
    const course = courses.find((c) => c.slug === parsed.data.courseSlug);
    try {
      await submitToSheet({
        type: "Register",
        fullName: parsed.data.fullName,
        email: parsed.data.email,
        phone: parsed.data.phone,
        courseSlug: parsed.data.courseSlug,
        courseTitle: course?.title ?? "OxVerse Registration",
        experience: parsed.data.experience,
        location: parsed.data.location,
        heardFrom: parsed.data.heardFrom,
        reason: parsed.data.reason ?? "",
        ref: (parsed.data.ref ?? "").toUpperCase(),
        registeredAt: new Date().toISOString(),
      });
      if (parsed.data.ref) saveReferralCode(parsed.data.ref);
      setSuccess(parsed.data as typeof form);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error(err);
      setRemoteError("Something went wrong sending your registration. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    const courseTitle = courses.find((c) => c.slug === success.courseSlug)?.title ?? "your registration";
    return (
      <SiteLayout>
        <SEO title="You're registered — OxVerse Academy" />
        <section className="mx-auto max-w-3xl px-6 pt-32 pb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl bg-gradient-to-br from-primary to-purple-900 text-primary-foreground p-10 shadow-2xl shadow-primary/30"
          >
            <Sparkles className="size-10" />
            <h1 className="mt-5 font-display text-4xl md:text-5xl font-bold tracking-tight">
              You're in, {success.fullName.split(" ")[0]}!
            </h1>
            <p className="mt-4 text-primary-foreground/85 text-pretty">
              Your registration for <strong>{courseTitle}</strong> is confirmed. We'll email{" "}
              <strong>{success.email}</strong> with the next steps, plus{" "}
              <strong>your personal referral link</strong> so you can earn{" "}
              <strong>5% bonus</strong> on every friend who registers and pays through it.
            </p>
            {success.ref && (
              <p className="mt-3 text-xs text-primary-foreground/75">
                Referral code applied: <span className="font-mono font-semibold">{success.ref}</span>
              </p>
            )}
            <a
              href={whatsappLink(`Hi OxVerse, I just registered for ${courseTitle}.`)}
              target="_blank" rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-white text-primary px-6 py-3 font-semibold"
            >
              Join our WhatsApp community <ArrowRight className="size-4" />
            </a>
          </motion.div>
          <Link to="/courses" className="mt-8 inline-block text-sm underline text-ink-muted">
            ← Explore other courses
          </Link>
        </section>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <SEO
        title="Register — OxVerse Academy"
        description="Register for OxVerse Academy — pick a course, meet the instructors, and unlock your personal referral link."
      />
      <section className="relative">
        <div className="absolute inset-0 grid-pattern opacity-50 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        <div className="absolute inset-0 radial-purple" />
        <div className="relative mx-auto max-w-7xl px-6 pt-24 pb-10">
          <SectionEyebrow>Registration</SectionEyebrow>
          <h1 className="mt-6 font-display text-5xl md:text-7xl font-bold tracking-tighter text-balance max-w-3xl">
            Register with <span className="gradient-text">OxVerse Academy.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-ink-muted text-pretty">
            Pick the course you want to take, tell us a bit about you, and we'll guide you through
            the next steps. You'll also receive your personal <strong>referral link</strong> by email
            — earn <strong>5%</strong> on every paid enrollment that comes through it.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24 grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-7">
          <form onSubmit={onSubmit} noValidate className="rounded-3xl border border-border bg-background p-8 lg:p-10 space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Full name" error={errors.fullName}>
                <input className="input" value={form.fullName} onChange={(e) => update("fullName", e.target.value)} placeholder="John Smith" maxLength={100} required />
              </Field>
              <Field label="Email" error={errors.email}>
                <input className="input" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="you@email.com" maxLength={255} required />
              </Field>
            </div>
            <Field label="Phone / WhatsApp" error={errors.phone}>
              <input className="input" value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+234 …" maxLength={20} required />
            </Field>
            <Field label="Which course are you registering for?" error={errors.courseSlug}>
              <select className="input" value={form.courseSlug} onChange={(e) => update("courseSlug", e.target.value)} required>
                <option value="">Select a course…</option>
                {courses.map((c) => (
                  <option key={c.slug} value={c.slug}>{c.title}</option>
                ))}
              </select>
            </Field>
            <Field label="Your current skill level">
              <div className="flex flex-wrap gap-2">
                {(["None", "Beginner", "Intermediate", "Advanced"] as const).map((lvl) => (
                  <button type="button" key={lvl} onClick={() => update("experience", lvl)}
                    className={`rounded-full px-4 py-2 text-sm font-medium border transition ${form.experience === lvl ? "bg-ink text-background border-ink" : "border-border text-ink-muted hover:border-ink hover:text-ink"}`}>
                    {lvl}
                  </button>
                ))}
              </div>
            </Field>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Location" error={errors.location}>
                <select className="input" value={form.location} onChange={(e) => update("location", e.target.value)} required>
                  <option value="">Select your state…</option>
                  {NIGERIAN_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </Field>
              <Field label="How did you hear about us?" error={errors.heardFrom}>
                <select className="input" value={form.heardFrom} onChange={(e) => update("heardFrom", e.target.value)} required>
                  <option value="">Select an option…</option>
                  {HEARD_FROM_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </Field>
            </div>
            <Field label="What do you hope to achieve? (optional)" error={errors.reason}>
              <textarea className="input resize-none" rows={4} value={form.reason} onChange={(e) => update("reason", e.target.value)} maxLength={500} />
            </Field>
            <div className="rounded-2xl border border-primary/30 bg-primary/5 p-5">
              <div className="flex items-center gap-2 text-primary font-semibold text-sm">
                <Tag className="size-4" /> Referral code (optional)
              </div>
              <p className="mt-1.5 text-xs text-ink-muted">
                Were you referred by someone? Enter their code — both you and your referrer benefit.
                If you clicked a personal link (e.g. <span className="font-mono">/register/VICTOR-OXVERSE023</span>),
                we filled it in automatically.
              </p>
              <div className="mt-4">
                <Field label="Referral code" error={errors.ref}>
                  <input
                    className="input uppercase tracking-wider"
                    value={form.ref}
                    onChange={(e) => update("ref", e.target.value.toUpperCase())}
                    placeholder="e.g. VICTOR-OXVERSE023"
                    maxLength={40}
                    autoComplete="off"
                  />
                </Field>
              </div>
            </div>
            {remoteError && <p className="text-sm text-red-600">{remoteError}</p>}
            <button type="submit" disabled={submitting}
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-ink text-background px-6 py-4 font-semibold hover:bg-primary transition disabled:opacity-60">
              {submitting ? "Registering..." : <>Complete registration <ArrowRight className="size-4" /></>}
            </button>
          </form>
        </div>

        <aside className="lg:col-span-5 space-y-4">
          <div className="rounded-3xl bg-gradient-to-br from-primary to-purple-900 text-primary-foreground p-8">
            <p className="text-sm uppercase tracking-wider text-primary-foreground/70 font-semibold">Why register with OxVerse?</p>
            <ul className="mt-5 space-y-4">
              {[
                { i: GraduationCap, t: "Talk to instructors", d: "Direct line to the lead instructor of your course." },
                { i: Check, t: "See the curriculum", d: "Walk through modules, projects, and what you'll ship." },
                { i: Gift, t: "Earn 5% on referrals", d: "Get your personal referral link by email — earn on every paid signup." },
                { i: Sparkles, t: "Priority admission", d: "Registered students are reviewed first when seats open." },
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
        </aside>
      </section>
    </SiteLayout>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-ink">{label}</span>
      <div className="mt-2">{children}</div>
      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
    </label>
  );
}