import eventFlyer from "@/assets/event_build_app_ai.png";

export type FeaturedEvent = {
  slug: string;
  title: string;
  tagline: string;
  type: string;
  date: string;
  dateISO: string;
  time: string;
  location: string;
  mode: "Online" | "In-person" | "Hybrid";
  platform?: string;
  price: string;
  flyer: string;
  speakers: { name: string; role: string }[];
  description: string;
  highlights: string[];
  featured: boolean;
};

export const events: FeaturedEvent[] = [
  {
    slug: "build-app-website-2hrs-ai",
    title: "How to Build an App & Website in 2 Hours with AI",
    tagline: "Ship real software in a single evening — no prior coding required.",
    type: "Online Tech Event",
    date: "Saturday, 30 May 2026",
    dateISO: "2026-05-30T18:00:00+01:00",
    time: "6:00 PM WAT",
    location: "Online via Google Meet",
    mode: "Online",
    platform: "Google Meet",
    price: "Free",
    flyer: eventFlyer,
    speakers: [
      { name: "Victor Moses", role: "Tech Instructor & Software Developer" },
      { name: "Igwilo Victor", role: "Tech Instructor & Web3 Systems Architect" },
    ],
    description:
      "Join two of 0xVerse Academy's lead instructors for a live, hands-on session showing exactly how to design, build and deploy a working app and website in under two hours using modern AI tools.",
    highlights: [
      "Live demo: idea → deployed product in under 2 hours",
      "The exact AI stack our instructors use daily",
      "Q&A with Victor Moses & Igwilo Victor",
      "Free recording sent to all registrants",
    ],
    featured: true,
  },
];

export const getFeaturedEvent = () => events.find((e) => e.featured) ?? null;
export const getEvent = (slug: string) => events.find((e) => e.slug === slug) ?? null;