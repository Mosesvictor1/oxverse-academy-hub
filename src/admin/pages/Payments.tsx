import { useCallback, useEffect, useState } from "react";
import { Search } from "lucide-react";
import { callApi, formatDate, naira, type Paged, type Row } from "@/admin/lib/api";
import { EmptyState, PageHeader, Pager, StatusBadge, TableSkeleton, useDebounced } from "@/admin/components/primitives";

export default function AdminPaymentsPage() {
  const [query, setQuery] = useState("");
  const debounced = useDebounced(query);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [page, setPage] = useState(1);
  const [report, setReport] = useState<Paged | null>(null);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Row | null>(null);

  const load = useCallback(() => {
    setLoading(true);
    callApi<{ report: Paged }>("getPayments", {
      startDate,
      endDate,
      paymentStatus,
      query: debounced,
      sortBy: "Payment Date",
      sortDir: "desc",
      page,
      pageSize: 20,
    })
      .then((res) => setReport(res.report))
      .catch(() => setReport(null))
      .finally(() => setLoading(false));
  }, [startDate, endDate, paymentStatus, debounced, page]);

  useEffect(load, [load]);
  useEffect(() => setPage(1), [debounced, startDate, endDate, paymentStatus]);

  return (
    <div className="space-y-6">
      <PageHeader title="Payments" description="Every transaction recorded across the academy." />

      <div className="flex flex-wrap gap-3">
        <div className="relative min-w-[220px] flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input className="input pl-9" placeholder="Search receipt, student, reference…" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
        <input type="date" className="input w-auto" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        <input type="date" className="input w-auto" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        <select className="input w-auto min-w-[160px]" value={paymentStatus} onChange={(e) => setPaymentStatus(e.target.value)}>
          <option value="">All statuses</option>
          <option>Paid In Full</option>
          <option>Part Payment</option>
        </select>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        {loading ? (
          <TableSkeleton cols={7} />
        ) : report?.items?.length ? (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-border bg-muted/40 text-left text-xs uppercase tracking-wide text-muted-foreground">
                  <tr>
                    {["Receipt", "Student", "Course", "Amount", "Balance", "Status", "Method", "Reference", "Received By", "Date"].map((h) => (
                      <th key={h} className="whitespace-nowrap px-4 py-3 font-medium">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {report.items.map((p) => (
                    <tr key={String(p["Payment ID"])} onClick={() => setSelected(p)} className="cursor-pointer transition hover:bg-muted/40">
                      <td className="whitespace-nowrap px-4 py-3 font-medium">{String(p["Receipt Number"] ?? "")}</td>
                      <td className="whitespace-nowrap px-4 py-3">{String(p["Student Name"] ?? "")}</td>
                      <td className="whitespace-nowrap px-4 py-3">{String(p["Course"] ?? "")}</td>
                      <td className="whitespace-nowrap px-4 py-3 tabular-nums">{naira(p["Amount Paid"])}</td>
                      <td className="whitespace-nowrap px-4 py-3 tabular-nums">{naira(p["Balance Remaining"])}</td>
                      <td className="whitespace-nowrap px-4 py-3"><StatusBadge status={p["Payment Status"]} /></td>
                      <td className="whitespace-nowrap px-4 py-3">{String(p["Payment Method"] ?? "")}</td>
                      <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">{String(p["Transaction Reference"] ?? "—")}</td>
                      <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">{String(p["Received By"] ?? "—")}</td>
                      <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">{formatDate(p["Payment Date"])}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pager page={report.page} totalPages={report.totalPages} totalItems={report.totalItems} onChange={setPage} />
          </>
        ) : (
          <EmptyState title="No payments found" description="Adjust the filters or date range." />
        )}
      </div>

      {selected ? (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50" onClick={() => setSelected(null)}>
          <div className="h-full w-full max-w-md overflow-y-auto border-l border-border bg-card p-6" onClick={(e) => e.stopPropagation()}>
            <h2 className="font-display text-xl font-semibold">{String(selected["Receipt Number"] ?? "Payment")}</h2>
            <dl className="mt-4 space-y-3 text-sm">
              {Object.entries(selected).map(([k, v]) => (
                <div key={k} className="flex gap-3">
                  <dt className="w-40 shrink-0 text-muted-foreground">{k}</dt>
                  <dd className="break-words">
                    {k === "Bank Receipt URL" && v ? (
                      <a href={String(v)} target="_blank" rel="noreferrer" className="text-primary underline underline-offset-4">
                        View receipt
                      </a>
                    ) : (
                      String(v ?? "—") || "—"
                    )}
                  </dd>
                </div>
              ))}
            </dl>
            <button onClick={() => setSelected(null)} className="mt-6 w-full rounded-xl border border-border py-2 text-sm">
              Close
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}