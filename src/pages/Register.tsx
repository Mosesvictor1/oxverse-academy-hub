import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { z } from "zod";
import { Sparkles, ArrowRight, GraduationCap, Gift, Check } from "lucide-react";
import { SiteLayout, SectionEyebrow } from "@/components/site/SiteLayout";
import { SEO } from "@/components/site/SEO";
import { courses } from "@/lib/courses";
import { HEARD_FROM_OPTIONS, NIGERIAN_STATES, submitToSheet } from "@/lib/formOptions";
import { whatsappLink } from "@/lib/site";

const schema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().min(7, "Enter a valid phone number").max(20),
  courseSlug: z.string().min(1, "Pick a course"),
  experience: z.enum(["None", "Beginner", "Intermediate", "Advanced"]),
  location: z.string().min(1, "Select your location"),
  heardFrom: z.string().min(1, "Let us know how you heard about us"),
  reason: z.string().trim().max(500).optional().default(""),
});

export default function FreeClassPage() {
  const [params] = useSearchParams();
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
  });
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
        type: "Free Class",
        fullName: parsed.data.fullName,
        email: parsed.data.email,
        phone: parsed.data.phone,
        courseSlug: parsed.data.courseSlug,
        courseTitle: course?.title ?? "OxVerse Free Class",
        experience: parsed.data.experience,
        location: parsed.data.location,
        heardFrom: parsed.data.heardFrom,
        reason: parsed.data.reason ?? "",
        registeredAt: new Date().toISOString(),
      });
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
    const courseTitle = courses.find((c) => c.slug === success.courseSlug)?.title ?? "your free class";
    return (
      <SiteLayout>
        <SEO title="You're registered for the Free Class — OxVerse Academy" />
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
              Your seat for the <strong>{courseTitle}</strong> free class is reserved. We'll email{" "}
              <strong>{success.email}</strong> with the date, joining link, and prep materials.
            </p>
            <a
              href={whatsappLink(`Hi OxVerse, I just registered for the free class on ${courseTitle}.`)}
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
        title="Register for a Free Tech Class — OxVerse Academy"
        description="Get a taste of OxVerse — register for a free intro class in your chosen course and meet the instructors."
      />
      <section className="relative">
        <div className="absolute inset-0 grid-pattern opacity-50 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        <div className="absolute inset-0 radial-purple" />
        <div className="relative mx-auto max-w-7xl px-6 pt-24 pb-10">
          <SectionEyebrow>Free tech class</SectionEyebrow>
          <h1 className="mt-6 font-display text-5xl md:text-7xl font-bold tracking-tighter text-balance max-w-3xl">
            Try OxVerse <span className="gradient-text">free of charge.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-ink-muted text-pretty">
            Register for a free intro class in your favourite course. Meet the instructors, see the
            campus, and decide if OxVerse is right for you — no payment required.
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
            <Field label="Which course free class?" error={errors.courseSlug}>
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
            <Field label="What do you want to get out of this class? (optional)" error={errors.reason}>
              <textarea className="input resize-none" rows={4} value={form.reason} onChange={(e) => update("reason", e.target.value)} maxLength={500} />
            </Field>
            {remoteError && <p className="text-sm text-red-600">{remoteError}</p>}
            <button type="submit" disabled={submitting}
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-ink text-background px-6 py-4 font-semibold hover:bg-primary transition disabled:opacity-60">
              {submitting ? "Registering..." : <>Register for free class <ArrowRight className="size-4" /></>}
            </button>
          </form>
        </div>

        <aside className="lg:col-span-5 space-y-4">
          <div className="rounded-3xl bg-gradient-to-br from-primary to-purple-900 text-primary-foreground p-8">
            <p className="text-sm uppercase tracking-wider text-primary-foreground/70 font-semibold">Why attend a free class?</p>
            <ul className="mt-5 space-y-4">
              {[
                { i: GraduationCap, t: "Meet the instructor", d: "Live Q&A with the lead instructor of your course." },
                { i: Check, t: "See the curriculum", d: "Walk through modules, projects, and what you'll ship." },
                { i: Gift, t: "Exclusive discount", d: "Free class attendees unlock special tuition offers." },
                { i: Sparkles, t: "Zero pressure", d: "100% free — no payment details required." },
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