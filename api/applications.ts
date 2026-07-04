import {
  methodNotAllowed,
  readJson,
  sendJson,
  serverError,
  type ApiRequest,
  type ApiResponse,
} from "./_lib/http.js";
import { optionalAuth, requireAuth } from "./_lib/auth.js";
import { query, withClient } from "./_lib/db.js";
import { mirrorToGoogleSheets } from "./_lib/googleSheets.js";
import { applicationFromRow } from "./_lib/serializers.js";
import { upsertUserWithClient } from "./_lib/users.js";

type ApplicationPayload = {
  id: string;
  courseSlug: string;
  courseTitle: string;
  intakeId: string;
  intakeLabel: string;
  schedule: string;
  classTime: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  address: string;
  educationLevel: string;
  school: string;
  employmentStatus: string;
  skillLevel: string;
  motivation?: string;
  careerGoals?: string;
  expectations?: string;
  status?: string;
  submittedAt?: string;
};

async function listApplications(req: ApiRequest, res: ApiResponse) {
  const auth = await requireAuth(req);
  const result = await query(
    `select a.*,
      coalesce(t.welcome_read, false) as welcome_read,
      coalesce(t.payment_plan_chosen, false) as payment_plan_chosen,
      coalesce(t.community_joined, false) as community_joined,
      coalesce(t.orientation_confirmed, false) as orientation_confirmed,
      coalesce(t.wallet_created, false) as wallet_created,
      coalesce(t.address_copied, false) as address_copied,
      coalesce(t.first_message_signed, false) as first_message_signed,
      coalesce(
        jsonb_agg(
          distinct jsonb_build_object(
            'id', d.id,
            'documentType', d.document_type,
            'originalName', d.original_name,
            'blobUrl', d.blob_url,
            'mimeType', d.mime_type,
            'sizeBytes', d.size_bytes,
            'uploadStatus', d.upload_status
          )
        ) filter (where d.id is not null),
        '[]'::jsonb
      ) as documents
     from applications a
     join users u on u.id = a.user_id
     left join onboarding_tasks t on t.user_id = u.id and t.application_id = a.id
     left join documents d on d.application_id = a.id
     where u.privy_did = $1
     group by a.id, t.welcome_read, t.payment_plan_chosen, t.community_joined, t.orientation_confirmed,
       t.wallet_created, t.address_copied, t.first_message_signed
     order by a.submitted_at desc`,
    [auth.privyDid],
  );
  sendJson(res, 200, { applications: result.rows.map(applicationFromRow) });
}

async function createApplication(req: ApiRequest, res: ApiResponse) {
  const auth = await optionalAuth(req);
  const payload = await readJson<ApplicationPayload>(req);

  const inserted = await withClient(async (client) => {
    await client.query("begin");
    try {
      let userId: string | null = null;
      if (auth) {
        const user = await upsertUserWithClient(client, {
          privyDid: auth.privyDid,
          email: payload.email,
          fullName: `${payload.firstName} ${payload.lastName}`.trim(),
          phone: payload.phone,
        });
        userId = user.id;
      }

      const result = await client.query<{ id: string }>(
        `insert into applications (
          id, user_id, course_slug, course_title, intake_id, intake_label, schedule, class_time,
          first_name, last_name, email, phone, gender, address, education_level, school,
          employment_status, skill_level, motivation, career_goals, expectations, status, submitted_at
        ) values (
          $1, $2, $3, $4, $5, $6, $7, $8,
          $9, $10, $11, $12, $13, $14, $15, $16,
          $17, $18, $19, $20, $21, $22, $23
        )
        on conflict (id) do update set updated_at = now()
        returning id`,
        [
          payload.id,
          userId,
          payload.courseSlug,
          payload.courseTitle,
          payload.intakeId,
          payload.intakeLabel,
          payload.schedule,
          payload.classTime,
          payload.firstName,
          payload.lastName,
          payload.email,
          payload.phone,
          payload.gender,
          payload.address,
          payload.educationLevel,
          payload.school,
          payload.employmentStatus,
          payload.skillLevel,
          payload.motivation ?? "",
          payload.careerGoals ?? "",
          payload.expectations ?? "",
          payload.status ?? "submitted",
          payload.submittedAt ?? new Date().toISOString(),
        ],
      );

      if (userId) {
        await client.query(
          `insert into onboarding_tasks (user_id, application_id) values ($1, $2) on conflict do nothing`,
          [userId, payload.id],
        );
      }

      await client.query("commit");
      return result.rows[0];
    } catch (error) {
      await client.query("rollback");
      throw error;
    }
  });

  try {
    await mirrorToGoogleSheets({
      type: "Register",
      applicationId: payload.id,
      fullName: `${payload.firstName} ${payload.lastName}`.trim(),
      email: payload.email,
      phone: payload.phone,
      courseSlug: payload.courseSlug,
      courseTitle: payload.courseTitle,
      registeredAt: payload.submittedAt ?? new Date().toISOString(),
    });
    await query(
      `insert into submission_mirrors (source_table, source_id, status) values ('applications', $1, 'success')`,
      [payload.id],
    );
  } catch (error) {
    await query(
      `insert into submission_mirrors (source_table, source_id, status, error) values ('applications', $1, 'failed', $2)`,
      [payload.id, error instanceof Error ? error.message : String(error)],
    );
  }

  sendJson(res, 201, { application: inserted });
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  try {
    if (req.method === "GET") return await listApplications(req, res);
    if (req.method === "POST") return await createApplication(req, res);
    return methodNotAllowed(res);
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    if (message.includes("auth") || message.includes("Privy"))
      return sendJson(res, 401, { error: message });
    return serverError(res, error);
  }
}
