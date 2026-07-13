import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Sparkles,
  Wrench,
  Bot,
  Puzzle,
  Rocket,
  Database,
  ShieldCheck,
  Briefcase,
  GraduationCap,
  Clock,
  Users,
  Zap,
} from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { SEO } from "@/components/site/SEO";
import heroImg from "@/assets/courses/ai-engineering.jpg";

const learningAreas = [
  {
    icon: Sparkles,
    title: "Understanding AI",
    body: "How modern AI actually works, what it can do, where it can fail and how developers use it inside real software products.",
  },
  {
    icon: Puzzle,
    title: "Building AI Applications",
    body: "Connect AI models to websites, applications and backend systems using clean APIs and modern development tools.",
  },
  {
    icon: Database,
    title: "Connecting AI to Tools & Information",
    body: "Help AI work with documents, databases, business information and external services so it produces useful results.",
  },
  {
    icon: Bot,
    title: "AI Assistants & Agents",
    body: "Create AI systems that can answer questions, complete tasks and support users through chat and simple agents.",
  },
  {
    icon: ShieldCheck,
    title: "Launching Reliable AI Products",
    body: "Test, improve, secure and deploy AI applications so real users can trust them in production.",
  },
];

const projects = [
  "AI customer-support assistant",
  "School learning assistant",
  "Research and information assistant",
  "Business enquiry system",
  "Document-analysis application",
  "AI-powered website",
  "Business productivity tool",
  "Final AI product or startup project",
];

const audience = [
  "Software developers",
  "Frontend developers",
  "Backend developers",
  "Full-stack developers",
  "Automation builders",
  "Technical founders",
  "Product builders",
  "People who want to create AI-powered software",
];

const outcomes = [
  "Build AI-powered websites and applications",
  "Connect AI to business information and software tools",
  "Create intelligent assistants",
  "Build simple AI agents",
  "Develop useful AI products",
  "Test and improve AI applications",
  "Deploy products for real users",
  "Build a portfolio of practical AI projects",
];

const careers = [
  "AI Application Developer",
  "AI Engineer",
  "Full-Stack AI Developer",
  "AI Product Developer",
  "AI Automation Engineer",
  "AI Solutions Developer",
  "Technical AI Consultant",
  "AI Startup Founder",
];

const buildsList = [
  "AI assistants",
  "Customer-support tools",
  "Research platforms",
  "Learning applications",
  "Business automation systems",
  "AI-powered websites",
  "Productivity tools",
  "Intelligent software products",
];

const infoRows: { label: string; value: string }[] = [
  { label: "Course Level", value: "Intermediate" },
  { label: "Recommended Background", value: "Basic programming knowledge" },
  { label: "Learning Style", value: "Instructor-led and project-based" },
  { label: "Main Outcome", value: "A deployed AI-powered product and practical portfolio" },
  { label: "Suitable for Complete Coding Beginners", value: "No" },
];

export default function AiEngineeringPage() {
  return (
    <SiteLayout>
      <SEO
        title="Modern AI Engineering, OxVerse Academy"
        description="Learn how to build real software products powered by AI. Practical, project-based training in AI Engineering at OxVerse Academy."
        image={heroImg}
        canonical="https://oxverse.academy/courses/ai-engineering"
      />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-40 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-14 lg:pt-24">
          <Link to="/courses" className="text-sm text-ink-muted hover:text-ink">
            ← All courses
          </Link>
          <div className="mt-6 grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1 rounded-full bg-purple-50 text-primary px-3 py-1 text-xs font-semibold uppercase tracking-wider">
                  Artificial Intelligence Track
                </span>
                <span className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1 text-xs font-medium">
                  Intermediate
                </span>
              </div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 font-display text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-balance"
              >
                Build Real Products with AI
              </motion.h1>
              <p className="mt-5 text-lg text-ink-muted max-w-2xl text-pretty">
                Learn how to combine software development, AI models, data and business tools to
                build applications that solve real problems. Move beyond simply using AI tools and
                learn how to create AI-powered products for businesses, schools, startups and
                everyday users.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/waitlist"
                  className="inline-flex items-center gap-2 rounded-full bg-ink text-background px-7 py-4 font-semibold hover:bg-primary transition"
                >
                  Apply for Modern AI Engineering <ArrowRight className="size-4" />
                </Link>
                <a
                  href="#curriculum"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-primary text-primary bg-background px-7 py-4 font-semibold hover:bg-primary hover:text-primary-foreground transition"
                >
                  View Course Curriculum <ArrowUpRight className="size-4" />
                </a>
              </div>
              <p className="mt-5 text-sm text-ink-muted max-w-xl">
                You do not need to build a new AI model. You learn how to build useful systems with
                the AI models that already exist.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5"
            >
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl shadow-primary/20">
                <img
                  src={heroImg}
                  alt="OxVerse AI Engineering robot building AI-powered software"
                  className="absolute inset-0 size-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What is Modern AI Engineering */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
              What Is Modern AI Engineering?
            </h2>
            <p className="mt-5 text-ink-muted text-pretty">
              Modern AI Engineering is the process of building software products that use
              artificial intelligence.
            </p>
            <p className="mt-3 text-ink-muted text-pretty">
              Instead of creating large AI models from the beginning, AI engineers use existing
              models and connect them to websites, applications, databases and business tools.
            </p>
          </div>
          <div className="lg:col-span-7">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              They build systems such as
            </p>
            <ul className="mt-4 grid sm:grid-cols-2 gap-3">
              {buildsList.map((b) => (
                <li
                  key={b}
                  className="flex items-center gap-3 rounded-xl border border-border p-4 bg-background"
                >
                  <Check className="size-5 text-primary shrink-0" />
                  <span className="text-sm font-medium">{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Simple flow diagram */}
        <div className="mt-14 rounded-3xl border border-border bg-gradient-to-br from-purple-50 to-background p-6 lg:p-10">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">
            How an AI product works
          </p>
          <div className="mt-5 grid grid-cols-2 md:grid-cols-5 gap-3 items-center">
            {["User", "Application", "AI", "Business Info & Tools", "Useful Result"].map(
              (step, i) => (
                <div key={step} className="flex items-center gap-2">
                  <div className="flex-1 rounded-2xl border border-border bg-background p-4 text-center">
                    <p className="font-display font-semibold text-sm md:text-base">{step}</p>
                  </div>
                  {i < 4 && (
                    <ArrowRight className="hidden md:block size-5 text-primary shrink-0" />
                  )}
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* What students will learn */}
      <section id="curriculum" className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
            What Students Will Learn
          </h2>
          <p className="mt-3 text-ink-muted max-w-2xl">
            Five simple areas that take you from understanding AI to shipping real AI-powered
            products.
          </p>
          <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {learningAreas.map((a, i) => (
              <div
                key={a.title}
                className="rounded-3xl border border-border bg-background p-6"
              >
                <div className="flex items-center gap-3">
                  <span className="grid place-items-center size-10 rounded-xl bg-primary/10 text-primary">
                    <a.icon className="size-5" />
                  </span>
                  <span className="font-display font-bold text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold">{a.title}</h3>
                <p className="mt-2 text-sm text-ink-muted text-pretty">{a.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
              Learn by Building Real Projects
            </h2>
            <p className="mt-3 max-w-2xl text-ink-muted">
              Students will not only study AI concepts. They will build and launch practical
              products that can be added to their portfolios or developed into real business
              solutions.
            </p>
          </div>
        </div>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {projects.map((p, i) => (
            <div
              key={p}
              className="rounded-3xl border border-border p-6 bg-gradient-to-br from-background to-purple-50/60"
            >
              <p className="text-xs font-semibold text-primary uppercase tracking-wider">
                Project {String(i + 1).padStart(2, "0")}
              </p>
              <p className="mt-2 font-display text-lg font-semibold">{p}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Who is it for */}
      <section className="border-y border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20 grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight flex items-center gap-3">
              <Users className="size-7 text-primary" /> Who the Course Is For
            </h2>
            <p className="mt-4 text-ink-muted">This programme is suitable for:</p>
            <div className="mt-6 rounded-2xl border border-primary/30 bg-primary/5 p-5 text-sm">
              <p className="font-semibold text-primary">Basic programming knowledge is recommended.</p>
              <p className="mt-2 text-ink-muted">
                Completely new to coding? Start with{" "}
                <Link to="/courses/frontend-development" className="text-primary underline">
                  Frontend
                </Link>
                ,{" "}
                <Link to="/courses/backend-development" className="text-primary underline">
                  Backend
                </Link>{" "}
                or{" "}
                <Link to="/courses/full-stack-development" className="text-primary underline">
                  Full-Stack Development
                </Link>{" "}
                first.
              </p>
            </div>
          </div>
          <ul className="lg:col-span-7 grid sm:grid-cols-2 gap-3">
            {audience.map((a) => (
              <li
                key={a}
                className="flex items-center gap-3 rounded-xl border border-border bg-background p-4"
              >
                <Check className="size-5 text-primary shrink-0" />
                <span className="text-sm font-medium">{a}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Comparison */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
        <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
          AI Engineering vs AI Automation
        </h2>
        <p className="mt-3 max-w-2xl text-ink-muted">
          AI Automation helps businesses automate work. AI Engineering helps people build
          AI-powered products.
        </p>
        <div className="mt-10 grid md:grid-cols-2 gap-5">
          <div className="rounded-3xl border border-border bg-background p-7">
            <div className="flex items-center gap-3">
              <span className="grid place-items-center size-10 rounded-xl bg-primary/10 text-primary">
                <Zap className="size-5" />
              </span>
              <h3 className="font-display text-xl font-bold">AI Automation</h3>
            </div>
            <p className="mt-4 text-ink-muted text-sm">
              AI Automation focuses on connecting existing tools and automating repetitive business
              processes.
            </p>
            <div className="mt-5 rounded-2xl bg-muted/60 p-4 text-sm">
              <p className="font-semibold">Example</p>
              <p className="mt-1 text-ink-muted">
                When a customer fills out a form, AI summarises the information and sends it to the
                business.
              </p>
            </div>
            <Link
              to="/courses/ai-automation"
              className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary"
            >
              Explore AI Automation <ArrowUpRight className="size-4" />
            </Link>
          </div>
          <div className="rounded-3xl border-2 border-primary bg-primary/5 p-7">
            <div className="flex items-center gap-3">
              <span className="grid place-items-center size-10 rounded-xl bg-primary text-primary-foreground">
                <Rocket className="size-5" />
              </span>
              <h3 className="font-display text-xl font-bold">AI Engineering</h3>
            </div>
            <p className="mt-4 text-ink-muted text-sm">
              AI Engineering focuses on building the actual software product.
            </p>
            <div className="mt-5 rounded-2xl bg-background p-4 text-sm">
              <p className="font-semibold">Example</p>
              <p className="mt-1 text-ink-muted">
                Building the customer-support platform that receives enquiries, understands
                business information, responds to users and stores conversations.
              </p>
            </div>
            <p className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary">
              You are here
            </p>
          </div>
        </div>
      </section>

      {/* Learning outcomes */}
      <section className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
            What You Will Be Able to Do
          </h2>
          <p className="mt-3 text-ink-muted max-w-2xl">
            By the end of the programme, students should be able to:
          </p>
          <ul className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {outcomes.map((o) => (
              <li
                key={o}
                className="flex gap-3 rounded-2xl border border-border bg-background p-4"
              >
                <Check className="size-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-pretty">{o}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Career direction */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
        <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight flex items-center gap-3">
          <Briefcase className="size-7 text-primary" /> Where This Skill Can Take You
        </h2>
        <p className="mt-3 max-w-2xl text-ink-muted">
          This programme helps students build practical skills and portfolio projects for emerging
          roles involving AI-powered software and digital products.
        </p>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {careers.map((c) => (
            <div
              key={c}
              className="rounded-xl border border-border bg-background px-5 py-4 font-medium"
            >
              {c}
            </div>
          ))}
        </div>
      </section>

      {/* Course information */}
      <section className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-5xl px-6 py-16 lg:py-20">
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight flex items-center gap-3">
            <GraduationCap className="size-7 text-primary" /> Course Information
          </h2>
          <div className="mt-8 divide-y divide-border rounded-3xl border border-border bg-background overflow-hidden">
            {infoRows.map((r) => (
              <div key={r.label} className="grid sm:grid-cols-3 gap-4 px-6 py-5">
                <p className="text-sm font-semibold text-ink-muted">{r.label}</p>
                <p className="sm:col-span-2 font-medium">{r.value}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-ink-muted">
            New to coding?{" "}
            <Link to="/courses/frontend-development" className="text-primary font-semibold underline">
              Start with Software Foundations →
            </Link>
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm">
              <Clock className="size-4 text-primary" /> 5 months
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm">
              <Wrench className="size-4 text-primary" /> Python, TypeScript, OpenAI, LangChain, Supabase
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-ink text-background">
        <div className="mx-auto max-w-5xl px-6 py-20 text-center">
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tighter">
            Ready to build with AI?
          </h2>
          <p className="mt-4 text-background/70 max-w-xl mx-auto">
            Apply for the next Modern AI Engineering cohort. Limited seats.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/waitlist"
              className="inline-flex items-center gap-2 rounded-full bg-background text-foreground px-7 py-4 font-semibold hover:bg-primary hover:text-primary-foreground transition"
            >
              Apply for Modern AI Engineering <ArrowRight className="size-4" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-background/30 px-7 py-4 font-semibold hover:border-background transition"
            >
              Talk to admissions
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
