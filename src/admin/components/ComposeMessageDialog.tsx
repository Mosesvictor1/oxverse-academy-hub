import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, Send, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { callApi } from "@/admin/lib/api";
import { SendResultPanel, type SendOutcome } from "./SendResult";

export const SEGMENTS = [
  "Waitlist",
  "Free Class",
  "Summer Bootcamp",
  "IT Registrations",
  "Subscribe",
  "Ambassador",
  "Ambassador Onboarding",
  "Contact Us",
  "All Students",
  "Paid Students",
  "Part Payment Students",
  "Not Paid Students",
  "Outstanding Students",
] as const;

export type SegmentName = (typeof SEGMENTS)[number];

export function ComposeMessageDialog({
  open,
  onOpenChange,
  initialEmails = [],
  initialSegment,
  initialMode = "people",
  counts = {},
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  initialEmails?: string[];
  initialSegment?: string;
  initialMode?: "people" | "segment";
  counts?: Record<string, number>;
}) {
  const [mode, setMode] = useState<"people" | "segment">(initialMode);
  const [emails, setEmails] = useState<string[]>(initialEmails);
  const [segment, setSegment] = useState<string>(initialSegment ?? "Waitlist");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [result, setResult] = useState<SendOutcome | null>(null);

  useEffect(() => {
    if (!open) return;
    setMode(initialMode);
    setEmails(initialEmails);
    if (initialSegment) setSegment(initialSegment);
    setResult(null);
    setConfirming(false);
    setSubject("");
    setMessage("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const segmentCount = useMemo(() => counts[segment], [counts, segment]);
  const canSend = subject.trim() && message.trim() && (mode === "segment" ? !!segment : emails.length > 0);

  const send = async () => {
    setSending(true);
    try {
      const payload =
        mode === "segment"
          ? { subject: subject.trim(), message, segment }
          : { subject: subject.trim(), message, emails };
      const res = await callApi<SendOutcome>("sendMessage", payload);
      setResult({ totalRecipients: res.totalRecipients, sent: res.sent, failed: res.failed ?? [] });
      toast.success(`Message sent to ${res.sent ?? 0} recipient(s)`);
    } catch {
      /* global toast */
    } finally {
      setSending(false);
      setConfirming(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{result ? "Message sent" : "Compose message"}</DialogTitle>
        </DialogHeader>

        {result ? (
          <>
            <SendResultPanel result={result} />
            <Button className="w-full active:scale-95" onClick={() => onOpenChange(false)}>
              Done
            </Button>
          </>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-1 rounded-xl border border-border p-1">
              {(["people", "segment"] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMode(m)}
                  className="relative rounded-lg px-3 py-2 text-sm transition"
                >
                  {mode === m ? (
                    <motion.span layoutId="compose-mode-pill" className="absolute inset-0 rounded-lg bg-primary" />
                  ) : null}
                  <span className={mode === m ? "relative z-10 text-primary-foreground" : "relative z-10 text-muted-foreground"}>
                    {m === "people" ? "Specific people" : "Segment broadcast"}
                  </span>
                </button>
              ))}
            </div>

            {mode === "people" ? (
              <div className="space-y-2">
                <p className="text-sm font-medium">Recipients ({emails.length})</p>
                <div className="flex max-h-32 flex-wrap gap-2 overflow-y-auto rounded-xl border border-border p-2">
                  <AnimatePresence initial={false}>
                    {emails.map((e) => (
                      <motion.span
                        key={e}
                        layout
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.85 }}
                        className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-xs text-primary"
                      >
                        {e}
                        <button type="button" onClick={() => setEmails((p) => p.filter((x) => x !== e))}>
                          <X className="size-3" />
                        </button>
                      </motion.span>
                    ))}
                  </AnimatePresence>
                  {!emails.length ? <span className="p-1 text-xs text-muted-foreground">No recipients selected.</span> : null}
                </div>
              </div>
            ) : (
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium">Segment</span>
                <select className="input" value={segment} onChange={(e) => setSegment(e.target.value)}>
                  {SEGMENTS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                      {typeof counts[s] === "number" ? ` (${counts[s]})` : ""}
                    </option>
                  ))}
                </select>
              </label>
            )}

            <label className="block">
              <span className="mb-1.5 block text-sm font-medium">Subject</span>
              <input className="input" value={subject} onChange={(e) => setSubject(e.target.value)} required />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium">Message</span>
              <textarea
                className="input min-h-[160px] resize-y"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Line breaks are preserved. The backend wraps this in the branded template."
              />
            </label>

            <AnimatePresence mode="wait">
              {confirming ? (
                <motion.div
                  key="confirm"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="rounded-xl border border-amber-500/40 bg-amber-500/10 p-3 text-sm"
                >
                  <p className="font-medium">
                    This will email {typeof segmentCount === "number" ? `all ${segmentCount} people` : "everyone"} in{" "}
                    {segment}. Are you sure?
                  </p>
                  <div className="mt-3 flex gap-2">
                    <Button size="sm" onClick={send} disabled={sending} className="active:scale-95">
                      {sending ? <Loader2 className="mr-2 size-4 animate-spin" /> : null}
                      Yes, send now
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => setConfirming(false)} disabled={sending}>
                      Cancel
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="send" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <Button
                    className="w-full shadow-lg shadow-primary/25 active:scale-95"
                    disabled={!canSend || sending}
                    onClick={() => (mode === "segment" ? setConfirming(true) : send())}
                  >
                    {sending ? <Loader2 className="mr-2 size-4 animate-spin" /> : <Send className="mr-2 size-4" />}
                    {sending ? "Sending…" : mode === "segment" ? "Review & send" : `Send to ${emails.length} recipient(s)`}
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}