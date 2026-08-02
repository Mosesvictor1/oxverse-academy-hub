export type WeekSection = {
  id: string; // "1.1", "1.2", ...
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
