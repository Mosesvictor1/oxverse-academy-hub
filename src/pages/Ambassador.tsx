import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { z } from "zod";
import {
  Sparkles,
  ArrowRight,
  Gift,
  Users,
  Award,
  TrendingUp,
  Share2,
  Check,
  ShieldCheck,
} from "lucide-react";
import { SiteLayout, SectionEyebrow } from "@/components/site/SiteLayout";
import { SEO } from "@/components/site/SEO";
import {
  AMBASSADOR_CATEGORIES,
  HEARD_FROM_OPTIONS,
  submitToSheet,
} from "@/lib/formOptions";

const schema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().min(7, "Enter a valid phone number").max(20),
  category: z.string().min(1, "Pick a category"),
  organization: z.string().trim().min(2, "Tell us the location/organization").max(150),
  socialReach: z.string().trim().max(200).optional().default(""),
  heardFrom: z.string().trim().max(80).optional().default(""),
});

const tiers = [
  { range: "1 – 10 referrals", reward: "5% commission" },
  { range: "11 – 25 referrals", reward: "7% commission" },
  { range: "26 – 50 referrals", reward: "10% commission" },
  { range: "51+ referrals", reward: "12% + exclusive recognition" },
];

export default function AmbassadorPage() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    category: "",
    organization: "",
    socialReach: "",
    heardFrom: "",
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
    try {
      await submitToSheet({
        type: "Ambassador",
        fullName: parsed.data.fullName,
        email: parsed.data.email,
        phone: parsed.data.phone,
        category: parsed.data.category,
        organization: parsed.data.organization,
        socialReach: parsed.data.socialReach ?? "",
        heardFrom: parsed.data.heardFrom ?? "",
        submittedAt: new Date().toISOString(),
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
    return (
      <SiteLayout>
        <SEO title="Welcome, Ambassador — OxVerse Academy" />
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
              Your ambassador application has been received. We'll review and email{" "}
              <strong>{success.email}</strong> with your unique referral code/link and the
              ambassador starter pack.
            </p>
          </motion.div>
          <Link to="/" className="mt-8 inline-block text-sm underline text-ink-muted">
            ← Back to home
          </Link>
        </section>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <SEO
        title="Become an Ambassador — OxVerse Academy"
        description="Promote OxVerse Academy and earn up to 12% commission on every verified paid enrollment. Join the ambassador program."
        canonical="https://oxverse.academy/ambassador"
      />
      <section className="relative">
        <div className="absolute inset-0 grid-pattern opacity-50 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        <div className="absolute inset-0 radial-purple" />
        <div className="relative mx-auto max-w-7xl px-6 pt-24 pb-10">
          <SectionEyebrow>Ambassador Program</SectionEyebrow>
          <h1 className="mt-6 font-display text-5xl md:text-7xl font-bold tracking-tighter text-balance max-w-4xl">
            Where skills become <span className="gradient-text">solutions.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-ink-muted text-pretty">
            Promote our mission of making quality tech education accessible — and earn commissions
            for every verified paid enrollment you bring in.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-10 grid md:grid-cols-3 gap-5">
        {[
          { i: TrendingUp, t: "Earn 5%–12%", d: "Tiered commission on every verified paid enrollment." },
          { i: Award, t: "Recognition", d: "Top performers receive certificates, merch & leadership roles." },
          { i: Users, t: "Networking", d: "Connect with instructors, fellow ambassadors & industry pros." },
        ].map((b) => (
          <div key={b.t} className="rounded-3xl border border-border p-6">
            <span className="size-11 grid place-items-center rounded-xl bg-primary/10 text-primary">
              <b.i className="size-5" />
            </span>
            <p className="mt-4 font-display text-xl font-semibold">{b.t}</p>
            <p className="mt-1.5 text-sm text-ink-muted">{b.d}</p>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24 grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-7">
          <form
            onSubmit={onSubmit}
            noValidate
            className="rounded-3xl border border-border bg-background p-8 lg:p-10 space-y-5"
          >
            <div>
              <h2 className="font-display text-2xl font-bold">Become an ambassador</h2>
              <p className="mt-1 text-sm text-ink-muted">
                Tell us about you — we'll email your referral code within 24 hours.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Full name" error={errors.fullName}>
                <input
                  className="input"
                  value={form.fullName}
                  onChange={(e) => update("fullName", e.target.value)}
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
            <Field label="Ambassador category" error={errors.category}>
              <select
                className="input"
                value={form.category}
                onChange={(e) => update("category", e.target.value)}
                required
              >
                <option value="">Select a category…</option>
                {AMBASSADOR_CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </Field>
            <Field label="Specific location / organization" error={errors.organization}>
              <input
                className="input"
                value={form.organization}
                onChange={(e) => update("organization", e.target.value)}
                placeholder="e.g. UNILAG Akoka, NYSC Lagos Camp, GDG Lagos"
                maxLength={150}
                required
              />
            </Field>
            <Field label="Social reach (optional)" error={errors.socialReach}>
              <input
                className="input"
                value={form.socialReach}
                onChange={(e) => update("socialReach", e.target.value)}
                placeholder="e.g. IG 5k, TikTok 2k, WhatsApp groups 1.2k"
                maxLength={200}
              />
            </Field>
            <Field label="How did you hear about us? (optional)">
              <select
                className="input"
                value={form.heardFrom}
                onChange={(e) => update("heardFrom", e.target.value)}
              >
                <option value="">Select…</option>
                {HEARD_FROM_OPTIONS.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </Field>
            {remoteError && <p className="text-sm text-red-600">{remoteError}</p>}
            <button
              type="submit"
              disabled={submitting}
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-ink text-background px-6 py-4 font-semibold hover:bg-primary transition disabled:opacity-60"
            >
              {submitting ? "Submitting..." : (<>Apply to become an ambassador <ArrowRight className="size-4" /></>)}
            </button>
            <p className="text-xs text-ink-muted text-center">
              By applying you agree to the OxVerse Ambassador Program terms and future updates.
            </p>
          </form>
        </div>

        <aside className="lg:col-span-5 space-y-5">
          <div className="rounded-3xl bg-gradient-to-br from-primary to-purple-900 text-primary-foreground p-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider">
              <Gift className="size-3.5" /> Tiered rewards
            </div>
            <p className="mt-4 font-display text-2xl font-bold tracking-tight">
              The more you refer, the more you earn.
            </p>
            <ul className="mt-6 space-y-3">
              {tiers.map((t) => (
                <li key={t.range} className="flex items-center justify-between gap-4 rounded-2xl bg-white/10 px-4 py-3 border border-white/15">
                  <span className="text-sm font-medium">{t.range}</span>
                  <span className="text-sm font-semibold">{t.reward}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-xs text-primary-foreground/80">
              Commissions are paid only for verified fully-paid enrollments. Cancelled or refunded
              enrollments do not qualify.
            </p>
          </div>

          <div className="rounded-3xl border border-border p-6">
            <p className="font-display text-lg font-semibold">Referral process</p>
            <ol className="mt-4 space-y-3 text-sm">
              {[
                { i: Check, t: "Register as an ambassador" },
                { i: Share2, t: "Receive a unique referral link & code" },
                { i: Users, t: "Share with prospects" },
                { i: ShieldCheck, t: "Verified paid enrollments earn rewards" },
              ].map((s, idx) => (
                <li key={s.t} className="flex gap-3">
                  <span className="size-7 grid place-items-center rounded-lg bg-primary/10 text-primary text-xs font-semibold">
                    {idx + 1}
                  </span>
                  <span className="pt-0.5">{s.t}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-3xl border border-border p-6">
            <p className="font-display text-lg font-semibold">Role of an ambassador</p>
            <ul className="mt-3 space-y-2 text-sm text-ink-muted">
              <li>• Promote academy programs and events</li>
              <li>• Refer prospective students</li>
              <li>• Represent the academy professionally</li>
              <li>• Participate in marketing campaigns & community activities</li>
            </ul>
          </div>

          <div className="rounded-3xl border border-border p-6">
            <p className="font-display text-lg font-semibold">Guidelines & policy</p>
            <ul className="mt-3 space-y-2 text-sm text-ink-muted">
              <li>• Provide accurate information — no misleading advertising</li>
              <li>• Uphold the academy's reputation</li>
              <li>• Payments follow the academy's payout schedule via approved methods</li>
              <li>• Fraud, misconduct or policy violations may lead to removal</li>
              <li>• Keep confidential academy information confidential</li>
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