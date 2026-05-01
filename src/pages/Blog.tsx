import { Link } from "react-router-dom";
import { SiteLayout, SectionEyebrow } from "@/components/site/SiteLayout";
import { SEO } from "@/components/site/SEO";
import { blogPosts } from "@/lib/blog";
import { ArrowRight } from "lucide-react";

export default function BlogPage() {
  return (
    <SiteLayout>
      <SEO title="Blog — OxVerse Academy" description="Stories, tutorials, and insights from Africa's premium tech academy." />
      <section className="mx-auto max-w-5xl px-6 pt-24 pb-12">
        <SectionEyebrow>Blog</SectionEyebrow>
        <h1 className="mt-6 font-display text-5xl md:text-6xl font-bold tracking-tighter">Stories from the academy.</h1>
      </section>
      <section className="mx-auto max-w-5xl px-6 pb-24 grid gap-6">
        {blogPosts.map((p) => (
          <Link
            key={p.slug}
            to={`/blog/${p.slug}`}
            className="group rounded-3xl border border-border p-8 hover:border-primary transition flex flex-col"
          >
            <div className="flex items-center gap-3 text-xs uppercase tracking-wider font-medium">
              <span className="text-primary">{p.date}</span>
              <span className="size-1 rounded-full bg-border" />
              <span className="text-ink-muted">{p.category}</span>
              <span className="size-1 rounded-full bg-border" />
              <span className="text-ink-muted">{p.readTime}</span>
            </div>
            <h2 className="mt-3 font-display text-2xl md:text-3xl font-bold group-hover:text-primary transition text-balance">
              {p.title}
            </h2>
            <p className="mt-3 text-ink-muted text-pretty">{p.excerpt}</p>
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary">
              Read article <ArrowRight className="size-4 group-hover:translate-x-1 transition" />
            </span>
          </Link>
        ))}
      </section>
    </SiteLayout>
  );
}
