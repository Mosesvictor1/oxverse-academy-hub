import { Link, useParams } from "react-router-dom";
import { SiteLayout, SectionEyebrow } from "@/components/site/SiteLayout";
import { SEO } from "@/components/site/SEO";
import { getBlogPost, blogPosts } from "@/lib/blog";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function BlogPostPage() {
  const { slug = "" } = useParams();
  const post = getBlogPost(slug);

  if (!post) {
    return (
      <SiteLayout>
        <SEO title="Post not found — OxVerse Blog" />
        <section className="mx-auto max-w-3xl px-6 py-32 text-center">
          <h1 className="font-display text-4xl font-bold tracking-tighter">Post not found</h1>
          <p className="mt-4 text-ink-muted">The article you're looking for doesn't exist.</p>
          <Link to="/blog" className="mt-8 inline-flex items-center gap-2 text-primary font-medium">
            <ArrowLeft className="size-4" /> Back to blog
          </Link>
        </section>
      </SiteLayout>
    );
  }

  const idx = blogPosts.findIndex((p) => p.slug === post.slug);
  const next = blogPosts[(idx + 1) % blogPosts.length];

  return (
    <SiteLayout>
      <SEO title={`${post.title} — OxVerse Blog`} description={post.excerpt} />

      <article className="mx-auto max-w-3xl px-6 pt-24 pb-16">
        <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-primary transition">
          <ArrowLeft className="size-4" /> All posts
        </Link>

        <header className="mt-8">
          <SectionEyebrow>{post.category}</SectionEyebrow>
          <h1 className="mt-6 font-display text-4xl md:text-6xl font-bold tracking-tighter text-balance">
            {post.title}
          </h1>
          <p className="mt-6 text-lg text-ink-muted text-pretty">{post.excerpt}</p>
          <div className="mt-8 flex items-center gap-3 text-sm text-ink-muted">
            <span className="font-medium text-foreground">{post.author}</span>
            <span className="size-1 rounded-full bg-border" />
            <span>{post.date}</span>
            <span className="size-1 rounded-full bg-border" />
            <span>{post.readTime}</span>
          </div>
        </header>

        <div className="mt-12 space-y-10">
          {post.content.map((section, i) => (
            <section key={i}>
              {section.heading && (
                <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight mb-4">
                  {section.heading}
                </h2>
              )}
              <div className="space-y-4">
                {section.paragraphs.map((p, j) => (
                  <p key={j} className="text-base md:text-lg leading-relaxed text-foreground/90 text-pretty">
                    {p}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </article>

      <section className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-3xl px-6 py-16">
          <p className="text-xs uppercase tracking-wider text-ink-muted font-medium">Read next</p>
          <Link
            to={`/blog/${next.slug}`}
            className="group mt-4 flex items-start justify-between gap-6 rounded-3xl border border-border bg-background p-8 hover:border-primary transition"
          >
            <div>
              <p className="text-xs uppercase tracking-wider text-primary font-medium">{next.date}</p>
              <h3 className="mt-3 font-display text-2xl font-bold group-hover:text-primary transition">
                {next.title}
              </h3>
              <p className="mt-2 text-ink-muted text-pretty">{next.excerpt}</p>
            </div>
            <ArrowRight className="size-6 shrink-0 mt-2 text-ink-muted group-hover:text-primary group-hover:translate-x-1 transition" />
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}