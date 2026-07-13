import aiImg from "@/assets/courses/ai.jpg";
import frontendImg from "@/assets/courses/frontend.jpg";
import uiuxImg from "@/assets/courses/uiux.jpg";
import web3Img from "@/assets/courses/web3.jpg";
import marketingImg from "@/assets/courses/marketing.jpg";
import dataImg from "@/assets/courses/data.jpg";

export type TrackPath = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  emoji: string;
  gradient: string; // tailwind gradient classes
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  skills: string[];
  tools: string[];
  projects: string[];
  outcomes: string[];
  careers: string[];
  courseSlug?: string; // link to existing course when applicable
};

export type Track = {
  slug: string;
  name: string;
  short: string; // used for hero tagline
  tagline: string;
  description: string;
  image: string;
  emoji: string;
  accent: string; // hex accent color
  gradient: string; // "from-... to-..." tailwind gradient
  bg: string; // subtle bg tint class
  totalDuration: string;
  audience: string;
  paths: TrackPath[];
};

export const tracks: Track[] = [
  {
    slug: "artificial-intelligence",
    name: "Artificial Intelligence",
    short: "3 in 1 AI Career Track",
    tagline: "Automate, build, and engineer with AI.",
    description:
      "Three focused paths that turn you into an AI-native builder — from no-code automation, to shipping full products with AI, to engineering the models that power them.",
    image: aiImg,
    emoji: "🤖",
    accent: "#8B5CF6",
    gradient: "from-violet-500 via-purple-600 to-fuchsia-500",
    bg: "bg-violet-500/5",
    totalDuration: "3 – 6 months per path",
    audience: "Founders, operators, engineers and creators",
    paths: [
      {
        slug: "ai-automation",
        title: "AI Automation",
        tagline: "Automate real work with agents & workflows.",
        description:
          "Design AI powered workflows and agents that replace repetitive work across sales, marketing, ops and support — using n8n, Make, Zapier and GPT.",
        emoji: "⚡",
        gradient: "from-amber-400 to-orange-600",
        duration: "3 months",
        level: "Beginner",
        skills: ["Workflow design", "Prompt engineering", "API integrations", "RAG basics", "Agentic reasoning"],
        tools: ["n8n", "Make.com", "Zapier", "OpenAI", "Airtable", "Slack API"],
        projects: ["Autonomous lead-gen agent", "Support triage bot", "Content publishing pipeline"],
        outcomes: [
          "Ship no-code AI workflows in production",
          "Design agents that call tools and APIs",
          "Sell automation services as a freelancer",
        ],
        careers: ["AI Automation Specialist", "Ops Engineer", "Prompt Engineer"],
      },
      {
        slug: "ai-vibe-coding",
        title: "AI Vibe Coding",
        tagline: "Ship full products with AI as your co-founder.",
        description:
          "Learn to build and launch real web apps by orchestrating Cursor, Lovable, v0 and Claude — from idea to deploy in days, not months.",
        emoji: "✨",
        gradient: "from-pink-500 to-purple-600",
        duration: "4 months",
        level: "Intermediate",
        skills: ["AI pair programming", "Product spec writing", "Rapid prototyping", "Design taste", "Deployment"],
        tools: ["Cursor", "Lovable", "v0", "Claude", "Supabase", "Vercel"],
        projects: ["SaaS MVP in 7 days", "Realtime social app", "AI micro-tool marketplace"],
        outcomes: [
          "Turn ideas into shipped products alone",
          "Master AI-assisted engineering workflows",
          "Launch a paying product before graduation",
        ],
        careers: ["Indie Hacker", "AI Product Engineer", "Founding Engineer"],
      },
      {
        slug: "ai-engineering",
        title: "AI Engineering",
        tagline: "Build the models & systems behind modern AI.",
        description:
          "Deep-dive into Python, PyTorch, LLMs, RAG pipelines, evals and MLOps to build production-grade AI systems and models.",
        emoji: "🧠",
        gradient: "from-cyan-400 to-blue-600",
        duration: "6 months",
        level: "Advanced",
        skills: ["Python & PyTorch", "LLM fine-tuning", "RAG architecture", "Evaluations", "MLOps"],
        tools: ["Python", "PyTorch", "LangChain", "LlamaIndex", "Pinecone", "Weights & Biases"],
        projects: ["Custom RAG assistant", "Fine-tuned domain LLM", "Multi-agent research system"],
        outcomes: [
          "Engineer end-to-end AI products",
          "Fine-tune and evaluate LLMs",
          "Deploy scalable inference pipelines",
        ],
        careers: ["AI Engineer", "ML Engineer", "Applied Researcher"],
        courseSlug: "artificial-intelligence",
      },
    ],
  },
  {
    slug: "software-engineering",
    name: "Software Engineering",
    short: "3 in 1 Engineering Track",
    tagline: "Build the frontend, backend, and everything between.",
    description:
      "A complete engineering path — pick the specialty that fits you: pixel-perfect frontend, scalable backend, or full-stack product engineering.",
    image: frontendImg,
    emoji: "💻",
    accent: "#6D28D9",
    gradient: "from-indigo-500 via-purple-600 to-blue-600",
    bg: "bg-indigo-500/5",
    totalDuration: "4 – 6 months per path",
    audience: "Aspiring engineers and career switchers",
    paths: [
      {
        slug: "frontend",
        title: "Frontend Engineering",
        tagline: "Beautiful, fast, accessible interfaces.",
        description:
          "React, TypeScript, Next.js, Tailwind — ship production interfaces used by real users.",
        emoji: "🎨",
        gradient: "from-sky-400 to-indigo-600",
        duration: "4 months",
        level: "Beginner",
        skills: ["HTML/CSS", "TypeScript", "React", "Next.js", "Accessibility"],
        tools: ["React", "TypeScript", "Next.js", "Tailwind", "Vercel"],
        projects: ["Ecommerce storefront", "Realtime chat UI", "Analytics dashboard"],
        outcomes: ["Ship production React apps", "Convert any design into code", "Deploy to Vercel"],
        careers: ["Frontend Engineer", "UI Engineer", "React Developer"],
        courseSlug: "frontend-development",
      },
      {
        slug: "backend",
        title: "Backend Engineering",
        tagline: "APIs, databases, and scalable services.",
        description:
          "Python, FastAPI, PostgreSQL, auth, queues and deployment — build the engines behind modern apps.",
        emoji: "⚙️",
        gradient: "from-emerald-400 to-teal-700",
        duration: "4 months",
        level: "Intermediate",
        skills: ["Python", "Databases", "REST/GraphQL", "Auth", "DevOps"],
        tools: ["Python", "FastAPI", "PostgreSQL", "Docker", "AWS"],
        projects: ["Booking API", "Payments service", "Realtime collab backend"],
        outcomes: ["Design & ship REST/GraphQL APIs", "Model relational data", "Deploy production services"],
        careers: ["Backend Engineer", "API Developer", "DevOps Engineer"],
        courseSlug: "backend-development",
      },
      {
        slug: "fullstack",
        title: "Full-Stack Engineering",
        tagline: "Ship end-to-end products, solo.",
        description:
          "Combine frontend, backend, DevOps and product thinking to ship complete products from pixel to production.",
        emoji: "🚀",
        gradient: "from-fuchsia-500 to-purple-700",
        duration: "6 months",
        level: "Intermediate",
        skills: ["React & Node/Python", "Systems design", "Auth", "Deployment", "Testing"],
        tools: ["Next.js", "FastAPI", "Postgres", "Docker", "Vercel", "AWS"],
        projects: ["SaaS starter", "Social platform clone", "Marketplace MVP"],
        outcomes: ["Own a product end to end", "Ship, monitor and scale", "Interview at senior level"],
        careers: ["Full-Stack Engineer", "Founding Engineer", "Product Engineer"],
        courseSlug: "full-stack-development",
      },
    ],
  },
  {
    slug: "design",
    name: "Design",
    short: "2 in 1 Creative Track",
    tagline: "Craft products & brands people love.",
    description:
      "Master product design and visual identity — from delightful UX flows to brand systems that scale.",
    image: uiuxImg,
    emoji: "🎨",
    accent: "#EC4899",
    gradient: "from-rose-500 via-pink-500 to-fuchsia-600",
    bg: "bg-pink-500/5",
    totalDuration: "3 – 4 months per path",
    audience: "Designers, founders and creators",
    paths: [
      {
        slug: "ui-ux",
        title: "UI / UX Design",
        tagline: "Design products people actually use.",
        description:
          "Master research, wireframing, prototyping and design systems using Figma — plus interaction and accessibility.",
        emoji: "🧩",
        gradient: "from-pink-500 to-rose-600",
        duration: "4 months",
        level: "Beginner",
        skills: ["User research", "Wireframing", "Prototyping", "Design systems", "Accessibility"],
        tools: ["Figma", "FigJam", "Notion", "Framer"],
        projects: ["Fintech onboarding flow", "SaaS dashboard", "Mobile app redesign"],
        outcomes: ["Ship polished product designs", "Build a system that scales", "Present to stakeholders"],
        careers: ["Product Designer", "UX Designer", "UI Engineer"],
        courseSlug: "ui-ux-design",
      },
      {
        slug: "graphics-branding",
        title: "Graphics & Branding",
        tagline: "Visual identities that make brands unforgettable.",
        description:
          "Type, color, logo systems and social visuals — become the designer brands hire on repeat.",
        emoji: "🖌️",
        gradient: "from-orange-400 to-rose-600",
        duration: "3 months",
        level: "Beginner",
        skills: ["Typography", "Brand strategy", "Logo systems", "Social design", "Print"],
        tools: ["Figma", "Illustrator", "Photoshop", "InDesign"],
        projects: ["Brand identity system", "Launch campaign kit", "Editorial layouts"],
        outcomes: ["Design brand systems clients love", "Build a paid client pipeline", "Ship a full case-study portfolio"],
        careers: ["Brand Designer", "Visual Designer", "Freelance Designer"],
        courseSlug: "graphics-design",
      },
    ],
  },
  {
    slug: "web3",
    name: "Web3 & Blockchain",
    short: "The Onchain Builder Track",
    tagline: "Build the onchain future.",
    description:
      "Everything you need to become an onchain builder — from smart contracts to dApps, DevRel and DeFi.",
    image: web3Img,
    emoji: "🌐",
    accent: "#06B6D4",
    gradient: "from-cyan-400 via-teal-500 to-emerald-500",
    bg: "bg-cyan-500/5",
    totalDuration: "4 – 6 months",
    audience: "Developers and builders entering Web3",
    paths: [
      {
        slug: "smart-contracts",
        title: "Smart Contract Development",
        tagline: "Ship secure contracts on EVM chains.",
        description:
          "Solidity, Foundry, security patterns and deployment across Ethereum and L2s.",
        emoji: "📜",
        gradient: "from-cyan-400 to-blue-600",
        duration: "4 months",
        level: "Intermediate",
        skills: ["Solidity", "EVM", "Security", "Testing", "Gas optimization"],
        tools: ["Solidity", "Foundry", "Hardhat", "Ethers.js", "Base", "Arbitrum"],
        projects: ["ERC-20 token launch", "NFT drop contract", "DeFi vault"],
        outcomes: ["Ship audited-grade contracts", "Understand common exploits", "Deploy across L2s"],
        careers: ["Smart Contract Engineer", "Protocol Engineer"],
        courseSlug: "web3-blockchain",
      },
      {
        slug: "dapp-development",
        title: "dApp Development",
        tagline: "Build the interfaces that power Web3.",
        description:
          "Next.js + wagmi + viem + Privy — build production dApps with wallet auth, onchain data and beautiful UX.",
        emoji: "🪄",
        gradient: "from-purple-500 to-fuchsia-600",
        duration: "4 months",
        level: "Intermediate",
        skills: ["React", "Wallet auth", "Onchain reads/writes", "Indexers", "IPFS"],
        tools: ["Next.js", "wagmi", "viem", "Privy", "The Graph"],
        projects: ["NFT marketplace", "DAO dashboard", "Onchain social app"],
        outcomes: ["Ship production dApps", "Integrate wallets and chains", "Read/write onchain data"],
        careers: ["dApp Engineer", "Web3 Frontend Engineer"],
      },
      {
        slug: "devrel-defi",
        title: "DevRel & DeFi",
        tagline: "Grow ecosystems and build in DeFi.",
        description:
          "Understand DeFi primitives, tokenomics and DevRel — how to build community, docs and demos that ship.",
        emoji: "📣",
        gradient: "from-emerald-400 to-teal-600",
        duration: "3 months",
        level: "Intermediate",
        skills: ["DeFi primitives", "Tokenomics", "Content", "DevRel", "Community"],
        tools: ["Notion", "Twitter/X", "Mirror", "Docs sites"],
        projects: ["Protocol demo & docs", "DeFi analytics thread", "Grant application"],
        outcomes: ["Land DevRel roles", "Build in DeFi with clarity", "Grow onchain audiences"],
        careers: ["Developer Advocate", "DeFi Analyst", "Ecosystem Lead"],
      },
    ],
  },
  {
    slug: "growth-marketing",
    name: "Growth & Marketing",
    short: "3 in 1 Growth Track",
    tagline: "Drive users, revenue and brand.",
    description:
      "Modern growth — content, performance and analytics — to move real business metrics.",
    image: marketingImg,
    emoji: "📈",
    accent: "#F59E0B",
    gradient: "from-amber-400 via-orange-500 to-rose-500",
    bg: "bg-amber-500/5",
    totalDuration: "3 months per path",
    audience: "Marketers, founders and creators",
    paths: [
      {
        slug: "content-seo",
        title: "Content & SEO",
        tagline: "Rank, convert and grow organically.",
        description:
          "Modern SEO, content strategy and AI-assisted writing to build a compounding traffic engine.",
        emoji: "✍️",
        gradient: "from-amber-400 to-orange-600",
        duration: "3 months",
        level: "Beginner",
        skills: ["Keyword research", "On-page SEO", "Content strategy", "AI writing", "Analytics"],
        tools: ["Ahrefs", "Semrush", "GSC", "Notion", "GA4"],
        projects: ["Content calendar", "Programmatic SEO site", "Newsletter launch"],
        outcomes: ["Build organic traffic engines", "Ship compounding content", "Land marketing roles"],
        careers: ["SEO Specialist", "Content Lead", "Growth Marketer"],
        courseSlug: "digital-marketing",
      },
      {
        slug: "performance-ads",
        title: "Performance & Paid Ads",
        tagline: "Turn ad spend into predictable revenue.",
        description:
          "Meta, Google and TikTok ads with creative frameworks, funnels and measurement.",
        emoji: "🎯",
        gradient: "from-rose-500 to-pink-600",
        duration: "3 months",
        level: "Intermediate",
        skills: ["Meta ads", "Google ads", "Creative testing", "Attribution", "LTV/CAC"],
        tools: ["Meta Ads", "Google Ads", "TikTok Ads", "GA4", "Northbeam"],
        projects: ["DTC funnel", "Lead-gen campaign", "Creative testing playbook"],
        outcomes: ["Run profitable ad accounts", "Scale creative testing", "Report on real ROI"],
        careers: ["Performance Marketer", "Media Buyer", "Growth Lead"],
      },
      {
        slug: "data-analytics",
        title: "Data & Analytics",
        tagline: "Turn numbers into growth decisions.",
        description:
          "SQL, dashboards and experimentation — the toolkit of the modern growth analyst.",
        emoji: "📊",
        gradient: "from-violet-500 to-indigo-600",
        duration: "3 months",
        level: "Intermediate",
        skills: ["SQL", "Dashboards", "Experimentation", "Product analytics", "Storytelling"],
        tools: ["SQL", "Metabase", "Amplitude", "GA4", "Notion"],
        projects: ["Growth dashboard", "A/B test framework", "Insight report"],
        outcomes: ["Answer growth questions with data", "Design and analyze experiments", "Ship exec-ready reports"],
        careers: ["Growth Analyst", "Product Analyst", "Data Analyst"],
        courseSlug: "data-analysis",
      },
    ],
  },
];

export const getTrack = (slug: string) => tracks.find((t) => t.slug === slug);
export const getTrackPath = (trackSlug: string, pathSlug: string) =>
  getTrack(trackSlug)?.paths.find((p) => p.slug === pathSlug);

// silence unused warnings for imports kept for potential future imagery
void dataImg;