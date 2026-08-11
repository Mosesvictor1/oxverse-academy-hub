import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCheck, Mail, Reply, Search, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { callApi, formatDateTime, type Paged, type Row } from "@/admin/lib/api";
import { useAdminAuth } from "@/admin/lib/auth";
import { can } from "@/admin/lib/roles";
import { EmptyState, PageHeader, Pager, TableSkeleton, useDebounced } from "@/admin/components/primitives";
import { ComposeMessageDialog } from "@/admin/components/ComposeMessageDialog";
import { ReplyDialog } from "@/admin/components/ReplyDialog";
import { ReceiptLink } from "@/admin/components/ReceiptViewer";
import { cn } from "@/lib/utils";

const SOURCES = [
  "Waitlist",
  "Free Class",
  "Summer Bootcamp",
  "IT Registrations",
  "Subscribe",
  "Ambassador",
  "Ambassador Onboarding",
  "Contact Us",
] as const;

type Source = (typeof SOURCES)[number];

const HIDDEN_COLUMNS = ["_rowIndex", "_source", "_sheet"];

function emailOf(row: Row): string {
  const key = Object.keys(row).find((k) => /^e-?mail( address)?$/i.test(k));
  return key ? String(row[key] ?? "") : "";
}

function isUrl(value: unknown) {
  return typeof value === "string" && /^https?:\/\//i.test(value);
}

export default function AdminRegistrantsPage() {
  const { admin } = useAdminAuth();
  const [source, setSource] = useState<Source>("Waitlist");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const debounced = useDebounced(search, 400);
  const [data, setData] = useState<Paged | null>(null);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<string[]>([]);
  const [composeOpen, setComposeOpen] = useState(false);
  const [composeMode, setComposeMode] = useState<"people" | "segment">("people");
  const [replyRow, setReplyRow] = useState<Row | null>(null);
  const [replied, setReplied] = useState<Record<string, boolean>>({});

  const canMessage = can(admin, "send_messages");

  const load = useCallback(() => {
    setLoading(true);
    callApi<{ report: Paged }>("getRegistrants", { source, page, pageSize: 25, search: debounced.trim() })
      .then((res) => setData(res.report))
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, [source, page, debounced]);

  useEffect(load, [load]);

  useEffect(() => {
    callApi<{ counts: Record<string, number> }>("getRegistrantCounts")
      .then((res) => setCounts(res.counts ?? {}))
      .catch(() => undefined);
  }, []);

  useEffect(() => {
    setPage(1);
    setSelected([]);
  }, [source, debounced]);

  const rows = data?.items ?? [];
  const columns = useMemo(() => {
    const first = rows[0];
    if (!first) return [] as string[];
    return Object.keys(first).filter((k) => !HIDDEN_COLUMNS.includes(k)).slice(0, 7);
  }, [rows]);

  const pageEmails = rows.map(emailOf).filter(Boolean);
  const allSelected = pageEmails.length > 0 && pageEmails.every((e) => selected.includes(e));
  const isReplyTab = source === "Contact Us" || source.startsWith("Ambassador");

  return (
    <div className="space-y-6">
      <PageHeader
        title="Registrants"
        description="Everyone who submitted a form on the public website."
        actions={
          canMessage ? (
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setComposeMode("segment");
                  setComposeOpen(true);
                }}
                className="active:scale-95"
              >
                <Users className="mr-2 size-4" /> Broadcast
              </Button>
              <Button
                disabled={!selected.length}
                onClick={() => {
                  setComposeMode("people");
                  setComposeOpen(true);
                }}
                className="active:scale-95"
              >
                <Mail className="mr-2 size-4" /> Message {selected.length || ""}
              </Button>
            </div>
          ) : null
        }
      />

      <div className="flex flex-wrap gap-2">
        {SOURCES.map((s) => (
          <button
            key={s}
            onClick={() => setSource(s)}
            className={cn(
              "relative rounded-xl border border-border px-3.5 py-2 text-sm transition",
              source === s ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {source === s ? (
              <motion.span
                layoutId="registrant-tab-pill"
                className="absolute inset-0 rounded-xl bg-primary shadow-lg shadow-primary/20"
                transition={{ type: "spring", stiffness: 400, damping: 34 }}
              />
            ) : null}
            <span className="relative z-10">
              {s}
              {typeof counts[s] === "number" ? (
                <span className="ml-2 text-xs opacity-70">{counts[s]}</span>
              ) : null}
            </span>
          </button>
        ))}
      </div>

      <div className="relative max-w-sm">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          className="input pl-9"
          placeholder={`Search ${source}…`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        {loading ? (
          <div className="p-4">
            <TableSkeleton rows={6} cols={5} />
          </div>
        ) : !rows.length ? (
          <EmptyState title="No registrants here yet" description="Nothing has come in for this form." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-sm">
              <thead className="border-b border-border bg-muted/40 text-left text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  {canMessage ? (
                    <th className="w-10 px-4 py-3">
                      <Checkbox
                        checked={allSelected}
                        onCheckedChange={(v) =>
                          setSelected((prev) =>
                            v ? Array.from(new Set([...prev, ...pageEmails])) : prev.filter((e) => !pageEmails.includes(e)),
                          )
                        }
                        aria-label="Select all on page"
                      />
                    </th>
                  ) : null}
                  {columns.map((c) => (
                    <th key={c} className="whitespace-nowrap px-4 py-3 font-medium">
                      {c}
                    </th>
                  ))}
                  {isReplyTab && canMessage ? <th className="px-4 py-3" /> : null}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <AnimatePresence initial={false}>
                  {rows.map((r, i) => {
                    const email = emailOf(r);
                    const key = `${source}-${r["_rowIndex"] ?? i}`;
                    return (
                      <motion.tr
                        key={key}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: Math.min(i * 0.02, 0.2) }}
                        className="transition-colors hover:bg-muted/40"
                      >
                        {canMessage ? (
                          <td className="px-4 py-3">
                            <Checkbox
                              disabled={!email}
                              checked={!!email && selected.includes(email)}
                              onCheckedChange={(v) =>
                                setSelected((prev) => (v ? [...prev, email] : prev.filter((e) => e !== email)))
                              }
                              aria-label={`Select ${email}`}
                            />
                          </td>
                        ) : null}
                        {columns.map((c) => {
                          const value = r[c];
                          return (
                            <td key={c} className="max-w-[240px] px-4 py-3 align-top">
                              {isUrl(value) ? (
                                <ReceiptLink url={String(value)} label="View file" />
                              ) : /date|timestamp|created/i.test(c) ? (
                                <span className="whitespace-nowrap text-muted-foreground">{formatDateTime(value)}</span>
                              ) : (
                                <span className="line-clamp-2 break-words">{String(value ?? "—") || "—"}</span>
                              )}
                            </td>
                          );
                        })}
                        {isReplyTab && canMessage ? (
                          <td className="px-4 py-3 text-right">
                            {replied[key] ? (
                              <span className="inline-flex items-center gap-1 text-xs text-emerald-500">
                                <CheckCheck className="size-3.5" /> Replied
                              </span>
                            ) : (
                              <button
                                onClick={() => setReplyRow(r)}
                                className="inline-flex items-center gap-1 rounded-lg border border-border px-2.5 py-1.5 text-xs transition hover:bg-muted active:scale-95"
                              >
                                <Reply className="size-3.5" /> Reply
                              </button>
                            )}
                          </td>
                        ) : null}
                      </motion.tr>
                    );
                  })}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        )}
        {data ? (
          <Pager page={data.page} totalPages={data.totalPages} totalItems={data.totalItems} onChange={setPage} />
        ) : null}
      </div>

      <ComposeMessageDialog
        open={composeOpen}
        onOpenChange={setComposeOpen}
        initialMode={composeMode}
        initialEmails={selected}
        initialSegment={source}
        counts={counts}
      />

      <ReplyDialog
        open={!!replyRow}
        onOpenChange={(v) => !v && setReplyRow(null)}
        row={replyRow}
        source={source}
        onReplied={(row) => {
          const idx = rows.indexOf(row);
          setReplied((prev) => ({ ...prev, [`${source}-${row["_rowIndex"] ?? idx}`]: true }));
        }}
      />
    </div>
  );
}