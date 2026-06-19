import { Link, useParams } from "react-router-dom";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  Briefcase,
  CheckCircle2,
  Download,
  Wrench,
  Layers,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { SEO } from "@/components/site/SEO";
import { getRoadmap } from "@/lib/roadmaps";
import { getCourse } from "@/lib/courses";

const stageColors = [
  "from-emerald-500 to-emerald-700",
  "from-sky-500 to-sky-700",
  "from-violet-500 to-violet-700",
  "from-amber-500 to-amber-700",
];

export default function CourseRoadmapPage() {
  const { slug } = useParams<{ slug: string }>();
  const roadmap = slug ? getRoadmap(slug) : undefined;
  const course = slug ? getCourse(slug) : undefined;
  const printRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  if (!roadmap || !course) {
    return (
      <SiteLayout>
        <SEO title="Roadmap not found, OxVerse Academy" />
        <div className="mx-auto max-w-2xl px-6 py-32 text-center">
          <h1 className="font-display text-4xl font-bold">Roadmap not found</h1>
          <Link to="/courses" className="mt-6 inline-flex text-primary font-semibold">View all courses</Link>
        </div>
      </SiteLayout>
    );
  }

  async function downloadPDF() {
    if (!printRef.current) return;
    setDownloading(true);
    try {
      const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
        import("html2canvas"),
        import("jspdf"),
      ]);
      const canvas = await html2canvas(printRef.current, {
        scale: 2,
        backgroundColor: "#ffffff",
        useCORS: true,
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      while (heightLeft > 0) {
        position = heightLeft, imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      pdf.save(`OxVerse-${roadmap!.slug}-roadmap.pdf`);
    } catch (e) {
      console.error(e);
      alert("Couldn't generate PDF. Please try again.");
    } finally {
      setDownloading(false);
    }
  }

  return (
    <SiteLayout>
      <SEO
        title={`${roadmap.title} Roadmap, OxVerse Academy`}
        description={`The complete learning journey for ${roadmap.title}: modules, tools, projects, certification and careers.`}
        canonical={`https://oxverse.academy/courses/${roadmap.slug}/roadmap`}
      />
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-40 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        <div className="relative mx-auto max-w-6xl px-6 pt-24 pb-10">
          <Link to={`/courses/${roadmap.slug}`} className="text-sm text-ink-muted hover:text-ink">
            ← Back to {roadmap.title}
          </Link>
          <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">Course roadmap</p>
              <h1 className="mt-3 font-display text-5xl md:text-6xl font-bold tracking-tighter text-balance">
                {roadmap.title} <span className="gradient-text">Journey</span>
              </h1>
              <p className="mt-4 max-w-2xl text-ink-muted text-pretty">{roadmap.summary}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={downloadPDF}
                disabled={downloading}
                className="inline-flex items-center gap-2 rounded-full bg-ink text-background px-6 py-3 font-semibold hover:bg-primary transition disabled:opacity-60"
              >
                <Download className="size-4" />
                {downloading ? "Preparing..." : "Download PDF"}
              </button>
              <Link
                to="/waitlist"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3 font-semibold hover:border-ink transition"
              >
                Join Waitlist <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div ref={printRef} className="bg-background">
        <section className="mx-auto max-w-6xl px-6 pb-10">
          <div className="grid sm:grid-cols-4 gap-3">
            {[
              { l: "Duration", v: roadmap.duration, i: Layers },
              { l: "Stages", v: `${roadmap.stages.length} phases`, i: GraduationCap },
              { l: "Tools", v: `${roadmap.tools.length}+ technologies`, i: Wrench },
              { l: "Certificate", v: "Yes, on completion", i: Award },
            ].map((s) => (
              <div key={s.l} className="rounded-2xl border border-border p-4 flex items-start gap-3">
                <s.i className="size-5 text-primary mt-0.5" />
                <div>
                  <p className="text-xs text-ink-muted">{s.l}</p>
                  <p className="font-semibold text-sm">{s.v}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">From beginner to advanced</h2>
          <p className="mt-3 text-ink-muted max-w-2xl">
            A clear, milestone driven progression. Each stage builds on the last so you always know what you're working toward.
          </p>
          <div className="mt-10 relative">
            <div aria-hidden className="hidden md:block absolute left-6 top-2 bottom-2 w-px bg-gradient-to-b from-primary/60 via-border to-primary/60" />
            <ol className="space-y-6">
              {roadmap.stages.map((s, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="relative md:pl-16"
                >
                  <div className={`hidden md:flex absolute left-0 top-3 size-12 rounded-full text-white items-center justify-center font-display font-bold bg-gradient-to-br ${stageColors[i % stageColors.length]}`}>
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="rounded-3xl border border-border bg-background p-6 md:p-8">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className={`md:hidden inline-flex size-9 items-center justify-center rounded-full text-white font-semibold bg-gradient-to-br ${stageColors[i % stageColors.length]}`}>
                        {i + 1}
                      </span>
                      <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                        {s.level}
                      </span>
                      <span className="text-xs text-ink-muted">{s.weeks}</span>
                    </div>
                    <h3 className="mt-3 font-display text-2xl font-bold tracking-tight">{s.title}</h3>
                    <p className="mt-2 text-sm text-ink-muted">{s.outcome}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {s.topics.map((t) => (
                        <span key={t} className="rounded-full border border-border bg-muted/40 px-3 py-1 text-xs font-medium">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="font-display text-3xl font-bold tracking-tight flex items-center gap-3">
            <Wrench className="size-6 text-primary" /> Tools & technologies you'll master
          </h2>
          <div className="mt-6 flex flex-wrap gap-2">
            {roadmap.tools.map((t) => (
              <span key={t} className="rounded-xl border border-border bg-background px-4 py-2 text-sm font-medium">{t}</span>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="font-display text-3xl font-bold tracking-tight flex items-center gap-3">
            <Sparkles className="size-6 text-primary" /> Practical projects
          </h2>
          <div className="mt-6 grid sm:grid-cols-2 gap-4">
            {roadmap.projects.map((p, i) => (
              <div key={p} className="rounded-2xl border border-border p-5 flex gap-3">
                <CheckCircle2 className="size-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-ink-muted">Project {i + 1}</p>
                  <p className="font-semibold mt-0.5">{p}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="font-display text-3xl font-bold tracking-tight flex items-center gap-3">
            <Award className="size-6 text-primary" /> Certification
          </h2>
          <div className="mt-4 rounded-3xl border border-primary/30 bg-primary/5 p-6">
            <p className="text-pretty">{roadmap.certification}</p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-12 pb-20">
          <h2 className="font-display text-3xl font-bold tracking-tight flex items-center gap-3">
            <Briefcase className="size-6 text-primary" /> Career paths
          </h2>
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {roadmap.careers.map((c) => (
              <div key={c} className="rounded-xl border border-border px-5 py-4 font-medium">{c}</div>
            ))}
          </div>
        </section>
      </div>

      <section className="border-t border-border bg-ink text-background">
        <div className="mx-auto max-w-5xl px-6 py-16 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tighter">Ready to start the journey?</h2>
          <p className="mt-3 text-background/70">Reserve your seat or attend a free class first.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link to="/waitlist" className="inline-flex items-center gap-2 rounded-full bg-background text-foreground px-6 py-3 font-semibold">
              Join Waitlist <ArrowRight className="size-4" />
            </Link>
            <Link to={`/register?course=${roadmap.slug}`} className="inline-flex items-center gap-2 rounded-full border border-background/30 px-6 py-3 font-semibold">
              Register now
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}