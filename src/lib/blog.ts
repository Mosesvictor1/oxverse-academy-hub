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
    title: "Welcome to OxVerse Academy — why we exist",
    excerpt:
      "A new tech academy in Lagos built around in-person learning, real mentorship, and shipping real software.",
    date: "Apr 28, 2026",
    author: "OxVerse Founding Team",
    readTime: "5 min read",
    category: "Announcements",
    content: [
      {
        paragraphs: [
          "OxVerse Academy is officially open. We are a new tech academy based in Okota, Lagos, and we built this place because we kept meeting brilliant young Nigerians who had every ingredient to become great engineers — except a serious environment to learn in.",
          "This post is a short introduction to who we are, what we believe, and what students can expect from our first cohorts.",
        ],
      },
      {
        heading: "Why a physical academy, in 2026",
        paragraphs: [
          "There is no shortage of free coding content online. What is missing is the room — instructors who can look at your screen, classmates who push you forward, and a schedule that actually gets you to the finish line.",
          "Our entire model is built around that room. Classes happen in person, every weekday, with small cohorts so nobody gets lost in the back.",
        ],
      },
      {
        heading: "What we teach",
        paragraphs: [
          "We are starting with the tracks the Lagos market needs most: Frontend Development, Backend Development, Product Design, and Data & AI fundamentals. Every track is project-driven — students ship real work, not toy exercises.",
          "More tracks will roll out as we grow. We would rather do a few things excellently than spread thin.",
        ],
      },
      {
        heading: "What we promise",
        paragraphs: [
          "Honest teaching, serious mentorship, and a community that lasts long after the program ends. We are new, and we are hungry to prove ourselves to every student who trusts us with their time.",
          "If that sounds like the kind of place you want to learn at, come visit us at No 82, Century bus stop, Ago Palace way, Okota — or join the waitlist for our next intake.",
        ],
      },
    ],
  },
  {
    slug: "2",
    title: "Why physical classrooms still win",
    excerpt:
      "In-person learning compounds. Here's what online platforms can't replicate.",
    date: "Apr 18, 2026",
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
    date: "Apr 8, 2026",
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