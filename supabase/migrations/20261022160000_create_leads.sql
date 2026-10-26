-- Simpli Intelligent lead inbox.
-- Run once in the Supabase SQL editor, or with the Supabase CLI (`supabase db push`).
-- The website writes with the service role key. Do not expose that key to the browser.
--
-- This table is meant to live in the same Supabase project Simpli Operate will use.
-- Operate can read these rows later. founding_spot is website-only and may be ignored.
--
-- Keep submit_lead() in sync with src/lib/leads/founding.ts (decideSignup).

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  company text not null,
  email text not null unique,
  state_province text not null,
  current_software text not null,
  product_interest text not null,
  lead_status text not null default 'New',
  source text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  utm_term text,
  page text,
  report_count text,
  consent boolean not null,
  founding_spot integer,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint leads_product_interest_check check (
    product_interest in ('archive', 'check', 'both', 'operate', 'reach')
  ),
  constraint leads_lead_status_check check (
    lead_status in (
      'New',
      'Researching',
      'Interested',
      'Invited',
      'Follow-Up Needed',
      'Member',
      'Not a Fit',
      'Archived'
    )
  ),
  constraint leads_consent_check check (consent),
  constraint leads_founding_spot_check check (
    founding_spot is null or (founding_spot >= 1 and founding_spot <= 100)
  )
);

comment on table public.leads is
  'Shared lead inbox for Simpli Intelligent signups. Intended for the same Supabase project as Simpli Operate.';

comment on column public.leads.company is 'Business name from the website form.';
comment on column public.leads.product_interest is 'archive, check, both, operate, or reach.';
comment on column public.leads.lead_status is 'CRM status. Website signups start at New.';
comment on column public.leads.source is 'Campaign label. The site stores source, then utm_source, then utm_campaign, then the page.';
comment on column public.leads.founding_spot is 'Simpli Check founding spot 1-100. Null when the signup did not claim one. 1-50 are the $49/month tier. 51-100 are the $69/month tier.';

create unique index if not exists leads_founding_spot_unique
  on public.leads (founding_spot)
  where founding_spot is not null;

create index if not exists leads_created_at_idx
  on public.leads (created_at desc);

create table if not exists public.founding_alerts (
  threshold integer primary key,
  sent_at timestamptz not null default now()
);

comment on table public.founding_alerts is
  'Thresholds already emailed: 40, 50, 90, and 100.';

alter table public.leads enable row level security;
alter table public.founding_alerts enable row level security;

revoke all on public.leads from public, anon, authenticated;
revoke all on public.founding_alerts from public, anon, authenticated;

grant select, insert, update, delete on public.leads to service_role;
grant select, insert, update, delete on public.founding_alerts to service_role;

create or replace function public.submit_lead(
  p_name text,
  p_company text,
  p_email text,
  p_state_province text,
  p_current_software text,
  p_product_interest text,
  p_report_count text,
  p_source text,
  p_utm_source text,
  p_utm_medium text,
  p_utm_campaign text,
  p_utm_content text,
  p_utm_term text,
  p_page text
) returns jsonb
language plpgsql
security definer
set search_path = public
as $fn$
declare
  v_email text := lower(trim(coalesce(p_email, '')));
  v_interest text := trim(coalesce(p_product_interest, ''));
  v_existing public.leads%rowtype;
  v_row public.leads%rowtype;
  v_count integer;
  v_spot integer;
  v_action text;
  v_previous text;
  v_wants boolean;
  v_is_new boolean;
begin
  if v_email = '' or position('@' in v_email) = 0 then
    raise exception 'invalid email';
  end if;

  if v_interest not in ('archive', 'check', 'both', 'operate', 'reach') then
    raise exception 'invalid product_interest';
  end if;

  -- Serialize founding-spot assignment. Low volume, one lock.
  perform pg_advisory_xact_lock(714152026);

  select * into v_existing
  from public.leads
  where email = v_email
  for update;

  v_is_new := not found;

  select count(*)::integer into v_count
  from public.leads
  where founding_spot is not null;

  v_wants := v_interest in ('check', 'both');

  if v_is_new then
    v_action := 'create';
    v_previous := null;
    if v_wants and v_count < 100 then
      v_spot := v_count + 1;
      v_count := v_spot;
    else
      v_spot := null;
    end if;

    insert into public.leads (
      name,
      company,
      email,
      state_province,
      current_software,
      product_interest,
      report_count,
      source,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_content,
      utm_term,
      page,
      consent,
      lead_status,
      founding_spot
    ) values (
      left(trim(p_name), 120),
      left(trim(p_company), 200),
      v_email,
      left(trim(p_state_province), 80),
      left(trim(p_current_software), 160),
      v_interest,
      nullif(left(trim(coalesce(p_report_count, '')), 40), ''),
      nullif(left(trim(coalesce(p_source, '')), 200), ''),
      nullif(left(trim(coalesce(p_utm_source, '')), 200), ''),
      nullif(left(trim(coalesce(p_utm_medium, '')), 200), ''),
      nullif(left(trim(coalesce(p_utm_campaign, '')), 200), ''),
      nullif(left(trim(coalesce(p_utm_content, '')), 200), ''),
      nullif(left(trim(coalesce(p_utm_term, '')), 200), ''),
      nullif(left(trim(coalesce(p_page, '')), 80), ''),
      true,
      'New',
      v_spot
    )
    returning * into v_row;
  elsif v_wants
    and v_existing.founding_spot is null
    and v_existing.product_interest not in ('check', 'both')
  then
    v_action := 'upgrade';
    v_previous := v_existing.product_interest;
    if v_count < 100 then
      v_spot := v_count + 1;
      v_count := v_spot;
    else
      v_spot := null;
    end if;

    update public.leads set
      name = left(trim(p_name), 120),
      company = left(trim(p_company), 200),
      state_province = left(trim(p_state_province), 80),
      current_software = left(trim(p_current_software), 160),
      product_interest = v_interest,
      report_count = coalesce(nullif(left(trim(coalesce(p_report_count, '')), 40), ''), report_count),
      source = coalesce(nullif(left(trim(coalesce(p_source, '')), 200), ''), source),
      utm_source = coalesce(nullif(left(trim(coalesce(p_utm_source, '')), 200), ''), utm_source),
      utm_medium = coalesce(nullif(left(trim(coalesce(p_utm_medium, '')), 200), ''), utm_medium),
      utm_campaign = coalesce(nullif(left(trim(coalesce(p_utm_campaign, '')), 200), ''), utm_campaign),
      utm_content = coalesce(nullif(left(trim(coalesce(p_utm_content, '')), 200), ''), utm_content),
      utm_term = coalesce(nullif(left(trim(coalesce(p_utm_term, '')), 200), ''), utm_term),
      page = coalesce(nullif(left(trim(coalesce(p_page, '')), 80), ''), page),
      founding_spot = v_spot,
      updated_at = now()
    where id = v_existing.id
    returning * into v_row;
  else
    v_action := 'duplicate';
    v_previous := null;
    v_row := v_existing;
    v_spot := v_existing.founding_spot;
  end if;

  return jsonb_build_object(
    'action', v_action,
    'previous_interest', v_previous,
    'id', v_row.id,
    'name', v_row.name,
    'company', v_row.company,
    'email', v_row.email,
    'state_province', v_row.state_province,
    'current_software', v_row.current_software,
    'product_interest', v_row.product_interest,
    'lead_status', v_row.lead_status,
    'source', v_row.source,
    'utm_source', v_row.utm_source,
    'utm_medium', v_row.utm_medium,
    'utm_campaign', v_row.utm_campaign,
    'utm_content', v_row.utm_content,
    'utm_term', v_row.utm_term,
    'page', v_row.page,
    'report_count', v_row.report_count,
    'founding_spot', v_row.founding_spot,
    'founding_count', v_count,
    'created_at', v_row.created_at
  );
end;
$fn$;

revoke all on function public.submit_lead(
  text, text, text, text, text, text, text, text, text, text, text, text, text, text
) from public, anon, authenticated;

grant execute on function public.submit_lead(
  text, text, text, text, text, text, text, text, text, text, text, text, text, text
) to service_role;
