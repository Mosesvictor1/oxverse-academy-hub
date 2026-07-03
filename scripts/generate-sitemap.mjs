import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const ROOT = resolve(new URL("..", import.meta.url).pathname);
const SITE_URL = "https://oxverse.academy";

const read = (path) => readFileSync(resolve(ROOT, path), "utf8");
const slugsFrom = (path) => [...read(path).matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);

const courseSlugs = slugsFrom("src/lib/courses.ts");
const blogSlugs = slugsFrom("src/lib/blog.ts");
const eventSlugs = slugsFrom("src/lib/events.ts");

const routes = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/about", changefreq: "monthly", priority: "0.8" },
  { path: "/faculty", changefreq: "monthly", priority: "0.7" },
  { path: "/courses", changefreq: "weekly", priority: "0.9" },
  ...courseSlugs.map((slug) => ({
    path: `/courses/${slug}`,
    changefreq: "monthly",
    priority: "0.8",
  })),
  ...courseSlugs.map((slug) => ({
    path: `/courses/${slug}/roadmap`,
    changefreq: "monthly",
    priority: "0.7",
  })),
  { path: "/events", changefreq: "weekly", priority: "0.7" },
  ...eventSlugs.map((slug) => ({
    path: `/events/${slug}`,
    changefreq: "weekly",
    priority: "0.8",
  })),
  { path: "/blog", changefreq: "weekly", priority: "0.7" },
  ...blogSlugs.map((slug) => ({
    path: `/blog/${slug}`,
    changefreq: "monthly",
    priority: "0.6",
  })),
  { path: "/gallery", changefreq: "monthly", priority: "0.6" },
  { path: "/testimonials", changefreq: "monthly", priority: "0.6" },
  { path: "/faq", changefreq: "monthly", priority: "0.6" },
  { path: "/contact", changefreq: "monthly", priority: "0.7" },
  { path: "/connect", changefreq: "monthly", priority: "0.6" },
  { path: "/waitlist", changefreq: "weekly", priority: "0.5" },
  { path: "/register", changefreq: "weekly", priority: "0.7" },
  { path: "/ambassador", changefreq: "monthly", priority: "0.6" },
  { path: "/careers", changefreq: "weekly", priority: "0.7" },
];

const seen = new Set();
const urls = routes.filter(({ path }) => {
  if (seen.has(path)) return false;
  seen.add(path);
  return true;
});

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    ({ path, changefreq, priority }) =>
      `  <url><loc>${SITE_URL}${path}</loc><changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`,
  )
  .join("\n")}
</urlset>
`;

writeFileSync(resolve(ROOT, "public/sitemap.xml"), xml);
console.log(`Generated ${urls.length} sitemap URLs.`);
