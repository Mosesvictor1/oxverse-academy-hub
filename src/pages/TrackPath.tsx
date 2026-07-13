import { Link, useParams, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Sparkles,
  Target,
  Wrench,
  Rocket,
  BriefcaseBusiness,
} from "lucide-react";
import { SiteLayout, SectionEyebrow } from "@/components/site/SiteLayout";
import { SEO } from "@/components/site/SEO";
import { getTrack, getTrackPath } from "@/lib/tracks";

export default function TrackPathPage() {
  const { slug, pathSlug } = useParams();
  const track = slug ? getTrack(slug) : undefined;
  const path = slug && pathSlug ? getTrackPath(slug, pathSlug) : undefined;

  if (!track || !path) return <Navigate to="/tracks" replace />;

  const applyHref = path.courseSlug ? `/enroll/${path.courseSlug}` : "/register";

  return (
    <SiteLayout>
      <SEO
        title={`${path.title}, ${track.name} Track`}
        description={`${path.tagline} ${path.description}`}
      />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${path.gradient} opacity-[0.15]`} />
        <div className="absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-14 lg:pt-28">
          <div className="flex items-center gap-2 text-sm text-ink-muted">
            <Link to="/tracks" className="hover:text-ink">Tracks</Link>
            <span>/</span>
            <Link to={`/tracks/${track.slug}`} className="hover:text-ink">{track.name}</Link>
            <span>/</span>
            <span className="text-ink">{path.title}</span>
          </div>

          <div className="mt-8 grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <SectionEyebrow>Path in the {track.name} track</SectionEyebrow>
              <h1 className="mt-6 font-display text-5xl md:text-7xl font-bold tracking-tighter text-balance">
                {path.title}
              </h1>
              <p className="mt-6 text-lg text-ink-muted max-w-2xl">{path.description}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to={applyHref}
                  className="inline-flex items-center gap-2 rounded-full bg-ink text-background px-6 py-3 text-sm font-semibold hover:bg-primary transition"
                >
                  Apply to this path <ArrowUpRight className="size-4" />
                </Link>
                <Link
                  to={`/tracks/${track.slug}`}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-semibold hover:border-ink transition"
                >
                  <ArrowLeft className="size-4" /> Back to track
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100 }}
                className={`relative aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-br ${path.gradient} shadow-2xl`}
              >
                <div className="absolute inset-0 grid-pattern opacity-30 mix-blend-overlay" />
                <div className="absolute inset-0 grid place-items-center text-white text-center px-8">
                  <div>
                    <div className="text-8xl drop-shadow-2xl">{path.emoji}</div>
                    <div className="mt-4 font-display text-2xl font-bold">{path.tagline}</div>
                    <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur px-4 py-1.5 text-sm">
                      <Clock className="size-4" /> {path.duration} · {path.level}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* DETAIL GRID */}
      <section className="mx-auto max-w-7xl px-6 py-16 grid gap-6 md:grid-cols-2">
        <DetailCard icon={<Sparkles className="size-5" />} title="Skills you'll master" items={path.skills} />
        <DetailCard icon={<Wrench className="size-5" />} title="Tools & stack" items={path.tools} />
        <DetailCard icon={<Rocket className="size-5" />} title="Projects you'll ship" items={path.projects} />
        <DetailCard icon={<Target className="size-5" />} title="Outcomes" items={path.outcomes} />
      </section>

      {/* CAREERS */}
      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="rounded-3xl border border-border bg-background p-8 md:p-10">
          <div className="flex items-center gap-3">
            <span className="inline-grid size-11 place-items-center rounded-2xl bg-primary/10 text-primary">
              <BriefcaseBusiness className="size-5" />
            </span>
            <div>
              <p className="text-[11px] uppercase tracking-wider text-ink-muted font-semibold">Careers</p>
              <h3 className="font-display text-2xl font-bold tracking-tight">Roles you can land</h3>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {path.careers.map((c) => (
              <span key={c} className="rounded-full border border-border bg-muted/40 px-4 py-1.5 text-sm font-medium">
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* SIBLING PATHS */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="flex items-end justify-between gap-4 mb-6">
          <div>
            <SectionEyebrow>Other paths in this track</SectionEyebrow>
            <h3 className="mt-3 font-display text-3xl font-bold tracking-tight">
              Also explore
            </h3>
          </div>
          <Link to={`/tracks/${track.slug}`} className="text-sm font-semibold text-primary inline-flex items-center gap-1">
            View track <ArrowUpRight className="size-4" />
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {track.paths
            .filter((p) => p.slug !== path.slug)
            .map((p) => (
              <Link
                key={p.slug}
                to={`/tracks/${track.slug}/${p.slug}`}
                className="group rounded-2xl border border-border bg-background p-5 hover:border-primary/40 hover:shadow-lg transition"
              >
                <div className="flex items-center gap-3">
                  <span className={`size-11 rounded-xl bg-gradient-to-br ${p.gradient} grid place-items-center text-2xl`}>
                    {p.emoji}
                  </span>
                  <div>
                    <div className="font-display font-semibold group-hover:text-primary transition">{p.title}</div>
                    <div className="text-xs text-ink-muted">{p.duration} · {p.level}</div>
                  </div>
                </div>
                <p className="mt-3 text-sm text-ink-muted line-clamp-2">{p.tagline}</p>
              </Link>
            ))}
        </div>
      </section>
    </SiteLayout>
  );
}

function DetailCard({
  icon,
  title,
  items,
}: {
  icon: React.ReactNode;
  title: string;
  items: string[];
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-3xl border border-border bg-background p-6 md:p-8"
    >
      <div className="flex items-center gap-3">
        <span className="inline-grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
          {icon}
        </span>
        <h3 className="font-display text-lg font-semibold">{title}</h3>
      </div>
      <ul className="mt-5 space-y-2.5">
        {items.map((s) => (
          <li key={s} className="flex items-start gap-2.5 text-sm">
            <CheckCircle2 className="size-4 text-primary shrink-0 mt-0.5" />
            <span className="text-ink">{s}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}