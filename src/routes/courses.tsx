import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { SiteLayout, SectionEyebrow } from "@/components/site/SiteLayout";
import { courses } from "@/lib/courses";

export const Route = createFileRoute("/courses")({
  head: () => ({
    meta: [
      { title: "Courses — OxVerse Academy" },
      { name: "description", content: "10 premium tech courses across Engineering, Design, Data & AI, Web3, and Marketing. Cohort-based, hands-on, taught at our Lagos campus." },
      { property: "og:title", content: "Courses — OxVerse Academy" },
      { property: "og:description", content: "Pick your path. Build your future." },
    ],
  }),
  component: CoursesPage,
});

const categories = ["All", "Engineering", "Design", "Data & AI", "Web3", "Marketing"] as const;
const sorts = ["Featured", "A–Z", "Duration", "Price"] as const;

function CoursesPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<(typeof categories)[number]>("All");
  const [sort, setSort] = useState<(typeof sorts)[number]>("Featured");

  const filtered = useMemo(() => {
    let list = courses.filter((c) => {
      const matchesQ = q === "" || (c.title + c.short + c.category).toLowerCase().includes(q.toLowerCase());
      const matchesCat = cat === "All" || c.category === cat;
      return matchesQ && matchesCat;
    });
    if (sort === "A–Z") list = [...list].sort((a, b) => a.title.localeCompare(b.title));
    if (sort === "Duration") list = [...list].sort((a, b) => parseInt(a.duration) - parseInt(b.duration));
    if (sort === "Price") list = [...list].sort((a, b) => parseInt(a.price.replace(/\D/g, "")) - parseInt(b.price.replace(/\D/g, "")));
    return list;
  }, [q, cat, sort]);

  return (
    <SiteLayout>
      <section className="relative">
        <div className="absolute inset-0 grid-pattern opacity-50 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-12 lg:pt-28">
          <SectionEyebrow>Courses</SectionEyebrow>
          <h1 className="mt-6 font-display text-5xl md:text-7xl font-bold tracking-tighter text-balance max-w-3xl">
            Pick your path. <span className="gradient-text">Build your future.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-ink-muted text-pretty">
            10 cohort-based tech courses, taught in person at our Lagos campus.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="rounded-3xl border border-border bg-background p-6 sticky top-20 z-30 backdrop-blur supports-[backdrop-filter]:bg-background/80">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="size-4 absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search courses..."
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-muted/60 focus:bg-background border border-transparent focus:border-primary outline-none transition"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={`rounded-full px-4 py-2 text-sm font-medium border transition ${
                    cat === c
                      ? "bg-ink text-background border-ink"
                      : "border-border hover:border-ink"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as typeof sort)}
              className="rounded-xl border border-border bg-background px-4 py-3 text-sm font-medium"
            >
              {sorts.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>
        </div>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((c, i) => (
            <motion.div
              key={c.slug}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i % 6) * 0.04 }}
            >
              <Link
                to="/courses/$slug" params={{ slug: c.slug }}
                className="group block h-full rounded-3xl border border-border bg-background p-8 hover:border-primary hover:shadow-xl hover:shadow-primary/5 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="size-14 rounded-2xl bg-purple-50 inline-flex items-center justify-center text-3xl">{c.emoji}</div>
                  <ArrowUpRight className="size-5 text-ink-muted group-hover:text-primary group-hover:rotate-12 transition-all" />
                </div>
                <p className="mt-6 text-xs font-medium uppercase tracking-wider text-primary">{c.category}</p>
                <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight">{c.title}</h3>
                <p className="mt-3 text-ink-muted text-pretty">{c.short}</p>
                <div className="mt-6 flex flex-wrap items-center gap-2 text-xs">
                  <span className="rounded-full bg-muted px-3 py-1 font-medium">{c.duration}</span>
                  <span className="rounded-full bg-muted px-3 py-1 font-medium">{c.level}</span>
                </div>
                <div className="mt-6 pt-6 border-t border-border flex items-center justify-between">
                  <span className="font-display font-semibold">{c.price}</span>
                  <span className="text-sm text-ink-muted">View details →</span>
                </div>
              </Link>
            </motion.div>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full text-center py-16 text-ink-muted">
              No courses match. Try a different search.
            </div>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}