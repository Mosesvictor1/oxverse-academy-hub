import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Cpu,
  Users,
  Trophy,
  Zap,
  GraduationCap,
  MapPin,
  ChevronDown,
} from "lucide-react";
import { SiteLayout, SectionEyebrow } from "@/components/site/SiteLayout";
import { SEO } from "@/components/site/SEO";
import { AnimatedNumber } from "@/components/site/AnimatedNumber";
import { EventPopup } from "@/components/site/EventPopup";
import { ReferralPopup } from "@/components/site/ReferralPopup";
import { courses } from "@/lib/courses";
import heroImg from "@/assets/hero-oxverse-student2.png";
import campusImg from "@/assets/campus.jpg";
import abstractImg from "@/assets/promo-student-1.jpg";
import studentsImg from "@/assets/students-group.jpg";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

function HomePage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      name: "OxVerse Academy",
      alternateName: "0xVerse Academy",
      url: "https://oxverse.academy",
      logo: "https://oxverse.academy/oxverseIcon.png",
      description:
        "Africa's premium physical tech academy offering cohort-based, hands-on training in software engineering, design, AI, data, Web3, and digital marketing.",
      address: {
        "@type": "PostalAddress",
        streetAddress: "No 82, Century Bus Stop, Ago Palace Way, Okota",
        addressLocality: "Lagos",
        addressCountry: "NG",
      },
      telephone: "+2348148462776",
      email: "hello@oxverse.academy",
      sameAs: [
        "https://www.tiktok.com/@0xverse_academy",
        "https://x.com/0xvrs",
        "https://www.youtube.com/@0xVerseAcademy",
        "https://www.instagram.com/0xverse.acad",
        "https://www.facebook.com/0xverse.acad",
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      url: "https://oxverse.academy",
      name: "OxVerse Academy",
      potentialAction: {
        "@type": "SearchAction",
        target: "https://oxverse.academy/courses?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
  ];
  return (
    <SiteLayout>
      <SEO
        title="OxVerse Academy — Learn Tech in Lagos. Build a Global Career."
        description="Africa's premium physical tech academy in Lagos. Cohort-based, hands-on training in software engineering, UI/UX, AI, data, Web3, and digital marketing."
        keywords="tech academy Lagos, coding bootcamp Nigeria, learn programming Africa, frontend bootcamp, UI UX course, AI course Lagos, Web3 academy, OxVerse"
        canonical="https://oxverse.academy/"
        jsonLd={jsonLd}
      />
      <Hero />
      <EventPopup />
      <ReferralPopup />
      <Marquee />
      <Stats />
      <WhyOxVerse />
      <FeaturedCourses />
      <Campus />
      {/* <Projects /> */}
      {/* <Testimonials /> */}
      <Careers />
      <FAQ />
      <FinalCTA />
    </SiteLayout>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-60 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <div className="absolute inset-0 radial-purple" />
      <div className="relative mx-auto max-w-7xl px-6 pt-24 pb-20 lg:pt-32 ">
        <div className="grid lg:grid-cols-12 gap-1 items-center">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <SectionEyebrow>New cohort starting May 2026 </SectionEyebrow>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="mt-6 font-display font-bold tracking-tighter text-balance text-[clamp(2.75rem,7vw,5.75rem)] leading-[0.95]"
            >
              Learn Today.
              <br />
              <span className="gradient-text">Build Tomorrow.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="mt-6 max-w-xl text-lg text-ink-muted text-pretty"
            >
              Africa's premium physical tech academy. Hands-on, cohort-based training in
              engineering, design, and AI — taught by world-class instructors at our Lagos campus.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Link
                to="/register"
                className="group inline-flex items-center gap-2 rounded-full bg-ink text-background px-7 py-4 text-base font-semibold hover:bg-primary transition-colors"
              >
                Register now
                <ArrowRight className="size-4 group-hover:translate-x-0.5 transition" />
              </Link>
              <Link
                to="/courses"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 backdrop-blur px-7 py-4 text-base font-semibold hover:border-ink transition-colors"
              >
                Explore Courses
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="mt-12 flex items-center gap-6 text-sm text-ink-muted"
            >
              <div className="flex -space-x-2">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="size-8 rounded-full border-2 border-background bg-gradient-to-br from-purple-200 to-purple-500"
                  />
                ))}
              </div>
              <p>
                <span className="text-ink font-semibold">50+</span> students transformed
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-3xl shadow-2xl shadow-primary/20 overflow-hidden">
              <img
                src={heroImg}
                alt="Student learning at OxVerse Academy"
                className="w-full h-auto object-contain bg-background"
                width={1024}
                height={1280}
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="absolute -left-6 bottom-10 glass rounded-2xl p-4 shadow-xl max-w-[220px] hidden lg:block"
            >
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-xl bg-primary/15 text-primary inline-flex items-center justify-center">
                  <Trophy className="size-5" />
                </div>
                <div>
                  <p className="text-xs text-ink-muted">Placement rate</p>
                  <p className="font-display font-bold text-xl">75%</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="absolute -right-4 top-1 glass rounded-2xl p-4 shadow-xl hidden lg:block"
            >
              <div className="flex items-center gap-2 text-sm">
                <span className="size-2 rounded-full bg-green-500 animate-pulse" />
                <span className="font-medium">Live: 4 cohorts in session</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <div className="mt-20 hidden lg:flex justify-center">
          <ChevronDown className="size-6 text-ink-muted animate-bounce" />
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const items = [
    "React",
    "TypeScript",
    "Node.js",
    "PostgreSQL",
    "Figma",
    "Python",
    "AI/ML",
    "Solidity",
    "AWS",
    "Next.js",
    "Docker",
    "Kubernetes",
  ];
  return (
    <section className="border-y border-primary/30 py-10 overflow-hidden bg-primary text-primary-foreground">
      <div
        className="flex gap-12 animate-[scroll_40s_linear_infinite]"
        style={{ animationName: "scroll" }}
      >
        {[...items, ...items, ...items].map((item, i) => (
          <div
            key={i}
            className="font-display text-2xl md:text-3xl font-semibold text-primary-foreground/90 whitespace-nowrap shrink-0"
          >
            {item} <span className="mx-6 text-primary-foreground/60">✦</span>
          </div>
        ))}
      </div>
      <style>{`@keyframes scroll { from { transform: translateX(0) } to { transform: translateX(-33.333%) } }`}</style>
    </section>
  );
}

function Stats() {
  const stats = [
    { v: 50, s: "+", l: "Students trained" },
    { v: 75, s: "%", l: "Job placement" },
    { v: 5, s: "+", l: "Industry instructors" },
  ];
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-primary to-purple-700 text-primary-foreground">
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="relative mx-auto max-w-7xl px-6 py-24">
        <div className="max-w-2xl mb-14">
          <SectionEyebrow>
            <span className="text-primary-foreground/80">By the numbers</span>
          </SectionEyebrow>
          <h2 className="mt-6 font-display text-4xl md:text-5xl font-bold tracking-tighter text-balance">
            Outcomes that <span className="italic">speak louder</span> than promises.
          </h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="border-l-2 border-primary-foreground/40 pl-6"
            >
              <p className="font-display text-5xl md:text-6xl font-bold tracking-tighter text-primary-foreground">
                <AnimatedNumber value={s.v} suffix={s.s} />
              </p>
              <p className="mt-2 text-primary-foreground/75">{s.l}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyOxVerse() {
  const features = [
    {
      icon: Users,
      title: "Small cohorts",
      desc: "Max 25 students per class. Real attention, real mentorship.",
    },
    {
      icon: Cpu,
      title: "Industry stack",
      desc: "Same tools and workflows used at top global tech companies.",
    },
    {
      icon: Zap,
      title: "Project-based",
      desc: "Ship 4–6 portfolio-grade projects per course. No fluff.",
    },
    {
      icon: GraduationCap,
      title: "Career support",
      desc: "Resume reviews, mock interviews, and direct hiring partners.",
    },
    {
      icon: Sparkles,
      title: "Modern campus",
      desc: "High-spec workstations, fast internet, designed for focus.",
    },
    {
      icon: MapPin,
      title: "Lagos-based",
      desc: "No 82, Century Bus Stop Ago Palace Way, Okota, Lagos",
    },
  ];
  return (
    <section className="border-y border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="max-w-3xl">
          <SectionEyebrow>Why OxVerse</SectionEyebrow>
          <h2 className="mt-6 font-display text-4xl md:text-6xl font-bold tracking-tighter text-balance">
            We don't teach courses. <span className="gradient-text">We build careers.</span>
          </h2>
        </div>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-3xl overflow-hidden">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-background p-8 group hover:bg-purple-50 transition-colors"
            >
              <div className="size-12 rounded-xl bg-primary/10 text-primary inline-flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <f.icon className="size-5" />
              </div>
              <h3 className="mt-6 font-display text-xl font-semibold">{f.title}</h3>
              <p className="mt-2 text-ink-muted">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedCourses() {
  const featured = courses.slice(0, 6);
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
        <div>
          <SectionEyebrow>Featured Courses</SectionEyebrow>
          <h2 className="mt-6 font-display text-4xl md:text-5xl font-bold tracking-tighter text-balance">
            Pick the path that <span className="gradient-text">builds your future.</span>
          </h2>
          <p className="mt-4 max-w-xl text-ink-muted text-pretty">
            Six flagship programs — from frontend engineering to AI — designed to take you from
            curious beginner to hireable professional.
          </p>
        </div>
        <Link
          to="/courses"
          className="group inline-flex items-center gap-2 font-semibold hover:text-primary transition"
        >
          View all 10 courses{" "}
          <ArrowUpRight className="size-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Link>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {featured.map((c, i) => (
          <motion.div
            key={c.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
          >
            <Link
              to={`/courses/${c.slug}`}
              className="group block h-full rounded-3xl border border-border bg-card overflow-hidden hover:border-primary/60 hover:shadow-2xl hover:shadow-primary/15 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={c.image}
                  alt={c.title}
                  loading="lazy"
                  className="absolute inset-0 size-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />
                <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
                  <span className="inline-flex items-center rounded-full bg-background/95 backdrop-blur px-3 py-1 text-[11px] font-semibold text-primary uppercase tracking-wider">
                    {c.category}
                  </span>
                  <span className="size-9 rounded-full bg-background/95 backdrop-blur grid place-items-center text-lg">
                    {c.emoji}
                  </span>
                </div>
              </div>
              <div className="p-7">
                <h3 className="font-display text-2xl font-semibold tracking-tight group-hover:text-primary transition-colors">
                  {c.title}
                </h3>
                <p className="mt-3 text-ink-muted text-pretty line-clamp-2">{c.short}</p>
                <div className="mt-6 pt-5 border-t border-border flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="rounded-full bg-muted px-3 py-1 font-medium text-ink-muted">
                      {c.duration}
                    </span>
                    <span className="rounded-full bg-muted px-3 py-1 font-medium text-ink-muted">
                      {c.level}
                    </span>
                  </div>
                  <ArrowUpRight className="size-5 text-ink-muted group-hover:text-primary group-hover:rotate-12 transition-all" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Campus() {
  return (
    <section className="border-t border-border bg-ink text-background overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:py-32">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <SectionEyebrow>
              <span className="text-background/80">Campus Experience</span>
            </SectionEyebrow>
            <h2 className="mt-6 font-display text-4xl md:text-6xl font-bold tracking-tighter text-balance">
              Built for focus.
            </h2>
            <p className="mt-6 text-background/70 text-lg max-w-md text-pretty">
              Step into a learning environment engineered for deep work and real progress. Our
              campus in Agor combines comfort, speed, and community to help you stay consistent and
              productive.
            </p>
            <div className="mt-10 grid grid-cols-2 gap-6">
              {[
                { l: "Mentorship hrs/mo", v: "200+" },
                { l: "Open hours", v: "8am–5pm" },
              ].map((s) => (
                <div key={s.l}>
                  <p className="font-display text-3xl font-bold">{s.v}</p>
                  <p className="text-sm text-background/60 mt-1">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="relative aspect-[16/11] rounded-3xl overflow-hidden">
              <img
                src={campusImg}
                alt="OxVerse campus"
                className="size-full object-cover"
                loading="lazy"
                width={1600}
                height={1100}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Projects() {
  const projects = [
    {
      title: "Wakanda Pay",
      student: "Tobi A.",
      course: "Full Stack",
      color: "from-purple-500 to-purple-700",
    },
    {
      title: "Lumen AI",
      student: "Amara N.",
      course: "AI",
      color: "from-purple-700 to-purple-900",
    },
    {
      title: "Drift Mobile",
      student: "Kola I.",
      course: "Mobile",
      color: "from-purple-200 to-purple-500",
    },
    {
      title: "Orbit DAO",
      student: "Zara M.",
      course: "Web3",
      color: "from-purple-600 to-purple-900",
    },
  ];
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="max-w-3xl mb-14">
        <SectionEyebrow>Student Projects</SectionEyebrow>
        <h2 className="mt-6 font-display text-4xl md:text-5xl font-bold tracking-tighter text-balance">
          Real products. Built in class.
        </h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {projects.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="group relative aspect-[3/4] rounded-3xl overflow-hidden cursor-pointer"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${p.color}`} />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=%270 0 60 60%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cpath d=%27M30 0v60M0 30h60%27 stroke=%27%23fff%27 stroke-opacity=%270.1%27/%3E%3C/svg%3E')] bg-[length:30px]" />
            <div className="absolute inset-0 p-6 flex flex-col justify-between text-background">
              <span className="text-xs font-medium opacity-80">{p.course}</span>
              <div>
                <h3 className="font-display text-2xl font-bold">{p.title}</h3>
                <p className="text-sm opacity-80 mt-1">by {p.student}</p>
              </div>
            </div>
            <div className="absolute inset-0 bg-background/0 group-hover:bg-background/5 transition-colors" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Testimonials() {
  const t = [
    {
      quote:
        "OxVerse didn't just teach me to code — they taught me to think like an engineer. Six months in, I landed a remote role at a YC startup.",
      name: "Tobi Adelaja",
      role: "Frontend Engineer @ Plana",
    },
    {
      quote:
        "The instructors are working professionals who actually care. The mentorship in-person made all the difference for me.",
      name: "Amara Nwosu",
      role: "Product Designer @ Flutterwave",
    },
    {
      quote:
        "I came in knowing nothing about AI. I left with a portfolio that got me four offers. Worth every naira.",
      name: "Kola Ibrahim",
      role: "AI Engineer @ Cohere",
    },
  ];
  return (
    <section className="border-y border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="max-w-3xl mb-14">
          <SectionEyebrow>Student stories</SectionEyebrow>
          <h2 className="mt-6 font-display text-4xl md:text-5xl font-bold tracking-tighter">
            Hear it from them.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {t.map((item, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-3xl border border-border bg-background p-8 flex flex-col justify-between"
            >
              <blockquote className="font-display text-lg leading-snug text-pretty">
                "{item.quote}"
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-3">
                <div className="size-11 rounded-full bg-gradient-to-br from-purple-200 to-purple-600" />
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-ink-muted">{item.role}</p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Careers() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="relative aspect-square rounded-3xl overflow-hidden order-last lg:order-first">
          <img
            src={studentsImg}
            alt="OxVerse students"
            className="size-full object-cover"
            loading="lazy"
            width={1600}
            height={1000}
          />
        </div>
        <div>
          <SectionEyebrow>Career outcomes</SectionEyebrow>
          <h2 className="mt-6 font-display text-4xl md:text-5xl font-bold tracking-tighter text-balance">
            Skill that pays. <br />
            <span className="gradient-text">For the Long Term.</span>
          </h2>
          <p className="mt-6 text-ink-muted text-lg max-w-lg text-pretty">
            We don’t just teach tech — we prepare you for real careers that last. Our programs are
            built around practical skills, real-world projects, and industry-relevant experience
            that employers value.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-4">
            {[
              "Software Engineer",
              "Product Designer",
              "Data Analyst",
              "Mobile Developer",
              "AI Engineer",
              "Growth Marketer",
            ].map((r) => (
              <div
                key={r}
                className="rounded-xl border border-border px-4 py-3 text-sm font-medium"
              >
                {r}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const faqs = [
    {
      q: "Is OxVerse a physical academy or online?",
      a: "Strictly physical. All classes are held at our Agor, Lagos campus. We believe in-person mentorship compounds faster than any online program.",
    },

    {
      q: "What are the entry requirements?",
      a: "Most courses require no prior experience. You'll need a laptop (8GB RAM minimum), stable internet, and the ability to commit 12–15 hours per week.",
    },
    {
      q: "Will I get a certificate?",
      a: "Yes - every graduate receives an 0xVerse Certificate of Completion plus portfolio reviews and career support.",
    },
    {
      q: "Can I work full-time and study?",
      a: "Yes - we offer weekend cohorts (Sat) designed for working professionals.",
    },
    {
      q: "Do you guarantee a job?",
      a: "We don't guarantee jobs, but we have a 75% placement rate within 6 months of graduation. We provide career support, mentorship, and direct connections to hiring partners to maximize your chances.",
    },
  ];
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-5xl px-6 py-24">
        <div className="max-w-3xl mb-14">
          <SectionEyebrow>Frequently asked</SectionEyebrow>
          <h2 className="mt-6 font-display text-4xl md:text-5xl font-bold tracking-tighter">
            Questions, answered.
          </h2>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-b border-border">
              <AccordionTrigger className="font-display text-lg md:text-xl font-semibold text-left py-6 hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-ink-muted text-base pb-6 text-pretty">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-purple-700 to-purple-900 text-primary-foreground">
      <div className="absolute inset-0 grid-pattern opacity-15" />
      <div className="relative mx-auto max-w-5xl px-6 py-24 lg:py-32 text-center">
        <img
          src={abstractImg}
          alt=""
          className="mx-auto size-32 mb-10 rounded-3xl shadow-2xl shadow-primary/30"
          loading="lazy"
          width={400}
          height={400}
        />
        <h2 className="font-display text-5xl md:text-7xl font-bold tracking-tighter text-balance">
          Your tech career <br />
          <span className="italic font-light">starts here.</span>
        </h2>
        <p className="mt-6 text-lg text-primary-foreground/80 max-w-xl mx-auto text-pretty">
          Limited seats per cohort. Apply today and join Africa's most ambitious tech academy.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 rounded-full bg-background text-foreground px-8 py-4 text-base font-semibold hover:bg-background/90 transition-colors"
          >
            Enroll Now <ArrowRight className="size-4" />
          </Link>
          <Link
            to="/events"
            className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/40 px-8 py-4 text-base font-semibold hover:bg-primary-foreground/10 transition"
          >
            Visit our campus
          </Link>
        </div>
      </div>
    </section>
  );
}
export default HomePage;
