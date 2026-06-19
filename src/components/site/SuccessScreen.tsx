import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export const formCardClass =
  "rounded-2xl sm:rounded-3xl border border-border bg-background p-5 sm:p-8 lg:p-10 space-y-5";

export const pageContainerClass = "mx-auto max-w-7xl px-4 sm:px-6";

export const pageHeroClass = `${pageContainerClass} pt-20 sm:pt-24 pb-8 sm:pb-10`;

export const pageSectionClass = `${pageContainerClass} pb-16 sm:pb-24`;

export const formGridClass = `${pageContainerClass} pb-16 sm:pb-24 grid lg:grid-cols-12 gap-6 sm:gap-10 [&>*]:min-w-0`;

export const enrollGridClass = `${pageContainerClass} pb-16 sm:pb-24 grid lg:grid-cols-3 gap-6 sm:gap-10`;

export const pageSectionWideClass = `${pageContainerClass.replace("max-w-7xl", "max-w-5xl")} pb-16 sm:pb-24`;

export const pageHeroWideClass = `${pageContainerClass.replace("max-w-7xl", "max-w-5xl")} pt-20 sm:pt-24 pb-8 sm:pb-10`;

export const pageHeroNarrowClass = `${pageContainerClass.replace("max-w-7xl", "max-w-4xl")} pt-20 sm:pt-24 pb-8 sm:pb-10`;

export const narrowSectionClass = "mx-auto max-w-3xl px-4 sm:px-6 py-6 sm:py-10 pb-16 sm:pb-24";

type SuccessScreenProps = {
  children: React.ReactNode;
  className?: string;
  narrow?: boolean;
};

export function SuccessScreen({ children, className, narrow = true }: SuccessScreenProps) {
  return (
    <section className={cn(narrow ? narrowSectionClass : pageSectionClass, className)}>
      {children}
    </section>
  );
}

type SuccessCardProps = {
  eyebrow: string;
  title: string;
  icon?: LucideIcon;
  children: React.ReactNode;
};

export function SuccessCard({ eyebrow, title, icon: Icon = Sparkles, children }: SuccessCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl sm:rounded-3xl bg-gradient-to-br from-primary to-purple-900 text-primary-foreground p-5 sm:p-8 md:p-10 shadow-2xl shadow-primary/30"
    >
      <div className="flex items-start gap-3 sm:gap-4">
        <span className="size-11 sm:size-12 shrink-0 grid place-items-center rounded-2xl bg-white/15">
          <Icon className="size-5 sm:size-6" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[11px] sm:text-xs uppercase tracking-wider text-primary-foreground/70 font-semibold">
            {eyebrow}
          </p>
          <h1 className="mt-1 font-display text-[1.65rem] leading-tight sm:text-3xl md:text-4xl font-bold tracking-tight text-balance">
            {title}
          </h1>
        </div>
      </div>
      <div className="mt-5 sm:mt-6 space-y-4">{children}</div>
    </motion.div>
  );
}

type SuccessDetailProps = {
  label: string;
  children: React.ReactNode;
  mono?: boolean;
};

export function SuccessDetail({ label, children, mono }: SuccessDetailProps) {
  return (
    <div className="rounded-xl bg-white/10 border border-white/15 px-4 py-3">
      <p className="text-[11px] sm:text-xs text-primary-foreground/70">{label}</p>
      <div
        className={cn(
          "mt-0.5 font-semibold leading-snug text-balance break-all",
          mono ? "font-mono text-sm sm:text-base" : "text-base sm:text-lg",
        )}
      >
        {children}
      </div>
    </div>
  );
}

export function SuccessParagraph({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm sm:text-base leading-relaxed text-primary-foreground/90 text-pretty">{children}</p>
  );
}

export function SuccessInset({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl bg-white/10 border border-white/15 px-4 py-4 space-y-2">{children}</div>
  );
}

type SuccessCtaProps = {
  href: string;
  children: React.ReactNode;
};

export function SuccessCta({ href, children }: SuccessCtaProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="flex w-full items-center justify-center gap-2 rounded-full bg-white text-primary px-5 py-3.5 sm:py-4 text-sm sm:text-base font-semibold hover:bg-white/95 transition"
    >
      {children}
      <ArrowRight className="size-4 shrink-0" />
    </a>
  );
}

export function SuccessActionGrid({ children }: { children: React.ReactNode }) {
  return <div className="mt-5 sm:mt-8 grid sm:grid-cols-2 gap-3 sm:gap-4">{children}</div>;
}

type SuccessActionCardProps = {
  title: string;
  description: string;
  footer: React.ReactNode;
  href?: string;
  to?: string;
};

export function SuccessActionCard({ title, description, footer, href, to }: SuccessActionCardProps) {
  const className =
    "block rounded-2xl border border-border p-4 sm:p-6 hover:border-primary transition";

  const content = (
    <>
      <p className="font-display text-base sm:text-lg font-semibold">{title}</p>
      <p className="mt-1 text-sm text-ink-muted text-pretty">{description}</p>
      <p className="mt-3 text-sm font-semibold text-primary inline-flex items-center gap-1">{footer}</p>
    </>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={className}>
        {content}
      </a>
    );
  }

  if (to) {
    return (
      <Link to={to} className={className}>
        {content}
      </Link>
    );
  }

  return <div className={className}>{content}</div>;
}

export function SuccessFooterLink({
  children,
  onClick,
  to,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  to?: string;
}) {
  const className =
    "mt-5 sm:mt-8 inline-flex items-center gap-1 text-sm text-ink-muted hover:text-ink underline underline-offset-4";

  if (to) {
    return (
      <Link to={to} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={className}>
      {children}
    </button>
  );
}
