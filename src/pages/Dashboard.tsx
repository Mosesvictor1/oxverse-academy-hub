import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, CheckCircle2, Circle, Clock, Download, MessageCircle, Users } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { SEO } from "@/components/site/SEO";
import { getApplications, updateApplication, STATUS_META, type Application } from "@/lib/enrollment";

export default function DashboardPage() {
  const [params] = useSearchParams();
  const id = params.get("id") ?? undefined;
  const [apps, setApps] = useState<Application[]>([]);
  useEffect(() => { setApps(getApplications()); }, []);

  const active = (id && apps.find((a) => a.id === id)) || apps[0];

  if (!active) {
    return (
      <SiteLayout>
        <SEO title="Student Dashboard — OxVerse Academy" />
        <section className="mx-auto max-w-2xl px-6 py-32 text-center">
          <h1 className="font-display text-4xl font-bold">No applications yet</h1>
          <p className="mt-3 text-ink-muted">Once you apply for a course, your dashboard appears here.</p>
          <Link to="/courses" className="mt-6 inline-flex rounded-full bg-ink text-background px-6 py-3 font-semibold hover:bg-primary transition">Explore courses</Link>
        </section>
      </SiteLayout>
    );
  }

  const meta = STATUS_META[active.status];
  const tasks: { key: keyof Application["onboarding"]; label: string; desc: string }[] = [
    { key: "welcomeRead", label: "Read welcome guide", desc: "5-minute orientation overview." },
    { key: "paymentPlanChosen", label: "Choose payment plan", desc: "Select pay-in-full or installments." },
    { key: "communityJoined", label: "Join WhatsApp community", desc: "Meet your cohort." },
    { key: "orientationConfirmed", label: "Confirm orientation attendance", desc: "RSVP for opening day." },
  ];
  const completed = tasks.filter((t) => active.onboarding[t.key]).length;
  const progress = Math.round((completed / tasks.length) * 100);

  function toggle(key: keyof Application["onboarding"]) {
    const next = { ...active!.onboarding, [key]: !active!.onboarding[key] };
    updateApplication(active!.id, { onboarding: next });
    setApps(getApplications());
  }

  function downloadAdmissionLetter() {
    const html = `<html><head><title>Admission Letter — OxVerse</title>
      <style>body{font-family:Georgia,serif;max-width:720px;margin:60px auto;padding:40px;line-height:1.6;color:#1a1a2e}
      h1{font-size:28px;color:#5B21B6}.brand{font-weight:bold;color:#5B21B6;font-size:20px}.box{border:2px solid #5B21B6;padding:24px;margin:24px 0;border-radius:12px}</style>
      </head><body>
      <p class="brand">◆ OxVerse Academy</p>
      <h1>Provisional Admission Letter</h1>
      <p>Dear ${active!.firstName} ${active!.lastName},</p>
      <p>Congratulations! We are pleased to offer you provisional admission to the <strong>${active!.courseTitle}</strong> program at OxVerse Academy.</p>
      <div class="box">
        <p><strong>Reference:</strong> ${active!.id}</p>
        <p><strong>Cohort start:</strong> ${active!.intakeLabel}</p>
        <p><strong>Schedule:</strong> ${active!.schedule} — ${active!.classTime}</p>
        <p><strong>Campus:</strong> No 82, Century Bus Stop, Ago Palace Way, Okota, Lagos</p>
      </div>
      <p>Please complete the onboarding tasks in your student dashboard to confirm your seat.</p>
      <p>Welcome to OxVerse. Build something great.</p>
      <p style="margin-top:48px">— The Admissions Team</p>
      </body></html>`;
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `OxVerse-Admission-${active!.id}.html`; a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <SiteLayout>
      <SEO title="Student Dashboard — OxVerse Academy" description="Track your application, complete onboarding, and prepare for class." />
      <section className="relative">
        <div className="absolute inset-0 grid-pattern opacity-40 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        <div className="relative mx-auto max-w-7xl px-6 pt-24 pb-8">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">Student dashboard</p>
          <h1 className="mt-3 font-display text-4xl md:text-5xl font-bold tracking-tighter">Welcome, {active.firstName}.</h1>
          <p className="mt-2 text-ink-muted">Here's your journey to {active.courseTitle}.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24 grid lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-2 space-y-6">
          <div className="rounded-3xl border border-border bg-background p-7">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs font-mono text-ink-muted">{active.id}</p>
                <p className="mt-1 font-display text-2xl font-bold">{active.courseTitle}</p>
                <div className="mt-3 flex flex-wrap gap-4 text-sm text-ink-muted">
                  <span className="inline-flex items-center gap-1.5"><Calendar className="size-4" />{active.intakeLabel}</span>
                  <span className="inline-flex items-center gap-1.5"><Clock className="size-4" />{active.classTime}</span>
                </div>
              </div>
              <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${meta.tone}`}>{meta.label}</span>
            </div>
            <p className="mt-4 text-sm text-ink-muted">{meta.desc}</p>
          </div>

          <div className="rounded-3xl border border-border bg-background p-7">
            <div className="flex items-end justify-between gap-3">
              <div>
                <p className="font-display text-xl font-bold">Onboarding</p>
                <p className="text-sm text-ink-muted">{completed} of {tasks.length} complete</p>
              </div>
              <p className="font-display text-3xl font-bold tracking-tighter">{progress}%</p>
            </div>
            <div className="mt-3 h-2 rounded-full bg-muted overflow-hidden">
              <div className="h-full bg-primary transition-all" style={{ width: `${progress}%` }} />
            </div>
            <ul className="mt-6 space-y-2">
              {tasks.map((t) => {
                const done = active.onboarding[t.key];
                return (
                  <li key={t.key}>
                    <button onClick={() => toggle(t.key)} className={`w-full text-left flex items-start gap-3 rounded-2xl border p-4 transition ${done ? "border-primary/40 bg-purple-50" : "border-border hover:border-ink/40"}`}>
                      {done ? <CheckCircle2 className="size-5 text-primary shrink-0 mt-0.5" /> : <Circle className="size-5 text-ink-muted shrink-0 mt-0.5" />}
                      <div>
                        <p className={`font-semibold text-sm ${done ? "line-through text-ink-muted" : ""}`}>{t.label}</p>
                        <p className="text-xs text-ink-muted">{t.desc}</p>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </motion.div>

        <aside className="space-y-6">
          <div className="rounded-3xl bg-ink text-background p-7">
            <p className="font-display text-lg font-bold">Class resumption</p>
            <p className="mt-2 font-display text-3xl font-bold tracking-tighter">{active.intakeLabel}</p>
            <p className="mt-1 text-sm text-background/70">No 82, Century Bus Stop, Ago Palace Way, Okota, Lagos</p>
          </div>
          <button onClick={downloadAdmissionLetter} className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 font-semibold hover:opacity-90 transition">
            <Download className="size-4" /> Download admission letter
          </button>
          <a href="https://chat.whatsapp.com" target="_blank" rel="noreferrer" className="w-full inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background px-6 py-3 font-semibold hover:border-ink transition">
            <MessageCircle className="size-4" /> Join WhatsApp community
          </a>
          <Link to="/applications" className="w-full inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background px-6 py-3 font-semibold hover:border-ink transition">
            <Users className="size-4" /> All applications
          </Link>
        </aside>
      </section>
    </SiteLayout>
  );
}
