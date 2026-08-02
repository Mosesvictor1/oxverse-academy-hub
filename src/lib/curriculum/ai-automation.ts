import type { CourseCurriculum } from "./types";
import img from "@/assets/curriculum/ai-automation.jpg";

export const aiAutomation: CourseCurriculum = {
  slug: "ai-automation",
  title: "AI Automation",
  tagline: "AI Track (1 of 3)",
  duration: "2 Months (8 Weeks)",
  months: 2,
  totalWeeks: 8,
  level: "Beginner to Job Ready",
  projectsCount: "10+",
  capstone: "1 Business Automation System",
  goal: "Transform learners into job-ready AI Automation specialists who can design, build, deploy, and sell end-to-end automation systems using LLMs, no-code platforms, APIs, and AI agents for real businesses.",
  overview: "An intensive 8-week hands-on program covering AI fundamentals, prompt engineering, no-code automation platforms (n8n, Make, Zapier), API integrations, AI agents, RAG chatbots, messaging bot deployment, customer support and sales automation, web scraping, workflow monitoring, and how to package and sell automation services as a freelance or agency offering. Learners finish with a portfolio of 10+ working automations and one capstone business automation system.",
  image: img,
  weeks: [
    {
      number: 1,
      title: "AI Fundamentals, LLMs, and Prompt Engineering Mastery",
      overview: "Build a rock-solid foundation in how modern AI works and learn to communicate with LLMs like a professional prompt engineer.",
      objectives: [
        "Explain how large language models generate text and where they fail",
        "Differentiate between ChatGPT, Claude, Gemini, and open-source LLMs by strengths and pricing",
        "Write structured, reusable prompts using proven prompt engineering frameworks",
        "Set up accounts, API keys, and workspaces for the major AI platforms",
        "Identify real-world business problems solvable with AI automation"
      ],
      sections: [
        {
          id: "1.1",
          title: "How AI and LLMs Actually Work",
          topics: [
            "What is artificial intelligence vs machine learning vs deep learning",
            "Neural networks explained in plain language",
            "Tokens, embeddings, and vector representations of text",
            "Transformer architecture at a conceptual level",
            "Training vs inference: what happens when you send a prompt",
            "Context windows and why they limit conversations",
            "Hallucinations: why AI makes things up and how to reduce it",
            "Model temperature, top-p, and randomness controls",
            "Multimodal AI: text, image, audio, and video generation",
            "Open-source vs closed-source models (Llama, Mistral, GPT, Claude)",
            "Understanding AI limitations: math, real-time data, bias",
            "The AI landscape in 2026: major players and market shifts"
          ]
        },
        {
          id: "1.2",
          title: "Comparing ChatGPT, Claude, Gemini and Tools",
          topics: [
            "ChatGPT interface, GPT-4o/GPT-5 class models, custom GPTs",
            "Claude by Anthropic: strengths in reasoning and long documents",
            "Google Gemini: multimodal capabilities and Workspace integration",
            "Perplexity for research and citation-backed answers",
            "Open-source options: Llama, Mistral, running local models",
            "Free tier vs paid tier feature comparison",
            "Choosing the right model for a given business task",
            "API access differences across providers",
            "Rate limits, context length, and cost per token comparison",
            "Setting up multi-model workflows for redundancy"
          ]
        },
        {
          id: "1.3",
          title: "Prompt Engineering Frameworks",
          topics: [
            "Anatomy of a great prompt: role, context, task, format, constraints",
            "Zero-shot vs few-shot vs chain-of-thought prompting",
            "The RTF (Role-Task-Format) framework",
            "The CRISPE framework for complex prompts",
            "System prompts vs user prompts vs assistant messages",
            "Prompt chaining for multi-step reasoning",
            "Using delimiters and structured output (JSON, markdown, XML)",
            "Negative prompting and constraint setting",
            "Iterative refinement: testing and improving prompts",
            "Prompt libraries and reusable templates for business tasks",
            "Common prompt engineering mistakes and how to avoid them",
            "Evaluating output quality objectively"
          ]
        },
        {
          id: "1.4",
          title: "Environment Setup and Account Configuration",
          topics: [
            "Creating OpenAI, Anthropic, and Google AI Studio accounts",
            "Generating and securing API keys",
            "Understanding billing, usage dashboards, and cost tracking",
            "Setting up a password manager for credential storage",
            "Installing and configuring VS Code for automation projects",
            "Creating a GitHub account and first repository",
            "Setting up Postman for API testing",
            "Environment variables and .env file basics"
          ]
        },
        {
          id: "1.5",
          title: "Identifying Business Automation Opportunities",
          topics: [
            "Mapping repetitive manual tasks in a typical small business",
            "Interviewing a business owner to uncover automation needs",
            "Categorizing automations: data entry, communication, reporting",
            "Estimating time and cost savings from automation",
            "Building a simple automation opportunity audit checklist",
            "Case studies of real businesses saving 10+ hours/week with AI"
          ]
        }
      ],
      exercises: [
        "Write 15 prompts using the RTF framework for different business scenarios",
        "Compare outputs from ChatGPT, Claude, and Gemini on the same 5 prompts",
        "Build a personal prompt template library with 10 reusable templates",
        "Set up API keys for OpenAI, Anthropic, and Google and test each in Postman",
        "Conduct a mock automation audit interview with a classmate"
      ],
      assignments: [
        "Submit a 3-page prompt engineering playbook with before/after prompt examples",
        "Deliver a written automation opportunity audit for a real or fictional small business"
      ],
      projects: [
        "Build a 'Prompt Library' Notion or Google Doc with 20 categorized, tested prompts for content, support, and sales use cases"
      ],
      outcomes: [
        "Learners understand the mechanics and limitations of modern LLMs",
        "Learners can write precise, structured prompts consistently",
        "Learners have working accounts and API access across major AI platforms",
        "Learners can identify and articulate automation opportunities in a business"
      ],
      assessment: "Written quiz on LLM concepts plus practical prompt engineering test graded on structure, clarity, and output quality"
    },
    {
      number: 2,
      title: "No-Code Automation Platforms: n8n, Make, and Zapier",
      overview: "Master the three leading no-code automation platforms and learn to build multi-step workflows that connect apps and AI models.",
      objectives: [
        "Navigate and build workflows in n8n, Make, and Zapier confidently",
        "Understand triggers, actions, filters, and data mapping across platforms",
        "Choose the right platform based on client needs, cost, and complexity",
        "Debug broken workflows using execution logs",
        "Build a self-hosted n8n instance for cost-free automation development"
      ],
      sections: [
        {
          id: "2.1",
          title: "n8n Deep Dive",
          topics: [
            "Installing n8n locally with Docker vs using n8n Cloud",
            "Understanding the n8n canvas, nodes, and connections",
            "Trigger nodes: webhook, schedule, manual, form trigger",
            "Core nodes: HTTP Request, Set, IF, Switch, Merge",
            "Working with the Code node (JavaScript) for custom logic",
            "Expressions and the n8n data structure (JSON items)",
            "Error workflows and retry logic",
            "Credentials management and reusable connections",
            "Sub-workflows and modular automation design",
            "Exporting, importing, and version-controlling workflows",
            "n8n pricing model and self-hosting cost savings",
            "Community nodes and custom node installation"
          ]
        },
        {
          id: "2.2",
          title: "Make (formerly Integromat) Mastery",
          topics: [
            "Make interface: scenarios, modules, and routers",
            "Understanding operations and pricing tiers",
            "Building multi-branch scenarios with routers and filters",
            "Iterators and aggregators for array data handling",
            "Data stores for lightweight persistent storage",
            "Error handlers: resume, break, retry, ignore",
            "Scheduling scenarios and controlling execution frequency",
            "Using the HTTP module for custom API calls",
            "Webhooks in Make: instant triggers from external apps",
            "Cloning, templating, and organizing scenarios for clients"
          ]
        },
        {
          id: "2.3",
          title: "Zapier for Rapid Business Automations",
          topics: [
            "Zaps, triggers, and actions explained",
            "Multi-step Zaps and Paths for conditional logic",
            "Formatter and Filter steps for data transformation",
            "Zapier Tables and Interfaces for lightweight apps",
            "Zapier AI actions and built-in ChatGPT integration",
            "Connecting Zapier with 6000+ apps via native integrations",
            "Task history, error alerts, and troubleshooting failed Zaps",
            "Pricing tiers and when Zapier is the right choice for a client"
          ]
        },
        {
          id: "2.4",
          title: "Choosing the Right Platform and Cost Analysis",
          topics: [
            "Feature comparison matrix: n8n vs Make vs Zapier",
            "Cost-per-operation analysis for client budgets",
            "Self-hosted vs cloud tradeoffs (control, uptime, maintenance)",
            "Migrating a workflow between platforms",
            "Hybrid approaches: combining platforms for complex needs",
            "Client presentation: recommending a platform based on requirements"
          ]
        },
        {
          id: "2.5",
          title: "Debugging and Workflow Design Principles",
          topics: [
            "Reading execution logs and identifying failure points",
            "Naming conventions and documentation inside workflows",
            "Designing for idempotency to avoid duplicate actions",
            "Testing workflows safely with sandbox data",
            "Version control strategies for no-code workflows",
            "Building reusable workflow templates"
          ]
        }
      ],
      exercises: [
        "Build the same 'new email to Slack notification' workflow in n8n, Make, and Zapier",
        "Create a multi-branch Make scenario using a router with 3 conditional paths",
        "Build an n8n workflow that uses the Code node to transform JSON data",
        "Intentionally break a workflow and practice reading logs to fix it",
        "Create a comparison spreadsheet scoring each platform on 8 criteria"
      ],
      assignments: [
        "Submit a working self-hosted n8n instance with 2 completed workflows exported as JSON",
        "Write a 1-page platform recommendation memo for a hypothetical client with a $50/month budget"
      ],
      projects: [
        "Build an automated lead capture workflow: Google Form to Airtable to Slack notification to auto-reply email, replicated across n8n and Make"
      ],
      outcomes: [
        "Learners can independently build multi-step workflows on all three platforms",
        "Learners can debug and fix broken automations using execution logs",
        "Learners can recommend the right tool based on client budget and complexity",
        "Learners have a self-hosted n8n environment ready for production use"
      ],
      assessment: "Timed practical exam: rebuild a given workflow spec in n8n and Zapier within 90 minutes"
    },
    {
      number: 3,
      title: "APIs, Webhooks, and Data Integration Fundamentals",
      overview: "Understand how software talks to software so you can connect any tool to any tool, even without a native integration.",
      objectives: [
        "Explain REST API concepts: endpoints, methods, headers, and authentication",
        "Read API documentation and construct working requests",
        "Build and consume webhooks for real-time event handling",
        "Handle JSON data structures and transform them for downstream use",
        "Authenticate to third-party APIs using API keys, OAuth2, and bearer tokens"
      ],
      sections: [
        {
          id: "3.1",
          title: "REST API Fundamentals",
          topics: [
            "What is an API and why it matters for automation",
            "HTTP methods: GET, POST, PUT, PATCH, DELETE",
            "Status codes: 200s, 400s, 500s and what they mean",
            "Request headers, query parameters, and request bodies",
            "JSON structure: objects, arrays, nesting, data types",
            "Reading and interpreting API documentation (OpenAPI/Swagger)",
            "Rate limiting, pagination, and API quotas",
            "Idempotency keys and safe retry patterns"
          ]
        },
        {
          id: "3.2",
          title: "Authentication Methods",
          topics: [
            "API key authentication in headers vs query strings",
            "Bearer token authentication",
            "Basic authentication with username and password",
            "OAuth2 flow: authorization code, client credentials, refresh tokens",
            "Setting up OAuth2 apps in Google and Microsoft developer consoles",
            "Storing and rotating credentials securely",
            "Common authentication errors and how to resolve them"
          ]
        },
        {
          id: "3.3",
          title: "Webhooks and Real-Time Triggers",
          topics: [
            "What is a webhook and how it differs from polling",
            "Setting up webhook receivers in n8n and Make",
            "Testing webhooks with webhook.site and Postman",
            "Verifying webhook signatures for security",
            "Handling webhook retries and duplicate events",
            "Building a webhook-triggered workflow from a form submission",
            "Ngrok and tunneling for local webhook testing"
          ]
        },
        {
          id: "3.4",
          title: "Working with Postman and API Testing",
          topics: [
            "Building and saving requests in collections",
            "Using environment variables in Postman",
            "Testing authentication flows in Postman",
            "Writing simple test scripts to validate responses",
            "Exporting Postman collections for documentation",
            "Using Postman to prototype before building in n8n/Make"
          ]
        },
        {
          id: "3.5",
          title: "Data Transformation and Mapping",
          topics: [
            "Mapping fields between two different systems' data models",
            "Using JSONPath and expressions to extract nested data",
            "Data type conversions: strings, numbers, dates, booleans",
            "Handling missing or null fields gracefully",
            "Flattening and restructuring arrays of objects",
            "Building lookup tables for data enrichment"
          ]
        }
      ],
      exercises: [
        "Use Postman to call 3 public APIs (weather, currency, news) and parse responses",
        "Set up OAuth2 authentication to connect to the Google Sheets API",
        "Build a webhook receiver in n8n and trigger it from Postman",
        "Map and transform a sample customer JSON payload into a new schema",
        "Debug an intentionally broken API request (wrong header, wrong auth)"
      ],
      assignments: [
        "Submit a Postman collection with 5 documented API requests including authentication",
        "Write a technical explainer document on REST APIs for a non-technical client"
      ],
      projects: [
        "Build a workflow that receives a webhook from a form, enriches the data via a public API (e.g., IP geolocation or company lookup), and writes the result to a Google Sheet"
      ],
      outcomes: [
        "Learners can confidently read and use any REST API documentation",
        "Learners can authenticate to APIs using keys, tokens, and OAuth2",
        "Learners can build and secure webhook-based real-time triggers",
        "Learners can transform and map data between mismatched systems"
      ],
      assessment: "Practical lab: connect to an unfamiliar public API from scratch and build a working automation within a time limit"
    },
    {
      number: 4,
      title: "Airtable, Notion, and Google Workspace Integrations",
      overview: "Turn Airtable, Notion, and Google Workspace into the operational backbone of client automation systems.",
      objectives: [
        "Design relational databases in Airtable for business use cases",
        "Build Notion databases and connect them to automation platforms",
        "Automate Google Sheets, Docs, Gmail, and Calendar via API and no-code tools",
        "Build two-way syncs between Airtable/Notion and external tools",
        "Design a CRM-style system using Airtable as the backend"
      ],
      sections: [
        {
          id: "4.1",
          title: "Airtable as an Automation Backend",
          topics: [
            "Base, table, field, and view structure in Airtable",
            "Field types: linked records, lookups, rollups, formulas",
            "Building a relational data model (e.g., CRM: Contacts, Deals, Tasks)",
            "Airtable Automations (native) vs external automation platforms",
            "Airtable API and personal access tokens",
            "Views, filters, and grouping for client-facing dashboards",
            "Airtable Interfaces for simple client portals",
            "Best practices for scalable base architecture"
          ]
        },
        {
          id: "4.2",
          title: "Notion Databases and Automation",
          topics: [
            "Notion database properties: select, relation, rollup, formula",
            "Linked databases and relations across a workspace",
            "Notion API: pages, blocks, and databases",
            "Connecting Notion to n8n and Make via API integration",
            "Building a content calendar or CRM in Notion",
            "Notion templates for client onboarding and reporting",
            "Limitations of Notion for automation and workarounds"
          ]
        },
        {
          id: "4.3",
          title: "Google Workspace Automation",
          topics: [
            "Google Sheets as a lightweight database for automations",
            "Apps Script fundamentals for custom Sheets automation",
            "Automating Gmail: sending, labeling, and parsing emails",
            "Google Calendar API: creating and managing events programmatically",
            "Google Drive and Docs automation: file creation, templating",
            "Google Forms as intake triggers for workflows",
            "Setting up service accounts for Workspace API access"
          ]
        },
        {
          id: "4.4",
          title: "Building Two-Way Syncs",
          topics: [
            "Understanding sync direction and conflict resolution",
            "Using unique IDs to prevent duplicate records",
            "Polling vs webhook-based sync strategies",
            "Syncing Airtable to Google Sheets bidirectionally",
            "Syncing Notion tasks with a calendar system",
            "Handling edge cases: deleted records, renamed fields"
          ]
        },
        {
          id: "4.5",
          title: "Designing a Mini-CRM System",
          topics: [
            "Requirements gathering for a simple business CRM",
            "Data model design: contacts, pipeline stages, activities",
            "Automating lead intake into the CRM",
            "Automated follow-up reminders and status updates",
            "Reporting views for pipeline value and conversion rate",
            "Client handoff documentation for a CRM system"
          ]
        }
      ],
      exercises: [
        "Build an Airtable base with 3 linked tables and 5 formula fields",
        "Create a Notion database and connect it to n8n using the Notion API",
        "Write a Google Apps Script that sends an automated email from Sheet data",
        "Build a two-way sync test between Airtable and Google Sheets",
        "Design and document a mini-CRM data model on paper before building it"
      ],
      assignments: [
        "Submit a working Airtable-based mini-CRM with at least 3 tables and 2 automations",
        "Write a client-facing setup guide explaining how to use the CRM you built"
      ],
      projects: [
        "Build a complete lead-to-client CRM system in Airtable with automated intake from a form, follow-up reminders via email, and a reporting dashboard view"
      ],
      outcomes: [
        "Learners can design relational databases in Airtable and Notion for real business needs",
        "Learners can automate core Google Workspace apps via API and Apps Script",
        "Learners can build reliable two-way syncs between systems",
        "Learners can deliver a complete CRM system end to end"
      ],
      assessment: "Project review: present the mini-CRM system live and answer questions on design decisions"
    },
    {
      number: 5,
      title: "AI Agents, Assistants, and RAG-Based Chatbots",
      overview: "Move beyond simple workflows into building intelligent AI agents that reason, use tools, and answer questions from custom knowledge bases.",
      objectives: [
        "Explain the difference between a chatbot, an assistant, and an autonomous agent",
        "Build custom GPTs and Claude Projects for specific business tasks",
        "Implement Retrieval-Augmented Generation (RAG) to ground AI in custom data",
        "Build an AI agent that can call tools and APIs to complete tasks",
        "Use vector databases to power semantic search for chatbots"
      ],
      sections: [
        {
          id: "5.1",
          title: "Understanding AI Agents vs Chatbots",
          topics: [
            "Rule-based chatbots vs LLM-powered chatbots vs autonomous agents",
            "The agent loop: perceive, reason, act, observe",
            "Tool use and function calling in LLMs",
            "Memory types: short-term, long-term, and episodic memory in agents",
            "Single-agent vs multi-agent systems",
            "Popular agent frameworks: LangChain, LlamaIndex, CrewAI, n8n AI Agent node",
            "Risks of autonomous agents: cost runaway, infinite loops, hallucination"
          ]
        },
        {
          id: "5.2",
          title: "Building Custom GPTs and Claude Projects",
          topics: [
            "Creating a Custom GPT with instructions and knowledge files",
            "Configuring actions (API calls) inside a Custom GPT",
            "Claude Projects: custom instructions and project knowledge",
            "Gemini Gems for task-specific assistants",
            "Testing and iterating on assistant behavior",
            "Publishing and sharing custom assistants with a team or clients",
            "Limitations of no-code assistant builders"
          ]
        },
        {
          id: "5.3",
          title: "Retrieval-Augmented Generation (RAG)",
          topics: [
            "Why RAG solves the hallucination and stale-knowledge problem",
            "Chunking strategies for documents (fixed size, semantic, recursive)",
            "Generating embeddings with OpenAI and open-source embedding models",
            "Vector databases: Pinecone, Supabase pgvector, Weaviate, Qdrant",
            "Similarity search: cosine similarity and top-k retrieval",
            "Building a RAG pipeline: ingest, embed, store, retrieve, generate",
            "Prompt design for RAG: injecting retrieved context effectively",
            "Evaluating and improving RAG answer accuracy",
            "Handling multi-document and multi-format knowledge bases (PDF, Notion, web)"
          ]
        },
        {
          id: "5.4",
          title: "Building AI Agents with Tool Use",
          topics: [
            "Function calling / tool calling schema design",
            "Building an n8n AI Agent node workflow with tools",
            "Connecting an agent to a calendar, CRM, and email tool",
            "Designing guardrails: allowed actions and confirmation steps",
            "Cost monitoring for agent token usage",
            "Testing agents with adversarial and edge-case inputs",
            "Logging agent decisions for auditability"
          ]
        },
        {
          id: "5.5",
          title: "Vector Databases and Semantic Search",
          topics: [
            "Setting up a free-tier Pinecone or Supabase vector store",
            "Uploading and indexing documents into a vector database",
            "Querying a vector database from n8n or a custom script",
            "Metadata filtering for scoped search results",
            "Updating and re-indexing a knowledge base over time",
            "Cost and performance tradeoffs between vector DB providers"
          ]
        }
      ],
      exercises: [
        "Build a Custom GPT that answers questions using an uploaded FAQ document",
        "Build a RAG pipeline from scratch: chunk a PDF, embed it, store it, and query it",
        "Configure an n8n AI Agent node with 2 connected tools (e.g., calendar and email)",
        "Test your RAG chatbot with 10 tricky questions and measure accuracy",
        "Add metadata filtering to a vector search query"
      ],
      assignments: [
        "Submit a working RAG chatbot answering questions from a real business's documents (FAQ, policies, product info)",
        "Write a short report comparing 2 vector database providers on cost and ease of use"
      ],
      projects: [
        "Build a RAG-powered knowledge base chatbot for a real or simulated business that ingests a PDF and website content and answers customer questions accurately"
      ],
      outcomes: [
        "Learners understand and can explain the RAG architecture end to end",
        "Learners can build and deploy custom GPTs and Claude Projects",
        "Learners can build AI agents that call external tools to complete tasks",
        "Learners can set up and query a vector database for semantic search"
      ],
      assessment: "Live demo of a RAG chatbot answering unseen questions correctly, graded on accuracy and design"
    },
    {
      number: 6,
      title: "Messaging Bots and Customer Support Automation",
      overview: "Deploy AI-powered bots on the channels customers actually use and automate the customer support lifecycle end to end.",
      objectives: [
        "Deploy chatbots on WhatsApp, Telegram, and Slack",
        "Build a customer support automation flow with human handoff",
        "Integrate a helpdesk tool with AI-generated responses",
        "Automate ticket categorization, prioritization, and routing",
        "Design conversational flows that feel natural and reduce friction"
      ],
      sections: [
        {
          id: "6.1",
          title: "WhatsApp Bot Development",
          topics: [
            "WhatsApp Business API vs WhatsApp Cloud API vs third-party providers (Twilio, 360dialog)",
            "Setting up a WhatsApp Business account and verified sender",
            "Building a WhatsApp bot flow in n8n using the WhatsApp node",
            "Message templates and approval requirements",
            "Handling media messages: images, documents, voice notes",
            "Session windows and 24-hour messaging rules",
            "Testing a WhatsApp bot in a sandbox environment"
          ]
        },
        {
          id: "6.2",
          title: "Telegram and Slack Bots",
          topics: [
            "Creating a Telegram bot with BotFather",
            "Telegram Bot API: commands, inline keyboards, callback queries",
            "Building a Telegram bot workflow in n8n or Make",
            "Creating a Slack app and configuring OAuth scopes",
            "Slack slash commands, interactive buttons, and modals",
            "Posting AI-generated responses into Slack channels",
            "Comparing use cases: Telegram for community, Slack for internal ops"
          ]
        },
        {
          id: "6.3",
          title: "Customer Support Automation Design",
          topics: [
            "Mapping the customer support journey and identifying automation points",
            "Auto-triaging incoming messages by intent and urgency",
            "Building an AI-first-response system with human escalation",
            "Designing fallback and handoff logic for complex queries",
            "Sentiment analysis for detecting frustrated customers",
            "Building an FAQ deflection system using RAG",
            "Multi-language support handling with translation APIs"
          ]
        },
        {
          id: "6.4",
          title: "Helpdesk Integration",
          topics: [
            "Overview of helpdesk tools: Zendesk, Freshdesk, Intercom, HubSpot",
            "Automating ticket creation from chat and email",
            "Auto-tagging and categorizing tickets with AI classification",
            "Routing tickets to the right team or agent automatically",
            "Generating AI-drafted responses for agent review",
            "Closing the loop: automated satisfaction surveys post-resolution"
          ]
        },
        {
          id: "6.5",
          title: "Conversational Design Principles",
          topics: [
            "Writing natural, on-brand bot copy",
            "Designing conversation flows with clear exit points",
            "Avoiding infinite loops and dead ends in bot conversations",
            "Progressive disclosure: asking for information step by step",
            "Error recovery: handling unexpected user input gracefully",
            "Setting user expectations about bot vs human responses"
          ]
        }
      ],
      exercises: [
        "Build a working Telegram bot that answers FAQs using an LLM",
        "Set up a Slack bot that posts AI-summarized daily reports",
        "Build a WhatsApp bot sandbox flow with at least 3 conversation branches",
        "Design a support ticket routing logic diagram for a fictional SaaS company",
        "Write and test 5 fallback responses for when the bot cannot help"
      ],
      assignments: [
        "Submit a deployed Telegram or WhatsApp bot handling at least 3 real use cases (FAQ, order status, escalation)",
        "Write a customer support automation blueprint document for a real business"
      ],
      projects: [
        "Build a full customer support automation system: WhatsApp or Telegram intake, AI-drafted responses using RAG, automatic ticket creation in a helpdesk tool, and human handoff for complex cases"
      ],
      outcomes: [
        "Learners can deploy production-ready bots on WhatsApp, Telegram, and Slack",
        "Learners can design and implement end-to-end customer support automation",
        "Learners can integrate AI responses with real helpdesk platforms",
        "Learners understand conversational design best practices"
      ],
      assessment: "Live bot demo handling 5 unscripted test conversations including one escalation scenario"
    },
    {
      number: 7,
      title: "Sales, Marketing Automation, Data Scraping, and Monitoring",
      overview: "Automate revenue-generating processes and web data collection while learning to keep every workflow reliable in production.",
      objectives: [
        "Build automated lead generation and outreach sequences",
        "Automate content creation and social media posting workflows",
        "Extract data from websites using scraping tools and APIs",
        "Implement error handling, logging, and monitoring for production workflows",
        "Set up alerting so failures are caught before clients notice"
      ],
      sections: [
        {
          id: "7.1",
          title: "Sales Automation",
          topics: [
            "Automated lead scoring based on behavior and firmographic data",
            "Building a cold outreach sequence with personalization at scale",
            "Auto-enriching leads using Clearbit, Apollo, or Hunter.io APIs",
            "CRM pipeline automation: stage changes triggering actions",
            "Automated meeting scheduling with Calendly/Cal.com integration",
            "Follow-up sequences based on email opens and replies",
            "Building a simple sales dashboard with automated reporting"
          ]
        },
        {
          id: "7.2",
          title: "Marketing Automation",
          topics: [
            "AI-generated content pipelines for blogs and social posts",
            "Automating social media scheduling across platforms (Buffer, Later APIs)",
            "Email marketing automation: drip campaigns and segmentation",
            "Automated A/B testing setup and result tracking",
            "Repurposing long-form content into multiple formats with AI",
            "Automated newsletter generation from RSS or blog feeds",
            "Tracking campaign performance with automated reporting workflows"
          ]
        },
        {
          id: "7.3",
          title: "Web Scraping for Automation",
          topics: [
            "Legal and ethical considerations of web scraping",
            "No-code scraping with tools like Apify, PhantomBuster, and Browse AI",
            "Scraping with n8n's HTTP Request and HTML Extract nodes",
            "Handling pagination and infinite scroll in scraping targets",
            "Working around anti-scraping measures responsibly (rate limiting, headers)",
            "Scheduling recurring scrapes and deduplicating results",
            "Storing scraped data into Airtable or Google Sheets automatically"
          ]
        },
        {
          id: "7.4",
          title: "Error Handling and Workflow Reliability",
          topics: [
            "Designing workflows defensively: input validation and null checks",
            "Try/catch patterns in n8n and error workflow branches in Make",
            "Retry strategies with exponential backoff",
            "Logging execution data to a central sheet or database",
            "Setting up dead-letter queues for failed items",
            "Versioning workflows and rolling back safely"
          ]
        },
        {
          id: "7.5",
          title: "Monitoring and Alerting",
          topics: [
            "Setting up uptime and execution monitoring for workflows",
            "Building a Slack/email alert system for failed automations",
            "Creating a status dashboard for client-facing transparency",
            "Cost monitoring: tracking API and AI token spend over time",
            "Setting SLAs for automation uptime and response time",
            "Monthly health-check routines for deployed automations"
          ]
        }
      ],
      exercises: [
        "Build an automated cold outreach sequence with 3 follow-up steps triggered by email opens",
        "Scrape 50 rows of structured data from a public website into Airtable",
        "Build an AI content pipeline that turns one blog post into 5 social posts",
        "Add error handling and Slack alerting to a previously built workflow",
        "Build a cost-tracking dashboard for AI API usage across your workflows"
      ],
      assignments: [
        "Submit a working sales or marketing automation with measurable output (e.g., leads generated, posts scheduled)",
        "Submit a scraping workflow with deduplication and scheduled recurring runs"
      ],
      projects: [
        "Build an end-to-end lead generation and nurture system: scrape prospects, enrich data via API, score leads, trigger personalized outreach, and alert the sales team of hot leads via Slack, with full error handling and monitoring"
      ],
      outcomes: [
        "Learners can build automated sales and marketing systems that drive real business results",
        "Learners can extract and structure data from the web reliably",
        "Learners can build production-grade error handling into every workflow",
        "Learners can set up monitoring and alerting so failures are caught proactively"
      ],
      assessment: "Workflow audit: learners submit a workflow and receive a checklist review on error handling, monitoring, and reliability"
    },
    {
      number: 8,
      title: "Selling Automation Services and Capstone Project",
      overview: "Package everything into a sellable service offering and ship a complete, client-ready business automation system as your capstone.",
      objectives: [
        "Package automation skills into productized service offerings",
        "Price automation projects using value-based and tiered pricing models",
        "Pitch, propose, and close automation clients confidently",
        "Deliver a complete, documented, production-ready automation system",
        "Present a capstone project professionally to a panel or client"
      ],
      sections: [
        {
          id: "8.1",
          title: "Productizing Automation Services",
          topics: [
            "Common automation service packages: audit, build, retainer",
            "Choosing a niche: industry-specific vs general automation services",
            "Building a portfolio site showcasing automation case studies",
            "Creating service tiers (starter, growth, enterprise)",
            "Writing compelling case study descriptions of past projects",
            "Positioning yourself as an AI automation consultant vs freelancer"
          ]
        },
        {
          id: "8.2",
          title: "Pricing and Proposals",
          topics: [
            "Value-based pricing vs hourly pricing for automation work",
            "Calculating ROI to justify project pricing to clients",
            "Structuring a proposal: problem, solution, scope, timeline, price",
            "Handling scope creep and change requests",
            "Retainer models for ongoing maintenance and monitoring",
            "Using contracts and SOWs to protect both parties",
            "Common objections and how to handle pricing pushback"
          ]
        },
        {
          id: "8.3",
          title: "Finding and Closing Clients",
          topics: [
            "Outreach channels: LinkedIn, Upwork, cold email, local business networking",
            "Running a free automation audit as a lead magnet",
            "Building a discovery call script that uncovers real pain points",
            "Presenting a solution demo that sells itself",
            "Following up without being pushy",
            "Getting referrals and testimonials after project delivery"
          ]
        },
        {
          id: "8.4",
          title: "Delivery, Documentation, and Handoff",
          topics: [
            "Writing client-facing documentation for delivered automations",
            "Creating loom/video walkthroughs of how a system works",
            "Setting up client access, permissions, and credential handoff securely",
            "Training clients or their staff to use and maintain the system",
            "Defining a support and maintenance agreement post-launch",
            "Collecting feedback and iterating after go-live"
          ]
        },
        {
          id: "8.5",
          title: "Capstone Project: Business Automation System",
          topics: [
            "Selecting a real or realistic business and scoping the capstone",
            "Conducting and documenting an automation audit for the chosen business",
            "Designing the full system architecture across chosen tools",
            "Building the complete automation: intake, processing, AI logic, output, monitoring",
            "Integrating at least 4 of: n8n/Make/Zapier, Airtable/Notion, a messaging bot, a RAG chatbot, and error monitoring",
            "Writing full documentation and a client handoff package",
            "Preparing a professional final presentation and demo"
          ]
        }
      ],
      exercises: [
        "Draft a one-page service offering with 3 pricing tiers",
        "Write and practice a discovery call script with a partner",
        "Create a Loom-style walkthrough script for a previously built automation",
        "Mock-pitch your capstone concept to the class for feedback",
        "Build a simple portfolio page listing 3 of your best automations from the course"
      ],
      assignments: [
        "Submit a complete business proposal document for your capstone client",
        "Submit full technical and client-facing documentation for your capstone system"
      ],
      projects: [
        "Capstone: Design, build, document, and present a complete Business Automation System for a real or simulated company, integrating AI agents, no-code workflows, a messaging or chatbot interface, data storage (Airtable/Notion), and production-grade monitoring and error handling"
      ],
      outcomes: [
        "Learners can package and price automation services professionally",
        "Learners can run a discovery call and close a client",
        "Learners can deliver a fully documented, production-ready automation system",
        "Learners graduate with a capstone project and portfolio ready to attract paying clients"
      ],
      assessment: "Final capstone presentation and live demo graded on functionality, documentation quality, business value, and presentation skills"
    }
  ]
};
