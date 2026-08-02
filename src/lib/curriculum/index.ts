import type { CourseCurriculum } from "./types";
import { frontendDevelopment } from "./frontend-development";
import { backendDevelopment } from "./backend-development";
import { fullstackDevelopment } from "./fullstack-development";
import { mobileAppDevelopment } from "./mobile-app-development";
import { uiuxDesign } from "./uiux-design";
import { graphicsDesign } from "./graphics-design";
import { aiAutomation } from "./ai-automation";
import { aiVibeCoding } from "./ai-vibe-coding";
import { aiEngineering } from "./ai-engineering";
import { dataAnalytics } from "./data-analytics";
import { digitalMarketing } from "./digital-marketing";
import { web3Blockchain } from "./web3-blockchain";

export type { CourseCurriculum, CurriculumWeek, WeekSection } from "./types";

export const curricula: CourseCurriculum[] = [
  frontendDevelopment,
  backendDevelopment,
  fullstackDevelopment,
  mobileAppDevelopment,
  uiuxDesign,
  graphicsDesign,
  aiAutomation,
  aiVibeCoding,
  aiEngineering,
  dataAnalytics,
  digitalMarketing,
  web3Blockchain,
];

export const getCurriculum = (slug: string) => curricula.find((c) => c.slug === slug);

/** Public path of the generated, printable curriculum PDF for a course. */
export const curriculumPdfPath = (slug: string) => `/curriculum-pdf/${slug}-curriculum.pdf`;
