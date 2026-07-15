import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock, Layers, Sparkles } from "lucide-react";
import { SiteLayout, SectionEyebrow } from "@/components/site/SiteLayout";
import { SEO } from "@/components/site/SEO";
import { curricula } from "@/lib/curriculum";

export default function CurriculumIndexPage() {
  return (
    <SiteLayout>
      <SEO
        title="Curriculum, OxVerse Academy"
        description="Explore the full, week-by-week curriculum for every OxVerse Academy Professional Diploma course."
      />
      <section className="relative">
        <div className="absolute inset-0 grid-pattern opacity-50 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        <div className="absolute inset-0 radial-purple" />
        <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-12 lg:pt-28">
          <SectionEyebrow>Professional Diploma Curriculum</SectionEyebrow>
          <h1 className="mt-6 font-display text-5xl md:text-7xl font-bold tracking-tighter text-balance max-w-3xl">
            The complete <span className="gradient-text">week-by-week</span> curriculum
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-ink-muted text-pretty">
            Every course, every week, every project. Click a course to explore the full curriculum,
            then open any week to see topics, exercises, assignments, projects, and learning outcomes.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {curricula.map((c, i) => (
            <motion.article
              key={c.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 6) * 0.04 }}
            >
              <Link
                to={`/curriculum/${c.slug}`}
                className="group block h-full rounded-3xl overflow-hidden border border-border bg-background hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative aspect-[16/11] overflow-hidden bg-muted">
                  <img
                    src={c.image}
                    alt={c.title}
                    loading="lazy"
                    width={1024}
                    height={1024}
                    className="absolute inset-0 size-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute top-4 left-4 right-4 flex items-start justify-between gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-white/95 backdrop-blur px-3 py-1 text-[11px] font-semibold text-primary uppercase tracking-wider">
                      {c.tagline}
                    </span>
                    <span className="inline-flex items-center rounded-full bg-gradient-to-r from-primary to-purple-700 text-primary-foreground px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider shadow-md">
                      {c.totalWeeks} Weeks
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-display text-2xl font-semibold text-white drop-shadow">
                      {c.title}
                    </h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-sm text-ink-muted line-clamp-2">{c.goal}</p>
                  <div className="mt-5 pt-5 border-t border-border flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs text-ink-muted">
                      <span className="inline-flex items-center gap-1">
                        <Clock className="size-3.5" />
                        {c.duration}
                      </span>
                      <span>•</span>
                      <span className="inline-flex items-center gap-1">
                        <Layers className="size-3.5" />
                        {c.projectsCount} projects
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary">
                      Curriculum
                      <ArrowUpRight className="size-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        <div className="mt-16 rounded-3xl border border-border bg-muted/40 p-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <Sparkles className="size-6 text-primary shrink-0" />
          <div className="flex-1">
            <h3 className="font-display text-xl font-semibold">Every curriculum is cohort-based and project-driven</h3>
            <p className="mt-1 text-sm text-ink-muted">
              Taught in person at our Lagos campus with live instructors, code reviews, and hiring-partner demo days.
            </p>
          </div>
          <Link
            to="/register"
            className="inline-flex items-center rounded-full bg-ink text-background px-5 py-2.5 text-sm font-semibold hover:bg-primary transition"
          >
            Register now
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
