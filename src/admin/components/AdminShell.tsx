import { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  BookOpen,
  ChevronLeft,
  CreditCard,
  LayoutDashboard,
  LogOut,
  Mail,
  Megaphone,
  Moon,
  PieChart,
  Search,
  Settings,
  Shield,
  Sun,
  Users,
  UserPlus,
} from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { onApiError } from "@/admin/lib/api";
import { useAdminAuth } from "@/admin/lib/auth";
import { canAccessNav, type NavKey } from "@/admin/lib/roles";
import { CommandPalette } from "./CommandPalette";

const NAV: { key: NavKey; label: string; to: string; icon: typeof Users }[] = [
  { key: "dashboard", label: "Dashboard", to: "/admin", icon: LayoutDashboard },
  { key: "students", label: "Students", to: "/admin/students", icon: Users },
  { key: "payments", label: "Payments", to: "/admin/payments", icon: CreditCard },
  { key: "reports", label: "Reports", to: "/admin/reports", icon: PieChart },
  { key: "registrations", label: "Registrations", to: "/admin/registrations", icon: UserPlus },
  { key: "registrants", label: "Registrants", to: "/admin/registrants", icon: Mail },
  { key: "newsletter", label: "Newsletter", to: "/admin/newsletter", icon: Megaphone },
  { key: "courses", label: "Courses", to: "/admin/courses", icon: BookOpen },
  { key: "admins", label: "Admin Management", to: "/admin/admins", icon: Shield },
  { key: "settings", label: "Settings", to: "/admin/settings", icon: Settings },
];

function useAdminTheme() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem("oxv-admin-theme");
    } catch {
      /* ignore */
    }
    const next = saved === "light" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
  }, []);
  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    try {
      localStorage.setItem("oxv-admin-theme", next);
    } catch {
      /* ignore */
    }
  };
  return { theme, toggle };
}

export function AdminShell() {
  const { admin, logout, forceLogout } = useAdminAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggle } = useAdminTheme();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    return onApiError((code, message) => {
      if (code === "INVALID_SESSION" || code === "MISSING_TOKEN") {
        forceLogout();
        toast.error(message);
        navigate("/admin/login", { replace: true });
        return;
      }
      toast.error(message);
    });
  }, [forceLogout, navigate]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const items = NAV.filter((n) => canAccessNav(admin, n.key));

  return (
    <div className="flex min-h-screen w-full bg-background text-foreground">
      <aside
        className={cn(
          "sticky top-0 hidden h-screen shrink-0 flex-col border-r border-border bg-card/50 backdrop-blur transition-[width] duration-300 md:flex",
          collapsed ? "w-[76px]" : "w-64",
        )}
      >
        <div className="flex h-16 items-center gap-2 px-4">
          <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary font-display text-sm font-bold text-primary-foreground">
            0x
          </span>
          {!collapsed && (
            <div className="min-w-0">
              <p className="truncate font-display text-sm font-semibold">0xVerse Academy</p>
              <p className="truncate text-xs text-muted-foreground">Admin Console</p>
            </div>
          )}
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4">
          {items.map((item) => (
            <NavLink key={item.key} to={item.to} end={item.to === "/admin"} title={item.label}>
              {({ isActive }) => (
                <span
                  className={cn(
                    "relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors",
                    isActive ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="admin-nav-pill"
                      className="absolute inset-0 rounded-xl bg-primary shadow-lg shadow-primary/25"
                      transition={{ type: "spring", stiffness: 400, damping: 34 }}
                    />
                  )}
                  <item.icon className="relative z-10 size-4 shrink-0" />
                  {!collapsed && <span className="relative z-10 truncate">{item.label}</span>}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        <button
          onClick={() => setCollapsed((v) => !v)}
          className="m-3 flex items-center justify-center gap-2 rounded-xl border border-border py-2 text-xs text-muted-foreground transition hover:text-foreground active:scale-95"
        >
          <ChevronLeft className={cn("size-4 transition-transform", collapsed && "rotate-180")} />
          {!collapsed && "Collapse"}
        </button>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur">
          <button
            onClick={() => setPaletteOpen(true)}
            className="flex flex-1 items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 text-sm text-muted-foreground transition hover:border-primary/40 sm:max-w-sm"
          >
            <Search className="size-4" />
            <span className="flex-1 text-left">Search students, payments…</span>
            <kbd className="hidden rounded border border-border px-1.5 py-0.5 text-[10px] sm:block">⌘K</kbd>
          </button>

          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={toggle}
              aria-label="Toggle theme"
              className="grid size-9 place-items-center rounded-xl border border-border text-muted-foreground transition hover:text-foreground active:scale-95"
            >
              {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </button>

            <div className="relative">
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="flex items-center gap-2 rounded-xl border border-border py-1.5 pl-1.5 pr-3 transition active:scale-95"
              >
                <span className="grid size-7 place-items-center rounded-lg bg-primary text-xs font-semibold text-primary-foreground">
                  {(admin?.fullName ?? "?").slice(0, 1).toUpperCase()}
                </span>
                <span className="hidden text-left sm:block">
                  <span className="block text-xs font-medium leading-none">{admin?.fullName}</span>
                  <span className="block text-[10px] text-muted-foreground">{admin?.role}</span>
                </span>
              </button>
              <AnimatePresence>
                {menuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.97 }}
                    className="absolute right-0 mt-2 w-48 overflow-hidden rounded-xl border border-border bg-popover p-1 shadow-xl"
                  >
                    <div className="px-3 py-2 text-xs text-muted-foreground">{admin?.username}</div>
                    <button
                      onClick={async () => {
                        setMenuOpen(false);
                        await logout();
                        navigate("/admin/login", { replace: true });
                      }}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition hover:bg-muted"
                    >
                      <LogOut className="size-4" /> Log out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* mobile nav */}
        <div className="flex gap-2 overflow-x-auto border-b border-border px-4 py-2 md:hidden">
          {items.map((item) => (
            <NavLink
              key={item.key}
              to={item.to}
              end={item.to === "/admin"}
              className={({ isActive }) =>
                cn(
                  "whitespace-nowrap rounded-full border px-3 py-1.5 text-xs transition",
                  isActive ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground",
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
      <Toaster position="top-right" richColors />
    </div>
  );
}