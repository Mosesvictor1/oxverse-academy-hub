import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SiteLayout, SectionEyebrow } from "@/components/site/SiteLayout";
import { SEO } from "@/components/site/SEO";
import campusImg from "@/assets/campus.jpg";
import studentsImg from "@/assets/students-group.jpg";

export default function AboutPage() {
  return (
    <SiteLayout>
      <SEO
        title="About OxVerse Academy — Our Story"
        description="OxVerse Academy is a physical tech training institute building Africa's next generation of engineers, designers, and creators."
        image={campusImg}
      />
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-60 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-16 lg:pt-28">
          <SectionEyebrow>About OxVerse</SectionEyebrow>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="mt-6 font-display text-5xl md:text-7xl font-bold tracking-tighter text-balance max-w-4xl"
          >
            We exist to build the next <span className="gradient-text">10,000 African engineers</span>.
          </motion.h1>
          <p className="mt-8 max-w-2xl text-lg text-ink-muted text-pretty">
            OxVerse Academy is a physical tech training institute founded in Lagos.
            We're not a course platform. We're a campus, a community, and a launchpad.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="aspect-[16/8] rounded-3xl overflow-hidden">
          <img src={campusImg} alt="OxVerse Campus" className="size-full object-cover" loading="lazy" width={1920} height={960}/>
        </div>
      </section>

      <section className="border-y border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-24 grid lg:grid-cols-3 gap-12">
          {[
            { eyebrow: "Our Mission", title: "Train Africa's most capable tech talent.", body: "We exist to bridge the gap between raw potential and global opportunity through world-class, hands-on training." },
            { eyebrow: "Our Vision", title: "A continent of builders, not borrowers.", body: "By 2030, we aim to graduate 10,000 engineers, designers, and creators who ship products used worldwide." },
            { eyebrow: "Our Values", title: "Craft, candor, and community.", body: "We obsess over quality, speak honestly, and lift each other up. No shortcuts, no fluff, no ego." },
          ].map((b, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
              <SectionEyebrow>{b.eyebrow}</SectionEyebrow>
              <h3 className="mt-4 font-display text-3xl font-bold tracking-tighter">{b.title}</h3>
              <p className="mt-4 text-ink-muted text-pretty">{b.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="max-w-3xl mb-14">
          <SectionEyebrow>Leadership team</SectionEyebrow>
          <h2 className="mt-6 font-display text-4xl md:text-5xl font-bold tracking-tighter">Meet the people behind OxVerse.</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { n: "Oxana Eze", r: "Founder & CEO" },
            { n: "David Adebayo", r: "Head of Curriculum" },
            { n: "Nneka Eze", r: "Principal Engineer" },
            { n: "Chiamaka Onyeka", r: "Design Lead" },
            { n: "Tunde Adeyemi", r: "Engineering Lead" },
            { n: "Halima Sani", r: "Data Lead" },
            { n: "Kunle Akinola", r: "AI Lead" },
            { n: "Zainab Lawal", r: "Marketing Lead" },
          ].map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}
              className="group"
            >
              <div className="aspect-[4/5] rounded-2xl bg-gradient-to-br from-purple-200 to-purple-700 mb-4 group-hover:scale-[1.02] transition-transform" />
              <p className="font-display text-lg font-semibold">{m.n}</p>
              <p className="text-sm text-ink-muted">{m.r}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-ink text-background">
        <div className="mx-auto max-w-7xl px-6 py-24 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionEyebrow><span className="text-background/80">Campus culture</span></SectionEyebrow>
            <h2 className="mt-6 font-display text-4xl md:text-5xl font-bold tracking-tighter">A place where curiosity is contagious.</h2>
            <p className="mt-6 text-background/70 text-lg max-w-md text-pretty">
              Open hours from 8am to 10pm. Free coffee. Whiteboards on every wall.
              Demo days every month. Hackathons every quarter.
            </p>
            <Link to="/gallery" className="mt-8 inline-flex items-center gap-2 rounded-full bg-background text-foreground px-6 py-3 font-semibold hover:bg-primary hover:text-primary-foreground transition">
              See the campus <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="aspect-[4/3] rounded-3xl overflow-hidden">
            <img src={studentsImg} alt="Campus culture" className="size-full object-cover" loading="lazy" width={1600} height={1200}/>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
