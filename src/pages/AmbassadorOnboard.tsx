import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import { Sparkles, ArrowRight, ShieldCheck, RefreshCw, Copy, Check } from "lucide-react";
import { SiteLayout, SectionEyebrow } from "@/components/site/SiteLayout";
import { SEO } from "@/components/site/SEO";
import { AMBASSADOR_CATEGORIES, HEARD_FROM_OPTIONS, submitToSheet } from "@/lib/formOptions";
import {
  SuccessScreen,
  SuccessCard,
  SuccessDetail,
  SuccessParagraph,
  SuccessFooterLink,
  formCardClass,
  pageHeroNarrowClass,
  narrowSectionClass,
} from "@/components/site/SuccessScreen";

const schema = z.object({
  fullName: z.string().trim().min(2, "Enter the full name").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().min(7, "Enter a valid phone number").max(20),
  category: z.string().min(1, "Pick a category"),
  organization: z.string().trim().min(2, "Enter the location/organization").max(150),
  socialReach: z.string().trim().max(200).optional().default(""),
  heardFrom: z.string().trim().max(80).optional().default(""),
  referralCode: z
    .string()
    .trim()
    .min(3, "Referral code must be at least 3 characters")
    .max(40, "Max 40 characters")
    .regex(/^[A-Z0-9-]+$/, "Use uppercase letters, numbers and dashes only"),
});

function suggestCode(name: string) {
  const base = (name || "AMBASSADOR")
    .toUpperCase()
    .replace(/[^A-Z0-9 ]/g, "")
    .trim()
    .split(/\s+/)[0]
    .slice(0, 12) || "AMB";
  const rand = Math.floor(100 + Math.random() * 899);
  return `${base}-AMB-0X${rand}`;
}

export default function AmbassadorOnboardPage() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    category: "",
    organization: "",
    socialReach: "",
    heardFrom: "",
    referralCode: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<typeof form | null>(null);
  const [remoteError, setRemoteError] = useState("");
  const [copied, setCopied] = useState(false);

  const placeholder = useMemo(() => suggestCode(form.fullName), [form.fullName]);

  function update<K extends keyof typeof form>(k: K, v: (typeof form)[K]) {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k as string]) setErrors((e) => ({ ...e, [k as string]: "" }));
  }

  function regenerate() {
    update("referralCode", suggestCode(form.fullName));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setRemoteError("");
    const cleaned = { ...form, referralCode: form.referralCode.toUpperCase().trim() };
    const parsed = schema.safeParse(cleaned);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => (errs[String(i.path[0])] = i.message));
      setErrors(errs);
      return;
    }
    setSubmitting(true);
    try {
      await submitToSheet({
        type: "Ambassador Onboarding",
        fullName: parsed.data.fullName,
        email: parsed.data.email,
        phone: parsed.data.phone,
        category: parsed.data.category,
        organization: parsed.data.organization,
        socialReach: parsed.data.socialReach ?? "",
        heardFrom: parsed.data.heardFrom ?? "",
        referralCode: parsed.data.referralCode,
        onboardedAt: new Date().toISOString(),
      });
      setSuccess(parsed.data as typeof form);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error(err);
      setRemoteError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    const link = `${typeof window !== "undefined" ? window.location.origin : ""}/register/${success.referralCode}`;
    function copy() {
      navigator.clipboard.writeText(link).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      });
    }
    return (
      <SiteLayout>
        <SEO title="Ambassador onboarded, OxVerse Academy" />
        <SuccessScreen>
          <SuccessCard
            eyebrow="Ambassador onboarded"
            title={`${success.fullName.split(" ")[0]} is onboarded!`}
          >
            <SuccessParagraph>
              Referral code created and saved. Share the personal link below, every paid enrollment
              through it is attributed to this ambassador.
            </SuccessParagraph>
            <SuccessDetail label="Referral code" mono>
              {success.referralCode}
            </SuccessDetail>
            <div className="rounded-xl bg-white/10 border border-white/15 p-4 space-y-3">
              <p className="text-[11px] sm:text-xs text-primary-foreground/70">Personal link</p>
              <code className="block break-all rounded-lg bg-black/30 px-3 py-2 text-xs sm:text-sm leading-relaxed">
                {link}
              </code>
              <button
                type="button"
                onClick={copy}
                className="flex w-full items-center justify-center gap-1.5 rounded-full bg-white text-primary px-4 py-3 text-sm font-semibold"
              >
                {copied ? (
                  <>
                    <Check className="size-3.5" /> Copied
                  </>
                ) : (
                  <>
                    <Copy className="size-3.5" /> Copy link
                  </>
                )}
              </button>
            </div>
          </SuccessCard>
          <SuccessFooterLink
            onClick={() => {
              setSuccess(null);
              setForm({
                fullName: "",
                email: "",
                phone: "",
                category: "",
                organization: "",
                socialReach: "",
                heardFrom: "",
                referralCode: "",
              });
            }}
          >
            Onboard another ambassador
          </SuccessFooterLink>
        </SuccessScreen>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <SEO title="Internal Ambassador Onboarding, OxVerse Academy" />
      <section className="relative">
        <div className="absolute inset-0 grid-pattern opacity-50 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        <div className="absolute inset-0 radial-purple" />
        <div className={`relative ${pageHeroNarrowClass}`}>
          <SectionEyebrow>Internal · Staff only</SectionEyebrow>
          <h1 className="mt-6 font-display text-4xl md:text-6xl font-bold tracking-tighter">
            Onboard a new <span className="gradient-text">ambassador.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-ink-muted text-pretty">
            Register an ambassador on their behalf and generate (or manually set) their unique
            referral code.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-50 dark:bg-amber-500/10 px-3 py-1.5 text-xs text-amber-700 dark:text-amber-300">
            <ShieldCheck className="size-3.5" /> For OxVerse staff use only
          </div>
        </div>
      </section>

      <section className={`${narrowSectionClass} max-w-4xl pt-0`}>
        <form
          onSubmit={onSubmit}
          noValidate
          className={formCardClass}
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Full name" error={errors.fullName}>
              <input className="input" value={form.fullName} onChange={(e) => update("fullName", e.target.value)} maxLength={100} required />
            </Field>
            <Field label="Email" error={errors.email}>
              <input className="input" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} maxLength={255} required />
            </Field>
          </div>
          <Field label="Phone / WhatsApp" error={errors.phone}>
            <input className="input" value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+234 …" maxLength={20} required />
          </Field>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Ambassador category" error={errors.category}>
              <select className="input" value={form.category} onChange={(e) => update("category", e.target.value)} required>
                <option value="">Select…</option>
                {AMBASSADOR_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </Field>
            <Field label="Specific location / organization" error={errors.organization}>
              <input className="input" value={form.organization} onChange={(e) => update("organization", e.target.value)} placeholder="e.g. UNILAG, NYSC Lagos Camp" maxLength={150} required />
            </Field>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Social reach (optional)" error={errors.socialReach}>
              <input className="input" value={form.socialReach} onChange={(e) => update("socialReach", e.target.value)} placeholder="e.g. IG 5k, TikTok 2k" maxLength={200} />
            </Field>
            <Field label="How they heard about us (optional)">
              <select className="input" value={form.heardFrom} onChange={(e) => update("heardFrom", e.target.value)}>
                <option value="">Select…</option>
                {HEARD_FROM_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </Field>
          </div>

          <div className="rounded-2xl border border-primary/30 bg-primary/5 p-5 space-y-3">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-primary">Referral code</p>
                <p className="text-xs text-ink-muted">
                  Type a custom code or click suggest. Format: uppercase letters, numbers, dashes.
                </p>
              </div>
              <button
                type="button"
                onClick={regenerate}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-semibold hover:border-ink transition"
              >
                <RefreshCw className="size-3.5" /> Suggest
              </button>
            </div>
            <Field label="Referral code" error={errors.referralCode}>
              <input
                className="input uppercase tracking-wider font-mono"
                value={form.referralCode}
                onChange={(e) => update("referralCode", e.target.value.toUpperCase())}
                placeholder={placeholder}
                maxLength={40}
                autoComplete="off"
                required
              />
            </Field>
          </div>

          {remoteError && <p className="text-sm text-red-600">{remoteError}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-ink text-background px-6 py-4 font-semibold hover:bg-primary transition disabled:opacity-60"
          >
            {submitting ? "Saving..." : (<>Onboard ambassador <ArrowRight className="size-4" /></>)}
          </button>
        </form>
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