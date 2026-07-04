import { createApplication, fetchApplications, updateOnboardingTask } from "@/lib/api";

export type IntakeDate = {
  id: string;
  label: string;
  starts: string;
  seatsLeft: number;
};

export type Application = {
  id: string;
  courseSlug: string;
  courseTitle: string;
  intakeId: string;
  intakeLabel: string;
  schedule: string;
  classTime: string;

  // Step 1, Personal
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: "Male" | "Female" | "Prefer not to say";
  address: string;

  // Step 2, Education
  educationLevel: "Secondary" | "Diploma" | "Undergraduate" | "Graduate" | "Postgraduate" | "Other";
  school: string;
  employmentStatus: "Student" | "Employed" | "Self employed" | "Unemployed" | "Other";
  skillLevel: "None" | "Beginner" | "Intermediate" | "Advanced";

  // Step 4, Goals
  motivation: string;
  careerGoals: string;
  expectations: string;

  // Step 5, Documents (filenames only, no upload backend)
  passportPhotoName?: string;
  idDocumentName?: string;

  status: "submitted" | "under_review" | "approved" | "waitlisted";
  onboarding: {
    welcomeRead: boolean;
    paymentPlanChosen: boolean;
    communityJoined: boolean;
    orientationConfirmed: boolean;
    walletCreated?: boolean;
    addressCopied?: boolean;
    firstMessageSigned?: boolean;
  };
  documents?: {
    id: string;
    documentType: string;
    originalName?: string;
    blobUrl?: string;
    mimeType?: string;
    sizeBytes?: number;
    uploadStatus?: string;
  }[];
  submittedAt: string;
};

export const INTAKES: IntakeDate[] = [
  { id: "2026-05-12", label: "May 12, 2026", starts: "2026-05-12", seatsLeft: 8 },
  { id: "2026-06-09", label: "June 9, 2026", starts: "2026-06-09", seatsLeft: 14 },
  { id: "2026-07-14", label: "July 14, 2026", starts: "2026-07-14", seatsLeft: 22 },
  { id: "2026-09-08", label: "September 8, 2026", starts: "2026-09-08", seatsLeft: 25 },
];

export const CLASS_TIMES = [
  "Morning (9am to 12pm)",
  "Afternoon (1pm to 4pm)",
  "Evening (5pm to 8pm)",
] as const;

const LEGACY_KEY = "oxverse.applications.v2";

export async function getApplications(): Promise<Application[]> {
  if (typeof window === "undefined") return [];
  try {
    return await fetchApplications();
  } catch {
    try {
      return JSON.parse(localStorage.getItem(LEGACY_KEY) || "[]") as Application[];
    } catch {
      return [];
    }
  }
}

export async function saveApplication(app: Application) {
  if (typeof window === "undefined") return;
  await createApplication(app);
  try {
    const all = JSON.parse(localStorage.getItem(LEGACY_KEY) || "[]") as Application[];
    all.unshift(app);
    localStorage.setItem(LEGACY_KEY, JSON.stringify(all));
  } catch {
    console.warn("Could not write legacy application cache");
  }
}

export async function updateApplication(id: string, patch: Partial<Application>) {
  if (typeof window === "undefined") return;
  if (patch.onboarding) {
    const current = await getApplication(id);
    const next = patch.onboarding;
    for (const key of Object.keys(next) as (keyof Application["onboarding"])[]) {
      if (current?.onboarding[key] !== next[key]) {
        await updateOnboardingTask(id, key, Boolean(next[key]));
      }
    }
  }
  try {
    const all = (JSON.parse(localStorage.getItem(LEGACY_KEY) || "[]") as Application[]).map((a) =>
      a.id === id ? { ...a, ...patch } : a,
    );
    localStorage.setItem(LEGACY_KEY, JSON.stringify(all));
  } catch {
    console.warn("Could not update legacy application cache");
  }
}

export async function getApplication(id: string): Promise<Application | undefined> {
  return (await getApplications()).find((a) => a.id === id);
}

export const STATUS_META: Record<
  Application["status"],
  { label: string; tone: string; desc: string }
> = {
  submitted: {
    label: "Submitted",
    tone: "bg-blue-100 text-blue-700",
    desc: "We've received your application.",
  },
  under_review: {
    label: "Under review",
    tone: "bg-amber-100 text-amber-700",
    desc: "Our admissions team is reviewing your details.",
  },
  approved: {
    label: "Approved",
    tone: "bg-emerald-100 text-emerald-700",
    desc: "Congratulations! Your seat is reserved.",
  },
  waitlisted: {
    label: "Waitlisted",
    tone: "bg-purple-100 text-purple-700",
    desc: "Cohort is full, you're on the waitlist.",
  },
};
