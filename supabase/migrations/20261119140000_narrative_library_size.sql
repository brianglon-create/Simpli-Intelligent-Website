-- Separate narrative-library size from historical report count.
-- report_count stays the Horizon report count. narrative_library_size is nullable
-- and is null for forms that do not ask. founding_spot assignment is unchanged.
--
-- Run after 20261022160000_create_leads.sql. Replaces submit_lead with one extra
-- argument. The old 14-argument function is dropped so PostgREST has one match.

alter table public.leads
  add column if not exists narrative_library_size text;

comment on column public.leads.narrative_library_size is
  'Narrative library size from the migration-help form. Separate from report_count. Null when that form did not collect it.';

drop function if exists public.submit_lead(
  text, text, text, text, text, text, text, text, text, text, text, text, text, text
);

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
  p_page text,
  p_narrative_library_size text default null
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
      narrative_library_size,
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
      nullif(left(trim(coalesce(p_report_count, '')), 200), ''),
      nullif(left(trim(coalesce(p_narrative_library_size, '')), 200), ''),
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
      report_count = coalesce(nullif(left(trim(coalesce(p_report_count, '')), 200), ''), report_count),
      narrative_library_size = coalesce(nullif(left(trim(coalesce(p_narrative_library_size, '')), 200), ''), narrative_library_size),
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
    'narrative_library_size', v_row.narrative_library_size,
    'founding_spot', v_row.founding_spot,
    'founding_count', v_count,
    'created_at', v_row.created_at
  );
end;
$fn$;

revoke all on function public.submit_lead(
  text, text, text, text, text, text, text, text, text, text, text, text, text, text, text
) from public, anon, authenticated;

grant execute on function public.submit_lead(
  text, text, text, text, text, text, text, text, text, text, text, text, text, text, text
) to service_role;
