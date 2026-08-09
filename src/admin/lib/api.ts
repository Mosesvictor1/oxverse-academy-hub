export const ADMIN_API_URL =
  "https://script.google.com/macros/s/AKfycbwXu_A7S5sJN5lYmmnrRKsQGdArcLkxEItiaDp7DddvEMG4tqX36MOVBil0hLjloCJSDA/exec";

export type AdminRole = string;

export type Permissions = Record<string, boolean>;

export type Admin = {
  adminId: string;
  fullName: string;
  username: string;
  role: AdminRole;
  permissions?: Permissions;
};

export type ApiError = {
  success: false;
  error: true;
  code: string;
  message: string;
};

export class AdminApiError extends Error {
  code: string;
  constructor(code: string, message: string) {
    super(message);
    this.code = code;
  }
}

export type Row = Record<string, string | number | boolean | null | undefined>;

export type Paged<T = Row> = {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  items: T[];
};

type Listener = (code: string, message: string) => void;
const listeners = new Set<Listener>();

export function onApiError(fn: Listener) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

let sessionToken: string | null = null;

export function setToken(token: string | null) {
  sessionToken = token;
  try {
    if (token) sessionStorage.setItem("oxv-admin-token", token);
    else sessionStorage.removeItem("oxv-admin-token");
  } catch {
    /* ignore */
  }
}

export function getToken(): string | null {
  if (sessionToken) return sessionToken;
  try {
    sessionToken = sessionStorage.getItem("oxv-admin-token");
  } catch {
    sessionToken = null;
  }
  return sessionToken;
}

export async function callApi<T = Record<string, unknown>>(
  action: string,
  payload: Record<string, unknown> = {},
): Promise<T & { success: true }> {
  const body: Record<string, unknown> = { action, ...payload };
  if (action !== "login") {
    const token = getToken();
    if (token) body.token = token;
  }

  let json: unknown;
  try {
    const res = await fetch(ADMIN_API_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(body),
    });
    json = await res.json();
  } catch {
    const err = new AdminApiError("NETWORK_ERROR", "Could not reach the server. Check your connection.");
    listeners.forEach((l) => l(err.code, err.message));
    throw err;
  }

  const data = json as { success?: boolean; code?: string; message?: string };
  if (!data || data.success !== true) {
    const code = data?.code ?? "SERVER_ERROR";
    const message = data?.message ?? ERROR_MESSAGES[code] ?? "Something went wrong.";
    listeners.forEach((l) => l(code, message));
    throw new AdminApiError(code, message);
  }
  return data as T & { success: true };
}

export const ERROR_MESSAGES: Record<string, string> = {
  MISSING_ACTION: "Malformed request.",
  MISSING_TOKEN: "You need to sign in again.",
  INVALID_SESSION: "Your session expired. Please sign in again.",
  FORBIDDEN: "You don't have permission for this",
  UNKNOWN_ACTION: "That operation isn't supported.",
  NO_ADMINS: "No admin accounts exist yet.",
  ACCOUNT_DISABLED: "This account has been disabled.",
  INVALID_CREDENTIALS: "Incorrect username or password.",
  INVALID_ROLE: "That role isn't valid.",
  DUPLICATE_USERNAME: "That username is already taken.",
  INVALID_AMOUNT: "Enter a valid amount.",
  NOT_FOUND: "We couldn't find that record.",
  SERVER_ERROR: "Server error. Please try again.",
  NETWORK_ERROR: "Could not reach the server.",
};

/* ---------- helpers ---------- */

export function naira(value: unknown): string {
  const n = Number(value ?? 0);
  if (!Number.isFinite(n)) return "₦0";
  return `₦${n.toLocaleString("en-NG")}`;
}

export function num(value: unknown): number {
  const n = Number(value ?? 0);
  return Number.isFinite(n) ? n : 0;
}

export function formatDate(value: unknown): string {
  if (!value) return "—";
  const d = new Date(String(value));
  if (Number.isNaN(d.getTime())) return String(value);
  return d.toLocaleDateString("en-NG", { day: "2-digit", month: "short", year: "numeric" });
}

export function formatDateTime(value: unknown): string {
  if (!value) return "—";
  const d = new Date(String(value));
  if (Number.isNaN(d.getTime())) return String(value);
  return d.toLocaleString("en-NG", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatMonth(value: string): string {
  const [y, m] = String(value).split("-");
  if (!y || !m) return value;
  const d = new Date(Number(y), Number(m) - 1, 1);
  return d.toLocaleDateString("en-NG", { month: "short", year: "2-digit" });
}