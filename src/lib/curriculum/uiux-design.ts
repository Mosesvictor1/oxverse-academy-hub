import type { CourseCurriculum } from "./types";
import img from "@/assets/curriculum/uiux.jpg";

export const uiuxDesign: CourseCurriculum = {
  slug: "uiux-design",
  title: "UI/UX Design",
  tagline: "Professional Certificate",
  duration: "2 Months (8 Weeks)",
  months: 2,
  totalWeeks: 8,
  level: "Beginner to Job Ready",
  projectsCount: "8+",
  capstone: "1 End-to-End Product Design Case Study",
  goal: "Transform beginners into job-ready UI/UX designers capable of conducting user research, architecting information systems, designing high-fidelity interfaces in Figma, building scalable design systems, validating designs through usability testing, and presenting polished case studies that win interviews.",
  overview: "This 8-week intensive certificate program takes learners from foundational design thinking principles through advanced Figma mastery, visual design theory, accessibility standards, and real-world usability testing. Students build a portfolio of 8+ projects culminating in a complete end-to-end product design case study, mirroring the exact workflow used at top product companies: research, define, ideate, wireframe, prototype, test, and hand off to developers with AI-augmented tooling throughout.",
  image: img,
  weeks: [
    {
      number: 1,
      title: "Design Thinking Foundations & UX Research",
      overview: "Establish the mindset and vocabulary of UX design, then dive into research methods that uncover real user needs before any pixel is drawn.",
      objectives: [
        "Understand the five-stage design thinking process and how it maps to product teams",
        "Differentiate UX, UI, product design, and interaction design roles",
        "Plan and conduct qualitative user research interviews",
        "Synthesize raw research data into actionable insights",
        "Set up a professional design toolkit and workspace"
      ],
      sections: [
        {
          id: "1.1",
          title: "Introduction to Design Thinking",
          topics: [
            "History and evolution of design thinking at IDEO and Stanford d.school",
            "The five stages: Empathize, Define, Ideate, Prototype, Test",
            "Double Diamond model: Discover, Define, Develop, Deliver",
            "Divergent vs convergent thinking exercises",
            "Human-centered design principles",
            "Design thinking vs lean UX vs agile UX",
            "Case study: how Airbnb used design thinking to escape near-bankruptcy",
            "Common myths and misconceptions about design thinking",
            "Mapping design thinking stages to real sprint calendars",
            "Building a personal design thinking canvas"
          ]
        },
        {
          id: "1.2",
          title: "UX vs UI vs Product Design Roles",
          topics: [
            "Defining UX design: research, flows, structure, usability",
            "Defining UI design: visual language, typography, color, layout",
            "Product designer as a hybrid discipline",
            "Interaction designer, service designer, and UX writer specializations",
            "How design roles differ across startups vs enterprises",
            "Reading real job descriptions to decode role expectations",
            "Design team structures: embedded vs centralized",
            "Collaborating with PMs, engineers, and researchers",
            "Career ladder from junior to staff/principal designer",
            "Building your personal role-positioning statement"
          ]
        },
        {
          id: "1.3",
          title: "User Research Fundamentals",
          topics: [
            "Qualitative vs quantitative research methods",
            "Generative research vs evaluative research",
            "Writing effective research goals and screener questions",
            "1:1 user interview structuring and script writing",
            "Avoiding leading questions and confirmation bias",
            "Contextual inquiry and field studies",
            "Surveys: designing unbiased Likert-scale and open questions",
            "Recruiting participants via social media, communities, and panels",
            "Remote research tools: Zoom, Lookback, Maze",
            "Ethics, consent forms, and participant compensation"
          ]
        },
        {
          id: "1.4",
          title: "Synthesizing Research into Insights",
          topics: [
            "Affinity mapping and clustering raw notes",
            "Identifying patterns, pain points, and jobs-to-be-done",
            "Writing insight statements: observation, why, implication",
            "Empathy mapping: says, thinks, does, feels",
            "Prioritizing insights by frequency and impact",
            "Turning insights into How Might We statements",
            "Presenting research findings to stakeholders",
            "Research repositories and knowledge management (Dovetail, Notion)",
            "Avoiding survivorship bias in synthesis",
            "Creating a one-page research summary deck"
          ]
        },
        {
          id: "1.5",
          title: "Setting Up Your Design Toolkit",
          topics: [
            "Figma account setup, workspace, and team organization",
            "Installing Figma desktop app, browser extensions, and plugins",
            "Overview of the design toolchain: Figma, FigJam, Notion, Maze",
            "Organizing project files, pages, and version history",
            "Keyboard shortcuts for speed and efficiency",
            "Setting up a swipe file and inspiration library",
            "Following top designers on Dribbble, Behance, and X",
            "Introduction to AI research assistants for synthesis (ChatGPT, Claude)",
            "Creating your first FigJam research board"
          ]
        }
      ],
      exercises: [
        "Conduct 3 mock user interviews with classmates using a written script",
        "Build an empathy map from a recorded interview transcript",
        "Draft 10 research screener questions for a fictional app",
        "Practice affinity mapping with 30 sticky notes in FigJam",
        "Write 5 How Might We statements from synthesized insights"
      ],
      assignments: [
        "Conduct and document 3 real user interviews for a chosen problem space, delivering a synthesis report with insight statements",
        "Create a FigJam research repository containing interview notes, affinity map, and empathy map for your case study product"
      ],
      projects: [
        "Discovery Research Report: full user research plan, 3 interview transcripts, affinity map, and 5 prioritized insights for a fictional startup"
      ],
      outcomes: [
        "Can articulate the design thinking process fluently to non-designers",
        "Can plan and conduct unbiased qualitative user interviews",
        "Can synthesize messy research data into clear, actionable insights",
        "Has a fully configured Figma and FigJam workspace ready for production work"
      ],
      assessment: "Graded research report submission plus live critique of empathy map and insight statements"
    },
    {
      number: 2,
      title: "Personas, Journey Maps & Information Architecture",
      overview: "Translate research into structured artifacts that guide design decisions, then architect the information structure of digital products.",
      objectives: [
        "Build data-driven personas and proto-personas",
        "Map end-to-end user journeys with emotional highs and lows",
        "Structure content using card sorting and tree testing",
        "Design sitemaps and user flows for complex products",
        "Apply Jobs-to-be-Done framework to feature prioritization"
      ],
      sections: [
        {
          id: "2.1",
          title: "Personas and Proto-Personas",
          topics: [
            "Difference between personas, proto-personas, and user archetypes",
            "Data sources for persona creation: interviews, analytics, surveys",
            "Persona anatomy: goals, frustrations, behaviors, demographics",
            "Avoiding stereotype-driven and biased personas",
            "Creating personas in Figma with reusable templates",
            "Primary vs secondary personas and their use in prioritization",
            "Negative personas: who you are NOT designing for",
            "Validating personas against real user segments",
            "Presenting personas to cross-functional stakeholders",
            "Common persona pitfalls that reduce team trust"
          ]
        },
        {
          id: "2.2",
          title: "User Journey Mapping",
          topics: [
            "Journey map anatomy: stages, actions, thoughts, emotions, touchpoints",
            "Current-state vs future-state journey maps",
            "Mapping emotional highs and lows across a journey curve",
            "Identifying moments of friction and delight",
            "Service blueprints: front-stage vs back-stage processes",
            "Cross-functional journey mapping workshops",
            "Tools: FigJam, Miro, Smaply for journey visualization",
            "Linking journey pain points to design opportunities",
            "Journey mapping for multi-channel and omnichannel products",
            "Presenting journey maps to drive stakeholder alignment"
          ]
        },
        {
          id: "2.3",
          title: "Information Architecture Fundamentals",
          topics: [
            "Principles of organizing systems: hierarchical, sequential, matrix",
            "Card sorting: open vs closed sorting methodologies",
            "Running remote card sorts with Optimal Workshop",
            "Tree testing to validate navigation structures",
            "Taxonomy and labeling systems for content",
            "Mental models and how users categorize information",
            "Navigation patterns: global nav, local nav, breadcrumbs, mega menus",
            "Search vs browse design considerations",
            "Content inventory and audits for existing products",
            "Accessibility considerations in IA (screen reader navigation order)"
          ]
        },
        {
          id: "2.4",
          title: "Sitemaps and User Flows",
          topics: [
            "Sitemap notation and hierarchy diagrams",
            "Building sitemaps in FigJam and Whimsical",
            "User flow diagrams: entry points, decision points, exit points",
            "Task flows vs user flows vs wireflows",
            "Mapping happy paths and edge/error paths",
            "Flowchart shapes and standard UX diagramming conventions",
            "Designing flows for onboarding, checkout, and account creation",
            "Cross-referencing flows against personas and journeys",
            "Validating flows with stakeholders before wireframing",
            "Using AI tools to auto-generate first-draft flow diagrams"
          ]
        },
        {
          id: "2.5",
          title: "Jobs-to-be-Done and Prioritization",
          topics: [
            "JTBD framework: functional, emotional, social jobs",
            "Writing job stories: when I..., I want to..., so I can...",
            "Opportunity scoring: importance vs satisfaction matrix",
            "MoSCoW prioritization (Must, Should, Could, Won't)",
            "RICE scoring for feature prioritization",
            "Aligning JTBD insights with business goals and OKRs",
            "Translating jobs into feature backlogs",
            "Facilitating prioritization workshops with stakeholders"
          ]
        }
      ],
      exercises: [
        "Build a data-driven persona from Week 1 research findings",
        "Create a current-state journey map with emotional curve for an existing app",
        "Run an open card sort with 5 participants and analyze results",
        "Draw a full user flow for a mobile app checkout process",
        "Write 8 job stories and score them using RICE"
      ],
      assignments: [
        "Deliver a complete persona and journey map package for your case study product, including pain point analysis and opportunity list",
        "Produce a validated sitemap and 2 detailed user flows based on card sort and tree test results"
      ],
      projects: [
        "Information Architecture Package: persona, journey map, sitemap, and 2 user flows for a mid-complexity e-commerce or SaaS product"
      ],
      outcomes: [
        "Can construct evidence-based personas that drive team decisions",
        "Can visualize end-to-end journeys and pinpoint friction points",
        "Can structure complex information systems using card sorting and tree testing",
        "Can produce clear sitemaps and user flows ready for wireframing"
      ],
      assessment: "Portfolio review of persona, journey map, sitemap, and user flow deliverables with peer critique"
    },
    {
      number: 3,
      title: "Wireframing & Figma Fundamentals",
      overview: "Move from paper sketches to structured low-fidelity wireframes while mastering Figma's core interface and layout tools.",
      objectives: [
        "Sketch rapid low-fidelity wireframes using the Crazy 8s method",
        "Master Figma's frames, layers, grids, and layout basics",
        "Build wireframes with proper hierarchy and whitespace",
        "Use constraints and auto layout for responsive structures",
        "Present wireframes for stakeholder feedback and iteration"
      ],
      sections: [
        {
          id: "3.1",
          title: "Rapid Sketching and Ideation",
          topics: [
            "Crazy 8s sketching exercise for rapid ideation",
            "Paper wireframing tools and techniques",
            "Low-fi vs mid-fi vs hi-fi fidelity spectrum",
            "Sketching for mobile-first vs desktop-first thinking",
            "Storyboarding key user scenarios",
            "Dot voting and rapid concept selection with teams",
            "Translating sketches into digital wireframes",
            "Common sketching mistakes beginners make",
            "Building a sketch-to-Figma workflow"
          ]
        },
        {
          id: "3.2",
          title: "Figma Interface Deep Dive",
          topics: [
            "Figma workspace anatomy: canvas, layers panel, properties panel",
            "Frames vs groups vs sections",
            "Creating and customizing artboards for web, tablet, mobile",
            "Layer naming conventions and organization best practices",
            "Alignment, distribution, and smart guides",
            "Using rulers, grids, and layout guides",
            "Pages and file structure for scalable projects",
            "Comments and collaboration features",
            "Version history and branching in Figma",
            "Plugins overview: Content Reel, Unsplash, Iconify"
          ]
        },
        {
          id: "3.3",
          title: "Layout Grids and Structure",
          topics: [
            "8-point grid system fundamentals",
            "Column grids, row grids, and grid overlays",
            "Responsive breakpoints: mobile, tablet, desktop",
            "Margins, gutters, and padding conventions",
            "Establishing visual hierarchy through layout",
            "Whitespace as a design tool",
            "F-pattern and Z-pattern scanning layouts",
            "Building consistent spacing scales",
            "Applying grids across multiple wireframe screens"
          ]
        },
        {
          id: "3.4",
          title: "Constraints and Auto Layout Basics",
          topics: [
            "Constraint types: left, right, center, scale, stretch",
            "Introduction to Auto Layout: direction, spacing, padding",
            "Resizing behavior: fixed, hug contents, fill container",
            "Nesting auto layout frames for complex components",
            "Building a responsive navigation bar with auto layout",
            "Using auto layout for lists and repeating content",
            "Absolute positioning within auto layout frames",
            "Common auto layout errors and how to debug them"
          ]
        },
        {
          id: "3.5",
          title: "Low-Fidelity Wireframe Production",
          topics: [
            "Wireframing common UI patterns: forms, cards, navigation, modals",
            "Annotating wireframes for developer and stakeholder clarity",
            "Building a wireframe kit of reusable low-fi shapes",
            "Wireframing full page flows: homepage to checkout",
            "Reviewing wireframes against personas and JTBD",
            "Preparing wireframes for stakeholder walkthroughs",
            "Iterating wireframes based on feedback rounds",
            "Exporting and sharing wireframes via Figma links"
          ]
        }
      ],
      exercises: [
        "Complete a Crazy 8s sketching sprint for a new feature idea",
        "Rebuild 5 hand-sketched screens as digital low-fi wireframes in Figma",
        "Practice auto layout by building 3 responsive card components",
        "Apply an 8-point grid system to an existing wireframe",
        "Annotate a wireframe flow for developer handoff"
      ],
      assignments: [
        "Produce a complete low-fidelity wireframe set (8-10 screens) for your case study product covering the primary user flow",
        "Conduct a peer wireframe review session and document 5 iteration changes made from feedback"
      ],
      projects: [
        "Low-Fidelity Wireframe Kit: full wireframe flow with grid system, annotations, and auto-layout-based responsive components for a SaaS dashboard"
      ],
      outcomes: [
        "Can rapidly sketch and digitize wireframe concepts",
        "Is fluent in Figma's frame, layer, and grid systems",
        "Can build responsive layouts using constraints and auto layout",
        "Can produce annotated wireframes ready for stakeholder review"
      ],
      assessment: "Live Figma walkthrough presenting wireframe flow and design rationale"
    },
    {
      number: 4,
      title: "Visual Design Foundations",
      overview: "Develop a strong visual design foundation covering typography, color theory, iconography, and imagery to elevate wireframes into polished interfaces.",
      objectives: [
        "Apply typography principles including scale, hierarchy, and pairing",
        "Build accessible, purposeful color palettes and systems",
        "Use iconography, illustration, and imagery consistently",
        "Understand Gestalt principles and visual hierarchy",
        "Create a cohesive mood board and style tile"
      ],
      sections: [
        {
          id: "4.1",
          title: "Typography Principles",
          topics: [
            "Typeface anatomy: serif, sans-serif, slab, display",
            "Type scale and modular scale ratios (1.25, 1.333, 1.5)",
            "Font pairing strategies: contrast and harmony",
            "Line height, letter spacing, and paragraph width best practices",
            "Web-safe fonts, Google Fonts, and variable fonts",
            "Establishing heading and body text hierarchy",
            "Type accessibility: minimum sizes and contrast ratios",
            "Setting up Figma text styles for reusable typography",
            "Responsive typography across breakpoints",
            "Common typography mistakes in UI design"
          ]
        },
        {
          id: "4.2",
          title: "Color Theory and Palette Systems",
          topics: [
            "Color wheel fundamentals: hue, saturation, lightness",
            "Complementary, analogous, triadic color schemes",
            "Building a semantic color system: primary, secondary, success, error, warning",
            "Color accessibility and WCAG contrast ratio requirements",
            "Dark mode color palette considerations",
            "Using tools like Coolors, Huemint, and Figma variables for palettes",
            "Emotional and cultural associations of color",
            "Creating tints, shades, and tonal scales (50-900)",
            "Applying color consistently across components",
            "Color-blind-safe design practices"
          ]
        },
        {
          id: "4.3",
          title: "Iconography, Illustration, and Imagery",
          topics: [
            "Icon design principles: grid alignment, stroke weight, consistency",
            "Sourcing and customizing icon libraries (Phosphor, Lucide, Feather)",
            "Illustration styles: flat, isometric, hand-drawn, 3D",
            "Selecting and licensing stock photography ethically",
            "Image treatment: cropping, filters, overlays for consistency",
            "Using AI image generation tools (Midjourney, DALL-E) for concept art",
            "Building an icon and imagery library in Figma",
            "Balancing illustration style with brand personality",
            "Optimizing images for web performance"
          ]
        },
        {
          id: "4.4",
          title: "Gestalt Principles and Visual Hierarchy",
          topics: [
            "Proximity, similarity, and continuity principles",
            "Figure-ground relationships in interface design",
            "Closure and common region grouping",
            "Establishing focal points through size, color, and contrast",
            "Visual weight and balance in composition",
            "Using alignment to create implicit relationships",
            "Progressive disclosure to manage complexity",
            "Applying hierarchy to CTAs and conversion-critical elements"
          ]
        },
        {
          id: "4.5",
          title: "Mood Boards and Style Tiles",
          topics: [
            "Purpose of mood boards in the design process",
            "Gathering visual references from Dribbble, Behance, Pinterest",
            "Building a style tile: colors, type, buttons, imagery sample",
            "Translating brand guidelines into design decisions",
            "Presenting mood boards for stakeholder alignment",
            "A/B testing visual directions with quick surveys",
            "Iterating style tiles based on feedback",
            "Transitioning from style tile to full UI kit"
          ]
        }
      ],
      exercises: [
        "Build a modular type scale and apply it to 5 heading levels",
        "Create a semantic color palette with accessible contrast ratios in Figma variables",
        "Design a custom icon set of 10 icons following an 24px grid",
        "Redesign a poorly composed screen applying Gestalt principles",
        "Produce 2 competing mood boards for the same product brief"
      ],
      assignments: [
        "Develop a complete visual style tile (typography, color, iconography, imagery) for your case study product",
        "Redesign 3 low-fidelity wireframes from Week 3 into styled mid-fidelity screens using your new style tile"
      ],
      projects: [
        "Visual Design System Starter: type scale, color palette with variables, icon set, and style tile ready for high-fidelity UI"
      ],
      outcomes: [
        "Can construct accessible, scalable typography and color systems",
        "Can apply Gestalt principles to improve visual hierarchy",
        "Can produce professional mood boards and style tiles",
        "Has translated wireframes into visually styled mid-fidelity screens"
      ],
      assessment: "Design critique session evaluating typography, color accessibility, and visual hierarchy of submitted screens"
    },
    {
      number: 5,
      title: "Advanced Figma & Design Systems",
      overview: "Master component-driven design at scale: components, variants, variables, and the construction of a production-grade design system.",
      objectives: [
        "Build reusable components with properties and variants",
        "Implement Figma variables for scalable theming",
        "Architect a token-based design system from scratch",
        "Design and document component states and behaviors",
        "Organize a team library for cross-project reuse"
      ],
      sections: [
        {
          id: "5.1",
          title: "Components and Variants",
          topics: [
            "Creating main components vs instances",
            "Component properties: boolean, instance swap, text, variant",
            "Building button variants: primary, secondary, ghost, destructive",
            "Nested components and instance overrides",
            "Detaching instances and when it's appropriate",
            "Component states: default, hover, active, focus, disabled",
            "Building complex components: cards, modals, form fields",
            "Swapping icons and content via instance swap properties",
            "Organizing components with the assets panel",
            "Naming conventions for scalable component libraries"
          ]
        },
        {
          id: "5.2",
          title: "Figma Variables and Tokens",
          topics: [
            "Introduction to Figma variables: color, number, string, boolean",
            "Creating color variable collections with light/dark modes",
            "Spacing and sizing tokens using number variables",
            "Typography tokens and text style linking",
            "Aliasing variables for semantic naming (bg-primary, text-danger)",
            "Applying variables across components for global theming",
            "Syncing design tokens with code (Tokens Studio plugin)",
            "Mode switching for multi-brand or multi-theme products",
            "Variable scoping and best practices",
            "Migrating legacy styles to a variable-based system"
          ]
        },
        {
          id: "5.3",
          title: "Building a Design System",
          topics: [
            "Design system vs style guide vs component library",
            "Foundations: color, typography, spacing, elevation, iconography",
            "Atomic design methodology: atoms, molecules, organisms, templates",
            "Component documentation: usage, do's and don'ts, accessibility notes",
            "Governance models: centralized vs federated contribution",
            "Versioning and changelogs for design systems",
            "Studying real-world systems: Material Design, Carbon, Polaris",
            "Naming and file structure for enterprise-scale libraries",
            "Publishing and maintaining a Figma team library",
            "Measuring design system adoption and health"
          ]
        },
        {
          id: "5.4",
          title: "Advanced Auto Layout and Interactive Components",
          topics: [
            "Advanced auto layout: wrap, absolute position, min/max width",
            "Interactive components: hover, click, drag states directly in Figma",
            "Building accordions, tabs, and dropdown menus with interactive components",
            "Conditional visibility using boolean properties",
            "Building a responsive navbar that adapts across breakpoints",
            "Combining variables and variants for dynamic theming demos",
            "Performance considerations for large component files",
            "Testing components across multiple screen sizes"
          ]
        },
        {
          id: "5.5",
          title: "Team Libraries and Collaboration Workflows",
          topics: [
            "Publishing a library and managing library updates",
            "Branching and merging design files for parallel workstreams",
            "Dev Mode overview for cross-functional collaboration",
            "Setting up shared styles across multiple project files",
            "Establishing a design QA checklist before publishing",
            "Managing component deprecation and migration",
            "Onboarding new designers to an existing design system",
            "Using Figma organization and project permissions effectively"
          ]
        }
      ],
      exercises: [
        "Build a button component with 4 variants and all interaction states",
        "Set up a color variable collection with light and dark mode",
        "Construct an atomic-design-based component sheet: atoms to organisms",
        "Create an interactive accordion component using interactive components",
        "Publish a mini component library and reuse it in a separate file"
      ],
      assignments: [
        "Build a foundational design system (colors, type, spacing tokens, 15+ components with variants) for your case study product",
        "Document your design system with usage guidelines and accessibility notes in a Figma or Notion page"
      ],
      projects: [
        "Production Design System: token-based color/typography/spacing system, 15+ documented components with variants and states, published as a Figma team library"
      ],
      outcomes: [
        "Can build scalable, variant-driven component libraries",
        "Can implement token-based theming using Figma variables",
        "Can architect and document a design system following atomic design",
        "Can publish and maintain a team library for cross-project use"
      ],
      assessment: "Technical review of design system architecture, component quality, and documentation completeness"
    },
    {
      number: 6,
      title: "High-Fidelity UI, Prototyping & Accessibility",
      overview: "Translate design systems into polished high-fidelity screens, build interactive prototypes, and ensure every design meets accessibility standards.",
      objectives: [
        "Design pixel-perfect high-fidelity screens using the design system",
        "Build multi-screen interactive prototypes with realistic transitions",
        "Apply WCAG 2.2 accessibility guidelines to real interfaces",
        "Design for mobile-first and responsive breakpoints",
        "Conduct an accessibility audit on an existing product"
      ],
      sections: [
        {
          id: "6.1",
          title: "High-Fidelity Screen Design",
          topics: [
            "Converting mid-fi wireframes into hi-fi screens using components",
            "Maintaining pixel-perfect consistency with the 8-point grid",
            "Designing empty states, loading states, and error states",
            "Micro-copy and UX writing for clarity and tone",
            "Designing data-dense interfaces: tables, dashboards, charts",
            "Onboarding flow design best practices",
            "Form design: validation, error messaging, multi-step forms",
            "Designing for scannability with progressive disclosure",
            "Consistency checks across a full screen set",
            "Using AI UI generation tools (Galileo, Uizard) for rapid drafts"
          ]
        },
        {
          id: "6.2",
          title: "Prototyping in Figma",
          topics: [
            "Prototype connections: navigate, open overlay, swap variant",
            "Transition types: instant, dissolve, smart animate, push, slide",
            "Smart animate for micro-interactions and state changes",
            "Building multi-step flows with conditional logic (variables in prototypes)",
            "Overlay design for modals, tooltips, and dropdowns",
            "Scroll behavior and fixed elements in prototypes",
            "Device frames and prototype presentation settings",
            "Sharing interactive prototypes for stakeholder review",
            "Embedding prototypes in portfolios and case studies",
            "Prototyping voice and gesture-based interactions conceptually"
          ]
        },
        {
          id: "6.3",
          title: "Accessibility (WCAG) Fundamentals",
          topics: [
            "WCAG 2.2 POUR principles: Perceivable, Operable, Understandable, Robust",
            "Conformance levels: A, AA, AAA",
            "Color contrast requirements for text and UI components",
            "Designing for screen readers: alt text, ARIA labels, reading order",
            "Keyboard navigation and focus state design",
            "Touch target sizing (minimum 44x44px) for mobile accessibility",
            "Designing for low vision, color blindness, and motor impairments",
            "Captions, transcripts, and multimedia accessibility",
            "Accessible form design: labels, error identification, instructions",
            "Using accessibility plugins: Stark, Contrast, A11y Annotation Kit"
          ]
        },
        {
          id: "6.4",
          title: "Mobile-First and Responsive Design",
          topics: [
            "Mobile-first design philosophy and rationale",
            "Breakpoint strategy: 375px, 768px, 1024px, 1440px",
            "Touch-friendly interaction patterns vs mouse/keyboard patterns",
            "Adaptive vs responsive vs fluid layouts",
            "Navigation pattern shifts: hamburger menu vs full nav",
            "Designing thumb-zone-friendly mobile layouts",
            "Handling images and media across device sizes",
            "Testing designs across real device previews (Figma Mirror)",
            "Cross-platform consistency: iOS Human Interface Guidelines vs Material Design"
          ]
        },
        {
          id: "6.5",
          title: "Accessibility Auditing",
          topics: [
            "Conducting a heuristic accessibility audit",
            "Automated accessibility testing tools (axe, Lighthouse, WAVE)",
            "Manual screen reader testing (VoiceOver, NVDA)",
            "Writing an accessibility audit report with severity ratings",
            "Prioritizing accessibility fixes by impact and effort",
            "Presenting accessibility findings to product stakeholders",
            "Building an accessibility checklist for future projects"
          ]
        }
      ],
      exercises: [
        "Convert 5 mid-fi wireframes into full hi-fi screens using your design system",
        "Build a 10-screen interactive prototype with smart animate transitions",
        "Run an automated accessibility scan on a live website and log all issues",
        "Redesign a form to meet WCAG AA contrast and labeling requirements",
        "Test a prototype using only keyboard navigation and document friction points"
      ],
      assignments: [
        "Deliver a complete high-fidelity, fully prototyped flow (12+ screens) for your case study product including empty, loading, and error states",
        "Produce a written accessibility audit of your own prototype with prioritized fixes implemented"
      ],
      projects: [
        "Interactive High-Fidelity Prototype: fully clickable prototype with smart animate transitions, responsive breakpoints, and WCAG AA-compliant screens"
      ],
      outcomes: [
        "Can produce pixel-perfect, production-ready high-fidelity screens",
        "Can build realistic, multi-screen interactive prototypes",
        "Can apply and audit designs against WCAG 2.2 AA standards",
        "Can design responsive, mobile-first interfaces across breakpoints"
      ],
      assessment: "End-to-end prototype demo plus written accessibility audit graded against a WCAG checklist rubric"
    },
    {
      number: 7,
      title: "Usability Testing, Developer Handoff & AI Design Tools",
      overview: "Validate designs with real users, prepare pixel-precise developer handoff documentation, and integrate AI tools into an efficient modern design workflow.",
      objectives: [
        "Plan and moderate usability testing sessions",
        "Analyze usability findings and iterate designs accordingly",
        "Prepare comprehensive developer handoff using Figma Dev Mode",
        "Integrate AI tools for research synthesis, content, and rapid prototyping",
        "Understand basic front-end concepts to communicate effectively with engineers"
      ],
      sections: [
        {
          id: "7.1",
          title: "Usability Testing Planning",
          topics: [
            "Types of usability testing: moderated, unmoderated, guerrilla",
            "Writing test plans: objectives, tasks, success metrics",
            "Recruiting 5 participants per Nielsen's usability research guidance",
            "Task scenario writing that avoids leading users",
            "Setting up tests in Maze, UserTesting, or Lookback",
            "In-person vs remote testing logistics",
            "Think-aloud protocol facilitation techniques",
            "Pilot testing your test plan before full rollout",
            "Preparing consent forms and session recording setup"
          ]
        },
        {
          id: "7.2",
          title: "Moderating and Analyzing Usability Tests",
          topics: [
            "Moderator best practices: neutral language, active listening",
            "Handling silence, confusion, and off-script tangents",
            "Recording task success, time-on-task, and error rates",
            "System Usability Scale (SUS) scoring and interpretation",
            "Affinity mapping usability findings across sessions",
            "Severity rating usability issues (critical, major, minor, cosmetic)",
            "Writing a usability test report with video clips and quotes",
            "Presenting findings and recommended design changes to stakeholders",
            "Planning iteration sprints based on test results"
          ]
        },
        {
          id: "7.3",
          title: "Design Iteration and Validation",
          topics: [
            "Prioritizing fixes from usability findings using severity and effort",
            "Rapid iteration cycles: redesign, retest, repeat",
            "A/B testing design variations with tools like Optimizely concepts",
            "Before/after comparison documentation for portfolios",
            "Validating fixes with a second round of lightweight testing",
            "Communicating iteration rationale to stakeholders",
            "Balancing user feedback with business constraints"
          ]
        },
        {
          id: "7.4",
          title: "Developer Handoff with Figma Dev Mode",
          topics: [
            "Figma Dev Mode overview: inspect panel, code snippets",
            "Exporting assets: SVG, PNG, PDF at correct resolutions",
            "Specifying spacing, sizing, and color values precisely",
            "Generating CSS, iOS, and Android code snippets from Dev Mode",
            "Annotating interaction and animation specs for engineers",
            "Creating a redlines document for legacy handoff needs",
            "Setting up a shared status tracker (ready for dev, in progress, done)",
            "Running a design QA pass on built features against Figma specs",
            "Communicating edge cases and responsive behavior to developers",
            "Using plugins like Zeplin or Figma's native handoff features"
          ]
        },
        {
          id: "7.5",
          title: "AI Tools in the Modern Design Workflow",
          topics: [
            "AI research synthesis tools: Dovetail AI, Notion AI summarization",
            "AI content generation for microcopy and placeholder text",
            "AI image and illustration generation (Midjourney, DALL-E, Adobe Firefly)",
            "AI-assisted UI generation tools: Galileo AI, Uizard, v0",
            "Figma AI features: rename layers, generate designs, first draft",
            "Using ChatGPT/Claude for user persona brainstorming and critique",
            "AI-powered accessibility checking tools",
            "Ethical considerations and limitations of AI in design",
            "Building an efficient AI-augmented design workflow without losing craft"
          ]
        }
      ],
      exercises: [
        "Write a full usability test plan with 5 task scenarios for your case study product",
        "Moderate a usability test session with a classmate and log findings using SUS scoring",
        "Prepare a Dev Mode handoff package for 3 screens including code snippets and assets",
        "Use an AI tool to generate 3 UI concept variations and evaluate their quality critically",
        "Iterate one screen based on usability findings and document the before/after"
      ],
      assignments: [
        "Conduct 5 usability testing sessions on your prototype, analyze results with SUS scoring, and produce a full usability report with prioritized recommendations",
        "Prepare complete developer handoff documentation in Figma Dev Mode for your entire case study flow"
      ],
      projects: [
        "Usability Testing & Handoff Package: full test plan, 5 session reports, SUS analysis, iterated designs, and Dev Mode-ready handoff documentation"
      ],
      outcomes: [
        "Can plan, moderate, and analyze usability testing sessions independently",
        "Can iterate designs confidently based on quantitative and qualitative feedback",
        "Can prepare professional, precise developer handoff documentation",
        "Can integrate AI tools responsibly into a modern design workflow"
      ],
      assessment: "Usability test report review plus a mock developer handoff walkthrough evaluated for completeness"
    },
    {
      number: 8,
      title: "Portfolio, Case Study Writing & Capstone",
      overview: "Consolidate all skills into a polished capstone case study and a professional portfolio ready to win real design interviews.",
      objectives: [
        "Structure and write a compelling UX case study",
        "Build a professional portfolio website showcasing 3-5 projects",
        "Complete an end-to-end capstone product design case study",
        "Prepare for design portfolio reviews and interview presentations",
        "Develop a job search and networking strategy for design roles"
      ],
      sections: [
        {
          id: "8.1",
          title: "Case Study Writing Fundamentals",
          topics: [
            "Case study structure: problem, process, solution, impact",
            "Writing a compelling hook and project overview",
            "Balancing storytelling with process transparency",
            "Highlighting your specific role and contributions in team projects",
            "Showing process artifacts: research, sketches, iterations",
            "Quantifying impact with metrics (even estimated/simulated ones)",
            "Writing about failures and pivots authentically",
            "Common case study mistakes recruiters flag immediately",
            "Studying strong case study examples from hired designers",
            "Tailoring case study depth for portfolio vs interview presentation"
          ]
        },
        {
          id: "8.2",
          title: "Portfolio Website Design and Build",
          topics: [
            "Portfolio platforms: Framer, Webflow, Notion, personal code sites",
            "Structuring a portfolio homepage for maximum impact in 5 seconds",
            "Selecting the right 3-5 projects to showcase depth over breadth",
            "Writing an effective About page and personal brand statement",
            "Designing a resume tailored for UI/UX roles",
            "SEO and discoverability basics for design portfolios",
            "Mobile-responsive portfolio considerations",
            "Getting portfolio feedback and iterating before launch",
            "Publishing and sharing your portfolio link professionally"
          ]
        },
        {
          id: "8.3",
          title: "Capstone Project: Discovery and Design",
          topics: [
            "Selecting a capstone problem space with real-world relevance",
            "Running the full research phase: interviews, personas, journey maps",
            "Defining the problem statement and success metrics",
            "Producing information architecture and user flows",
            "Building low-fi to hi-fi wireframes using a custom design system",
            "Applying accessibility and responsive design principles throughout",
            "Building a fully interactive prototype with smart animate",
            "Incorporating AI tools appropriately across the workflow"
          ]
        },
        {
          id: "8.4",
          title: "Capstone Project: Validation and Handoff",
          topics: [
            "Running usability tests on the capstone prototype",
            "Iterating designs based on test findings",
            "Preparing final developer handoff documentation",
            "Documenting the complete design system used",
            "Writing the full case study narrative for the capstone",
            "Creating supporting visuals: before/after, flow diagrams, metrics",
            "Recording a video walkthrough of the final prototype",
            "Preparing a slide deck summary for presentation day"
          ]
        },
        {
          id: "8.5",
          title: "Interview Preparation and Job Search Strategy",
          topics: [
            "Common UX interview formats: portfolio review, whiteboard challenge, take-home",
            "Practicing the STAR method for behavioral design questions",
            "Presenting a case study confidently in 10 minutes",
            "Handling tough critique and feedback gracefully in interviews",
            "Networking strategies: LinkedIn optimization, design communities, meetups",
            "Applying strategically: job boards, referrals, cold outreach templates",
            "Negotiating offers and understanding design role leveling",
            "Continuing education: staying current with design trends and tools"
          ]
        }
      ],
      exercises: [
        "Write a first draft case study for one Week 1-7 project",
        "Critique 3 published UX portfolios and note strengths/weaknesses",
        "Draft your portfolio homepage wireframe and value proposition statement",
        "Practice a 10-minute mock case study presentation with a peer",
        "Record a 2-minute video walkthrough of your capstone prototype"
      ],
      assignments: [
        "Complete an end-to-end capstone case study covering research through handoff, fully documented and prototyped",
        "Publish a live portfolio website featuring the capstone plus 2-4 supporting projects from the course"
      ],
      projects: [
        "Capstone Case Study: complete end-to-end product design case study including research, IA, design system, hi-fi prototype, usability testing, and dev handoff",
        "Professional Portfolio Website: live, published portfolio showcasing 3-5 projects with written case studies and resume"
      ],
      outcomes: [
        "Can write and present a compelling, structured UX case study",
        "Has a live, professional portfolio website ready to share with employers",
        "Has completed a full end-to-end capstone demonstrating mastery of the entire UX process",
        "Is prepared to confidently navigate UX design interviews and job search strategy"
      ],
      assessment: "Final capstone presentation and portfolio review board simulating a real design job interview panel"
    }
  ]
};
