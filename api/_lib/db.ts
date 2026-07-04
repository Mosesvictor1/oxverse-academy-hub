import { Pool, neonConfig, type PoolClient } from "@neondatabase/serverless";
import ws from "ws";

neonConfig.webSocketConstructor = ws;

export type DbClient = PoolClient;

function connectionString() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not configured");
  return url;
}

export async function query<T = Record<string, unknown>>(text: string, params: unknown[] = []) {
  const pool = new Pool({ connectionString: connectionString() });
  try {
    return await pool.query<T>(text, params);
  } finally {
    await pool.end();
  }
}

export async function withClient<T>(fn: (client: DbClient) => Promise<T>) {
  const pool = new Pool({ connectionString: connectionString() });
  const client = await pool.connect();
  try {
    return await fn(client);
  } finally {
    client.release();
    await pool.end();
  }
}
