import type { AdminRole, Permissions } from "./api";

export type NavKey =
  | "dashboard"
  | "students"
  | "payments"
  | "reports"
  | "registrations"
  | "registrants"
  | "newsletter"
  | "courses"
  | "admins"
  | "settings";

export const PERMISSION_GROUPS: { group: string; keys: { key: string; label: string }[] }[] = [
  {
    group: "Data Access",
    keys: [
      { key: "view_dashboard", label: "View dashboard" },
      { key: "view_students", label: "View students" },
      { key: "edit_students", label: "Edit students" },
      { key: "export_data", label: "Export data" },
    ],
  },
  {
    group: "Financial",
    keys: [
      { key: "record_payments", label: "Record payments" },
      { key: "view_payments", label: "View payments" },
      { key: "view_reports", label: "View reports" },
    ],
  },
  {
    group: "Communication",
    keys: [
      { key: "send_messages", label: "Send messages" },
      { key: "manage_newsletter", label: "Manage newsletter" },
    ],
  },
  {
    group: "Admin",
    keys: [
      { key: "manage_courses", label: "Manage courses" },
      { key: "manage_admins", label: "Manage admins" },
      { key: "manage_settings", label: "Manage settings" },
    ],
  },
];

export const ALL_PERMISSION_KEYS = PERMISSION_GROUPS.flatMap((g) => g.keys.map((k) => k.key));

export function defaultPermissions(value = false): Permissions {
  return Object.fromEntries(ALL_PERMISSION_KEYS.map((k) => [k, value]));
}

/** Permission that gates each nav item (undefined = always allowed). */
export const NAV_PERMISSION: Partial<Record<NavKey, string>> = {
  dashboard: "view_dashboard",
  students: "view_students",
  payments: "view_payments",
  reports: "view_reports",
  registrants: "send_messages",
  newsletter: "manage_newsletter",
  courses: "manage_courses",
  admins: "manage_admins",
  settings: "manage_settings",
};

export const ROLE_ACCESS: Record<string, NavKey[]> = {
  "Super Admin": [
    "dashboard",
    "students",
    "payments",
    "reports",
    "registrations",
    "registrants",
    "newsletter",
    "courses",
    "admins",
    "settings",
  ],
  Finance: ["dashboard", "students", "payments", "reports", "registrants"],
  Admissions: ["dashboard", "students", "registrations", "registrants", "reports", "courses", "newsletter"],
  Manager: ["dashboard", "students", "payments", "reports", "registrations", "registrants", "courses", "newsletter"],
  Tutor: ["dashboard", "students"],
};

/** Permissions are the primary gate; role map is the fallback for accounts without them. */
export function hasPermission(permissions: Permissions | undefined, key: string | undefined): boolean | undefined {
  if (!key) return true;
  if (!permissions || typeof permissions[key] !== "boolean") return undefined;
  return permissions[key];
}

export function can(
  admin: { role?: AdminRole; permissions?: Permissions } | null | undefined,
  key: string,
): boolean {
  if (!admin) return false;
  const p = hasPermission(admin.permissions, key);
  if (typeof p === "boolean") return p;
  // fallback: unknown roles get everything except admin management
  if (admin.role === "Super Admin") return true;
  const nav = (Object.entries(NAV_PERMISSION).find(([, v]) => v === key) ?? [])[0] as NavKey | undefined;
  if (nav) return canAccess(admin.role, nav);
  return key !== "manage_admins" && key !== "manage_settings";
}

export function canAccess(role: AdminRole | undefined, key: NavKey): boolean {
  if (!role) return false;
  const allowed = ROLE_ACCESS[role];
  if (!allowed) return key !== "admins" && key !== "settings";
  return allowed.includes(key);
}

export function canAccessNav(
  admin: { role?: AdminRole; permissions?: Permissions } | null | undefined,
  key: NavKey,
): boolean {
  if (!admin) return false;
  const perm = NAV_PERMISSION[key];
  const p = hasPermission(admin.permissions, perm);
  if (typeof p === "boolean") return p;
  return canAccess(admin.role, key);
}

/** Roles allowed to mutate data (record payments, create courses/admins, edit settings). */
export function canWrite(role: AdminRole | undefined): boolean {
  return role === "Super Admin" || role === "Finance" || role === "Manager" || role === "Admissions";
}

export function canRecordPayment(role: AdminRole | undefined): boolean {
  return role === "Super Admin" || role === "Finance" || role === "Manager";
}