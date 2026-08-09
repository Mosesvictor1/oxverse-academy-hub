import { useCallback, useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { callApi, formatDateTime, type Row } from "@/admin/lib/api";
import { EmptyState, PageHeader, StatusBadge, TableSkeleton } from "@/admin/components/primitives";

const ROLES = ["Super Admin", "Finance", "Admissions", "Manager", "Tutor"];
const empty = { fullName: "", email: "", username: "", password: "", role: "Finance" };

export default function AdminAdminsPage() {
  const [admins, setAdmins] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ ...empty });
  const [saving, setSaving] = useState(false);

  const load = useCallback(() => {
    setLoading(true);
    callApi<{ admins: Row[] }>("getAdmins")
      .then((res) => setAdmins(res.admins ?? []))
      .catch(() => setAdmins([]))
      .finally(() => setLoading(false));
  }, []);
  useEffect(load, [load]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await callApi("createAdmin", form);
      toast.success("Admin created");
      setOpen(false);
      setForm({ ...empty });
      load();
    } catch {
      /* handled globally */
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Admin Management"
        description="Staff accounts with access to this console."
        actions={<Button onClick={() => setOpen(true)} className="active:scale-95"><Plus className="mr-2 size-4" /> Add Admin</Button>}
      />
      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        {loading ? (
          <TableSkeleton cols={5} />
        ) : admins.length ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-border bg-muted/40 text-left text-xs uppercase text-muted-foreground">
                <tr>{["Full Name", "Username", "Email", "Role", "Status", "Last Login"].map((h) => <th key={h} className="px-4 py-3 font-medium">{h}</th>)}</tr>
              </thead>
              <tbody className="divide-y divide-border">
                {admins.map((a) => (
                  <tr key={String(a["Admin ID"] ?? a["Username"])}>
                    <td className="whitespace-nowrap px-4 py-3 font-medium">{String(a["fullName"] ?? "")}</td>
                    <td className="whitespace-nowrap px-4 py-3">{String(a["username"] ?? "")}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">{String(a["email"] ?? "")}</td>
                    <td className="whitespace-nowrap px-4 py-3">{String(a["role"] ?? "")}</td>
                    <td className="whitespace-nowrap px-4 py-3"><StatusBadge status={a["status"]} /></td>
                    <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">{formatDateTime(a["lastLogin"] ?? "")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState title="No admins found" />
        )}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Add admin</DialogTitle></DialogHeader>
          <form onSubmit={submit} className="space-y-3">
            <input className="input" placeholder="Full name" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} required />
            <input className="input" type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
            <input className="input" placeholder="Username" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} required />
            <input className="input" type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
            <select className="input" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
              {ROLES.map((r) => <option key={r}>{r}</option>)}
            </select>
            <Button type="submit" disabled={saving} className="w-full active:scale-95">{saving ? "Saving…" : "Create admin"}</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}