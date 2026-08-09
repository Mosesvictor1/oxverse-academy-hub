import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2, PartyPopper } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
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
  const debouncedEmail = useDebounced(form.email, 600);

  useEffect(() => {
    if (open) {
      const initialState = { ...empty, email: presetEmail ?? "" };
      setForm(buildFormState(presetStudent, [], initialState));
      setResult(null);
      setLookup("idle");
    }
  }, [open, presetEmail, presetStudent]);

  useEffect(() => {
    if (!open) return;
    const email = debouncedEmail.trim();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setLookup("idle");
      return;
    }
    let cancelled = false;
    setLookup("checking");
    callApi<{ student: Row; payments: Row[] }>("getStudent", { email })
      .then((res) => {
        if (cancelled) return;
        setLookup("found");
        setForm((f) => buildFormState(res.student, res.payments ?? [], f));
      })
      .catch(() => !cancelled && setLookup("new"));
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
                    {lookup === "found" && "Existing student found — details prefilled."}
                    {lookup === "new" && "No record found — fill in the new student details below."}
                  </p>
                </Field>

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
                  <input className="input" inputMode="numeric" value={form.amountPaid} onChange={set("amountPaid")} required />
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