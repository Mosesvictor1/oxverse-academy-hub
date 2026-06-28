import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { z } from "zod";
import {
  ArrowRight,
  Sparkles,
  Rocket,
  ShieldCheck,
  Trophy,
  Laptop,
  Users,
  GraduationCap,
  Code2,
  Palette,
  Brush,
  Globe,
  Bot,
  Calendar,
  Clock,
  CheckCircle2,
  MessageCircle,
  X,
} from "lucide-react";
import { SiteLayout, SectionEyebrow } from "@/components/site/SiteLayout";
import { SEO } from "@/components/site/SEO";
import { submitToSheet } from "@/lib/formOptions";
import { whatsappLink, SITE } from "@/lib/site";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const TRACKS = [
  { icon: Code2, name: "Coding", desc: "HTML, CSS, JavaScript & responsive design.", level: "Beginner" },
  { icon: Palette, name: "UI/UX Design", desc: "Design thinking, wireframes, Figma.", level: "Beginner" },
  { icon: Brush, name: "Graphic Design", desc: "Flyers, branding & social media design.", level: "Beginner" },
  { icon: Globe, name: "Web Design", desc: "Build clean, modern, responsive websites.", level: "Beginner" },
  { icon: Bot, name: "AI Productivity Tools", desc: "Modern AI tools for learning & productivity.", level: "All levels" },
];

const schema = z.object({
  parentName: z.string().trim().min(2, "Enter parent's full name").max(120),
  parentPhone: z.string().trim().min(7, "Enter a valid phone number").max(20),
  parentEmail: z.string().trim().email("Enter a valid email").max(255),
  parentAddress: z.string().trim().min(3, "Enter your address").max(200),
  childName: z.string().trim().min(2, "Enter child's full name").max(120),
  childAge: z.coerce.number().min(8, "Min age 8").max(20, "Max age 20"),
  schoolName: z.string().trim().min(2, "Enter school name").max(150),
  classLevel: z.string().trim().min(1, "Select class level").max(50),
  track: z.string().min(1, "Pick a preferred track"),
  batch: z.string().min(1, "Pick a preferred batch"),
  hasLaptop: z.enum(["Yes", "No"]),
  notes: z.string().trim().max(500).optional().default(""),
  consent: z.literal(true, { errorMap: () => ({ message: "Please confirm consent." }) }),
});

export default function SummerBootcampPage() {
  return (
    <SiteLayout>
      <SEO
        title="Summer Tech Bootcamp 2026 — OxVerse Academy"
        description="A premium 4–6 week physical tech bootcamp for ages 11–18 in Lagos. Coding, design, AI & data — with laptops, expert tutors and a certificate."
        keywords="summer coding camp Lagos, tech bootcamp for kids Nigeria, holiday tech class, kids coding Lagos, teen tech camp"
        canonical="https://oxverse.academy/summer-tech-bootcamp"
      />
      <Hero />
      <WhyParents />
      <Tracks />
      <Details />
      <LaptopSection />
      <FAQSection />
      <RegistrationForm />
      <StickyWhatsApp />
    </SiteLayout>
  );
}

function Hero() {
  const selling = [
    { icon: Users, t: "Physical Training" },
    { icon: Rocket, t: "Practical Sessions" },
    { icon: GraduationCap, t: "Expert Tutors" },
    { icon: Trophy, t: "Certificate Included" },
    { icon: Laptop, t: "Laptop Access" },
  ];
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-50 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <div className="absolute inset-0 radial-purple" />
      <div className="relative mx-auto max-w-7xl px-6 pt-24 pb-20 lg:pt-32 grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <SectionEyebrow>
              <Sparkles className="size-3 text-primary" /> Summer 2026 Registration Open
            </SectionEyebrow>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-6 font-display font-bold tracking-tighter text-balance text-[clamp(2.5rem,6.5vw,5rem)] leading-[0.95]"
          >
            Summer Tech <br />
            <span className="gradient-text">Bootcamp 2026.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-6 max-w-xl text-lg text-ink-muted text-pretty"
          >
            Equip your child with future-ready digital skills in coding, design, AI, and data
            analytics this holiday — in a structured, hands-on physical classroom in Lagos.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3"
          >
            {selling.map((s) => (
              <div
                key={s.t}
                className="rounded-2xl border border-border bg-background/70 backdrop-blur p-3 text-center hover:border-primary transition"
              >
                <s.icon className="size-5 mx-auto text-primary" />
                <p className="mt-2 text-xs font-semibold leading-tight">{s.t}</p>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <a
              href="#register"
              className="group inline-flex items-center gap-2 rounded-full bg-ink text-background px-7 py-4 text-base font-semibold hover:bg-primary transition-colors"
            >
              Register Now
              <ArrowRight className="size-4 group-hover:translate-x-0.5 transition" />
            </a>
            <a
              href={whatsappLink("Hi OxVerse, I'd like to speak with admissions about the Summer Tech Bootcamp 2026.")}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 backdrop-blur px-7 py-4 text-base font-semibold hover:border-ink transition-colors"
            >
              Speak With Admissions
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="lg:col-span-5 relative"
        >
          <div className="relative rounded-3xl overflow-hidden border border-border shadow-2xl shadow-primary/20 aspect-[4/5] bg-gradient-to-br from-primary via-purple-700 to-purple-950">
            <div className="absolute inset-0 grid-pattern opacity-30" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-primary-foreground p-8 text-center">
              <Rocket className="size-12 mb-4 animate-pulse" />
              <p className="font-display text-4xl font-bold tracking-tight">4–6 Weeks</p>
              <p className="mt-2 text-primary-foreground/80">of hands-on, project-based learning</p>
              <div className="mt-8 grid grid-cols-2 gap-3 w-full">
                <div className="rounded-2xl bg-white/10 border border-white/20 p-3">
                  <p className="text-xs uppercase text-primary-foreground/70 tracking-wider">Ages</p>
                  <p className="font-display text-2xl font-bold">11–18</p>
                </div>
                <div className="rounded-2xl bg-white/10 border border-white/20 p-3">
                  <p className="text-xs uppercase text-primary-foreground/70 tracking-wider">Mode</p>
                  <p className="font-display text-2xl font-bold">Physical</p>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-5 -left-4 glass rounded-2xl p-3 shadow-xl flex items-center gap-2 text-sm">
            <ShieldCheck className="size-4 text-primary" />
            <span className="font-semibold">Safe & supervised</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function WhyParents() {
  const items = [
    { icon: ShieldCheck, t: "Prevent Holiday Waste", d: "Instead of spending the holiday on phones and games, channel that screen time into real skills." },
    { icon: Trophy, t: "Future Advantage", d: "Give children an early career advantage in technology — before secondary school is even over." },
    { icon: Rocket, t: "Practical Learning", d: "Students don't just learn theory — they build real projects they're proud to show." },
    { icon: Users, t: "Safe Learning Environment", d: "A structured, supervised physical learning space with caring expert instructors." },
  ];
  return (
    <section className="border-y border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="max-w-3xl">
          <SectionEyebrow>Why parents enrol</SectionEyebrow>
          <h2 className="mt-6 font-display text-4xl md:text-5xl font-bold tracking-tighter text-balance">
            A holiday that <span className="gradient-text">actually pays off.</span>
          </h2>
        </div>
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-3xl overflow-hidden">
          {items.map((it, i) => (
            <motion.div
              key={it.t}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="bg-background p-7 group hover:bg-purple-50 transition-colors"
            >
              <div className="size-12 rounded-xl bg-primary/10 text-primary inline-flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <it.icon className="size-5" />
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold">{it.t}</h3>
              <p className="mt-2 text-ink-muted text-sm">{it.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Tracks() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
        <div>
          <SectionEyebrow>Program tracks</SectionEyebrow>
          <h2 className="mt-6 font-display text-4xl md:text-5xl font-bold tracking-tighter text-balance">
            Pick a path. <span className="gradient-text">Build something real.</span>
          </h2>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {TRACKS.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="group rounded-3xl border border-border bg-background p-6 hover:border-primary hover:shadow-xl hover:shadow-primary/10 transition-all"
          >
            <div className="flex items-start justify-between">
              <div className="size-12 rounded-xl bg-primary/10 text-primary inline-flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition">
                <t.icon className="size-5" />
              </div>
              <span className="rounded-full bg-muted px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-ink-muted">
                {t.level}
              </span>
            </div>
            <h3 className="mt-5 font-display text-xl font-semibold">{t.name}</h3>
            <p className="mt-2 text-sm text-ink-muted">{t.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Details() {
  const items = [
    { icon: Calendar, label: "Duration", value: "4 – 6 Weeks" },
    { icon: Users, label: "Mode", value: "Physical Class" },
    { icon: Clock, label: "Batch A", value: "Mon · Wed · Fri" },
    { icon: Clock, label: "Batch B", value: "Tue · Thu · Sat" },
    { icon: GraduationCap, label: "Class Type", value: "Beginner Friendly" },
    { icon: Trophy, label: "Certificate", value: "Yes — Awarded" },
  ];
  return (
    <section className="border-y border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="max-w-3xl">
          <SectionEyebrow>Program details</SectionEyebrow>
          <h2 className="mt-6 font-display text-4xl md:text-5xl font-bold tracking-tighter text-balance">
            Everything you need to know.
          </h2>
        </div>
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((d) => (
            <div key={d.label} className="rounded-2xl border border-border bg-background p-6 flex items-center gap-4">
              <div className="size-12 rounded-xl bg-primary/10 text-primary grid place-items-center">
                <d.icon className="size-5" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-ink-muted font-semibold">{d.label}</p>
                <p className="font-display text-lg font-semibold">{d.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function LaptopSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-purple-950 via-primary to-purple-700 text-primary-foreground">
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="relative mx-auto max-w-7xl px-6 py-24 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <SectionEyebrow>
            <span className="text-primary-foreground/80">Inclusive learning</span>
          </SectionEyebrow>
          <h2 className="mt-6 font-display text-4xl md:text-6xl font-bold tracking-tighter text-balance">
            No Laptop? <br />
            <span className="italic">No Problem.</span>
          </h2>
          <p className="mt-5 max-w-xl text-primary-foreground/85 text-lg text-pretty">
            Every student gets access to a laptop during practical sessions inside our fully
            equipped learning lab — high-spec workstations, fast internet, and a focused environment.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-3 max-w-md">
            {["High-spec laptops", "Fast internet", "Power backup", "Trained supervisors"].map((t) => (
              <div key={t} className="flex items-center gap-2 rounded-xl bg-white/10 border border-white/15 px-3 py-2 text-sm">
                <CheckCircle2 className="size-4 shrink-0" />
                <span className="font-medium">{t}</span>
              </div>
            ))}
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative aspect-[4/3] rounded-3xl border border-white/15 bg-white/5 backdrop-blur grid place-items-center"
        >
          <Laptop className="size-32 text-primary-foreground/90" />
          <div className="absolute -bottom-5 left-6 right-6 glass rounded-2xl p-4 flex items-center gap-3 text-ink">
            <ShieldCheck className="size-5 text-primary" />
            <p className="text-sm font-semibold">Provided during all practical classes.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FAQSection() {
  const items = [
    { q: "My child has no laptop — can they still join?", a: "Yes. We provide laptops in our learning lab for every practical session. Your child only needs to show up ready to learn." },
    { q: "My child has no experience — is that okay?", a: "Absolutely. The bootcamp is beginner friendly. We start from the very basics and build up to real projects." },
    { q: "Is a certificate included?", a: "Yes. Every student who completes the bootcamp receives an official OxVerse Academy certificate of completion." },
    { q: "Who can register?", a: "The bootcamp is designed for secondary school students aged 11–18. Older or younger learners can contact admissions for guidance." },
  ];
  return (
    <section className="mx-auto max-w-3xl px-6 py-24">
      <SectionEyebrow>FAQ</SectionEyebrow>
      <h2 className="mt-6 font-display text-4xl md:text-5xl font-bold tracking-tighter text-balance">
        Quick answers.
      </h2>
      <Accordion type="single" collapsible className="mt-10 rounded-3xl border border-border bg-background overflow-hidden">
        {items.map((it, i) => (
          <AccordionItem key={i} value={`item-${i}`} className="px-6 border-b last:border-b-0">
            <AccordionTrigger className="font-display text-lg font-semibold">{it.q}</AccordionTrigger>
            <AccordionContent className="text-ink-muted text-pretty">{it.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

function RegistrationForm() {
  const [form, setForm] = useState({
    parentName: "",
    parentPhone: "",
    parentEmail: "",
    parentAddress: "",
    childName: "",
    childAge: "" as string | number,
    schoolName: "",
    classLevel: "",
    track: "",
    batch: "",
    hasLaptop: "No" as "Yes" | "No",
    notes: "",
    consent: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<null | { childName: string; parentEmail: string }>(null);
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
    // log data payload
    const payload = {
        type: "Summer Bootcamp",
        parentName: parsed.data.parentName,
        parentPhone: parsed.data.parentPhone,
        parentEmail: parsed.data.parentEmail,
        parentAddress: parsed.data.parentAddress,
        childName: parsed.data.childName,
        childAge: String(parsed.data.childAge),
        schoolName: parsed.data.schoolName,
        classLevel: parsed.data.classLevel,
        track: parsed.data.track,
        batch: parsed.data.batch,
        hasLaptop: parsed.data.hasLaptop,
        notes: parsed.data.notes ?? "",
        registeredAt: new Date().toISOString(),
      }
      console.log("Submitting form data:", payload);
    setSubmitting(true);
    try {
      await submitToSheet({
        type: "Summer Bootcamp",
        parentName: parsed.data.parentName,
        parentPhone: parsed.data.parentPhone,
        parentEmail: parsed.data.parentEmail,
        parentAddress: parsed.data.parentAddress,
        childName: parsed.data.childName,
        childAge: String(parsed.data.childAge),
        schoolName: parsed.data.schoolName,
        classLevel: parsed.data.classLevel,
        track: parsed.data.track,
        batch: parsed.data.batch,
        hasLaptop: parsed.data.hasLaptop,
        notes: parsed.data.notes ?? "",
        registeredAt: new Date().toISOString(),
      });
      setSuccess({ childName: parsed.data.childName, parentEmail: parsed.data.parentEmail });
    } catch (err) {
      console.error(err);
      setRemoteError("Something went wrong. Please try again or message us on WhatsApp.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="register" className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-5xl px-6 py-24">
        <div className="max-w-2xl">
          <SectionEyebrow>Register</SectionEyebrow>
          <h2 className="mt-6 font-display text-4xl md:text-5xl font-bold tracking-tighter text-balance">
            Secure your child's slot.
          </h2>
          <p className="mt-4 text-ink-muted text-pretty">
            Limited seats per batch. Fill the form below and our admissions team will reach out
            within 24 hours.
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          noValidate
          className="mt-10 rounded-3xl border border-border bg-background p-6 sm:p-10 space-y-8"
        >
          <Fieldset title="Parent / Guardian Information">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Parent full name" error={errors.parentName}>
                <input className="input" value={form.parentName} onChange={(e) => update("parentName", e.target.value)} maxLength={120} required />
              </Field>
              <Field label="Phone number" error={errors.parentPhone}>
                <input className="input" value={form.parentPhone} onChange={(e) => update("parentPhone", e.target.value)} placeholder="+234 …" maxLength={20} required />
              </Field>
              <Field label="Email" error={errors.parentEmail}>
                <input className="input" type="email" value={form.parentEmail} onChange={(e) => update("parentEmail", e.target.value)} maxLength={255} required />
              </Field>
              <Field label="Address" error={errors.parentAddress}>
                <input className="input" value={form.parentAddress} onChange={(e) => update("parentAddress", e.target.value)} maxLength={200} required />
              </Field>
            </div>
          </Fieldset>

          <Fieldset title="Child Information">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Child full name" error={errors.childName}>
                <input className="input" value={form.childName} onChange={(e) => update("childName", e.target.value)} maxLength={120} required />
              </Field>
              <Field label="Age" error={errors.childAge}>
                <input className="input" type="number" min={8} max={20} value={form.childAge} onChange={(e) => update("childAge", e.target.value)} required />
              </Field>
              <Field label="School name" error={errors.schoolName}>
                <input className="input" value={form.schoolName} onChange={(e) => update("schoolName", e.target.value)} maxLength={150} required />
              </Field>
              <Field label="Class level" error={errors.classLevel}>
                <select className="input" value={form.classLevel} onChange={(e) => update("classLevel", e.target.value)} required>
                  <option value="">Select…</option>
                  {["Primary 5", "Primary 6", "JSS 1", "JSS 2", "JSS 3", "SSS 1", "SSS 2", "SSS 3", "Graduated"].map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </Field>
            </div>
          </Fieldset>

          <Fieldset title="Program Preferences">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Preferred track" error={errors.track}>
                <select className="input" value={form.track} onChange={(e) => update("track", e.target.value)} required>
                  <option value="">Select a track…</option>
                  {TRACKS.map((t) => <option key={t.name} value={t.name}>{t.name}</option>)}
                </select>
              </Field>
              <Field label="Preferred batch" error={errors.batch}>
                <select className="input" value={form.batch} onChange={(e) => update("batch", e.target.value)} required>
                  <option value="">Select a batch…</option>
                  <option value="Batch A — Mon/Wed/Fri">Batch A — Mon / Wed / Fri</option>
                  <option value="Batch B — Tue/Thu/Sat">Batch B — Tue / Thu / Sat</option>
                </select>
              </Field>
              <Field label="Does your child have a personal laptop?">
                <div className="flex gap-2">
                  {(["Yes", "No"] as const).map((opt) => (
                    <button
                      type="button"
                      key={opt}
                      onClick={() => update("hasLaptop", opt)}
                      className={`rounded-full px-5 py-2 text-sm font-medium border transition ${
                        form.hasLaptop === opt ? "bg-ink text-background border-ink" : "border-border text-ink-muted hover:border-ink hover:text-ink"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </Field>
            </div>
          </Fieldset>

          <Fieldset title="Additional">
            <Field label="Notes (optional)" error={errors.notes}>
              <textarea className="input resize-none" rows={4} value={form.notes} onChange={(e) => update("notes", e.target.value)} maxLength={500} />
            </Field>
            <label className="mt-4 flex items-start gap-3 text-sm cursor-pointer select-none">
              <input
                type="checkbox"
                checked={form.consent}
                onChange={(e) => update("consent", e.target.checked as never)}
                className="mt-1 size-4 accent-[hsl(var(--primary))]"
              />
              <span className="text-ink-muted">
                I confirm the information above is accurate and consent to OxVerse Academy
                contacting me about my child's registration.
              </span>
            </label>
            {errors.consent && <p className="text-xs text-red-600">{errors.consent}</p>}
          </Fieldset>

          {remoteError && <p className="text-sm text-red-600">{remoteError}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-ink text-background px-6 py-4 font-semibold hover:bg-primary transition disabled:opacity-60"
          >
            {submitting ? "Submitting…" : <>Submit Registration <ArrowRight className="size-4" /></>}
          </button>
        </form>

        {success && <SuccessModal childName={success.childName} parentEmail={success.parentEmail} onClose={() => setSuccess(null)} />}
      </div>
    </section>
  );
}

function SuccessModal({ childName, parentEmail, onClose }: { childName: string; parentEmail: string; onClose: () => void }) {
  const message = `Hi OxVerse, I just registered ${childName} for the Summer Tech Bootcamp 2026.`;
  return (
    <div className="fixed inset-0 z-[95] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-lg rounded-3xl bg-background border border-border shadow-2xl p-8">
        <button onClick={onClose} aria-label="Close" className="absolute top-3 right-3 size-9 grid place-items-center rounded-full border border-border hover:bg-muted">
          <X className="size-4" />
        </button>
        <div className="size-12 rounded-2xl bg-primary/10 text-primary grid place-items-center">
          <CheckCircle2 className="size-6" />
        </div>
        <h3 className="mt-5 font-display text-2xl font-bold tracking-tight">Registration received!</h3>
        <p className="mt-2 text-ink-muted text-pretty">
          Thank you. We've received <strong>{childName}</strong>'s registration and will email{" "}
          <strong>{parentEmail}</strong> with next steps shortly.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={whatsappLink(message)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-ink text-background px-5 py-3 text-sm font-semibold hover:bg-primary transition"
          >
            <MessageCircle className="size-4" /> Chat admissions on WhatsApp
          </a>
          <button onClick={onClose} className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-semibold hover:border-ink transition">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function StickyWhatsApp() {
  return (
    <a
      href={whatsappLink(`Hi OxVerse Admissions (${SITE.phoneDisplay}), I'd like info on the Summer Tech Bootcamp 2026.`)}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-[80] inline-flex items-center gap-2 rounded-full bg-[#25D366] text-white pl-3 pr-5 py-3 text-sm font-semibold shadow-2xl shadow-black/30 hover:scale-105 transition"
      aria-label="Chat with admissions on WhatsApp"
    >
      <span className="size-7 grid place-items-center rounded-full bg-white/15">
        <MessageCircle className="size-4" />
      </span>
      Chat Admissions
    </a>
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

function Fieldset({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wider font-semibold text-ink-muted">{title}</p>
      <div className="mt-4">{children}</div>
    </div>
  );
}