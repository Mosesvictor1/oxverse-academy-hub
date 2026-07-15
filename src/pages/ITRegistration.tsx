import { useRef, useState } from "react";
import { z } from "zod";
import { ArrowRight, Briefcase, Check, GraduationCap, Sparkles, Upload, X, FileText } from "lucide-react";
import { SiteLayout, SectionEyebrow } from "@/components/site/SiteLayout";
import { SEO } from "@/components/site/SEO";
import { courses } from "@/lib/courses";
import { submitToSheet } from "@/lib/formOptions";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { whatsappLink } from "@/lib/site";
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

const IT_DURATIONS = ["3 Months", "4 Months", "6 Months", "12 Months"] as const;
const CURRENT_LEVELS = [
  "100 Level", "200 Level", "300 Level", "400 Level", "500 Level",
  "ND1", "ND2", "HND1", "HND2", "Other",
] as const;

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED = ["image/png", "image/jpeg", "image/webp", "application/pdf"];

const schema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().min(7, "Enter a valid phone").max(20),
  institutionName: z.string().trim().min(2, "Enter your institution").max(200),
  courseOfStudy: z.string().trim().min(2, "Enter your course of study").max(150),
  currentLevel: z.string().min(1, "Select your current level"),
  itDuration: z.string().min(1, "Select IT duration"),
  proposedStartDate: z.string().min(1, "Pick your proposed start date"),
  courseSlug: z.string().min(1, "Select a course to intern on"),
  additionalNotes: z.string().trim().max(500).optional().default(""),
});

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  institutionName: string;
  courseOfStudy: string;
  currentLevel: string;
  itDuration: string;
  proposedStartDate: string;
  courseSlug: string;
  additionalNotes: string;
  schoolItLetterName: string;
};

export default function ITRegistrationPage() {
  const [form, setForm] = useState<FormState>({
    fullName: "",
    email: "",
    phone: "",
    institutionName: "",
    courseOfStudy: "",
    currentLevel: "",
    itDuration: "",
    proposedStartDate: "",
    courseSlug: "",
    additionalNotes: "",
    schoolItLetterName: "",
  });
  const [letterFile, setLetterFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [remoteError, setRemoteError] = useState("");
  const [success, setSuccess] = useState<FormState | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  function update<K extends keyof FormState>(k: K, v: FormState[K]) {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k as string]) setErrors((e) => ({ ...e, [k as string]: "" }));
  }

  function handleFile(file: File | null) {
    setRemoteError("");
    if (!file) {
      setLetterFile(null);
      update("schoolItLetterName", "");
      return;
    }
    if (!ALLOWED.includes(file.type) && !/\.pdf$/i.test(file.name)) {
      setRemoteError("School IT letter must be a PDF, PNG, JPG or WEBP file.");
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setRemoteError("File must be 10MB or smaller.");
      return;
    }
    setLetterFile(file);
    update("schoolItLetterName", file.name);
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
      let schoolItLetterUrl = "";
      if (letterFile) {
        setUploading(true);
        schoolItLetterUrl = await uploadToCloudinary(letterFile);
        setUploading(false);
      }
      const payload = {
        type: "IT" as const,
        fullName: parsed.data.fullName,
        email: parsed.data.email,
        phone: parsed.data.phone,
        institutionName: parsed.data.institutionName,
        courseOfStudy: parsed.data.courseOfStudy,
        currentLevel: parsed.data.currentLevel,
        itDuration: parsed.data.itDuration,
        proposedStartDate: parsed.data.proposedStartDate,
        courseSlug: parsed.data.courseSlug,
        courseTitle: course?.title ?? "IT application",
        additionalNotes: parsed.data.additionalNotes ?? "",
        schoolItLetterName: form.schoolItLetterName || "",
        schoolItLetterUrl,
        submittedAt: new Date().toISOString(),
      };
      await submitToSheet(payload);
      setSuccess(form);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error(err);
      setRemoteError(
        err instanceof Error ? err.message : "Something went wrong. Please try again.",
      );
    } finally {
      setUploading(false);
      setSubmitting(false);
    }
  }

  if (success) {
    const courseTitle =
      courses.find((c) => c.slug === success.courseSlug)?.title ?? "your placement";
    const firstName = success.fullName.split(" ")[0];
    return (
      <SiteLayout>
        <SEO title="IT application received, OxVerse Academy" />
        <SuccessScreen>
          <SuccessCard eyebrow="IT application received" title={`Thanks, ${firstName}!`}>
            <SuccessDetail label="Placement track">{courseTitle}</SuccessDetail>
            <SuccessDetail label="Institution">{success.institutionName}</SuccessDetail>
            <SuccessDetail label="Duration">{success.itDuration}</SuccessDetail>
            <SuccessParagraph>
              Our IT coordinator will review your application and reach out on{" "}
              <strong>{success.email}</strong> within 2 working days.
            </SuccessParagraph>
            <SuccessCta href={whatsappLink(`Hi OxVerse, I just applied for IT (${courseTitle}).`)}>
              Message the IT coordinator on WhatsApp
            </SuccessCta>
          </SuccessCard>
          <SuccessFooterLink to="/">← Back to home</SuccessFooterLink>
        </SuccessScreen>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <SEO
        title="IT Registration, OxVerse Academy"
        description="Apply for your Student Industrial Training (SIWES / IT) placement at OxVerse Academy."
      />
      <section className="relative">
        <div className="absolute inset-0 grid-pattern opacity-50 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        <div className="absolute inset-0 radial-purple" />
        <div className={`relative ${pageHeroClass}`}>
          <SectionEyebrow>IT / SIWES Placement</SectionEyebrow>
          <h1 className="mt-6 font-display text-5xl md:text-7xl font-bold tracking-tighter text-balance max-w-3xl">
            Do your <span className="gradient-text">Industrial Training</span> with us.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-ink-muted text-pretty">
            Get real project experience shipping products with the OxVerse team. Upload your
            school IT letter (optional), pick a placement track, and we'll take it from there.
          </p>
        </div>
      </section>

      <section className={formGridClass}>
        <div className="lg:col-span-7">
          <form onSubmit={onSubmit} noValidate className={formCardClass}>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Full name" error={errors.fullName}>
                <input className="input" value={form.fullName} maxLength={100} required
                  onChange={(e) => update("fullName", e.target.value)} placeholder="John Smith" />
              </Field>
              <Field label="Email" error={errors.email}>
                <input className="input" type="email" value={form.email} maxLength={255} required
                  onChange={(e) => update("email", e.target.value)} placeholder="you@email.com" />
              </Field>
            </div>
            <Field label="Phone / WhatsApp" error={errors.phone}>
              <input className="input" value={form.phone} maxLength={20} required
                onChange={(e) => update("phone", e.target.value)} placeholder="+234 …" />
            </Field>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Institution name" error={errors.institutionName}>
                <input className="input" value={form.institutionName} maxLength={200} required
                  onChange={(e) => update("institutionName", e.target.value)}
                  placeholder="e.g. University of Lagos" />
              </Field>
              <Field label="Course of study" error={errors.courseOfStudy}>
                <input className="input" value={form.courseOfStudy} maxLength={150} required
                  onChange={(e) => update("courseOfStudy", e.target.value)}
                  placeholder="e.g. Computer Science" />
              </Field>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Current level" error={errors.currentLevel}>
                <select className="input" value={form.currentLevel} required
                  onChange={(e) => update("currentLevel", e.target.value)}>
                  <option value="">Select level…</option>
                  {CURRENT_LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}
                </select>
              </Field>
              <Field label="IT duration" error={errors.itDuration}>
                <select className="input" value={form.itDuration} required
                  onChange={(e) => update("itDuration", e.target.value)}>
                  <option value="">Select duration…</option>
                  {IT_DURATIONS.map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
              </Field>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Proposed start date" error={errors.proposedStartDate}>
                <input className="input" type="date" value={form.proposedStartDate} required
                  onChange={(e) => update("proposedStartDate", e.target.value)} />
              </Field>
              <Field label="Placement track" error={errors.courseSlug}>
                <select className="input" value={form.courseSlug} required
                  onChange={(e) => update("courseSlug", e.target.value)}>
                  <option value="">Select a track…</option>
                  {courses.map((c) => (
                    <option key={c.slug} value={c.slug}>{c.title}</option>
                  ))}
                </select>
              </Field>
            </div>

            <Field label="School IT letter (optional) — PDF, PNG or JPG, up to 10MB">
              <div className="rounded-2xl border border-dashed border-border bg-muted/30 p-4">
                {letterFile ? (
                  <div className="flex items-center gap-3">
                    <span className="size-10 grid place-items-center rounded-xl bg-primary/10 text-primary">
                      <FileText className="size-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold truncate">{letterFile.name}</p>
                      <p className="text-xs text-ink-muted">
                        {(letterFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <button type="button" onClick={() => handleFile(null)}
                      className="p-2 rounded-lg hover:bg-muted" aria-label="Remove file">
                      <X className="size-4" />
                    </button>
                  </div>
                ) : (
                  <button type="button" onClick={() => fileRef.current?.click()}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-background px-4 py-6 text-sm font-medium text-ink-muted hover:border-ink hover:text-ink transition">
                    <Upload className="size-4" /> Upload school IT letter
                  </button>
                )}
                <input ref={fileRef} type="file" className="hidden"
                  accept=".pdf,image/png,image/jpeg,image/webp"
                  onChange={(e) => handleFile(e.target.files?.[0] ?? null)} />
              </div>
            </Field>

            <Field label="Anything else we should know? (optional)" error={errors.additionalNotes}>
              <textarea className="input resize-none" rows={4} value={form.additionalNotes}
                onChange={(e) => update("additionalNotes", e.target.value)} maxLength={500} />
            </Field>

            {remoteError && <p className="text-sm text-red-600">{remoteError}</p>}
            <button type="submit" disabled={submitting}
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-ink text-background px-6 py-4 font-semibold hover:bg-primary transition disabled:opacity-60">
              {submitting
                ? (uploading ? "Uploading letter…" : "Submitting…")
                : (<>Submit IT application <ArrowRight className="size-4" /></>)}
            </button>
          </form>
        </div>

        <FormAside>
          <BenefitsPanel
            heading="Why intern at OxVerse?"
            items={[
              { icon: Briefcase, title: "Real product work", description: "Ship features that reach thousands of learners." },
              { icon: GraduationCap, title: "Mentorship", description: "Weekly 1:1s with senior engineers and designers." },
              { icon: Check, title: "SIWES compliant", description: "We complete and stamp all your school paperwork." },
              { icon: Sparkles, title: "Retention offers", description: "Top interns get scholarships and job offers." },
            ]}
          />
        </FormAside>
      </section>
    </SiteLayout>
  );
}

function Field({
  label, error, children,
}: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="block">
      <span className="text-sm font-medium text-ink">{label}</span>
      <div className="mt-2">{children}</div>
      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
    </div>
  );
}