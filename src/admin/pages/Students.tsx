import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { callApi, formatDate, naira, type Paged, type Row } from "@/admin/lib/api";
import { useAdminAuth } from "@/admin/lib/auth";
import { canRecordPayment } from "@/admin/lib/roles";
import { EmptyState, PageHeader, Pager, StatusBadge, TableSkeleton, useDebounced } from "@/admin/components/primitives";
import { RecordPaymentDialog } from "@/admin/components/RecordPaymentDialog";

const STATUSES = ["", "Paid In Full", "Part Payment", "Not Paid"];

export default function AdminStudentsPage() {
  const [query, setQuery] = useState("");
  const debounced = useDebounced(query);
  const [course, setCourse] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [sortBy, setSortBy] = useState("Created At");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(1);
  const [report, setReport] = useState<Paged | null>(null);
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState<string[]>([]);
  const [payOpen, setPayOpen] = useState(false);
  const { admin } = useAdminAuth();
  const navigate = useNavigate();

  const load = useCallback(() => {
    setLoading(true);
    callApi<{ report: Paged }>("getStudents", {
      course,
      paymentStatus,
      query: debounced,
      sortBy,
      sortDir,
      page,
      pageSize: 20,
    })
      .then((res) => setReport(res.report))
      .catch(() => setReport(null))
      .finally(() => setLoading(false));
  }, [course, paymentStatus, debounced, sortBy, sortDir, page]);

  useEffect(load, [load]);
  useEffect(() => setPage(1), [debounced, course, paymentStatus]);

  useEffect(() => {
    callApi<{ courses: Row[] }>("getCourses")
      .then((res) => setCourses((res.courses ?? []).map((c) => String(c["Course Title"] ?? "")).filter(Boolean)))
      .catch(() => undefined);
  }, []);

  const sort = (col: string) => {
    if (sortBy === col) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else {
      setSortBy(col);
      setSortDir("asc");
    }
  };

  const cols: { key: string; label: string; sortable?: boolean }[] = [
    { key: "Student ID", label: "ID", sortable: true },
    { key: "Full Name", label: "Full Name", sortable: true },
    { key: "Course", label: "Course", sortable: true },
    { key: "Course Fee", label: "Fee", sortable: true },
    { key: "Amount Paid", label: "Paid", sortable: true },
    { key: "Balance Remaining", label: "Balance", sortable: true },
    { key: "Payment Status", label: "Payment", sortable: true },
    { key: "Status", label: "Status" },
    { key: "Created At", label: "Created", sortable: true },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Students"
        description="Search, filter and manage every enrolled student."
        actions={
          canRecordPayment(admin?.role) ? (
            <Button onClick={() => setPayOpen(true)} className="active:scale-95">
              <Plus className="mr-2 size-4" /> Record Payment
            </Button>
          ) : null
        }
      />

      <div className="flex flex-wrap gap-3">
        <div className="relative min-w-[220px] flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            className="input pl-9"
            placeholder="Search name, email, phone, student ID…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <select className="input w-auto min-w-[170px]" value={course} onChange={(e) => setCourse(e.target.value)}>
          <option value="">All courses</option>
          {courses.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <select
          className="input w-auto min-w-[160px]"
          value={paymentStatus}
          onChange={(e) => setPaymentStatus(e.target.value)}
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s || "All payment statuses"}
            </option>
          ))}
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
                    {cols.map((c) => (
                      <th
                        key={c.key}
                        onClick={c.sortable ? () => sort(c.key) : undefined}
                        className={`whitespace-nowrap px-4 py-3 font-medium ${c.sortable ? "cursor-pointer select-none hover:text-foreground" : ""}`}
                      >
                        {c.label}
                        {sortBy === c.key ? <span className="ml-1">{sortDir === "asc" ? "↑" : "↓"}</span> : null}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {report.items.map((s) => (
                    <tr
                      key={String(s["Student ID"])}
                      onClick={() => navigate(`/admin/students/${s["Student ID"]}`)}
                      className="cursor-pointer transition hover:bg-muted/40"
                    >
                      <td className="whitespace-nowrap px-4 py-3 text-xs text-muted-foreground">{String(s["Student ID"] ?? "")}</td>
                      <td className="whitespace-nowrap px-4 py-3 font-medium">{String(s["Full Name"] ?? "")}</td>
                      <td className="whitespace-nowrap px-4 py-3">{String(s["Course"] ?? "")}</td>
                      <td className="whitespace-nowrap px-4 py-3 tabular-nums">{naira(s["Course Fee"])}</td>
                      <td className="whitespace-nowrap px-4 py-3 tabular-nums">{naira(s["Amount Paid"])}</td>
                      <td className="whitespace-nowrap px-4 py-3 tabular-nums">{naira(s["Balance Remaining"])}</td>
                      <td className="whitespace-nowrap px-4 py-3"><StatusBadge status={s["Payment Status"]} /></td>
                      <td className="whitespace-nowrap px-4 py-3"><StatusBadge status={s["Status"]} /></td>
                      <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">{formatDate(s["Created At"])}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pager page={report.page} totalPages={report.totalPages} totalItems={report.totalItems} onChange={setPage} />
          </>
        ) : (
          <EmptyState title="No students found" description="Try adjusting your search or filters." />
        )}
      </div>

      <RecordPaymentDialog open={payOpen} onOpenChange={setPayOpen} onRecorded={load} />
    </div>
  );
}