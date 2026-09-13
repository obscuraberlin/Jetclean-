-- ---------------------------------------------------------------------------
-- JETCLEAN Website – Leads
-- Migration 0001: Tabelle `leads`, Indizes, Row Level Security, Admin-Rollen
-- ---------------------------------------------------------------------------

create extension if not exists "pgcrypto";

-- Status-Enum für den Lead-Lifecycle
do $$
begin
  if not exists (select 1 from pg_type where typname = 'lead_status') then
    create type public.lead_status as enum ('new', 'contacted', 'qualified', 'won', 'lost');
  end if;
end$$;

create table if not exists public.leads (
  id              uuid primary key default gen_random_uuid(),
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),
  status          public.lead_status not null default 'new',

  -- Anfrage
  service         text not null check (char_length(service) <= 60),
  area_size       text not null check (char_length(area_size) <= 60),
  frequency       text not null check (char_length(frequency) <= 60),
  postal_code     text not null check (postal_code ~ '^[0-9]{5}$'),
  district        text check (char_length(district) <= 80),

  -- Kontakt
  company         text not null check (char_length(company) between 2 and 120),
  contact_name    text not null check (char_length(contact_name) between 2 and 120),
  email           text not null check (char_length(email) <= 160),
  phone           text not null check (char_length(phone) <= 40),
  message         text check (char_length(message) <= 2000),

  -- Herkunft / Attribution (kein Fingerprinting, keine IP)
  source          text check (char_length(source) <= 60),
  utm_source      text check (char_length(utm_source) <= 120),
  utm_medium      text check (char_length(utm_medium) <= 120),
  utm_campaign    text check (char_length(utm_campaign) <= 120),
  utm_content     text check (char_length(utm_content) <= 120),
  utm_term        text check (char_length(utm_term) <= 120),
  landing_page    text check (char_length(landing_page) <= 500),
  referrer        text check (char_length(referrer) <= 500),
  user_agent      text check (char_length(user_agent) <= 255),

  -- Einwilligung
  consent_privacy boolean not null default false check (consent_privacy = true)
);

comment on table public.leads is 'Angebotsanfragen über das Website-Formular (JETCLEAN).';

-- Indizes für Admin-Liste und Auswertungen
create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_status_created_at_idx on public.leads (status, created_at desc);
create index if not exists leads_email_idx on public.leads (lower(email));
create index if not exists leads_utm_source_idx on public.leads (utm_source) where utm_source is not null;

-- updated_at automatisch pflegen
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists leads_set_updated_at on public.leads;
create trigger leads_set_updated_at
  before update on public.leads
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Admin-Nutzer: Nur Auth-User, die hier eingetragen sind, dürfen Leads lesen/ändern.
-- Eintragen z. B. per SQL-Editor:
--   insert into public.admin_users (user_id) values ('<auth.users.id>');
-- ---------------------------------------------------------------------------
create table if not exists public.admin_users (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;

-- Admins dürfen ihren eigenen Eintrag sehen (für is_admin()-Checks)
drop policy if exists "admin_users: self select" on public.admin_users;
create policy "admin_users: self select"
  on public.admin_users for select
  to authenticated
  using (user_id = auth.uid());

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.admin_users where user_id = auth.uid());
$$;

-- ---------------------------------------------------------------------------
-- Row Level Security für leads
--  * anon (Websitebesucher): KEIN Zugriff. Inserts erfolgen ausschließlich serverseitig
--    über den Service-Role-Key, der RLS umgeht.
--  * authenticated + admin_users: lesen und Status/Notizen ändern.
-- ---------------------------------------------------------------------------
alter table public.leads enable row level security;

drop policy if exists "leads: admins select" on public.leads;
create policy "leads: admins select"
  on public.leads for select
  to authenticated
  using (public.is_admin());

drop policy if exists "leads: admins update" on public.leads;
create policy "leads: admins update"
  on public.leads for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- Standardrechte für die API-Rollen (RLS regelt den Zugriff)
revoke all on public.leads from anon;
grant select, update on public.leads to authenticated;
grant select on public.admin_users to authenticated;
