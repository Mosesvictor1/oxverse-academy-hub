import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Calendar, CheckCircle2, Clock, FileText } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { SEO } from "@/components/site/SEO";
import { getApplications, STATUS_META, type Application } from "@/lib/enrollment";
import {
  SuccessCard,
  SuccessDetail,
  SuccessParagraph,
  pageHeroWideClass,
  pageSectionWideClass,
} from "@/components/site/SuccessScreen";

export default function ApplicationsPage() {
  const [params] = useSearchParams();
  const id = params.get("id") ?? undefined;
  const [apps, setApps] = useState<Application[]>([]);
  useEffect(() => {
    getApplications()
      .then(setApps)
      .catch(() => setApps([]));
  }, []);
  const justSubmitted = id ? apps.find((a) => a.id === id) : undefined;

  return (
    <SiteLayout>
      <SEO
        title="My Applications, OxVerse Academy"
        description="Track the status of your OxVerse Academy enrollment applications."
        noIndex
      />
      <section className="relative">
        <div className="absolute inset-0 grid-pattern opacity-40 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        <div className={`relative ${pageHeroWideClass}`}>
          <p className="text-sm font-medium uppercase tracking-wider text-primary">Admissions</p>
          <h1 className="mt-3 font-display text-3xl sm:text-4xl md:text-6xl font-bold tracking-tighter">
            My applications
          </h1>
          <p className="mt-3 text-ink-muted text-base sm:text-lg max-w-2xl text-pretty">
            Track each application you've submitted and its current admission status.
          </p>
        </div>
      </section>

      {justSubmitted && (
        <section className={`${pageSectionWideClass} pt-0 pb-6 sm:pb-8`}>
          <SuccessCard
            eyebrow="Application received"
            title="Application received"
            icon={CheckCircle2}
          >
            <SuccessParagraph>
              Our admissions team will email you within 48 hours about next steps.
            </SuccessParagraph>
            <SuccessDetail label="Reference" mono>
              {justSubmitted.id}
            </SuccessDetail>
          </SuccessCard>
        </section>
      )}

      <section className={`${pageSectionWideClass} py-10 sm:py-16`}>
        {apps.length === 0 ? (
          <div className="rounded-2xl sm:rounded-3xl border border-dashed border-border p-8 sm:p-12 text-center">
            <FileText className="size-10 mx-auto text-ink-muted" />
            <h2 className="mt-4 font-display text-2xl font-bold">No applications yet</h2>
            <p className="mt-2 text-ink-muted">
              Browse our courses and reserve your seat in the next cohort.
            </p>
            <Link
              to="/courses"
              className="mt-6 inline-flex rounded-full bg-ink text-background px-6 py-3 font-semibold hover:bg-primary transition"
            >
              Explore courses
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {apps.map((a) => {
              const meta = STATUS_META[a.status];
              return (
                <div
                  key={a.id}
                  className="rounded-2xl border border-border p-4 sm:p-6 hover:shadow-lg transition"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-mono text-ink-muted">{a.id}</p>
                      <Link
                        to={`/courses/${a.courseSlug}`}
                        className="mt-1 block font-display text-2xl font-bold hover:text-primary transition"
                      >
                        {a.courseTitle}
                      </Link>
                      <div className="mt-3 flex flex-wrap gap-4 text-sm text-ink-muted">
                        <span className="inline-flex items-center gap-1.5">
                          <Calendar className="size-4" />
                          {a.intakeLabel}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <Clock className="size-4" />
                          {a.schedule}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span
                        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${meta.tone}`}
                      >
                        {meta.label}
                      </span>
                      <p className="mt-2 text-xs text-ink-muted max-w-[14rem]">{meta.desc}</p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-border text-xs text-ink-muted">
                    Submitted {new Date(a.submittedAt).toLocaleString()}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </SiteLayout>
  );
}
