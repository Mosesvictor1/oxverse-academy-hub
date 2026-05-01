import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, Search, Clock, Sparkles, X, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { SiteLayout, SectionEyebrow } from "@/components/site/SiteLayout";
import { SEO } from "@/components/site/SEO";
import { courses } from "@/lib/courses";

const categories = ["All", "Engineering", "Design", "Data & AI", "Web3", "Marketing"] as const;
const levels = ["All levels", "Beginner", "Intermediate", "Advanced"] as const;
const schedules = ["Any", "Weekday", "Weekend"] as const;
const durations = ["Any", "≤ 3 months", "4 months", "5+ months"] as const;
const sorts = ["Featured", "A–Z", "Duration"] as const;

export default function CoursesPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<(typeof categories)[number]>("All");
  const [level, setLevel] = useState<(typeof levels)[number]>("All levels");
  const [sched, setSched] = useState<(typeof schedules)[number]>("Any");
  const [dur, setDur] = useState<(typeof durations)[number]>("Any");
  const [sort, setSort] = useState<(typeof sorts)[number]>("Featured");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = courses.filter((c) => {
      const matchesQ =
        q === "" ||
        (c.title + c.short + c.category + c.tools.join(" "))
          .toLowerCase()
          .includes(q.toLowerCase());
      const matchesCat = cat === "All" || c.category === cat;
      const matchesLevel = level === "All levels" || c.level === level;
      const matchesSched =
        sched === "Any" || c.schedule.some((s) => s.toLowerCase().includes(sched.toLowerCase()));
      const months = parseInt(c.duration);
      const matchesDur =
        dur === "Any" ||
        (dur === "≤ 3 months" && months <= 3) ||
        (dur === "4 months" && months === 4) ||
        (dur === "5+ months" && months >= 5);
      return matchesQ && matchesCat && matchesLevel && matchesSched && matchesDur;
    });
    if (sort === "A–Z") list = [...list].sort((a, b) => a.title.localeCompare(b.title));
    if (sort === "Duration")
      list = [...list].sort((a, b) => parseInt(a.duration) - parseInt(b.duration));
    return list;
  }, [q, cat, level, sched, dur, sort]);

  const activeFilters = [
    cat !== "All" && cat,
    level !== "All levels" && level,
    sched !== "Any" && sched,
    dur !== "Any" && dur,
  ].filter(Boolean) as string[];

  return (
    <SiteLayout>
      <SEO
        title="Courses — OxVerse Academy"
        description="10 premium tech courses across Engineering, Design, Data & AI, Web3, and Marketing."
      />
      <section className="relative">
        <div className="absolute inset-0 grid-pattern opacity-50 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        <div className="absolute inset-0 radial-purple" />
        <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-12 lg:pt-28">
          <SectionEyebrow>10 premium courses</SectionEyebrow>
          <h1 className="mt-6 font-display text-5xl md:text-7xl font-bold tracking-tighter text-balance max-w-3xl">
            Pick your path. <span className="gradient-text">Build your future.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-ink-muted text-pretty">
            Cohort-based, project-driven training taught in person at our Lagos campus. Choose your
            level, your schedule, and your future.
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="rounded-3xl border border-border bg-background p-5 lg:p-6 sticky top-20 z-30 backdrop-blur supports-[backdrop-filter]:bg-background/85 shadow-sm">
          <div className="flex flex-col gap-4">
            <div className="relative">
              <Search className="size-4 absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search by course, tool, or topic…"
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-muted/60 focus:bg-background border border-transparent focus:border-primary outline-none transition"
              />
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setFiltersOpen(true)}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-ink hover:border-ink lg:hidden"
              >
                <SlidersHorizontal className="size-4" />
                Filters
              </button>

              <div className="hidden lg:flex flex-wrap gap-2 items-center overflow-x-auto pb-1">
                <FilterPills label="Category" options={categories} value={cat} onChange={setCat} />
                <Divider />
                <FilterPills label="Level" options={levels} value={level} onChange={setLevel} />
                <Divider />
                <FilterPills
                  label="Schedule"
                  options={schedules}
                  value={sched}
                  onChange={setSched}
                />
                <Divider />
                <FilterPills label="Duration" options={durations} value={dur} onChange={setDur} />
              </div>

              <div className="ml-auto hidden lg:block">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as typeof sort)}
                  className="rounded-full border border-border bg-background px-4 py-2 text-sm font-medium"
                >
                  {sorts.map((s) => (
                    <option key={s}>Sort: {s}</option>
                  ))}
                </select>
              </div>
            </div>
            {activeFilters.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-xs text-ink-muted">Active:</span>
                {activeFilters.map((f) => (
                  <span
                    key={f}
                    className="inline-flex items-center gap-1.5 rounded-full bg-purple-50 text-primary px-3 py-1 text-xs font-medium"
                  >
                    {f}
                  </span>
                ))}
                <button
                  onClick={() => {
                    setCat("All");
                    setLevel("All levels");
                    setSched("Any");
                    setDur("Any");
                  }}
                  className="ml-1 inline-flex items-center gap-1 text-xs text-ink-muted hover:text-ink"
                >
                  <X className="size-3" /> Clear
                </button>
              </div>
            )}
          </div>
        </div>

        <Dialog open={filtersOpen} onOpenChange={setFiltersOpen}>
          <DialogContent className="max-w-md">
            <DialogTitle>Course filters</DialogTitle>
            <DialogDescription>
              Adjust search, category, level, schedule, duration, and sort.
            </DialogDescription>
            <div className="mt-6 space-y-5">
              <div>
                <label className="text-sm font-medium text-ink">Search</label>
                <div className="relative mt-2">
                  <Search className="size-4 absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted" />
                  <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Search by course, tool, or topic…"
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-border bg-muted/60 focus:bg-background outline-none transition"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm uppercase tracking-wider text-ink-muted font-semibold">
                    Category
                  </p>
                  <FilterPills label="" options={categories} value={cat} onChange={setCat} />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-wider text-ink-muted font-semibold">
                    Level
                  </p>
                  <FilterPills label="" options={levels} value={level} onChange={setLevel} />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-wider text-ink-muted font-semibold">
                    Schedule
                  </p>
                  <FilterPills label="" options={schedules} value={sched} onChange={setSched} />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-wider text-ink-muted font-semibold">
                    Duration
                  </p>
                  <FilterPills label="" options={durations} value={dur} onChange={setDur} />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-wider text-ink-muted font-semibold">
                    Sort
                  </p>
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value as typeof sort)}
                    className="mt-2 w-full rounded-full border border-border bg-background px-4 py-2 text-sm font-medium"
                  >
                    {sorts.map((s) => (
                      <option key={s}>Sort: {s}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <DialogClose asChild>
                <button
                  type="button"
                  className="inline-flex items-center rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-background hover:bg-primary transition"
                >
                  Done
                </button>
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>

        <p className="mt-6 text-sm text-ink-muted">
          {filtered.length} course{filtered.length === 1 ? "" : "s"}
        </p>

        <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((c, i) => (
            <motion.article
              key={c.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 6) * 0.04 }}
            >
              <Link
                to={`/courses/${c.slug}`}
                className="group block h-full rounded-3xl overflow-hidden border border-border bg-background hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative aspect-[16/11] overflow-hidden">
                  <img
                    src={c.image}
                    alt={c.title}
                    loading="lazy"
                    className="absolute inset-0 size-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <div className="absolute top-4 left-4 right-4 flex items-start justify-between gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-white/95 backdrop-blur px-3 py-1 text-[11px] font-semibold text-primary uppercase tracking-wider">
                      {c.category}
                    </span>
                    <span className="size-9 rounded-full bg-white/95 backdrop-blur grid place-items-center text-lg shrink-0">
                      {c.emoji}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-1.5">
                    <Badge tone="solid">{c.level}</Badge>
                    {c.schedule.some((s) => /weekend/i.test(s)) && <Badge>Weekend</Badge>}
                    {c.schedule.some((s) => /weekday/i.test(s)) && <Badge>Weekday</Badge>}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-semibold tracking-tight group-hover:text-primary transition-colors">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-sm text-ink-muted text-pretty line-clamp-2">{c.short}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {c.tools.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="rounded-md bg-muted px-2 py-0.5 text-[11px] font-medium text-ink-muted"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-5 pt-5 border-t border-border flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs text-ink-muted">
                      <span className="inline-flex items-center gap-1">
                        <Clock className="size-3.5" />
                        {c.duration}
                      </span>
                      <span>•</span>
                      <span className="font-display font-semibold text-ink">{c.level}</span>
                    </div>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary">
                      View{" "}
                      <ArrowUpRight className="size-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full text-center py-16 text-ink-muted">
              <Sparkles className="size-8 mx-auto mb-4 text-primary" />
              No courses match your filters. Try clearing them.
            </div>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}

function FilterPills<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      <span className="text-[11px] uppercase tracking-wider text-ink-muted font-semibold mr-1">
        {label}
      </span>
      {options.map((o) => (
        <button
          key={o}
          onClick={() => onChange(o)}
          className={`rounded-full px-3 py-1.5 text-xs font-medium border transition ${
            value === o
              ? "bg-ink text-background border-ink"
              : "border-border text-ink-muted hover:border-ink hover:text-ink"
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

function Divider() {
  return <span className="hidden lg:inline-block h-5 w-px bg-border" />;
}

function Badge({ children, tone }: { children: React.ReactNode; tone?: "solid" }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider backdrop-blur ${
        tone === "solid" ? "bg-primary text-primary-foreground" : "bg-white/90 text-ink"
      }`}
    >
      {children}
    </span>
  );
}
