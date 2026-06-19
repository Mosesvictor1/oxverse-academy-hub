import { Link } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Captions, ChevronLeft, ChevronRight, Clock, Play, Search, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { SectionEyebrow } from "@/components/site/SiteLayout";
import {
  categoryOrder,
  gallerySeriesTabs,
  getPublishedVideos,
  seriesMeta,
  type Video,
  type VideoCategory,
  type VideoOrientation,
  type VideoSeries,
} from "@/lib/videos";

/** Uniform card width across all breakpoints */
const CARD_CLASS = "w-[148px] sm:w-[160px] shrink-0";

function VideoPlayer({
  src,
  poster,
  title,
  orientation,
  captions,
  hasCaptions,
}: {
  src: string;
  poster: string;
  title: string;
  orientation: VideoOrientation;
  captions?: string;
  hasCaptions: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    return () => {
      el?.pause();
    };
  }, []);

  const isPortrait = orientation === "portrait";

  return (
    <div className="space-y-3">
      <div
        className={`mx-auto overflow-hidden rounded-2xl bg-black ${
          isPortrait
            ? "w-full max-w-[280px] aspect-[9/16] max-h-[min(75vh,640px)]"
            : "w-full max-w-3xl aspect-video"
        }`}
      >
        <video
          ref={ref}
          controls
          playsInline
          preload="metadata"
          poster={poster}
          aria-label={title}
          className="size-full object-contain"
        >
          <source src={src} type="video/mp4" />
          {captions && (
            <track kind="captions" src={captions} srcLang="en" label="English" default />
          )}
          Your browser does not support video playback.
        </video>
      </div>
      {hasCaptions && (
        <p className="flex items-center justify-center gap-1.5 text-xs text-ink-muted">
          <Captions className="size-3.5" />
          Captions available — use the CC button in the player
        </p>
      )}
    </div>
  );
}

function CompactVideoCard({ video, onPlay }: { video: Video; onPlay: () => void }) {
  return (
    <button
      type="button"
      onClick={onPlay}
      className={`group text-left rounded-2xl overflow-hidden border border-border/80 bg-background hover:border-primary/30 transition-colors ${CARD_CLASS}`}
    >
      <div className="relative aspect-[9/16] w-full overflow-hidden bg-black">
        <img
          src={video.poster}
          alt=""
          loading="lazy"
          className="absolute inset-0 size-full object-contain"
        />
        <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
        <div className="absolute top-2 left-2 flex items-center gap-1">
          {video.hasCaptions && (
            <span
              className="inline-flex items-center gap-0.5 rounded-md bg-black/65 backdrop-blur px-1.5 py-0.5 text-[10px] font-bold text-white tracking-wide"
              title="Captions available"
            >
              <Captions className="size-2.5" />
              CC
            </span>
          )}
        </div>
        <span className="absolute bottom-2 right-2 inline-flex items-center gap-0.5 rounded-md bg-black/55 backdrop-blur px-1.5 py-0.5 text-[10px] font-medium text-white">
          <Clock className="size-2.5" />
          {video.duration}
        </span>
        <span className="absolute inset-0 grid place-items-center opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="flex size-9 items-center justify-center rounded-full bg-white/90 text-primary shadow-md">
            <Play className="size-4 ml-0.5" fill="currentColor" />
          </span>
        </span>
      </div>
      <div className="flex min-h-[3.25rem] flex-col justify-center px-2.5 py-2.5">
        <p className="text-xs font-semibold leading-snug line-clamp-2 group-hover:text-primary transition-colors">
          {video.title}
        </p>
      </div>
    </button>
  );
}

function ScrollRow({
  label,
  videos,
  onPlay,
}: {
  label: string;
  videos: Video[];
  onPlay: (video: Video) => void;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  function updateScrollState() {
    const el = trackRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }

  useEffect(() => {
    updateScrollState();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollState, { passive: true });
    const ro = new ResizeObserver(updateScrollState);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      ro.disconnect();
    };
  }, [videos]);

  function scrollBy(delta: number) {
    trackRef.current?.scrollBy({ left: delta, behavior: "smooth" });
  }

  if (videos.length === 0) return null;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-4 px-0.5">
        <h4 className="text-sm font-semibold text-ink-muted">{label}</h4>
        {videos.length > 3 && (
          <div className="hidden sm:flex items-center gap-1">
            <button
              type="button"
              onClick={() => scrollBy(-340)}
              disabled={!canScrollLeft}
              aria-label={`Scroll ${label} left`}
              className="inline-flex size-8 items-center justify-center rounded-full border border-border text-ink-muted hover:text-ink hover:border-ink disabled:opacity-30 disabled:pointer-events-none transition"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollBy(340)}
              disabled={!canScrollRight}
              aria-label={`Scroll ${label} right`}
              className="inline-flex size-8 items-center justify-center rounded-full border border-border text-ink-muted hover:text-ink hover:border-ink disabled:opacity-30 disabled:pointer-events-none transition"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        )}
      </div>
      <div
        ref={trackRef}
        className="flex gap-3 overflow-x-auto pb-1 snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {videos.map((video) => (
          <div key={video.slug} className="snap-start">
            <CompactVideoCard video={video} onPlay={() => onPlay(video)} />
          </div>
        ))}
      </div>
    </div>
  );
}

function groupByCategory(videos: Video[]): { category: VideoCategory; videos: Video[] }[] {
  const map = new Map<VideoCategory, Video[]>();
  for (const v of videos) {
    const list = map.get(v.category) ?? [];
    list.push(v);
    map.set(v.category, list);
  }
  return categoryOrder
    .filter((cat) => map.has(cat))
    .map((category) => ({ category, videos: map.get(category)! }));
}

function SeriesBrowse({
  series,
  videos,
  onPlay,
}: {
  series: VideoSeries;
  videos: Video[];
  onPlay: (video: Video) => void;
}) {
  const meta = seriesMeta[series];
  const byCategory = groupByCategory(videos);
  const captionedCount = videos.filter((v) => v.hasCaptions).length;

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <p className="text-sm text-ink-muted max-w-2xl text-pretty">{meta.blurb}</p>
        {captionedCount > 0 && (
          <p className="inline-flex items-center gap-1.5 text-xs text-ink-muted shrink-0">
            <Captions className="size-3.5" />
            {captionedCount} with captions
          </p>
        )}
      </div>

      {byCategory.map(({ category, videos: row }) => (
        <ScrollRow key={category} label={category} videos={row} onPlay={onPlay} />
      ))}
    </div>
  );
}

function SearchResults({
  results,
  onPlay,
  onClear,
}: {
  results: Video[];
  onPlay: (video: Video) => void;
  onClear: () => void;
}) {
  const bySeries = gallerySeriesTabs
    .map((series) => ({
      series,
      videos: results.filter((v) => v.series === series),
    }))
    .filter((g) => g.videos.length > 0);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-ink-muted">
          {results.length} result{results.length === 1 ? "" : "s"}
        </p>
        <button
          type="button"
          onClick={onClear}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
        >
          <X className="size-3.5" /> Clear search
        </button>
      </div>
      {bySeries.map(({ series, videos }) => (
        <ScrollRow key={series} label={series} videos={videos} onPlay={onPlay} />
      ))}
    </div>
  );
}

export function VideoPanel() {
  const published = getPublishedVideos();
  const [query, setQuery] = useState("");
  const [activeSeries, setActiveSeries] = useState<(typeof gallerySeriesTabs)[number]>(
    "Course explainers",
  );
  const [active, setActive] = useState<Video | null>(null);

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return published.filter((v) =>
      (v.title + v.description + v.category + v.series).toLowerCase().includes(q),
    );
  }, [published, query]);

  const seriesVideos = useMemo(
    () => published.filter((v) => v.series === activeSeries),
    [published, activeSeries],
  );

  const isSearching = query.trim().length > 0;

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
        Browse by series — one topic at a time. {published.length} free videos, no sign-up required.
      </p>

      <div className="mt-8 relative max-w-md">
        <Search className="size-4 absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search all videos…"
          className="w-full pl-11 pr-4 py-2.5 rounded-full bg-muted/50 focus:bg-background border border-border/60 focus:border-primary/40 outline-none transition text-sm"
        />
      </div>

      {!isSearching && (
        <div className="mt-6 -mx-6 px-6 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <div className="inline-flex gap-1 rounded-full border border-border bg-muted/40 p-1 min-w-max">
            {gallerySeriesTabs.map((tab) => {
              const count = published.filter((v) => v.series === tab).length;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveSeries(tab)}
                  className={`rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition ${
                    activeSeries === tab
                      ? "bg-background text-ink shadow-sm"
                      : "text-ink-muted hover:text-ink"
                  }`}
                >
                  {tab}
                  <span className="ml-1.5 text-xs opacity-60">{count}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="mt-8">
        {isSearching ? (
          searchResults.length === 0 ? (
            <p className="text-sm text-ink-muted">No videos match &ldquo;{query}&rdquo;.</p>
          ) : (
            <SearchResults
              results={searchResults}
              onPlay={setActive}
              onClear={() => setQuery("")}
            />
          )
        ) : (
          <SeriesBrowse series={activeSeries} videos={seriesVideos} onPlay={setActive} />
        )}
      </div>

      <Dialog open={active !== null} onOpenChange={(open) => !open && setActive(null)}>
        <DialogContent
          className={`w-[calc(100%-2rem)] p-0 gap-0 overflow-hidden sm:rounded-3xl ${
            active?.orientation === "portrait" ? "max-w-md" : "max-w-3xl"
          }`}
        >
          {active && (
            <>
              <DialogTitle className="sr-only">{active.title}</DialogTitle>
              <DialogDescription className="sr-only">{active.description}</DialogDescription>
              <div className="p-4 md:p-6">
                <VideoPlayer
                  src={active.src}
                  poster={active.poster}
                  title={active.title}
                  orientation={active.orientation}
                  captions={active.captions}
                  hasCaptions={active.hasCaptions}
                />
              </div>
              <div className="border-t border-border px-5 py-5 md:px-6 md:py-6">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-xs font-medium uppercase tracking-wider text-primary">
                    {active.series} · {active.category}
                  </p>
                  {active.hasCaptions && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-ink-muted">
                      <Captions className="size-3" /> Captions
                    </span>
                  )}
                </div>
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
