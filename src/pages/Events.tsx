import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MapPin, Calendar, Clock, ArrowRight, Video, Sparkles, MessageCircle } from "lucide-react";
import { SiteLayout, SectionEyebrow } from "@/components/site/SiteLayout";
import { SEO } from "@/components/site/SEO";
import { getFeaturedEvent, useCountdownFlyer } from "@/lib/events";

const events = [
  {
    type: "Bootcamp",
    title: "Weekend AI Bootcamp",
    date: "Aug 8 to 9, 2026",
    desc: "Build a working LLM-powered app in 48 hours.",
    price: "Free",
  },
  {
    type: "Workshop",
    title: "Figma Foundations",
    date: "Aug 15, 2026",
    desc: "Half day workshop for designers starting with Figma.",
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
    date: "Sep 5 to 7, 2026",
    desc: "3-day intensive: build & ship a dApp.",
    price: "₦25,000",
  },
  {
    type: "Workshop",
    title: "Intro to Data Analysis",
    date: "Sep 12, 2026",
    desc: "Hands on SQL & Python for absolute beginners.",
    price: "₦10,000",
  },
];

export default function EventsPage() {
  const featured = getFeaturedEvent();
  const { flyer: countdownFlyer } = useCountdownFlyer(featured?.dateISO ?? "");
  return (
    <SiteLayout>
      <SEO
        title="Events, OxVerse Academy"
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

      {featured && (
        <section className="mx-auto max-w-7xl px-6 pb-4">
          <Link
            to={`/events/${featured.slug}`}
            className="group block rounded-3xl overflow-hidden border border-border bg-gradient-to-br from-primary/10 via-background to-background hover:border-primary transition shadow-xl"
          >
            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative overflow-hidden bg-muted">
                <img
                  src={countdownFlyer}
                  alt={`${featured.title} flyer`}
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
              <div className="p-8 lg:p-10 flex flex-col justify-center">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
                  <Sparkles className="size-3.5" /> Featured • {featured.type}
                </span>
                <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold tracking-tight">
                  {featured.title}
                </h2>
                <p className="mt-3 text-ink-muted">{featured.tagline}</p>
                <div className="mt-5 grid sm:grid-cols-2 gap-2 text-sm">
                  <span className="inline-flex items-center gap-1.5 text-ink-muted">
                    <Calendar className="size-4" /> {featured.date}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-ink-muted">
                    <Clock className="size-4" /> {featured.time}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-ink-muted">
                    <Video className="size-4" /> {featured.location}
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-semibold">
                    {featured.price}
                  </span>
                </div>
                <span className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-[#25D366] text-white px-5 py-2.5 text-sm font-semibold group-hover:opacity-90 transition">
                  <MessageCircle className="size-4" /> Join WhatsApp Community
                </span>
              </div>
            </div>
          </Link>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="font-display text-2xl font-bold tracking-tight mb-6">
          Upcoming events
        </h2>
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
