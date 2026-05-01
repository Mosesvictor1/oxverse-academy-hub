export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  readTime: string;
  category: string;
  content: { heading?: string; paragraphs: string[] }[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "1",
    title: "How we built a 92% placement rate",
    excerpt:
      "The OxVerse career playbook — mentorship, mock interviews, and direct hiring pipelines.",
    date: "Apr 12, 2026",
    author: "OxVerse Careers Team",
    readTime: "7 min read",
    category: "Careers",
    content: [
      {
        paragraphs: [
          "When we set our placement target at 90% three years ago, most academies in Lagos told us it was unrealistic. Today we sit consistently at 92% — and the formula isn't a secret weapon, it's a system that compounds.",
          "This post breaks down exactly how a student goes from week one of cohort to a signed offer letter, and what we do behind the scenes to make sure the pipeline never breaks.",
        ],
      },
      {
        heading: "1. Mentorship from week one — not month four",
        paragraphs: [
          "Every student is paired with a working engineer mentor on day one. Not a graduate, not a teaching assistant — a mid or senior engineer currently shipping code at a real company.",
          "Mentors meet weekly for 45 minutes. Half the session is technical, half is career: how to talk about your work, how to read a job description, how to negotiate. By month three students already speak the language of the industry.",
        ],
      },
      {
        heading: "2. Mock interviews that hurt (in a good way)",
        paragraphs: [
          "Starting in week six, every student does one mock interview per week — DSA, system design, or behavioural — graded on a public rubric. We deliberately make them harder than the real thing.",
          "By the time students sit in front of a real hiring manager, they've already failed and recovered from twenty interviews. The room feels familiar.",
        ],
      },
      {
        heading: "3. Direct hiring pipelines",
        paragraphs: [
          "We have signed partnerships with 40+ companies across Lagos, Abuja, Nairobi and remote-first European startups. These partners get first look at every cohort two weeks before graduation.",
          "The partners aren't doing us a favour — they hire from us because the bar is high and the screening is already done. That trust took years to build and we protect it ruthlessly.",
        ],
      },
      {
        heading: "What 92% actually means",
        paragraphs: [
          "92% of students who complete the program receive at least one offer within 90 days of graduation. The other 8% — we keep working with them until they land. Nobody is left behind, and that's the part of the playbook we're proudest of.",
        ],
      },
    ],
  },
  {
    slug: "2",
    title: "Why physical classrooms still win",
    excerpt:
      "In-person learning compounds. Here's what online platforms can't replicate.",
    date: "Mar 28, 2026",
    author: "Director of Learning",
    readTime: "6 min read",
    category: "Pedagogy",
    content: [
      {
        paragraphs: [
          "We get asked all the time: why run a physical academy in 2026 when every course is one click away on YouTube, Coursera, or Udemy? The honest answer — the screen is the easy part. The hard part is everything around it.",
        ],
      },
      {
        heading: "Pressure that you can feel",
        paragraphs: [
          "Sitting next to someone who is solving the problem you're stuck on does something no Discord channel can replicate. The small embarrassment of falling behind, the small thrill of pulling ahead — these tiny social signals push students forward every single hour.",
          "Online cohorts try to simulate this with leaderboards and accountability buddies. It's not the same. Bodies in a room change behaviour.",
        ],
      },
      {
        heading: "Instant unblocking",
        paragraphs: [
          "The average time a student spends stuck on a bug in our classroom is 6 minutes. The average time online — across surveys we've run on our own remote students — is 47 minutes.",
          "When an instructor can walk over and look at your screen, hard problems shrink. When they can't, students quietly drift toward giving up.",
        ],
      },
      {
        heading: "The network is the product",
        paragraphs: [
          "Five years from now, our students won't remember the lecture on hooks. They will remember the four people they sat next to every day for sixteen weeks — the people who become their co-founders, hiring managers, and best engineers.",
          "You can't ship that in a Zoom link.",
        ],
      },
      {
        heading: "Where online still wins",
        paragraphs: [
          "We're not anti-online. Pre-work, recordings, asynchronous reviews — all of that lives online and we use it heavily. The point is that the core learning loop, the part where someone actually becomes a better engineer, happens fastest in a room.",
        ],
      },
    ],
  },
  {
    slug: "3",
    title: "From zero to React engineer in 16 weeks",
    excerpt:
      "A week-by-week breakdown of our Frontend Development cohort.",
    date: "Mar 14, 2026",
    author: "Frontend Faculty",
    readTime: "9 min read",
    category: "Curriculum",
    content: [
      {
        paragraphs: [
          "Sixteen weeks is not a lot of time to take someone from \"I've never written a line of code\" to \"I can ship a production React app.\" Here is exactly how we structure it, week by week, with no fluff.",
        ],
      },
      {
        heading: "Weeks 1–2: The web, demystified",
        paragraphs: [
          "HTML, CSS, the browser, the DOM, how a request actually travels. We do not touch a framework. Students build three small static sites by the end of week two.",
        ],
      },
      {
        heading: "Weeks 3–5: JavaScript that doesn't lie to you",
        paragraphs: [
          "Variables, scope, async, modules, the event loop. We spend a full week on async because it is the single biggest reason junior devs get stuck in interviews and on the job.",
        ],
      },
      {
        heading: "Weeks 6–8: React fundamentals",
        paragraphs: [
          "Components, props, state, hooks. By the end of week eight every student has built a fully working app from scratch — no boilerplate, no copy-paste — covering forms, lists, routing, and fetching.",
        ],
      },
      {
        heading: "Weeks 9–11: Real-world tooling",
        paragraphs: [
          "Tailwind, TypeScript, Vite, React Router, React Query, testing with Vitest, Git workflows that match what they will see at a real company. This is the section students later say changed how they work the most.",
        ],
      },
      {
        heading: "Weeks 12–14: Capstone project",
        paragraphs: [
          "Three weeks shipping a real product end-to-end, including a backend, auth, and deployment. Students work in teams of three with a mentor as the product manager. Every team demos to a panel of hiring managers.",
        ],
      },
      {
        heading: "Weeks 15–16: Career sprint",
        paragraphs: [
          "CV, portfolio, mock interviews every day, system design primers, and live introductions to our hiring partners. By graduation day, most students are already in interview loops.",
        ],
      },
      {
        heading: "What students leave with",
        paragraphs: [
          "A portfolio of four real projects, a capstone they actually shipped, references from working engineers, and the confidence to walk into any junior frontend interview in the country. That is the bar we hold ourselves to.",
        ],
      },
    ],
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}