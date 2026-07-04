import {
  methodNotAllowed,
  readJson,
  sendJson,
  serverError,
  type ApiRequest,
  type ApiResponse,
} from "./_lib/http.js";
import { requireAuth } from "./_lib/auth.js";
import { query } from "./_lib/db.js";

const TASK_COLUMNS = {
  welcomeRead: "welcome_read",
  paymentPlanChosen: "payment_plan_chosen",
  communityJoined: "community_joined",
  orientationConfirmed: "orientation_confirmed",
  walletCreated: "wallet_created",
  addressCopied: "address_copied",
  firstMessageSigned: "first_message_signed",
} as const;

type TaskKey = keyof typeof TASK_COLUMNS;

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== "PATCH") return methodNotAllowed(res);
  try {
    const auth = await requireAuth(req);
    const payload = await readJson<{ applicationId: string; key: TaskKey; value: boolean }>(req);
    const column = TASK_COLUMNS[payload.key];
    if (!column) return sendJson(res, 400, { error: "Unknown onboarding task" });

    const userResult = await query<{ id: string }>(`select id from users where privy_did = $1`, [
      auth.privyDid,
    ]);
    const user = userResult.rows[0];
    if (!user) return sendJson(res, 404, { error: "User profile has not been synced yet" });

    await query(
      `insert into onboarding_tasks (user_id, application_id) values ($1, $2) on conflict do nothing`,
      [user.id, payload.applicationId],
    );
    await query(
      `update onboarding_tasks set ${column} = $3, updated_at = now()
       where user_id = $1 and application_id = $2`,
      [user.id, payload.applicationId, payload.value],
    );

    sendJson(res, 200, { ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    if (message.includes("auth") || message.includes("Privy"))
      return sendJson(res, 401, { error: message });
    return serverError(res, error);
  }
}
