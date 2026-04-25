import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock, Award, GraduationCap, Check } from "lucide-react";
import { SiteLayout, SectionEyebrow } from "@/components/site/SiteLayout";
import { getCourse } from "@/lib/courses";
import { useState } from "react";

export const Route = createFileRoute("/courses/$slug")({
  loader: ({ params }) => {
    const course = getCourse(params.slug);
    if (!course) throw notFound();
    return { course };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.course.title} — OxVerse Academy` },
          { name: "description", content: loaderData.course.short },
          { property: "og:title", content: `${loaderData.course.title} — OxVerse Academy` },
          { property: "og:description", content: loaderData.course.short },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <SiteLayout>
      <div className="mx-auto max-w-2xl px-6 py-32 text-center">
        <h1 className="font-display text-4xl font-bold">Course not found</h1>
        <Link to="/courses" className="mt-6 inline-flex items-center gap-2 text-primary font-semibold">View all courses</Link>
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
  component: CourseDetail,
});

const tabs = ["Overview", "Curriculum", "Projects", "Requirements", "Schedule", "Career Path", "FAQs"] as const;

function CourseDetail() {
  const { course } = Route.useLoaderData();
  const [tab, setTab] = useState<(typeof tabs)[number]>("Overview");

  return (
    <SiteLayout>
      <section className="relative">
        <div className="absolute inset-0 grid-pattern opacity-50 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        <div className="absolute inset-0 radial-purple" />
        <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-16 lg:pt-28">
          <Link to="/courses" className="text-sm text-ink-muted hover:text-ink">← All courses</Link>
          <div className="mt-6 grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-8">
              <div className="size-16 rounded-2xl bg-purple-50 inline-flex items-center justify-center text-4xl">{course.emoji}</div>
              <p className="mt-6 text-sm font-medium uppercase tracking-wider text-primary">{course.category}</p>
              <motion.h1
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="mt-3 font-display text-5xl md:text-7xl font-bold tracking-tighter text-balance"
              >
                {course.title}
              </motion.h1>
              <p className="mt-6 text-lg text-ink-muted max-w-2xl text-pretty">{course.description}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                {[
                  { i: Clock, l: course.duration },
                  { i: Calendar, l: course.schedule[0] },
                  { i: GraduationCap, l: course.level },
                  { i: Award, l: "Certificate" },
                ].map((b, i) => (
                  <div key={i} className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium">
                    <b.i className="size-4 text-primary" /> {b.l}
                  </div>
                ))}
              </div>
            </div>

            <aside className="lg:col-span-4 lg:sticky lg:top-24">
              <div className="rounded-3xl border border-border bg-background p-8 shadow-xl shadow-primary/5">
                <p className="text-sm text-ink-muted">Tuition</p>
                <p className="mt-1 font-display text-4xl font-bold tracking-tighter">{course.price}</p>
                <p className="mt-1 text-xs text-ink-muted">Installment plans available</p>
                <Link to="/contact" className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink text-background px-6 py-4 font-semibold hover:bg-primary transition">
                  Enroll Now <ArrowRight className="size-4" />
                </Link>
                <div className="mt-6 pt-6 border-t border-border space-y-3 text-sm">
                  <div className="flex justify-between"><span className="text-ink-muted">Duration</span><span className="font-medium">{course.duration}</span></div>
                  <div className="flex justify-between"><span className="text-ink-muted">Level</span><span className="font-medium">{course.level}</span></div>
                  <div className="flex justify-between"><span className="text-ink-muted">Class size</span><span className="font-medium">Max 25</span></div>
                  <div className="flex justify-between"><span className="text-ink-muted">Format</span><span className="font-medium">In-person, Lagos</span></div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="border-t border-border sticky top-16 z-30 bg-background/90 backdrop-blur">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex gap-1 overflow-x-auto py-3 -mx-2 px-2">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`shrink-0 rounded-full px-5 py-2 text-sm font-medium transition ${
                  tab === t ? "bg-ink text-background" : "text-ink-muted hover:text-ink"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
        <motion.div key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          {tab === "Overview" && (
            <div className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <h2 className="font-display text-3xl font-bold tracking-tight">What you'll learn</h2>
                <ul className="mt-6 space-y-3">
                  {course.outcomes.map((o, i) => (
                    <li key={i} className="flex gap-3">
                      <Check className="size-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-pretty">{o}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-3xl border border-border bg-muted/40 p-8">
                <h3 className="font-display text-xl font-bold">Your instructor</h3>
                <div className="mt-4 flex items-center gap-3">
                  <div className="size-14 rounded-full bg-gradient-to-br from-purple-200 to-purple-700" />
                  <div>
                    <p className="font-semibold">{course.instructor.name}</p>
                    <p className="text-sm text-ink-muted">{course.instructor.role}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-ink-muted">{course.instructor.bio}</p>
              </div>
            </div>
          )}
          {tab === "Curriculum" && (
            <div className="space-y-6 max-w-4xl">
              <h2 className="font-display text-3xl font-bold tracking-tight">Course roadmap</h2>
              {course.curriculum.map((m, i) => (
                <div key={i} className="rounded-2xl border border-border p-8">
                  <div className="flex items-baseline gap-4">
                    <span className="font-display text-3xl font-bold text-primary">{String(i+1).padStart(2,"0")}</span>
                    <h3 className="font-display text-xl font-semibold">{m.module}</h3>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {m.topics.map((t) => <span key={t} className="rounded-full bg-muted px-3 py-1 text-sm">{t}</span>)}
                  </div>
                </div>
              ))}
            </div>
          )}
          {tab === "Projects" && (
            <div className="grid sm:grid-cols-2 gap-6 max-w-5xl">
              <h2 className="sm:col-span-2 font-display text-3xl font-bold tracking-tight">Build real things.</h2>
              {course.projects.map((p, i) => (
                <div key={i} className="rounded-3xl bg-gradient-to-br from-purple-100 to-purple-200 p-8 aspect-video flex items-end">
                  <div>
                    <p className="text-xs font-medium text-purple-700">Project {i+1}</p>
                    <p className="font-display text-2xl font-bold mt-1">{p}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          {tab === "Requirements" && (
            <div className="max-w-3xl">
              <h2 className="font-display text-3xl font-bold tracking-tight">What you'll need</h2>
              <ul className="mt-6 space-y-3">
                {course.requirements.map((r, i) => (
                  <li key={i} className="flex gap-3"><Check className="size-5 text-primary shrink-0 mt-0.5" /> {r}</li>
                ))}
              </ul>
            </div>
          )}
          {tab === "Schedule" && (
            <div className="max-w-3xl">
              <h2 className="font-display text-3xl font-bold tracking-tight">Class schedule</h2>
              <div className="mt-6 space-y-3">
                {course.schedule.map((s, i) => (
                  <div key={i} className="rounded-2xl border border-border p-6 flex items-center justify-between">
                    <div className="flex items-center gap-3"><Calendar className="size-5 text-primary" /><span className="font-medium">{s}</span></div>
                    <span className="text-sm text-ink-muted">{i === 0 ? "Most popular" : "Working pros"}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {tab === "Career Path" && (
            <div className="max-w-3xl">
              <h2 className="font-display text-3xl font-bold tracking-tight">Roles you'll qualify for</h2>
              <div className="mt-6 grid sm:grid-cols-2 gap-3">
                {course.career.map((c) => (
                  <div key={c} className="rounded-xl border border-border px-5 py-4 font-medium">{c}</div>
                ))}
              </div>
            </div>
          )}
          {tab === "FAQs" && (
            <div className="max-w-3xl space-y-4">
              <h2 className="font-display text-3xl font-bold tracking-tight">Common questions</h2>
              {course.faqs.map((f, i) => (
                <div key={i} className="rounded-2xl border border-border p-6">
                  <p className="font-display font-semibold">{f.q}</p>
                  <p className="mt-2 text-ink-muted text-pretty">{f.a}</p>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </section>

      <section className="border-t border-border bg-ink text-background">
        <div className="mx-auto max-w-5xl px-6 py-20 text-center">
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tighter">Ready to start?</h2>
          <p className="mt-4 text-background/70 max-w-xl mx-auto">Reserve your seat in the next cohort. Limited to 25 students.</p>
          <Link to="/contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-background text-foreground px-7 py-4 font-semibold hover:bg-primary hover:text-primary-foreground transition">
            Enroll Now <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}