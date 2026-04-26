import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, SectionEyebrow } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/testimonials")({
  head: () => ({
    meta: [
      { title: "Testimonials — OxVerse Academy" },
      { name: "description", content: "Hear from OxVerse graduates working at top companies across Africa and beyond." },
    ],
  }),
  component: TestimonialsPage,
});

const t = [
  { name: "Tobi Adelaja", role: "Frontend Engineer @ Plana", quote: "OxVerse didn't just teach me to code — they taught me to think like an engineer. Six months in, I landed a remote role at a YC startup." },
  { name: "Amara Nwosu", role: "Product Designer @ Flutterwave", quote: "The instructors are working professionals who actually care. The mentorship in-person made all the difference for me." },
  { name: "Kola Ibrahim", role: "Mobile Engineer @ Andela", quote: "Project-based learning meant I left with a real portfolio, not just certificates." },
  { name: "Zara Mohammed", role: "AI Engineer @ InstaDeep", quote: "From total beginner to building production AI features in 4 months. OxVerse changed my life." },
];

function TestimonialsPage() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-7xl px-6 pt-24 pb-10">
        <SectionEyebrow>Testimonials</SectionEyebrow>
        <h1 className="mt-6 font-display text-5xl md:text-6xl font-bold tracking-tighter">Stories from our alumni.</h1>
      </section>
      <section className="mx-auto max-w-7xl px-6 pb-24 grid md:grid-cols-2 gap-6">
        {t.map((x, i) => (
          <figure key={i} className="rounded-3xl border border-border p-8 bg-background">
            <blockquote className="font-display text-xl leading-snug text-pretty">"{x.quote}"</blockquote>
            <figcaption className="mt-6 flex items-center gap-3">
              <div className="size-12 rounded-full bg-gradient-to-br from-purple-300 to-purple-700" />
              <div>
                <p className="font-semibold">{x.name}</p>
                <p className="text-sm text-ink-muted">{x.role}</p>
              </div>
            </figcaption>
          </figure>
        ))}
      </section>
    </SiteLayout>
  );
}
