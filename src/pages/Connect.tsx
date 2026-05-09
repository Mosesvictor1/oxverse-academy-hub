import { Instagram, Youtube, Facebook, MoreVertical } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { SEO } from "@/components/site/SEO";
import { whatsappLink } from "@/lib/site";
import oxverseIcon from "@/assets/oxverse-logo.png";

const TikTokIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.69a8.16 8.16 0 0 0 4.77 1.52V6.76a4.85 4.85 0 0 1-1.84-.07Z" />
  </svg>
);

const XIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M18.244 2H21.5l-7.5 8.57L23 22h-6.86l-5.37-6.99L4.6 22H1.34l8.04-9.18L1 2h7.03l4.84 6.39L18.244 2Zm-1.2 18h1.86L7.06 4H5.07l11.97 16Z" />
  </svg>
);

const WhatsAppFullLogo = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 360 90" className={className} aria-hidden xmlns="http://www.w3.org/2000/svg">
    <g fill="#25D366">
      <path d="M45 8C24.6 8 8 24.6 8 45c0 7.3 2.1 14.1 5.7 19.8L8 82l17.7-5.6C31.2 79.9 38 82 45 82c20.4 0 37-16.6 37-37S65.4 8 45 8zm21.5 52.4c-.9 2.5-5.2 4.9-7.2 5.1-1.8.2-4.2.3-6.7-.4-1.5-.5-3.5-1.1-6-2.2-10.6-4.6-17.6-15.3-18.1-16-.5-.7-4.3-5.7-4.3-10.9s2.7-7.7 3.7-8.8c1-1.1 2.2-1.3 2.9-1.3.7 0 1.5 0 2.1 0 .7 0 1.6-.3 2.5 1.9.9 2.3 3.1 7.9 3.4 8.5.3.6.4 1.2.1 2-.3.8-.5 1.3-.9 2-.5.7-1 1.5-1.4 2-.5.5-1 1.1-.4 2.1.6 1 2.6 4.3 5.6 7 3.9 3.5 7.2 4.5 8.2 5.1 1 .5 1.6.4 2.2-.3.6-.7 2.5-2.9 3.2-3.9.7-1 1.3-.8 2.2-.5.9.3 5.7 2.7 6.6 3.2.9.5 1.6.7 1.8 1.1.3.4.3 2.4-.6 4.9z"/>
    </g>
    <g fill="#1F1F1F">
      <text x="100" y="60" fontFamily="Helvetica, Arial, sans-serif" fontWeight="700" fontSize="48">WhatsApp</text>
    </g>
  </svg>
);

type LinkItem = {
  label: string;
  href: string;
  Icon: React.ComponentType<{ className?: string }>;
  iconBg?: string;
  iconColor?: string;
};

const links: LinkItem[] = [
  { label: "Instagram", href: "https://www.instagram.com/0xverse.acad", Icon: Instagram, iconBg: "bg-gradient-to-br from-[#feda75] via-[#d62976] to-[#4f5bd5]", iconColor: "text-white" },
  { label: "TikTok", href: "https://www.tiktok.com/@0xverse_academy", Icon: TikTokIcon, iconBg: "bg-black", iconColor: "text-white" },
  { label: "YouTube", href: "https://www.youtube.com/@0xVerseAcademy", Icon: Youtube, iconBg: "bg-[#FF0000]", iconColor: "text-white" },
  { label: "X (Twitter)", href: "https://x.com/0xvrs", Icon: XIcon, iconBg: "bg-black", iconColor: "text-white" },
  { label: "Facebook", href: "https://www.facebook.com/0xverse.acad", Icon: Facebook, iconBg: "bg-[#1877F2]", iconColor: "text-white" },
];

export default function ConnectPage() {
  const waHref = whatsappLink("Hi OxVerse, I'd like to learn more.");
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <SEO
        title="Connect — OxVerse Academy"
        description="Follow OxVerse Academy across WhatsApp, Instagram, TikTok, YouTube, X and Facebook."
      />
      <Header />
      <main className="flex-1 pt-16 relative bg-primary text-primary-foreground overflow-hidden">
        {/* Decorative organic blob pattern */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-25 mix-blend-overlay"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 600px 300px at 15% 10%, rgba(255,255,255,0.4), transparent 60%), radial-gradient(ellipse 500px 400px at 85% 30%, rgba(255,255,255,0.35), transparent 60%), radial-gradient(ellipse 700px 400px at 30% 70%, rgba(0,0,0,0.25), transparent 60%), radial-gradient(ellipse 500px 300px at 80% 90%, rgba(0,0,0,0.3), transparent 60%)",
          }}
        />

        <div className="relative mx-auto max-w-xl px-5 py-12">
          {/* Header */}
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-xl">
              <img src={oxverseIcon} alt="OxVerse Academy" className="h-14 w-14 object-contain" />
            </div>
            <h1 className="mt-5 font-display text-3xl font-bold tracking-tight">0xverse.academy</h1>
            <p className="mt-2 text-sm text-primary-foreground/90 max-w-xs">
              Educating the next generation of Tech &amp; AI frontiers. www.0xverse.academy
            </p>

            {/* Top social row */}
            <div className="mt-5 flex items-center gap-5 text-primary-foreground">
              <a href="https://www.instagram.com/0xverse.acad" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram className="h-5 w-5" /></a>
              <a href={waHref} target="_blank" rel="noreferrer" aria-label="WhatsApp">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden><path d="M12 2a10 10 0 0 0-8.6 15l-1.4 5 5.1-1.3A10 10 0 1 0 12 2Zm5.5 14.2c-.2.6-1.4 1.2-1.9 1.3-.5.1-1.1.1-1.8-.1-.4-.1-.9-.3-1.6-.6-2.8-1.2-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.9 0-1.4.7-2 1-2.3.3-.3.6-.4.8-.4h.6c.2 0 .4-.1.7.5.2.6.8 2.1.9 2.2.1.2.1.3 0 .5-.1.2-.1.3-.2.5l-.4.5c-.1.1-.3.3-.1.6.2.3.7 1.1 1.5 1.8 1 .9 1.9 1.2 2.2 1.4.3.1.4.1.6-.1.2-.2.7-.8.8-1 .2-.3.3-.2.6-.1.2.1 1.5.7 1.8.8.3.1.4.2.5.3 0 .1 0 .6-.2 1.2Z"/></svg>
              </a>
              <a href="https://www.tiktok.com/@0xverse_academy" target="_blank" rel="noreferrer" aria-label="TikTok"><TikTokIcon className="h-5 w-5" /></a>
              <a href="https://www.youtube.com/@0xVerseAcademy" target="_blank" rel="noreferrer" aria-label="YouTube"><Youtube className="h-5 w-5" /></a>
              <a href="https://x.com/0xvrs" target="_blank" rel="noreferrer" aria-label="X"><XIcon className="h-5 w-5" /></a>
            </div>
          </div>

          {/* Featured WhatsApp card */}
          <a
            href={waHref}
            target="_blank"
            rel="noreferrer"
            className="mt-8 block group"
          >
            <div className="rounded-3xl bg-white/95 p-4 shadow-xl transition-transform group-hover:-translate-y-0.5">
              <div className="rounded-2xl bg-[#FFF6E2] aspect-[16/10] flex items-center justify-center px-6">
                <WhatsAppFullLogo className="w-3/4 max-w-xs h-auto" />
              </div>
              <div className="flex items-center justify-between px-4 py-3">
                <span className="w-6" />
                <span className="font-display text-base font-semibold text-foreground">WhatsApp</span>
                <MoreVertical className="h-4 w-4 text-foreground/40" />
              </div>
            </div>
          </a>

          {/* Link cards */}
          <div className="mt-4 space-y-3">
            {links.map(({ label, href, Icon, iconBg, iconColor }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="group block rounded-full bg-white/95 shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg"
              >
                <div className="flex items-center justify-between px-3 py-3">
                  <span className={`inline-flex h-10 w-10 items-center justify-center rounded-full ${iconBg ?? "bg-muted"} ${iconColor ?? "text-foreground"}`}>
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="font-display text-base font-semibold text-foreground">{label}</span>
                  <MoreVertical className="h-4 w-4 text-foreground/40" />
                </div>
              </a>
            ))}

            {/* Brand cards */}
            <a
              href="/"
              className="block rounded-full bg-white/95 shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div className="flex items-center justify-between px-3 py-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <img src={oxverseIcon} alt="" className="h-6 w-6 object-contain" />
                </span>
                <span className="font-display text-base font-semibold text-foreground">OxVerse Academy</span>
                <MoreVertical className="h-4 w-4 text-foreground/40" />
              </div>
            </a>

            <div className="rounded-full bg-white/95 shadow-md">
              <div className="flex items-center justify-center px-4 py-3">
                <span className="font-display text-sm font-semibold text-foreground text-center">
                  OxVerse Academy — Learn Today. Build Tomorrow.
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}