import { useState } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import { ArrowRight, Briefcase, GraduationCap, Sparkles, Users, CheckCircle2 } from "lucide-react";
import { SiteLayout, SectionEyebrow } from "@/components/site/SiteLayout";
import { SEO } from "@/components/site/SEO";
import { Link } from "react-router-dom";
import { SITE, whatsappLink } from "@/lib/site";
import {
  SuccessScreen,
  SuccessCard,
  SuccessDetail,
  SuccessParagraph,
  SuccessActionGrid,
  SuccessActionCard,
  SuccessFooterLink,
  formCardClass,
  pageHeroClass,
  pageSectionClass,
} from "@/components/site/SuccessScreen";
import { BenefitsPanel, FormAside } from "@/components/site/BenefitsPanel";

const ENDPOINT =  "https://script.google.com/macros/s/AKfycbx75LbVspkpBk_Ok1TQ6y46y1TI2IocWuqV2Wx8Aup4iHdn6f39rBXxPBMwWiYmEVYGLg/exec";

const ROLES = [
  "Office Assistant",
  "Frontend Development Tutor",
  "Backend Development Tutor",
  "Full Stack Development Tutor",
  "UI/UX Design Tutor",
  "Graphic Design Tutor",
  "Digital Marketing Tutor",
  "Data Analysis Tutor",
  "Artificial Intelligence Tutor",
  "Web3 / Blockchain Tutor",
  "Mobile App Development Tutor",
  "Social Media / Marketing Lead",
  "Other",
] as const;

const WORK_TYPES = ["Full time", "Part time", "Contract", "Volunteer"] as const;
const GENDERS = ["Male", "Female", "Prefer not to say"] as const;

const schema = z.object({
  // Personal
  fullName: z.string().trim().min(2, "Enter your full name").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().min(7, "Enter a valid phone number").max(20),
  location: z.string().trim().min(2, "Enter your current location").max(120),
  dob: z.string().optional().default(""),
  gender: z.string().optional().default(""),
  // Role
  role: z.enum(ROLES, { message: "Pick a role" }),
  // Professional
  yearsExperience: z.string().trim().min(1, "Required").max(20),
  currentOccupation: z.string().trim().min(2, "Required").max(120),
  expertise: z.string().trim().min(2, "Required").max(200),
  qualification: z.string().trim().min(2, "Required").max(120),
  cvLink: z.string().trim().url("Enter a valid CV link (Drive, Dropbox…)").max(500),
  portfolioLink: z.string().trim().url("Enter a valid URL").max(500).optional().or(z.literal("")),
  linkedin: z.string().trim().url("Enter a valid URL").max(500).optional().or(z.literal("")),
  github: z.string().trim().url("Enter a valid URL").max(500).optional().or(z.literal("")),
  designProfile: z.string().trim().url("Enter a valid URL").max(500).optional().or(z.literal("")),
  website: z.string().trim().url("Enter a valid URL").max(500).optional().or(z.literal("")),
  // Additional
  whyJoin: z.string().trim().min(20, "Tell us a bit more (20+ chars)").max(1000),
  inspiration: z.string().trim().min(20, "Tell us a bit more (20+ chars)").max(1000),
  previousExperience: z.string().trim().min(20, "Tell us a bit more (20+ chars)").max(1500),
  value: z.string().trim().min(20, "Tell us a bit more (20+ chars)").max(1000),
  availableLagos: z.enum(["Yes", "No"], { message: "Select an option" }),
  workType: z.enum(WORK_TYPES, { message: "Pick a work type" }),
});

type FormState = z.input<typeof schema>;

const initial: FormState = {
  fullName: "",
  email: "",
  phone: "",
  location: "",
  dob: "",
  gender: "",
  role: "" as FormState["role"],
  yearsExperience: "",
  currentOccupation: "",
  expertise: "",
  qualification: "",
  cvLink: "",
  portfolioLink: "",
  linkedin: "",
  github: "",
  designProfile: "",
  website: "",
  whyJoin: "",
  inspiration: "",
  previousExperience: "",
  value: "",
  availableLagos: "" as FormState["availableLagos"],
  workType: "" as FormState["workType"],
};

export default function CareersPage() {
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [remoteError, setRemoteError] = useState("");
  const [success, setSuccess] = useState<{ id: string; name: string; role: string } | null>(null);

  function update<K extends keyof FormState>(k: K, v: FormState[K]) {
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
      window.scrollTo({ top: 200, behavior: "smooth" });
      return;
    }
    setSubmitting(true);
    const id = crypto.randomUUID();
    const payload: Record<string, string> = {
      formType: "career_application",
      id,
      submittedAt: new Date().toISOString(),
      ...Object.fromEntries(
        Object.entries(parsed.data).map(([k, v]) => [k, String(v ?? "")]),
      ),
    };
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        body: new URLSearchParams(payload),
      });
      if (!res.ok) throw new Error(`Submit failed: ${res.status}`);
    } catch (err) {
      console.error(err);
      setRemoteError(
        "We couldn't submit your application right now. Please try again, or reach us on WhatsApp.",
      );
      setSubmitting(false);
      return;
    }
    setSubmitting(false);
    setSuccess({ id, name: parsed.data.fullName, role: parsed.data.role });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (success) {
    const firstName = success.name.split(" ")[0];

    return (
      <SiteLayout>
        <SEO
          title="Application received, OxVerse Academy Careers"
          description="Thanks for applying to join the OxVerse Academy team."
          noIndex
        />
        <SuccessScreen>
          <SuccessCard eyebrow="Application received" title={`Application received, ${firstName}!`} icon={CheckCircle2}>
            <SuccessDetail label="Role applied for">{success.role}</SuccessDetail>
            <SuccessParagraph>
              Our team will review your application and reach out within 5 to 7 working days.
            </SuccessParagraph>
            <SuccessDetail label="Reference" mono>
              {success.id.slice(0, 8).toUpperCase()}
            </SuccessDetail>
          </SuccessCard>

          <SuccessActionGrid>
            <SuccessActionCard
              title="Chat on WhatsApp"
              description="Follow up directly with the hiring team."
              footer={
                <>
                  {SITE.phoneDisplay} <ArrowRight className="size-4" />
                </>
              }
              href={whatsappLink(
                `Hi OxVerse, I just applied for the ${success.role} role. Ref: ${success.id
                  .slice(0, 8)
                  .toUpperCase()}`,
              )}
            />
            <SuccessActionCard
              title="Back to home"
              description="Explore courses, events and stories while you wait."
              footer={
                <>
                  Go home <ArrowRight className="size-4" />
                </>
              }
              to="/"
            />
          </SuccessActionGrid>

          <SuccessFooterLink to="/careers">Submit another application</SuccessFooterLink>
        </SuccessScreen>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <SEO
        title="Careers, Join the 0xVerse Academy team"
        description="Apply to teach or work with 0xVerse Academy. Open roles for tutors, designers, marketers and operations staff in Lagos."
        keywords="0xVerse careers, tech tutor jobs Lagos, teaching jobs, frontend tutor, UI UX tutor, work at 0xVerse"
      />

      <section className="relative">
        <div className="absolute inset-0 grid-pattern opacity-50 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        <div className="absolute inset-0 radial-purple" />
        <div className={`relative ${pageHeroClass} pt-24 sm:pt-28`}>
          <SectionEyebrow>We're hiring</SectionEyebrow>
          <h1 className="mt-6 font-display text-5xl md:text-7xl font-bold tracking-tighter text-balance max-w-4xl">
            Build the next generation of <span className="gradient-text">African tech talent.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-ink-muted text-pretty">
            Join 0xVerse Academy as a tutor, mentor, designer, or operations lead. We're assembling
            a team obsessed with craft, students, and outcomes.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {[
              { i: GraduationCap, t: "World class tutors" },
              { i: Briefcase, t: "Hybrid & on site roles in Lagos" },
              { i: Sparkles, t: "Mission driven team" },
            ].map((p) => (
              <span
                key={p.t}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 backdrop-blur px-4 py-2 text-sm text-ink"
              >
                <p.i className="size-4 text-primary" />
                {p.t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className={formGridClass}>
        <div className="lg:col-span-8">
          <form
            onSubmit={onSubmit}
            noValidate
            className={`${formCardClass} space-y-10`}
          >
            <FormSection title="Personal information" step="01">
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Full name" error={errors.fullName} required>
                  <input
                    className="input"
                    value={form.fullName}
                    onChange={(e) => update("fullName", e.target.value)}
                    placeholder="Victor Moses"
                    maxLength={100}
                  />
                </Field>
                <Field label="Email address" error={errors.email} required>
                  <input
                    className="input"
                    type="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    placeholder="you@email.com"
                    maxLength={255}
                  />
                </Field>
                <Field label="Phone number" error={errors.phone} required>
                  <input
                    className="input"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    placeholder="+234 …"
                    maxLength={20}
                  />
                </Field>
                <Field label="Current location" error={errors.location} required>
                  <input
                    className="input"
                    value={form.location}
                    onChange={(e) => update("location", e.target.value)}
                    placeholder="Lagos, Nigeria"
                    maxLength={120}
                  />
                </Field>
                <Field label="Date of birth (optional)" error={errors.dob}>
                  <input
                    className="input"
                    type="date"
                    value={form.dob}
                    onChange={(e) => update("dob", e.target.value)}
                  />
                </Field>
                <Field label="Gender (optional)" error={errors.gender}>
                  <select
                    className="input"
                    value={form.gender}
                    onChange={(e) => update("gender", e.target.value)}
                  >
                    <option value="">Select…</option>
                    {GENDERS.map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>
            </FormSection>

            <FormSection title="Role information" step="02">
              <Field label="Which role are you applying for?" error={errors.role} required>
                <select
                  className="input"
                  value={form.role}
                  onChange={(e) => update("role", e.target.value as FormState["role"])}
                >
                  <option value="">Select a role…</option>
                  {ROLES.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </Field>
            </FormSection>

            <FormSection title="Professional information" step="03">
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Years of experience" error={errors.yearsExperience} required>
                  <input
                    className="input"
                    value={form.yearsExperience}
                    onChange={(e) => update("yearsExperience", e.target.value)}
                    placeholder="e.g. 4 years"
                    maxLength={20}
                  />
                </Field>
                <Field label="Current occupation" error={errors.currentOccupation} required>
                  <input
                    className="input"
                    value={form.currentOccupation}
                    onChange={(e) => update("currentOccupation", e.target.value)}
                    placeholder="Frontend Engineer at …"
                    maxLength={120}
                  />
                </Field>
                <Field label="Area of expertise" error={errors.expertise} required>
                  <input
                    className="input"
                    value={form.expertise}
                    onChange={(e) => update("expertise", e.target.value)}
                    placeholder="React, TypeScript, Design Systems"
                    maxLength={200}
                  />
                </Field>
                <Field label="Highest qualification" error={errors.qualification} required>
                  <input
                    className="input"
                    value={form.qualification}
                    onChange={(e) => update("qualification", e.target.value)}
                    placeholder="B.Sc Computer Science"
                    maxLength={120}
                  />
                </Field>
              </div>

              <Field
                label="CV / Resume link"
                error={errors.cvLink}
                required
                hint="Upload your CV to Google Drive / Dropbox and paste the share link (set to anyone with link)."
              >
                <input
                  className="input"
                  value={form.cvLink}
                  onChange={(e) => update("cvLink", e.target.value)}
                  placeholder="https://drive.google.com/…"
                  maxLength={500}
                />
              </Field>

              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Portfolio link" error={errors.portfolioLink}>
                  <input
                    className="input"
                    value={form.portfolioLink}
                    onChange={(e) => update("portfolioLink", e.target.value)}
                    placeholder="https://…"
                    maxLength={500}
                  />
                </Field>
                <Field label="LinkedIn profile" error={errors.linkedin}>
                  <input
                    className="input"
                    value={form.linkedin}
                    onChange={(e) => update("linkedin", e.target.value)}
                    placeholder="https://linkedin.com/in/…"
                    maxLength={500}
                  />
                </Field>
                <Field label="GitHub (for dev roles)" error={errors.github}>
                  <input
                    className="input"
                    value={form.github}
                    onChange={(e) => update("github", e.target.value)}
                    placeholder="https://github.com/…"
                    maxLength={500}
                  />
                </Field>
                <Field label="Behance / Dribbble (for design)" error={errors.designProfile}>
                  <input
                    className="input"
                    value={form.designProfile}
                    onChange={(e) => update("designProfile", e.target.value)}
                    placeholder="https://dribbble.com/…"
                    maxLength={500}
                  />
                </Field>
                <Field label="Personal website (optional)" error={errors.website}>
                  <input
                    className="input"
                    value={form.website}
                    onChange={(e) => update("website", e.target.value)}
                    placeholder="https://…"
                    maxLength={500}
                  />
                </Field>
              </div>
            </FormSection>

            <FormSection title="A few more questions" step="04">
              <Field
                label="Why do you want to work with 0xVerse Academy?"
                error={errors.whyJoin}
                required
              >
                <textarea
                  className="input resize-none"
                  rows={4}
                  value={form.whyJoin}
                  onChange={(e) => update("whyJoin", e.target.value)}
                  maxLength={1000}
                />
              </Field>
              <Field
                label="What inspires you about teaching or working in tech education?"
                error={errors.inspiration}
                required
              >
                <textarea
                  className="input resize-none"
                  rows={4}
                  value={form.inspiration}
                  onChange={(e) => update("inspiration", e.target.value)}
                  maxLength={1000}
                />
              </Field>
              <Field
                label="Describe your previous experience in this role."
                error={errors.previousExperience}
                required
              >
                <textarea
                  className="input resize-none"
                  rows={5}
                  value={form.previousExperience}
                  onChange={(e) => update("previousExperience", e.target.value)}
                  maxLength={1500}
                />
              </Field>
              <Field
                label="What value can you bring to our academy?"
                error={errors.value}
                required
              >
                <textarea
                  className="input resize-none"
                  rows={4}
                  value={form.value}
                  onChange={(e) => update("value", e.target.value)}
                  maxLength={1000}
                />
              </Field>

              <div className="grid sm:grid-cols-2 gap-4">
                <Field
                  label="Available for physical classes in Lagos?"
                  error={errors.availableLagos}
                  required
                >
                  <div className="flex gap-2">
                    {(["Yes", "No"] as const).map((opt) => (
                      <button
                        type="button"
                        key={opt}
                        onClick={() => update("availableLagos", opt)}
                        className={`flex-1 rounded-full px-4 py-2.5 text-sm font-medium border transition ${
                          form.availableLagos === opt
                            ? "bg-ink text-background border-ink"
                            : "border-border text-ink-muted hover:border-ink hover:text-ink"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </Field>
                <Field label="Preferred work type" error={errors.workType} required>
                  <div className="flex flex-wrap gap-2">
                    {WORK_TYPES.map((w) => (
                      <button
                        type="button"
                        key={w}
                        onClick={() => update("workType", w)}
                        className={`rounded-full px-4 py-2 text-sm font-medium border transition ${
                          form.workType === w
                            ? "bg-ink text-background border-ink"
                            : "border-border text-ink-muted hover:border-ink hover:text-ink"
                        }`}
                      >
                        {w}
                      </button>
                    ))}
                  </div>
                </Field>
              </div>
            </FormSection>

            {remoteError && (
              <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-700">
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
                  Submitting application...
                </span>
              ) : (
                <>
                  Submit application <ArrowRight className="size-4" />
                </>
              )}
            </button>
            <p className="text-xs text-ink-muted text-center">
              By submitting, you agree to be contacted by the OxVerse hiring team.
            </p>
          </form>
        </div>

        <FormAside className="lg:col-span-4">
          <BenefitsPanel
            heading="Why join us?"
            className="lg:sticky lg:top-24"
            items={[
              { icon: Users, title: "Mission driven team", description: "Shape Africa's tech workforce." },
              { icon: GraduationCap, title: "Teach what you love", description: "Build curriculum with real impact." },
              { icon: Briefcase, title: "Flexible work", description: "Full time, part time, contract or volunteer." },
              { icon: Sparkles, title: "Grow with us", description: "Be early in a fast moving academy." },
            ]}
            footer={
              <a
                href={whatsappLink("Hi OxVerse, I have a question about the career application.")}
                target="_blank"
                rel="noreferrer"
                className="mt-5 sm:mt-6 inline-flex items-center gap-2 text-sm font-semibold underline underline-offset-4"
              >
                Questions? Chat with us <ArrowRight className="size-4" />
              </a>
            }
          />
        </FormAside>
      </section>
    </SiteLayout>
  );
}

function FormSection({
  title,
  step,
  children,
}: {
  title: string;
  step: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <span className="font-mono text-xs text-primary tracking-widest">{step}</span>
        <div className="h-px flex-1 bg-border" />
        <h2 className="font-display text-xl font-semibold tracking-tight">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function Field({
  label,
  error,
  hint,
  required,
  children,
}: {
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-ink">
        {label}
        {required && <span className="text-primary"> *</span>}
      </span>
      <div className="mt-2">{children}</div>
      {hint && !error && <p className="mt-1.5 text-xs text-ink-muted">{hint}</p>}
      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
    </label>
  );
}