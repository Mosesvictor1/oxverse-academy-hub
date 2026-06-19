import { SiteLayout, SectionEyebrow } from "@/components/site/SiteLayout";
import { SEO } from "@/components/site/SEO";
import { VideoPanel } from "@/components/site/VideoPanel";
import hero from "@/assets/hero-oxverse-student.jpg";
import promo from "@/assets/promo-student-1.jpg";
import campus from "@/assets/campus.jpg";
import students from "@/assets/students-group.jpg";
import frontend from "@/assets/courses/frontend.jpg";
import ai from "@/assets/courses/ai.jpg";
import uiux from "@/assets/courses/uiux.jpg";
import data from "@/assets/courses/data.jpg";

const photos = [
  { src: hero, alt: "OxVerse student at campus" },
  { src: promo, alt: "Student learning session" },
  { src: campus, alt: "OxVerse Lagos campus" },
  { src: students, alt: "OxVerse student group" },
  { src: frontend, alt: "Frontend development class" },
  { src: ai, alt: "AI and machine learning session" },
  { src: uiux, alt: "UI/UX design workshop" },
  { src: data, alt: "Data analytics training" },
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
          {photos.map((photo, i) => (
            <div key={i} className="mb-4 break-inside-avoid rounded-3xl overflow-hidden border border-border">
              <img src={photo.src} alt={photo.alt} loading="lazy" className="w-full h-auto" />
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
