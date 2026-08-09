import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export type SendOutcome = {
  totalRecipients?: number;
  sent?: number;
  failed?: { email: string; error: string }[];
};

export function AnimatedCheck() {
  return (
    <motion.span
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 320, damping: 18 }}
      className="grid size-14 place-items-center rounded-full bg-emerald-500/15 text-emerald-500"
    >
      <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.12 }}>
        <Check className="size-7" strokeWidth={3} />
      </motion.span>
    </motion.span>
  );
}

export function SendResultPanel({ result, className }: { result: SendOutcome; className?: string }) {
  const [openFailed, setOpenFailed] = useState(false);
  const failed = result.failed ?? [];
  return (
    <div className={cn("flex flex-col items-center gap-3 py-4 text-center", className)}>
      <AnimatedCheck />
      <div>
        <p className="font-display text-lg font-semibold">
          {result.sent ?? 0} of {result.totalRecipients ?? result.sent ?? 0} delivered
        </p>
        <p className="text-sm text-muted-foreground">
          {failed.length ? `${failed.length} address${failed.length > 1 ? "es" : ""} failed.` : "Everyone received it."}
        </p>
      </div>

      {failed.length ? (
        <div className="w-full rounded-xl border border-border text-left">
          <button
            type="button"
            onClick={() => setOpenFailed((v) => !v)}
            className="flex w-full items-center justify-between px-3 py-2 text-sm"
          >
            <span>Failed recipients ({failed.length})</span>
            <ChevronDown className={cn("size-4 transition-transform", openFailed && "rotate-180")} />
          </button>
          {openFailed ? (
            <ul className="max-h-40 space-y-1 overflow-y-auto border-t border-border px-3 py-2 text-xs">
              {failed.map((f) => (
                <li key={f.email} className="flex justify-between gap-3">
                  <span className="truncate">{f.email}</span>
                  <span className="shrink-0 text-muted-foreground">{f.error}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}