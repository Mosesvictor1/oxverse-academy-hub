import { SiteLayout, SectionEyebrow } from "@/components/site/SiteLayout";
import { SEO } from "@/components/site/SEO";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

const faqs = [
  { q: "Are classes physical or online?", a: "All OxVerse classes are physical, held at our Lekki campus in Lagos. Mentorship and study materials are accessible online." },
  { q: "How do I apply?", a: "Pick a course, click Enroll Now, and complete the 7-step application. Our admissions team responds within 48 hours." },
  { q: "Do you offer payment plans?", a: "Yes — installment plans up to 4 months are available. Details shared after admission." },
  { q: "Will I get a certificate?", a: "Every graduate receives an OxVerse Certificate of Completion plus a portfolio review." },
  { q: "What if I miss a class?", a: "Sessions are recorded for review, and instructors hold weekly office hours for catch-up." },
  { q: "Do you guarantee a job?", a: "We don't guarantee jobs, but our 92% placement rate speaks for itself. We provide CV reviews, mock interviews, and direct introductions to hiring partners." },
];

export default function FAQPage() {
  return (
    <SiteLayout>
      <SEO title="FAQ — OxVerse Academy" description="Answers to common questions about admissions, classes, payment plans, and more." />
      <section className="mx-auto max-w-3xl px-6 pt-24 pb-10">
        <SectionEyebrow>FAQ</SectionEyebrow>
        <h1 className="mt-6 font-display text-5xl md:text-6xl font-bold tracking-tighter">Common questions.</h1>
      </section>
      <section className="mx-auto max-w-3xl px-6 pb-24">
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`f-${i}`} className="rounded-2xl border border-border px-6">
              <AccordionTrigger className="font-display text-lg font-semibold hover:no-underline">{f.q}</AccordionTrigger>
              <AccordionContent className="text-ink-muted text-pretty">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </SiteLayout>
  );
}
