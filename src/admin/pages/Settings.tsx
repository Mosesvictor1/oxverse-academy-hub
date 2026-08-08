import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { callApi } from "@/admin/lib/api";
import { PageHeader, TableSkeleton } from "@/admin/components/primitives";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [savingKey, setSavingKey] = useState<string | null>(null);
  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("");

  useEffect(() => {
    callApi<{ settings: Record<string, string> }>("getSettings")
      .then((res) => setSettings(res.settings ?? {}))
      .catch(() => undefined)
      .finally(() => setLoading(false));
  }, []);

  const save = async (key: string, value: string) => {
    setSavingKey(key);
    try {
      await callApi("updateSettings", { key, value });
      setSettings((s) => ({ ...s, [key]: value }));
      toast.success(`Saved ${key}`);
    } catch {
      /* handled globally */
    } finally {
      setSavingKey(null);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Settings" description="Configuration values used across the academy backend." />
      <div className="rounded-2xl border border-border bg-card p-5">
        {loading ? (
          <TableSkeleton rows={4} cols={2} />
        ) : (
          <div className="space-y-3">
            {Object.entries(settings).map(([key, value]) => (
              <div key={key} className="flex flex-wrap items-center gap-3">
                <span className="w-56 shrink-0 text-sm font-medium">{key}</span>
                <input
                  className="input flex-1"
                  value={value ?? ""}
                  onChange={(e) => setSettings((s) => ({ ...s, [key]: e.target.value }))}
                />
                <Button variant="outline" disabled={savingKey === key} onClick={() => save(key, settings[key])} className="active:scale-95">
                  {savingKey === key ? "Saving…" : "Save"}
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="rounded-2xl border border-border bg-card p-5">
        <h2 className="font-display font-semibold">Add setting</h2>
        <div className="mt-3 flex flex-wrap gap-3">
          <input className="input w-56" placeholder="Key" value={newKey} onChange={(e) => setNewKey(e.target.value)} />
          <input className="input flex-1" placeholder="Value" value={newValue} onChange={(e) => setNewValue(e.target.value)} />
          <Button
            disabled={!newKey.trim() || savingKey === newKey}
            onClick={async () => {
              await save(newKey.trim(), newValue);
              setNewKey("");
              setNewValue("");
            }}
            className="active:scale-95"
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}