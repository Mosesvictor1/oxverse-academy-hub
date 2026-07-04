import {
  methodNotAllowed,
  readJson,
  sendJson,
  serverError,
  type ApiRequest,
  type ApiResponse,
} from "./_lib/http.js";
import { requireAuth } from "./_lib/auth.js";
import { withClient } from "./_lib/db.js";
import { attachApplicationsByEmail, upsertUserWithClient } from "./_lib/users.js";

type SyncWallet = {
  address: string;
  chainType?: string;
  walletType?: string;
};

type SyncPayload = {
  email?: string;
  phone?: string;
  fullName?: string;
  wallets?: SyncWallet[];
};

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== "POST") return methodNotAllowed(res);
  try {
    const auth = await requireAuth(req);
    const payload = await readJson<SyncPayload>(req);

    const result = await withClient(async (client) => {
      await client.query("begin");
      try {
        const user = await upsertUserWithClient(client, {
          privyDid: auth.privyDid,
          email: payload.email,
          phone: payload.phone,
          fullName: payload.fullName,
        });

        await attachApplicationsByEmail(client, user.id, payload.email);

        for (const wallet of payload.wallets ?? []) {
          if (!wallet.address) continue;
          await client.query(
            `insert into wallets (user_id, address, chain_type, network, wallet_type, linked)
             values ($1, $2, $3, 'base-sepolia', $4, true)
             on conflict (user_id, lower(address), network) do update set
               chain_type = excluded.chain_type,
               wallet_type = excluded.wallet_type,
               linked = true,
               updated_at = now()`,
            [
              user.id,
              wallet.address,
              wallet.chainType ?? "ethereum",
              wallet.walletType ?? "embedded",
            ],
          );
        }

        if ((payload.wallets ?? []).length > 0) {
          await client.query(
            `update onboarding_tasks set wallet_created = true, updated_at = now() where user_id = $1`,
            [user.id],
          );
        }

        await client.query("commit");
        return user;
      } catch (error) {
        await client.query("rollback");
        throw error;
      }
    });

    sendJson(res, 200, { user: result });
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    if (message.includes("auth") || message.includes("Privy"))
      return sendJson(res, 401, { error: message });
    return serverError(res, error);
  }
}
