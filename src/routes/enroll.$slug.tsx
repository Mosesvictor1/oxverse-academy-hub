import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Check, Calendar, Users, Clock } from "lucide-react";
import { useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { getCourse, type Course } from "@/lib/courses";
import { INTAKES, saveApplication, type Application } from "@/lib/enrollment";

export const Route = createFileRoute("/enroll/$slug")({
  loader: ({ params }) => {
    const course = getCourse(params.slug);
    if (!course) throw notFound();
    return { course };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `Enroll — ${loaderData.course.title} | OxVerse Academy` },
          { name: "description", content: `Apply for ${loaderData.course.title} at OxVerse Academy. Choose your intake date and reserve your seat.` },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <SiteLayout>
      <div className="mx-auto max-w-2xl px-6 py-32 text-center">
        <h1 className="font-display text-4xl font-bold">Course not found</h1>
        <Link to="/courses" className="mt-6 inline-block text-primary font-semibold">View all courses</Link>
      </div>
    </SiteLayout>
  ),
  errorComponent: ({ error, reset }) => (
    <SiteLayout>
      <div className="mx-auto max-w-2xl px-6 py-32 text-center">
        <h1 className="font-display text-3xl font-bold">Something went wrong</h1>
        <p className="mt-3 text-ink-muted">{error.message}</p>
        <button onClick={reset} className="mt-6 rounded-full bg-ink text-background px-6 py-3 font-semibold">Retry</button>
      </div>
    </SiteLayout>
  ),
  component: EnrollPage,
});

function EnrollPage() {
  const { course } = Route.useLoaderData() as { course: Course };
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [intakeId, setIntakeId] = useState<string>(INTAKES[0].id);
  const [schedule, setSchedule] = useState<string>(course.schedule[0]);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "Lagos",
    experience: "None" as Application["experience"],
    motivation: "",
    hearAbout: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const intake = INTAKES.find((i) => i.id === intakeId)!;

  function validateStep2() {
    const e: Record<string, string> = {};
    if (!form.fullName.trim() || form.fullName.length > 100) e.fullName = "Enter your full name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) || form.email.length > 255) e.email = "Enter a valid email";
    if (!/^[+0-9\s()-]{7,20}$/.test(form.phone)) e.phone = "Enter a valid phone";
    if (!form.city.trim()) e.city = "Required";
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
      schedule,
      ...form,
      motivation: form.motivation.slice(0, 1000),
      hearAbout: form.hearAbout.slice(0, 100),
      status: "submitted",
      submittedAt: new Date().toISOString(),
    };
    saveApplication(app);
    navigate({ to: "/applications", search: { id } as never });
  }

  return (
    <SiteLayout>
      <section className="relative">
        <div className="absolute inset-0 grid-pattern opacity-40 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        <div className="relative mx-auto max-w-7xl px-6 pt-24 pb-10">
          <Link to="/courses/$slug" params={{ slug: course.slug }} className="text-sm text-ink-muted hover:text-ink">
            ← Back to {course.title}
          </Link>
          <h1 className="mt-4 font-display text-4xl md:text-6xl font-bold tracking-tighter">Reserve your seat</h1>
          <p className="mt-3 text-ink-muted text-lg">Apply for {course.title} — physical classes at our Lagos campus.</p>

          <div className="mt-10 flex items-center gap-2 text-sm">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <span className={`size-7 rounded-full inline-flex items-center justify-center text-xs font-semibold ${step >= s ? "bg-ink text-background" : "bg-muted text-ink-muted"}`}>
                  {step > s ? <Check className="size-4" /> : s}
                </span>
                <span className={step >= s ? "text-ink font-medium" : "text-ink-muted"}>
                  {s === 1 ? "Intake" : s === 2 ? "Your details" : "Review"}
                </span>
                {s < 3 && <span className="w-8 h-px bg-border mx-1" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24 grid lg:grid-cols-3 gap-10">
        <motion.div key={step} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-2">
          {step === 1 && (
            <div>
              <h2 className="font-display text-2xl font-bold tracking-tight">Choose your intake</h2>
              <p className="mt-2 text-ink-muted">Pick the cohort start date that works for you. Seats are limited to 25 per cohort.</p>
              <div className="mt-6 grid sm:grid-cols-2 gap-3">
                {INTAKES.map((i) => {
                  const active = intakeId === i.id;
                  const full = i.seatsLeft === 0;
                  return (
                    <button
                      key={i.id}
                      disabled={full}
                      onClick={() => setIntakeId(i.id)}
                      className={`text-left rounded-2xl border p-5 transition ${active ? "border-ink bg-muted/40 ring-2 ring-ink" : "border-border hover:border-ink/40"} ${full ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      <div className="flex items-center gap-2 text-primary text-sm font-medium">
                        <Calendar className="size-4" /> Cohort
                      </div>
                      <p className="mt-2 font-display text-xl font-bold">{i.label}</p>
                      <p className="mt-1 text-sm text-ink-muted flex items-center gap-1">
                        <Users className="size-3.5" /> {full ? "Waitlist only" : `${i.seatsLeft} seats left`}
                      </p>
                    </button>
                  );
                })}
              </div>

              <h3 className="mt-10 font-display text-xl font-bold">Class schedule</h3>
              <div className="mt-3 grid sm:grid-cols-2 gap-3">
                {course.schedule.map((s) => {
                  const active = schedule === s;
                  return (
                    <button key={s} onClick={() => setSchedule(s)}
                      className={`text-left rounded-2xl border p-5 transition ${active ? "border-ink bg-muted/40 ring-2 ring-ink" : "border-border hover:border-ink/40"}`}>
                      <div className="flex items-center gap-2 text-primary text-sm font-medium"><Clock className="size-4" />Schedule</div>
                      <p className="mt-2 font-semibold">{s}</p>
                    </button>
                  );
                })}
              </div>

              <div className="mt-10 flex justify-end">
                <button onClick={() => setStep(2)} className="inline-flex items-center gap-2 rounded-full bg-ink text-background px-6 py-3 font-semibold hover:bg-primary transition">
                  Continue <ArrowRight className="size-4" />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="font-display text-2xl font-bold tracking-tight">Your details</h2>
              <p className="mt-2 text-ink-muted">We'll use this to reach you about admission.</p>
              <div className="mt-6 grid sm:grid-cols-2 gap-4">
                <Field label="Full name" error={errors.fullName}>
                  <input maxLength={100} value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} className="input" />
                </Field>
                <Field label="Email" error={errors.email}>
                  <input type="email" maxLength={255} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input" />
                </Field>
                <Field label="Phone" error={errors.phone}>
                  <input maxLength={20} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="input" placeholder="+234 …" />
                </Field>
                <Field label="City" error={errors.city}>
                  <input maxLength={60} value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="input" />
                </Field>
                <Field label="Experience level">
                  <select value={form.experience} onChange={(e) => setForm({ ...form, experience: e.target.value as Application["experience"] })} className="input">
                    {(["None", "Beginner", "Intermediate", "Advanced"] as const).map((o) => <option key={o}>{o}</option>)}
                  </select>
                </Field>
                <Field label="How did you hear about us?">
                  <input maxLength={100} value={form.hearAbout} onChange={(e) => setForm({ ...form, hearAbout: e.target.value })} className="input" placeholder="Instagram, friend, Google…" />
                </Field>
                <div className="sm:col-span-2">
                  <Field label="Why this course?">
                    <textarea maxLength={1000} rows={4} value={form.motivation} onChange={(e) => setForm({ ...form, motivation: e.target.value })} className="input resize-none" placeholder="Tell us your goals (optional)" />
                  </Field>
                </div>
              </div>
              <div className="mt-8 flex justify-between">
                <button onClick={() => setStep(1)} className="rounded-full border border-border px-5 py-3 font-medium hover:bg-muted">Back</button>
                <button onClick={() => { if (validateStep2()) setStep(3); }} className="inline-flex items-center gap-2 rounded-full bg-ink text-background px-6 py-3 font-semibold hover:bg-primary transition">
                  Review <ArrowRight className="size-4" />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="font-display text-2xl font-bold tracking-tight">Review & submit</h2>
              <p className="mt-2 text-ink-muted">Double-check before sending. No payment is required at this step.</p>
              <div className="mt-6 rounded-3xl border border-border divide-y">
                <Row k="Course" v={course.title} />
                <Row k="Intake" v={intake.label} />
                <Row k="Schedule" v={schedule} />
                <Row k="Name" v={form.fullName} />
                <Row k="Email" v={form.email} />
                <Row k="Phone" v={form.phone} />
                <Row k="City" v={form.city} />
                <Row k="Experience" v={form.experience} />
                {form.motivation && <Row k="Motivation" v={form.motivation} />}
              </div>
              <div className="mt-8 flex justify-between">
                <button onClick={() => setStep(2)} className="rounded-full border border-border px-5 py-3 font-medium hover:bg-muted">Back</button>
                <button onClick={submit} className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-3 font-semibold hover:opacity-90 transition">
                  Submit application <Check className="size-4" />
                </button>
              </div>
            </div>
          )}
        </motion.div>

        <aside className="lg:sticky lg:top-24 self-start">
          <div className="rounded-3xl border border-border bg-background p-6 shadow-xl shadow-primary/5">
            <div className="size-12 rounded-xl bg-purple-50 inline-flex items-center justify-center text-2xl">{course.emoji}</div>
            <p className="mt-4 text-xs uppercase tracking-wider text-primary font-medium">{course.category}</p>
            <p className="mt-1 font-display text-xl font-bold">{course.title}</p>
            <p className="mt-2 text-sm text-ink-muted">{course.short}</p>
            <div className="mt-5 pt-5 border-t border-border space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-ink-muted">Tuition</span><span className="font-semibold">{course.price}</span></div>
              <div className="flex justify-between"><span className="text-ink-muted">Duration</span><span className="font-medium">{course.duration}</span></div>
              <div className="flex justify-between"><span className="text-ink-muted">Intake</span><span className="font-medium">{intake.label}</span></div>
              <div className="flex justify-between"><span className="text-ink-muted">Format</span><span className="font-medium">In-person, Lagos</span></div>
            </div>
            <p className="mt-5 text-xs text-ink-muted">Payment info will be shared after admission. Installment plans available.</p>
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
      <div className="mt-1.5">{children}</div>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </label>
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