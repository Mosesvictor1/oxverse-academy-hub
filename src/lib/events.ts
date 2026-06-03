const flyer3 = { url: "/event_countdown_3.png" };
const flyer2 = { url: "/event_countdown_2.png" };
const flyer1 = { url: "/event_countdown_1.png" };
const flyerFinal = { url: "/event_countdown_final.png" };

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
  whatsappUrl: string;
  speakers: { name: string; role: string }[];
  description: string;
  highlights: string[];
  featured: boolean;
};

export type CountdownStage = "3days" | "2days" | "1day" | "final" | "past";

/**
 * Returns the current countdown stage based on days remaining until the event.
 * Refreshes naturally as the browser re-evaluates (rendered every load + 12h interval).
 */
export function getCountdownStage(dateISO: string, now: Date = new Date()): CountdownStage {
  const event = new Date(dateISO);
  // Compare calendar days in local time
  const startOfDay = (d: Date) =>
    new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
  const diffDays = Math.round((startOfDay(event) - startOfDay(now)) / 86400000);
  if (diffDays >= 3) return "3days";
  if (diffDays === 2) return "2days";
  if (diffDays === 1) return "1day";
  if (diffDays === 0) return "final";
  return "past";
}

const FLYER_MAP: Record<CountdownStage, { url: string }> = {
  "3days": flyer3,
  "2days": flyer2,
  "1day": flyer1,
  final: flyerFinal,
  past: flyerFinal,
};

export function getCountdownFlyer(dateISO: string, now: Date = new Date()): string {
  return FLYER_MAP[getCountdownStage(dateISO, now)].url;
}

export function getCountdownLabel(dateISO: string, now: Date = new Date()): string {
  const stage = getCountdownStage(dateISO, now);
  switch (stage) {
    case "3days": return "3 days to go";
    case "2days": return "2 days to go";
    case "1day": return "1 day to go";
    case "final": return "Final day — it's happening today!";
    case "past": return "Event in progress";
  }
}

import { useEffect, useState } from "react";

/**
 * Returns the current countdown flyer URL and refreshes automatically
 * every 12 hours so the flyer rotates as the event approaches.
 */
export function useCountdownFlyer(dateISO: string) {
  const [now, setNow] = useState<Date>(() => new Date());
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 12 * 60 * 60 * 1000);
    return () => window.clearInterval(id);
  }, []);
  return {
    flyer: getCountdownFlyer(dateISO, now),
    stage: getCountdownStage(dateISO, now),
    label: getCountdownLabel(dateISO, now),
  };
}

export const events: FeaturedEvent[] = [
  {
    slug: "build-app-website-2hrs-ai",
    title: "How to Build an App & Website in 2 Hours with AI",
    tagline: "Ship real software in a single evening — no prior coding required.",
    type: "Online Tech Event",
    date: "Saturday, 6 June 2026",
    dateISO: "2026-06-06T18:00:00+01:00",
    time: "6:00 PM WAT",
    location: "Online via Google Meet",
    mode: "Online",
    platform: "Google Meet",
    price: "Free",
    whatsappUrl: "https://chat.whatsapp.com/JtRCwluCa1KFDaZvKKVyKJ",
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