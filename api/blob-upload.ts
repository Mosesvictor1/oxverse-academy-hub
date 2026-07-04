import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import {
  methodNotAllowed,
  readJson,
  sendJson,
  serverError,
  type ApiRequest,
  type ApiResponse,
} from "./_lib/http.js";
import { optionalAuth } from "./_lib/auth.js";
import { query } from "./_lib/db.js";

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_CONTENT_TYPES = ["image/png", "image/jpeg", "image/webp", "application/pdf"];

type UploadPayload = {
  applicationId?: string;
  documentType?: string;
  originalName?: string;
  privyDid?: string | null;
};

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== "POST") return methodNotAllowed(res);
  try {
    const auth = await optionalAuth(req);
    const body = await readJson<HandleUploadBody>(req);

    const jsonResponse = await handleUpload({
      request: req,
      body,
      onBeforeGenerateToken: async (_pathname, clientPayload) => {
        const parsed = clientPayload ? (JSON.parse(clientPayload) as UploadPayload) : {};
        if (!parsed.applicationId || !parsed.documentType) {
          throw new Error("Missing application document metadata");
        }
        const exists = await query(`select id from applications where id = $1`, [
          parsed.applicationId,
        ]);
        if (exists.rowCount === 0) throw new Error("Application not found");
        return {
          allowedContentTypes: ALLOWED_CONTENT_TYPES,
          maximumSizeInBytes: MAX_FILE_SIZE,
          addRandomSuffix: true,
          tokenPayload: JSON.stringify({ ...parsed, privyDid: auth?.privyDid ?? null }),
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        const parsed = tokenPayload ? (JSON.parse(tokenPayload) as UploadPayload) : {};
        let userId: string | null = null;
        if (parsed.privyDid) {
          const user = await query<{ id: string }>(`select id from users where privy_did = $1`, [
            parsed.privyDid,
          ]);
          userId = user.rows[0]?.id ?? null;
        }
        await query(
          `insert into documents (
            user_id, application_id, document_type, original_name, blob_url, blob_pathname, mime_type, size_bytes, upload_status
          ) values ($1, $2, $3, $4, $5, $6, $7, $8, 'uploaded')`,
          [
            userId,
            parsed.applicationId ?? null,
            parsed.documentType ?? "document",
            parsed.originalName ?? null,
            blob.url,
            blob.pathname,
            blob.contentType ?? null,
            null,
          ],
        );
      },
    });

    sendJson(res, 200, jsonResponse);
  } catch (error) {
    return serverError(res, error);
  }
}
