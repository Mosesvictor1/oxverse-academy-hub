import { useCallback, useEffect, useState } from "react";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { callApi, formatDate, formatMonth, naira, num, type Paged, type Row } from "@/admin/lib/api";
import { EmptyState, PageHeader, Pager, TableSkeleton } from "@/admin/components/primitives";
import { cn } from "@/lib/utils";

const TABS = ["Revenue", "Outstanding", "Registrations"] as const;

export default function AdminReportsPage() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Revenue");
  return (
    <div className="space-y-6">
      <PageHeader title="Reports" description="Revenue, outstanding balances and registration sources." />
      <div className="flex gap-2 rounded-xl border border-border bg-card p-1">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "flex-1 rounded-lg px-3 py-2 text-sm transition active:scale-95",
              tab === t ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {t}
          </button>
        ))}
      </div>
      {tab === "Revenue" ? <RevenueReport /> : tab === "Outstanding" ? <OutstandingReport /> : <RegistrationReport />}
    </div>
  );
}

function RevenueReport() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<{
    totalRevenue: number;
    totalTransactions: number;
    revenueByMethod: Record<string, number>;
    monthlyRevenue: { month: string; revenue: number }[];
    payments: Paged;
  } | null>(null);

  const load = useCallback(() => {
    setLoading(true);
    callApi<{
      totalRevenue: number;
      totalTransactions: number;
      revenueByMethod: Record<string, number>;
      monthlyRevenue: { month: string; revenue: number }[];
      payments: Paged;
    }>("revenueReport", { startDate, endDate, page, pageSize: 15 })
      .then((res) => setData(res))
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, [startDate, endDate, page]);

  useEffect(load, [load]);

  const monthly = (data?.monthlyRevenue ?? []).map((m) => ({ ...m, label: formatMonth(m.month) }));
  const methods = Object.entries(data?.revenueByMethod ?? {});

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-3">
        <input type="date" className="input w-auto" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        <input type="date" className="input w-auto" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-border bg-gradient-to-br from-primary/10 to-transparent p-6">
          <p className="text-sm text-muted-foreground">Total revenue</p>
          <p className="mt-1 font-display text-4xl font-semibold tabular-nums">{naira(data?.totalRevenue)}</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6">
          <p className="text-sm text-muted-foreground">Transactions</p>
          <p className="mt-1 font-display text-4xl font-semibold tabular-nums">{num(data?.totalTransactions).toLocaleString()}</p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-5">
          <h3 className="font-display font-semibold">Monthly revenue</h3>
          <div className="mt-4 h-60">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthly}>
                <XAxis dataKey="label" tickLine={false} axisLine={false} fontSize={12} stroke="var(--muted-foreground)" />
                <YAxis tickFormatter={(v) => `${Math.round(Number(v) / 1000)}k`} tickLine={false} axisLine={false} fontSize={12} width={44} stroke="var(--muted-foreground)" />
                <Tooltip formatter={(v) => naira(v)} contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12 }} />
                <Bar dataKey="revenue" fill="var(--purple-500)" radius={[6, 6, 0, 0]} animationDuration={1000} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5">
          <h3 className="font-display font-semibold">Revenue by method</h3>
          <ul className="mt-4 space-y-3">
            {methods.length ? (
              methods.map(([method, value]) => {
                const max = Math.max(...methods.map(([, v]) => Number(v) || 0), 1);
                return (
                  <li key={method}>
                    <div className="flex justify-between text-sm">
                      <span>{method}</span>
                      <span className="tabular-nums">{naira(value)}</span>
                    </div>
                    <div className="mt-1 h-2 overflow-hidden rounded-full bg-muted">
                      <div className="h-full rounded-full bg-primary transition-all duration-700" style={{ width: `${(Number(value) / max) * 100}%` }} />
                    </div>
                  </li>
                );
              })
            ) : (
              <EmptyState title="No revenue data" />
            )}
          </ul>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        {loading ? (
          <TableSkeleton cols={5} />
        ) : data?.payments?.items?.length ? (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-border bg-muted/40 text-left text-xs uppercase text-muted-foreground">
                  <tr>{["Receipt", "Student", "Amount", "Method", "Date"].map((h) => <th key={h} className="px-4 py-3 font-medium">{h}</th>)}</tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {data.payments.items.map((p: Row) => (
                    <tr key={String(p["Payment ID"])}>
                      <td className="whitespace-nowrap px-4 py-3">{String(p["Receipt Number"] ?? "")}</td>
                      <td className="whitespace-nowrap px-4 py-3">{String(p["Student Name"] ?? "")}</td>
                      <td className="whitespace-nowrap px-4 py-3 tabular-nums">{naira(p["Amount Paid"])}</td>
                      <td className="whitespace-nowrap px-4 py-3">{String(p["Payment Method"] ?? "")}</td>
                      <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">{formatDate(p["Payment Date"])}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pager page={data.payments.page} totalPages={data.payments.totalPages} totalItems={data.payments.totalItems} onChange={setPage} />
          </>
        ) : (
          <EmptyState title="No payments in this range" />
        )}
      </div>
    </div>
  );
}

function OutstandingReport() {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [report, setReport] = useState<Paged | null>(null);

  useEffect(() => {
    setLoading(true);
    callApi<{ totalOutstanding: number; report: Paged }>("outstandingStudents", { page, pageSize: 20 })
      .then((res) => {
        setTotal(res.totalOutstanding);
        setReport(res.report);
      })
      .catch(() => setReport(null))
      .finally(() => setLoading(false));
  }, [page]);

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-6">
        <p className="text-sm text-muted-foreground">Total outstanding balance</p>
        <p className="mt-1 font-display text-4xl font-semibold tabular-nums">{naira(total)}</p>
      </div>
      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        {loading ? (
          <TableSkeleton cols={5} />
        ) : report?.items?.length ? (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-border bg-muted/40 text-left text-xs uppercase text-muted-foreground">
                  <tr>{["Student", "Course", "Fee", "Paid", "Balance", ""].map((h) => <th key={h} className="px-4 py-3 font-medium">{h}</th>)}</tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {report.items.map((s: Row) => (
                    <tr key={String(s["Student ID"])}>
                      <td className="whitespace-nowrap px-4 py-3 font-medium">{String(s["Full Name"] ?? "")}</td>
                      <td className="whitespace-nowrap px-4 py-3">{String(s["Course"] ?? "")}</td>
                      <td className="whitespace-nowrap px-4 py-3 tabular-nums">{naira(s["Course Fee"])}</td>
                      <td className="whitespace-nowrap px-4 py-3 tabular-nums">{naira(s["Amount Paid"])}</td>
                      <td className="whitespace-nowrap px-4 py-3 tabular-nums font-semibold">{naira(s["Balance Remaining"])}</td>
                      <td className="px-4 py-3 text-right">
                        <button disabled className="rounded-lg border border-border px-3 py-1.5 text-xs opacity-50">Send reminder</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pager page={report.page} totalPages={report.totalPages} totalItems={report.totalItems} onChange={setPage} />
          </>
        ) : (
          <EmptyState title="No outstanding balances" />
        )}
      </div>
    </div>
  );
}

function RegistrationReport() {
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    callApi<{ registrationCounts: Record<string, number> }>("registrationReport")
      .then((res) => setCounts(res.registrationCounts ?? {}))
      .catch(() => undefined)
      .finally(() => setLoading(false));
  }, []);

  const entries = Object.entries(counts);
  if (loading) return <TableSkeleton rows={2} cols={4} />;
  if (!entries.length) return <EmptyState title="No registrations yet" />;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {entries.map(([key, value]) => (
        <div key={key} className="rounded-2xl border border-border bg-card p-5">
          <p className="text-sm capitalize text-muted-foreground">{key.replace(/([A-Z])/g, " $1").trim()}</p>
          <p className="mt-1 font-display text-3xl font-semibold tabular-nums">{num(value).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}