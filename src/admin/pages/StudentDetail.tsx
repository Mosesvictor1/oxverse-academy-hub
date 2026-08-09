import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Mail, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { callApi, formatDate, formatDateTime, naira, type Row } from "@/admin/lib/api";
import { useAdminAuth } from "@/admin/lib/auth";
import { can, canRecordPayment } from "@/admin/lib/roles";
import { EmptyState, StatusBadge } from "@/admin/components/primitives";
import { RecordPaymentDialog } from "@/admin/components/RecordPaymentDialog";
import { ReceiptLink } from "@/admin/components/ReceiptViewer";
import { ComposeMessageDialog } from "@/admin/components/ComposeMessageDialog";

const FIELDS = [
  "Email",
  "Phone",
  "Course",
  "Department",
  "Level",
  "Academic Session",
  "Cohort",
  "Residential Address",
  "Registration Source",
  "Status",
  "Created At",
];

export default function AdminStudentDetailPage() {
  const { studentId } = useParams();
  const [student, setStudent] = useState<Row | null>(null);
  const [payments, setPayments] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [payOpen, setPayOpen] = useState(false);
  const [messageOpen, setMessageOpen] = useState(false);
  const { admin } = useAdminAuth();

  const load = useCallback(() => {
    if (!studentId) return;
    setLoading(true);
    callApi<{ student: Row; payments: Row[] }>("getStudent", { studentId })
      .then((res) => {
        setStudent(res.student);
        setPayments(res.payments ?? []);
      })
      .catch(() => setStudent(null))
      .finally(() => setLoading(false));
  }, [studentId]);

  useEffect(load, [load]);

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-56" />
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (!student) return <EmptyState title="Student not found" description="This record may have been removed." />;

  return (
    <div className="space-y-6">
      <Link to="/admin/students" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" /> Back to students
      </Link>

      <div className="flex flex-wrap items-start justify-between gap-4 rounded-2xl border border-border bg-card p-6">
        <div>
          <p className="text-xs text-muted-foreground">{String(student["Student ID"] ?? "")}</p>
          <h1 className="font-display text-2xl font-semibold tracking-tight">{String(student["Full Name"] ?? "")}</h1>
          <div className="mt-2 flex flex-wrap gap-2">
            <StatusBadge status={student["Payment Status"]} />
            <StatusBadge status={student["Status"]} />
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {can(admin, "send_messages") && student["Email"] ? (
            <Button variant="outline" onClick={() => setMessageOpen(true)} className="active:scale-95">
              <Mail className="mr-2 size-4" /> Message
            </Button>
          ) : null}
          {canRecordPayment(admin?.role) ? (
            <Button onClick={() => setPayOpen(true)} className="active:scale-95">
              <Plus className="mr-2 size-4" /> Record Payment
            </Button>
          ) : null}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Course Fee", value: naira(student["Course Fee"]) },
          { label: "Amount Paid", value: naira(student["Amount Paid"]) },
          { label: "Balance Remaining", value: naira(student["Balance Remaining"]) },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-border bg-card p-5">
            <p className="text-sm text-muted-foreground">{s.label}</p>
            <p className="mt-1 font-display text-2xl font-semibold tabular-nums">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-border bg-card p-6">
        <h2 className="font-display text-lg font-semibold">Profile</h2>
        <dl className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FIELDS.map((f) => (
            <div key={f}>
              <dt className="text-xs uppercase tracking-wide text-muted-foreground">{f}</dt>
              <dd className="mt-0.5 break-words text-sm">
                {f === "Created At" ? formatDateTime(student[f]) : String(student[f] ?? "—") || "—"}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        <div className="border-b border-border px-5 py-4">
          <h2 className="font-display text-lg font-semibold">Payment history</h2>
        </div>
        {payments.length ? (
          <ol className="divide-y divide-border">
            {payments.map((p) => (
              <li key={String(p["Payment ID"])} className="flex flex-wrap items-center gap-3 px-5 py-4">
                <span className="grid size-9 place-items-center rounded-xl bg-primary/10 text-xs font-semibold text-primary">
                  #{String(p["Installment Number"] ?? "")}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">{naira(p["Amount Paid"])} · {String(p["Payment Method"] ?? "")}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {String(p["Receipt Number"] ?? "")} · {formatDate(p["Payment Date"])} · Received by {String(p["Received By"] ?? "—")}
                  </p>
                </div>
                <span className="text-sm text-muted-foreground tabular-nums">Bal {naira(p["Balance Remaining"])}</span>
                {p["Bank Receipt URL"] ? (
                  <span className="text-sm">
                    <ReceiptLink url={String(p["Bank Receipt URL"])} />
                  </span>
                ) : null}
              </li>
            ))}
          </ol>
        ) : (
          <EmptyState title="No payments recorded yet" />
        )}
      </div>

      <RecordPaymentDialog
        open={payOpen}
        onOpenChange={setPayOpen}
        presetEmail={String(student["Email"] ?? "")}
        presetStudent={student}
        onRecorded={load}
      />

      <ComposeMessageDialog
        open={messageOpen}
        onOpenChange={setMessageOpen}
        initialMode="people"
        initialEmails={[String(student["Email"] ?? "")].filter(Boolean)}
      />
    </div>
  );
}