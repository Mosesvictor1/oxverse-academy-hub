import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Area,
  AreaChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Banknote, CalendarDays, Plus, TrendingUp, Users, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { callApi, formatDate, formatMonth, naira, num, type Row } from "@/admin/lib/api";
import { useAdminAuth } from "@/admin/lib/auth";
import { canRecordPayment } from "@/admin/lib/roles";
import { PageHeader, StatCard, Stagger, StaggerItem, StatusBadge, EmptyState } from "@/admin/components/primitives";
import { RecordPaymentDialog } from "@/admin/components/RecordPaymentDialog";

type Dash = {
  totalStudents: number;
  totalRevenue: number;
  revenueToday: number;
  revenueThisMonth: number;
  paidStudents: number;
  partPaymentStudents: number;
  outstandingStudents: number;
  outstandingBalance: number;
  waitlistCount: number;
  summerBootcampCount: number;
  itRegistrationCount: number;
  subscribers: number;
  ambassadors: number;
  contactMessages: number;
  recentStudents: Row[];
  recentPayments: Row[];
  monthlyRevenue: { month: string; revenue: number }[];
  courseDistribution: { course: string; count: number }[];
};

const PIE_COLORS = [
  "var(--purple-500)",
  "var(--purple-700)",
  "var(--purple-200)",
  "var(--purple-900)",
  "var(--purple-600)",
  "var(--purple-100)",
];

export default function AdminDashboardPage() {
  const [data, setData] = useState<Dash | null>(null);
  const [loading, setLoading] = useState(true);
  const [payOpen, setPayOpen] = useState(false);
  const { admin } = useAdminAuth();
  const navigate = useNavigate();

  const load = useCallback(() => {
    setLoading(true);
    callApi<Dash>("getDashboard")
      .then((res) => setData(res as unknown as Dash))
      .catch(() => undefined)
      .finally(() => setLoading(false));
  }, []);

  useEffect(load, [load]);

  const monthly = (data?.monthlyRevenue ?? []).map((m) => ({ ...m, label: formatMonth(m.month) }));
  const dist = data?.courseDistribution ?? [];

  return (
    <div className="space-y-8">
      <PageHeader
        title={`Welcome back, ${admin?.fullName?.split(" ")[0] ?? "there"}`}
        description="Live overview of students, revenue and registrations."
        actions={
          canRecordPayment(admin?.role) ? (
            <Button onClick={() => setPayOpen(true)} className="shadow-lg shadow-primary/25 active:scale-95">
              <Plus className="mr-2 size-4" /> Record Payment
            </Button>
          ) : null
        }
      />

      <Stagger className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard label="Total Students" value={num(data?.totalStudents)} loading={loading} icon={<Users className="size-4" />} accent />
        <StatCard label="Total Revenue" value={num(data?.totalRevenue)} loading={loading} format={naira} icon={<Banknote className="size-4" />} accent />
        <StatCard label="Revenue Today" value={num(data?.revenueToday)} loading={loading} format={naira} icon={<TrendingUp className="size-4" />} />
        <StatCard label="Revenue This Month" value={num(data?.revenueThisMonth)} loading={loading} format={naira} icon={<CalendarDays className="size-4" />} />
        <StatCard label="Outstanding Balance" value={num(data?.outstandingBalance)} loading={loading} format={naira} icon={<Wallet className="size-4" />} />
      </Stagger>

      <Stagger className="grid gap-3 grid-cols-2 md:grid-cols-4 xl:grid-cols-8">
        <StatCard compact label="Paid" value={num(data?.paidStudents)} loading={loading} />
        <StatCard compact label="Part Payment" value={num(data?.partPaymentStudents)} loading={loading} />
        <StatCard compact label="Outstanding" value={num(data?.outstandingStudents)} loading={loading} />
        <StatCard compact label="Waitlist" value={num(data?.waitlistCount)} loading={loading} />
        <StatCard compact label="Summer Bootcamp" value={num(data?.summerBootcampCount)} loading={loading} />
        <StatCard compact label="IT Registrations" value={num(data?.itRegistrationCount)} loading={loading} />
        <StatCard compact label="Subscribers" value={num(data?.subscribers)} loading={loading} />
        <StatCard compact label="Ambassadors" value={num(data?.ambassadors)} loading={loading} />
      </Stagger>

      <Stagger className="grid gap-4 lg:grid-cols-5">
        <StaggerItem className="lg:col-span-3">
          <div className="rounded-2xl border border-border bg-card p-5">
            <h2 className="font-display text-lg font-semibold">Monthly revenue</h2>
            <div className="mt-4 h-72">
              {loading ? (
                <Skeleton className="h-full w-full" />
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthly}>
                    <defs>
                      <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--purple-500)" stopOpacity={0.55} />
                        <stop offset="100%" stopColor="var(--purple-500)" stopOpacity={0.02} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="label" tickLine={false} axisLine={false} fontSize={12} stroke="var(--muted-foreground)" />
                    <YAxis tickFormatter={(v) => `${Math.round(Number(v) / 1000)}k`} tickLine={false} axisLine={false} fontSize={12} stroke="var(--muted-foreground)" width={44} />
                    <Tooltip
                      formatter={(v) => naira(v)}
                      contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12, color: "var(--foreground)" }}
                    />
                    <Area type="monotone" dataKey="revenue" stroke="var(--purple-500)" strokeWidth={2.5} fill="url(#rev)" animationDuration={1200} />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        </StaggerItem>

        <StaggerItem className="lg:col-span-2">
          <div className="rounded-2xl border border-border bg-card p-5">
            <h2 className="font-display text-lg font-semibold">Course distribution</h2>
            <div className="mt-4 h-72">
              {loading ? (
                <Skeleton className="h-full w-full" />
              ) : dist.length ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={dist} dataKey="count" nameKey="course" innerRadius="55%" outerRadius="85%" paddingAngle={3} animationDuration={1100}>
                      {dist.map((_, i) => (
                        <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} stroke="transparent" />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12, color: "var(--foreground)" }} />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <EmptyState title="No course data yet" />
              )}
            </div>
            <ul className="mt-3 space-y-1.5 text-sm">
              {dist.slice(0, 6).map((d, i) => (
                <li key={d.course} className="flex items-center gap-2">
                  <span className="size-2.5 rounded-full" style={{ background: PIE_COLORS[i % PIE_COLORS.length] }} />
                  <span className="flex-1 truncate text-muted-foreground">{d.course}</span>
                  <span className="tabular-nums">{d.count}</span>
                </li>
              ))}
            </ul>
          </div>
        </StaggerItem>
      </Stagger>

      <Stagger className="grid gap-4 lg:grid-cols-2">
        <StaggerItem>
          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            <div className="border-b border-border px-5 py-4">
              <h2 className="font-display text-lg font-semibold">Recent students</h2>
            </div>
            {loading ? (
              <div className="space-y-2 p-4">{Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-10 w-full" />)}</div>
            ) : data?.recentStudents?.length ? (
              <ul className="divide-y divide-border">
                {data.recentStudents.slice(0, 6).map((s) => (
                  <li
                    key={String(s["Student ID"])}
                    onClick={() => navigate(`/admin/students/${s["Student ID"]}`)}
                    className="flex cursor-pointer items-center gap-3 px-5 py-3 transition hover:bg-muted/50"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{String(s["Full Name"] ?? "")}</p>
                      <p className="truncate text-xs text-muted-foreground">{String(s["Course"] ?? "")}</p>
                    </div>
                    <StatusBadge status={s["Payment Status"]} />
                  </li>
                ))}
              </ul>
            ) : (
              <EmptyState title="No students yet" />
            )}
          </div>
        </StaggerItem>

        <StaggerItem>
          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            <div className="border-b border-border px-5 py-4">
              <h2 className="font-display text-lg font-semibold">Recent payments</h2>
            </div>
            {loading ? (
              <div className="space-y-2 p-4">{Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-10 w-full" />)}</div>
            ) : data?.recentPayments?.length ? (
              <ul className="divide-y divide-border">
                {data.recentPayments.slice(0, 6).map((p) => (
                  <li key={String(p["Payment ID"])} className="flex items-center gap-3 px-5 py-3">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{String(p["Student Name"] ?? "")}</p>
                      <p className="truncate text-xs text-muted-foreground">
                        {String(p["Receipt Number"] ?? "")} · {formatDate(p["Payment Date"])}
                      </p>
                    </div>
                    <span className="text-sm font-semibold tabular-nums">{naira(p["Amount Paid"])}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <EmptyState title="No payments yet" />
            )}
          </div>
        </StaggerItem>
      </Stagger>

      <RecordPaymentDialog open={payOpen} onOpenChange={setPayOpen} onRecorded={load} />
    </div>
  );
}