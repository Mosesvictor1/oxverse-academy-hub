create extension if not exists pgcrypto;

create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  privy_did text unique not null,
  email text,
  phone text,
  full_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists wallets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  address text not null,
  chain_type text not null default 'ethereum',
  network text not null default 'base-sepolia',
  wallet_type text not null default 'embedded',
  linked boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists applications (
  id text primary key,
  user_id uuid references users(id) on delete set null,
  course_slug text not null,
  course_title text not null,
  intake_id text not null,
  intake_label text not null,
  schedule text not null,
  class_time text not null,
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text not null,
  gender text not null,
  address text not null,
  education_level text not null,
  school text not null,
  employment_status text not null,
  skill_level text not null,
  motivation text not null default '',
  career_goals text not null default '',
  expectations text not null default '',
  status text not null default 'submitted',
  submitted_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists onboarding_tasks (
  user_id uuid not null references users(id) on delete cascade,
  application_id text references applications(id) on delete cascade,
  welcome_read boolean not null default false,
  payment_plan_chosen boolean not null default false,
  community_joined boolean not null default false,
  orientation_confirmed boolean not null default false,
  wallet_created boolean not null default false,
  address_copied boolean not null default false,
  first_message_signed boolean not null default false,
  updated_at timestamptz not null default now(),
  primary key (user_id, application_id)
);

create table if not exists documents (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete set null,
  application_id text references applications(id) on delete cascade,
  document_type text not null,
  original_name text,
  blob_url text not null,
  blob_pathname text,
  mime_type text,
  size_bytes bigint,
  upload_status text not null default 'uploaded',
  created_at timestamptz not null default now()
);

create table if not exists submissions (
  id uuid primary key default gen_random_uuid(),
  type text not null,
  payload jsonb not null,
  created_at timestamptz not null default now()
);

create table if not exists submission_mirrors (
  id uuid primary key default gen_random_uuid(),
  target text not null default 'google_sheets',
  source_table text not null,
  source_id text not null,
  status text not null,
  error text,
  created_at timestamptz not null default now()
);

create index if not exists applications_user_id_idx on applications(user_id);
create index if not exists applications_email_idx on applications(lower(email));
create index if not exists wallets_user_id_idx on wallets(user_id);
create unique index if not exists wallets_user_address_network_idx on wallets(user_id, lower(address), network);
create index if not exists documents_application_id_idx on documents(application_id);
create index if not exists submission_mirrors_source_idx on submission_mirrors(source_table, source_id);
