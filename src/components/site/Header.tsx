import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/courses", label: "Courses" },
  { to: "/events", label: "Events" },
  { to: "/blog", label: "Blog" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-xl border-b border-border/60" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-display font-bold">
            O
            <span className="absolute -inset-1 rounded-xl bg-primary/30 blur-lg opacity-0 group-hover:opacity-100 transition" />
          </span>
          <span className="font-display font-semibold tracking-tight text-lg">OxVerse</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.to === "/" }}
              className="relative px-4 py-2 text-sm font-medium text-ink-muted hover:text-ink transition-colors data-[status=active]:text-ink"
              activeProps={{ className: "text-ink" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Link
            to="/courses"
            className="text-sm font-medium text-ink-muted hover:text-ink transition"
          >
            Login
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-ink text-background px-5 py-2.5 text-sm font-semibold hover:bg-primary transition-colors"
          >
            Enroll Now
          </Link>
        </div>

        <button
          onClick={() => setOpen((o) => !o)}
          className="lg:hidden p-2 rounded-md hover:bg-muted"
          aria-label="Toggle menu"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-background/95 backdrop-blur-xl border-b border-border">
          <div className="px-6 py-4 flex flex-col gap-1">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="px-3 py-3 rounded-lg hover:bg-muted text-ink font-medium"
              >
                {n.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-full bg-ink text-background px-5 py-3 text-sm font-semibold"
            >
              Enroll Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}