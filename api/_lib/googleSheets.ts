const SUBMIT_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbwXu_A7S5sJN5lYmmnrRKsQGdArcLkxEItiaDp7DddvEMG4tqX36MOVBil0hLjloCJSDA/exec";

export async function mirrorToGoogleSheets(payload: Record<string, string>) {
  const body = new URLSearchParams();
  Object.entries(payload).forEach(([key, value]) => body.append(key, value ?? ""));
  const res = await fetch(SUBMIT_ENDPOINT, { method: "POST", body });
  if (!res.ok) throw new Error(`Google Sheets mirror failed: ${res.status}`);
}
