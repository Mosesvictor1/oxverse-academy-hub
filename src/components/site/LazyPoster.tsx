import { useEffect, useRef, useState } from "react";

type LazyPosterProps = {
  src: string;
  alt?: string;
  className?: string;
  rootMargin?: string;
  width?: number;
  height?: number;
  /** card = fixed cover/contain box; photo = natural width in masonry */
  layout?: "card" | "photo";
};

export function LazyPoster({
  src,
  alt = "",
  className = "",
  rootMargin = "280px",
  width = 320,
  height = 569,
  layout = "card",
}: LazyPosterProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold: 0.01 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  const isPhoto = layout === "photo";

  return (
    <div
      ref={rootRef}
      className={
        isPhoto
          ? `relative w-full min-h-[8rem] bg-muted/40 ${className}`
          : `relative size-full ${className}`
      }
    >
      {!loaded && (
        <div
          className={`bg-muted/80 animate-pulse ${isPhoto ? "absolute inset-0" : "absolute inset-0"}`}
          aria-hidden
        />
      )}
      {shouldLoad && (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          decoding="async"
          fetchPriority="low"
          onLoad={() => setLoaded(true)}
          className={
            isPhoto
              ? `relative z-[1] block w-full h-auto transition-opacity duration-300 ${
                  loaded ? "opacity-100" : "opacity-0"
                }`
              : `absolute inset-0 size-full object-contain transition-opacity duration-300 ${
                  loaded ? "opacity-100" : "opacity-0"
                }`
          }
        />
      )}
    </div>
  );
}
