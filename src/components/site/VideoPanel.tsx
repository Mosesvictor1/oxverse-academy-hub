import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Clock, Play, Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { SectionEyebrow } from "@/components/site/SiteLayout";
import {
  getPublishedVideos,
  videoCategories,
  type Video,
} from "@/lib/videos";

function VideoPlayer({ src, poster, title }: { src: string; poster: string; title: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    return () => {
      el?.pause();
    };
  }, []);

  return (
    <video
      ref={ref}
      controls
      playsInline
      preload="metadata"
      poster={poster}
      aria-label={title}
      className="w-full aspect-video rounded-2xl bg-black"
    >
      <source src={src} type="video/mp4" />
      Your browser does not support video playback.
    </video>
  );
}

export function VideoPanel() {
  const published = getPublishedVideos();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof videoCategories)[number]>("All");
  const [active, setActive] = useState<Video | null>(null);

  const filtered = useMemo(() => {
    return published.filter((v) => {
      const matchesQuery =
        query === "" ||
        (v.title + v.description + v.category).toLowerCase().includes(query.toLowerCase());
      const matchesCategory = category === "All" || v.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [published, query, category]);

  if (published.length === 0) {
    return (
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <SectionEyebrow>Video library</SectionEyebrow>
        <h2 className="mt-6 font-display text-3xl md:text-4xl font-bold tracking-tight text-balance">
          Learn with OxVerse.
        </h2>
        <p className="mt-3 max-w-2xl text-ink-muted text-pretty">
          Free educational videos from our instructors and campus. New lessons are added regularly.
        </p>
        <div className="mt-10 rounded-3xl border border-dashed border-border bg-muted/30 p-10 md:p-14 text-center">
          <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Play className="size-6 ml-0.5" />
          </div>
          <p className="mt-5 font-display text-xl font-semibold">Videos coming soon</p>
          <p className="mt-2 text-sm text-ink-muted max-w-md mx-auto text-pretty">
            Free lessons from our instructors are on the way. Check back shortly.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-6 pb-20">
      <SectionEyebrow>Video library</SectionEyebrow>
      <h2 className="mt-6 font-display text-3xl md:text-4xl font-bold tracking-tight text-balance">
        Learn with OxVerse.
      </h2>
      <p className="mt-3 max-w-2xl text-ink-muted text-pretty">
        Free educational videos from our instructors. Watch anytime, no sign-up required.
      </p>

      <div className="mt-8 rounded-3xl border border-border bg-background p-4 md:p-5">
        <div className="relative mb-4">
          <Search className="size-4 absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search videos…"
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-muted/60 focus:bg-background border border-transparent focus:border-primary outline-none transition"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {videoCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                category === cat
                  ? "bg-ink text-background"
                  : "border border-border text-ink-muted hover:border-ink hover:text-ink"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-10 text-center text-ink-muted">No videos match your search.</p>
      ) : (
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((video, i) => (
            <motion.button
              key={video.slug}
              type="button"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 6) * 0.05 }}
              onClick={() => setActive(video)}
              className="group text-left rounded-3xl overflow-hidden border border-border bg-background hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={video.poster}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 size-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <span className="absolute top-4 left-4 inline-flex items-center rounded-full bg-white/95 backdrop-blur px-3 py-1 text-[11px] font-semibold text-primary uppercase tracking-wider">
                  {video.category}
                </span>
                <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-black/60 backdrop-blur px-3 py-1 text-xs font-medium text-white">
                  <Clock className="size-3.5" />
                  {video.duration}
                </span>
                <span className="absolute inset-0 grid place-items-center">
                  <span className="flex size-14 items-center justify-center rounded-full bg-white/95 text-primary shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="size-6 ml-0.5" fill="currentColor" />
                  </span>
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg font-bold group-hover:text-primary transition line-clamp-2">
                  {video.title}
                </h3>
                <p className="mt-2 text-sm text-ink-muted line-clamp-2">{video.description}</p>
              </div>
            </motion.button>
          ))}
        </div>
      )}

      <Dialog open={active !== null} onOpenChange={(open) => !open && setActive(null)}>
        <DialogContent className="max-w-4xl w-[calc(100%-2rem)] p-0 gap-0 overflow-hidden sm:rounded-3xl">
          {active && (
            <>
              <DialogTitle className="sr-only">{active.title}</DialogTitle>
              <DialogDescription className="sr-only">{active.description}</DialogDescription>
              <div className="p-4 md:p-6">
                <VideoPlayer src={active.src} poster={active.poster} title={active.title} />
              </div>
              <div className="border-t border-border px-5 py-5 md:px-6 md:py-6">
                <p className="text-xs font-medium uppercase tracking-wider text-primary">
                  {active.category}
                </p>
                <h3 className="mt-1 font-display text-xl md:text-2xl font-bold">{active.title}</h3>
                <p className="mt-2 text-sm text-ink-muted text-pretty">{active.description}</p>
                {active.courseSlug && (
                  <Link
                    to={`/courses/${active.courseSlug}`}
                    onClick={() => setActive(null)}
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                  >
                    View related course <ArrowRight className="size-4" />
                  </Link>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
