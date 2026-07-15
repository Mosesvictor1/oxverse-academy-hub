// Curriculum data for all 0xVerse Academy diploma courses.
// Frontend Development is the master template (12 weeks).
// Every other course mirrors the same structure and depth,
// tailored to the discipline. Week content is designed to
// be industry-standard, project-based, and progressive.

import frontendImg from "@/assets/curriculum/frontend.jpg";
import backendImg from "@/assets/curriculum/backend.jpg";
import fullstackImg from "@/assets/curriculum/fullstack.jpg";
import mobileImg from "@/assets/curriculum/mobile.jpg";
import uiuxImg from "@/assets/curriculum/uiux.jpg";
import graphicsImg from "@/assets/curriculum/graphics.jpg";
import aiAutomationImg from "@/assets/curriculum/ai-automation.jpg";
import aiVibeCodingImg from "@/assets/curriculum/ai-vibe-coding.jpg";
import aiEngineeringImg from "@/assets/curriculum/ai-engineering.jpg";
import dataAnalyticsImg from "@/assets/curriculum/data-analytics.jpg";
import digitalMarketingImg from "@/assets/curriculum/digital-marketing.jpg";
import web3Img from "@/assets/curriculum/web3.jpg";

export type WeekSection = {
  id: string;        // "1.1", "1.2", ...
  title: string;
  topics: string[];
};

export type CurriculumWeek = {
  number: number;
  title: string;
  overview?: string;
  objectives: string[];
  sections: WeekSection[];
  exercises: string[];
  assignments: string[];
  projects: string[];
  outcomes: string[];
  assessment?: string;
};

export type CourseCurriculum = {
  slug: string;
  title: string;
  tagline: string;
  duration: string;
  months: number;
  totalWeeks: number;
  level: string;
  projectsCount: string;
  capstone: string;
  goal: string;
  overview: string;
  image: string;
  weeks: CurriculumWeek[];
};

// ---------- FRONTEND DEVELOPMENT (Master Template) ----------
const frontend: CourseCurriculum = {
  slug: "frontend-development",
  title: "Frontend Development",
  tagline: "Professional Diploma",
  duration: "3 Months (12 Weeks)",
  months: 3,
  totalWeeks: 12,
  level: "Beginner → Intermediate → Advanced → Industry Ready",
  projectsCount: "15+",
  capstone: "1 Enterprise-Level Project",
  goal: "Train students to become professional Frontend Engineers capable of working in startups, agencies, and enterprise teams.",
  overview:
    "A cohort-based, project-driven journey through the modern frontend stack. Students go from writing their first HTML tag to shipping a production React + TypeScript application with authentication, state management, testing, and deployment.",
  image: frontendImg,
  weeks: [
    {
      number: 1,
      title: "Professional Developer Environment",
      objectives: [
        "Understand how the modern web works end-to-end",
        "Set up a professional developer workstation",
        "Use AI coding assistants productively",
      ],
      sections: [
        {
          id: "1.1",
          title: "Introduction to Software Development",
          topics: [
            "What is Software Engineering?",
            "Frontend vs Backend vs Fullstack",
            "Web Architecture",
            "Client-Server Communication",
            "Request Lifecycle",
            "Browser Rendering Pipeline",
            "Static vs Dynamic Websites",
            "SPA vs MPA",
            "Jamstack",
            "CSR vs SSR vs SSG",
          ],
        },
        {
          id: "1.2",
          title: "Development Environment",
          topics: [
            "VS Code Mastery",
            "VS Code Shortcuts",
            "Essential Extensions",
            "Chrome DevTools",
            "Node.js",
            "npm",
            "pnpm",
            "yarn",
            "Terminal Commands",
            "Environment Variables",
          ],
        },
        {
          id: "1.3",
          title: "Internet Fundamentals",
          topics: [
            "DNS", "HTTP", "HTTPS", "IP Address", "Browser Cache",
            "Cookies", "Sessions", "Local Storage", "Session Storage",
            "CORS", "CDN",
          ],
        },
        {
          id: "1.4",
          title: "Productivity",
          topics: [
            "AI Coding Assistants",
            "ChatGPT", "GitHub Copilot", "Cursor", "Claude", "Gemini",
            "Prompt Engineering for Developers",
          ],
        },
      ],
      exercises: [
        "Configure VS Code with 10 essential extensions",
        "Trace a full HTTP request in Chrome DevTools Network tab",
        "Write 20 terminal commands to navigate and manage files",
      ],
      assignments: [
        "Document your development workflow in a README",
        "Compare 3 AI coding assistants and write a short review",
      ],
      projects: ["Personal Dev Environment Setup Guide (Markdown)"],
      outcomes: [
        "Fully configured professional dev environment",
        "Confident with terminal, Git basics, and browser tooling",
      ],
      assessment: "Live setup walkthrough + short quiz on web fundamentals",
    },
    {
      number: 2,
      title: "HTML5 (Professional)",
      objectives: [
        "Write semantic, accessible, SEO-friendly HTML",
        "Build production-quality forms and multimedia experiences",
      ],
      sections: [
        { id: "2.1", title: "HTML Foundations", topics: ["HTML Syntax", "Elements", "Attributes", "Comments", "DOCTYPE"] },
        { id: "2.2", title: "Semantic HTML", topics: ["header", "footer", "nav", "main", "section", "article", "aside", "figure", "picture", "details", "summary"] },
        { id: "2.3", title: "Forms", topics: ["Advanced Forms", "Validation", "Pattern", "Accessibility", "Input Types", "Form APIs"] },
        { id: "2.4", title: "Multimedia", topics: ["Video", "Audio", "SVG", "Canvas"] },
        { id: "2.5", title: "SEO HTML", topics: ["Meta Tags", "Open Graph", "Twitter Cards", "Structured Data", "Schema"] },
        { id: "2.6", title: "Accessibility", topics: ["ARIA", "Screen Readers", "Semantic Accessibility", "Keyboard Navigation"] },
        { id: "2.7", title: "Performance", topics: ["Lazy Loading", "Responsive Images", "srcset", "picture element"] },
      ],
      exercises: [
        "Rewrite a div-heavy page using semantic elements",
        "Build 5 form types with native validation",
        "Add Open Graph + Schema.org metadata to a page",
      ],
      assignments: ["Run a Lighthouse accessibility audit and fix all issues"],
      projects: ["Build a complete business website using semantic HTML only"],
      outcomes: ["Master of semantic, accessible, SEO-ready HTML5"],
      assessment: "Peer accessibility review + Lighthouse score ≥ 95",
    },
    {
      number: 3,
      title: "CSS3 (Complete Professional)",
      objectives: ["Build responsive, animated, production-grade interfaces with modern CSS"],
      sections: [
        { id: "3.1", title: "CSS Fundamentals", topics: ["Selectors", "Specificity", "Cascade", "Inheritance"] },
        { id: "3.2", title: "Layout", topics: ["Display", "Position", "Float", "Flexbox", "Grid"] },
        { id: "3.3", title: "Typography", topics: ["Font Loading", "Variable Fonts", "Responsive Typography"] },
        { id: "3.4", title: "Responsive Design", topics: ["Mobile First", "Breakpoints", "Media Queries", "Container Queries"] },
        { id: "3.5", title: "Advanced CSS", topics: ["Variables", "calc()", "clamp()", "min()", "max()"] },
        { id: "3.6", title: "Animation", topics: ["Transition", "Keyframes", "Timing Functions", "Transform", "3D Effects"] },
        { id: "3.7", title: "Modern CSS", topics: ["Nesting", "Logical Properties", "Aspect Ratio", "Object Fit", "Backdrop Filter", "Mask"] },
        { id: "3.8", title: "CSS Architecture", topics: ["BEM", "Utility CSS", "Component CSS"] },
        { id: "3.9", title: "CSS Optimization", topics: ["Critical CSS", "Performance", "Render Blocking"] },
      ],
      exercises: ["Recreate 5 hero sections from top SaaS sites", "Build a responsive grid gallery with animation"],
      assignments: ["Publish a CSS pattern library with 15 reusable components"],
      projects: ["Clone Apple Homepage"],
      outcomes: ["Ability to translate any Figma design to pixel-perfect responsive CSS"],
      assessment: "Design-to-code challenge under time constraints",
    },
    {
      number: 4,
      title: "Git & GitHub",
      objectives: ["Collaborate professionally with Git, branches, and pull requests"],
      sections: [
        { id: "4.1", title: "Git Core", topics: ["Git Installation", "Repository", "Branches", "Merge", "Rebase", "Cherry Pick", "Stash"] },
        { id: "4.2", title: "GitHub Workflow", topics: ["Pull Requests", "Git Flow", "GitHub Workflow", "Collaboration", "Open Source Contribution", "Conflict Resolution"] },
      ],
      exercises: ["Simulate a merge conflict and resolve it", "Open a PR to an open-source project"],
      assignments: ["Contribute one accepted PR to a public repository"],
      projects: ["Collaborative Team Project (3 devs, 1 repo)"],
      outcomes: ["Comfortable with branching strategies and code reviews"],
      assessment: "PR review checklist scored by an instructor",
    },
    {
      number: 5,
      title: "Tailwind CSS",
      objectives: ["Build fast, consistent UIs with a utility-first CSS framework"],
      sections: [
        { id: "5.1", title: "Core Concepts", topics: ["Installation", "Configuration", "Theme Customization", "Responsive Utilities"] },
        { id: "5.2", title: "Layout", topics: ["Flex", "Grid", "Container"] },
        { id: "5.3", title: "Styling", topics: ["Typography", "Colors", "Spacing", "Shadows", "Borders"] },
        { id: "5.4", title: "Components", topics: ["Buttons", "Cards", "Tables", "Forms", "Navigation"] },
        { id: "5.5", title: "Customization", topics: ["Tailwind Config", "Custom Utilities", "Plugins"] },
        { id: "5.6", title: "Optimization", topics: ["Purging", "Tree Shaking", "Performance"] },
      ],
      exercises: ["Convert a plain-CSS project to Tailwind", "Design a reusable button system with variants"],
      assignments: ["Build a design system with 20 components in Tailwind"],
      projects: ["Modern SaaS Landing Page"],
      outcomes: ["Ship polished UIs 3× faster using Tailwind"],
    },
    {
      number: 6,
      title: "JavaScript (Complete)",
      overview: "The largest module in the course. Deep, from-first-principles JavaScript.",
      objectives: ["Master modern JavaScript from language internals to browser APIs"],
      sections: [
        { id: "6.1", title: "Fundamentals", topics: ["Variables", "Scope", "Hoisting", "Closures", "Functions", "Objects", "Arrays", "Loops", "Conditions"] },
        { id: "6.2", title: "ES6+", topics: ["Modules", "Arrow Functions", "Destructuring", "Spread", "Rest", "Template Literals"] },
        { id: "6.3", title: "Advanced JavaScript", topics: ["Execution Context", "Call Stack", "Event Loop", "Memory Management", "Garbage Collection", "Prototype", "Prototypal Inheritance", "this Keyword", "bind", "call", "apply"] },
        { id: "6.4", title: "Asynchronous JavaScript", topics: ["Callback", "Promise", "Async Await", "Fetch", "Axios", "AbortController"] },
        { id: "6.5", title: "DOM", topics: ["Traversing", "Manipulation", "Event Delegation", "Mutation Observer"] },
        { id: "6.6", title: "Browser APIs", topics: ["Local Storage", "Session Storage", "Geolocation", "Clipboard", "Notifications", "Intersection Observer", "Resize Observer"] },
        { id: "6.7", title: "Error Handling", topics: ["try catch", "throw", "debugging", "stack trace"] },
        { id: "6.8", title: "Design Patterns", topics: ["Module Pattern", "Factory Pattern", "Singleton", "Observer"] },
      ],
      exercises: ["30 daily JS katas", "Rebuild Array.prototype.map/filter/reduce from scratch"],
      assignments: ["Explain the event loop with your own diagram + example"],
      projects: ["Calculator", "Weather App", "Movie App", "Quiz App", "Expense Tracker"],
      outcomes: ["Deep, professional-level command of modern JavaScript"],
      assessment: "Live coding interview covering closures, async, and the DOM",
    },
    {
      number: 7,
      title: "TypeScript",
      objectives: ["Write safer, more maintainable JavaScript with types"],
      sections: [
        { id: "7.1", title: "Type System", topics: ["Type System", "Interfaces", "Types", "Generics", "Utility Types", "Type Narrowing"] },
        { id: "7.2", title: "Enums, Modules & Declarations", topics: ["Enums", "Modules", "Declaration Files", "Type Inference", "Strict Mode"] },
        { id: "7.3", title: "Advanced Types", topics: ["Advanced Types", "Type Guards"] },
      ],
      exercises: ["Type 20 real-world function signatures", "Fix a broken generic API client"],
      assignments: ["Publish a fully-typed utility npm package"],
      projects: ["Convert a JavaScript project into TypeScript"],
      outcomes: ["Confident authoring strict, well-typed TypeScript codebases"],
    },
    {
      number: 8,
      title: "React.js (Professional)",
      objectives: ["Ship production React applications with routing, state, auth, and testing"],
      sections: [
        { id: "8.1", title: "React Core", topics: ["JSX", "Components", "Props", "State", "Lifecycle", "Hooks", "Event Handling"] },
        { id: "8.2", title: "Advanced React", topics: ["Custom Hooks", "Compound Components", "Context API", "Performance Optimization", "Memoization", "Code Splitting", "Lazy Loading"] },
        { id: "8.3", title: "Routing", topics: ["React Router", "Nested Routes", "Protected Routes", "Dynamic Routes"] },
        { id: "8.4", title: "Forms", topics: ["React Hook Form", "Validation", "Controlled Components"] },
        { id: "8.5", title: "State Management", topics: ["Context API", "Redux Toolkit", "Zustand (Introduction)", "Server State vs Client State"] },
        { id: "8.6", title: "API Integration", topics: ["Axios", "REST API", "Authentication", "Pagination", "Infinite Scroll", "Optimistic Updates"] },
        { id: "8.7", title: "Authentication", topics: ["JWT", "Refresh Tokens", "Protected Pages", "Role-Based Access Control (Frontend)"] },
        { id: "8.8", title: "Advanced Topics", topics: ["Error Boundaries", "Suspense", "Portals", "Higher-Order Components", "Render Props", "Composition Patterns"] },
        { id: "8.9", title: "Testing", topics: ["Unit Testing", "React Testing Library", "Component Testing"] },
        { id: "8.10", title: "Deployment", topics: ["Vercel", "Netlify", "Environment Variables", "Build Optimization"] },
      ],
      exercises: ["Rewrite 3 vanilla JS apps as React apps", "Build 5 custom hooks"],
      assignments: ["Implement JWT auth flow with refresh tokens"],
      projects: ["Enterprise Admin Dashboard"],
      outcomes: ["Ready to work on production React codebases in any team"],
      assessment: "React coding challenge + component design review",
    },
    {
      number: 9,
      title: "Professional Engineering Practices",
      objectives: ["Work like a senior engineer: clean code, architecture, audits"],
      sections: [
        { id: "9.1", title: "Code Quality", topics: ["Clean Code", "SOLID Principles (Frontend Perspective)", "Folder Structures"] },
        { id: "9.2", title: "Architecture", topics: ["Component Architecture", "Reusable UI Systems", "Atomic Design"] },
        { id: "9.3", title: "Audits", topics: ["Accessibility Audits", "Lighthouse Audits", "Performance Optimization", "Security Best Practices", "SEO for React Applications"] },
      ],
      exercises: ["Refactor a messy component into an atomic design system", "Run and fix a full Lighthouse audit"],
      assignments: ["Write an architecture doc for your capstone"],
      projects: ["Design system + audit report for a real product"],
      outcomes: ["Think and communicate like a senior frontend engineer"],
    },
    {
      number: 10,
      title: "Career Accelerator",
      objectives: ["Land your first (or next) frontend role"],
      sections: [
        { id: "10.1", title: "Portfolio", topics: ["GitHub Portfolio", "Technical Resume", "LinkedIn Optimization"] },
        { id: "10.2", title: "Work Channels", topics: ["Freelancing (Upwork, Fiverr, Contra)"] },
        { id: "10.3", title: "Interviews", topics: ["Technical Interviews", "Whiteboard & Live Coding Preparation"] },
        { id: "10.4", title: "Brand", topics: ["Personal Branding", "Building a Developer Portfolio", "AI-Assisted Development Workflows"] },
      ],
      exercises: ["Mock interview with feedback", "Rewrite your LinkedIn headline & about"],
      assignments: ["Publish a portfolio site + 5 case studies"],
      projects: ["Personal Portfolio Website"],
      outcomes: ["Interview-ready resume, LinkedIn, and portfolio"],
    },
    {
      number: 11,
      title: "E-commerce App with API",
      objectives: ["Ship a real, deployed e-commerce experience"],
      sections: [
        { id: "11.1", title: "Product & Cart", topics: ["Product listing", "Product detail", "Filters", "Cart state", "Persistent cart"] },
        { id: "11.2", title: "Checkout", topics: ["Address form", "Payment integration (test mode)", "Order confirmation"] },
        { id: "11.3", title: "Auth & Account", topics: ["Sign up / sign in", "Order history", "Protected account routes"] },
      ],
      exercises: ["Wire cart to global state with optimistic updates"],
      assignments: ["Integrate a real payment provider in test mode"],
      projects: ["Deployed E-commerce App with API"],
      outcomes: ["Portfolio-grade e-commerce project"],
    },
    {
      number: 12,
      title: "Enterprise-Level Capstone Project",
      objectives: ["Deliver a production-ready, deployed capstone"],
      sections: [
        { id: "12.1", title: "Planning", topics: ["Product spec", "System diagram", "Component tree"] },
        { id: "12.2", title: "Build", topics: ["React + TypeScript + Tailwind", "Real APIs", "Auth", "State management", "Responsive design"] },
        { id: "12.3", title: "Ship", topics: ["CI/CD", "Deployment", "Analytics", "Error tracking", "Documentation"] },
      ],
      exercises: ["Weekly demo + peer code review"],
      assignments: ["Write full technical documentation and README"],
      projects: ["Enterprise Capstone (deployed) with polished GitHub repo"],
      outcomes: ["A portfolio-defining, production-ready project"],
      assessment: "Panel demo day with hiring partners",
    },
  ],
};

// ---------- Helper for building sibling courses ----------
type WeekInput = Omit<CurriculumWeek, "objectives" | "exercises" | "assignments" | "projects" | "outcomes"> & {
  objectives?: string[];
  exercises?: string[];
  assignments?: string[];
  projects?: string[];
  outcomes?: string[];
};

const w = (n: number, title: string, sections: WeekSection[], extras: Partial<CurriculumWeek> = {}): CurriculumWeek => ({
  number: n,
  title,
  overview: extras.overview,
  objectives: extras.objectives ?? [
    `Master the core concepts of ${title}`,
    `Apply best practices from real production teams`,
    `Ship a working artefact by the end of the week`,
  ],
  sections,
  exercises: extras.exercises ?? [
    `Guided lab covering every subsection of ${title}`,
    `Pair-programming challenge with a partner`,
  ],
  assignments: extras.assignments ?? [
    `Independent take-home tied to ${title}`,
    `Written reflection on tradeoffs encountered`,
  ],
  projects: extras.projects ?? [`Mini project applying ${title} end-to-end`],
  outcomes: extras.outcomes ?? [
    `Confident, hands-on command of ${title}`,
    `Portfolio-ready artefact demonstrating the skill`,
  ],
  assessment: extras.assessment ?? `Instructor-graded practical + short viva on ${title}`,
});

// ---------- BACKEND DEVELOPMENT (12 weeks) ----------
const backend: CourseCurriculum = {
  slug: "backend-development",
  title: "Backend Development",
  tagline: "Professional Diploma",
  duration: "3 Months (12 Weeks)",
  months: 3,
  totalWeeks: 12,
  level: "Beginner → Intermediate → Advanced → Industry Ready",
  projectsCount: "15+",
  capstone: "1 Production-Grade API Platform",
  goal: "Train students to design, build, and operate professional backend systems that power modern web and mobile applications.",
  overview:
    "Server-side engineering from the ground up: Node.js, databases, APIs, authentication, testing, DevOps, and system design. Students finish able to own a service in production.",
  image: backendImg,
  weeks: [
    w(1, "Backend Foundations & Developer Environment", [
      { id: "1.1", title: "What is Backend Engineering?", topics: ["Client-Server Model", "Frontend vs Backend vs Fullstack", "Monolith vs Microservices", "Serverless", "Backend Responsibilities", "Backend Roles in a Team"] },
      { id: "1.2", title: "Environment Setup", topics: ["Node.js & nvm", "npm/pnpm/yarn", "VS Code for backend", "Terminal & shell mastery", "Git & GitHub setup", "Environment variables (.env)"] },
      { id: "1.3", title: "Networking Fundamentals", topics: ["OSI model", "TCP/IP", "HTTP/HTTPS lifecycle", "DNS", "Ports & sockets", "CDNs", "CORS"] },
      { id: "1.4", title: "AI Assistants for Backend", topics: ["ChatGPT", "Cursor", "GitHub Copilot", "Prompt engineering for API design"] },
    ]),
    w(2, "JavaScript & TypeScript for Backend", [
      { id: "2.1", title: "Modern JavaScript", topics: ["ES2024 features", "Closures", "Async/await", "Modules (ESM/CJS)", "Error handling"] },
      { id: "2.2", title: "TypeScript", topics: ["Types & Interfaces", "Generics", "Utility Types", "Strict mode", "Type-safe APIs"] },
      { id: "2.3", title: "Node.js Runtime", topics: ["Event loop", "Streams", "Buffers", "File system", "Process & child_process", "Worker threads"] },
      { id: "2.4", title: "Package Management", topics: ["npm scripts", "Semver", "Lockfiles", "Publishing packages"] },
    ]),
    w(3, "HTTP, REST & API Design", [
      { id: "3.1", title: "HTTP Deep Dive", topics: ["Methods", "Status codes", "Headers", "Content negotiation", "Idempotency"] },
      { id: "3.2", title: "REST Principles", topics: ["Resources", "URIs", "HATEOAS", "Versioning", "Pagination", "Filtering", "Sorting"] },
      { id: "3.3", title: "API Contracts", topics: ["OpenAPI/Swagger", "Postman", "Insomnia", "Mock servers"] },
      { id: "3.4", title: "Error Handling", topics: ["Error shape", "Problem+JSON", "Retry semantics"] },
    ]),
    w(4, "Express.js & Nest.js Fundamentals", [
      { id: "4.1", title: "Express Core", topics: ["Routing", "Middleware", "Request/Response", "Error middleware", "Body parsing"] },
      { id: "4.2", title: "Project Structure", topics: ["Layered architecture", "Controllers/Services/Repositories", "DTOs", "Config management"] },
      { id: "4.3", title: "NestJS Intro", topics: ["Modules", "Providers", "Dependency Injection", "Pipes", "Guards", "Interceptors"] },
      { id: "4.4", title: "Validation", topics: ["Zod", "class-validator", "Request schemas"] },
    ]),
    w(5, "Databases: SQL (PostgreSQL)", [
      { id: "5.1", title: "Relational Modeling", topics: ["Tables", "Keys", "Normalization", "Relationships", "ER diagrams"] },
      { id: "5.2", title: "SQL Mastery", topics: ["SELECT/JOIN", "Aggregations", "Window functions", "CTEs", "Transactions", "Indexes"] },
      { id: "5.3", title: "PostgreSQL Features", topics: ["JSONB", "Full text search", "Row-level security", "Extensions"] },
      { id: "5.4", title: "ORMs & Query Builders", topics: ["Prisma", "Drizzle", "Kysely", "Migrations", "Seeding"] },
    ]),
    w(6, "Databases: NoSQL, Caching & Search", [
      { id: "6.1", title: "MongoDB", topics: ["Documents", "Collections", "Aggregation pipeline", "Mongoose ODM"] },
      { id: "6.2", title: "Redis", topics: ["Key-value basics", "Caching patterns", "Pub/Sub", "Rate limiting", "Session store"] },
      { id: "6.3", title: "Search", topics: ["Elasticsearch/Meilisearch", "Indexing", "Relevance", "Facets"] },
      { id: "6.4", title: "Choosing a Datastore", topics: ["Access patterns", "Consistency", "CAP", "Cost tradeoffs"] },
    ]),
    w(7, "Authentication & Authorization", [
      { id: "7.1", title: "Auth Fundamentals", topics: ["Sessions vs tokens", "Cookies", "CSRF", "XSS"] },
      { id: "7.2", title: "JWT & OAuth", topics: ["JWT structure", "Access & refresh tokens", "OAuth 2.0", "OIDC", "Social login"] },
      { id: "7.3", title: "Authorization", topics: ["RBAC", "ABAC", "Policies", "Row-level security"] },
      { id: "7.4", title: "Password & Secrets", topics: ["bcrypt/argon2", "MFA", "Password reset flows", "Secret management"] },
    ]),
    w(8, "Testing, Logging & Observability", [
      { id: "8.1", title: "Testing", topics: ["Vitest/Jest", "Unit vs integration vs e2e", "Supertest", "Test doubles", "Coverage"] },
      { id: "8.2", title: "Logging", topics: ["Structured logging (pino)", "Correlation IDs", "Log levels", "Log aggregation"] },
      { id: "8.3", title: "Metrics & Tracing", topics: ["Prometheus", "OpenTelemetry", "Grafana", "APM"] },
      { id: "8.4", title: "Error Tracking", topics: ["Sentry", "Alerting", "Postmortems"] },
    ]),
    w(9, "Realtime, Queues & Background Jobs", [
      { id: "9.1", title: "Realtime", topics: ["WebSockets", "Socket.IO", "Server-Sent Events"] },
      { id: "9.2", title: "Queues", topics: ["BullMQ", "RabbitMQ", "Kafka intro", "At-least-once vs exactly-once"] },
      { id: "9.3", title: "Scheduling", topics: ["Cron jobs", "Delayed jobs", "Retries & DLQs"] },
      { id: "9.4", title: "File Uploads", topics: ["Multipart", "S3/R2", "Signed URLs", "Streaming uploads"] },
    ]),
    w(10, "DevOps, Docker & Deployment", [
      { id: "10.1", title: "Docker", topics: ["Images", "Containers", "Dockerfile", "Multi-stage builds", "docker-compose"] },
      { id: "10.2", title: "CI/CD", topics: ["GitHub Actions", "Automated tests", "Build pipelines", "Environments"] },
      { id: "10.3", title: "Cloud Deploy", topics: ["Railway", "Render", "Fly.io", "AWS ECS/Lambda intro"] },
      { id: "10.4", title: "Operations", topics: ["Zero-downtime deploys", "Rollbacks", "Feature flags"] },
    ]),
    w(11, "System Design & Security", [
      { id: "11.1", title: "System Design", topics: ["Scalability", "Load balancing", "Caching strategies", "Sharding", "Read replicas", "CQRS", "Event-driven"] },
      { id: "11.2", title: "Security", topics: ["OWASP Top 10", "Input validation", "SQL injection", "SSRF", "Rate limiting", "Secure headers"] },
      { id: "11.3", title: "API Gateways & Microservices", topics: ["Gateways", "Service discovery", "gRPC intro"] },
    ]),
    w(12, "Capstone: Production API Platform", [
      { id: "12.1", title: "Design", topics: ["Domain modeling", "OpenAPI spec", "Infra diagram"] },
      { id: "12.2", title: "Build", topics: ["Auth", "CRUD + business logic", "Background jobs", "File uploads", "Payments"] },
      { id: "12.3", title: "Ship", topics: ["Docker", "CI/CD", "Monitoring", "Load test", "Docs"] },
    ], {
      projects: ["Production-ready API Platform (deployed)"],
      assessment: "Panel review of code, docs, and live load test",
    }),
  ],
};

// ---------- FULL STACK DEVELOPMENT (20 weeks / 5 months) ----------
const fullstack: CourseCurriculum = {
  slug: "fullstack-development",
  title: "Full Stack Development",
  tagline: "Professional Diploma",
  duration: "5 Months (20 Weeks)",
  months: 5,
  totalWeeks: 20,
  level: "Beginner → Intermediate → Advanced → Industry Ready",
  projectsCount: "20+",
  capstone: "1 SaaS-Grade Full Stack Product",
  goal: "Produce well-rounded full stack engineers who can own a product end-to-end: UI, API, database, auth, payments, and deployment.",
  overview:
    "Combines the depth of the Frontend and Backend diplomas with a heavy emphasis on shipping real products, integrating third-party services, and operating them in production.",
  image: fullstackImg,
  weeks: [
    w(1, "Foundations: The Web, Tools & Mindset", [
      { id: "1.1", title: "How the Web Works", topics: ["Client-server", "HTTP", "DNS", "Browsers", "Deployment overview"] },
      { id: "1.2", title: "Dev Environment", topics: ["VS Code", "Node.js", "Terminal", "Git", "GitHub"] },
      { id: "1.3", title: "AI Assistants", topics: ["ChatGPT", "Cursor", "Copilot", "Prompt engineering"] },
    ]),
    w(2, "HTML5 & Semantic Markup", [
      { id: "2.1", title: "HTML Foundations", topics: ["Elements", "Attributes", "DOCTYPE"] },
      { id: "2.2", title: "Semantic HTML & Forms", topics: ["header/main/section", "Forms", "Validation", "Accessibility"] },
      { id: "2.3", title: "SEO & Performance", topics: ["Meta tags", "Open Graph", "Responsive images"] },
    ]),
    w(3, "CSS3 & Tailwind", [
      { id: "3.1", title: "CSS Core", topics: ["Selectors", "Cascade", "Flexbox", "Grid"] },
      { id: "3.2", title: "Responsive Design", topics: ["Mobile first", "Media queries", "Container queries"] },
      { id: "3.3", title: "Tailwind CSS", topics: ["Utilities", "Theme customization", "Components"] },
    ]),
    w(4, "JavaScript Deep Dive", [
      { id: "4.1", title: "Language Core", topics: ["Variables", "Scope", "Closures", "Prototypes", "this"] },
      { id: "4.2", title: "Async JS", topics: ["Promises", "Async/await", "Fetch", "Event loop"] },
      { id: "4.3", title: "DOM & Browser APIs", topics: ["Manipulation", "Events", "Storage", "Intersection Observer"] },
    ]),
    w(5, "TypeScript", [
      { id: "5.1", title: "Type System", topics: ["Types", "Interfaces", "Generics", "Utility Types"] },
      { id: "5.2", title: "TS in Practice", topics: ["Strict mode", "Type-safe APIs", "tsconfig"] },
    ]),
    w(6, "React Fundamentals", [
      { id: "6.1", title: "React Core", topics: ["JSX", "Components", "Props", "State", "Hooks"] },
      { id: "6.2", title: "Routing & Forms", topics: ["React Router", "React Hook Form", "Validation"] },
    ]),
    w(7, "Advanced React & State Management", [
      { id: "7.1", title: "Advanced Patterns", topics: ["Custom hooks", "Context", "Memoization", "Suspense"] },
      { id: "7.2", title: "State", topics: ["Zustand", "Redux Toolkit", "TanStack Query"] },
    ]),
    w(8, "Next.js (App Router)", [
      { id: "8.1", title: "App Router", topics: ["File-based routing", "Layouts", "Loading & error UI"] },
      { id: "8.2", title: "Rendering", topics: ["Server components", "Client components", "SSR/SSG/ISR"] },
      { id: "8.3", title: "Server Actions & Data", topics: ["Server actions", "Route handlers", "Streaming"] },
    ]),
    w(9, "Node.js & Express", [
      { id: "9.1", title: "Node Runtime", topics: ["Event loop", "Streams", "File system"] },
      { id: "9.2", title: "Express", topics: ["Routing", "Middleware", "Validation", "Error handling"] },
    ]),
    w(10, "REST API Design & OpenAPI", [
      { id: "10.1", title: "REST Principles", topics: ["Resources", "Versioning", "Pagination", "Filtering"] },
      { id: "10.2", title: "OpenAPI", topics: ["Swagger", "Contract-first", "Codegen"] },
    ]),
    w(11, "PostgreSQL & Prisma", [
      { id: "11.1", title: "SQL & Modeling", topics: ["Schema design", "Joins", "Indexes", "Transactions"] },
      { id: "11.2", title: "Prisma", topics: ["Schema", "Migrations", "Queries", "Relations"] },
    ]),
    w(12, "Auth: JWT, OAuth & Sessions", [
      { id: "12.1", title: "Auth Concepts", topics: ["Sessions vs JWT", "Cookies", "CSRF/XSS"] },
      { id: "12.2", title: "Implementation", topics: ["NextAuth/Auth.js", "OAuth", "MFA", "Password reset"] },
    ]),
    w(13, "Payments: Stripe & Paystack", [
      { id: "13.1", title: "Stripe", topics: ["Products", "Checkout", "Subscriptions", "Webhooks"] },
      { id: "13.2", title: "Paystack", topics: ["Payments", "Plans", "Webhooks", "Multi-currency"] },
    ]),
    w(14, "File Uploads, Email & Notifications", [
      { id: "14.1", title: "Uploads", topics: ["S3/R2", "Signed URLs", "Image optimization"] },
      { id: "14.2", title: "Email & Push", topics: ["Resend/Postmark", "Templates", "Web push"] },
    ]),
    w(15, "Realtime & Background Jobs", [
      { id: "15.1", title: "Realtime", topics: ["WebSockets", "Pusher/Ably", "Presence"] },
      { id: "15.2", title: "Queues", topics: ["BullMQ", "Cron", "Retries"] },
    ]),
    w(16, "Testing (Frontend + Backend)", [
      { id: "16.1", title: "Frontend Testing", topics: ["Vitest", "React Testing Library", "Playwright"] },
      { id: "16.2", title: "Backend Testing", topics: ["Supertest", "Fixtures", "Contract tests"] },
    ]),
    w(17, "DevOps & Deployment", [
      { id: "17.1", title: "Docker", topics: ["Images", "Compose", "Multi-stage"] },
      { id: "17.2", title: "CI/CD", topics: ["GitHub Actions", "Preview deploys"] },
      { id: "17.3", title: "Hosting", topics: ["Vercel", "Railway", "Fly.io", "AWS intro"] },
    ]),
    w(18, "Security, Observability & Performance", [
      { id: "18.1", title: "Security", topics: ["OWASP Top 10", "Rate limiting", "Secrets"] },
      { id: "18.2", title: "Observability", topics: ["Sentry", "Logs", "Metrics"] },
      { id: "18.3", title: "Performance", topics: ["Caching", "Lighthouse", "DB tuning"] },
    ]),
    w(19, "System Design & Interview Prep", [
      { id: "19.1", title: "System Design", topics: ["Scalability", "Caching", "Queues", "Sharding"] },
      { id: "19.2", title: "Interviews", topics: ["DSA basics", "Behavioral", "Take-home patterns"] },
    ]),
    w(20, "SaaS Capstone", [
      { id: "20.1", title: "Product Design", topics: ["Spec", "Wireframes", "Data model"] },
      { id: "20.2", title: "Build", topics: ["Full auth", "Payments", "Realtime", "Uploads", "Admin"] },
      { id: "20.3", title: "Launch", topics: ["Landing page", "Docs", "Analytics", "Deployment"] },
    ], { projects: ["Production SaaS Product (deployed with paying-user simulation)"] }),
  ],
};

// ---------- MOBILE APP DEVELOPMENT (12 weeks) ----------
const mobile: CourseCurriculum = {
  slug: "mobile-app-development",
  title: "Mobile App Development",
  tagline: "Professional Diploma (React Native)",
  duration: "3 Months (12 Weeks)",
  months: 3,
  totalWeeks: 12,
  level: "Beginner → Intermediate → Advanced → Industry Ready",
  projectsCount: "12+",
  capstone: "1 Cross-Platform Production App (iOS + Android)",
  goal: "Train students to design, build, and publish cross-platform mobile apps with React Native and Expo.",
  overview:
    "From JavaScript basics to shipping a real app on the App Store and Play Store. Includes offline sync, push notifications, payments, and animations.",
  image: mobileImg,
  weeks: [
    w(1, "Mobile Foundations & Environment", [
      { id: "1.1", title: "Mobile Landscape", topics: ["Native vs Cross-platform", "iOS vs Android", "React Native vs Flutter", "Expo vs bare workflow"] },
      { id: "1.2", title: "Setup", topics: ["Node.js", "Expo CLI", "Xcode", "Android Studio", "Simulators & emulators"] },
      { id: "1.3", title: "AI Assistants for Mobile", topics: ["Cursor", "Copilot", "Prompting for RN"] },
    ]),
    w(2, "JavaScript & TypeScript Refresher", [
      { id: "2.1", title: "Modern JS", topics: ["ES2024", "Async/await", "Modules", "Destructuring"] },
      { id: "2.2", title: "TypeScript", topics: ["Types", "Interfaces", "Generics"] },
    ]),
    w(3, "React Native Core", [
      { id: "3.1", title: "RN Components", topics: ["View", "Text", "Image", "ScrollView", "FlatList", "SectionList"] },
      { id: "3.2", title: "Styling", topics: ["StyleSheet", "Flexbox", "Responsive units", "Dark mode"] },
      { id: "3.3", title: "Interaction", topics: ["Touchables", "Gestures", "Keyboard"] },
    ]),
    w(4, "Navigation & App Architecture", [
      { id: "4.1", title: "React Navigation", topics: ["Stack", "Tab", "Drawer", "Deep linking"] },
      { id: "4.2", title: "Expo Router", topics: ["File-based routing", "Layouts", "Groups"] },
      { id: "4.3", title: "App Architecture", topics: ["Folder structure", "Feature-based", "Shared UI"] },
    ]),
    w(5, "State Management & Data Fetching", [
      { id: "5.1", title: "State", topics: ["useState/useReducer", "Zustand", "Context"] },
      { id: "5.2", title: "Data", topics: ["Fetch/Axios", "TanStack Query", "Optimistic updates", "Pagination"] },
    ]),
    w(6, "Forms, Validation & Local Storage", [
      { id: "6.1", title: "Forms", topics: ["React Hook Form", "Zod", "Keyboard-aware inputs"] },
      { id: "6.2", title: "Storage", topics: ["AsyncStorage", "MMKV", "SQLite", "Secure store"] },
    ]),
    w(7, "Native Modules & Device APIs", [
      { id: "7.1", title: "Device APIs", topics: ["Camera", "Location", "Contacts", "Sensors", "Haptics"] },
      { id: "7.2", title: "Media", topics: ["Image picker", "Video", "Audio recording"] },
      { id: "7.3", title: "Permissions", topics: ["iOS & Android permissions", "Runtime prompts"] },
    ]),
    w(8, "Auth, APIs & Backend Integration", [
      { id: "8.1", title: "Auth", topics: ["Email/password", "OAuth", "Biometrics", "Token storage"] },
      { id: "8.2", title: "Backend", topics: ["REST", "GraphQL basics", "WebSockets", "Firebase/Supabase"] },
    ]),
    w(9, "Animations, Gestures & UI Polish", [
      { id: "9.1", title: "Reanimated", topics: ["Shared values", "Worklets", "Layout animations"] },
      { id: "9.2", title: "Gesture Handler", topics: ["Pan", "Pinch", "Swipe-to-delete"] },
      { id: "9.3", title: "UI Polish", topics: ["Skeletons", "Empty/error states", "Micro-interactions"] },
    ]),
    w(10, "Push Notifications, Offline & Performance", [
      { id: "10.1", title: "Notifications", topics: ["Expo Notifications", "APNs", "FCM", "Deep-linked pushes"] },
      { id: "10.2", title: "Offline", topics: ["Cache-first", "Sync", "Conflict resolution"] },
      { id: "10.3", title: "Performance", topics: ["List virtualization", "Memoization", "Image caching"] },
    ]),
    w(11, "Payments & Monetization", [
      { id: "11.1", title: "In-App Payments", topics: ["Stripe mobile", "Paystack", "Apple/Google in-app purchases", "Subscriptions"] },
      { id: "11.2", title: "Analytics", topics: ["PostHog", "Amplitude", "Crashlytics"] },
    ]),
    w(12, "Publishing & Capstone", [
      { id: "12.1", title: "Store Publishing", topics: ["App Store Connect", "Play Console", "EAS Build & Submit", "Review guidelines"] },
      { id: "12.2", title: "Capstone", topics: ["Full-feature app", "Auth", "Payments", "Notifications", "Published to at least one store"] },
    ], { projects: ["Cross-platform Production App (iOS + Android)"] }),
  ],
};

// ---------- UI/UX DESIGN (8 weeks / 2 months) ----------
const uiux: CourseCurriculum = {
  slug: "uiux-design",
  title: "UI/UX Design",
  tagline: "Professional Diploma",
  duration: "2 Months (8 Weeks)",
  months: 2,
  totalWeeks: 8,
  level: "Beginner → Intermediate → Advanced → Industry Ready",
  projectsCount: "10+",
  capstone: "1 End-to-End Product Design Case Study",
  goal: "Train students to design usable, beautiful, and business-viable digital products.",
  overview:
    "UX research, information architecture, interaction design, visual design, prototyping, design systems, and handoff — practised on real product briefs.",
  image: uiuxImg,
  weeks: [
    w(1, "Design Foundations & Research", [
      { id: "1.1", title: "What is UI/UX?", topics: ["UX vs UI vs Product Design", "Design roles", "Design maturity"] },
      { id: "1.2", title: "Design Thinking", topics: ["Empathize", "Define", "Ideate", "Prototype", "Test"] },
      { id: "1.3", title: "User Research", topics: ["Interviews", "Surveys", "Personas", "JTBD", "Empathy maps"] },
      { id: "1.4", title: "Competitive Analysis", topics: ["Feature audits", "SWOT", "Benchmarking"] },
    ]),
    w(2, "Information Architecture & UX Flows", [
      { id: "2.1", title: "IA", topics: ["Sitemaps", "Card sorting", "Tree testing", "Navigation patterns"] },
      { id: "2.2", title: "User Flows", topics: ["Flowcharts", "Task flows", "Happy vs edge paths"] },
      { id: "2.3", title: "Wireframing", topics: ["Low-fi sketches", "Mid-fi Figma frames", "Annotations"] },
    ]),
    w(3, "Visual Design Principles", [
      { id: "3.1", title: "Principles", topics: ["Contrast", "Alignment", "Hierarchy", "Balance", "Repetition"] },
      { id: "3.2", title: "Color", topics: ["Color theory", "Accessibility", "Palettes", "Contrast ratios"] },
      { id: "3.3", title: "Typography", topics: ["Type systems", "Pairing", "Scale", "Readability"] },
      { id: "3.4", title: "Layout & Grids", topics: ["12-col grids", "Baseline grids", "Spacing scales"] },
    ]),
    w(4, "Figma Mastery", [
      { id: "4.1", title: "Figma Core", topics: ["Frames", "Auto Layout", "Constraints", "Components", "Variants"] },
      { id: "4.2", title: "Advanced Figma", topics: ["Variables", "Modes", "Interactive components", "Plugins"] },
      { id: "4.3", title: "Prototyping", topics: ["Flows", "Smart animate", "Overlays", "Micro-interactions"] },
    ]),
    w(5, "Interaction Design & Motion", [
      { id: "5.1", title: "Interaction Patterns", topics: ["Feedback", "Affordances", "Empty/error/loading states"] },
      { id: "5.2", title: "Micro-interactions", topics: ["Timing", "Easing", "Purposeful motion"] },
      { id: "5.3", title: "Motion Tools", topics: ["Figma prototyping", "Lottie", "Rive intro"] },
    ]),
    w(6, "Design Systems", [
      { id: "6.1", title: "Foundations", topics: ["Tokens", "Themes", "Semantic colors"] },
      { id: "6.2", title: "Components", topics: ["Atomic design", "Documentation", "Governance"] },
      { id: "6.3", title: "Handoff", topics: ["Dev mode", "Specs", "Working with engineers"] },
    ]),
    w(7, "Usability Testing & Accessibility", [
      { id: "7.1", title: "Usability", topics: ["Test scripts", "Moderated vs unmoderated", "Maze/Useberry"] },
      { id: "7.2", title: "Accessibility", topics: ["WCAG", "Contrast", "Focus", "Screen reader flows"] },
      { id: "7.3", title: "Analytics-Informed Design", topics: ["Funnels", "Heatmaps", "A/B testing basics"] },
    ]),
    w(8, "Portfolio & Case Study Capstone", [
      { id: "8.1", title: "Case Study Craft", topics: ["Storytelling", "Structure", "Visual polish"] },
      { id: "8.2", title: "Portfolio", topics: ["Behance", "Dribbble", "Personal site", "LinkedIn"] },
      { id: "8.3", title: "Capstone", topics: ["End-to-end product redesign", "Research → design → prototype → test"] },
    ], { projects: ["End-to-End Product Design Case Study"] }),
  ],
};

// ---------- GRAPHICS DESIGN (8 weeks) ----------
const graphics: CourseCurriculum = {
  slug: "graphics-design",
  title: "Graphics Design",
  tagline: "Professional Diploma",
  duration: "2 Months (8 Weeks)",
  months: 2,
  totalWeeks: 8,
  level: "Beginner → Intermediate → Advanced → Industry Ready",
  projectsCount: "12+",
  capstone: "1 Full Brand Identity System",
  goal: "Train students to become professional graphics designers for brands, agencies, and freelance clients.",
  overview:
    "Design principles, typography, color, Adobe Illustrator, Photoshop, and brand identity design. Students finish with a portfolio of real client-caliber work.",
  image: graphicsImg,
  weeks: [
    w(1, "Design Foundations", [
      { id: "1.1", title: "Design Principles", topics: ["Contrast", "Alignment", "Hierarchy", "Repetition", "Proximity", "Balance"] },
      { id: "1.2", title: "Visual Language", topics: ["Shape", "Line", "Space", "Texture", "Composition"] },
      { id: "1.3", title: "History & Movements", topics: ["Bauhaus", "Swiss style", "Modern minimalism"] },
    ]),
    w(2, "Typography", [
      { id: "2.1", title: "Anatomy", topics: ["Serif vs sans", "Weights", "Kerning", "Leading"] },
      { id: "2.2", title: "Pairing & Systems", topics: ["Type pairing", "Scale", "Hierarchy"] },
      { id: "2.3", title: "Type in the Wild", topics: ["Editorial", "Poster", "Branding"] },
    ]),
    w(3, "Color Theory & Practice", [
      { id: "3.1", title: "Theory", topics: ["Color wheel", "Harmonies", "Temperature", "Psychology"] },
      { id: "3.2", title: "Systems", topics: ["Brand palettes", "Accessibility", "Modes (RGB/CMYK)"] },
    ]),
    w(4, "Adobe Illustrator", [
      { id: "4.1", title: "Vector Basics", topics: ["Pen tool", "Shapes", "Pathfinder", "Layers"] },
      { id: "4.2", title: "Logo Design", topics: ["Marks", "Lockups", "Grid construction"] },
      { id: "4.3", title: "Illustration", topics: ["Flat illustration", "Icon systems"] },
    ]),
    w(5, "Adobe Photoshop", [
      { id: "5.1", title: "Raster Basics", topics: ["Layers", "Masks", "Selections", "Smart objects"] },
      { id: "5.2", title: "Retouching & Compositing", topics: ["Photo editing", "Composites", "Effects"] },
      { id: "5.3", title: "Social Media Design", topics: ["Templates", "Reels covers", "Story sets"] },
    ]),
    w(6, "Branding & Identity Systems", [
      { id: "6.1", title: "Brand Strategy", topics: ["Positioning", "Voice", "Moodboards"] },
      { id: "6.2", title: "Identity", topics: ["Logo systems", "Color", "Type", "Iconography"] },
      { id: "6.3", title: "Brand Guidelines", topics: ["Brand books", "Do/don'ts", "Applications"] },
    ]),
    w(7, "Print & Digital Deliverables", [
      { id: "7.1", title: "Print", topics: ["Business cards", "Flyers", "Posters", "Packaging basics", "Bleed & prepress"] },
      { id: "7.2", title: "Digital", topics: ["Social kits", "Ad banners", "Email headers", "Presentation decks"] },
      { id: "7.3", title: "Motion Basics", topics: ["Canva/CapCut", "After Effects intro"] },
    ]),
    w(8, "Portfolio, Freelance & Capstone", [
      { id: "8.1", title: "Portfolio", topics: ["Behance", "Dribbble", "Case studies"] },
      { id: "8.2", title: "Freelance", topics: ["Client discovery", "Pricing", "Contracts", "Fiverr/Upwork/Contra"] },
      { id: "8.3", title: "Capstone", topics: ["Full brand identity system for a real or fictional client"] },
    ], { projects: ["Full Brand Identity System"] }),
  ],
};

// ---------- AI AUTOMATION (8 weeks) ----------
const aiAutomation: CourseCurriculum = {
  slug: "ai-automation",
  title: "AI Automation",
  tagline: "Professional Diploma",
  duration: "2 Months (8 Weeks)",
  months: 2,
  totalWeeks: 8,
  level: "Beginner → Intermediate → Advanced → Industry Ready",
  projectsCount: "10+",
  capstone: "1 End-to-End AI Automation Suite for a Real Business",
  goal: "Train students to design and ship AI-powered automations that save businesses hours every week.",
  overview:
    "Learn to combine no-code/low-code automation platforms with LLMs and APIs to automate marketing, sales, ops, and support workflows.",
  image: aiAutomationImg,
  weeks: [
    w(1, "The AI Automation Landscape", [
      { id: "1.1", title: "What is AI Automation?", topics: ["No-code vs code", "Where AI fits", "ROI framing"] },
      { id: "1.2", title: "Tooling Overview", topics: ["Make (Integromat)", "n8n", "Zapier", "Airtable", "Notion", "Google Workspace"] },
      { id: "1.3", title: "LLM Providers", topics: ["OpenAI", "Anthropic", "Gemini", "Model selection"] },
    ]),
    w(2, "APIs, JSON & Webhooks", [
      { id: "2.1", title: "API Basics", topics: ["REST", "Headers", "Auth", "Rate limits"] },
      { id: "2.2", title: "JSON Mastery", topics: ["Structures", "Parsing", "Transformations"] },
      { id: "2.3", title: "Webhooks", topics: ["Triggering flows", "Idempotency", "Debugging"] },
    ]),
    w(3, "Prompt Engineering for Automations", [
      { id: "3.1", title: "Prompt Design", topics: ["Roles", "Few-shot", "Chain of thought", "Structured output"] },
      { id: "3.2", title: "Guardrails", topics: ["JSON mode", "Function calling", "Validation"] },
      { id: "3.3", title: "Evaluation", topics: ["Test sets", "Metrics", "Iteration"] },
    ]),
    w(4, "Make.com & n8n Deep Dive", [
      { id: "4.1", title: "Building Scenarios", topics: ["Triggers", "Modules", "Routers", "Iterators", "Aggregators"] },
      { id: "4.2", title: "Error Handling", topics: ["Retries", "Fallbacks", "Notifications"] },
      { id: "4.3", title: "n8n Self-Hosted", topics: ["Deployment", "Nodes", "Custom code steps"] },
    ]),
    w(5, "AI Agents & RAG-Lite Workflows", [
      { id: "5.1", title: "AI Agent Basics", topics: ["Planning", "Tools", "Memory", "OpenAI/Anthropic agents"] },
      { id: "5.2", title: "RAG-Lite", topics: ["Docs → chunks", "Embeddings", "Vector stores (Pinecone, Supabase pgvector)"] },
      { id: "5.3", title: "Chatbots", topics: ["Voiceflow", "Botpress", "Custom GPTs"] },
    ]),
    w(6, "Business Automations", [
      { id: "6.1", title: "Marketing", topics: ["Lead capture → CRM", "Email sequences", "Social content pipelines"] },
      { id: "6.2", title: "Sales", topics: ["Enrichment", "Outbound", "Meeting scheduling"] },
      { id: "6.3", title: "Ops & Support", topics: ["Ticket triage", "Knowledge base agents", "Reporting"] },
    ]),
    w(7, "Delivery, Pricing & Client Work", [
      { id: "7.1", title: "Discovery", topics: ["Process mapping", "Automation audits", "ROI estimation"] },
      { id: "7.2", title: "Delivery", topics: ["Documentation", "Handover", "Maintenance retainers"] },
      { id: "7.3", title: "Pricing", topics: ["Value-based pricing", "Retainers", "Freelance vs agency"] },
    ]),
    w(8, "Capstone: Business Automation Suite", [
      { id: "8.1", title: "Client Brief", topics: ["Real or simulated business", "Audit", "Solution design"] },
      { id: "8.2", title: "Build", topics: ["Multi-workflow automation", "AI agent", "Reporting dashboard"] },
      { id: "8.3", title: "Present", topics: ["Demo", "Docs", "ROI report"] },
    ], { projects: ["AI Automation Suite for a Real Business"] }),
  ],
};

// ---------- AI VIBE CODING (8 weeks) ----------
const aiVibe: CourseCurriculum = {
  slug: "ai-vibe-coding",
  title: "AI Vibe Coding",
  tagline: "Professional Diploma",
  duration: "2 Months (8 Weeks)",
  months: 2,
  totalWeeks: 8,
  level: "Beginner → Intermediate → Advanced → Industry Ready",
  projectsCount: "8+",
  capstone: "1 Fully Vibe-Coded Production Product",
  goal: "Teach students to ship real, polished software 10x faster using AI-native tools like Cursor, Lovable, v0, and Claude.",
  overview:
    "A modern discipline: how to think in specs, drive AI coding assistants, review AI-generated code, and ship maintainable, production-grade software without losing craft.",
  image: aiVibeCodingImg,
  weeks: [
    w(1, "The AI Coding Mindset", [
      { id: "1.1", title: "What is Vibe Coding?", topics: ["Definition", "Where it works", "Where it fails", "Craft vs speed"] },
      { id: "1.2", title: "AI Tooling Landscape", topics: ["Cursor", "Lovable", "v0", "Bolt", "Windsurf", "Claude Code"] },
      { id: "1.3", title: "Foundations You Still Need", topics: ["HTML/CSS/JS basics", "Reading code", "Debugging"] },
    ]),
    w(2, "Prompt Engineering for Builders", [
      { id: "2.1", title: "Prompting for Code", topics: ["Specs", "Constraints", "Examples", "Iterative refinement"] },
      { id: "2.2", title: "Prompting for Design", topics: ["Design tokens", "Visual references", "Component prompts"] },
      { id: "2.3", title: "Working with Long Contexts", topics: ["Repo maps", "Selective attention", "Summaries"] },
    ]),
    w(3, "Cursor & Claude Code Mastery", [
      { id: "3.1", title: "Cursor Core", topics: ["Chat", "Composer", "Agent mode", "Rules & context"] },
      { id: "3.2", title: "Claude Code", topics: ["Terminal agent", "Tasks", "Reviews"] },
      { id: "3.3", title: "Workflows", topics: ["Plan-then-code", "Diff review", "Multi-file edits"] },
    ]),
    w(4, "Building UIs with Lovable, v0 & Bolt", [
      { id: "4.1", title: "Lovable Deep Dive", topics: ["Project scaffolding", "Iterating on designs", "Backend & Cloud"] },
      { id: "4.2", title: "v0", topics: ["shadcn generation", "Design-to-code prompts"] },
      { id: "4.3", title: "Bolt & Others", topics: ["Full-stack scaffolds", "Deployments"] },
    ]),
    w(5, "Full-Stack Vibe Coding", [
      { id: "5.1", title: "Auth", topics: ["Managed auth in Lovable/Supabase", "Roles"] },
      { id: "5.2", title: "Database", topics: ["Schemas", "Migrations", "RLS"] },
      { id: "5.3", title: "Integrations", topics: ["Payments", "Email", "AI Gateway"] },
    ]),
    w(6, "Reviewing & Hardening AI Code", [
      { id: "6.1", title: "Code Review", topics: ["Reading diffs", "Common AI pitfalls", "Refactoring"] },
      { id: "6.2", title: "Testing", topics: ["AI-generated tests", "Playwright for E2E", "Regression prevention"] },
      { id: "6.3", title: "Security", topics: ["Secrets", "RLS", "OWASP basics"] },
    ]),
    w(7, "Shipping, Growth & Client Work", [
      { id: "7.1", title: "Deployment & Domains", topics: ["Publishing", "Custom domains", "Analytics"] },
      { id: "7.2", title: "Landing Pages", topics: ["Copywriting with AI", "Launch checklist"] },
      { id: "7.3", title: "Freelancing with Vibe Coding", topics: ["Pricing MVPs", "Scoping", "Delivery"] },
    ]),
    w(8, "Capstone: Vibe-Coded Product", [
      { id: "8.1", title: "Spec", topics: ["Problem", "User", "MVP scope"] },
      { id: "8.2", title: "Build", topics: ["Design → UI → backend → integrations"] },
      { id: "8.3", title: "Launch", topics: ["Live product", "Landing page", "First users"] },
    ], { projects: ["Fully Vibe-Coded Production Product"] }),
  ],
};

// ---------- AI ENGINEERING (8 weeks) ----------
const aiEngineering: CourseCurriculum = {
  slug: "ai-engineering",
  title: "Modern AI Engineering",
  tagline: "Professional Diploma",
  duration: "2 Months (8 Weeks)",
  months: 2,
  totalWeeks: 8,
  level: "Intermediate → Advanced → Industry Ready",
  projectsCount: "8+",
  capstone: "1 Production AI-Powered Application",
  goal: "Train programmers to build real products powered by existing AI models — not to train models from scratch.",
  overview:
    "Modern AI Engineering is about building applications on top of foundation models: LLMs, vision, speech, and multimodal. You will design prompts, wire up RAG, ship agents, and deploy AI features to real users. Programming knowledge required.",
  image: aiEngineeringImg,
  weeks: [
    w(1, "What Modern AI Engineering Really Is", [
      { id: "1.1", title: "Landscape", topics: ["Foundation models", "APIs vs training", "AI Engineer vs ML Engineer vs Data Scientist"] },
      { id: "1.2", title: "Model Providers", topics: ["OpenAI", "Anthropic", "Google", "Open-source (Llama, Mistral, Qwen)"] },
      { id: "1.3", title: "Not This Course", topics: ["Not training ChatGPT", "Not no-code automation", "Difference from basic AI use"] },
    ]),
    w(2, "Prompt Engineering & Structured Output", [
      { id: "2.1", title: "Prompt Patterns", topics: ["System prompts", "Few-shot", "Chain of thought", "Self-consistency"] },
      { id: "2.2", title: "Structured Output", topics: ["JSON mode", "Function/tool calling", "Zod schemas"] },
      { id: "2.3", title: "Evaluation", topics: ["Eval sets", "LLM-as-judge", "Regression testing"] },
    ]),
    w(3, "Building AI Features into Apps", [
      { id: "3.1", title: "Backend Integration", topics: ["Node/TS SDKs", "Streaming responses", "Rate limiting", "Cost control"] },
      { id: "3.2", title: "Frontend Integration", topics: ["Streaming UIs", "Loading states", "Cancellation"] },
      { id: "3.3", title: "AI Gateways", topics: ["Lovable AI Gateway", "OpenRouter", "Model routing"] },
    ]),
    w(4, "RAG (Retrieval-Augmented Generation)", [
      { id: "4.1", title: "Embeddings", topics: ["Vector spaces", "Chunking strategies", "Metadata"] },
      { id: "4.2", title: "Vector Stores", topics: ["Pinecone", "Supabase pgvector", "Qdrant"] },
      { id: "4.3", title: "Retrieval", topics: ["Hybrid search", "Reranking", "Answer synthesis"] },
    ]),
    w(5, "AI Agents & Tool Use", [
      { id: "5.1", title: "Agent Architectures", topics: ["ReAct", "Planner-Executor", "Multi-agent"] },
      { id: "5.2", title: "Tool Calling", topics: ["Function schemas", "Safe execution", "Human-in-the-loop"] },
      { id: "5.3", title: "Frameworks", topics: ["LangGraph", "OpenAI Agents SDK", "Custom orchestration"] },
    ]),
    w(6, "Multimodal AI", [
      { id: "6.1", title: "Vision", topics: ["Image understanding", "OCR", "Screenshot-to-code"] },
      { id: "6.2", title: "Speech", topics: ["Whisper", "TTS", "Realtime voice agents"] },
      { id: "6.3", title: "Image Generation", topics: ["Gemini image", "GPT-image", "Prompting for images"] },
    ]),
    w(7, "Production, Observability & Safety", [
      { id: "7.1", title: "Observability", topics: ["Tracing", "Langfuse/Helicone", "Cost dashboards"] },
      { id: "7.2", title: "Safety", topics: ["Prompt injection", "Data leakage", "PII", "Moderation"] },
      { id: "7.3", title: "Deployment", topics: ["Edge functions", "Background jobs", "Caching"] },
    ]),
    w(8, "Capstone: Production AI Product", [
      { id: "8.1", title: "Spec & Design", topics: ["Problem", "Data", "Evaluation plan"] },
      { id: "8.2", title: "Build", topics: ["RAG + tools + streaming UI + auth"] },
      { id: "8.3", title: "Ship", topics: ["Deploy", "Monitor", "Iterate with users"] },
    ], { projects: ["Production AI-Powered Application (deployed)"] }),
  ],
};

// ---------- DATA ANALYTICS (16 weeks / 4 months) ----------
const dataAnalytics: CourseCurriculum = {
  slug: "data-analytics",
  title: "Data Analytics",
  tagline: "Professional Diploma",
  duration: "4 Months (16 Weeks)",
  months: 4,
  totalWeeks: 16,
  level: "Beginner → Intermediate → Advanced → Industry Ready",
  projectsCount: "15+",
  capstone: "1 End-to-End Analytics Product with Dashboard",
  goal: "Train students to become professional data analysts who turn raw data into business decisions.",
  overview:
    "Excel, SQL, Python, statistics, dashboards, storytelling, and light machine learning. Students build a portfolio of real-world data projects.",
  image: dataAnalyticsImg,
  weeks: [
    w(1, "Data Analytics Foundations", [
      { id: "1.1", title: "The Data Landscape", topics: ["Analyst vs Scientist vs Engineer", "Data lifecycle", "Common industries"] },
      { id: "1.2", title: "Data Thinking", topics: ["Descriptive/Diagnostic/Predictive/Prescriptive", "Metrics vs dimensions"] },
      { id: "1.3", title: "Tooling Overview", topics: ["Excel", "SQL", "Python", "BI tools"] },
    ]),
    w(2, "Excel & Google Sheets Mastery", [
      { id: "2.1", title: "Core Formulas", topics: ["Lookup", "Conditionals", "Text/Date functions"] },
      { id: "2.2", title: "Pivot Tables", topics: ["Grouping", "Calculated fields", "Slicers"] },
      { id: "2.3", title: "Charts & Dashboards", topics: ["Chart choice", "Dashboards", "Sparklines"] },
    ]),
    w(3, "SQL Fundamentals", [
      { id: "3.1", title: "Query Basics", topics: ["SELECT", "WHERE", "ORDER BY", "LIMIT"] },
      { id: "3.2", title: "Joins & Aggregations", topics: ["INNER/LEFT/RIGHT", "GROUP BY", "HAVING"] },
      { id: "3.3", title: "Data Modeling", topics: ["Star schema", "Facts vs dimensions"] },
    ]),
    w(4, "Advanced SQL", [
      { id: "4.1", title: "Advanced Queries", topics: ["Window functions", "CTEs", "Subqueries"] },
      { id: "4.2", title: "Performance", topics: ["Indexes", "Query plans", "Optimization"] },
      { id: "4.3", title: "Real Datasets", topics: ["E-commerce", "Fintech", "SaaS"] },
    ]),
    w(5, "Python for Data (Pandas)", [
      { id: "5.1", title: "Python Basics", topics: ["Data types", "Control flow", "Functions"] },
      { id: "5.2", title: "Pandas", topics: ["Series", "DataFrames", "Filtering", "GroupBy"] },
      { id: "5.3", title: "IO", topics: ["CSV/Excel/JSON", "APIs", "Databases"] },
    ]),
    w(6, "Data Cleaning & Wrangling", [
      { id: "6.1", title: "Cleaning", topics: ["Missing values", "Duplicates", "Outliers", "Types"] },
      { id: "6.2", title: "Transformations", topics: ["Merges", "Pivots", "Reshaping"] },
      { id: "6.3", title: "Reproducibility", topics: ["Notebooks", "Scripts", "Versioning"] },
    ]),
    w(7, "Exploratory Data Analysis (EDA)", [
      { id: "7.1", title: "EDA Workflow", topics: ["Question framing", "Univariate", "Bivariate", "Multivariate"] },
      { id: "7.2", title: "Visualization", topics: ["matplotlib", "seaborn", "plotly"] },
      { id: "7.3", title: "Insights", topics: ["Storytelling", "Business framing"] },
    ]),
    w(8, "Statistics for Analysts", [
      { id: "8.1", title: "Descriptive Stats", topics: ["Mean/Median/Mode", "Variance", "Distributions"] },
      { id: "8.2", title: "Inferential Stats", topics: ["Sampling", "Confidence intervals", "Hypothesis tests"] },
      { id: "8.3", title: "A/B Testing", topics: ["Design", "Significance", "Common pitfalls"] },
    ]),
    w(9, "Business Intelligence: Power BI", [
      { id: "9.1", title: "Power BI Core", topics: ["Data model", "DAX basics", "Visuals"] },
      { id: "9.2", title: "Dashboards", topics: ["KPI cards", "Drill-through", "Bookmarks"] },
      { id: "9.3", title: "Sharing", topics: ["Workspaces", "Row-level security", "Publishing"] },
    ]),
    w(10, "Business Intelligence: Tableau & Looker Studio", [
      { id: "10.1", title: "Tableau", topics: ["Connections", "Marks", "Calculated fields"] },
      { id: "10.2", title: "Looker Studio", topics: ["Blends", "Community connectors", "Free dashboards"] },
    ]),
    w(11, "Data Storytelling & Reporting", [
      { id: "11.1", title: "Storytelling", topics: ["Narrative arcs", "Stakeholder framing"] },
      { id: "11.2", title: "Dashboard Design", topics: ["Hierarchy", "Color", "Whitespace"] },
      { id: "11.3", title: "Executive Reporting", topics: ["Weekly/monthly cadences", "Alerts"] },
    ]),
    w(12, "Data Warehousing & Pipelines", [
      { id: "12.1", title: "Warehouses", topics: ["BigQuery", "Snowflake", "Postgres analytics"] },
      { id: "12.2", title: "ELT/ETL", topics: ["dbt intro", "Airbyte", "Fivetran"] },
    ]),
    w(13, "Product Analytics", [
      { id: "13.1", title: "Product Metrics", topics: ["North Star", "Acquisition/Retention/Revenue"] },
      { id: "13.2", title: "Tools", topics: ["PostHog", "Amplitude", "Mixpanel"] },
      { id: "13.3", title: "Funnels & Cohorts", topics: ["Analysis", "Insights", "Actioning"] },
    ]),
    w(14, "Intro to Machine Learning for Analysts", [
      { id: "14.1", title: "ML Concepts", topics: ["Supervised vs unsupervised", "Train/test", "Metrics"] },
      { id: "14.2", title: "Common Models", topics: ["Linear/logistic regression", "Decision trees", "Clustering"] },
      { id: "14.3", title: "Deployment Basics", topics: ["Model as service", "Batch scoring"] },
    ]),
    w(15, "Portfolio, Freelancing & Interviews", [
      { id: "15.1", title: "Portfolio", topics: ["GitHub", "Notion case studies", "Kaggle"] },
      { id: "15.2", title: "Interviews", topics: ["SQL take-homes", "Case studies", "Behavioral"] },
      { id: "15.3", title: "Freelance", topics: ["Upwork", "Contra", "Data consulting"] },
    ]),
    w(16, "Capstone: End-to-End Analytics Product", [
      { id: "16.1", title: "Question", topics: ["Business framing", "Metrics"] },
      { id: "16.2", title: "Pipeline", topics: ["Ingest → clean → model → serve"] },
      { id: "16.3", title: "Dashboard & Story", topics: ["Interactive dashboard", "Executive-ready report"] },
    ], { projects: ["Deployed Analytics Product with Dashboard + Report"] }),
  ],
};

// ---------- DIGITAL MARKETING (8 weeks) ----------
const marketing: CourseCurriculum = {
  slug: "digital-marketing",
  title: "Digital Marketing",
  tagline: "Professional Diploma",
  duration: "2 Months (8 Weeks)",
  months: 2,
  totalWeeks: 8,
  level: "Beginner → Intermediate → Advanced → Industry Ready",
  projectsCount: "10+",
  capstone: "1 Full Multi-Channel Marketing Campaign",
  goal: "Train students to plan, launch, and measure full-funnel marketing campaigns that grow real businesses.",
  overview:
    "SEO, paid ads, content, email, social, and analytics — practised on real briefs. Students finish with a campaign portfolio and a certification path.",
  image: digitalMarketingImg,
  weeks: [
    w(1, "Marketing Foundations", [
      { id: "1.1", title: "Marketing 101", topics: ["Positioning", "ICP", "Value proposition", "Buyer journey"] },
      { id: "1.2", title: "Funnels", topics: ["TOFU/MOFU/BOFU", "Acquisition/Activation/Retention"] },
      { id: "1.3", title: "Channels Overview", topics: ["Owned vs earned vs paid", "Channel-market fit"] },
    ]),
    w(2, "SEO Foundations", [
      { id: "2.1", title: "How Search Works", topics: ["Crawling", "Indexing", "Ranking"] },
      { id: "2.2", title: "Keyword Research", topics: ["Intent", "Long-tail", "Tools (Ahrefs, Semrush, Google Search Console)"] },
      { id: "2.3", title: "On-Page SEO", topics: ["Titles", "Meta", "Headings", "Internal linking"] },
      { id: "2.4", title: "Technical SEO", topics: ["Site speed", "Core Web Vitals", "Schema"] },
    ]),
    w(3, "Content & Copywriting", [
      { id: "3.1", title: "Content Strategy", topics: ["Pillars & clusters", "Editorial calendar"] },
      { id: "3.2", title: "Copywriting", topics: ["Hooks", "AIDA", "PAS", "Headlines"] },
      { id: "3.3", title: "AI in Content", topics: ["Prompting", "Editing", "Human polish"] },
    ]),
    w(4, "Social Media Marketing", [
      { id: "4.1", title: "Platform Playbooks", topics: ["Instagram", "TikTok", "X/Twitter", "LinkedIn", "YouTube"] },
      { id: "4.2", title: "Content Systems", topics: ["Batching", "Repurposing", "Tools (Metricool, Buffer)"] },
      { id: "4.3", title: "Community", topics: ["Engagement", "DM funnels", "Creator collabs"] },
    ]),
    w(5, "Paid Ads: Meta & Google", [
      { id: "5.1", title: "Meta Ads", topics: ["Business Manager", "Pixel", "Campaign structure", "Audiences", "Creatives"] },
      { id: "5.2", title: "Google Ads", topics: ["Search", "Performance Max", "Display", "YouTube"] },
      { id: "5.3", title: "Budgeting & Bidding", topics: ["ROAS", "CPA", "Optimization loops"] },
    ]),
    w(6, "Email & Lifecycle Marketing", [
      { id: "6.1", title: "Email Basics", topics: ["Deliverability", "List building", "Segmentation"] },
      { id: "6.2", title: "Automations", topics: ["Welcome", "Nurture", "Cart abandon", "Winback"] },
      { id: "6.3", title: "Tools", topics: ["Mailchimp", "Klaviyo", "Resend"] },
    ]),
    w(7, "Analytics, Attribution & CRO", [
      { id: "7.1", title: "Analytics", topics: ["GA4", "Server-side tagging", "Events"] },
      { id: "7.2", title: "Attribution", topics: ["Last-click", "MTA", "Post-iOS14 reality"] },
      { id: "7.3", title: "CRO", topics: ["Landing pages", "A/B tests", "Heatmaps"] },
    ]),
    w(8, "Capstone: Full-Funnel Campaign", [
      { id: "8.1", title: "Brief", topics: ["Real or simulated brand", "Goals", "Budget"] },
      { id: "8.2", title: "Build", topics: ["SEO plan", "Content", "Ads", "Email", "Landing pages"] },
      { id: "8.3", title: "Report", topics: ["Results", "Learnings", "Next steps"] },
    ], { projects: ["Full Multi-Channel Marketing Campaign + Report"] }),
  ],
};

// ---------- WEB3 & BLOCKCHAIN DEVELOPMENT (16 weeks / 4 months) ----------
const web3: CourseCurriculum = {
  slug: "web3-blockchain-development",
  title: "Web3 & Blockchain Development",
  tagline: "Professional Diploma",
  duration: "4 Months (16 Weeks)",
  months: 4,
  totalWeeks: 16,
  level: "Beginner → Intermediate → Advanced → Industry Ready",
  projectsCount: "15+",
  capstone: "1 Full-Stack Web3 dApp with Deployed Smart Contracts",
  goal: "Train students to become professional Web3 engineers who ship secure smart contracts and beautiful dApps.",
  overview:
    "Blockchain fundamentals, Solidity, EVM tooling, Solana intro, dApp frontends, security, DeFi and NFTs. Students finish with an audited, deployed capstone.",
  image: web3Img,
  weeks: [
    w(1, "Blockchain Foundations", [
      { id: "1.1", title: "Blockchain 101", topics: ["Distributed ledgers", "Consensus", "PoW vs PoS"] },
      { id: "1.2", title: "Bitcoin & Ethereum", topics: ["UTXO vs account model", "Gas", "EVM overview"] },
      { id: "1.3", title: "Wallets & Keys", topics: ["Public/private keys", "Seed phrases", "MetaMask"] },
    ]),
    w(2, "Ethereum Deep Dive", [
      { id: "2.1", title: "EVM", topics: ["Opcodes", "Storage", "Memory", "Gas model"] },
      { id: "2.2", title: "Accounts & Transactions", topics: ["EOA vs contract accounts", "Nonces", "Signatures"] },
      { id: "2.3", title: "Ecosystem", topics: ["Layer 2s", "Sidechains", "Rollups (Optimism, Arbitrum, Base)"] },
    ]),
    w(3, "Solidity Fundamentals", [
      { id: "3.1", title: "Language Basics", topics: ["Types", "Functions", "Modifiers", "Events"] },
      { id: "3.2", title: "Contracts", topics: ["State", "Inheritance", "Interfaces", "Libraries"] },
      { id: "3.3", title: "Remix", topics: ["Deploy", "Interact", "Debug"] },
    ]),
    w(4, "Advanced Solidity", [
      { id: "4.1", title: "Patterns", topics: ["Access control", "Ownable/AccessControl", "Upgradability (proxies)"] },
      { id: "4.2", title: "Storage & Gas", topics: ["Storage packing", "Gas optimization"] },
      { id: "4.3", title: "OpenZeppelin", topics: ["ERC20", "ERC721", "ERC1155", "Utilities"] },
    ]),
    w(5, "Dev Tooling: Hardhat & Foundry", [
      { id: "5.1", title: "Hardhat", topics: ["Projects", "Scripts", "Networks", "Plugins"] },
      { id: "5.2", title: "Foundry", topics: ["Forge", "Cast", "Anvil", "Cheatcodes"] },
      { id: "5.3", title: "Testing", topics: ["Unit", "Fuzz", "Invariant", "Coverage"] },
    ]),
    w(6, "Frontend for dApps", [
      { id: "6.1", title: "React Refresh", topics: ["Hooks", "Routing", "Tailwind"] },
      { id: "6.2", title: "Wallet Connection", topics: ["wagmi", "viem", "RainbowKit", "ConnectKit"] },
      { id: "6.3", title: "Contract Interaction", topics: ["ABIs", "Read/write hooks", "Event listening"] },
    ]),
    w(7, "Tokens: ERC20 & DeFi Primitives", [
      { id: "7.1", title: "ERC20", topics: ["Standard", "Minting", "Vesting"] },
      { id: "7.2", title: "DeFi Basics", topics: ["AMMs", "Lending", "Stablecoins"] },
      { id: "7.3", title: "Uniswap Intro", topics: ["v2/v3 architecture", "Pools", "Swaps"] },
    ]),
    w(8, "NFTs: ERC721 & ERC1155", [
      { id: "8.1", title: "Standards", topics: ["ERC721", "ERC1155", "Metadata"] },
      { id: "8.2", title: "IPFS & Storage", topics: ["IPFS", "Arweave", "Pinata"] },
      { id: "8.3", title: "Marketplaces", topics: ["Listings", "Royalties", "OpenSea integration"] },
    ]),
    w(9, "Smart Contract Security", [
      { id: "9.1", title: "Common Vulns", topics: ["Reentrancy", "Integer overflow", "Access control", "Oracles"] },
      { id: "9.2", title: "Auditing Basics", topics: ["Manual review", "Slither", "Mythril"] },
      { id: "9.3", title: "Best Practices", topics: ["Checks-Effects-Interactions", "Pull over push", "Timelocks"] },
    ]),
    w(10, "Oracles, Off-chain Data & Automation", [
      { id: "10.1", title: "Oracles", topics: ["Chainlink Data Feeds", "VRF"] },
      { id: "10.2", title: "Automation", topics: ["Chainlink Automation", "Gelato"] },
      { id: "10.3", title: "Indexing", topics: ["The Graph", "Subgraphs"] },
    ]),
    w(11, "Layer 2s & Cross-chain", [
      { id: "11.1", title: "Rollups", topics: ["Optimistic vs ZK", "Base", "Arbitrum", "Optimism"] },
      { id: "11.2", title: "Bridges", topics: ["Native bridges", "Third-party", "Security tradeoffs"] },
      { id: "11.3", title: "Account Abstraction", topics: ["ERC-4337", "Smart wallets"] },
    ]),
    w(12, "Solana Intro", [
      { id: "12.1", title: "Solana Basics", topics: ["Accounts model", "Programs", "SPL tokens"] },
      { id: "12.2", title: "Anchor Framework", topics: ["Rust basics", "Anchor programs", "Testing"] },
      { id: "12.3", title: "Solana dApps", topics: ["Wallet adapter", "@solana/web3.js"] },
    ]),
    w(13, "DeFi Protocol Build", [
      { id: "13.1", title: "Design", topics: ["Simple lending or DEX", "Token model"] },
      { id: "13.2", title: "Implementation", topics: ["Contracts", "Tests", "Frontend"] },
    ]),
    w(14, "DAOs & Governance", [
      { id: "14.1", title: "DAO Basics", topics: ["Voting models", "Token-weighted", "Quadratic"] },
      { id: "14.2", title: "Tooling", topics: ["Snapshot", "Tally", "OpenZeppelin Governor"] },
    ]),
    w(15, "Career & Ecosystem", [
      { id: "15.1", title: "Portfolio", topics: ["GitHub", "Deployed dApps", "Case studies"] },
      { id: "15.2", title: "Community", topics: ["Hackathons", "Grants", "Open source"] },
      { id: "15.3", title: "Interviews", topics: ["Solidity puzzles", "System design"] },
    ]),
    w(16, "Capstone: Full-Stack dApp", [
      { id: "16.1", title: "Spec", topics: ["Problem", "Contracts", "Frontend"] },
      { id: "16.2", title: "Build", topics: ["Contracts + tests", "Deployed to testnet/mainnet", "dApp UI", "Wallet flows"] },
      { id: "16.3", title: "Audit & Docs", topics: ["Internal audit", "Docs", "Demo"] },
    ], { projects: ["Full-Stack Web3 dApp with Deployed Smart Contracts"] }),
  ],
};

// ---------- Export ----------
export const curricula: CourseCurriculum[] = [
  frontend,
  backend,
  fullstack,
  mobile,
  uiux,
  graphics,
  aiAutomation,
  aiVibe,
  aiEngineering,
  dataAnalytics,
  marketing,
  web3,
];

export const getCurriculum = (slug: string) =>
  curricula.find((c) => c.slug === slug);
