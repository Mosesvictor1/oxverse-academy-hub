import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

/* ---------- animated counter ---------- */
export function CountUp({
  value,
  duration = 1200,
  format = (n: number) => n.toLocaleString("en-NG"),
}: {
  value: number;
  duration?: number;
  format?: (n: number) => string;
}) {
  const [display, setDisplay] = useState(0);
  const from = useRef(0);

  useEffect(() => {
    const start = performance.now();
    const begin = from.current;
    const delta = value - begin;
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(begin + delta * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
      else from.current = value;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);

  return <span>{format(Math.round(display))}</span>;
}

/* ---------- stagger container ---------- */
export function Stagger({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="show"
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 14 },
        show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
      }}
    >
      {children}
    </motion.div>
  );
}

/* ---------- stat card ---------- */
export function StatCard({
  label,
  value,
  icon,
  format,
  hint,
  loading,
  accent,
  compact,
}: {
  label: string;
  value: number;
  icon?: ReactNode;
  format?: (n: number) => string;
  hint?: string;
  loading?: boolean;
  accent?: boolean;
  compact?: boolean;
}) {
  return (
    <StaggerItem>
      <div
        className={cn(
          "group relative overflow-hidden rounded-2xl border border-border bg-card p-5 transition-shadow hover:shadow-lg",
          accent && "bg-gradient-to-br from-primary/10 to-transparent",
          compact && "p-4",
        )}
      >
        <div className="flex items-start justify-between gap-3">
          <p className={cn("text-muted-foreground", compact ? "text-xs" : "text-sm font-medium")}>{label}</p>
          {icon ? (
            <span className="grid size-8 place-items-center rounded-lg bg-primary/10 text-primary">{icon}</span>
          ) : null}
        </div>
        {loading ? (
          <Skeleton className={cn("mt-3", compact ? "h-6 w-16" : "h-9 w-28")} />
        ) : (
          <p
            className={cn(
              "mt-2 font-display font-semibold tracking-tight tabular-nums",
              compact ? "text-xl" : "text-3xl",
            )}
          >
            <CountUp value={value} format={format} />
          </p>
        )}
        {hint ? <p className="mt-1 text-xs text-muted-foreground">{hint}</p> : null}
      </div>
    </StaggerItem>
  );
}

/* ---------- status badge ---------- */
export function StatusBadge({ status }: { status: unknown }) {
  const s = String(status ?? "").trim();
  const tone =
    /paid in full/i.test(s)
      ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
      : /part/i.test(s)
        ? "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30"
        : /active/i.test(s)
          ? "bg-primary/15 text-primary border-primary/30"
          : "bg-muted text-muted-foreground border-border";
  return (
    <span className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium", tone)}>
      {s || "—"}
    </span>
  );
}

/* ---------- table skeleton ---------- */
export function TableSkeleton({ rows = 6, cols = 6 }: { rows?: number; cols?: number }) {
  return (
    <div className="space-y-2 p-4">
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} className="grid gap-3" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0,1fr))` }}>
          {Array.from({ length: cols }).map((__, c) => (
            <Skeleton key={c} className="h-5 w-full" />
          ))}
        </div>
      ))}
    </div>
  );
}

/* ---------- empty state ---------- */
export function EmptyState({ title, description }: { title: string; description?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-1 px-6 py-16 text-center">
      <p className="font-medium">{title}</p>
      {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
    </div>
  );
}

/* ---------- page header ---------- */
export function PageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h1>
        {description ? <p className="mt-1 text-sm text-muted-foreground">{description}</p> : null}
      </div>
      {actions}
    </div>
  );
}

/* ---------- pagination ---------- */
export function Pager({
  page,
  totalPages,
  totalItems,
  onChange,
}: {
  page: number;
  totalPages: number;
  totalItems: number;
  onChange: (p: number) => void;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border px-4 py-3 text-sm">
      <p className="text-muted-foreground">
        Page {page} of {Math.max(1, totalPages)} · {(totalItems ?? 0).toLocaleString()} records
      </p>
      <div className="flex gap-2">
        <button
          className="rounded-lg border border-border px-3 py-1.5 transition active:scale-95 disabled:opacity-40"
          disabled={page <= 1}
          onClick={() => onChange(page - 1)}
        >
          Previous
        </button>
        <button
          className="rounded-lg border border-border px-3 py-1.5 transition active:scale-95 disabled:opacity-40"
          disabled={page >= totalPages}
          onClick={() => onChange(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

/* ---------- debounce hook ---------- */
export function useDebounced<T>(value: T, delay = 400): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}