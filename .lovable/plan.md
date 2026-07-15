# Curriculum System Plan

Build a full **Curriculum** section that mirrors the Frontend Development master template you provided, applied across all 11 remaining courses, with an image-rich index page and a week-by-week modal experience.

## What gets built

### 1. New `/curriculum` index page
- Hero (matches site's existing design language — SectionEyebrow, gradient text, grid-pattern bg)
- Grid of 12 course cards (Frontend + 11 new)
- Each card: generated branded cover image, course title, duration, week count, level, "View Curriculum" CTA
- Cards link to `/curriculum/:slug`

### 2. New `/curriculum/:slug` detail page
- Hero with course title, duration, level, project count, capstone note
- "Course Overview" + "Goal" summary
- Grid of animated **Week cards** (Week 1 … Week N) — only shows week number + week title
- Clicking a week opens a **modal** with that week's full contents:
  - Week Title
  - Learning Objectives
  - Sub-sections (1.1, 1.2, …) with topics/subtopics
  - Hands-on Exercises
  - Assignments
  - Mini/Major Projects
  - Weekly Learning Outcomes
  - Weekly Assessment
- Opening another week swaps the modal content (single modal, state-driven)
- Framer Motion for card hover + modal transitions

### 3. Curriculum data
New file `src/lib/curriculum.ts` containing structured curriculum for all 12 courses using the shape:

```ts
type Week = {
  number: number;
  title: string;
  objectives: string[];
  sections: { id: string; title: string; topics: string[] }[];
  exercises: string[];
  assignments: string[];
  projects: string[];
  outcomes: string[];
  assessment?: string;
};
type CourseCurriculum = {
  slug; title; duration; weeks: number;
  level; projectsCount; capstone; goal; image;
  overview; weeks: Week[];
};
```

Frontend Development is transcribed verbatim from your master template. The other 11 are written fresh (not copied) at the same depth, tailored to each domain:

| Course | Weeks |
|---|---|
| Frontend Development | 12 |
| Backend Development | 12 |
| Full Stack Development | 20 |
| Mobile App Development | 12 |
| UI/UX Design | 8 |
| Graphics Design | 8 |
| AI Automation | 8 |
| AI Vibe Coding | 8 |
| AI Engineering | 8 |
| Data Analytics | 16 |
| Digital Marketing | 8 |
| Web3 & Blockchain | 16 |

### 4. Generated cover images
One branded image per course (12 total) saved under `src/assets/curriculum/`. Style continues the 0xVerse robot/brand language already used for the AI tracks — dark violet/black backdrop, glowing accents, subject reflects each course (e.g. servers/APIs for backend, phone for mobile, wireframes for UI/UX, chart dashboards for data, blockchain nodes for web3, etc.).

### 5. Navigation
Add "Curriculum" link to `Header.tsx` main nav (between Courses and Tracks).

## Technical details
- Router: add `/curriculum` and `/curriculum/:slug` in `src/App.tsx`
- Modal: reuse existing shadcn `Dialog` (already used in Courses.tsx)
- Framer Motion: reuse existing patterns from Courses.tsx (already installed)
- Images: use `imagegen--generate_image` in parallel batches (fast tier, jpg)
- Curriculum content sits in a single well-typed data file; pages stay presentational

## Out of scope (unless you ask)
- Editing existing Track pages
- Changing the existing Courses grid
- Backend persistence for curriculum (static data only)

## Deliverable order
1. Confirm plan
2. Generate 12 course cover images in parallel
3. Write `src/lib/curriculum.ts` (largest step)
4. Build `CurriculumIndex.tsx`, `CurriculumDetail.tsx`, week modal component
5. Wire routes + header link

Approve and I'll build it end-to-end.