import { useCallback, useEffect, useState } from "react";
import { Loader2, Plus, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { callApi, formatDateTime, type Row } from "@/admin/lib/api";
import type { Permissions } from "@/admin/lib/api";
import { ALL_PERMISSION_KEYS, PERMISSION_GROUPS, ROLE_ACCESS, NAV_PERMISSION, defaultPermissions } from "@/admin/lib/roles";
import { EmptyState, PageHeader, StatusBadge, TableSkeleton } from "@/admin/components/primitives";

const ROLES = ["Super Admin", "Finance", "Admissions", "Manager", "Tutor", "Custom"];
const empty = { fullName: "", email: "", username: "", password: "", role: "Finance" };

/** Sensible starting permissions for a role — the grid stays fully editable afterwards. */
function presetFor(role: string): Permissions {
  if (role === "Super Admin") return defaultPermissions(true);
  const perms = defaultPermissions(false);
  const navs = ROLE_ACCESS[role] ?? [];
  navs.forEach((n) => {
    const key = NAV_PERMISSION[n];
    if (key) perms[key] = true;
  });
  if (role === "Finance") perms.record_payments = true;
  if (role === "Admissions") {
    perms.edit_students = true;
    perms.send_messages = true;
  }
  if (role === "Manager") {
    perms.record_payments = true;
    perms.edit_students = true;
    perms.send_messages = true;
    perms.export_data = true;
  }
  return perms;
}

export default function AdminAdminsPage() {
  const [admins, setAdmins] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ ...empty });
  const [permissions, setPermissions] = useState<Permissions>(() => presetFor("Finance"));
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
      await callApi("createAdmin", { ...form, permissions });
      toast.success("Admin created");
      setOpen(false);
      setForm({ ...empty });
      setPermissions(presetFor(empty.role));
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
        <DialogContent className="max-h-[92vh] overflow-y-auto sm:max-w-lg">
          <DialogHeader><DialogTitle>Add admin</DialogTitle></DialogHeader>
          <form onSubmit={submit} className="space-y-3">
            <input className="input" placeholder="Full name" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} required />
            <input className="input" type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
            <input className="input" placeholder="Username" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} required />
            <input className="input" type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
            <select
              className="input"
              value={form.role}
              onChange={(e) => {
                const role = e.target.value;
                setForm({ ...form, role });
                if (role !== "Custom") setPermissions(presetFor(role));
              }}
            >
              {ROLES.map((r) => <option key={r}>{r}</option>)}
            </select>

            <div className="rounded-xl border border-border">
              <div className="flex items-center justify-between border-b border-border px-3 py-2">
                <span className="inline-flex items-center gap-2 text-sm font-medium">
                  <ShieldCheck className="size-4 text-primary" /> Permissions
                </span>
                <div className="flex gap-2 text-xs">
                  <button type="button" className="text-primary" onClick={() => setPermissions(defaultPermissions(true))}>
                    All
                  </button>
                  <button type="button" className="text-muted-foreground" onClick={() => setPermissions(defaultPermissions(false))}>
                    None
                  </button>
                </div>
              </div>
              <div className="max-h-64 space-y-4 overflow-y-auto p-3">
                {PERMISSION_GROUPS.map((g) => (
                  <div key={g.group}>
                    <p className="mb-2 text-xs uppercase tracking-wide text-muted-foreground">{g.group}</p>
                    <div className="space-y-2">
                      {g.keys.map((k) => (
                        <label key={k.key} className="flex items-center justify-between gap-3 text-sm">
                          <span>{k.label}</span>
                          <Switch
                            checked={!!permissions[k.key]}
                            onCheckedChange={(v) => {
                              setPermissions((p) => ({ ...p, [k.key]: v }));
                              setForm((f) => (f.role === "Custom" ? f : { ...f, role: "Custom" }));
                            }}
                          />
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <p className="border-t border-border px-3 py-2 text-xs text-muted-foreground">
                {ALL_PERMISSION_KEYS.filter((k) => permissions[k]).length} of {ALL_PERMISSION_KEYS.length} enabled
              </p>
            </div>

            <Button type="submit" disabled={saving} className="w-full active:scale-95">
              {saving ? <Loader2 className="mr-2 size-4 animate-spin" /> : null}
              {saving ? "Saving…" : "Create admin"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}