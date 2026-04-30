import { Link } from "react-router-dom";
import { SiteLayout, SectionEyebrow } from "@/components/site/SiteLayout";
import { SEO } from "@/components/site/SEO";

const posts = [
  { slug: "1", title: "How we built a 92% placement rate", excerpt: "The OxVerse career playbook — mentorship, mock interviews, and direct hiring pipelines.", date: "Apr 12, 2026" },
  { slug: "2", title: "Why physical classrooms still win", excerpt: "In-person learning compounds. Here's what online platforms can't replicate.", date: "Mar 28, 2026" },
  { slug: "3", title: "From zero to React engineer in 16 weeks", excerpt: "A week-by-week breakdown of our Frontend Development cohort.", date: "Mar 14, 2026" },
];

export default function BlogPage() {
  return (
    <SiteLayout>
      <SEO title="Blog — OxVerse Academy" description="Stories, tutorials, and insights from Africa's premium tech academy." />
      <section className="mx-auto max-w-5xl px-6 pt-24 pb-12">
        <SectionEyebrow>Blog</SectionEyebrow>
        <h1 className="mt-6 font-display text-5xl md:text-6xl font-bold tracking-tighter">Stories from the academy.</h1>
      </section>
      <section className="mx-auto max-w-5xl px-6 pb-24 grid gap-6">
        {posts.map((p) => (
          <Link key={p.slug} to="/blog" className="group rounded-3xl border border-border p-8 hover:border-primary transition">
            <p className="text-xs uppercase tracking-wider text-primary font-medium">{p.date}</p>
            <h2 className="mt-3 font-display text-2xl md:text-3xl font-bold group-hover:text-primary transition">{p.title}</h2>
            <p className="mt-3 text-ink-muted text-pretty">{p.excerpt}</p>
          </Link>
        ))}
      </section>
    </SiteLayout>
  );
}
