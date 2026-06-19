import { courses, type Course } from "@/lib/courses";

export type RoadmapStage = {
  level: "Beginner" | "Intermediate" | "Advanced" | "Mastery";
  title: string;
  weeks: string;
  topics: string[];
  outcome: string;
};

export type CourseRoadmap = {
  slug: string;
  title: string;
  duration: string;
  summary: string;
  stages: RoadmapStage[];
  tools: string[];
  projects: string[];
  certification: string;
  careers: string[];
};

/**
 * Builds a structured 4-stage roadmap for any course by combining
 * its curriculum modules with progressive proficiency labels.
 */
function buildRoadmap(c: Course): CourseRoadmap {
  const levels: RoadmapStage["level"][] = ["Beginner", "Intermediate", "Advanced", "Mastery"];
  const modules = c.curriculum;
  const total = Math.max(modules.length, 1);
  // Distribute durations roughly evenly across the course length
  const stages: RoadmapStage[] = modules.map((m, i) => ({
    level: levels[Math.min(i, levels.length - 1)],
    title: m.module,
    weeks: `Phase ${i + 1} of ${total}`,
    topics: m.topics,
    outcome:
      i === 0
        ? `Establish strong foundations in ${m.module.toLowerCase()}.`
        : i === total - 1
          ? `Ship production ready work and prepare for the job market.`
          : `Deepen your skill set and start building real world projects.`,
  }));

  return {
    slug: c.slug,
    title: c.title,
    duration: c.duration,
    summary: c.description,
    stages,
    tools: c.tools,
    projects: c.projects,
    certification:
      "OxVerse Academy Certificate of Completion, awarded after capstone review and project portfolio submission.",
    careers: c.career,
  };
}

export const roadmaps: Record<string, CourseRoadmap> = Object.fromEntries(
  courses.map((c) => [c.slug, buildRoadmap(c)]),
);

export const getRoadmap = (slug: string) => roadmaps[slug];