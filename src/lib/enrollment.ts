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
  };
  submittedAt: string;
};

export const INTAKES: IntakeDate[] = [
  { id: "2026-05-12", label: "May 12, 2026", starts: "2026-05-12", seatsLeft: 8 },
  { id: "2026-06-09", label: "June 9, 2026", starts: "2026-06-09", seatsLeft: 14 },
  { id: "2026-07-14", label: "July 14, 2026", starts: "2026-07-14", seatsLeft: 22 },
  { id: "2026-09-08", label: "September 8, 2026", starts: "2026-09-08", seatsLeft: 25 },
];

export const CLASS_TIMES = ["Morning (9am to 12pm)", "Afternoon (1pm to 4pm)", "Evening (5pm to 8pm)"] as const;

const KEY = "oxverse.applications.v2";

export function getApplications(): Application[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]") as Application[];
  } catch {
    return [];
  }
}

export function saveApplication(app: Application) {
  if (typeof window === "undefined") return;
  const all = getApplications();
  all.unshift(app);
  localStorage.setItem(KEY, JSON.stringify(all));
}

export function updateApplication(id: string, patch: Partial<Application>) {
  if (typeof window === "undefined") return;
  const all = getApplications().map((a) => (a.id === id ? { ...a, ...patch } : a));
  localStorage.setItem(KEY, JSON.stringify(all));
}

export function getApplication(id: string): Application | undefined {
  return getApplications().find((a) => a.id === id);
}

export const STATUS_META: Record<Application["status"], { label: string; tone: string; desc: string }> = {
  submitted: { label: "Submitted", tone: "bg-blue-100 text-blue-700", desc: "We've received your application." },
  under_review: { label: "Under review", tone: "bg-amber-100 text-amber-700", desc: "Our admissions team is reviewing your details." },
  approved: { label: "Approved", tone: "bg-emerald-100 text-emerald-700", desc: "Congratulations! Your seat is reserved." },
  waitlisted: { label: "Waitlisted", tone: "bg-purple-100 text-purple-700", desc: "Cohort is full, you're on the waitlist." },
};
