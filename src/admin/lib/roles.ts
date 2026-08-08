import type { AdminRole } from "./api";

export type NavKey =
  | "dashboard"
  | "students"
  | "payments"
  | "reports"
  | "registrations"
  | "courses"
  | "admins"
  | "settings";

export const ROLE_ACCESS: Record<AdminRole, NavKey[]> = {
  "Super Admin": [
    "dashboard",
    "students",
    "payments",
    "reports",
    "registrations",
    "courses",
    "admins",
    "settings",
  ],
  Finance: ["dashboard", "students", "payments", "reports"],
  Admissions: ["dashboard", "students", "registrations", "reports", "courses"],
  Manager: ["dashboard", "students", "payments", "reports", "registrations", "courses"],
  Tutor: ["dashboard", "students"],
};

export function canAccess(role: AdminRole | undefined, key: NavKey): boolean {
  if (!role) return false;
  return ROLE_ACCESS[role]?.includes(key) ?? false;
}

/** Roles allowed to mutate data (record payments, create courses/admins, edit settings). */
export function canWrite(role: AdminRole | undefined): boolean {
  return role === "Super Admin" || role === "Finance" || role === "Manager" || role === "Admissions";
}

export function canRecordPayment(role: AdminRole | undefined): boolean {
  return role === "Super Admin" || role === "Finance" || role === "Manager";
}