export type VideoCategory =
  | "Engineering"
  | "Design"
  | "Data & AI"
  | "Web3"
  | "Marketing"
  | "Academy";

export type VideoSeries =
  | "Course explainers"
  | "Tech terms decoded"
  | "How AI changed"
  | "Promos"
  | "Ads";

export type VideoOrientation = "landscape" | "portrait";

export type Video = {
  slug: string;
  title: string;
  description: string;
  category: VideoCategory;
  series: VideoSeries;
  orientation: VideoOrientation;
  duration: string;
  /** Small WebP for gallery cards (~320px) */
  poster: string;
  /** Medium WebP for the video player (~640px) */
  posterPlay: string;
  src: string;
  /** WebVTT path when captions were exported from Remotion */
  captions?: string;
  hasCaptions: boolean;
  courseSlug?: string;
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

export const videoSeries = [
  "All",
  "Course explainers",
  "Tech terms decoded",
  "How AI changed",
  "Promos",
  "Ads",
] as const;

/** Tabs shown in the gallery — one series visible at a time */
export const gallerySeriesTabs = [
  "Course explainers",
  "Tech terms decoded",
  "How AI changed",
  "Promos",
  "Ads",
] as const satisfies readonly VideoSeries[];

export const seriesMeta: Record<
  VideoSeries,
  { blurb: string; order: number }
> = {
  "Course explainers": {
    blurb: "Quick overviews of every OxVerse track — what you'll learn and where it leads.",
    order: 0,
  },
  "Tech terms decoded": {
    blurb: "One concept per video. Plain-language breakdowns of terms you'll hear in class.",
    order: 1,
  },
  "How AI changed": {
    blurb: "How artificial intelligence is reshaping each field we teach.",
    order: 2,
  },
  Promos: {
    blurb: "Campus highlights and free class invites from OxVerse.",
    order: 3,
  },
  Ads: {
    blurb: "Short course spotlights — pick a path and explore the full program.",
    order: 4,
  },
};

export const categoryOrder: VideoCategory[] = [
  "Academy",
  "Engineering",
  "Design",
  "Data & AI",
  "Web3",
  "Marketing",
];

import captionSlugs from "./captionSlugs.json";

const captionSlugSet = new Set<string>(captionSlugs);

type VideoSeed = Omit<
  Video,
  "slug" | "poster" | "posterPlay" | "src" | "captions" | "hasCaptions" | "published"
> & {
  file: string;
};

function remotionVideo({ file, ...meta }: VideoSeed): Video {
  const slug = file.replace(/\.mp4$/, "");
  const hasCaptions = captionSlugSet.has(slug);
  return {
    ...meta,
    slug,
    poster: `/videos/thumbs/${slug}.jpg`,
    posterPlay: `/videos/posters/${slug}.jpg`,
    src: `/videos/${file}`,
    captions: hasCaptions ? `/videos/captions/${slug}.vtt` : undefined,
    hasCaptions,
    published: true,
  };
}

/** Imported from 0xverse/0xverse-landing/public/video (Remotion renders) */
export const videos: Video[] = [
  remotionVideo({
    file: "academy-hero.mp4",
    title: "OxVerse Academy",
    description: "Introducing Africa's premium physical tech academy in Lagos.",
    category: "Academy",
    series: "Promos",
    orientation: "landscape",
    duration: "1 min",
  }),
  remotionVideo({
    file: "free-tech-class-cinematic.mp4",
    title: "Free Tech Class (Cinematic)",
    description: "Join our free introductory tech class and start your journey into software.",
    category: "Academy",
    series: "Promos",
    orientation: "portrait",
    duration: "1 min",
  }),
  remotionVideo({
    file: "free-tech-class-promo.mp4",
    title: "Free Tech Class Promo",
    description: "Reserve your seat for a hands-on introduction to tech at OxVerse.",
    category: "Academy",
    series: "Promos",
    orientation: "portrait",
    duration: "1 min",
  }),
  remotionVideo({
    file: "data-analysis-ad.mp4",
    title: "Data Analysis Course",
    description: "Turn raw data into decisions. Cohort-based training in Lagos.",
    category: "Data & AI",
    series: "Ads",
    orientation: "portrait",
    duration: "1 min",
    courseSlug: "data-analysis",
  }),
  remotionVideo({
    file: "web3-ad.mp4",
    title: "Web3 & Blockchain Course",
    description: "Build on-chain. Learn smart contracts, dApps, and Web3 careers.",
    category: "Web3",
    series: "Ads",
    orientation: "portrait",
    duration: "1 min",
    courseSlug: "web3-blockchain",
  }),
  remotionVideo({
    file: "creative-tech-ad.mp4",
    title: "Creative Tech Programs",
    description: "Design, build, and ship. UI/UX and graphics for the modern creator economy.",
    category: "Design",
    series: "Ads",
    orientation: "portrait",
    duration: "1 min",
  }),
  remotionVideo({
    file: "digital-marketing-ad.mp4",
    title: "Digital Marketing Course",
    description: "Growth, content, and performance marketing for African brands.",
    category: "Marketing",
    series: "Ads",
    orientation: "portrait",
    duration: "1 min",
    courseSlug: "digital-marketing",
  }),
  remotionVideo({
    file: "frontend-explainer.mp4",
    title: "Frontend Development Explained",
    description: "What frontend engineers do, the tools they use, and the career path ahead.",
    category: "Engineering",
    series: "Course explainers",
    orientation: "portrait",
    duration: "1 min",
    courseSlug: "frontend-development",
  }),
  remotionVideo({
    file: "fullstack-explainer.mp4",
    title: "Full Stack Development Explained",
    description: "From database to browser — how full stack engineers ship complete products.",
    category: "Engineering",
    series: "Course explainers",
    orientation: "portrait",
    duration: "1 min",
    courseSlug: "full-stack-development",
  }),
  remotionVideo({
    file: "uiux-explainer.mp4",
    title: "UI/UX Design Explained",
    description: "Research, wireframes, prototypes, and the design process behind great products.",
    category: "Design",
    series: "Course explainers",
    orientation: "portrait",
    duration: "1 min",
    courseSlug: "ui-ux-design",
  }),
  remotionVideo({
    file: "graphics-explainer.mp4",
    title: "Graphics Design Explained",
    description: "Visual identity, layout, and brand systems for digital and print.",
    category: "Design",
    series: "Course explainers",
    orientation: "portrait",
    duration: "1 min",
    courseSlug: "graphics-design",
  }),
  remotionVideo({
    file: "data-explainer.mp4",
    title: "Data Analytics Explained",
    description: "Collect, clean, analyze, and visualize data for real business decisions.",
    category: "Data & AI",
    series: "Course explainers",
    orientation: "portrait",
    duration: "1 min",
    courseSlug: "data-analysis",
  }),
  remotionVideo({
    file: "marketing-explainer.mp4",
    title: "Digital Marketing Explained",
    description: "SEO, social, funnels, and growth strategies that actually convert.",
    category: "Marketing",
    series: "Course explainers",
    orientation: "portrait",
    duration: "1 min",
    courseSlug: "digital-marketing",
  }),
  remotionVideo({
    file: "web3-explainer.mp4",
    title: "Web3 Explained",
    description: "Blockchains, wallets, smart contracts, and careers in decentralized tech.",
    category: "Web3",
    series: "Course explainers",
    orientation: "portrait",
    duration: "1 min",
    courseSlug: "web3-blockchain",
  }),
  remotionVideo({
    file: "mktalgos-explainer.mp4",
    title: "Marketing Algorithms Explained",
    description: "How platforms rank content and what marketers need to know about the feed.",
    category: "Marketing",
    series: "Course explainers",
    orientation: "portrait",
    duration: "1 min",
    courseSlug: "digital-marketing",
  }),
  remotionVideo({
    file: "web3-smart-contract.mp4",
    title: "What Is a Smart Contract?",
    description: "Self-executing code on a blockchain — explained in plain language.",
    category: "Web3",
    series: "Tech terms decoded",
    orientation: "portrait",
    duration: "1 min",
    courseSlug: "web3-blockchain",
  }),
  remotionVideo({
    file: "web3-gas-fee.mp4",
    title: "What Is a Gas Fee?",
    description: "Why transactions cost money on Ethereum and how gas works.",
    category: "Web3",
    series: "Tech terms decoded",
    orientation: "portrait",
    duration: "1 min",
    courseSlug: "web3-blockchain",
  }),
  remotionVideo({
    file: "web3-devrel.mp4",
    title: "What Is DevRel?",
    description: "Developer relations — bridging builders, communities, and protocols.",
    category: "Web3",
    series: "Tech terms decoded",
    orientation: "portrait",
    duration: "1 min",
    courseSlug: "web3-blockchain",
  }),
  remotionVideo({
    file: "fullstack-api.mp4",
    title: "What Is an API?",
    description: "How apps talk to each other — REST, endpoints, and request/response.",
    category: "Engineering",
    series: "Tech terms decoded",
    orientation: "portrait",
    duration: "1 min",
    courseSlug: "full-stack-development",
  }),
  remotionVideo({
    file: "fullstack-frontend-backend.mp4",
    title: "Frontend vs Backend",
    description: "Two sides of every app — what each layer does and why both matter.",
    category: "Engineering",
    series: "Tech terms decoded",
    orientation: "portrait",
    duration: "1 min",
    courseSlug: "full-stack-development",
  }),
  remotionVideo({
    file: "fullstack-github.mp4",
    title: "What Is GitHub?",
    description: "Version control, collaboration, and why every developer lives on GitHub.",
    category: "Engineering",
    series: "Tech terms decoded",
    orientation: "portrait",
    duration: "1 min",
    courseSlug: "full-stack-development",
  }),
  remotionVideo({
    file: "uiux-ui-vs-ux.mp4",
    title: "UI vs UX",
    description: "Interface design and user experience — related, but not the same thing.",
    category: "Design",
    series: "Tech terms decoded",
    orientation: "portrait",
    duration: "1 min",
    courseSlug: "ui-ux-design",
  }),
  remotionVideo({
    file: "uiux-ux-friction.mp4",
    title: "What Is UX Friction?",
    description: "Tiny obstacles that make users leave — and how designers remove them.",
    category: "Design",
    series: "Tech terms decoded",
    orientation: "portrait",
    duration: "2 min",
    courseSlug: "ui-ux-design",
  }),
  remotionVideo({
    file: "uiux-micro-interactions.mp4",
    title: "What Are Micro-interactions?",
    description: "Small animations and feedback loops that make interfaces feel alive.",
    category: "Design",
    series: "Tech terms decoded",
    orientation: "portrait",
    duration: "1 min",
    courseSlug: "ui-ux-design",
  }),
  remotionVideo({
    file: "graphics-branding-logo.mp4",
    title: "Branding & Logo Design",
    description: "How logos, color, and identity systems build memorable brands.",
    category: "Design",
    series: "Tech terms decoded",
    orientation: "portrait",
    duration: "1 min",
    courseSlug: "graphics-design",
  }),
  remotionVideo({
    file: "graphics-visual-hierarchy.mp4",
    title: "Visual Hierarchy",
    description: "Guide the eye — size, contrast, and spacing in layout design.",
    category: "Design",
    series: "Tech terms decoded",
    orientation: "portrait",
    duration: "1 min",
    courseSlug: "graphics-design",
  }),
  remotionVideo({
    file: "graphics-typography.mp4",
    title: "Typography Basics",
    description: "Typefaces, pairing, and readability for digital and print design.",
    category: "Design",
    series: "Tech terms decoded",
    orientation: "portrait",
    duration: "2 min",
    courseSlug: "graphics-design",
  }),
  remotionVideo({
    file: "mkt-seo.mp4",
    title: "What Is SEO?",
    description: "Search engine optimization — ranking on Google without paid ads.",
    category: "Marketing",
    series: "Tech terms decoded",
    orientation: "portrait",
    duration: "1 min",
    courseSlug: "digital-marketing",
  }),
  remotionVideo({
    file: "mkt-funnel.mp4",
    title: "What Is a Marketing Funnel?",
    description: "Awareness → interest → decision → action. How funnels drive growth.",
    category: "Marketing",
    series: "Tech terms decoded",
    orientation: "portrait",
    duration: "1 min",
    courseSlug: "digital-marketing",
  }),
  remotionVideo({
    file: "mkt-watch-time.mp4",
    title: "What Is Watch Time?",
    description: "Why platforms reward retention — and how creators optimize for it.",
    category: "Marketing",
    series: "Tech terms decoded",
    orientation: "portrait",
    duration: "1 min",
    courseSlug: "digital-marketing",
  }),
  remotionVideo({
    file: "frontend-ai-changed.mp4",
    title: "How AI Changed Frontend",
    description: "Copilots, component generation, and the new frontend workflow.",
    category: "Engineering",
    series: "How AI changed",
    orientation: "portrait",
    duration: "1 min",
    courseSlug: "frontend-development",
  }),
  remotionVideo({
    file: "backend-ai-changed.mp4",
    title: "How AI Changed Backend",
    description: "AI-assisted APIs, infra, and the evolving backend engineer role.",
    category: "Engineering",
    series: "How AI changed",
    orientation: "portrait",
    duration: "1 min",
    courseSlug: "backend-development",
  }),
  remotionVideo({
    file: "fullstack-ai-changed.mp4",
    title: "How AI Changed Full Stack",
    description: "One developer, full product — AI compresses the stack.",
    category: "Engineering",
    series: "How AI changed",
    orientation: "portrait",
    duration: "1 min",
    courseSlug: "full-stack-development",
  }),
  remotionVideo({
    file: "mobile-ai-changed.mp4",
    title: "How AI Changed Mobile",
    description: "On-device ML, smarter UX, and faster mobile development cycles.",
    category: "Engineering",
    series: "How AI changed",
    orientation: "portrait",
    duration: "1 min",
    courseSlug: "mobile-development",
  }),
  remotionVideo({
    file: "uiux-ai-changed.mp4",
    title: "How AI Changed UI/UX",
    description: "Generative UI, rapid prototyping, and AI in the design process.",
    category: "Design",
    series: "How AI changed",
    orientation: "portrait",
    duration: "1 min",
    courseSlug: "ui-ux-design",
  }),
  remotionVideo({
    file: "graphics-ai-changed.mp4",
    title: "How AI Changed Graphics Design",
    description: "AI image tools, brand kits, and the designer's expanded toolkit.",
    category: "Design",
    series: "How AI changed",
    orientation: "portrait",
    duration: "1 min",
    courseSlug: "graphics-design",
  }),
  remotionVideo({
    file: "data-ai-changed.mp4",
    title: "How AI Changed Data",
    description: "Automated analysis, natural language queries, and the new data stack.",
    category: "Data & AI",
    series: "How AI changed",
    orientation: "portrait",
    duration: "1 min",
    courseSlug: "data-analysis",
  }),
  remotionVideo({
    file: "ai-engineering-ai-changed.mp4",
    title: "How AI Changed AI Engineering",
    description: "Fine-tuning, RAG, agents — the field eating its own tail.",
    category: "Data & AI",
    series: "How AI changed",
    orientation: "portrait",
    duration: "1 min",
    courseSlug: "artificial-intelligence",
  }),
  remotionVideo({
    file: "marketing-ai-changed.mp4",
    title: "How AI Changed Marketing",
    description: "Personalization at scale, AI copy, and the modern growth stack.",
    category: "Marketing",
    series: "How AI changed",
    orientation: "portrait",
    duration: "1 min",
    courseSlug: "digital-marketing",
  }),
  remotionVideo({
    file: "web3-ai-changed.mp4",
    title: "How AI Changed Web3",
    description: "Smart contract auditing, on-chain analytics, and AI × crypto.",
    category: "Web3",
    series: "How AI changed",
    orientation: "portrait",
    duration: "1 min",
    courseSlug: "web3-blockchain",
  }),
];

export function getPublishedVideos() {
  return videos.filter((v) => v.published);
}
