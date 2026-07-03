import { Link } from "react-router-dom";
import { type FormEvent, useState } from "react";
import { Instagram, Twitter, Linkedin, Youtube, Send } from "lucide-react";
import { SITE } from "@/lib/site";
import { submitToSheet } from "@/lib/formOptions";

export function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function onSubscribe(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const cleanedEmail = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanedEmail)) {
      setStatus("error");
      return;
    }

    setStatus("loading");
    try {
      await submitToSheet({
        type: "Newsletter",
        email: cleanedEmail,
        source: "Footer subscribe form",
        page: window.location.pathname,
      });
      setEmail("");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <footer className="border-t border-border bg-muted/40">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Link to="/" className="flex items-center gap-2">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-display font-bold">
                O
              </span>
              <span className="font-display font-semibold text-xl">OxVerse Academy</span>
            </Link>
            <p className="mt-4 text-ink-muted max-w-sm text-pretty">
              A physical tech academy training Africa's next generation of world class engineers,
              designers, and creators.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {[Instagram, Twitter, Linkedin, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border hover:border-primary hover:text-primary transition-colors"
                  aria-label="Social link"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <p className="font-display font-semibold mb-4">Academy</p>
              <ul className="space-y-2 text-sm text-ink-muted">
                <li>
                  <Link to="/about" className="hover:text-ink">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/faculty" className="hover:text-ink">
                    Faculty
                  </Link>
                </li>
                <li>
                  <Link to="/courses" className="hover:text-ink">
                    Courses
                  </Link>
                </li>
                <li>
                  <Link to="/events" className="hover:text-ink">
                    Events
                  </Link>
                </li>
                <li>
                  <Link to="/gallery" className="hover:text-ink">
                    Gallery
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-display font-semibold mb-4">Resources</p>
              <ul className="space-y-2 text-sm text-ink-muted">
                <li>
                  <Link to="/blog" className="hover:text-ink">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link to="/testimonials" className="hover:text-ink">
                    Testimonials
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="hover:text-ink">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-ink">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/connect" className="hover:text-ink">
                    Connect
                  </Link>
                </li>
                <li>
                  <Link to="/careers" className="hover:text-ink">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link to="/waitlist" className="hover:text-ink">
                    Join waitlist
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-display font-semibold mb-4">Updates</p>
              <form onSubmit={onSubscribe} className="space-y-3">
                <label htmlFor="footer-subscribe" className="sr-only">
                  Email address
                </label>
                <div className="flex min-w-0 rounded-full border border-border bg-background p-1 shadow-sm focus-within:border-primary">
                  <input
                    id="footer-subscribe"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status !== "idle") setStatus("idle");
                    }}
                    placeholder="Email address"
                    autoComplete="email"
                    maxLength={255}
                    className="min-w-0 flex-1 bg-transparent px-4 py-2 text-sm outline-none placeholder:text-ink-muted"
                    required
                  />
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink text-background transition-colors hover:bg-primary disabled:cursor-not-allowed disabled:opacity-60"
                    aria-label="Subscribe"
                  >
                    <Send className="size-4" />
                  </button>
                </div>
                <p className="min-h-5 text-xs text-ink-muted" aria-live="polite">
                  {status === "success"
                    ? "You're on the subscriber list."
                    : status === "error"
                      ? "Enter a valid email and try again."
                      : "Get cohort dates, free classes, and campus updates."}
                </p>
              </form>

              <p className="font-display font-semibold mt-8 mb-4">Visit</p>
              <ul className="space-y-2 text-sm text-ink-muted">
                <li>No 82, Century Bus Stop</li>
                <li>Ago Palace Way, Okota, Lagos</li>
                <li>{SITE.phoneDisplay}</li>
                <li>{SITE.email}</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-ink-muted">
          <p>© {new Date().getFullYear()} OxVerse Academy. All rights reserved.</p>
          <p>Made with intention in Lagos.</p>
        </div>
      </div>
    </footer>
  );
}
