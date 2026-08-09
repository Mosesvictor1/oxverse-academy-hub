import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { callApi, getToken, setToken, type Admin, type Permissions } from "./api";

/** The backend may return permissions alongside the admin object or nested inside it. */
function merge(admin: Admin, permissions?: Permissions): Admin {
  return { ...admin, permissions: admin.permissions ?? permissions };
}

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
    callApi<{ valid: boolean; admin: Admin; permissions?: Permissions }>("validateSession")
      .then((res) => {
        if (cancelled) return;
        if (res.valid && res.admin) setAdmin(merge(res.admin, res.permissions));
        else setToken(null);
      })
      .catch(() => setToken(null))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, []);

  const login = useCallback(async (username: string, password: string) => {
    const res = await callApi<{ token: string; admin: Admin; permissions?: Permissions }>("login", {
      username,
      password,
    });
    setToken(res.token);
    setAdmin(merge(res.admin, res.permissions));
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