import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Calendar, Clock, Award, GraduationCap, Check, Wrench, Briefcase, Star } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { courses, getCourse, type Course } from "@/lib/courses";
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
          { property: "og:image", content: loaderData.course.image },
          { name: "twitter:image", content: loaderData.course.image },
          { name: "twitter:card", content: "summary_large_image" },
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

const tabs = ["Overview", "Curriculum", "Projects", "Requirements", "Schedule", "Tuition", "Career Path", "FAQs"] as const;

const sampleTestimonials = [
  { name: "Tobi Adelaja", role: "OxVerse Alum", quote: "The hands-on projects gave me a portfolio that landed me a job before I even graduated." },
  { name: "Amara Nwosu", role: "OxVerse Alum", quote: "Mentors who actually care, classmates who push you, and a campus built for deep work." },
  { name: "Kola Ibrahim", role: "OxVerse Alum", quote: "From beginner to confident professional in months. Best decision I've made for my career." },
];

function CourseDetail() {
  const { course } = Route.useLoaderData() as { course: Course };
  const [tab, setTab] = useState<(typeof tabs)[number]>("Overview");
  const related = courses.filter((c) => c.slug !== course.slug && c.category === course.category).slice(0, 3);
  const fallbackRelated = related.length === 0 ? courses.filter((c) => c.slug !== course.slug).slice(0, 3) : related;

  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-40 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-12 lg:pt-24">
          <Link to="/courses" className="text-sm text-ink-muted hover:text-ink">← All courses</Link>
          <div className="mt-6 grid lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1 rounded-full bg-purple-50 text-primary px-3 py-1 text-xs font-semibold uppercase tracking-wider">{course.category}</span>
                <span className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1 text-xs font-medium">{course.level}</span>
              </div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="mt-5 font-display text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-balance"
              >
                {course.title}
              </motion.h1>
              <p className="mt-5 text-lg text-ink-muted max-w-2xl text-pretty">{course.description}</p>
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
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/enroll/$slug" params={{ slug: course.slug }} className="inline-flex items-center gap-2 rounded-full bg-ink text-background px-7 py-4 font-semibold hover:bg-primary transition">
                  Enroll Now <ArrowRight className="size-4" />
                </Link>
                <Link to="/contact" className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-7 py-4 font-semibold hover:border-ink transition">
                  Talk to admissions
                </Link>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}
              className="lg:col-span-5"
            >
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl shadow-primary/20">
                <img src={course.image} alt={course.title} className="absolute inset-0 size-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 glass rounded-2xl p-4">
                  <p className="text-xs text-ink-muted">Tuition</p>
                  <p className="font-display text-3xl font-bold tracking-tighter">{course.price}</p>
                  <p className="text-xs text-ink-muted">Installment plans available</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* TABS */}
      <section className="border-y border-border sticky top-16 z-30 bg-background/90 backdrop-blur">
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
              <div className="lg:col-span-2 space-y-12">
                <div>
                  <h2 className="font-display text-3xl font-bold tracking-tight">What you'll learn</h2>
                  <ul className="mt-6 grid sm:grid-cols-2 gap-3">
                    {course.outcomes.map((o, i) => (
                      <li key={i} className="flex gap-3 rounded-xl border border-border p-4">
                        <Check className="size-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-pretty text-sm">{o}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h2 className="font-display text-3xl font-bold tracking-tight flex items-center gap-3"><Wrench className="size-6 text-primary" />Tools you'll master</h2>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {course.tools.map((t) => (
                      <span key={t} className="rounded-xl border border-border bg-background px-4 py-2 text-sm font-medium">{t}</span>
                    ))}
                  </div>
                </div>
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
              <h2 className="sm:col-span-2 font-display text-3xl font-bold tracking-tight">Projects you'll build</h2>
              {course.projects.map((p, i) => (
                <div key={i} className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-100 to-purple-300 p-8 aspect-video flex items-end">
                  <div className="absolute inset-0 grid-pattern opacity-30" />
                  <div className="relative">
                    <p className="text-xs font-semibold text-purple-700 uppercase tracking-wider">Project {i+1}</p>
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
                  <li key={i} className="flex gap-3 rounded-2xl border border-border p-5"><Check className="size-5 text-primary shrink-0 mt-0.5" /> {r}</li>
                ))}
              </ul>
            </div>
          )}

          {tab === "Schedule" && (
            <div className="max-w-3xl">
              <h2 className="font-display text-3xl font-bold tracking-tight">Class schedule</h2>
              <p className="mt-3 text-ink-muted">Choose the cadence that fits your life. Both tracks cover the same material.</p>
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

          {tab === "Tuition" && (
            <div className="max-w-3xl">
              <h2 className="font-display text-3xl font-bold tracking-tight">Investment & plans</h2>
              <div className="mt-6 rounded-3xl border border-border p-8 bg-gradient-to-br from-background to-purple-50">
                <p className="text-sm text-ink-muted">Total tuition</p>
                <p className="mt-1 font-display text-5xl font-bold tracking-tighter">{course.price}</p>
                <p className="mt-2 text-sm text-ink-muted">Includes all materials, mentorship, and certificate.</p>
                <div className="mt-6 grid sm:grid-cols-3 gap-3">
                  {["Pay in full (5% off)", "2 installments", "Up to 4 installments"].map((p) => (
                    <div key={p} className="rounded-xl border border-border p-4 text-sm">
                      <p className="font-semibold">{p}</p>
                      <p className="text-ink-muted text-xs mt-1">No interest, no fees.</p>
                    </div>
                  ))}
                </div>
                <Link to="/enroll/$slug" params={{ slug: course.slug }} className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink text-background px-6 py-3 font-semibold hover:bg-primary transition">
                  Apply now <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>
          )}

          {tab === "Career Path" && (
            <div className="max-w-4xl">
              <h2 className="font-display text-3xl font-bold tracking-tight flex items-center gap-3"><Briefcase className="size-7 text-primary" />Roles you'll qualify for</h2>
              <div className="mt-6 grid sm:grid-cols-2 gap-3">
                {course.career.map((c) => (
                  <div key={c} className="rounded-xl border border-border px-5 py-4 font-medium">{c}</div>
                ))}
              </div>
              <div className="mt-10 rounded-3xl bg-ink text-background p-8">
                <p className="font-display text-2xl font-bold">92% of OxVerse graduates land a tech role within 6 months.</p>
                <p className="mt-2 text-background/70">CV review, mock interviews, and direct intros to 18+ hiring partners.</p>
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

      {/* TESTIMONIALS */}
      <section className="border-t border-border bg-muted/40">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tighter">From our graduates</h2>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {sampleTestimonials.map((t, i) => (
              <figure key={i} className="rounded-3xl border border-border bg-background p-7">
                <div className="flex gap-1 text-primary">{[0,1,2,3,4].map(s => <Star key={s} className="size-4 fill-current" />)}</div>
                <blockquote className="mt-4 text-pretty">"{t.quote}"</blockquote>
                <figcaption className="mt-5 flex items-center gap-3">
                  <div className="size-10 rounded-full bg-gradient-to-br from-purple-300 to-purple-700" />
                  <div>
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className="text-xs text-ink-muted">{t.role}</p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* RELATED */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tighter">Related courses</h2>
          <Link to="/courses" className="text-sm font-semibold text-primary inline-flex items-center gap-1">View all <ArrowUpRight className="size-4" /></Link>
        </div>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {fallbackRelated.map((c) => (
            <Link
              key={c.slug}
              to="/courses/$slug" params={{ slug: c.slug }}
              className="group block rounded-3xl overflow-hidden border border-border bg-background hover:border-primary/40 hover:-translate-y-1 transition-all"
            >
              <div className="relative aspect-[16/11] overflow-hidden">
                <img src={c.image} alt={c.title} loading="lazy" className="absolute inset-0 size-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute top-3 left-3 inline-flex items-center rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary">{c.category}</span>
              </div>
              <div className="p-5">
                <p className="font-display text-lg font-semibold group-hover:text-primary transition">{c.title}</p>
                <p className="mt-1 text-sm text-ink-muted line-clamp-2">{c.short}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-ink text-background">
        <div className="mx-auto max-w-5xl px-6 py-20 text-center">
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tighter">Ready to start?</h2>
          <p className="mt-4 text-background/70 max-w-xl mx-auto">Reserve your seat in the next cohort. Limited to 25 students.</p>
          <Link to="/enroll/$slug" params={{ slug: course.slug }} className="mt-8 inline-flex items-center gap-2 rounded-full bg-background text-foreground px-7 py-4 font-semibold hover:bg-primary hover:text-primary-foreground transition">
            Enroll Now <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
