import {
  methodNotAllowed,
  readJson,
  sendJson,
  serverError,
  type ApiRequest,
  type ApiResponse,
} from "./_lib/http.js";
import { query } from "./_lib/db.js";
import { mirrorToGoogleSheets } from "./_lib/googleSheets.js";

type SubmissionPayload = Record<string, string> & { type: string };

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== "POST") return methodNotAllowed(res);
  try {
    const payload = await readJson<SubmissionPayload>(req);
    const inserted = await query<{ id: string }>(
      `insert into submissions (type, payload) values ($1, $2) returning id`,
      [payload.type, payload],
    );
    const id = inserted.rows[0].id;

    try {
      await mirrorToGoogleSheets(payload);
      await query(
        `insert into submission_mirrors (source_table, source_id, status) values ('submissions', $1, 'success')`,
        [id],
      );
    } catch (error) {
      await query(
        `insert into submission_mirrors (source_table, source_id, status, error) values ('submissions', $1, 'failed', $2)`,
        [id, error instanceof Error ? error.message : String(error)],
      );
    }

    sendJson(res, 201, { submission: { id } });
  } catch (error) {
    return serverError(res, error);
  }
}
