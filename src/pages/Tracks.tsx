import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles, Users, Clock, Layers } from "lucide-react";
import { SiteLayout, SectionEyebrow } from "@/components/site/SiteLayout";
import { SEO } from "@/components/site/SEO";
import { tracks } from "@/lib/tracks";

export default function TracksPage() {
  return (
    <SiteLayout>
      <SEO
        title="Tracks, OxVerse Academy"
        description="Choose a career track — Artificial Intelligence, Software Engineering, Design, Web3, or Growth & Marketing — with focused sub-paths."
      />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-50 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        <div className="absolute inset-0 radial-purple" />
        <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-16 lg:pt-28">
          <SectionEyebrow>Career tracks</SectionEyebrow>
          <h1 className="mt-6 font-display text-5xl md:text-7xl font-bold tracking-tighter text-balance max-w-4xl">
            One track. <span className="gradient-text">Three superpowers.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-ink-muted text-pretty">
            Every OxVerse track bundles multiple focused paths so you graduate with a career, not
            just a course. Pick a track, explore the paths, and apply in minutes.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-ink-muted">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1.5">
              <Layers className="size-4 text-primary" /> {tracks.length} tracks
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1.5">
              <Sparkles className="size-4 text-primary" />
              {tracks.reduce((n, t) => n + t.paths.length, 0)} specialised paths
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1.5">
              <Users className="size-4 text-primary" /> Cohort based, in person
            </span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tracks.map((t, i) => (
            <motion.article
              key={t.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: (i % 6) * 0.05 }}
              className="group relative"
            >
              <Link
                to={`/tracks/${t.slug}`}
                className="block h-full rounded-3xl overflow-hidden border border-border bg-background hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={t.image}
                    alt={t.name}
                    loading="lazy"
                    className="absolute inset-0 size-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${t.gradient} opacity-70 mix-blend-multiply`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
                    <span className="inline-flex items-center rounded-full bg-white/95 backdrop-blur px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-ink">
                      {t.short}
                    </span>
                    <span className="size-11 rounded-2xl bg-white/95 backdrop-blur grid place-items-center text-2xl shadow-lg">
                      {t.emoji}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="font-display text-2xl font-bold tracking-tight">{t.name}</h3>
                    <p className="mt-1 text-sm text-white/90 line-clamp-2">{t.tagline}</p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-1.5">
                    {t.paths.map((p) => (
                      <span
                        key={p.slug}
                        className="rounded-full bg-muted px-2.5 py-1 text-[11px] font-medium text-ink-muted"
                      >
                        {p.emoji} {p.title}
                      </span>
                    ))}
                  </div>
                  <div className="mt-5 pt-5 border-t border-border flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 text-xs text-ink-muted">
                      <Clock className="size-3.5" /> {t.totalDuration}
                    </span>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary">
                      Explore track
                      <ArrowUpRight className="size-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}