import { SiteLayout, SectionEyebrow } from "@/components/site/SiteLayout";
import { SEO } from "@/components/site/SEO";
import hero from "@/assets/hero-oxverse-student.jpg";
import promo from "@/assets/promo-student-1.jpg";
import campus from "@/assets/campus.jpg";
import students from "@/assets/students-group.jpg";
import frontend from "@/assets/courses/frontend.jpg";
import ai from "@/assets/courses/ai.jpg";
import uiux from "@/assets/courses/uiux.jpg";
import data from "@/assets/courses/data.jpg";

export default function GalleryPage() {
  const imgs = [hero, promo, campus, students, frontend, ai, uiux, data];
  return (
    <SiteLayout>
      <SEO title="Gallery — OxVerse Academy" description="Inside our Lagos campus — students, instructors, and life at OxVerse." />
      <section className="mx-auto max-w-7xl px-6 pt-24 pb-10">
        <SectionEyebrow>Gallery</SectionEyebrow>
        <h1 className="mt-6 font-display text-5xl md:text-6xl font-bold tracking-tighter">Life at OxVerse.</h1>
      </section>
      <section className="mx-auto max-w-7xl px-6 pb-24 columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:_balance]">
        {imgs.map((src, i) => (
          <div key={i} className="mb-4 break-inside-avoid rounded-3xl overflow-hidden">
            <img src={src} alt="" loading="lazy" className="w-full h-auto" />
          </div>
        ))}
      </section>
    </SiteLayout>
  );
}
