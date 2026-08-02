import type { CourseCurriculum } from "./types";
import img from "@/assets/curriculum/fullstack.jpg";

export const fullstackDevelopment: CourseCurriculum = {
  slug: "fullstack-development",
  title: "Full Stack Development",
  tagline: "Professional Diploma",
  duration: "5 Months (20 Weeks)",
  months: 5,
  totalWeeks: 20,
  level: "Beginner to Industry Ready",
  projectsCount: "20+",
  capstone: "1 SaaS-Grade Full Stack Product",
  goal: "Train complete beginners into industry-ready full stack developers capable of independently designing, building, securing, testing, and deploying production-grade SaaS applications using modern JavaScript/TypeScript, React, Next.js on the frontend and Python (FastAPI and Django) on the backend.",
  overview: "A rigorous 20-week, project-driven full stack development program covering HTML5, modern CSS and Tailwind, JavaScript and TypeScript, React and Next.js on the frontend, and Python-based backend engineering with FastAPI and Django REST Framework, PostgreSQL, SQLAlchemy, Redis, Celery, authentication and authorization, payments with Stripe and Paystack, file uploads, real-time features, automated testing, Docker, CI/CD, cloud deployment, observability and system design — culminating in a fully architected, built, tested, and deployed SaaS capstone product and an interview-ready professional portfolio.",
  image: img,
  weeks: [
  {
    "number": 1,
    "title": "Web Foundations: HTML5 & Modern CSS",
    "overview": "Establish rock-solid fundamentals of semantic HTML5 and modern CSS layout systems used in production teams in 2026.",
    "objectives": [
      "Write semantic, accessible HTML5 documents",
      "Master Flexbox and CSS Grid for real layouts",
      "Understand the CSS box model, cascade and specificity",
      "Build responsive designs with mobile-first media queries"
    ],
    "sections": [
      {
        "id": "1.1",
        "title": "HTML5 Document Structure",
        "topics": [
          "DOCTYPE and document skeleton",
          "Semantic tags: header, nav, main, section, article, aside, footer",
          "Forms: input types, labels, fieldset, validation attributes",
          "Tables and when to use them",
          "Accessibility basics: alt text, ARIA roles, landmark regions",
          "Meta tags for SEO and viewport",
          "Favicons and web manifest basics",
          "Embedding media: picture, video, audio tags",
          "HTML boilerplate best practices"
        ]
      },
      {
        "id": "1.2",
        "title": "CSS Fundamentals",
        "topics": [
          "Selectors: type, class, id, attribute, pseudo-class, pseudo-element",
          "The box model: content, padding, border, margin",
          "Cascade, specificity and inheritance rules",
          "Units: px, %, em, rem, vh, vw",
          "Color systems: hex, rgb, hsl, oklch",
          "Typography: font-family stacks, line-height, letter-spacing",
          "CSS variables (custom properties)",
          "Positioning: static, relative, absolute, fixed, sticky"
        ]
      },
      {
        "id": "1.3",
        "title": "Flexbox Layout",
        "topics": [
          "flex-direction, flex-wrap, flex-flow",
          "justify-content and align-items",
          "align-self and align-content",
          "flex-grow, flex-shrink, flex-basis shorthand",
          "Building navbars with flexbox",
          "Building card rows with flexbox",
          "Common flexbox layout bugs and fixes"
        ]
      },
      {
        "id": "1.4",
        "title": "CSS Grid Layout",
        "topics": [
          "grid-template-columns and grid-template-rows",
          "fr unit and repeat() function",
          "grid-gap / gap property",
          "grid-template-areas for page layouts",
          "Auto-placement and grid-auto-flow",
          "minmax() and auto-fit/auto-fill for responsive grids",
          "Combining Grid with Flexbox appropriately"
        ]
      },
      {
        "id": "1.5",
        "title": "Responsive Design",
        "topics": [
          "Mobile-first vs desktop-first strategy",
          "Media queries and breakpoints",
          "Fluid typography with clamp()",
          "Responsive images with srcset and sizes",
          "Container queries (2026 browser support)",
          "Testing responsiveness with devtools device toolbar"
        ]
      }
    ],
    "exercises": [
      "Build a semantic personal profile page with forms",
      "Recreate a navbar using only Flexbox",
      "Build a 12-column responsive grid layout",
      "Convert a fixed-width page into a fluid responsive page",
      "Debug 5 broken CSS specificity examples"
    ],
    "assignments": [
      "Build a fully responsive personal portfolio landing page using semantic HTML5 and CSS Grid/Flexbox",
      "Recreate a real-world website layout (e.g. a news homepage) pixel-close using only HTML/CSS"
    ],
    "projects": [
      "Responsive Personal Portfolio Page"
    ],
    "outcomes": [
      "Confidently structure any webpage semantically",
      "Build responsive layouts without frameworks",
      "Debug CSS cascade and specificity issues",
      "Understand how browsers render the box model"
    ],
    "assessment": "Graded review of the responsive portfolio project against a semantic HTML and layout accuracy checklist"
  },
  {
    "number": 2,
    "title": "Tailwind CSS & Modern UI Engineering",
    "overview": "Move from hand-written CSS to utility-first styling with Tailwind CSS, and learn component-driven UI thinking.",
    "objectives": [
      "Configure and use Tailwind CSS in a project",
      "Build fully responsive UIs with utility classes",
      "Create reusable design tokens and theme extensions",
      "Implement dark mode and animations with Tailwind"
    ],
    "sections": [
      {
        "id": "2.1",
        "title": "Tailwind Setup & Core Concepts",
        "topics": [
          "Installing Tailwind via Vite/PostCSS",
          "tailwind.config.js structure",
          "Utility-first philosophy vs traditional CSS",
          "Spacing scale, sizing scale, color palette",
          "Responsive prefixes: sm, md, lg, xl, 2xl",
          "State variants: hover, focus, active, disabled",
          "Group and peer modifiers"
        ]
      },
      {
        "id": "2.2",
        "title": "Layout Utilities",
        "topics": [
          "Flex and grid utility classes",
          "Container and max-width utilities",
          "Position and z-index utilities",
          "Gap, space-x/space-y utilities",
          "Aspect-ratio utilities",
          "Overflow and truncation utilities"
        ]
      },
      {
        "id": "2.3",
        "title": "Design Systems with Tailwind",
        "topics": [
          "Extending theme colors, fonts, spacing",
          "Creating reusable component classes with @apply",
          "Typography plugin for prose content",
          "Building a button/badge/card component library",
          "Consistent shadow and radius tokens"
        ]
      },
      {
        "id": "2.4",
        "title": "Dark Mode & Animation",
        "topics": [
          "Class-based vs media-based dark mode",
          "Toggling dark mode with JS and localStorage",
          "Transition and animation utilities",
          "Keyframe animations in Tailwind config",
          "Using tailwindcss-animate plugin"
        ]
      },
      {
        "id": "2.5",
        "title": "Component Libraries & Tooling",
        "topics": [
          "Introduction to shadcn/ui and Radix primitives",
          "Using clsx/cn utility for conditional classes",
          "Linting with Prettier + Tailwind plugin",
          "Organizing large Tailwind projects"
        ]
      }
    ],
    "exercises": [
      "Rebuild Week 1's portfolio using Tailwind only",
      "Build a pricing card component with hover states",
      "Implement dark mode toggle with persistence",
      "Create a reusable Button component with variants"
    ],
    "assignments": [
      "Design and build a marketing landing page (hero, features, pricing, footer) fully responsive with Tailwind",
      "Build a small component library (buttons, cards, badges, alerts) with dark mode support"
    ],
    "projects": [
      "SaaS Marketing Landing Page with Dark Mode"
    ],
    "outcomes": [
      "Build production UIs quickly with utility-first CSS",
      "Create and maintain a design token system",
      "Ship accessible, themeable dark mode",
      "Understand shadcn/ui component conventions"
    ],
    "assessment": "Peer + instructor review of the landing page against responsiveness, dark mode and design consistency criteria"
  },
  {
    "number": 3,
    "title": "JavaScript Fundamentals",
    "overview": "Deep dive into core JavaScript: syntax, data structures, functions, and the mental models needed before frameworks.",
    "objectives": [
      "Write clean modern ES2024+ JavaScript",
      "Master arrays, objects and their built-in methods",
      "Understand scope, closures, and hoisting",
      "Work confidently with functions and higher-order functions"
    ],
    "sections": [
      {
        "id": "3.1",
        "title": "Syntax & Data Types",
        "topics": [
          "let, const, var differences",
          "Primitive types vs reference types",
          "Template literals and string methods",
          "Truthy/falsy values and type coercion",
          "Operators: nullish coalescing, optional chaining",
          "Type checking with typeof and instanceof"
        ]
      },
      {
        "id": "3.2",
        "title": "Control Flow & Functions",
        "topics": [
          "if/else, switch, ternary expressions",
          "for, for...of, for...in, while loops",
          "Function declarations vs expressions vs arrow functions",
          "Default parameters and rest parameters",
          "Closures and lexical scope",
          "IIFEs and their use cases"
        ]
      },
      {
        "id": "3.3",
        "title": "Arrays & Objects",
        "topics": [
          "Array methods: map, filter, reduce, find, some, every",
          "Array destructuring and spread operator",
          "Object methods: keys, values, entries, assign",
          "Object destructuring with defaults and renaming",
          "Immutability patterns for arrays/objects",
          "JSON.stringify and JSON.parse"
        ]
      },
      {
        "id": "3.4",
        "title": "Advanced Functions & Scope",
        "topics": [
          "Higher-order functions",
          "Currying and function composition",
          "this keyword in different contexts",
          "call, apply, bind",
          "Hoisting behavior of var/let/const/functions"
        ]
      },
      {
        "id": "3.5",
        "title": "Error Handling & Modules",
        "topics": [
          "try/catch/finally",
          "Custom Error classes",
          "ES Modules: import/export syntax",
          "CommonJS vs ESM differences",
          "Debugging with console methods and browser devtools"
        ]
      }
    ],
    "exercises": [
      "Implement your own map, filter, reduce from scratch",
      "Solve 15 array/object manipulation katas",
      "Build a closures-based counter and memoizer",
      "Refactor callback code into cleaner functional style"
    ],
    "assignments": [
      "Build a command-line-style budget tracker using arrays/objects and functions",
      "Build a set of 10 utility functions (debounce, throttle, deepClone, groupBy, etc.) with tests"
    ],
    "projects": [
      "JavaScript Utility Library"
    ],
    "outcomes": [
      "Think in JavaScript idioms fluently",
      "Manipulate complex data structures confidently",
      "Understand closures, scope and this deeply",
      "Debug JS programs using devtools"
    ],
    "assessment": "Timed coding assessment covering arrays, objects, closures and functions"
  },
  {
    "number": 4,
    "title": "JavaScript in the Browser: DOM, Events & Async",
    "overview": "Learn to manipulate the DOM, handle events, and master asynchronous JavaScript including Promises and async/await.",
    "objectives": [
      "Manipulate the DOM programmatically",
      "Handle user events and event delegation",
      "Fetch data from APIs using fetch and async/await",
      "Understand the JavaScript event loop"
    ],
    "sections": [
      {
        "id": "4.1",
        "title": "DOM Manipulation",
        "topics": [
          "querySelector/querySelectorAll",
          "createElement, appendChild, remove",
          "classList API",
          "Modifying attributes and styles via JS",
          "Traversing the DOM tree",
          "textContent vs innerHTML vs innerText security implications"
        ]
      },
      {
        "id": "4.2",
        "title": "Events",
        "topics": [
          "addEventListener and event object",
          "Event bubbling and capturing",
          "Event delegation pattern",
          "Form events and preventDefault",
          "Keyboard and mouse events",
          "Debouncing/throttling event handlers"
        ]
      },
      {
        "id": "4.3",
        "title": "Asynchronous JavaScript",
        "topics": [
          "Callbacks and callback hell",
          "Promises: then, catch, finally",
          "Promise.all, Promise.race, Promise.allSettled",
          "async/await syntax and error handling",
          "Microtasks vs macrotasks and the event loop",
          "setTimeout, setInterval, requestAnimationFrame"
        ]
      },
      {
        "id": "4.4",
        "title": "Working with APIs",
        "topics": [
          "fetch API and Response object",
          "GET/POST/PUT/DELETE requests with fetch",
          "Handling JSON responses and errors",
          "CORS explained",
          "AbortController for cancelling requests",
          "Building a simple API client wrapper"
        ]
      },
      {
        "id": "4.5",
        "title": "Browser Storage & Tooling",
        "topics": [
          "localStorage and sessionStorage",
          "Cookies basics",
          "Browser devtools: Network, Console, Sources panels",
          "Introduction to Vite as a dev server/bundler"
        ]
      }
    ],
    "exercises": [
      "Build a dynamic to-do list with full CRUD in vanilla JS",
      "Implement event delegation for a large list",
      "Consume a public REST API and render results",
      "Build a debounced live search box"
    ],
    "assignments": [
      "Build a weather dashboard app that fetches live data from a public API",
      "Build a client-side quiz app with timer, scoring and localStorage persistence"
    ],
    "projects": [
      "Vanilla JS Weather Dashboard"
    ],
    "outcomes": [
      "Manipulate and update the DOM efficiently",
      "Handle complex event-driven interactions",
      "Fetch and render async data cleanly",
      "Understand the JS event loop deeply"
    ],
    "assessment": "Practical project demo plus a written quiz on the event loop and async patterns"
  },
  {
    "number": 5,
    "title": "TypeScript for Application Development",
    "overview": "Add static typing to JavaScript knowledge; learn TypeScript deeply as the foundation for React and Next.js work ahead.",
    "objectives": [
      "Configure TypeScript in a project",
      "Use interfaces, types and generics effectively",
      "Understand TS utility types",
      "Migrate JavaScript code to strict TypeScript"
    ],
    "sections": [
      {
        "id": "5.1",
        "title": "TypeScript Basics",
        "topics": [
          "tsconfig.json key options",
          "Primitive types, arrays, tuples",
          "Type inference vs explicit typing",
          "any, unknown, never, void differences",
          "Type aliases vs interfaces"
        ]
      },
      {
        "id": "5.2",
        "title": "Functions & Objects in TS",
        "topics": [
          "Typing function parameters and return values",
          "Optional and default parameters",
          "Object types and readonly properties",
          "Union and intersection types",
          "Discriminated unions"
        ]
      },
      {
        "id": "5.3",
        "title": "Generics",
        "topics": [
          "Generic functions",
          "Generic interfaces and types",
          "Constraints with extends",
          "Generic utility patterns for reusable code"
        ]
      },
      {
        "id": "5.4",
        "title": "Advanced Types",
        "topics": [
          "Utility types: Partial, Pick, Omit, Record, Required",
          "Mapped types",
          "Conditional types basics",
          "Type guards and narrowing",
          "satisfies operator"
        ]
      },
      {
        "id": "5.5",
        "title": "Tooling & Practice",
        "topics": [
          "Strict mode configuration",
          "ESLint + TypeScript integration",
          "Typing third-party libraries with @types",
          "Migrating a JS project to TS incrementally"
        ]
      }
    ],
    "exercises": [
      "Convert the Week 3 utility library to strict TypeScript",
      "Write 10 generic function exercises",
      "Model a domain (e.g. e-commerce) with interfaces and unions",
      "Fix type errors in a deliberately broken TS file"
    ],
    "assignments": [
      "Migrate the vanilla JS weather dashboard to TypeScript with full type safety",
      "Build a typed data-modeling exercise for a blog platform (Post, Author, Comment types)"
    ],
    "projects": [
      "TypeScript Migration Project"
    ],
    "outcomes": [
      "Write type-safe, self-documenting JavaScript",
      "Use generics to build reusable, safe abstractions",
      "Read and resolve complex TS compiler errors",
      "Be fully prepared to learn React with TypeScript"
    ],
    "assessment": "Code review of the migrated TypeScript project for type safety and correctness"
  },
  {
    "number": 6,
    "title": "React Fundamentals",
    "overview": "Learn React from first principles: components, JSX, props, state, and the component lifecycle using functional components and hooks.",
    "objectives": [
      "Build component-based UIs with JSX",
      "Manage local state with useState",
      "Understand props and component composition",
      "Handle events and conditional rendering in React"
    ],
    "sections": [
      {
        "id": "6.1",
        "title": "React & JSX Basics",
        "topics": [
          "What React is and the virtual DOM concept",
          "JSX syntax rules and expressions",
          "Rendering lists with map and the key prop",
          "Conditional rendering patterns",
          "Fragments"
        ]
      },
      {
        "id": "6.2",
        "title": "Components & Props",
        "topics": [
          "Function components",
          "Props and prop typing with TypeScript",
          "Children prop and composition",
          "Default props patterns",
          "Component file/folder organization"
        ]
      },
      {
        "id": "6.3",
        "title": "State & Events",
        "topics": [
          "useState hook fundamentals",
          "Handling form inputs (controlled components)",
          "Event handlers in JSX",
          "Lifting state up",
          "Derived state vs redundant state"
        ]
      },
      {
        "id": "6.4",
        "title": "Component Lifecycle with Hooks",
        "topics": [
          "useEffect for side effects",
          "Dependency arrays and cleanup functions",
          "Fetching data with useEffect",
          "Common useEffect pitfalls"
        ]
      },
      {
        "id": "6.5",
        "title": "Project Setup & Tooling",
        "topics": [
          "Creating a React app with Vite + TypeScript",
          "Folder structure conventions",
          "React DevTools",
          "ESLint/Prettier setup for React projects"
        ]
      }
    ],
    "exercises": [
      "Build a counter and toggle component with useState",
      "Build a controlled multi-field form with validation feedback",
      "Render a filterable, sortable list of items",
      "Fetch and display API data with loading/error states"
    ],
    "assignments": [
      "Build a task manager app (add/edit/delete/filter tasks) using only local state",
      "Build a movie search app consuming a public API with loading and error UI states"
    ],
    "projects": [
      "React Task Manager App"
    ],
    "outcomes": [
      "Build interactive UIs using React components",
      "Manage component state and side effects correctly",
      "Structure a React + TypeScript project professionally",
      "Debug React apps using DevTools"
    ],
    "assessment": "Live coding assessment: build a small feature component under time constraints"
  },
  {
    "number": 7,
    "title": "React Deep Dive: Hooks, Context & Performance",
    "overview": "Master advanced React patterns including custom hooks, Context API, performance optimization, and routing with React Router.",
    "objectives": [
      "Build and use custom hooks",
      "Manage global state with Context API",
      "Optimize React performance with memoization",
      "Implement client-side routing"
    ],
    "sections": [
      {
        "id": "7.1",
        "title": "Advanced Hooks",
        "topics": [
          "useRef for DOM access and mutable values",
          "useMemo for expensive computations",
          "useCallback for stable function references",
          "useReducer for complex state logic",
          "Rules of hooks explained"
        ]
      },
      {
        "id": "7.2",
        "title": "Custom Hooks",
        "topics": [
          "Extracting reusable logic into custom hooks",
          "useFetch, useDebounce, useLocalStorage patterns",
          "Composing multiple hooks",
          "Testing custom hooks"
        ]
      },
      {
        "id": "7.3",
        "title": "Context API & State Sharing",
        "topics": [
          "createContext and useContext",
          "Provider pattern",
          "Avoiding unnecessary re-renders with context",
          "When to use Context vs prop drilling vs external state libraries"
        ]
      },
      {
        "id": "7.4",
        "title": "Performance Optimization",
        "topics": [
          "React.memo for component memoization",
          "Identifying re-render issues with React DevTools Profiler",
          "Code-splitting with React.lazy and Suspense",
          "Virtualization concepts for long lists"
        ]
      },
      {
        "id": "7.5",
        "title": "Routing with React Router",
        "topics": [
          "BrowserRouter, Routes, Route setup",
          "Nested routes and layouts",
          "useNavigate, useParams, useSearchParams",
          "Protected routes pattern",
          "Route-based code splitting"
        ]
      }
    ],
    "exercises": [
      "Build 3 custom hooks (useToggle, useFetch, useDebounce)",
      "Refactor a prop-drilled app to use Context",
      "Profile and fix an intentionally slow React component",
      "Build a multi-page app with nested routing"
    ],
    "assignments": [
      "Build a multi-page e-commerce product catalog with cart state via Context and routing",
      "Optimize a given slow React app and document performance improvements with before/after profiler screenshots"
    ],
    "projects": [
      "Multi-Page Product Catalog with Cart"
    ],
    "outcomes": [
      "Write reusable custom hooks confidently",
      "Share state across a React app idiomatically",
      "Diagnose and fix React performance issues",
      "Implement production-grade client-side routing"
    ],
    "assessment": "Performance audit assignment graded on measurable improvement plus routing implementation review"
  },
  {
    "number": 8,
    "title": "Next.js: The Production React Framework",
    "overview": "Transition from client-only React to Next.js (App Router), covering routing, rendering strategies, and data fetching for production apps.",
    "objectives": [
      "Build applications using the Next.js App Router",
      "Understand server components vs client components",
      "Implement SSR, SSG and ISR rendering strategies",
      "Handle data fetching, loading and error states in Next.js"
    ],
    "sections": [
      {
        "id": "8.1",
        "title": "Next.js App Router Basics",
        "topics": [
          "Project structure with the app directory",
          "File-based routing conventions",
          "layout.tsx, page.tsx, loading.tsx, error.tsx",
          "Nested layouts and route groups",
          "Dynamic routes and catch-all segments"
        ]
      },
      {
        "id": "8.2",
        "title": "Server & Client Components",
        "topics": [
          "Server Components by default explained",
          "'use client' directive and when to use it",
          "Passing data between server and client components",
          "Composition patterns to minimize client bundle size"
        ]
      },
      {
        "id": "8.3",
        "title": "Data Fetching & Rendering Strategies",
        "topics": [
          "fetch() caching behavior in Next.js",
          "Static Site Generation (SSG) with generateStaticParams",
          "Server-Side Rendering (SSR) on demand",
          "Incremental Static Regeneration (ISR) with revalidate",
          "Streaming with Suspense"
        ]
      },
      {
        "id": "8.4",
        "title": "Server Actions & Forms",
        "topics": [
          "Defining Server Actions",
          "Form submission with Server Actions",
          "Optimistic UI updates with useOptimistic",
          "Revalidating data with revalidatePath/revalidateTag"
        ]
      },
      {
        "id": "8.5",
        "title": "Metadata, Images & Assets",
        "topics": [
          "generateMetadata for SEO",
          "next/image optimization",
          "next/font for font optimization",
          "Static assets and public folder conventions"
        ]
      }
    ],
    "exercises": [
      "Convert a client-rendered React page to Next.js App Router",
      "Build a blog with SSG using generateStaticParams",
      "Implement a Server Action for a contact form",
      "Add SEO metadata to all pages of a sample site"
    ],
    "assignments": [
      "Build a fully server-rendered blog platform with dynamic routes, ISR, and optimized images/fonts",
      "Rebuild the Week 7 product catalog in Next.js with proper server/client component boundaries"
    ],
    "projects": [
      "Server-Rendered Blog Platform with ISR"
    ],
    "outcomes": [
      "Architect apps correctly between server and client components",
      "Choose the right rendering strategy per page",
      "Use Server Actions for mutations without a separate API layer",
      "Optimize Next.js apps for SEO and performance"
    ],
    "assessment": "Project review verifying correct rendering strategy choices and server/client component boundaries"
  },
  {
    "number": 9,
    "title": "Python Fundamentals for Backend Engineers",
    "overview": "Build strong Python fundamentals with a backend-engineering lens, preparing for FastAPI and Django in coming weeks.",
    "objectives": [
      "Write clean, idiomatic Python 3.12+ code",
      "Use Python's data structures and comprehensions effectively",
      "Understand object-oriented programming in Python",
      "Work with virtual environments and package management"
    ],
    "sections": [
      {
        "id": "9.1",
        "title": "Python Syntax & Data Types",
        "topics": [
          "Variables, dynamic typing, type hints",
          "Numbers, strings, booleans, None",
          "Lists, tuples, sets, dictionaries",
          "String formatting with f-strings",
          "Slicing and indexing"
        ]
      },
      {
        "id": "9.2",
        "title": "Control Flow & Functions",
        "topics": [
          "if/elif/else, match-case statements",
          "for/while loops, range, enumerate, zip",
          "Function definitions, default and keyword args",
          "*args and **kwargs",
          "Lambda functions",
          "List/dict/set comprehensions"
        ]
      },
      {
        "id": "9.3",
        "title": "Object-Oriented Python",
        "topics": [
          "Classes, __init__, instance vs class attributes",
          "Inheritance and method overriding",
          "Dunder methods: __str__, __repr__, __eq__",
          "Properties with @property",
          "Dataclasses for data containers",
          "Abstract base classes basics"
        ]
      },
      {
        "id": "9.4",
        "title": "Modules, Packages & Environments",
        "topics": [
          "Importing modules and packages",
          "Creating virtual environments with venv/uv",
          "Installing packages with pip/uv",
          "requirements.txt and pyproject.toml",
          "Organizing a Python project structure"
        ]
      },
      {
        "id": "9.5",
        "title": "Error Handling, Files & Type Hints",
        "topics": [
          "try/except/else/finally",
          "Custom exceptions",
          "Reading/writing files and context managers (with)",
          "Type hints: List, Dict, Optional, Union",
          "Static type checking with mypy basics"
        ]
      }
    ],
    "exercises": [
      "Solve 15 Python data structure and comprehension exercises",
      "Build a class hierarchy modeling a library system",
      "Write a CLI script that reads/writes JSON files",
      "Set up a Python project with venv and pyproject.toml"
    ],
    "assignments": [
      "Build a command-line inventory management tool using OOP and file persistence",
      "Write a typed Python module with full mypy compliance and unit tests using pytest"
    ],
    "projects": [
      "Python CLI Inventory Manager"
    ],
    "outcomes": [
      "Write idiomatic, type-hinted Python code",
      "Apply OOP principles in real programs",
      "Manage Python environments and dependencies properly",
      "Be fully prepared for FastAPI/Django backend work"
    ],
    "assessment": "Timed Python coding assessment plus code review of the CLI project"
  },
  {
    "number": 10,
    "title": "Backend APIs with FastAPI",
    "overview": "Build robust REST APIs using FastAPI, covering routing, validation with Pydantic, dependency injection, and async request handling.",
    "objectives": [
      "Build REST APIs with FastAPI routers",
      "Validate request/response data with Pydantic models",
      "Use FastAPI's dependency injection system",
      "Understand async request handling in Python"
    ],
    "sections": [
      {
        "id": "10.1",
        "title": "FastAPI Fundamentals",
        "topics": [
          "Installing and running FastAPI with uvicorn",
          "Path operations: GET, POST, PUT, PATCH, DELETE",
          "Path and query parameters",
          "Automatic OpenAPI/Swagger docs",
          "Project structure for scalable FastAPI apps"
        ]
      },
      {
        "id": "10.2",
        "title": "Pydantic Models & Validation",
        "topics": [
          "Defining Pydantic v2 models",
          "Field validation and constraints",
          "Nested models and lists of models",
          "Request body vs response_model",
          "Custom validators"
        ]
      },
      {
        "id": "10.3",
        "title": "Dependency Injection",
        "topics": [
          "Depends() fundamentals",
          "Reusable dependencies for pagination, filtering",
          "Dependency chains and sub-dependencies",
          "Class-based dependencies"
        ]
      },
      {
        "id": "10.4",
        "title": "Routers & Project Structure",
        "topics": [
          "APIRouter for modular routes",
          "Organizing routers, schemas, services, models in folders",
          "Middleware basics (CORS, logging)",
          "Exception handlers and custom HTTPException"
        ]
      },
      {
        "id": "10.5",
        "title": "Async Python & Concurrency",
        "topics": [
          "async def vs def endpoints",
          "When FastAPI runs code in a threadpool",
          "asyncio basics: await, coroutines",
          "Async HTTP calls with httpx"
        ]
      }
    ],
    "exercises": [
      "Build a CRUD API for a 'notes' resource with Pydantic validation",
      "Add pagination and filtering dependencies to a list endpoint",
      "Write custom exception handlers for common error cases",
      "Call an external API asynchronously from a FastAPI endpoint"
    ],
    "assignments": [
      "Build a fully documented Task Management REST API with FastAPI (in-memory store)",
      "Refactor the API into routers/schemas/services layers following clean architecture"
    ],
    "projects": [
      "Task Management REST API with FastAPI"
    ],
    "outcomes": [
      "Design and build REST APIs following FastAPI best practices",
      "Validate and shape data reliably with Pydantic",
      "Structure backend codebases for scalability",
      "Understand when and how to use async in Python APIs"
    ],
    "assessment": "API design review using the auto-generated Swagger docs and a Postman/Insomnia test collection"
  },
  {
    "number": 11,
    "title": "Databases: PostgreSQL & SQLAlchemy ORM",
    "overview": "Learn relational database design and connect FastAPI applications to PostgreSQL using SQLAlchemy 2.0 and Alembic migrations.",
    "objectives": [
      "Design normalized relational database schemas",
      "Write SQL queries confidently",
      "Use SQLAlchemy ORM models and relationships",
      "Manage schema changes with Alembic migrations"
    ],
    "sections": [
      {
        "id": "11.1",
        "title": "Relational Database Design",
        "topics": [
          "Tables, rows, columns, primary/foreign keys",
          "Normalization (1NF, 2NF, 3NF)",
          "One-to-many, many-to-many relationships",
          "Indexes and when to use them",
          "ER diagrams for schema planning"
        ]
      },
      {
        "id": "11.2",
        "title": "SQL Fundamentals",
        "topics": [
          "SELECT, WHERE, ORDER BY, LIMIT",
          "JOINs: INNER, LEFT, RIGHT, FULL",
          "Aggregate functions and GROUP BY/HAVING",
          "Subqueries and CTEs",
          "INSERT, UPDATE, DELETE, transactions"
        ]
      },
      {
        "id": "11.3",
        "title": "SQLAlchemy ORM (2.0 style)",
        "topics": [
          "Engine and session configuration",
          "Declarative models and mapped_column",
          "Relationships: relationship(), back_populates",
          "Querying with select() statement style",
          "Eager vs lazy loading strategies"
        ]
      },
      {
        "id": "11.4",
        "title": "Integrating SQLAlchemy with FastAPI",
        "topics": [
          "Dependency-injected DB sessions",
          "CRUD service layer patterns",
          "Connecting Pydantic schemas with ORM models",
          "Pagination and filtering at the DB level"
        ]
      },
      {
        "id": "11.5",
        "title": "Migrations & Data Integrity",
        "topics": [
          "Alembic setup and configuration",
          "Generating and applying migrations",
          "Rolling back migrations safely",
          "Database constraints: unique, check, not null",
          "Seeding data for development"
        ]
      }
    ],
    "exercises": [
      "Design an ER diagram for a multi-tenant SaaS schema",
      "Write 10 SQL queries involving joins and aggregates",
      "Build SQLAlchemy models with relationships for blog posts/comments/authors",
      "Create and apply an Alembic migration for a schema change"
    ],
    "assignments": [
      "Rebuild the Task Management API with PostgreSQL persistence via SQLAlchemy and Alembic migrations",
      "Design and implement a normalized schema for a multi-vendor marketplace"
    ],
    "projects": [
      "Persistent Task Management API with PostgreSQL"
    ],
    "outcomes": [
      "Design correct, normalized relational schemas",
      "Write and optimize SQL queries",
      "Use SQLAlchemy ORM productively with FastAPI",
      "Manage database schema evolution safely with Alembic"
    ],
    "assessment": "Database design review plus a live SQL query assessment"
  },
  {
    "number": 12,
    "title": "Authentication, Authorization & Security",
    "overview": "Implement secure authentication and authorization flows, and learn essential web application security practices.",
    "objectives": [
      "Implement JWT-based authentication in FastAPI",
      "Implement role-based access control (RBAC)",
      "Apply password hashing and secure session handling",
      "Identify and mitigate common web vulnerabilities"
    ],
    "sections": [
      {
        "id": "12.1",
        "title": "Authentication Fundamentals",
        "topics": [
          "Password hashing with bcrypt/argon2",
          "JWT structure: header, payload, signature",
          "Access tokens vs refresh tokens",
          "OAuth2 password flow in FastAPI (OAuth2PasswordBearer)",
          "Storing tokens securely on the client (httpOnly cookies vs localStorage tradeoffs)"
        ]
      },
      {
        "id": "12.2",
        "title": "Implementing Auth in FastAPI",
        "topics": [
          "User registration and login endpoints",
          "Issuing and verifying JWTs",
          "Dependency-based route protection",
          "Refresh token rotation strategy",
          "Email verification flow basics"
        ]
      },
      {
        "id": "12.3",
        "title": "Authorization & RBAC",
        "topics": [
          "Role and permission models in the database",
          "Role-based route guards",
          "Resource-based (ownership) authorization checks",
          "Admin vs user vs org-level permissions for SaaS"
        ]
      },
      {
        "id": "12.4",
        "title": "OAuth & Third-Party Auth",
        "topics": [
          "OAuth2 authorization code flow concept",
          "Social login with Google/GitHub (conceptual + implementation)",
          "Using Authlib or similar libraries in FastAPI"
        ]
      },
      {
        "id": "12.5",
        "title": "Web Security Essentials",
        "topics": [
          "OWASP Top 10 overview",
          "SQL injection prevention with ORM parameterization",
          "XSS and CSRF prevention strategies",
          "Rate limiting and brute-force protection",
          "Secrets management with environment variables",
          "HTTPS, CORS configuration hardening"
        ]
      }
    ],
    "exercises": [
      "Implement register/login/refresh endpoints with JWT",
      "Add role-based route protection to an existing API",
      "Implement Google OAuth login on a sample app",
      "Write a security checklist audit for a given codebase"
    ],
    "assignments": [
      "Add full authentication and RBAC (admin/user roles) to the Task Management API",
      "Implement Google OAuth social login alongside email/password auth"
    ],
    "projects": [
      "Secure Auth System with JWT, RBAC and OAuth"
    ],
    "outcomes": [
      "Implement secure, production-grade authentication flows",
      "Enforce authorization rules correctly across an API",
      "Recognize and prevent common web vulnerabilities",
      "Manage secrets and security configuration properly"
    ],
    "assessment": "Security-focused code review and a mock penetration test checklist walkthrough"
  },
  {
    "number": 13,
    "title": "Django & Django REST Framework",
    "overview": "Learn Django as a batteries-included alternative/complement to FastAPI, including the ORM, admin panel, and building REST APIs with DRF.",
    "objectives": [
      "Build a Django project with apps and models",
      "Use Django ORM for data modeling and queries",
      "Build REST APIs with Django REST Framework",
      "Leverage Django's admin panel for internal tooling"
    ],
    "sections": [
      {
        "id": "13.1",
        "title": "Django Fundamentals",
        "topics": [
          "Django project vs app structure",
          "settings.py configuration",
          "URL routing with urls.py",
          "Django's MTV architecture",
          "manage.py commands"
        ]
      },
      {
        "id": "13.2",
        "title": "Django ORM",
        "topics": [
          "Defining models and fields",
          "Migrations: makemigrations, migrate",
          "QuerySets: filter, exclude, annotate, aggregate",
          "Model relationships: ForeignKey, ManyToMany, OneToOne",
          "Model Meta options and custom managers"
        ]
      },
      {
        "id": "13.3",
        "title": "Django Admin & Views",
        "topics": [
          "Registering models in the admin site",
          "Customizing ModelAdmin",
          "Class-based views vs function-based views",
          "Django templates basics (for admin tooling/dashboards)"
        ]
      },
      {
        "id": "13.4",
        "title": "Django REST Framework",
        "topics": [
          "Serializers and ModelSerializer",
          "APIView, generic views, and ViewSets",
          "Routers for automatic URL generation",
          "Permissions and authentication classes in DRF"
        ]
      },
      {
        "id": "13.5",
        "title": "DRF Advanced Features",
        "topics": [
          "Pagination, filtering, and search in DRF",
          "Nested serializers for related data",
          "Throttling and rate limiting in DRF",
          "Choosing Django+DRF vs FastAPI per use case"
        ]
      }
    ],
    "exercises": [
      "Build a Django app with 3 related models and admin registration",
      "Build a DRF ViewSet with full CRUD and permissions",
      "Add filtering/search/pagination to a DRF endpoint",
      "Compare a feature built in both FastAPI and DRF"
    ],
    "assignments": [
      "Build a Content Management API (articles, categories, authors) using Django + DRF with a working admin panel",
      "Add role-based permissions and nested serializers to the CMS API"
    ],
    "projects": [
      "Content Management API with Django REST Framework"
    ],
    "outcomes": [
      "Build production APIs with Django REST Framework",
      "Use Django's admin panel for rapid internal tooling",
      "Compare and choose between FastAPI and Django appropriately",
      "Model complex relational data with the Django ORM"
    ],
    "assessment": "Project demo comparing DRF and FastAPI implementations of the same feature"
  },
  {
    "number": 14,
    "title": "Caching, Background Jobs & Real-Time Features",
    "overview": "Add production capabilities: Redis caching, Celery background jobs/scheduling, and real-time features with WebSockets.",
    "objectives": [
      "Use Redis for caching and rate limiting",
      "Implement background job processing with Celery",
      "Build real-time features using WebSockets",
      "Design scheduled/periodic tasks"
    ],
    "sections": [
      {
        "id": "14.1",
        "title": "Redis Fundamentals",
        "topics": [
          "Redis data types: strings, hashes, lists, sets, sorted sets",
          "Setting up Redis locally and in Docker",
          "Connecting to Redis from Python with redis-py",
          "Using Redis for caching expensive queries",
          "Cache invalidation strategies"
        ]
      },
      {
        "id": "14.2",
        "title": "Rate Limiting & Sessions",
        "topics": [
          "Token bucket / sliding window rate limiting with Redis",
          "Using Redis for session storage",
          "Distributed locks with Redis"
        ]
      },
      {
        "id": "14.3",
        "title": "Background Jobs with Celery",
        "topics": [
          "Celery architecture: broker, worker, backend",
          "Configuring Celery with Redis/RabbitMQ as broker",
          "Defining and calling tasks with .delay()/.apply_async()",
          "Retries, timeouts, and error handling in tasks",
          "Celery Beat for scheduled/periodic tasks"
        ]
      },
      {
        "id": "14.4",
        "title": "Real-Time with WebSockets",
        "topics": [
          "WebSocket protocol basics",
          "Implementing WebSocket endpoints in FastAPI",
          "Django Channels overview for real-time in Django",
          "Building a live notification/chat feature",
          "Broadcasting events with Redis Pub/Sub"
        ]
      },
      {
        "id": "14.5",
        "title": "Email & Notifications",
        "topics": [
          "Sending transactional email (SMTP/SendGrid/Resend/Postmark)",
          "Email templates for verification/password reset",
          "Queuing email sending via Celery",
          "In-app notification patterns"
        ]
      }
    ],
    "exercises": [
      "Cache a slow DB query with Redis and measure the improvement",
      "Build a Celery task that sends a welcome email asynchronously",
      "Implement a scheduled daily report task with Celery Beat",
      "Build a simple WebSocket-based live counter or chat"
    ],
    "assignments": [
      "Add Redis caching, async email sending via Celery, and a real-time notification system to the Task Management API",
      "Implement a live chat feature using WebSockets and Redis Pub/Sub broadcasting"
    ],
    "projects": [
      "Real-Time Notifications & Background Jobs System"
    ],
    "outcomes": [
      "Use Redis effectively for caching and rate limiting",
      "Offload slow work to background jobs reliably",
      "Build real-time features with WebSockets",
      "Send transactional emails asynchronously"
    ],
    "assessment": "Load-test demonstration showing performance improvement from caching and background job offloading"
  },
  {
    "number": 15,
    "title": "Payments, File Uploads & Third-Party Integrations",
    "overview": "Integrate payment processing (Stripe/Paystack), handle file uploads to cloud storage, and consume third-party APIs professionally.",
    "objectives": [
      "Integrate Stripe and Paystack payment flows",
      "Handle file/image uploads to cloud storage",
      "Design and consume webhooks securely",
      "Build resilient third-party API integrations"
    ],
    "sections": [
      {
        "id": "15.1",
        "title": "Payment Integration: Stripe",
        "topics": [
          "Stripe Checkout vs Payment Intents",
          "Creating products/prices and checkout sessions",
          "Handling successful/failed payment redirects",
          "Stripe webhooks for payment confirmation",
          "Subscription billing basics with Stripe"
        ]
      },
      {
        "id": "15.2",
        "title": "Payment Integration: Paystack",
        "topics": [
          "Paystack transaction initialization",
          "Verifying transactions server-side",
          "Paystack webhooks and signature verification",
          "Handling local currency and split payments"
        ]
      },
      {
        "id": "15.3",
        "title": "Webhooks & Idempotency",
        "topics": [
          "Verifying webhook signatures",
          "Idempotency keys to prevent duplicate processing",
          "Retrying and logging webhook events",
          "Testing webhooks locally with tunneling tools"
        ]
      },
      {
        "id": "15.4",
        "title": "File Uploads & Storage",
        "topics": [
          "Handling multipart/form-data uploads in FastAPI/Django",
          "Validating file type and size",
          "Uploading files to S3-compatible storage (S3/Cloudflare R2/Supabase Storage)",
          "Generating signed/pre-signed URLs",
          "Image processing/resizing basics"
        ]
      },
      {
        "id": "15.5",
        "title": "Third-Party API Integration Patterns",
        "topics": [
          "Designing a resilient API client wrapper",
          "Retry with exponential backoff",
          "Timeouts and circuit breaker concepts",
          "API key management and rotation"
        ]
      }
    ],
    "exercises": [
      "Integrate Stripe Checkout for a one-time payment flow",
      "Integrate Paystack for a subscription payment flow",
      "Build a secure file upload endpoint storing to S3-compatible storage",
      "Verify and process a webhook end-to-end"
    ],
    "assignments": [
      "Add a subscription billing system (Stripe or Paystack) with webhook-based plan activation to the SaaS project",
      "Build a profile/avatar and document upload feature with cloud storage and image resizing"
    ],
    "projects": [
      "Subscription Billing & File Upload System"
    ],
    "outcomes": [
      "Integrate real payment providers confidently",
      "Handle webhooks securely and idempotently",
      "Manage file uploads to cloud storage safely",
      "Build resilient integrations with third-party APIs"
    ],
    "assessment": "End-to-end demo of a successful test payment flow with webhook-confirmed activation"
  },
  {
    "number": 16,
    "title": "Testing, Docker & CI/CD",
    "overview": "Build a professional engineering workflow: automated testing, containerization with Docker, and continuous integration/deployment pipelines.",
    "objectives": [
      "Write unit, integration and API tests for Python and React code",
      "Containerize full-stack applications with Docker",
      "Set up CI/CD pipelines with GitHub Actions",
      "Apply Git workflows used in professional teams"
    ],
    "sections": [
      {
        "id": "16.1",
        "title": "Backend Testing",
        "topics": [
          "pytest fundamentals: fixtures, parametrize",
          "Testing FastAPI endpoints with TestClient/httpx",
          "Testing Django/DRF views with APIClient",
          "Mocking external services and DB in tests",
          "Test database setup and teardown strategies",
          "Code coverage with coverage.py"
        ]
      },
      {
        "id": "16.2",
        "title": "Frontend Testing",
        "topics": [
          "Unit testing with Vitest/Jest",
          "Testing React components with React Testing Library",
          "Mocking API calls in frontend tests",
          "End-to-end testing with Playwright/Cypress"
        ]
      },
      {
        "id": "16.3",
        "title": "Docker Fundamentals",
        "topics": [
          "Images vs containers",
          "Writing a Dockerfile for a Python backend",
          "Writing a Dockerfile for a Next.js frontend",
          "Multi-stage builds for smaller images",
          "docker-compose for multi-service local dev (app, Postgres, Redis)"
        ]
      },
      {
        "id": "16.4",
        "title": "Git & Team Workflows",
        "topics": [
          "Git branching strategies (trunk-based, GitFlow)",
          "Pull requests and code review etiquette",
          "Conventional commits and semantic versioning",
          "Resolving merge conflicts confidently"
        ]
      },
      {
        "id": "16.5",
        "title": "CI/CD with GitHub Actions",
        "topics": [
          "Writing GitHub Actions workflows",
          "Running tests and linters automatically on PRs",
          "Building and pushing Docker images in CI",
          "Deploying automatically on merge to main",
          "Environment secrets management in CI"
        ]
      }
    ],
    "exercises": [
      "Write pytest tests achieving 80%+ coverage for one API module",
      "Write React Testing Library tests for a form component",
      "Dockerize the FastAPI backend and Postgres with docker-compose",
      "Write a GitHub Actions workflow that runs tests on every PR"
    ],
    "assignments": [
      "Set up a full CI/CD pipeline that tests, builds, and deploys the SaaS project's backend and frontend on every merge",
      "Achieve and document meaningful test coverage across backend and critical frontend components"
    ],
    "projects": [
      "Fully Tested & Dockerized SaaS App with CI/CD Pipeline"
    ],
    "outcomes": [
      "Write meaningful automated tests across the stack",
      "Containerize applications for consistent environments",
      "Build and maintain CI/CD pipelines",
      "Collaborate using professional Git workflows"
    ],
    "assessment": "Review of CI pipeline run history and test coverage report"
  },
  {
    "number": 17,
    "title": "Deployment, Observability & System Design",
    "overview": "Deploy full-stack applications to production infrastructure, add observability, and learn system design fundamentals for scaling SaaS products.",
    "objectives": [
      "Deploy Next.js and Python backends to production platforms",
      "Configure custom domains, SSL and environment variables",
      "Implement logging, monitoring and error tracking",
      "Apply core system design principles for scalable apps"
    ],
    "sections": [
      {
        "id": "17.1",
        "title": "Frontend Deployment",
        "topics": [
          "Deploying Next.js to Vercel",
          "Environment variables and build configuration",
          "Custom domains and SSL",
          "Preview deployments for PRs",
          "Edge/CDN caching concepts"
        ]
      },
      {
        "id": "17.2",
        "title": "Backend Deployment",
        "topics": [
          "Deploying FastAPI/Django with Docker to Railway/Render/Fly.io",
          "Managed PostgreSQL and Redis in production",
          "Zero-downtime deployment strategies",
          "Health checks and readiness probes",
          "Horizontal scaling basics"
        ]
      },
      {
        "id": "17.3",
        "title": "Observability",
        "topics": [
          "Structured logging best practices",
          "Error tracking with Sentry",
          "Application performance monitoring (APM) basics",
          "Uptime monitoring and alerting",
          "Dashboards with Grafana/metrics basics"
        ]
      },
      {
        "id": "17.4",
        "title": "System Design Fundamentals",
        "topics": [
          "Load balancers and reverse proxies",
          "Vertical vs horizontal scaling",
          "Caching layers in system design",
          "Database read replicas and sharding basics",
          "CAP theorem overview"
        ]
      },
      {
        "id": "17.5",
        "title": "Designing a SaaS Architecture",
        "topics": [
          "Multi-tenancy patterns (shared DB vs schema vs DB per tenant)",
          "API rate limiting at scale",
          "Designing for high availability",
          "Cost-aware infrastructure decisions for early-stage SaaS"
        ]
      }
    ],
    "exercises": [
      "Deploy a Next.js app to Vercel with a custom domain",
      "Deploy a Dockerized FastAPI app to Render/Railway/Fly.io",
      "Set up Sentry error tracking on both frontend and backend",
      "Draw a system design diagram for a given scaling scenario"
    ],
    "assignments": [
      "Deploy the full SaaS project (frontend + backend + DB + Redis) to production with monitoring and error tracking",
      "Produce a system design document for scaling the SaaS project to 100k users"
    ],
    "projects": [
      "Production Deployment of Full SaaS Stack with Monitoring"
    ],
    "outcomes": [
      "Deploy full-stack apps to real production infrastructure",
      "Set up meaningful observability for production systems",
      "Reason about system design tradeoffs confidently",
      "Plan infrastructure decisions appropriate to SaaS stage"
    ],
    "assessment": "Live production deployment review plus system design document evaluation"
  },
  {
    "number": 18,
    "title": "Capstone Planning & SaaS Product Architecture",
    "overview": "Plan and architect the capstone SaaS product: requirements, data modeling, API design, and UI/UX before building.",
    "objectives": [
      "Define a scoped, buildable SaaS product idea",
      "Design a complete database schema and API contract",
      "Plan authentication, billing and core feature architecture",
      "Create a professional project plan and timeline"
    ],
    "sections": [
      {
        "id": "18.1",
        "title": "Product Scoping",
        "topics": [
          "Identifying a real problem and target user",
          "Defining MVP feature scope vs future roadmap",
          "Writing user stories and acceptance criteria",
          "Competitive analysis of similar SaaS products"
        ]
      },
      {
        "id": "18.2",
        "title": "Technical Architecture Planning",
        "topics": [
          "Choosing the tech stack per feature (FastAPI vs Django, Next.js rendering strategy)",
          "Designing the full database schema with ER diagrams",
          "Designing the REST API contract (endpoints, request/response shapes)",
          "Planning multi-tenancy and role structure"
        ]
      },
      {
        "id": "18.3",
        "title": "UI/UX Planning",
        "topics": [
          "Wireframing key screens (dashboard, billing, settings)",
          "Designing the information architecture/navigation",
          "Establishing a design system (colors, typography, components) in Tailwind",
          "Accessibility considerations for the product"
        ]
      },
      {
        "id": "18.4",
        "title": "Feature & Integration Planning",
        "topics": [
          "Planning payment/subscription tiers and Stripe/Paystack integration",
          "Planning file upload and email touchpoints",
          "Planning background jobs and real-time features needed",
          "Planning testing and deployment strategy for the build phase"
        ]
      },
      {
        "id": "18.5",
        "title": "Project Management",
        "topics": [
          "Breaking the capstone into weekly milestones",
          "Setting up a project board (GitHub Projects/Linear)",
          "Writing a technical README and architecture doc",
          "Risk assessment and scope-cutting strategy"
        ]
      }
    ],
    "exercises": [
      "Write 15+ user stories with acceptance criteria for the capstone idea",
      "Produce a full ER diagram and API contract document",
      "Wireframe 5 key screens of the SaaS product",
      "Create a 2-week milestone plan with a project board"
    ],
    "assignments": [
      "Produce a complete Product Requirements Document (PRD) and technical architecture document for the capstone",
      "Get instructor sign-off on scope, schema, API contract and wireframes before build begins"
    ],
    "projects": [
      "Capstone SaaS Product Requirements & Architecture Document"
    ],
    "outcomes": [
      "Scope a SaaS product realistically for a solo/small team build",
      "Design a coherent schema and API contract upfront",
      "Plan UI/UX before writing code",
      "Manage a multi-week engineering project professionally"
    ],
    "assessment": "Architecture review and scope sign-off session with instructor feedback"
  },
  {
    "number": 19,
    "title": "Capstone Build Sprint",
    "overview": "Execute the planned SaaS capstone: build the backend, frontend, auth, billing, and core features end-to-end following the architecture plan.",
    "objectives": [
      "Implement the planned database schema and API in FastAPI/Django",
      "Build the Next.js frontend consuming the API",
      "Integrate authentication, billing, and core SaaS features",
      "Apply testing and version control discipline throughout the build"
    ],
    "sections": [
      {
        "id": "19.1",
        "title": "Backend Build",
        "topics": [
          "Implementing models, migrations and the database schema",
          "Building all planned API endpoints with validation",
          "Implementing authentication and RBAC per the plan",
          "Integrating Redis caching and Celery background jobs where planned"
        ]
      },
      {
        "id": "19.2",
        "title": "Payments & Integrations Build",
        "topics": [
          "Implementing Stripe/Paystack checkout and webhooks",
          "Implementing file upload features to cloud storage",
          "Implementing transactional email flows",
          "Implementing any real-time/WebSocket features planned"
        ]
      },
      {
        "id": "19.3",
        "title": "Frontend Build",
        "topics": [
          "Building the Next.js App Router pages/layouts per wireframes",
          "Implementing forms with Server Actions and client validation",
          "Building the billing/subscription management UI",
          "Building the dashboard and core feature UI with Tailwind/shadcn"
        ]
      },
      {
        "id": "19.4",
        "title": "Integration & Hardening",
        "topics": [
          "Wiring frontend to backend end-to-end",
          "Writing tests for critical paths (auth, payments, core feature)",
          "Fixing bugs found during integration testing",
          "Performance pass: caching, query optimization, bundle size"
        ]
      },
      {
        "id": "19.5",
        "title": "Deployment & Daily Standups",
        "topics": [
          "Setting up CI/CD for the capstone repo",
          "Deploying staging and production environments",
          "Daily standup check-ins on milestone progress",
          "Adjusting scope pragmatically against the timeline"
        ]
      }
    ],
    "exercises": [
      "Complete and demo the backend API milestone by mid-week",
      "Complete and demo the frontend core screens milestone",
      "Integrate one third-party service (payments or storage) fully",
      "Fix all critical bugs found in a peer testing session"
    ],
    "assignments": [
      "Build the fully functioning SaaS capstone application end-to-end per the approved architecture",
      "Deploy a working staging version of the capstone for peer and instructor testing"
    ],
    "projects": [
      "Working End-to-End SaaS Capstone Application"
    ],
    "outcomes": [
      "Execute a multi-week engineering build against a plan",
      "Integrate a full stack of technologies into one cohesive product",
      "Debug and harden a real application under time pressure",
      "Deliver a deployed, testable product milestone"
    ],
    "assessment": "Mid-sprint and end-of-sprint milestone demos with instructor feedback"
  },
  {
    "number": 20,
    "title": "Capstone Launch, Review & Career Readiness",
    "overview": "Finalize, polish, and present the capstone SaaS product; prepare a professional portfolio and prepare for technical interviews.",
    "objectives": [
      "Polish and launch the capstone SaaS product",
      "Present the project professionally to technical and non-technical audiences",
      "Prepare a portfolio and resume showcasing the work",
      "Prepare for full-stack technical interviews"
    ],
    "sections": [
      {
        "id": "20.1",
        "title": "Final Polish & QA",
        "topics": [
          "Full regression testing of all core flows",
          "UI/UX polish pass (empty states, error states, loading states)",
          "Accessibility audit and fixes",
          "Cross-browser and responsive QA"
        ]
      },
      {
        "id": "20.2",
        "title": "Production Launch",
        "topics": [
          "Final production deployment checklist",
          "Setting up production monitoring/alerts",
          "Domain, SSL and branding finalization",
          "Writing a public-facing README and demo video"
        ]
      },
      {
        "id": "20.3",
        "title": "Portfolio & Personal Branding",
        "topics": [
          "Writing a case study for the capstone project",
          "Updating GitHub profile and pinning key repositories",
          "Building/updating a personal developer portfolio site",
          "Optimizing a LinkedIn profile for tech recruiters"
        ]
      },
      {
        "id": "20.4",
        "title": "Technical Interview Preparation",
        "topics": [
          "Common full-stack system design interview questions",
          "Data structures and algorithms review for coding interviews",
          "Behavioral interview preparation (STAR method)",
          "Mock technical interview session"
        ]
      },
      {
        "id": "20.5",
        "title": "Final Presentation",
        "topics": [
          "Structuring a compelling project demo/pitch",
          "Presenting architecture decisions and tradeoffs",
          "Handling technical Q&A confidently",
          "Peer and instructor final evaluation"
        ]
      }
    ],
    "exercises": [
      "Complete a full QA pass and fix all found issues",
      "Write a portfolio case study for the capstone project",
      "Complete one mock technical interview with feedback",
      "Record a 3-5 minute demo video of the finished product"
    ],
    "assignments": [
      "Deliver the final polished, deployed SaaS capstone product with full documentation",
      "Deliver a live final presentation with architecture walkthrough and Q&A"
    ],
    "projects": [
      "Final Launched SaaS Capstone Product & Portfolio"
    ],
    "outcomes": [
      "Ship a polished, production-quality SaaS product",
      "Present technical work confidently to any audience",
      "Have an interview-ready portfolio and resume",
      "Be ready for full-stack developer job interviews"
    ],
    "assessment": "Final capstone presentation graded on functionality, code quality, architecture and presentation skills"
  }
],
};
