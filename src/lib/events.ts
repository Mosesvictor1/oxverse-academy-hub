const freeClassFlyer = { url: "/free_class_flyer.jpg" };

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
  "3days": freeClassFlyer,
  "2days": freeClassFlyer,
  "1day": freeClassFlyer,
  final: freeClassFlyer,
  past: freeClassFlyer,
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
    case "final": return "It's happening today!";
    case "past": return "Happening now — Day 2!";
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
    slug: "free-tech-class-june-2026",
    title: "Start Your Tech Career for FREE — 2-Day Free Class",
    tagline:
      "A 2-day free tech class to help you discover, learn and start your journey in tech.",
    type: "Free Class",
    date: "Friday & Saturday, 12–13 June 2026",
    dateISO: "2026-06-12T09:00:00+01:00",
    time: "9:00 AM WAT",
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
      "It's finally here — your 2-day free tech class starts now. Join 0xVerse Academy to discover in-demand tech skills, see how AI is changing the game, and get step-by-step guidance to start your tech career.",
    highlights: [
      "Start your tech career on the right path",
      "Discover in-demand tech skills",
      "Learn how AI is changing the game",
      "Step-by-step guidance from real instructors",
      "Real opportunities await you",
    ],
    featured: true,
  },
];

export const getFeaturedEvent = () => null;
export const getEvent = (slug: string) => events.find((e) => e.slug === slug) ?? null;