export type Course = {
  slug: string;
  title: string;
  category: "Engineering" | "Design" | "Data & AI" | "Marketing" | "Web3";
  short: string;
  description: string;
  duration: string;
  schedule: string[];
  level: "Beginner" | "Intermediate" | "Advanced";
  outcomes: string[];
  curriculum: { module: string; topics: string[] }[];
  projects: string[];
  requirements: string[];
  career: string[];
  faqs: { q: string; a: string }[];
  instructor: { name: string; role: string; bio: string };
  emoji: string;
  image: string;
  tools: string[];
  testimonials?: { name: string; role: string; quote: string }[];
};

import frontendImg from "@/assets/courses/frontend.jpg";
import backendImg from "@/assets/courses/backend.jpg";
import fullstackImg from "@/assets/courses/frontend.jpg";
import uiuxImg from "@/assets/courses/uiux.jpg";
import graphicsImg from "@/assets/courses/graphics.jpg";
import mobileImg from "@/assets/courses/mobile.jpg";
import aiImg from "@/assets/courses/ai.jpg";
import dataImg from "@/assets/courses/data.jpg";
import web3Img from "@/assets/courses/web3.jpg";
import marketingImg from "@/assets/courses/marketing.jpg";

export const courses: Course[] = [
  {
    slug: "frontend-development",
    title: "Frontend Development",
    category: "Engineering",
    short: "Build beautiful, blazing fast interfaces with React & TypeScript.",
    description:
      "Master the modern frontend stack, HTML, CSS, JavaScript, TypeScript, React, and Next.js, and ship production interfaces used by real users.",
    duration: "4 months",
    schedule: ["Mon to Wed to Fri (Weekday)", "Sat (Weekend)"],
    level: "Beginner",
    outcomes: [
      "Build responsive, accessible interfaces from any design",
      "Ship production React + TypeScript apps",
      "Work confidently with Git, GitHub & code reviews",
      "Deploy on Vercel and integrate REST/GraphQL APIs",
    ],
    curriculum: [
      { module: "Foundations", topics: ["HTML5 semantics", "Modern CSS & Flex/Grid", "Responsive design", "Accessibility"] },
      { module: "JavaScript & TS", topics: ["ES2024", "Async/await", "TypeScript", "Testing with Vitest"] },
      { module: "React Mastery", topics: ["Hooks", "State management", "TanStack Query", "Performance"] },
      { module: "Production", topics: ["Next.js", "Auth", "Deployment", "Monitoring"] },
    ],
    projects: ["Ecommerce storefront", "Real time chat UI", "Dashboard analytics", "Portfolio site"],
    requirements: ["Laptop (8GB RAM+)", "Stable internet", "Basic computer literacy", "Commitment 12hrs/week"],
    career: ["Frontend Engineer", "UI Engineer", "React Developer", "Web Developer"],
    faqs: [
      { q: "Do I need prior coding experience?", a: "No, we start from absolute basics and ramp up quickly." },
      { q: "Will I get a certificate?", a: "Yes, you receive an OxVerse Certificate of Completion plus portfolio reviews." },
    ],
    instructor: { name: "Adaeze Okonkwo", role: "Senior Frontend Engineer", bio: "Ex Spotify, 9+ years shipping React at scale." },
    emoji: "💻",
    image: frontendImg,
    tools: ["HTML5", "CSS3", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind", "Git", "Vercel"],
  },
  {
    slug: "backend-development",
    title: "Backend Development",
    category: "Engineering",
    short: "APIs, databases, auth, and scalable services with Python.",
    description: "Build the engines that power modern apps. Python, Django, FastAPI, PostgreSQL, REST, GraphQL, auth, queues, and deployment.",
    duration: "4 months",
    schedule: ["Tue to Thu (Weekday)", "Sat (Weekend)"],
    level: "Intermediate",
    outcomes: ["Design relational schemas", "Build secure REST/GraphQL APIs", "Implement auth & authorization", "Deploy & monitor services"],
    curriculum: [
      { module: "Python Foundations", topics: ["Python 3", "Virtual envs", "Typing", "Tooling"] },
      { module: "Databases", topics: ["PostgreSQL", "Indexes", "Migrations", "ORMs"] },
      { module: "APIs with FastAPI & Django", topics: ["REST", "GraphQL (Strawberry)", "WebSockets", "Auth"] },
      { module: "Production", topics: ["Docker", "CI/CD", "Observability"] },
    ],
    projects: ["Booking API", "Social feed backend", "Payment gateway", "Realtime collab service"],
    requirements: ["Basic Python", "Laptop 8GB+", "Curiosity for systems"],
    career: ["Backend Engineer", "API Developer", "DevOps Engineer"],
    faqs: [{ q: "Do I need to know frontend?", a: "Helpful but not required." }],
    instructor: { name: "Tunde Adeyemi", role: "Staff Backend Engineer", bio: "Built payments infra at two African fintechs." },
    emoji: "⚙️",
    image: backendImg,
    tools: ["Python", "FastAPI", "Django", "PostgreSQL", "SQLAlchemy", "REST", "GraphQL", "Docker", "Redis", "AWS"],
  },
  {
    slug: "full-stack-development",
    title: "Full Stack Development",
    category: "Engineering",
    short: "End to end product engineering, from pixel to production.",
    description: "The complete journey: design systems, React, TypeScript, Python (FastAPI/Django), databases, deployment. Ship full products.",
    duration: "6 months",
    schedule: ["Mon to Wed to Fri (Weekday)", "Sat (Weekend)"],
    level: "Beginner",
    outcomes: ["Ship full products solo", "Work across the stack", "Deploy to production", "Build a portfolio of 6 apps"],
    curriculum: [
      { module: "Frontend", topics: ["HTML/CSS/JS", "React", "TypeScript"] },
      { module: "Backend", topics: ["Python", "FastAPI", "PostgreSQL", "APIs"] },
      { module: "DevOps", topics: ["Docker", "CI/CD", "Cloud"] },
      { module: "Capstone", topics: ["Real client project"] },
    ],
    projects: ["SaaS starter", "Marketplace", "Realtime app", "Capstone product"],
    requirements: ["Laptop 8GB+", "Time commitment 18hrs/week"],
    career: ["Full Stack Engineer", "Product Engineer", "Founding Engineer"],
    faqs: [{ q: "Is this too much for a beginner?", a: "No, pacing is calibrated for absolute beginners." }],
    instructor: { name: "Nneka Eze", role: "Principal Engineer", bio: "10+ years across YC startups and African unicorns." },
    emoji: "🚀",
    image: fullstackImg,
    tools: ["React", "Next.js", "Python", "FastAPI", "Django", "PostgreSQL", "SQLAlchemy", "TypeScript", "Docker", "Vercel", "AWS"],
  },
  {
    slug: "ui-ux-design",
    title: "UI/UX Design",
    category: "Design",
    short: "Design products people love, research, wireframe, prototype, ship.",
    description: "From user research to high fidelity systems in Figma, design at the level of top product teams.",
    duration: "3 months",
    schedule: ["Mon to Wed (Weekday)", "Sat (Weekend)"],
    level: "Beginner",
    outcomes: ["Run user research", "Build design systems", "Prototype in Figma", "Hand off to engineering"],
    curriculum: [
      { module: "Foundations", topics: ["Design thinking", "Color, type, layout"] },
      { module: "Figma", topics: ["Components", "Auto layout", "Variants"] },
      { module: "UX Research", topics: ["Interviews", "Usability testing"] },
      { module: "Systems", topics: ["Design tokens", "Documentation"] },
    ],
    projects: ["Mobile banking app", "Marketing site", "Design system", "Case study"],
    requirements: ["Laptop", "Figma account (free)"],
    career: ["Product Designer", "UI Designer", "UX Researcher"],
    faqs: [{ q: "Do I need to draw well?", a: "Not at all, UI design is more about systems than illustration." }],
    instructor: { name: "Chiamaka Onyeka", role: "Senior Product Designer", bio: "Ex Paystack, design lead on multiple products." },
    emoji: "🎨",
    image: uiuxImg,
    tools: ["Figma", "FigJam", "Notion", "Maze", "Principle", "Adobe XD"],
  },
  {
    slug: "graphics-design",
    title: "Graphics Design",
    category: "Design",
    short: "Branding, social, print, visual storytelling that sells.",
    description: "Master Adobe Illustrator, Photoshop, and brand systems used by world class agencies.",
    duration: "3 months",
    schedule: ["Mon to Wed (Weekday)", "Sat (Weekend)"],
    level: "Beginner",
    outcomes: ["Build brand identities", "Design for social & print", "Master Adobe suite"],
    curriculum: [
      { module: "Adobe Suite", topics: ["Illustrator", "Photoshop", "InDesign"] },
      { module: "Branding", topics: ["Logos", "Identity systems"] },
      { module: "Production", topics: ["Print", "Social", "Motion basics"] },
    ],
    projects: ["Brand identity", "Social campaign", "Magazine layout"],
    requirements: ["Laptop with Adobe CC"],
    career: ["Graphic Designer", "Brand Designer", "Art Director"],
    faqs: [{ q: "Will I learn motion?", a: "We cover motion basics in After Effects." }],
    instructor: { name: "Ibrahim Yusuf", role: "Creative Director", bio: "Branded for 30+ African startups." },
    emoji: "✏️",
    image: graphicsImg,
    tools: ["Adobe Illustrator", "Photoshop", "InDesign", "After Effects", "Procreate"],
  },
  {
    slug: "mobile-development",
    title: "Mobile Development",
    category: "Engineering",
    short: "Build iOS & Android apps with React Native & Expo.",
    description: "Ship cross platform mobile apps to the App Store and Google Play.",
    duration: "4 months",
    schedule: ["Tue to Thu (Weekday)", "Sat (Weekend)"],
    level: "Intermediate",
    outcomes: ["Build native feel apps", "Publish to stores", "Use device APIs"],
    curriculum: [
      { module: "React Native", topics: ["Components", "Navigation"] },
      { module: "Expo", topics: ["EAS Build", "OTA updates"] },
      { module: "Native APIs", topics: ["Camera", "Notifications", "Maps"] },
      { module: "Publishing", topics: ["App Store", "Play Store"] },
    ],
    projects: ["Fitness tracker", "Food delivery app", "Social feed app"],
    requirements: ["Basic React knowledge", "Mac (recommended for iOS)"],
    career: ["Mobile Engineer", "React Native Developer"],
    faqs: [{ q: "iOS or Android?", a: "Both, React Native ships to both." }],
    instructor: { name: "Femi Bakare", role: "Mobile Lead", bio: "Shipped 12+ apps with 5M+ downloads." },
    emoji: "📱",
    image: mobileImg,
    tools: ["React Native", "Expo", "TypeScript", "Xcode", "Android Studio", "Firebase"],
  },
  {
    slug: "artificial-intelligence",
    title: "Artificial Intelligence (3 in 1)",
    category: "Data & AI",
    short: "3 in 1: AI Automation, AI Vibe Coding, and AI Engineering, master the full applied AI stack.",
    description: "A complete 3 in 1 program covering AI Automation (no code workflows & agents), AI Vibe Coding (build apps & sites with AI tools like Lovable, Cursor, v0), and AI Engineering (LLMs, RAG, agents, evals, ship real AI features).",
    duration: "5 months",
    schedule: ["Mon to Wed (Weekday)", "Sat (Weekend)"],
    level: "Intermediate",
    outcomes: [
      "Automate real business workflows with AI",
      "Vibe code production apps & websites using AI",
      "Build RAG pipelines, agents & AI features",
      "Deploy, evaluate & monitor AI systems",
    ],
    curriculum: [
      { module: "AI Automation", topics: ["n8n", "Make/Zapier", "AI agents", "Workflow design", "Business automation"] },
      { module: "AI Vibe Coding", topics: ["Lovable", "Cursor", "v0", "Bolt", "Prompt driven building", "Shipping real apps"] },
      { module: "AI Engineering, Foundations", topics: ["Python", "LLM APIs", "Prompting", "Function calling"] },
      { module: "AI Engineering, RAG & Agents", topics: ["Embeddings", "Vector DBs", "Multi agent systems", "Evals & production"] },
    ],
    projects: ["End to end automation workflow", "Vibe coded SaaS product", "Customer support agent", "RAG doc Q&A", "Multi agent workflow"],
    requirements: ["Curiosity for AI", "Basic Python helpful", "Laptop 8GB+"],
    career: ["AI Automation Specialist", "AI Product Builder", "AI Engineer", "Applied AI Developer"],
    faqs: [{ q: "Do I need a math degree?", a: "No, applied focus, no PhD math required." }],
    instructor: { name: "Dr. Kunle Akinola", role: "AI Researcher", bio: "PhD ML, ex DeepMind collaborator." },
    emoji: "🧠",
    image: aiImg,
    tools: ["n8n", "Make", "Zapier", "Lovable", "Cursor", "v0", "Python", "OpenAI", "LangChain", "Pinecone", "Hugging Face", "FastAPI"],
  },
  {
    slug: "data-analysis",
    title: "Data Analysis",
    category: "Data & AI",
    short: "Turn raw data into decisions with SQL, Python, and dashboards.",
    description: "Excel → SQL → Python → BI tools. Become the analyst every team wants.",
    duration: "3 months",
    schedule: ["Mon to Wed (Weekday)", "Sat (Weekend)"],
    level: "Beginner",
    outcomes: ["Query SQL fluently", "Build dashboards", "Tell stories with data"],
    curriculum: [
      { module: "Excel", topics: ["Pivot tables", "Power Query"] },
      { module: "SQL", topics: ["Joins", "Window functions"] },
      { module: "Python", topics: ["Pandas", "Plotly"] },
      { module: "BI", topics: ["Power BI", "Looker Studio"] },
    ],
    projects: ["Sales dashboard", "Cohort analysis", "A/B test report"],
    requirements: ["Laptop", "Curiosity for numbers"],
    career: ["Data Analyst", "BI Analyst", "Product Analyst"],
    faqs: [{ q: "Will I touch ML?", a: "Lightly, focus is analysis & insights." }],
    instructor: { name: "Halima Sani", role: "Lead Data Analyst", bio: "8 years across fintech & telecom." },
    emoji: "📊",
    image: dataImg,
    tools: ["Excel", "SQL", "Python", "Pandas", "Power BI", "Looker Studio", "Tableau"],
  },
  {
    slug: "web3-blockchain",
    title: "Web3 & Blockchain",
    category: "Web3",
    short: "Solidity, smart contracts, DeFi, and on chain product engineering.",
    description: "Build on Ethereum & EVM chains, from smart contracts to full dApps.",
    duration: "4 months",
    schedule: ["Tue to Thu (Weekday)", "Sat (Weekend)"],
    level: "Advanced",
    outcomes: ["Write Solidity contracts", "Build full dApps", "Audit basics", "Deploy on mainnet"],
    curriculum: [
      { module: "Blockchain basics", topics: ["EVM", "Wallets"] },
      { module: "Solidity", topics: ["Contracts", "Patterns"] },
      { module: "dApps", topics: ["Wagmi", "Viem", "RainbowKit"] },
      { module: "Security", topics: ["Audits", "Common bugs"] },
    ],
    projects: ["NFT marketplace", "DeFi vault", "DAO governance"],
    requirements: ["JavaScript fluency", "Basic React"],
    career: ["Smart Contract Engineer", "Web3 Developer"],
    faqs: [{ q: "Is this risky?", a: "We use testnets, no real funds required." }],
    instructor: { name: "Chinedu Obi", role: "Smart Contract Engineer", bio: "Audited contracts for 20+ DeFi protocols." },
    emoji: "⛓️",
    image: web3Img,
    tools: ["Solidity", "Hardhat", "Ethers.js", "Wagmi", "Viem", "RainbowKit", "Foundry"],
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    category: "Marketing",
    short: "SEO, ads, content, and analytics, drive real growth.",
    description: "From SEO and paid ads to content strategy and analytics, full funnel modern marketing.",
    duration: "3 months",
    schedule: ["Mon to Wed (Weekday)", "Sat (Weekend)"],
    level: "Beginner",
    outcomes: ["Run paid campaigns", "Rank on Google", "Build content engines", "Measure ROI"],
    curriculum: [
      { module: "SEO", topics: ["On page", "Technical", "Link building"] },
      { module: "Paid ads", topics: ["Meta", "Google", "TikTok"] },
      { module: "Content", topics: ["Strategy", "Distribution"] },
      { module: "Analytics", topics: ["GA4", "Attribution"] },
    ],
    projects: ["Real client campaign", "SEO audit", "Content calendar"],
    requirements: ["Laptop", "Smartphone"],
    career: ["Growth Marketer", "SEO Specialist", "Performance Marketer"],
    faqs: [{ q: "Will I run real ads?", a: "Yes, with a small budget on real campaigns." }],
    instructor: { name: "Zainab Lawal", role: "Head of Growth", bio: "Scaled 4 startups from 0 to $1M ARR." },
    emoji: "📈",
    image: marketingImg,
    tools: ["Google Ads", "Meta Ads", "GA4", "SEMrush", "Ahrefs", "Mailchimp", "HubSpot"],
  },
];

export const getCourse = (slug: string) => courses.find((c) => c.slug === slug);