import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Mail, Send, Users } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { callApi, formatDateTime, type Row } from "@/admin/lib/api";
import { useAdminAuth } from "@/admin/lib/auth";
import { can } from "@/admin/lib/roles";
import { CountUp, EmptyState, PageHeader, Stagger, StaggerItem } from "@/admin/components/primitives";
import { SendResultPanel, type SendOutcome } from "@/admin/components/SendResult";

const DRAFT_KEY = "oxv-newsletter-draft";

export default function AdminNewsletterPage() {
  const { admin } = useAdminAuth();
  const allowed = can(admin, "manage_newsletter");

  const [subscribers, setSubscribers] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [confirming, setConfirming] = useState(false);
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<SendOutcome | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (raw) {
        const d = JSON.parse(raw) as { subject?: string; message?: string };
        setSubject(d.subject ?? "");
        setMessage(d.message ?? "");
      }
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    const id = setTimeout(() => {
      try {
        localStorage.setItem(DRAFT_KEY, JSON.stringify({ subject, message }));
      } catch {
        /* ignore */
      }
    }, 500);
    return () => clearTimeout(id);
  }, [subject, message]);

  useEffect(() => {
    callApi<{ items: Row[] }>("getSubscribers")
      .then((res) => setSubscribers(res.items ?? []))
      .catch(() => setSubscribers([]))
      .finally(() => setLoading(false));
  }, []);

  if (!allowed) return <EmptyState title="No access" description="You don't have permission for this." />;

  const send = async () => {
    setSending(true);
    try {
      const res = await callApi<SendOutcome>("sendNewsletter", { subject: subject.trim(), message });
      setResult({ totalRecipients: res.totalRecipients ?? subscribers.length, sent: res.sent, failed: res.failed ?? [] });
      toast.success(`Newsletter sent to ${res.sent ?? 0} subscriber(s)`);
      setSubject("");
      setMessage("");
      localStorage.removeItem(DRAFT_KEY);
    } catch {
      /* global toast */
    } finally {
      setSending(false);
      setConfirming(false);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Newsletter" description="Draft once, broadcast to every subscriber." />

      <Stagger className="grid gap-4 sm:grid-cols-3">
        <StaggerItem>
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="size-4 text-primary" /> Subscribers
            </div>
            <p className="mt-1 font-display text-3xl font-semibold tabular-nums">
              <CountUp value={subscribers.length} />
            </p>
          </div>
        </StaggerItem>
      </Stagger>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="rounded-2xl border border-border bg-card p-6">
          {result ? (
            <>
              <SendResultPanel result={result} />
              <Button variant="outline" className="w-full" onClick={() => setResult(null)}>
                Write another
              </Button>
            </>
          ) : (
            <div className="space-y-4">
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium">Subject</span>
                <input className="input" value={subject} onChange={(e) => setSubject(e.target.value)} />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium">Message</span>
                <textarea
                  className="input min-h-[240px] resize-y"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Your draft saves automatically."
                />
              </label>

              {confirming ? (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-xl border border-amber-500/40 bg-amber-500/10 p-3 text-sm"
                >
                  <p className="font-medium">Send this to all {subscribers.length} subscribers?</p>
                  <div className="mt-3 flex gap-2">
                    <Button size="sm" onClick={send} disabled={sending} className="active:scale-95">
                      {sending ? <Loader2 className="mr-2 size-4 animate-spin" /> : null} Yes, broadcast
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => setConfirming(false)} disabled={sending}>
                      Cancel
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <Button
                  className="w-full shadow-lg shadow-primary/25 active:scale-95"
                  disabled={!subject.trim() || !message.trim() || !subscribers.length}
                  onClick={() => setConfirming(true)}
                >
                  <Send className="mr-2 size-4" /> Review & broadcast
                </Button>
              )}
            </div>
          )}
        </div>

        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          <div className="flex items-center gap-2 border-b border-border px-5 py-4">
            <Mail className="size-4 text-primary" />
            <h2 className="font-display text-lg font-semibold">Subscribers</h2>
          </div>
          {loading ? (
            <div className="p-5 text-sm text-muted-foreground">Loading…</div>
          ) : subscribers.length ? (
            <ul className="max-h-[420px] divide-y divide-border overflow-y-auto">
              {subscribers.map((s, i) => (
                <li key={`${s["Email"] ?? i}`} className="px-5 py-3">
                  <p className="truncate text-sm font-medium">{String(s["Email"] ?? s["Email Address"] ?? "—")}</p>
                  <p className="text-xs text-muted-foreground">{formatDateTime(s["Timestamp"] ?? s["Created At"])}</p>
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState title="No subscribers yet" />
          )}
        </div>
      </div>
    </div>
  );
}