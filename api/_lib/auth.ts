import { verifyAccessToken } from "@privy-io/node";
import type { ApiRequest } from "./http.js";

export type AuthContext = {
  privyDid: string;
  sessionId: string;
};

function bearerToken(req: ApiRequest) {
  const header = req.headers.authorization;
  if (!header) return "";
  return header.replace(/^Bearer\s+/i, "").trim();
}

export async function requireAuth(req: ApiRequest): Promise<AuthContext> {
  const accessToken = bearerToken(req);
  if (!accessToken) throw new Error("Missing auth token");
  const appId = process.env.PRIVY_APP_ID;
  const verificationKey = process.env.PRIVY_VERIFICATION_KEY;
  if (!appId || !verificationKey) throw new Error("Privy server auth is not configured");
  const verified = await verifyAccessToken({
    access_token: accessToken,
    app_id: appId,
    verification_key: verificationKey,
  });
  return { privyDid: verified.user_id, sessionId: verified.session_id };
}

export async function optionalAuth(req: ApiRequest): Promise<AuthContext | null> {
  try {
    return await requireAuth(req);
  } catch {
    return null;
  }
}
