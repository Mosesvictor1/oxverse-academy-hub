import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAdminAuth } from "@/admin/lib/auth";
import { AdminApiError } from "@/admin/lib/api";

export default function AdminLoginPage() {
  const { admin, login, loading } = useAdminAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [shake, setShake] = useState(0);
  const navigate = useNavigate();

  if (!loading && admin) return <Navigate to="/admin" replace />;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await login(username.trim(), password);
      navigate("/admin", { replace: true });
    } catch (err) {
      setError(err instanceof AdminApiError ? err.message : "Sign in failed.");
      setShake((s) => s + 1);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative grid min-h-screen place-items-center overflow-hidden bg-background px-4 py-12">
      <div className="pointer-events-none absolute inset-0 grid-pattern opacity-60" />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 size-[38rem] -translate-x-1/2 rounded-full bg-primary/25 blur-[120px]"
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        key={shake}
        initial={{ opacity: 0, y: 18 }}
        animate={
          shake
            ? { opacity: 1, y: 0, x: [0, -10, 10, -6, 6, 0] }
            : { opacity: 1, y: 0 }
        }
        transition={{ duration: 0.45 }}
        className="relative w-full max-w-sm rounded-2xl border border-border bg-card/80 p-8 shadow-2xl backdrop-blur"
      >
        <div className="mb-7 text-center">
          <span className="mx-auto mb-3 grid size-12 place-items-center rounded-2xl bg-primary font-display text-lg font-bold text-primary-foreground">
            0x
          </span>
          <h1 className="font-display text-xl font-semibold tracking-tight">0xVerse Admin</h1>
          <p className="mt-1 text-sm text-muted-foreground">Staff sign-in</p>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium">Username</span>
            <input
              className="input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              required
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium">Password</span>
            <input
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </label>

          {error ? <p className="text-sm text-destructive">{error}</p> : null}

          <Button
            type="submit"
            disabled={submitting}
            className="w-full shadow-lg shadow-primary/25 transition active:scale-[0.98]"
          >
            {submitting ? <Loader2 className="mr-2 size-4 animate-spin" /> : null}
            Sign in
          </Button>
        </form>
      </motion.div>
    </div>
  );
}