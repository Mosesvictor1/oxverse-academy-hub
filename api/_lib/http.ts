import type { IncomingMessage, ServerResponse } from "node:http";

export type ApiRequest = IncomingMessage & {
  method?: string;
  query?: Record<string, string | string[]>;
  body?: unknown;
};

export type ApiResponse = ServerResponse & {
  status(code: number): ApiResponse;
  json(body: unknown): void;
};

export async function readJson<T = unknown>(req: ApiRequest): Promise<T> {
  if (req.body && typeof req.body === "object") return req.body as T;
  const chunks: Buffer[] = [];
  for await (const chunk of req) chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  const raw = Buffer.concat(chunks).toString("utf8");
  return raw ? (JSON.parse(raw) as T) : ({} as T);
}

export function sendJson(res: ApiResponse, status: number, body: unknown) {
  res.status(status).json(body);
}

export function methodNotAllowed(res: ApiResponse) {
  sendJson(res, 405, { error: "Method not allowed" });
}

export function serverError(res: ApiResponse, error: unknown) {
  console.error(error);
  sendJson(res, 500, { error: "Something went wrong" });
}
