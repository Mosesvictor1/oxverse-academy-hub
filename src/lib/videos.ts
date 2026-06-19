import campus from "@/assets/campus.jpg";
import frontend from "@/assets/courses/frontend.jpg";
import uiux from "@/assets/courses/uiux.jpg";
import ai from "@/assets/courses/ai.jpg";

export type VideoCategory =
  | "Engineering"
  | "Design"
  | "Data & AI"
  | "Web3"
  | "Marketing"
  | "Academy";

export type Video = {
  slug: string;
  title: string;
  description: string;
  category: VideoCategory;
  duration: string;
  poster: string;
  /** Path to MP4 in public/videos/, e.g. "/videos/welcome-to-oxverse.mp4" */
  src: string;
  courseSlug?: string;
  /** Set to true once the matching file exists in public/videos/ */
  published: boolean;
};

export const videoCategories = [
  "All",
  "Engineering",
  "Design",
  "Data & AI",
  "Web3",
  "Marketing",
  "Academy",
] as const;

/**
 * Add entries here, then drop the matching file at public/videos/{slug}.mp4
 * and set published: true.
 */
export const videos: Video[] = [
  {
    slug: "welcome-to-oxverse",
    title: "Welcome to OxVerse Academy",
    description: "A quick tour of our Lagos campus, cohort model, and what students can expect.",
    category: "Academy",
    duration: "3 min",
    poster: campus,
    src: "/videos/welcome-to-oxverse.mp4",
    published: false,
  },
  {
    slug: "frontend-basics",
    title: "Frontend Development Basics",
    description: "HTML, CSS, and JavaScript fundamentals for absolute beginners.",
    category: "Engineering",
    duration: "8 min",
    poster: frontend,
    src: "/videos/frontend-basics.mp4",
    courseSlug: "frontend-development",
    published: false,
  },
  {
    slug: "uiux-intro",
    title: "Introduction to UI/UX Design",
    description: "How great products are researched, wireframed, and prototyped.",
    category: "Design",
    duration: "6 min",
    poster: uiux,
    src: "/videos/uiux-intro.mp4",
    courseSlug: "ui-ux-design",
    published: false,
  },
  {
    slug: "ai-fundamentals",
    title: "AI & Machine Learning Fundamentals",
    description: "Core concepts behind modern AI tools and how to start building with them.",
    category: "Data & AI",
    duration: "10 min",
    poster: ai,
    src: "/videos/ai-fundamentals.mp4",
    courseSlug: "artificial-intelligence",
    published: false,
  },
];

export function getPublishedVideos() {
  return videos.filter((v) => v.published);
}
