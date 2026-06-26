import { motion } from "framer-motion";
import { Github, Globe, ExternalLink, BookOpen } from "lucide-react";
import { SiteLayout, SectionEyebrow } from "@/components/site/SiteLayout";
import { SEO } from "@/components/site/SEO";
import mosesImg from "@/assets/moses.png";

type LinkDef = { label: string; icon: "globe" | "github" | "external" | "book"; href: string };

const tutors: {
  name: string;
  handle?: string;
  roles: string[];
  bio: string;
  image: string | null;
  initials: string;
  gradient: string;
  links: LinkDef[];
}[] = [
  {
    name: "OneTrueHomie",
    roles: ["AI Instructor", "Blockchain Developer", "Software Engineer"],
    bio: "Full-stack engineer and blockchain developer with deep expertise in AI systems, smart contracts, and Web3 infrastructure. Leads AI Engineering, Fullstack, and Web3 tracks at OxVerse Academy.",
    image: null,
    initials: "OTH",
    gradient: "from-violet-500 via-purple-600 to-indigo-700",
    links: [
      { label: "Portfolio", icon: "globe", href: "https://OneTrueHomie.dev" },
      { label: "GitHub", icon: "github", href: "https://github.com/Officialhomie" },
      { label: "Talent", icon: "external", href: "https://talent.app/onetruehomie" },
      { label: "Devfolio", icon: "external", href: "https://devfolio.co/@OneTrueHomie" },
    ],
  },
  {
    name: "Modesta Uzo",
    roles: ["Data Analytics Tutor"],
    bio: "Data analyst and educator with a passion for turning raw data into actionable insight. Leads the Data Analysis and visualization track at OxVerse, bridging statistical thinking with real-world applications.",
    image: null,
    initials: "MU",
    gradient: "from-emerald-500 via-teal-600 to-cyan-700",
    links: [
      { label: "Medium", icon: "book", href: "https://medium.com/@ModestaUZO" },
    ],
  },
  {
    name: "Victor Moses",
    roles: ["Mobile App Developer", "Software Engineer", "UI/UX & Graphics Tutor"],
    bio: "Mobile-first engineer and visual designer crafting beautiful, performant products. Leads Mobile Development, UI/UX Design, and Graphic Design tracks at OxVerse Academy.",
    image: mosesImg,
    initials: "VM",
    gradient: "from-blue-500 via-indigo-600 to-violet-700",
    links: [
      { label: "Portfolio", icon: "globe", href: "https://moses-dev.vercel.app/" },
    ],
  },
  {
    name: "Igwilo Chibueze",
    roles: ["Video Editor", "Graphics Engineer"],
    bio: "Visual storyteller and motion graphics artist with a sharp eye for craft. Brings brands and ideas to life through high-quality video production and graphic design at OxVerse Academy.",
    image: null,
    initials: "IC",
    gradient: "from-orange-500 via-amber-500 to-yellow-600",
    links: [
      { label: "Works", icon: "external", href: "https://drive.google.com/drive/folders/1G-ncv7DUhXLvUEpf-RmDeF4GWcsfCenK" },
    ],
  },
];

function LinkIcon({ type }: { type: LinkDef["icon"] }) {
  if (type === "github") return <Github className="size-3.5" />;
  if (type === "globe") return <Globe className="size-3.5" />;
  if (type === "book") return <BookOpen className="size-3.5" />;
  return <ExternalLink className="size-3.5" />;
}

export default function FacultyPage() {
  return (
    <SiteLayout>
      <SEO
        title="Our Faculty — OxVerse Academy"
        description="Meet the instructors behind OxVerse Academy — industry professionals teaching AI, blockchain, data analytics, mobile development, UI/UX, and graphics design."
      />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-60 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-16 lg:pt-28">
          <SectionEyebrow>Faculty</SectionEyebrow>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-6 font-display text-5xl md:text-7xl font-bold tracking-tighter text-balance max-w-4xl"
          >
            Taught by people who{" "}
            <span className="gradient-text">actually build</span>.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mt-8 max-w-2xl text-lg text-ink-muted text-pretty"
          >
            Our instructors are active practitioners — engineers, designers, and analysts who
            bring real-world depth into every class at OxVerse Academy.
          </motion.p>
        </div>
      </section>

      {/* Tutor cards */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
          {tutors.map((t, i) => (
            <motion.article
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group flex flex-col rounded-3xl border border-border bg-background overflow-hidden hover:border-primary/40 transition-colors"
            >
              {/* Photo / avatar */}
              <div
                className={`relative aspect-[4/3] bg-gradient-to-br ${t.gradient} overflow-hidden`}
              >
                {t.image ? (
                  <img
                    src={t.image}
                    alt={t.name}
                    className="size-full object-cover object-top"
                    loading="lazy"
                  />
                ) : (
                  <div className="size-full flex items-center justify-center">
                    <span className="font-display text-6xl font-bold text-white/25 select-none tracking-tighter">
                      {t.initials}
                    </span>
                  </div>
                )}
                {/* Role chips overlay */}
                <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
                  {t.roles.map((r) => (
                    <span
                      key={r}
                      className="rounded-full bg-black/50 backdrop-blur-sm px-2.5 py-0.5 text-[11px] font-medium text-white"
                    >
                      {r}
                    </span>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-6 gap-4">
                <div>
                  <h2 className="font-display text-xl font-bold tracking-tight">{t.name}</h2>
                  <p className="mt-3 text-sm text-ink-muted leading-relaxed text-pretty">{t.bio}</p>
                </div>

                {/* Links */}
                <div className="mt-auto flex flex-wrap gap-2 pt-2">
                  {t.links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-ink-muted hover:border-primary hover:text-primary transition-colors"
                    >
                      <LinkIcon type={l.icon} />
                      {l.label}
                    </a>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-ink text-background">
        <div className="mx-auto max-w-7xl px-6 py-24 text-center">
          <SectionEyebrow>
            <span className="text-background/70">Learn from the best</span>
          </SectionEyebrow>
          <h2 className="mt-6 font-display text-4xl md:text-5xl font-bold tracking-tighter">
            Ready to start learning?
          </h2>
          <p className="mt-5 max-w-xl mx-auto text-background/70 text-lg text-pretty">
            Join the next cohort and get direct access to these instructors in a hands-on, physical campus environment.
          </p>
          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <a
              href="/register"
              className="inline-flex items-center gap-2 rounded-full bg-background text-foreground px-7 py-3.5 font-semibold hover:bg-primary hover:text-primary-foreground transition"
            >
              Apply now
            </a>
            <a
              href="/courses"
              className="inline-flex items-center gap-2 rounded-full border border-background/30 text-background/80 px-7 py-3.5 font-semibold hover:border-background hover:text-background transition"
            >
              Browse courses
            </a>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
