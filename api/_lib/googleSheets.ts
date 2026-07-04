const SUBMIT_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbx75LbVspkpBk_Ok1TQ6y46y1TI2IocWuqV2Wx8Aup4iHdn6f39rBXxPBMwWiYmEVYGLg/exec";

export async function mirrorToGoogleSheets(payload: Record<string, string>) {
  const body = new URLSearchParams();
  Object.entries(payload).forEach(([key, value]) => body.append(key, value ?? ""));
  const res = await fetch(SUBMIT_ENDPOINT, { method: "POST", body });
  if (!res.ok) throw new Error(`Google Sheets mirror failed: ${res.status}`);
}
