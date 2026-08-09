import { useEffect, useState } from "react";
import { Loader2, Send } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { callApi, type Row } from "@/admin/lib/api";
import { AnimatedCheck } from "./SendResult";

function pick(row: Row, keys: string[]): string {
  for (const k of keys) {
    const found = Object.keys(row).find((rk) => rk.toLowerCase() === k.toLowerCase());
    if (found && row[found]) return String(row[found]);
  }
  return "";
}

export function ReplyDialog({
  open,
  onOpenChange,
  row,
  source,
  onReplied,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  row: Row | null;
  source: string;
  onReplied?: (row: Row, subject: string, message: string) => void;
}) {
  const isContact = source === "Contact Us";
  const email = row ? pick(row, ["Email", "Email Address"]) : "";
  const original = row ? pick(row, ["Message", "Enquiry", "Why do you want to be an ambassador?", "Reason"]) : "";
  const originalSubject = row ? pick(row, ["Subject", "Topic"]) : "";

  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!open) return;
    setDone(false);
    setMessage("");
    setSubject(
      isContact
        ? `Re: ${originalSubject || "Your message to 0xVerse Academy"}`
        : "Re: Your 0xVerse Ambassador application",
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!row) return;
    setSending(true);
    try {
      if (isContact) {
        await callApi("replyToContact", { email, subject, message, rowIndex: row["_rowIndex"] });
      } else {
        await callApi("replyToAmbassador", { email, subject, message, sheetName: source, rowIndex: row["_rowIndex"] });
      }
      setDone(true);
      toast.success("Reply sent");
      onReplied?.(row, subject, message);
      setTimeout(() => onOpenChange(false), 900);
    } catch {
      /* global toast */
    } finally {
      setSending(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Reply to {email || "contact"}</DialogTitle>
        </DialogHeader>

        {done ? (
          <div className="flex flex-col items-center gap-3 py-8">
            <AnimatedCheck />
            <p className="font-medium">Reply sent</p>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-3">
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium">To</span>
              <input className="input" value={email} readOnly />
            </label>

            {isContact && original ? (
              <div className="rounded-xl border border-border bg-muted/40 p-3 text-sm">
                <p className="mb-1 text-xs uppercase tracking-wide text-muted-foreground">Original message</p>
                <p className="whitespace-pre-wrap">{original}</p>
              </div>
            ) : null}

            <label className="block">
              <span className="mb-1.5 block text-sm font-medium">Subject</span>
              <input className="input" value={subject} onChange={(e) => setSubject(e.target.value)} required />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium">Message</span>
              <textarea
                className="input min-h-[150px] resize-y"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </label>

            <Button type="submit" disabled={sending} className="w-full active:scale-95">
              {sending ? <Loader2 className="mr-2 size-4 animate-spin" /> : <Send className="mr-2 size-4" />}
              {sending ? "Sending…" : "Send reply"}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}