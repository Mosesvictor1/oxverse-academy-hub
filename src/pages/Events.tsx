import { motion } from "framer-motion";
import { MapPin, Calendar, ArrowRight } from "lucide-react";
import { SiteLayout, SectionEyebrow } from "@/components/site/SiteLayout";
import { SEO } from "@/components/site/SEO";

const events = [
  {
    type: "Bootcamp",
    title: "Weekend AI Bootcamp",
    date: "Aug 8–9, 2026",
    desc: "Build a working LLM-powered app in 48 hours.",
    price: "Free",
  },
  {
    type: "Workshop",
    title: "Figma Foundations",
    date: "Aug 15, 2026",
    desc: "Half-day workshop for designers starting with Figma.",
    price: "₦15,000",
  },
  {
    type: "Open House",
    title: "Campus Open House",
    date: "Aug 22, 2026",
    desc: "Tour the campus, meet instructors, and see classes in session.",
    price: "Free",
  },
  {
    type: "Seminar",
    title: "Careers in Tech: A Panel",
    date: "Aug 29, 2026",
    desc: "Hear from engineers at Paystack, Flutterwave, and Cohere.",
    price: "Free",
  },
  {
    type: "Bootcamp",
    title: "Web3 Hacker House",
    date: "Sep 5–7, 2026",
    desc: "3-day intensive: build & ship a dApp.",
    price: "₦25,000",
  },
  {
    type: "Workshop",
    title: "Intro to Data Analysis",
    date: "Sep 12, 2026",
    desc: "Hands-on SQL & Python for absolute beginners.",
    price: "₦10,000",
  },
];

export default function EventsPage() {
  return (
    <SiteLayout>
      <SEO
        title="Events — OxVerse Academy"
        description="Bootcamps, workshops, open house events, and seminars at OxVerse Academy Lagos."
      />
      <section className="relative">
        <div className="absolute inset-0 grid-pattern opacity-50 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-16 lg:pt-28">
          <SectionEyebrow>Events</SectionEyebrow>
          <h1 className="mt-6 font-display text-5xl md:text-7xl font-bold tracking-tighter text-balance max-w-3xl">
            Bootcamps, workshops & <span className="gradient-text">open house events.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-ink-muted text-pretty">
            Free and paid events happening at our Lagos campus.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid md:grid-cols-2 gap-6">
          {events.map((e, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 4) * 0.06 }}
              className="group rounded-3xl border border-border bg-background p-8 hover:border-primary transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-wider text-primary">
                  {e.type}
                </span>
                <span className="text-sm font-semibold">{e.price}</span>
              </div>
              <h3 className="mt-4 font-display text-2xl font-semibold">{e.title}</h3>
              <p className="mt-2 text-ink-muted">{e.desc}</p>
              <div className="mt-6 flex items-center gap-4 text-sm text-ink-muted">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="size-4" /> {e.date}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="size-4" /> Agor Campus
                </span>
              </div>
              <button className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink text-background px-5 py-2.5 text-sm font-semibold hover:bg-primary transition">
                Register <ArrowRight className="size-4" />
              </button>
            </motion.div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
