import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { callApi, getToken, setToken, type Admin } from "./api";

type AuthState = {
  admin: Admin | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  forceLogout: () => void;
};

const AuthContext = createContext<AuthState | null>(null);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const token = getToken();
    if (!token) {
      setLoading(false);
      return;
    }
    callApi<{ valid: boolean; admin: Admin }>("validateSession")
      .then((res) => {
        if (cancelled) return;
        if (res.valid && res.admin) setAdmin(res.admin);
        else setToken(null);
      })
      .catch(() => setToken(null))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, []);

  const login = useCallback(async (username: string, password: string) => {
    const res = await callApi<{ token: string; admin: Admin }>("login", { username, password });
    setToken(res.token);
    setAdmin(res.admin);
  }, []);

  const forceLogout = useCallback(() => {
    setToken(null);
    setAdmin(null);
  }, []);

  const logout = useCallback(async () => {
    try {
      await callApi("logout");
    } catch {
      /* ignore */
    }
    forceLogout();
  }, [forceLogout]);

  const value = useMemo(
    () => ({ admin, loading, login, logout, forceLogout }),
    [admin, loading, login, logout, forceLogout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAdminAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAdminAuth must be used inside AdminAuthProvider");
  return ctx;
}