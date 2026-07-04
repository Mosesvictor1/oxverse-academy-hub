import {
  methodNotAllowed,
  sendJson,
  serverError,
  type ApiRequest,
  type ApiResponse,
} from "./_lib/http.js";
import { requireAuth } from "./_lib/auth.js";
import { query } from "./_lib/db.js";
import { ensureOnboardingRows } from "./_lib/users.js";

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== "GET") return methodNotAllowed(res);
  try {
    const auth = await requireAuth(req);
    const userResult = await query(
      `select id, privy_did, email, phone, full_name, created_at from users where privy_did = $1`,
      [auth.privyDid],
    );
    const user = userResult.rows[0];
    if (!user) return sendJson(res, 404, { error: "User profile has not been synced yet" });

    await ensureOnboardingRows(String(user.id));

    const walletResult = await query(
      `select id, address, chain_type, network, wallet_type, linked, created_at
       from wallets
       where user_id = $1
       order by created_at desc`,
      [user.id],
    );

    sendJson(res, 200, { user, wallets: walletResult.rows });
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    if (message.includes("auth") || message.includes("Privy"))
      return sendJson(res, 401, { error: message });
    return serverError(res, error);
  }
}
