import { Instagram, Youtube, MessageCircle, Facebook, ExternalLink } from "lucide-react";
import { SiteLayout, SectionEyebrow } from "@/components/site/SiteLayout";
import { SEO } from "@/components/site/SEO";
import { whatsappLink } from "@/lib/site";
import oxverseLogo from "@/assets/oxverse_logo1.png";

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

type LinkItem = {
  label: string;
  href: string;
  Icon: React.ComponentType<{ className?: string }>;
  featured?: boolean;
};

const links: LinkItem[] = [
  { label: "WhatsApp", href: whatsappLink("Hi OxVerse, I'd like to learn more."), Icon: MessageCircle, featured: true },
  { label: "Instagram", href: "https://www.instagram.com/0xverse.acad", Icon: Instagram },
  { label: "TikTok", href: "https://www.tiktok.com/@0xverse_academy", Icon: TikTokIcon },
  { label: "YouTube", href: "https://www.youtube.com/@0xVerseAcademy", Icon: Youtube },
  { label: "X (Twitter)", href: "https://x.com/0xvrs", Icon: XIcon },
  { label: "Facebook", href: "https://www.facebook.com/0xverse.acad", Icon: Facebook },
];

export default function ConnectPage() {
  return (
    <SiteLayout>
      <SEO
        title="Connect — OxVerse Academy"
        description="Follow OxVerse Academy across WhatsApp, Instagram, TikTok, YouTube, X and Facebook."
      />
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-[0.07] bg-[radial-gradient(circle_at_20%_20%,var(--primary),transparent_40%),radial-gradient(circle_at_80%_60%,var(--primary),transparent_45%)]"
        />
        <div className="mx-auto max-w-3xl px-6 pt-24 pb-20">
          <div className="flex flex-col items-center text-center">
            <SectionEyebrow>Connect</SectionEyebrow>
            <div className="mt-8 inline-flex h-24 w-24 items-center justify-center rounded-full bg-background ring-4 ring-border shadow-md">
              <img src={oxverseLogo} alt="OxVerse Academy" className="h-14 w-auto" />
            </div>
            <h1 className="mt-6 font-display text-4xl md:text-5xl font-bold tracking-tighter">
              0xverse.academy
            </h1>
            <p className="mt-3 text-ink-muted max-w-md text-pretty">
              Educating the next generation of Tech &amp; AI frontiers. Tap any link below to connect with us.
            </p>
          </div>

          <div className="mt-12 space-y-3">
            {links.map(({ label, href, Icon, featured }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className={`group flex items-center justify-between gap-4 rounded-2xl border border-border px-5 py-4 transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-lg ${
                  featured ? "bg-primary/5" : "bg-background"
                }`}
              >
                <span className="flex items-center gap-4">
                  <span
                    className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${
                      featured ? "bg-primary text-primary-foreground" : "bg-muted text-ink"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="font-display text-lg font-semibold">{label}</span>
                </span>
                <ExternalLink className="h-4 w-4 text-ink-muted group-hover:text-primary transition-colors" />
              </a>
            ))}
          </div>

          <p className="mt-12 text-center text-sm text-ink-muted">
            OxVerse Academy — Learn Today. Build Tomorrow.
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}