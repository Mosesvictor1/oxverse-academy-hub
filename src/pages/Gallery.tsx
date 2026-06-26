import { SiteLayout, SectionEyebrow } from "@/components/site/SiteLayout";
import { SEO } from "@/components/site/SEO";
import { VideoPanel } from "@/components/site/VideoPanel";
import { LazyPoster } from "@/components/site/LazyPoster";

const photos = [
  { src: "/gallery/hero-oxverse-student.jpg", alt: "OxVerse student at campus" },
  { src: "/gallery/promo-student-1.jpg", alt: "Student learning session" },
  { src: "/gallery/campus.jpg", alt: "OxVerse Lagos campus" },
  { src: "/gallery/students-group.jpg", alt: "OxVerse student group" },
  { src: "/gallery/courses-frontend.jpg", alt: "Frontend development class" },
  { src: "/gallery/courses-ai.jpg", alt: "AI and machine learning session" },
  { src: "/gallery/courses-uiux.jpg", alt: "UI/UX design workshop" },
  { src: "/gallery/courses-data.jpg", alt: "Data analytics training" },
];

export default function GalleryPage() {
  return (
    <SiteLayout>
      <SEO
        title="Gallery, OxVerse Academy"
        description="Watch free educational videos and explore life at our Lagos campus, students, instructors, and community."
      />
      <section className="relative">
        <div className="absolute inset-0 grid-pattern opacity-50 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        <div className="absolute inset-0 radial-purple" />
        <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-12 lg:pt-28">
          <SectionEyebrow>Gallery</SectionEyebrow>
          <h1 className="mt-6 font-display text-5xl md:text-7xl font-bold tracking-tighter text-balance max-w-3xl">
            Videos & <span className="gradient-text">campus life.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-ink-muted text-pretty">
            Watch free lessons from our instructors, then explore photos from inside OxVerse.
          </p>
        </div>
      </section>

      <VideoPanel />

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <SectionEyebrow>Photos</SectionEyebrow>
        <h2 className="mt-6 font-display text-3xl md:text-4xl font-bold tracking-tight">
          Life at OxVerse.
        </h2>
        <div className="mt-10 columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:_balance]">
          {photos.map((photo) => (
            <div
              key={photo.src}
              className="mb-4 break-inside-avoid rounded-3xl overflow-hidden border border-border bg-muted/40"
            >
              <LazyPoster
                src={photo.src}
                alt={photo.alt}
                layout="photo"
                rootMargin="400px"
                width={960}
                height={640}
              />
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
