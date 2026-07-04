type ApplicationRow = Record<string, string | number | boolean | Date | null | unknown[]>;

export function applicationFromRow(row: ApplicationRow) {
  return {
    id: row.id,
    courseSlug: row.course_slug,
    courseTitle: row.course_title,
    intakeId: row.intake_id,
    intakeLabel: row.intake_label,
    schedule: row.schedule,
    classTime: row.class_time,
    firstName: row.first_name,
    lastName: row.last_name,
    email: row.email,
    phone: row.phone,
    gender: row.gender,
    address: row.address,
    educationLevel: row.education_level,
    school: row.school,
    employmentStatus: row.employment_status,
    skillLevel: row.skill_level,
    motivation: row.motivation ?? "",
    careerGoals: row.career_goals ?? "",
    expectations: row.expectations ?? "",
    status: row.status,
    onboarding: {
      welcomeRead: Boolean(row.welcome_read),
      paymentPlanChosen: Boolean(row.payment_plan_chosen),
      communityJoined: Boolean(row.community_joined),
      orientationConfirmed: Boolean(row.orientation_confirmed),
      walletCreated: Boolean(row.wallet_created),
      addressCopied: Boolean(row.address_copied),
      firstMessageSigned: Boolean(row.first_message_signed),
    },
    documents: row.documents ?? [],
    submittedAt:
      row.submitted_at instanceof Date ? row.submitted_at.toISOString() : row.submitted_at,
  };
}
