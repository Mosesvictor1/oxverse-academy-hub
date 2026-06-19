import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { Check, Sparkles, Users, Bell, ArrowRight, Gift, Tag } from "lucide-react";
import { SiteLayout, SectionEyebrow } from "@/components/site/SiteLayout";
import { SEO } from "@/components/site/SEO";
import { courses } from "@/lib/courses";
import { SITE, whatsappLink } from "@/lib/site";
import { HEARD_FROM_OPTIONS, NIGERIAN_STATES, submitToSheet } from "@/lib/formOptions";
import { getReferralCodeFromUrl, saveReferralCode } from "@/lib/referral";
import {
  SuccessScreen,
  SuccessCard,
  SuccessDetail,
  SuccessParagraph,
  SuccessInset,
  SuccessActionGrid,
  SuccessActionCard,
  SuccessFooterLink,
  formCardClass,
  formGridClass,
  pageHeroClass,
} from "@/components/site/SuccessScreen";
import { BenefitsPanel, FormAside, InfoStatCard } from "@/components/site/BenefitsPanel";

const KEY = "oxverse.waitlist.v1";

type WaitlistEntry = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  courseSlug: string;
  courseTitle: string;
  experience: "None" | "Beginner" | "Intermediate" | "Advanced";
  location: string;
  heardFrom: string;
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
  location: z.string().min(1, "Select your location"),
  heardFrom: z.string().min(1, "Let us know how you heard about us"),
  reason: z.string().trim().max(500).optional().default(""),
  referralCode: z
    .string()
    .trim()
    .max(40)
    .regex(/^[A-Za-z0-9_-]*$/, "Letters, numbers and underscores only")
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
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    courseSlug: "",
    experience: "None" as WaitlistEntry["experience"],
    location: "",
    heardFrom: "",
    reason: "",
    referralCode: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState<WaitlistEntry | null>(null);
  const [remoteError, setRemoteError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const totalOnList = useMemo(() => getList().length, [success]);

  useEffect(() => {
    const code = getReferralCodeFromUrl();
    if (code) setForm((f) => (f.referralCode ? f : { ...f, referralCode: code }));
  }, []);

  function update<K extends keyof typeof form>(k: K, v: (typeof form)[K]) {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k as string]) setErrors((e) => ({ ...e, [k as string]: "" }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
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
      location: parsed.data.location,
      heardFrom: parsed.data.heardFrom,
      reason: parsed.data.reason ?? "",
      referralCode: (parsed.data.referralCode ?? "").toUpperCase(),
      joinedAt: new Date().toISOString(),
      position: list.length + 1,
    };
    list.unshift(entry);
    localStorage.setItem(KEY, JSON.stringify(list));
    try {
      await submitToSheet({
        type: "Waitlist",
        fullName: entry.fullName,
        email: entry.email,
        phone: entry.phone,
        courseSlug: entry.courseSlug,
        courseTitle: entry.courseTitle,
        experience: entry.experience,
        location: entry.location,
        heardFrom: entry.heardFrom,
        reason: entry.reason,
        referralCode: entry.referralCode,
        ref: entry.referralCode,
        discount: "20%",
        joinedAt: entry.joinedAt,
      });
      if (entry.referralCode) saveReferralCode(entry.referralCode);
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
    const firstName = success.fullName.split(" ")[0];
    const displayEmail = success.email.toLowerCase();

    return (
      <SiteLayout>
        <SEO title="You're on the waitlist, OxVerse Academy" />
        <SuccessScreen>
          <SuccessCard eyebrow="Waitlist confirmed" title={`You're on the list, ${firstName}!`}>
            <SuccessDetail label="Course">
              #{success.position} on the waitlist for {success.courseTitle}
            </SuccessDetail>
            <SuccessParagraph>
              We&apos;ll email <strong className="font-semibold break-all">{displayEmail}</strong> the moment
              applications open.
            </SuccessParagraph>
            <SuccessDetail label="Reference" mono>
              {success.id.slice(0, 8).toUpperCase()}
            </SuccessDetail>
            <SuccessInset>
              <div className="flex items-center gap-2 font-semibold text-sm sm:text-base">
                <Gift className="size-5 shrink-0" /> Your 20% discount is locked in
              </div>
              <p className="text-sm text-primary-foreground/85 text-pretty">
                We&apos;ll email <strong>your personal referral link</strong> to{" "}
                <strong className="break-all">{displayEmail}</strong> shortly. Share it with friends, you earn{" "}
                <strong>5% bonus</strong> on every signup that uses it.
              </p>
              {success.referralCode && (
                <p className="text-xs sm:text-sm text-primary-foreground/75">
                  Referral code applied:{" "}
                  <span className="font-mono font-semibold break-all">{success.referralCode}</span>
                </p>
              )}
            </SuccessInset>
            {remoteError && (
              <div className="rounded-xl border border-red-400/30 bg-red-500/10 p-4 text-sm text-red-100">
                {remoteError}
              </div>
            )}
          </SuccessCard>

          <SuccessActionGrid>
            <SuccessActionCard
              title="Chat on WhatsApp"
              description="Skip the queue, DM admissions directly."
              footer={
                <>
                  {SITE.phoneDisplay} <ArrowRight className="size-4" />
                </>
              }
              href={whatsappLink(`Hi OxVerse, I just joined the waitlist for ${success.courseTitle}.`)}
            />
            <SuccessActionCard
              title="Explore other courses"
              description="Join more than one waitlist, no limit."
              footer={
                <>
                  Browse all <ArrowRight className="size-4" />
                </>
              }
              to="/courses"
            />
          </SuccessActionGrid>

          <SuccessFooterLink
            onClick={() => {
              setSuccess(null);
              setForm({
                fullName: "",
                email: "",
                phone: "",
                courseSlug: "",
                experience: "None",
                location: "",
                heardFrom: "",
                reason: "",
                referralCode: "",
              });
            }}
          >
            Add another person to the waitlist
          </SuccessFooterLink>
        </SuccessScreen>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <SEO
        title="Join the Waitlist, 0xVerse Academy"
        description="Reserve your seat for the next OxVerse cohort."
      />
      <section className="relative">
        <div className="absolute inset-0 grid-pattern opacity-50 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        <div className="absolute inset-0 radial-purple" />
        <div className={`relative ${pageHeroClass}`}>
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

      <section className={formGridClass}>
        <div className="lg:col-span-7">
          <form
            onSubmit={onSubmit}
            noValidate
            className={formCardClass}
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
                    {c.title}, {c.duration}
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
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Location" error={errors.location}>
                <select
                  className="input"
                  value={form.location}
                  onChange={(e) => update("location", e.target.value)}
                  required
                >
                  <option value="">Select your state…</option>
                  {NIGERIAN_STATES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </Field>
              <Field label="How did you hear about us?" error={errors.heardFrom}>
                <select
                  className="input"
                  value={form.heardFrom}
                  onChange={(e) => update("heardFrom", e.target.value)}
                  required
                >
                  <option value="">Select an option…</option>
                  {HEARD_FROM_OPTIONS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </Field>
            </div>
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
                Have a referral code? Enter it below, both you and your referrer benefit.
                After registering you'll receive <strong>your own referral link by email</strong> and
                earn <strong>5% bonus</strong> for every friend who signs up with it.
              </p>
              <div className="mt-4">
                <Field label="Referral code (optional)" error={errors.referralCode}>
                  <input
                    className="input uppercase tracking-wider"
                    value={form.referralCode}
                    onChange={(e) => update("referralCode", e.target.value.toUpperCase())}
                    placeholder="e.g. VICTOROX24"
                    maxLength={40}
                    autoComplete="off"
                  />
                </Field>
              </div>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
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

        <FormAside>
          <BenefitsPanel
            heading="Why join the waitlist?"
            items={[
              { icon: Bell, title: "Be first to know", description: "Email + SMS the day applications open." },
              { icon: Check, title: "Priority admission", description: "Waitlist members get reviewed first." },
              { icon: Users, title: "Cohort previews", description: "Meet your future classmates before day one." },
              { icon: Sparkles, title: "Early bird perks", description: "Exclusive discounts and payment plans." },
            ]}
          />
          <InfoStatCard label="Already on the list" value={`${50 + totalOnList}+ students`} />
        </FormAside>
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
    <div className="block">
      <span className="text-sm font-medium text-ink">{label}</span>
      <div className="mt-2">{children}</div>
      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
    </div>
  );
}
