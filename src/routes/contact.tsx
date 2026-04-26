import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, SectionEyebrow } from "@/components/site/SiteLayout";
import { Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — OxVerse Academy" },
      { name: "description", content: "Visit our Lekki campus, call us, or send a message. We respond within 24 hours." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <SiteLayout>
      <section className="mx-auto max-w-7xl px-6 pt-24 pb-10">
        <SectionEyebrow>Contact</SectionEyebrow>
        <h1 className="mt-6 font-display text-5xl md:text-6xl font-bold tracking-tighter">Visit. Call. Write.</h1>
      </section>
      <section className="mx-auto max-w-7xl px-6 pb-24 grid lg:grid-cols-2 gap-12">
        <div className="space-y-6">
          {[
            { i: MapPin, t: "Campus", v: "15 Innovation Way, Lekki, Lagos" },
            { i: Phone, t: "Phone", v: "+234 800 OXVERSE" },
            { i: Mail, t: "Email", v: "hello@oxverse.academy" },
          ].map((c) => (
            <div key={c.t} className="rounded-2xl border border-border p-6 flex items-start gap-4">
              <c.i className="size-6 text-primary mt-1" />
              <div>
                <p className="text-sm text-ink-muted">{c.t}</p>
                <p className="font-display text-xl font-semibold mt-1">{c.v}</p>
              </div>
            </div>
          ))}
        </div>
        <form
          onSubmit={(e) => { e.preventDefault(); setSent(true); }}
          className="rounded-3xl border border-border p-8 bg-background space-y-4"
        >
          {sent ? (
            <div className="text-center py-12">
              <h2 className="font-display text-2xl font-bold">Thanks — we'll be in touch.</h2>
              <p className="mt-2 text-ink-muted">A member of admissions will reply within 24 hours.</p>
            </div>
          ) : (
            <>
              <input className="input" placeholder="Full name" required maxLength={100} />
              <input className="input" type="email" placeholder="Email" required maxLength={255} />
              <input className="input" placeholder="Phone" maxLength={20} />
              <textarea className="input resize-none" rows={5} placeholder="Your message" required maxLength={1000} />
              <button className="w-full rounded-full bg-ink text-background py-3 font-semibold hover:bg-primary transition">Send message</button>
            </>
          )}
        </form>
      </section>
    </SiteLayout>
  );
}
