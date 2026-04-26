import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Check, Calendar, Users, Upload, PartyPopper } from "lucide-react";
import { useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { getCourse, type Course } from "@/lib/courses";
import { INTAKES, CLASS_TIMES, saveApplication, type Application } from "@/lib/enrollment";

export const Route = createFileRoute("/enroll/$slug")({
  loader: ({ params }) => {
    const course = getCourse(params.slug);
    if (!course) throw notFound();
    return { course };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [{ title: `Enroll — ${loaderData.course.title} | OxVerse Academy` },
         { name: "description", content: `Apply for ${loaderData.course.title} at OxVerse Academy.` }]
      : [],
  }),
  notFoundComponent: () => (
    <SiteLayout><div className="mx-auto max-w-2xl px-6 py-32 text-center"><h1 className="font-display text-4xl font-bold">Course not found</h1><Link to="/courses" className="mt-6 inline-block text-primary font-semibold">View all courses</Link></div></SiteLayout>
  ),
  errorComponent: ({ error, reset }) => (
    <SiteLayout><div className="mx-auto max-w-2xl px-6 py-32 text-center"><h1 className="font-display text-3xl font-bold">Something went wrong</h1><p className="mt-3 text-ink-muted">{error.message}</p><button onClick={reset} className="mt-6 rounded-full bg-ink text-background px-6 py-3 font-semibold">Retry</button></div></SiteLayout>
  ),
  component: EnrollPage,
});

const STEPS = ["Personal", "Education", "Course", "Goals", "Documents", "Review", "Done"] as const;

function EnrollPage() {
  const { course } = Route.useLoaderData() as { course: Course };
  const navigate = useNavigate();
  const [step, setStep] = useState<number>(0);
  const [appId, setAppId] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    gender: "Prefer not to say" as Application["gender"],
    address: "",
    educationLevel: "Undergraduate" as Application["educationLevel"],
    school: "",
    employmentStatus: "Student" as Application["employmentStatus"],
    skillLevel: "None" as Application["skillLevel"],
    intakeId: INTAKES[0].id,
    schedule: course.schedule[0],
    classTime: CLASS_TIMES[0] as string,
    motivation: "", careerGoals: "", expectations: "",
    passportPhotoName: "", idDocumentName: "",
  });

  const intake = INTAKES.find((i) => i.id === form.intakeId)!;

  function set<K extends keyof typeof form>(k: K, v: (typeof form)[K]) { setForm((p) => ({ ...p, [k]: v })); }

  function validate(s: number) {
    const e: Record<string, string> = {};
    if (s === 0) {
      if (!form.firstName.trim()) e.firstName = "Required";
      if (!form.lastName.trim()) e.lastName = "Required";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Valid email required";
      if (!/^[+0-9\s()-]{7,20}$/.test(form.phone)) e.phone = "Valid phone required";
      if (!form.address.trim()) e.address = "Required";
    }
    if (s === 1) {
      if (!form.school.trim()) e.school = "Required";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function submit() {
    const id = `OX-${Date.now().toString(36).toUpperCase()}`;
    const app: Application = {
      id,
      courseSlug: course.slug,
      courseTitle: course.title,
      intakeId: intake.id,
      intakeLabel: intake.label,
      schedule: form.schedule,
      classTime: form.classTime,
      firstName: form.firstName.slice(0, 60),
      lastName: form.lastName.slice(0, 60),
      email: form.email.slice(0, 255),
      phone: form.phone.slice(0, 20),
      gender: form.gender,
      address: form.address.slice(0, 200),
      educationLevel: form.educationLevel,
      school: form.school.slice(0, 120),
      employmentStatus: form.employmentStatus,
      skillLevel: form.skillLevel,
      motivation: form.motivation.slice(0, 1000),
      careerGoals: form.careerGoals.slice(0, 500),
      expectations: form.expectations.slice(0, 500),
      passportPhotoName: form.passportPhotoName || undefined,
      idDocumentName: form.idDocumentName || undefined,
      status: "submitted",
      onboarding: { welcomeRead: false, paymentPlanChosen: false, communityJoined: false, orientationConfirmed: false },
      submittedAt: new Date().toISOString(),
    };
    saveApplication(app);
    setAppId(id);
    setStep(6);
  }

  return (
    <SiteLayout>
      <section className="relative">
        <div className="absolute inset-0 grid-pattern opacity-40 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        <div className="relative mx-auto max-w-7xl px-6 pt-24 pb-8">
          <Link to="/courses/$slug" params={{ slug: course.slug }} className="text-sm text-ink-muted hover:text-ink">← Back to {course.title}</Link>
          <h1 className="mt-4 font-display text-4xl md:text-5xl font-bold tracking-tighter">Reserve your seat</h1>
          <p className="mt-2 text-ink-muted">Apply for {course.title} — physical classes at our Lagos campus.</p>

          <div className="mt-8 flex items-center gap-1 overflow-x-auto pb-2">
            {STEPS.map((label, i) => (
              <div key={label} className="flex items-center gap-2 shrink-0">
                <span className={`size-7 rounded-full inline-flex items-center justify-center text-xs font-semibold ${step >= i ? "bg-ink text-background" : "bg-muted text-ink-muted"}`}>
                  {step > i ? <Check className="size-4" /> : i + 1}
                </span>
                <span className={`text-xs font-medium ${step >= i ? "text-ink" : "text-ink-muted"}`}>{label}</span>
                {i < STEPS.length - 1 && <span className="w-6 h-px bg-border mx-1" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24 grid lg:grid-cols-3 gap-10">
        <motion.div key={step} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-2">
          {step === 0 && (
            <Card title="Personal information" desc="Tell us a bit about yourself.">
              <Grid>
                <Field label="First name" error={errors.firstName}><input className="input" value={form.firstName} onChange={(e) => set("firstName", e.target.value)} maxLength={60} /></Field>
                <Field label="Last name" error={errors.lastName}><input className="input" value={form.lastName} onChange={(e) => set("lastName", e.target.value)} maxLength={60} /></Field>
                <Field label="Email" error={errors.email}><input className="input" type="email" value={form.email} onChange={(e) => set("email", e.target.value)} maxLength={255} /></Field>
                <Field label="Phone" error={errors.phone}><input className="input" value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+234 …" maxLength={20} /></Field>
                <Field label="Gender">
                  <select className="input" value={form.gender} onChange={(e) => set("gender", e.target.value as Application["gender"])}>
                    {(["Male", "Female", "Prefer not to say"] as const).map((o) => <option key={o}>{o}</option>)}
                  </select>
                </Field>
                <Field label="Address" error={errors.address} full><input className="input" value={form.address} onChange={(e) => set("address", e.target.value)} placeholder="Street, city, state" maxLength={200} /></Field>
              </Grid>
              <Nav onNext={() => validate(0) && setStep(1)} />
            </Card>
          )}

          {step === 1 && (
            <Card title="Educational background" desc="Helps us tailor your learning.">
              <Grid>
                <Field label="Current education level">
                  <select className="input" value={form.educationLevel} onChange={(e) => set("educationLevel", e.target.value as Application["educationLevel"])}>
                    {(["Secondary", "Diploma", "Undergraduate", "Graduate", "Postgraduate", "Other"] as const).map((o) => <option key={o}>{o}</option>)}
                  </select>
                </Field>
                <Field label="School / University" error={errors.school}><input className="input" value={form.school} onChange={(e) => set("school", e.target.value)} maxLength={120} /></Field>
                <Field label="Employment status">
                  <select className="input" value={form.employmentStatus} onChange={(e) => set("employmentStatus", e.target.value as Application["employmentStatus"])}>
                    {(["Student", "Employed", "Self-employed", "Unemployed", "Other"] as const).map((o) => <option key={o}>{o}</option>)}
                  </select>
                </Field>
                <Field label="Current skill level">
                  <select className="input" value={form.skillLevel} onChange={(e) => set("skillLevel", e.target.value as Application["skillLevel"])}>
                    {(["None", "Beginner", "Intermediate", "Advanced"] as const).map((o) => <option key={o}>{o}</option>)}
                  </select>
                </Field>
              </Grid>
              <Nav onBack={() => setStep(0)} onNext={() => validate(1) && setStep(2)} />
            </Card>
          )}

          {step === 2 && (
            <Card title="Course & cohort" desc="Choose your intake and schedule.">
              <p className="font-semibold mb-3">Intake date</p>
              <div className="grid sm:grid-cols-2 gap-3">
                {INTAKES.map((i) => {
                  const active = form.intakeId === i.id;
                  const full = i.seatsLeft === 0;
                  return (
                    <button key={i.id} disabled={full} onClick={() => set("intakeId", i.id)}
                      className={`text-left rounded-2xl border p-5 transition ${active ? "border-ink bg-muted/40 ring-2 ring-ink" : "border-border hover:border-ink/40"} ${full ? "opacity-50 cursor-not-allowed" : ""}`}>
                      <div className="flex items-center gap-2 text-primary text-sm font-medium"><Calendar className="size-4" /> Cohort</div>
                      <p className="mt-2 font-display text-xl font-bold">{i.label}</p>
                      <p className="mt-1 text-sm text-ink-muted flex items-center gap-1"><Users className="size-3.5" /> {full ? "Waitlist only" : `${i.seatsLeft} seats left`}</p>
                    </button>
                  );
                })}
              </div>
              <p className="font-semibold mt-8 mb-3">Schedule</p>
              <div className="grid sm:grid-cols-2 gap-3">
                {course.schedule.map((s) => (
                  <button key={s} onClick={() => set("schedule", s)}
                    className={`text-left rounded-2xl border p-5 transition ${form.schedule === s ? "border-ink bg-muted/40 ring-2 ring-ink" : "border-border hover:border-ink/40"}`}>
                    <p className="font-semibold">{s}</p>
                  </button>
                ))}
              </div>
              <p className="font-semibold mt-8 mb-3">Preferred class time</p>
              <div className="grid sm:grid-cols-3 gap-3">
                {CLASS_TIMES.map((t) => (
                  <button key={t} onClick={() => set("classTime", t)}
                    className={`text-left rounded-2xl border p-4 transition text-sm ${form.classTime === t ? "border-ink bg-muted/40 ring-2 ring-ink" : "border-border hover:border-ink/40"}`}>
                    {t}
                  </button>
                ))}
              </div>
              <Nav onBack={() => setStep(1)} onNext={() => setStep(3)} />
            </Card>
          )}

          {step === 3 && (
            <Card title="Your goals" desc="So we can support your journey.">
              <Field label="Why do you want to join OxVerse?" full>
                <textarea className="input resize-none" rows={3} value={form.motivation} onChange={(e) => set("motivation", e.target.value)} maxLength={1000} />
              </Field>
              <Field label="Career goals" full>
                <textarea className="input resize-none" rows={3} value={form.careerGoals} onChange={(e) => set("careerGoals", e.target.value)} maxLength={500} />
              </Field>
              <Field label="What do you expect from this program?" full>
                <textarea className="input resize-none" rows={3} value={form.expectations} onChange={(e) => set("expectations", e.target.value)} maxLength={500} />
              </Field>
              <Nav onBack={() => setStep(2)} onNext={() => setStep(4)} />
            </Card>
          )}

          {step === 4 && (
            <Card title="Documents (optional)" desc="You can also bring these on orientation day.">
              <div className="grid sm:grid-cols-2 gap-4">
                <UploadField label="Passport photo" filename={form.passportPhotoName} onChange={(name) => set("passportPhotoName", name)} accept="image/*" />
                <UploadField label="Identification document" filename={form.idDocumentName} onChange={(name) => set("idDocumentName", name)} accept="image/*,application/pdf" />
              </div>
              <p className="mt-4 text-xs text-ink-muted">Files are referenced by name only at this stage. Originals can be presented on campus.</p>
              <Nav onBack={() => setStep(3)} onNext={() => setStep(5)} />
            </Card>
          )}

          {step === 5 && (
            <Card title="Review & submit" desc="Double-check everything before sending.">
              <div className="rounded-3xl border border-border divide-y">
                <Row k="Course" v={course.title} />
                <Row k="Intake" v={intake.label} />
                <Row k="Schedule" v={`${form.schedule} • ${form.classTime}`} />
                <Row k="Name" v={`${form.firstName} ${form.lastName}`} />
                <Row k="Email" v={form.email} />
                <Row k="Phone" v={form.phone} />
                <Row k="Gender" v={form.gender} />
                <Row k="Address" v={form.address} />
                <Row k="Education" v={`${form.educationLevel} — ${form.school}`} />
                <Row k="Employment" v={form.employmentStatus} />
                <Row k="Skill level" v={form.skillLevel} />
                {form.motivation && <Row k="Motivation" v={form.motivation} />}
                {form.careerGoals && <Row k="Career goals" v={form.careerGoals} />}
                {form.passportPhotoName && <Row k="Passport photo" v={form.passportPhotoName} />}
                {form.idDocumentName && <Row k="ID document" v={form.idDocumentName} />}
              </div>
              <div className="mt-8 flex justify-between">
                <button onClick={() => setStep(4)} className="rounded-full border border-border px-5 py-3 font-medium hover:bg-muted">Back</button>
                <button onClick={submit} className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-3 font-semibold hover:opacity-90 transition">
                  Submit application <Check className="size-4" />
                </button>
              </div>
            </Card>
          )}

          {step === 6 && (
            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}>
              <div className="rounded-3xl bg-gradient-to-br from-primary to-purple-900 text-primary-foreground p-10 shadow-2xl shadow-primary/30">
                <PartyPopper className="size-10" />
                <h2 className="mt-5 font-display text-4xl font-bold tracking-tight">Congratulations, {form.firstName}!</h2>
                <p className="mt-3 text-primary-foreground/85 text-pretty">
                  Your application for <strong>{course.title}</strong> has been received. Reference: <span className="font-mono font-semibold">{appId}</span>
                </p>
              </div>
              <div className="mt-8 grid sm:grid-cols-2 gap-4">
                <NextStep title="What happens next" body="Admissions emails you within 48 hours with a confirmation and payment plan options." />
                <NextStep title="Orientation" body={`On ${intake.label} at 9:00am — 15 Innovation Way, Lekki, Lagos.`} />
                <NextStep title="Join the community" body="Connect with your cohort on WhatsApp before classes start." cta={{ label: "Join WhatsApp group", href: "https://chat.whatsapp.com" }} />
                <NextStep title="Student dashboard" body="Track your application and complete onboarding tasks." cta={{ label: "Go to dashboard", to: "/dashboard", state: appId }} />
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <button onClick={() => navigate({ to: "/dashboard", search: { id: appId } as never })} className="inline-flex items-center gap-2 rounded-full bg-ink text-background px-6 py-3 font-semibold hover:bg-primary transition">
                  Open student dashboard <ArrowRight className="size-4" />
                </button>
                <Link to="/applications" className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 font-semibold hover:border-ink transition">
                  View all applications
                </Link>
              </div>
            </motion.div>
          )}
        </motion.div>

        <aside className="lg:sticky lg:top-24 self-start">
          <div className="rounded-3xl border border-border bg-background overflow-hidden shadow-xl shadow-primary/5">
            <div className="aspect-[16/11] relative">
              <img src={course.image} alt={course.title} className="absolute inset-0 size-full object-cover" />
            </div>
            <div className="p-6">
              <p className="text-xs uppercase tracking-wider text-primary font-medium">{course.category}</p>
              <p className="mt-1 font-display text-xl font-bold">{course.title}</p>
              <p className="mt-2 text-sm text-ink-muted">{course.short}</p>
              <div className="mt-5 pt-5 border-t border-border space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-ink-muted">Tuition</span><span className="font-semibold">{course.price}</span></div>
                <div className="flex justify-between"><span className="text-ink-muted">Duration</span><span className="font-medium">{course.duration}</span></div>
                <div className="flex justify-between"><span className="text-ink-muted">Intake</span><span className="font-medium">{intake.label}</span></div>
                <div className="flex justify-between"><span className="text-ink-muted">Format</span><span className="font-medium">In-person, Lagos</span></div>
              </div>
            </div>
          </div>
        </aside>
      </section>
    </SiteLayout>
  );
}

function Card({ title, desc, children }: { title: string; desc: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-display text-2xl font-bold tracking-tight">{title}</h2>
      <p className="mt-2 text-ink-muted">{desc}</p>
      <div className="mt-6">{children}</div>
    </div>
  );
}
function Grid({ children }: { children: React.ReactNode }) { return <div className="grid sm:grid-cols-2 gap-4">{children}</div>; }
function Field({ label, error, full, children }: { label: string; error?: string; full?: boolean; children: React.ReactNode }) {
  return (
    <label className={`block ${full ? "sm:col-span-2" : ""}`}>
      <span className="text-sm font-medium text-ink">{label}</span>
      <div className="mt-1.5">{children}</div>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </label>
  );
}
function Nav({ onBack, onNext }: { onBack?: () => void; onNext: () => void }) {
  return (
    <div className="mt-8 flex justify-between">
      {onBack ? <button onClick={onBack} className="rounded-full border border-border px-5 py-3 font-medium hover:bg-muted">Back</button> : <span />}
      <button onClick={onNext} className="inline-flex items-center gap-2 rounded-full bg-ink text-background px-6 py-3 font-semibold hover:bg-primary transition">
        Continue <ArrowRight className="size-4" />
      </button>
    </div>
  );
}
function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-6 px-6 py-4">
      <span className="text-sm text-ink-muted">{k}</span>
      <span className="text-sm font-medium text-right max-w-[60%]">{v}</span>
    </div>
  );
}
function UploadField({ label, filename, onChange, accept }: { label: string; filename?: string; onChange: (name: string) => void; accept: string }) {
  return (
    <label className="block rounded-2xl border border-dashed border-border p-5 cursor-pointer hover:border-primary transition">
      <div className="flex items-center gap-3">
        <Upload className="size-5 text-primary" />
        <div>
          <p className="text-sm font-semibold">{label}</p>
          <p className="text-xs text-ink-muted">{filename || "Click to select a file"}</p>
        </div>
      </div>
      <input type="file" accept={accept} className="hidden" onChange={(e) => onChange(e.target.files?.[0]?.name || "")} />
    </label>
  );
}
function NextStep({ title, body, cta }: { title: string; body: string; cta?: { label: string; href?: string; to?: "/dashboard"; state?: string } }) {
  return (
    <div className="rounded-2xl border border-border p-5 bg-background">
      <p className="font-display text-lg font-semibold">{title}</p>
      <p className="mt-1 text-sm text-ink-muted text-pretty">{body}</p>
      {cta?.href && <a href={cta.href} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary">{cta.label} <ArrowRight className="size-4" /></a>}
      {cta?.to && <Link to={cta.to} search={{ id: cta.state } as never} className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary">{cta.label} <ArrowRight className="size-4" /></Link>}
    </div>
  );
}
