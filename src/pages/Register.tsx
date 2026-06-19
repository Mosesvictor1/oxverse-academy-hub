import { Link, useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { z } from "zod";
import { Sparkles, ArrowRight, GraduationCap, Gift, Check, Tag } from "lucide-react";
import { SiteLayout, SectionEyebrow } from "@/components/site/SiteLayout";
import { SEO } from "@/components/site/SEO";
import { courses } from "@/lib/courses";
import { HEARD_FROM_OPTIONS, NIGERIAN_STATES, submitToSheet } from "@/lib/formOptions";
import { whatsappLink } from "@/lib/site";
import { getReferralCodeFromUrl, saveReferralCode } from "@/lib/referral";
import {
  SuccessScreen,
  SuccessCard,
  SuccessDetail,
  SuccessParagraph,
  SuccessCta,
  SuccessFooterLink,
  formCardClass,
  formGridClass,
  pageHeroClass,
} from "@/components/site/SuccessScreen";
import { BenefitsPanel, FormAside } from "@/components/site/BenefitsPanel";

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
    .regex(/^[A-Za-z0-9_-]*$/, "Letters, numbers and underscores only")
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
        type: "Free Class",
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
    const firstName = success.fullName.split(" ")[0];
    const displayEmail = success.email.toLowerCase();

    return (
      <SiteLayout>
        <SEO title="You're registered, OxVerse Academy" />
        <SuccessScreen>
          <SuccessCard eyebrow="Registration confirmed" title={`You're in, ${firstName}!`}>
            <SuccessDetail label="Course registered">{courseTitle}</SuccessDetail>
            <SuccessParagraph>
              We&apos;ll email <strong className="font-semibold break-all">{displayEmail}</strong> with your next steps.
            </SuccessParagraph>
            <SuccessParagraph>
              You&apos;ll also receive <strong>your personal referral link</strong>, earn a{" "}
              <strong>5% bonus</strong> on every friend who registers and pays through it.
            </SuccessParagraph>
            {success.ref && (
              <SuccessDetail label="Referral code applied" mono>
                {success.ref}
              </SuccessDetail>
            )}
            <SuccessCta href={whatsappLink(`Hi OxVerse, I just registered for ${courseTitle}.`)}>
              Join our WhatsApp community
            </SuccessCta>
          </SuccessCard>
          <SuccessFooterLink to="/courses">← Explore other courses</SuccessFooterLink>
        </SuccessScreen>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <SEO
        title="Register, OxVerse Academy"
        description="Register for OxVerse Academy, pick a course, meet the instructors, and unlock your personal referral link."
      />
      <section className="relative">
        <div className="absolute inset-0 grid-pattern opacity-50 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        <div className="absolute inset-0 radial-purple" />
        <div className={`relative ${pageHeroClass}`}>
          <SectionEyebrow>Registration</SectionEyebrow>
          <h1 className="mt-6 font-display text-5xl md:text-7xl font-bold tracking-tighter text-balance max-w-3xl">
            Register with <span className="gradient-text">OxVerse Academy.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-ink-muted text-pretty">
            Pick the course you want to take, tell us a bit about you, and we'll guide you through
            the next steps. You'll also receive your personal <strong>referral link</strong> by email
           , earn <strong>5%</strong> on every paid enrollment that comes through it.
          </p>
        </div>
      </section>

      <section className={formGridClass}>
        <div className="lg:col-span-7">
          <form onSubmit={onSubmit} noValidate className={formCardClass}>
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
                Were you referred by someone? Enter their code, both you and your referrer benefit.
                If you clicked a personal link (e.g. <span className="font-mono">/register/VICTOROXVERSE023</span>),
                we filled it in automatically.
              </p>
              <div className="mt-4">
                <Field label="Referral code" error={errors.ref}>
                  <input
                    className="input uppercase tracking-wider"
                    value={form.ref}
                    onChange={(e) => update("ref", e.target.value.toUpperCase())}
                    placeholder="e.g. VICTOROXVERSE023"
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

        <FormAside>
          <BenefitsPanel
            heading="Why register with OxVerse?"
            items={[
              { icon: GraduationCap, title: "Talk to instructors", description: "Direct line to the lead instructor of your course." },
              { icon: Check, title: "See the curriculum", description: "Walk through modules, projects, and what you'll ship." },
              { icon: Gift, title: "Earn 5% on referrals", description: "Get your personal referral link by email, earn on every paid signup." },
              { icon: Sparkles, title: "Priority admission", description: "Registered students are reviewed first when seats open." },
            ]}
          />
        </FormAside>
      </section>
    </SiteLayout>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="block">
      <span className="text-sm font-medium text-ink">{label}</span>
      <div className="mt-2">{children}</div>
      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
    </div>
  );
}