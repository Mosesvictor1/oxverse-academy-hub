import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  BookOpen,
  Clock,
  Target,
  Layers,
  Trophy,
  Sparkles,
  CheckCircle2,
  ClipboardList,
  Rocket,
  GraduationCap,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { SiteLayout, SectionEyebrow } from "@/components/site/SiteLayout";
import { SEO } from "@/components/site/SEO";
import { getCurriculum, type CurriculumWeek } from "@/lib/curriculum";

export default function CurriculumDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const course = slug ? getCurriculum(slug) : undefined;
  const [openWeek, setOpenWeek] = useState<CurriculumWeek | null>(null);

  if (!course) {
    return (
      <SiteLayout>
        <div className="mx-auto max-w-7xl px-6 py-32 text-center">
          <h1 className="font-display text-3xl font-bold">Curriculum not found</h1>
          <p className="mt-4 text-ink-muted">This course curriculum doesn't exist yet.</p>
          <Link to="/curriculum" className="mt-6 inline-flex items-center text-primary font-semibold">
            <ArrowLeft className="size-4 mr-1" /> Back to Curriculum
          </Link>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <SEO
        title={`${course.title} Curriculum, OxVerse Academy`}
        description={course.overview}
      />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-40 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        <div className="absolute inset-0 radial-purple" />
        <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-16 lg:pt-28">
          <Link
            to="/curriculum"
            className="inline-flex items-center gap-1 text-sm text-ink-muted hover:text-ink"
          >
            <ArrowLeft className="size-4" /> All curricula
          </Link>
          <div className="mt-6 grid lg:grid-cols-[1.4fr,1fr] gap-10 items-center">
            <div>
              <SectionEyebrow>{course.tagline}</SectionEyebrow>
              <h1 className="mt-5 font-display text-4xl md:text-6xl font-bold tracking-tighter text-balance">
                {course.title} <span className="gradient-text">Curriculum</span>
              </h1>
              <p className="mt-5 text-lg text-ink-muted max-w-2xl">{course.overview}</p>

              <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
                <Stat icon={<Clock className="size-4" />} label="Duration" value={course.duration} />
                <Stat icon={<BookOpen className="size-4" />} label="Weeks" value={`${course.totalWeeks}`} />
                <Stat icon={<Layers className="size-4" />} label="Projects" value={course.projectsCount} />
                <Stat icon={<Trophy className="size-4" />} label="Capstone" value="Included" />
              </div>

              <div className="mt-8 rounded-2xl border border-border bg-background/60 backdrop-blur p-5">
                <div className="flex items-start gap-3">
                  <Target className="size-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-primary">Goal</p>
                    <p className="mt-1 text-sm text-ink">{course.goal}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative rounded-3xl overflow-hidden aspect-square border border-border shadow-2xl shadow-primary/10">
              <img
                src={course.image}
                alt={course.title}
                width={1024}
                height={1024}
                className="absolute inset-0 size-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* WEEKS */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="flex items-end justify-between mb-8">
          <div>
            <SectionEyebrow>Week-by-week</SectionEyebrow>
            <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold tracking-tight">
              Click any week to open its curriculum
            </h2>
            <p className="mt-2 text-ink-muted">
              {course.totalWeeks} weeks · progressively harder · project-based
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {course.weeks.map((week, i) => (
            <motion.button
              key={week.number}
              type="button"
              onClick={() => setOpenWeek(week)}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 8) * 0.03 }}
              whileHover={{ y: -4 }}
              className="group relative text-left rounded-2xl border border-border bg-background p-5 overflow-hidden hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 transition-all"
            >
              <div className="absolute -top-8 -right-8 size-24 rounded-full bg-primary/10 blur-2xl group-hover:bg-primary/25 transition-colors" />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 text-primary px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider">
                    Week {week.number}
                  </span>
                  <Sparkles className="size-4 text-ink-muted group-hover:text-primary transition-colors" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold leading-snug group-hover:text-primary transition-colors">
                  {week.title}
                </h3>
                <p className="mt-3 text-xs text-ink-muted">
                  {week.sections.length} sections · {week.projects.length} project{week.projects.length === 1 ? "" : "s"}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </section>

      {/* WEEK MODAL */}
      <Dialog open={!!openWeek} onOpenChange={(v) => !v && setOpenWeek(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <AnimatePresence mode="wait">
            {openWeek && (
              <motion.div
                key={openWeek.number}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-flex items-center rounded-full bg-primary/10 text-primary px-3 py-1 text-[11px] font-bold uppercase tracking-wider">
                    Week {openWeek.number}
                  </span>
                  <span className="text-xs text-ink-muted">of {course.totalWeeks}</span>
                </div>
                <DialogTitle className="font-display text-2xl md:text-3xl font-bold leading-tight">
                  {openWeek.title}
                </DialogTitle>
                {openWeek.overview && (
                  <DialogDescription className="mt-2 text-base">
                    {openWeek.overview}
                  </DialogDescription>
                )}

                <Block icon={<Target className="size-4" />} title="Learning Objectives">
                  <ul className="space-y-1.5">
                    {openWeek.objectives.map((o) => (
                      <li key={o} className="flex gap-2 text-sm">
                        <CheckCircle2 className="size-4 text-primary mt-0.5 shrink-0" />
                        <span>{o}</span>
                      </li>
                    ))}
                  </ul>
                </Block>

                <Block icon={<BookOpen className="size-4" />} title="Sections & Topics">
                  <div className="space-y-4">
                    {openWeek.sections.map((s) => (
                      <div key={s.id} className="rounded-xl border border-border p-4">
                        <p className="font-display text-sm font-semibold">
                          <span className="text-primary mr-2">{s.id}</span>
                          {s.title}
                        </p>
                        <ul className="mt-2 flex flex-wrap gap-1.5">
                          {s.topics.map((t) => (
                            <li
                              key={t}
                              className="rounded-md bg-muted px-2 py-1 text-[11px] font-medium text-ink-muted"
                            >
                              {t}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </Block>

                <Block icon={<Sparkles className="size-4" />} title="Hands-on Exercises">
                  <ul className="space-y-1.5">
                    {openWeek.exercises.map((e) => (
                      <li key={e} className="flex gap-2 text-sm">
                        <span className="text-primary">›</span>
                        <span>{e}</span>
                      </li>
                    ))}
                  </ul>
                </Block>

                <Block icon={<ClipboardList className="size-4" />} title="Assignments">
                  <ul className="space-y-1.5">
                    {openWeek.assignments.map((a) => (
                      <li key={a} className="flex gap-2 text-sm">
                        <span className="text-primary">›</span>
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>
                </Block>

                <Block icon={<Rocket className="size-4" />} title="Projects">
                  <ul className="space-y-1.5">
                    {openWeek.projects.map((p) => (
                      <li key={p} className="flex gap-2 text-sm font-medium">
                        <Rocket className="size-4 text-primary mt-0.5 shrink-0" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </Block>

                <Block icon={<GraduationCap className="size-4" />} title="Weekly Learning Outcomes">
                  <ul className="space-y-1.5">
                    {openWeek.outcomes.map((o) => (
                      <li key={o} className="flex gap-2 text-sm">
                        <CheckCircle2 className="size-4 text-primary mt-0.5 shrink-0" />
                        <span>{o}</span>
                      </li>
                    ))}
                  </ul>
                </Block>

                {openWeek.assessment && (
                  <Block icon={<Trophy className="size-4" />} title="Weekly Assessment">
                    <p className="text-sm">{openWeek.assessment}</p>
                  </Block>
                )}

                <div className="mt-8 flex flex-wrap gap-2 justify-between items-center pt-5 border-t border-border">
                  <button
                    disabled={openWeek.number <= 1}
                    onClick={() =>
                      setOpenWeek(course.weeks.find((w) => w.number === openWeek.number - 1) ?? null)
                    }
                    className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium disabled:opacity-40 hover:border-ink"
                  >
                    <ArrowLeft className="size-4" /> Previous week
                  </button>
                  <button
                    disabled={openWeek.number >= course.totalWeeks}
                    onClick={() =>
                      setOpenWeek(course.weeks.find((w) => w.number === openWeek.number + 1) ?? null)
                    }
                    className="inline-flex items-center gap-1 rounded-full bg-ink text-background px-4 py-2 text-sm font-semibold disabled:opacity-40 hover:bg-primary transition"
                  >
                    Next week →
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </SiteLayout>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-background/60 backdrop-blur p-3">
      <div className="flex items-center gap-1.5 text-ink-muted text-[11px] uppercase tracking-wider font-semibold">
        {icon} {label}
      </div>
      <p className="mt-1 font-display font-semibold text-sm">{value}</p>
    </div>
  );
}

function Block({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-6">
      <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-primary">
        {icon} {title}
      </div>
      <div className="mt-2">{children}</div>
    </div>
  );
}
