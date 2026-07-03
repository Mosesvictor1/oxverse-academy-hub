import { Link, NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import oxverseLogo from "@/assets/oxverse_logo1.png";
import oxverseLogoWhite from "@/assets/oxverse_logo_white.png";

const groups = [
  {
    label: "Academy",
    items: [
      { to: "/about",   label: "About",   desc: "Our story, mission and values" },
      { to: "/faculty", label: "Faculty", desc: "Meet the instructors" },
      { to: "/gallery", label: "Gallery", desc: "Campus life and photos" },
    ],
  },
  {
    label: "Community",
    items: [
      { to: "/events",     label: "Events",     desc: "Hackathons, workshops, demo days" },
      { to: "/blog",       label: "Blog",       desc: "Insights and campus updates" },
      { to: "/connect",    label: "Connect",    desc: "Network with alumni and peers" },
      { to: "/ambassador", label: "Ambassador", desc: "Represent OxVerse on your campus" },
    ],
  },
  {
    label: "Company",
    items: [
      { to: "/careers", label: "Careers", desc: "Join the OxVerse team" },
      { to: "/contact", label: "Contact", desc: "Get in touch with us" },
    ],
  },
];
export function Header({ topOffset = 0 }: { topOffset?: number } = {}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const onDark = location.pathname === "/connect" && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const directLinkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      "px-3 py-2 rounded-md text-sm font-medium transition-colors shrink-0",
      onDark
        ? isActive
          ? "text-white"
          : "text-white/80 hover:text-white hover:bg-white/10"
        : isActive
          ? "text-ink"
          : "text-ink-muted hover:text-ink hover:bg-muted"
    );

  const triggerClass = cn(
    "!bg-transparent !shadow-none px-3 h-9 text-sm font-medium transition-colors shrink-0",
    onDark
      ? "text-white/80 hover:text-white hover:!bg-white/10 data-[state=open]:!bg-white/10 data-[state=open]:text-white"
      : "text-ink-muted hover:text-ink hover:!bg-muted data-[state=open]:!bg-muted data-[state=open]:text-ink"
  );

  return (
    <header
      style={{ top: topOffset }}
      className={cn(
        "fixed inset-x-0 z-50 transition-all duration-300",
        scrolled ? "bg-background/80 backdrop-blur-xl border-b border-border/60" : "bg-transparent",
        onDark && "text-white"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 h-16 flex items-center gap-2">
        {/* Logo */}
        <Link to="/" className="flex shrink-0 items-center gap-2 mr-2">
          <img src={oxverseLogo} alt="OxVerse Academy" className="h-8 w-auto block dark:hidden" />
          <img src={oxverseLogoWhite} alt="OxVerse Academy" className="h-8 w-auto hidden dark:block" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden xl:flex flex-1 items-center gap-0.5 min-w-0">
          {/* Standalone: Home */}
          <NavLink to="/" end className={directLinkClass}>
            Home
          </NavLink>

          {/* Standalone: Courses */}
          <NavLink to="/courses" className={directLinkClass}>
            Courses
          </NavLink>

          {/* Grouped dropdowns */}
          <NavigationMenu>
            <NavigationMenuList className="gap-0">
              {groups.map((group) => (
                <NavigationMenuItem key={group.label}>
                  <NavigationMenuTrigger className={triggerClass}>
                    {group.label}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="w-60 p-2 space-y-0.5">
                      {group.items.map((item) => (
                        <li key={item.to}>
                          <NavigationMenuLink asChild>
                            <Link
                              to={item.to}
                              className="group block rounded-lg px-3 py-2.5 hover:bg-muted transition-colors"
                            >
                              <span className="block text-sm font-medium text-ink group-hover:text-primary transition-colors">
                                {item.label}
                              </span>
                              <span className="block text-xs text-ink-muted mt-0.5 leading-snug">
                                {item.desc}
                              </span>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        {/* Right-side actions */}
        <div className="hidden xl:flex shrink-0 items-center gap-2 ml-auto">
            {/* { to: "/summer-tech-bootcamp", label: "Summer Class" }, */}
            <NavLink
            to="/summer-tech-bootcamp"
            className={({ isActive }) =>
              cn(
                "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                onDark
                  ? isActive ? "text-white font-semibold" : "text-white/80 hover:text-white"
                  : isActive ? "text-primary font-semibold" : "text-ink-muted hover:text-ink"
              )
            }
          >
            Summer Class
          </NavLink>
          <NavLink
            to="/register"
            className={({ isActive }) =>
              cn(
                "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                onDark
                  ? isActive ? "text-white font-semibold" : "text-white/80 hover:text-white"
                  : isActive ? "text-primary font-semibold" : "text-ink-muted hover:text-ink"
              )
            }
          >
            Register
          </NavLink>

          <ThemeToggle />
          <Link
            to="/waitlist"
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold whitespace-nowrap transition-colors",
              onDark
                ? "bg-white text-primary hover:bg-white/90"
                : "bg-ink text-background hover:bg-primary"
            )}
          >
            Join Waitlist
          </Link>
        </div>

        {/* Mobile toggle */}
        <div className="xl:hidden ml-auto flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setOpen((o) => !o)}
            className="p-2 rounded-md hover:bg-muted"
            aria-label="Toggle menu"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="xl:hidden bg-background/95 backdrop-blur-xl border-b border-border overflow-y-auto max-h-[calc(100vh-4rem)]">
          <div className="px-5 py-4 space-y-5">
            {/* Direct links */}
            <div className="space-y-0.5">
              {[
                { to: "/", label: "Home" },
                { to: "/courses", label: "Courses" },
                { to: "/register", label: "Register" },
              ].map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2.5 rounded-lg hover:bg-muted text-ink font-medium text-sm transition-colors"
                >
                  {n.label}
                </Link>
              ))}
            </div>

            {/* Grouped sections */}
            {groups.map((group) => (
              <div key={group.label}>
                <p className="px-3 mb-1.5 text-[11px] font-semibold text-ink-muted uppercase tracking-widest">
                  {group.label}
                </p>
                <div className="space-y-0.5">
                  {group.items.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setOpen(false)}
                      className="block px-3 py-2.5 rounded-lg hover:bg-muted transition-colors"
                    >
                      <span className="block text-sm font-medium text-ink">{item.label}</span>
                      <span className="block text-xs text-ink-muted mt-0.5">{item.desc}</span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            <Link
              to="/waitlist"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center rounded-full bg-ink text-background px-5 py-3 text-sm font-semibold transition-colors hover:bg-primary"
            >
              Join Waitlist
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
