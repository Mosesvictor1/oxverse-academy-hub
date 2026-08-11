import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2, PartyPopper, User, BookOpen, CreditCard, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { callApi, naira, num, type Row } from "@/admin/lib/api";
import { useDebounced } from "./primitives";

type Result = {
  receiptNumber: string;
  balance: number;
  paymentStatus: string;
  studentId: string;
  amountPaid: number;
};

const REGISTRATION_SOURCES = ["", "Waitlist", "Free Class", "Summer Bootcamp", "IT Registrations"];
const METHODS = ["Bank Transfer", "Cash", "POS", "Other"];

type FormState = typeof empty;

const empty = {
  email: "",
  fullName: "",
  phone: "",
  course: "",
  courseFee: "",
  department: "",
  level: "",
  academicSession: "",
  cohort: "",
  residentialAddress: "",
  registrationSource: "",
  amountPaid: "",
  paymentMethod: "Bank Transfer",
  transactionReference: "",
  bankReceiptUrl: "",
  nextPaymentDue: "",
  remark: "",
};

function buildFormState(student: Row | null | undefined, payments: Row[] = [], fallback: FormState): FormState {
  const latestPayment = payments[0] as Row | undefined;

  const pick = (studentKey: string, paymentKey: string, fallbackValue: string) => {
    const fromStudent = student?.[studentKey];
    if (fromStudent !== undefined && fromStudent !== null && fromStudent !== "") return String(fromStudent);
    const fromPayment = latestPayment?.[paymentKey];
    if (fromPayment !== undefined && fromPayment !== null && fromPayment !== "") return String(fromPayment);
    return fallbackValue;
  };

  const balance = num(student?.["Balance Remaining"] ?? latestPayment?.["Balance Remaining"] ?? latestPayment?.["Balance"]);
  const nextDue = student?.["Next Payment Due"] ?? latestPayment?.["Next Payment Due"];
  const nextDueValue = nextDue ? String(nextDue).slice(0, 10) : fallback.nextPaymentDue;

  return {
    ...fallback,
    email: pick("Email", "Email", fallback.email),
    fullName: pick("Full Name", "Student Name", fallback.fullName),
    phone: pick("Phone Number", "Phone Number", fallback.phone),
    course: pick("Course", "Course", fallback.course),
    courseFee: pick("Course Fee", "Course Fee", fallback.courseFee),
    department: pick("Department", "Department", fallback.department),
    level: pick("Level", "Level", fallback.level),
    academicSession: pick("Academic Session", "Academic Session", fallback.academicSession),
    cohort: pick("Cohort", "Cohort", fallback.cohort),
    residentialAddress: pick("Residential Address", "Residential Address", fallback.residentialAddress),
    registrationSource: pick("Registration Source", "Registration Source", fallback.registrationSource),
    amountPaid: balance > 0 ? String(balance) : fallback.amountPaid,
    paymentMethod: pick("Payment Method", "Payment Method", fallback.paymentMethod),
    transactionReference: pick("Transaction Reference", "Transaction Reference", fallback.transactionReference),
    bankReceiptUrl: pick("Bank Receipt URL", "Bank Receipt URL", fallback.bankReceiptUrl),
    nextPaymentDue: nextDueValue,
    remark: pick("Remark", "Remark", fallback.remark),
  };
}

function paymentStatusVariant(status: string): "default" | "secondary" | "destructive" | "outline" {
  const s = status?.toLowerCase();
  if (s === "paid" || s === "full payment") return "default";
  if (s === "part payment") return "secondary";
  return "outline";
}

function StudentInfoCard({ student, payments }: { student: Row; payments: Row[] }) {
  const latestPayment = payments[0] as Row | undefined;

  const courseFee = num(student["Course Fee"] ?? latestPayment?.["Course Fee"]);
  const amountPaid = num(student["Amount Paid"] ?? latestPayment?.["Amount Paid"]);
  const balance = num(student["Balance Remaining"] ?? latestPayment?.["Balance"] ?? latestPayment?.["Balance Remaining"]);
  const paymentStatus = String(student["Payment Status"] ?? latestPayment?.["Payment Status"] ?? "");
  const course = String(student["Course"] ?? latestPayment?.["Course"] ?? "");
  const name = String(student["Full Name"] ?? latestPayment?.["Student Name"] ?? "");
  const studentId = String(student["Student ID"] ?? "");
  const phone = String(student["Phone Number"] ?? "");
  const department = String(student["Department"] ?? "");
  const installment = String(student["Installment"] ?? "");
  const nextDue = student["Next Payment Due"] ? String(student["Next Payment Due"]).slice(0, 10) : null;
  const lastPayment = latestPayment?.["Payment Date"]
    ? new Date(String(latestPayment["Payment Date"])).toLocaleDateString("en-NG", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : null;
  const paidPct = courseFee > 0 ? Math.min(100, Math.round((amountPaid / courseFee) * 100)) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      className="rounded-xl border border-border bg-muted/40 p-4 sm:col-span-2"
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="grid size-10 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
            <User className="size-5" />
          </div>
          <div>
            <p className="font-semibold leading-tight">{name}</p>
            <p className="text-xs text-muted-foreground">{studentId} · {phone}</p>
          </div>
        </div>
        <Badge variant={paymentStatusVariant(paymentStatus)} className="text-xs">
          {paymentStatus || "Unknown"}
        </Badge>
      </div>

      {/* Course info */}
      <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
        <BookOpen className="size-3.5 shrink-0" />
        <span className="font-medium text-foreground">{course}</span>
        {department ? <span className="text-xs">· {department}</span> : null}
      </div>

      {/* Payment summary */}
      <div className="mt-3 grid grid-cols-3 gap-2 text-center">
        <div className="rounded-lg bg-background border border-border p-2">
          <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Course Fee</p>
          <p className="mt-0.5 text-sm font-semibold">{naira(courseFee)}</p>
        </div>
        <div className="rounded-lg bg-background border border-border p-2">
          <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Paid</p>
          <p className="mt-0.5 text-sm font-semibold text-emerald-600">{naira(amountPaid)}</p>
        </div>
        <div className={`rounded-lg border p-2 ${balance > 0 ? "bg-amber-50 border-amber-200 dark:bg-amber-950/20 dark:border-amber-800" : "bg-background border-border"}`}>
          <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Balance</p>
          <p className={`mt-0.5 text-sm font-semibold ${balance > 0 ? "text-amber-600" : "text-emerald-600"}`}>
            {balance > 0 ? naira(balance) : "Cleared"}
          </p>
        </div>
      </div>

      {/* Progress bar */}
      {courseFee > 0 && (
        <div className="mt-3">
          <div className="flex justify-between text-[10px] text-muted-foreground mb-1">
            <span>Payment progress</span>
            <span>{paidPct}%</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-border overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${paidPct}%` }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className={`h-full rounded-full ${paidPct >= 100 ? "bg-emerald-500" : "bg-primary"}`}
            />
          </div>
        </div>
      )}

      {/* Meta row */}
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
        {installment === "Yes" && (
          <span className="flex items-center gap-1">
            <CreditCard className="size-3" /> Installment plan
          </span>
        )}
        {lastPayment && <span>Last payment: <span className="text-foreground">{lastPayment}</span></span>}
        {nextDue && balance > 0 && (
          <span className="flex items-center gap-1 text-amber-600">
            <AlertCircle className="size-3" />
            Next due: {new Date(nextDue).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" })}
          </span>
        )}
      </div>
    </motion.div>
  );
}

export function RecordPaymentDialog({
  open,
  onOpenChange,
  presetEmail,
  presetStudent,
  onRecorded,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  presetEmail?: string;
  presetStudent?: Row | null;
  onRecorded?: () => void;
}) {
  const [form, setForm] = useState<FormState>({ ...empty });
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [lookup, setLookup] = useState<"idle" | "checking" | "found" | "new">("idle");
  const [foundStudent, setFoundStudent] = useState<Row | null>(null);
  const [foundPayments, setFoundPayments] = useState<Row[]>([]);
  const debouncedEmail = useDebounced(form.email, 600);

  useEffect(() => {
    if (open) {
      const initialState = { ...empty, email: presetEmail ?? "" };
      setForm(buildFormState(presetStudent, [], initialState));
      setFoundStudent(presetStudent ?? null);
      setFoundPayments([]);
      setResult(null);
      setLookup(presetStudent ? "found" : "idle");
    }
  }, [open, presetEmail, presetStudent]);

  useEffect(() => {
    if (!open) return;
    const email = debouncedEmail.trim();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setLookup("idle");
      setFoundStudent(null);
      setFoundPayments([]);
      return;
    }
    let cancelled = false;
    setLookup("checking");
    callApi<{ student: Row; payments: Row[] }>("getStudent", { email })
      .then((res) => {
        if (cancelled) return;
        setLookup("found");
        setFoundStudent(res.student);
        setFoundPayments(res.payments ?? []);
        setForm((f) => buildFormState(res.student, res.payments ?? [], f));
      })
      .catch(() => {
        if (!cancelled) {
          setLookup("new");
          setFoundStudent(null);
          setFoundPayments([]);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [debouncedEmail, open]);

  const set = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email.trim()) return toast.error("Email is required.");
    if (!form.amountPaid || num(form.amountPaid) <= 0) return toast.error("Enter a valid amount.");
    setSubmitting(true);
    try {
      const res = await callApi<Result & { message: string }>("recordPayment", {
        ...form,
        courseFee: form.courseFee ? num(form.courseFee) : "",
        amountPaid: num(form.amountPaid),
      });
      setResult(res);
      toast.success(`Receipt ${res.receiptNumber}`, {
        description:
          num(res.balance) === 0
            ? "Paid in full 🎉"
            : `Part payment recorded — balance ${naira(res.balance)} remaining.`,
      });
      onRecorded?.();
    } catch {
      /* global handler toasts */
    } finally {
      setSubmitting(false);
    }
  };

  const isNew = lookup === "new";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] overflow-y-auto sm:max-w-2xl">
        <AnimatePresence mode="wait">
          {result ? (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-3 py-8 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 16 }}
                className={`grid size-16 place-items-center rounded-full ${
                  num(result.balance) === 0 ? "bg-emerald-500/15 text-emerald-500" : "bg-amber-500/15 text-amber-500"
                }`}
              >
                {num(result.balance) === 0 ? <PartyPopper className="size-8" /> : <Check className="size-8" />}
              </motion.div>
              <h3 className="font-display text-xl font-semibold">
                {num(result.balance) === 0 ? "🎉 Paid in Full" : "Part payment recorded"}
              </h3>
              <p className="text-sm text-muted-foreground">
                Receipt <span className="font-medium text-foreground">{result.receiptNumber}</span> ·{" "}
                {naira(result.amountPaid)} received
                {num(result.balance) > 0 ? ` · balance ${naira(result.balance)} remaining` : ""}
              </p>
              <div className="mt-3 flex gap-2">
                <Button variant="outline" onClick={() => setResult(null)}>
                  Record another
                </Button>
                <Button onClick={() => onOpenChange(false)}>Done</Button>
              </div>
            </motion.div>
          ) : (
            <motion.form key="form" onSubmit={submit} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <DialogHeader>
                <DialogTitle>Record payment</DialogTitle>
                <DialogDescription>
                  Enter the student's email — we'll look them up automatically.
                </DialogDescription>
              </DialogHeader>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <Field label="Email" required className="sm:col-span-2">
                  <input className="input" type="email" value={form.email} onChange={set("email")} required />
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                    {lookup === "checking" && <Loader2 className="size-3 animate-spin" />}
                    {lookup === "checking" && "Checking records…"}
                    {lookup === "found" && "✓ Existing student found — details prefilled."}
                    {lookup === "new" && "No record found — fill in the new student details below."}
                  </p>
                </Field>

                {/* Student info card shown when a match is found */}
                <AnimatePresence>
                  {lookup === "found" && foundStudent && (
                    <StudentInfoCard student={foundStudent} payments={foundPayments} />
                  )}
                </AnimatePresence>

                {/* New student fields */}
                <AnimatePresence initial={false}>
                  {isNew && (
                    <motion.div
                      className="grid gap-4 sm:col-span-2 sm:grid-cols-2 rounded-xl border border-border p-4"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <p className="sm:col-span-2 text-sm font-medium">New student details</p>
                      <Field label="Full name">
                        <input className="input" value={form.fullName} onChange={set("fullName")} />
                      </Field>
                      <Field label="Phone">
                        <input className="input" value={form.phone} onChange={set("phone")} />
                      </Field>
                      <Field label="Course">
                        <input className="input" value={form.course} onChange={set("course")} />
                      </Field>
                      <Field label="Course fee (₦)">
                        <input className="input" inputMode="numeric" value={form.courseFee} onChange={set("courseFee")} />
                      </Field>
                      <Field label="Department">
                        <input className="input" value={form.department} onChange={set("department")} />
                      </Field>
                      <Field label="Level">
                        <input className="input" value={form.level} onChange={set("level")} />
                      </Field>
                      <Field label="Academic session">
                        <input className="input" value={form.academicSession} onChange={set("academicSession")} />
                      </Field>
                      <Field label="Cohort">
                        <input className="input" value={form.cohort} onChange={set("cohort")} />
                      </Field>
                      <Field label="Residential address" className="sm:col-span-2">
                        <input className="input" value={form.residentialAddress} onChange={set("residentialAddress")} />
                      </Field>
                    </motion.div>
                  )}
                </AnimatePresence>

                <Field label="Registration source">
                  <select className="input" value={form.registrationSource} onChange={set("registrationSource")}>
                    {REGISTRATION_SOURCES.map((s) => (
                      <option key={s} value={s}>
                        {s || "None (manual)"}
                      </option>
                    ))}
                  </select>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Auto-converts a matching public registration into a student record.
                  </p>
                </Field>
                <Field label="Amount paid (₦)" required>
                  <input
                    className="input"
                    inputMode="numeric"
                    value={form.amountPaid}
                    onChange={set("amountPaid")}
                    required
                    placeholder={
                      lookup === "found" && foundStudent
                        ? `Balance: ${naira(num(foundStudent["Balance Remaining"]))}`
                        : ""
                    }
                  />
                  {lookup === "found" && foundStudent && num(foundStudent["Balance Remaining"]) > 0 && (
                    <p className="mt-1 text-xs text-muted-foreground">
                      Pre-filled with outstanding balance. Edit if paying a different amount.
                    </p>
                  )}
                </Field>
                <Field label="Payment method">
                  <select className="input" value={form.paymentMethod} onChange={set("paymentMethod")}>
                    {METHODS.map((m) => (
                      <option key={m}>{m}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Transaction reference">
                  <input className="input" value={form.transactionReference} onChange={set("transactionReference")} />
                </Field>
                <Field label="Bank receipt URL">
                  <input className="input" placeholder="https://…" value={form.bankReceiptUrl} onChange={set("bankReceiptUrl")} />
                </Field>
                <Field label="Next payment due">
                  <input className="input" type="date" value={form.nextPaymentDue} onChange={set("nextPaymentDue")} />
                </Field>
                <Field label="Remark" className="sm:col-span-2">
                  <textarea className="input min-h-20" value={form.remark} onChange={set("remark")} />
                </Field>
              </div>

              <div className="mt-6 flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={submitting} className="active:scale-95 shadow-lg shadow-primary/25">
                  {submitting ? <Loader2 className="mr-2 size-4 animate-spin" /> : null}
                  Record payment
                </Button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}

function Field({
  label,
  children,
  required,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-sm font-medium">
        {label}
        {required ? <span className="text-primary"> *</span> : null}
      </span>
      {children}
    </label>
  );
}