import { useCallback, useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { callApi, naira, type Row } from "@/admin/lib/api";
import { useAdminAuth } from "@/admin/lib/auth";
import { canWrite } from "@/admin/lib/roles";
import { EmptyState, PageHeader, StatusBadge, TableSkeleton } from "@/admin/components/primitives";

const empty = { courseTitle: "", courseSlug: "", department: "", duration: "", fee: "" };

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ ...empty });
  const [saving, setSaving] = useState(false);
  const { admin } = useAdminAuth();

  const load = useCallback(() => {
    setLoading(true);
    callApi<{ courses: Row[] }>("getCourses")
      .then((res) => setCourses(res.courses ?? []))
      .catch(() => setCourses([]))
      .finally(() => setLoading(false));
  }, []);
  useEffect(load, [load]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await callApi("createCourse", { ...form, fee: Number(form.fee) });
      toast.success("Course created");
      setOpen(false);
      setForm({ ...empty });
      load();
    } catch {
      /* toast handled globally */
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Courses"
        description="Programmes offered by the academy."
        actions={canWrite(admin?.role) ? <Button onClick={() => setOpen(true)} className="active:scale-95"><Plus className="mr-2 size-4" /> Add Course</Button> : null}
      />
      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        {loading ? (
          <TableSkeleton cols={5} />
        ) : courses.length ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-border bg-muted/40 text-left text-xs uppercase text-muted-foreground">
                <tr>{["Title", "Slug", "Department", "Duration", "Fee", "Status"].map((h) => <th key={h} className="px-4 py-3 font-medium">{h}</th>)}</tr>
              </thead>
              <tbody className="divide-y divide-border">
                {courses.map((c) => (
                  <tr key={String(c["Course ID"] ?? c["Course Slug"])}>
                    <td className="whitespace-nowrap px-4 py-3 font-medium">{String(c["Course Title"] ?? "")}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">{String(c["Course Slug"] ?? "")}</td>
                    <td className="whitespace-nowrap px-4 py-3">{String(c["Department"] ?? "")}</td>
                    <td className="whitespace-nowrap px-4 py-3">{String(c["Duration"] ?? "")}</td>
                    <td className="whitespace-nowrap px-4 py-3 tabular-nums">{naira(c["Fee"])}</td>
                    <td className="whitespace-nowrap px-4 py-3"><StatusBadge status={c["Status"]} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState title="No courses yet" />
        )}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Add course</DialogTitle></DialogHeader>
          <form onSubmit={submit} className="space-y-3">
            <input className="input" placeholder="Course title" value={form.courseTitle} onChange={(e) => setForm({ ...form, courseTitle: e.target.value })} required />
            <input className="input" placeholder="Slug (e.g. data-analytics)" value={form.courseSlug} onChange={(e) => setForm({ ...form, courseSlug: e.target.value })} required />
            <input className="input" placeholder="Department" value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} />
            <input className="input" placeholder="Duration (e.g. 12 weeks)" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} />
            <input className="input" type="number" placeholder="Fee (₦)" value={form.fee} onChange={(e) => setForm({ ...form, fee: e.target.value })} required />
            <Button type="submit" disabled={saving} className="w-full active:scale-95">{saving ? "Saving…" : "Create course"}</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}