import { upload } from "@vercel/blob/client";
import { getAccessToken } from "@privy-io/react-auth";
import type { Application } from "@/lib/enrollment";

export type WalletSync = {
  address: string;
  chainType?: string;
  walletType?: string;
};

export type UserSync = {
  email?: string;
  phone?: string;
  fullName?: string;
  wallets?: WalletSync[];
};

export type LeadSubmission = Record<string, string> & { type: string };

async function authHeaders(): Promise<Record<string, string>> {
  const token = await getAccessToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request<T>(path: string, init: RequestInit = {}) {
  const res = await fetch(path, {
    ...init,
    headers: {
      ...(init.body instanceof FormData ? {} : { "Content-Type": "application/json" }),
      ...(init.headers ?? {}),
    },
  });
  const data = (await res.json().catch(() => ({}))) as T & { error?: string };
  if (!res.ok) throw new Error(data.error || `Request failed: ${res.status}`);
  return data;
}

export async function syncPrivyUser(payload: UserSync) {
  return request<{ user: { id: string } }>("/api/sync-user", {
    method: "POST",
    headers: await authHeaders(),
    body: JSON.stringify(payload),
  });
}

export async function fetchMe() {
  return request<{ user: Record<string, unknown>; wallets: WalletSync[] }>("/api/me", {
    headers: await authHeaders(),
  });
}

export async function fetchApplications() {
  const data = await request<{ applications: Application[] }>("/api/applications", {
    headers: await authHeaders(),
  });
  return data.applications;
}

export async function createApplication(app: Application) {
  const data = await request<{ application: { id: string } }>("/api/applications", {
    method: "POST",
    headers: await authHeaders(),
    body: JSON.stringify(app),
  });
  return data.application;
}

export async function updateOnboardingTask(
  applicationId: string,
  key: keyof Application["onboarding"],
  value: boolean,
) {
  await request<{ ok: boolean }>("/api/onboarding", {
    method: "PATCH",
    headers: await authHeaders(),
    body: JSON.stringify({ applicationId, key, value }),
  });
}

export async function submitLead(payload: LeadSubmission) {
  return request<{ submission: { id: string } }>("/api/submissions", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function uploadApplicationDocument(args: {
  applicationId: string;
  documentType: "passport_photo" | "id_document";
  file: File;
}) {
  if (!["image/png", "image/jpeg", "image/webp", "application/pdf"].includes(args.file.type)) {
    throw new Error("Upload an image or PDF file.");
  }
  if (args.file.size > 10 * 1024 * 1024) {
    throw new Error("Files must be 10MB or smaller.");
  }
  const headers = await authHeaders();
  const safeName = args.file.name.replace(/[^A-Za-z0-9._-]/g, "-");
  return upload(`applications/${args.applicationId}/${args.documentType}/${safeName}`, args.file, {
    access: "private",
    handleUploadUrl: "/api/blob-upload",
    multipart: args.file.size > 5 * 1024 * 1024,
    headers,
    clientPayload: JSON.stringify({
      applicationId: args.applicationId,
      documentType: args.documentType,
      originalName: args.file.name,
    }),
  });
}
