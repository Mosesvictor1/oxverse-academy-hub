export const SUBMIT_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbx75LbVspkpBk_Ok1TQ6y46y1TI2IocWuqV2Wx8Aup4iHdn6f39rBXxPBMwWiYmEVYGLg/exec";

export const NIGERIAN_STATES = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "FCT, Abuja",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
  "Outside Nigeria",
] as const;

export const HEARD_FROM_OPTIONS = [
  "Friend",
  "Colleague",
  "Google Search",
  "Facebook",
  "Instagram",
  "YouTube",
  "LinkedIn",
  "WhatsApp",
  "TikTok",
  "X (Twitter)",
  "Referral",
  "Other",
] as const;

export type SubmissionType =
  | "Waitlist"
  | "Newsletter"
  | "Contact Us"
  | "Free Class"
  | "Register"
  | "event-registration"
  | "Ambassador"
  | "Ambassador Onboarding"
  | "Summer Bootcamp";

export const AMBASSADOR_CATEGORIES = [
  "NYSC",
  "University",
  "Polytechnic",
  "JAMB Centre",
  "Community Group",
  "Religious Organization",
  "Tech Community",
  "Other",
] as const;

/**
 * Submit a form payload to the shared Google Apps Script endpoint.
 * The endpoint always receives a `type` field so records can be filtered in the sheet.
 */
export async function submitToSheet(payload: Record<string, string> & { type: SubmissionType }) {
  const body = new URLSearchParams();
  Object.entries(payload).forEach(([k, v]) => body.append(k, v ?? ""));
  const res = await fetch(SUBMIT_ENDPOINT, { method: "POST", body });
  if (!res.ok) throw new Error(`Submission failed: ${res.status}`);
  return res;
}
