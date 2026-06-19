import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type BenefitItem = {
  icon: LucideIcon;
  title: string;
  description: string;
};

type BenefitsPanelProps = {
  heading: string;
  items: BenefitItem[];
  className?: string;
  footer?: React.ReactNode;
};

export function BenefitsPanel({ heading, items, className, footer }: BenefitsPanelProps) {
  return (
    <div
      className={cn(
        "rounded-2xl sm:rounded-3xl bg-gradient-to-br from-primary to-purple-900 text-primary-foreground p-6 sm:p-7 md:p-8",
        className,
      )}
    >
      <p className="text-xs sm:text-sm uppercase tracking-wider text-primary-foreground/70 font-semibold text-pretty">
        {heading}
      </p>
      <ul className="mt-4 sm:mt-5 space-y-3">
        {items.map((item) => (
          <li key={item.title} className="flex items-start gap-3">
            <span className="size-9 shrink-0 grid place-items-center rounded-xl bg-white/15">
              <item.icon className="size-4" aria-hidden />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-sm sm:text-base leading-snug">{item.title}</p>
              <p className="mt-0.5 text-sm text-primary-foreground/80 leading-relaxed text-pretty">
                {item.description}
              </p>
            </div>
          </li>
        ))}
      </ul>
      {footer}
    </div>
  );
}

export function InfoStatCard({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="rounded-2xl sm:rounded-3xl border border-border p-4 sm:p-6 bg-background">
      <p className="text-sm text-ink-muted">{label}</p>
      <p className="font-display text-3xl sm:text-4xl font-bold tracking-tighter mt-1">{value}</p>
    </div>
  );
}

export function FormAside({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <aside className={cn("lg:col-span-5 space-y-3 sm:space-y-4", className)}>{children}</aside>
  );
}
