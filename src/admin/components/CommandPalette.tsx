import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { callApi, naira, type Row } from "@/admin/lib/api";
import { useDebounced } from "./primitives";

export function CommandPalette({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const [query, setQuery] = useState("");
  const debounced = useDebounced(query, 350);
  const [students, setStudents] = useState<Row[]>([]);
  const [payments, setPayments] = useState<Row[]>([]);
  const [registrants, setRegistrants] = useState<Row[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!open) {
      setQuery("");
      setStudents([]);
      setPayments([]);
      setRegistrants([]);
    }
  }, [open]);

  useEffect(() => {
    const q = debounced.trim();
    if (!open || q.length < 2) return;
    let cancelled = false;
    setLoading(true);
    callApi<{ students: Row[]; payments: Row[]; registrants: Row[] }>("search", { query: q })
      .then((res) => {
        if (cancelled) return;
        setStudents(res.students ?? []);
        setPayments(res.payments ?? []);
        setRegistrants(res.registrants ?? []);
      })
      .catch(() => undefined)
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [debounced, open]);

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Search students, payments…" value={query} onValueChange={setQuery} />
      <CommandList>
        {!loading && query.length >= 2 && !students.length && !payments.length && !registrants.length ? (
          <CommandEmpty>No results found.</CommandEmpty>
        ) : null}
        {loading ? <div className="p-4 text-sm text-muted-foreground">Searching…</div> : null}
        {students.length ? (
          <CommandGroup heading="Students">
            {students.map((s) => (
              <CommandItem
                key={String(s["Student ID"])}
                value={`student-${s["Student ID"]}-${s["Full Name"]}`}
                onSelect={() => {
                  onOpenChange(false);
                  navigate(`/admin/students/${s["Student ID"]}`);
                }}
              >
                <span className="font-medium">{String(s["Full Name"] ?? "")}</span>
                <span className="ml-2 text-xs text-muted-foreground">
                  {String(s["Course"] ?? "")} · {String(s["Payment Status"] ?? "")}
                </span>
              </CommandItem>
            ))}
          </CommandGroup>
        ) : null}
        {payments.length ? (
          <CommandGroup heading="Payments">
            {payments.map((p) => (
              <CommandItem
                key={String(p["Payment ID"])}
                value={`payment-${p["Payment ID"]}-${p["Student Name"]}`}
                onSelect={() => {
                  onOpenChange(false);
                  navigate("/admin/payments");
                }}
              >
                <span className="font-medium">{String(p["Receipt Number"] ?? "")}</span>
                <span className="ml-2 text-xs text-muted-foreground">
                  {String(p["Student Name"] ?? "")} · {naira(p["Amount Paid"])}
                </span>
              </CommandItem>
            ))}
          </CommandGroup>
        ) : null}
        {registrants.length ? (
          <CommandGroup heading="Registrants">
            {registrants.map((r, i) => {
              const name = String(r["Full Name"] ?? r["Name"] ?? r["Email"] ?? "");
              return (
                <CommandItem
                  key={`reg-${r["_source"]}-${r["_rowIndex"] ?? i}`}
                  value={`registrant-${i}-${name}`}
                  onSelect={() => {
                    onOpenChange(false);
                    navigate("/admin/registrants");
                  }}
                >
                  <span className="font-medium">{name}</span>
                  <span className="ml-2 text-xs text-muted-foreground">
                    {String(r["_source"] ?? "Registrant")} · {String(r["Email"] ?? "")}
                  </span>
                </CommandItem>
              );
            })}
          </CommandGroup>
        ) : null}
      </CommandList>
    </CommandDialog>
  );
}