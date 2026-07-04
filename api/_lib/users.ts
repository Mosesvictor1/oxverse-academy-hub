import { query, type DbClient } from "./db.js";

type UserInput = {
  privyDid: string;
  email?: string;
  phone?: string;
  fullName?: string;
};

export async function upsertUser(input: UserInput) {
  const result = await query<{ id: string }>(
    `insert into users (privy_did, email, phone, full_name)
     values ($1, $2, $3, $4)
     on conflict (privy_did) do update set
       email = coalesce(excluded.email, users.email),
       phone = coalesce(excluded.phone, users.phone),
       full_name = coalesce(excluded.full_name, users.full_name),
       updated_at = now()
     returning id`,
    [input.privyDid, input.email ?? null, input.phone ?? null, input.fullName ?? null],
  );
  return result.rows[0];
}

export async function upsertUserWithClient(client: DbClient, input: UserInput) {
  const result = await client.query<{ id: string }>(
    `insert into users (privy_did, email, phone, full_name)
     values ($1, $2, $3, $4)
     on conflict (privy_did) do update set
       email = coalesce(excluded.email, users.email),
       phone = coalesce(excluded.phone, users.phone),
       full_name = coalesce(excluded.full_name, users.full_name),
       updated_at = now()
     returning id`,
    [input.privyDid, input.email ?? null, input.phone ?? null, input.fullName ?? null],
  );
  return result.rows[0];
}

export async function ensureOnboardingRows(userId: string) {
  await query(
    `insert into onboarding_tasks (user_id, application_id)
     select $1, a.id from applications a
     where a.user_id = $1
     on conflict do nothing`,
    [userId],
  );
}

export async function attachApplicationsByEmail(client: DbClient, userId: string, email?: string) {
  if (!email) return;
  await client.query(
    `update applications set user_id = $1, updated_at = now()
     where user_id is null and lower(email) = lower($2)`,
    [userId, email],
  );
  await client.query(
    `insert into onboarding_tasks (user_id, application_id)
     select $1, id from applications where user_id = $1
     on conflict do nothing`,
    [userId],
  );
}
