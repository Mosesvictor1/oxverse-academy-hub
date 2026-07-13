import { useMemo, useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Compass,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { SiteLayout, SectionEyebrow } from "@/components/site/SiteLayout";
import { SEO } from "@/components/site/SEO";
import { getTrack, type TrackPath } from "@/lib/tracks";

export default function TrackDetailPage() {
  const { slug } = useParams();
  const track = slug ? getTrack(slug) : undefined;
  const [activePath, setActivePath] = useState<TrackPath | null>(null);

  const inOne = useMemo(() => {
    const n = track?.paths.length ?? 0;
    return n === 2 ? "2 IN 1" : n === 3 ? "3 IN 1" : `${n} IN 1`;
  }, [track]);

  if (!track) return <Navigate to="/tracks" replace />;

  return (
    <SiteLayout>
      <SEO
        title={`${track.name} Track, OxVerse Academy`}
        description={`${track.tagline} ${track.description}`}
      />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-40" />
        <div
          className={`absolute inset-0 bg-gradient-to-br ${track.gradient} opacity-[0.12]`}
        />
        <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-14 lg:pt-28">
          <Link
            to="/tracks"
            className="inline-flex items-center gap-1.5 text-sm text-ink-muted hover:text-ink"
          >
            <ArrowLeft className="size-4" /> All tracks
          </Link>

          <div className="mt-6 grid lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8">
              <SectionEyebrow>{track.short}</SectionEyebrow>

              {/* Animated "3 IN 1" mark */}
              <div className="mt-6 flex items-baseline gap-3 flex-wrap">
                {inOne.split(" ").map((word, wi) => (
                  <div key={wi} className="flex">
                    {word.split("").map((ch, i) => (
                      <motion.span
                        key={`${wi}-${i}`}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.05 * (wi * 5 + i), type: "spring" }}
                        className="font-display text-5xl md:text-6xl font-black tracking-tighter"
                        style={{
                          color: i === 0 && wi === 0 ? track.accent : undefined,
                          textShadow: i === 0 && wi === 0 ? `0 6px 24px ${track.accent}55` : undefined,
                        }}
                      >
                        {ch}
                      </motion.span>
                    ))}
                  </div>
                ))}
              </div>

              <h1 className="mt-4 font-display text-5xl md:text-7xl font-bold tracking-tighter text-balance">
                {track.name} <span className="gradient-text">Track</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg text-ink-muted text-pretty">
                {track.description}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#paths"
                  className="inline-flex items-center gap-2 rounded-full bg-ink text-background px-6 py-3 text-sm font-semibold hover:bg-primary transition"
                >
                  Explore the {track.paths.length} paths
                  <Compass className="size-4" />
                </a>
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-semibold hover:border-ink transition"
                >
                  Apply now <ArrowUpRight className="size-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-3">
              <Stat icon={<Clock className="size-4" />} label="Duration" value={track.totalDuration} />
              <Stat icon={<Users className="size-4" />} label="For" value={track.audience} />
              <Stat
                icon={<Sparkles className="size-4" />}
                label="Format"
                value="Cohort based, in-person Lagos"
              />
            </div>
          </div>
        </div>
      </section>

      {/* PATHS */}
      <section id="paths" className="mx-auto max-w-7xl px-6 py-20">
        <div className="max-w-2xl">
          <SectionEyebrow>Choose your path</SectionEyebrow>
          <h2 className="mt-4 font-display text-4xl md:text-5xl font-bold tracking-tight">
            {track.paths.length} focused specialisations
          </h2>
          <p className="mt-4 text-ink-muted">
            Every path is project-driven and taught by working professionals. Click any card to see
            the modules, projects and career outcomes.
          </p>
        </div>

        <div className={`mt-10 grid gap-6 ${track.paths.length === 2 ? "md:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3"}`}>
          {track.paths.map((p, i) => (
            <motion.button
              type="button"
              key={p.slug}
              onClick={() => setActivePath(p)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="group text-left rounded-3xl overflow-hidden border border-border bg-background hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10 transition-all"
            >
              <div className={`relative aspect-[16/9] bg-gradient-to-br ${p.gradient} overflow-hidden`}>
                <div className="absolute inset-0 grid-pattern opacity-30 mix-blend-overlay" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.span
                    className="text-7xl drop-shadow-2xl"
                    initial={{ scale: 0.8, rotate: -6 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 120 }}
                  >
                    {p.emoji}
                  </motion.span>
                </div>
                <div className="absolute top-4 left-4">
                  <span className="rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-ink">
                    Path 0{i + 1}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="rounded-full bg-black/40 backdrop-blur px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
                    {p.level}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-bold tracking-tight group-hover:text-primary transition">
                  {p.title}
                </h3>
                <p className="mt-1.5 text-sm text-ink-muted line-clamp-2">{p.tagline}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.tools.slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className="rounded-md bg-muted px-2 py-0.5 text-[11px] font-medium text-ink-muted"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-5 pt-5 border-t border-border flex items-center justify-between text-xs">
                  <span className="inline-flex items-center gap-1 text-ink-muted">
                    <Clock className="size-3.5" /> {p.duration}
                  </span>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary">
                    Explore path
                    <ArrowUpRight className="size-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Comparison table */}
        <div className="mt-16 rounded-3xl border border-border overflow-hidden bg-background">
          <div className="px-6 py-4 border-b border-border bg-muted/40">
            <h3 className="font-display text-lg font-semibold">Compare paths at a glance</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[640px]">
              <thead className="text-left text-xs uppercase tracking-wider text-ink-muted bg-muted/30">
                <tr>
                  <th className="px-6 py-3">Path</th>
                  <th className="px-6 py-3">Level</th>
                  <th className="px-6 py-3">Duration</th>
                  <th className="px-6 py-3">You'll build</th>
                  <th className="px-6 py-3" />
                </tr>
              </thead>
              <tbody>
                {track.paths.map((p) => (
                  <tr key={p.slug} className="border-t border-border">
                    <td className="px-6 py-4 font-semibold">
                      <span className="mr-1.5">{p.emoji}</span>
                      {p.title}
                    </td>
                    <td className="px-6 py-4 text-ink-muted">{p.level}</td>
                    <td className="px-6 py-4 text-ink-muted">{p.duration}</td>
                    <td className="px-6 py-4 text-ink-muted">{p.projects[0]}</td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        to={`/tracks/${track.slug}/${p.slug}`}
                        className="inline-flex items-center gap-1 text-primary font-semibold"
                      >
                        View <ArrowUpRight className="size-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div
          className={`relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br ${track.gradient} p-10 md:p-14 text-white`}
        >
          <div className="absolute inset-0 grid-pattern opacity-20 mix-blend-overlay" />
          <div className="relative max-w-2xl">
            <h3 className="font-display text-3xl md:text-5xl font-bold tracking-tight">
              Ready to start your {track.name.toLowerCase()} journey?
            </h3>
            <p className="mt-4 text-white/90">
              Applications close each cohort. Reserve your seat now and pick your path anytime
              before class starts.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/register"
                className="inline-flex items-center gap-2 rounded-full bg-white text-ink px-6 py-3 text-sm font-semibold hover:bg-white/90 transition"
              >
                Apply to this track <ArrowUpRight className="size-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/60 px-6 py-3 text-sm font-semibold hover:bg-white/10 transition"
              >
                Talk to admissions
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* PATH MODAL */}
      <Dialog open={!!activePath} onOpenChange={(o) => !o && setActivePath(null)}>
        <DialogContent className="max-w-2xl p-0 overflow-hidden">
          <AnimatePresence>
            {activePath && (
              <motion.div
                key={activePath.slug}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className={`relative p-8 bg-gradient-to-br ${activePath.gradient} text-white`}>
                  <DialogClose className="absolute top-4 right-4 rounded-full bg-black/30 p-1.5 hover:bg-black/50 transition">
                    <X className="size-4" />
                  </DialogClose>
                  <div className="text-5xl">{activePath.emoji}</div>
                  <DialogTitle asChild>
                    <h3 className="mt-3 font-display text-3xl font-bold tracking-tight">
                      {activePath.title}
                    </h3>
                  </DialogTitle>
                  <DialogDescription className="mt-1 text-white/90">
                    {activePath.tagline}
                  </DialogDescription>
                  <div className="mt-4 flex flex-wrap gap-2 text-xs">
                    <span className="rounded-full bg-white/20 px-2.5 py-1">{activePath.level}</span>
                    <span className="rounded-full bg-white/20 px-2.5 py-1">
                      {activePath.duration}
                    </span>
                  </div>
                </div>
                <div className="p-8 max-h-[60vh] overflow-y-auto">
                  <p className="text-sm text-ink-muted">{activePath.description}</p>
                  <div className="mt-6 grid sm:grid-cols-2 gap-6">
                    <ModalList title="Skills you'll master" items={activePath.skills} />
                    <ModalList title="Tools" items={activePath.tools} />
                    <ModalList title="Projects" items={activePath.projects} />
                    <ModalList title="Careers" items={activePath.careers} />
                  </div>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link
                      to={`/tracks/${track.slug}/${activePath.slug}`}
                      className="inline-flex items-center gap-2 rounded-full bg-ink text-background px-5 py-2.5 text-sm font-semibold hover:bg-primary transition"
                    >
                      Full path details <ArrowUpRight className="size-4" />
                    </Link>
                    <Link
                      to={
                        activePath.courseSlug
                          ? `/enroll/${activePath.courseSlug}`
                          : "/register"
                      }
                      className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold hover:border-ink transition"
                    >
                      Apply to path
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </SiteLayout>
  );
}

function Stat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-background/80 backdrop-blur p-4">
      <div className="text-[11px] uppercase tracking-wider text-ink-muted font-semibold inline-flex items-center gap-1.5">
        {icon} {label}
      </div>
      <div className="mt-1 font-display font-semibold text-ink">{value}</div>
    </div>
  );
}

function ModalList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-wider text-ink-muted font-semibold">{title}</p>
      <ul className="mt-2 space-y-1.5">
        {items.map((s) => (
          <li key={s} className="flex items-start gap-2 text-sm">
            <CheckCircle2 className="size-4 text-primary shrink-0 mt-0.5" />
            <span>{s}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}