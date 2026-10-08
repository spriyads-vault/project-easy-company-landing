-- Early-access waitlist for the public site.
-- All access goes through the server (service role) via the two functions below. RLS is on with no policies,
-- so the anon and authenticated roles can neither read nor write these tables.

-- ---------------------------------------------------------------------------------------------------------
-- Signups
-- ---------------------------------------------------------------------------------------------------------
create table public.waitlist_signups (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  email text not null unique check (email = lower(email) and char_length(email) <= 254),
  role text not null check (role in (
    'hardware_engineer', 'emc_rf_engineer', 'compliance_regulatory', 'engineering_lead',
    'founder_executive', 'test_lab_consultancy', 'other'
  )),
  product_type text null check (product_type in (
    'connected_device', 'robotics_machinery', 'industrial_equipment', 'aerospace_equipment', 'other'
  )),
  markets text[] null check (markets <@ array['fcc_us', 'ce_ukca', 'ised_ca', 'other']::text[]),
  next_test_window text null check (next_test_window in ('lt_3_months', '3_6_months', '6_12_months', 'no_date')),
  marketing_opt_in boolean not null default false,
  consent_version text not null,
  source text not null check (source in ('nav', 'hero', 'section', 'final_cta_inline', 'docs')),
  utm_source text null check (char_length(utm_source) <= 200),
  utm_medium text null check (char_length(utm_medium) <= 200),
  utm_campaign text null check (char_length(utm_campaign) <= 200),
  referrer text null check (char_length(referrer) <= 2048),
  ip_hash text null, -- SHA-256 of IP + server-side salt. Raw IPs are never stored.
  step2_token uuid not null default gen_random_uuid(),
  step2_token_expires_at timestamptz not null default now() + interval '24 hours',
  status text not null default 'new'
);

create index waitlist_signups_ip_hash_created_at_idx on public.waitlist_signups (ip_hash, created_at);
create unique index waitlist_signups_step2_token_idx on public.waitlist_signups (step2_token);

alter table public.waitlist_signups enable row level security;
revoke all on public.waitlist_signups from anon, authenticated;

-- ---------------------------------------------------------------------------------------------------------
-- Attempts, for rate limiting both steps. Repeat signups update an existing row, so signups alone would
-- under-count attempts. Rows older than an hour are pruned on every attempt.
-- ---------------------------------------------------------------------------------------------------------
create table public.waitlist_attempts (
  id bigint generated always as identity primary key,
  kind text not null check (kind in ('step1', 'step2')),
  ip_hash text not null,
  created_at timestamptz not null default now()
);

create index waitlist_attempts_ip_hash_created_at_idx on public.waitlist_attempts (kind, ip_hash, created_at);
create index waitlist_attempts_created_at_idx on public.waitlist_attempts (created_at);

-- Shared limiter: returns false when this IP has used its allowance for `p_kind` in the last hour.
create or replace function public.waitlist_take_attempt(p_kind text, p_ip_hash text, p_max_per_hour integer)
returns boolean
language plpgsql
security invoker
set search_path = ''
as $$
declare
  v_recent integer;
begin
  -- Serialise attempts from the same network so concurrent requests cannot slip past the limit.
  perform pg_advisory_xact_lock(hashtextextended(p_kind || ':' || p_ip_hash, 0));

  delete from public.waitlist_attempts a where a.created_at < now() - interval '1 hour';

  select count(*) into v_recent
    from public.waitlist_attempts a
    where a.kind = p_kind and a.ip_hash = p_ip_hash and a.created_at >= now() - interval '1 hour';

  if v_recent >= p_max_per_hour then
    return false;
  end if;

  insert into public.waitlist_attempts (kind, ip_hash) values (p_kind, p_ip_hash);
  return true;
end;
$$;

alter table public.waitlist_attempts enable row level security;
revoke all on public.waitlist_attempts from anon, authenticated;

-- ---------------------------------------------------------------------------------------------------------
-- Step 1: rate check, upsert by email and step-2 token rotation in one transaction.
-- Returns status 'ok' with a fresh token, or 'rate_limited' with no token. The caller responds identically
-- for new and existing emails.
-- ---------------------------------------------------------------------------------------------------------
create or replace function public.waitlist_step1(
  p_email text,
  p_role text,
  p_marketing_opt_in boolean,
  p_consent_version text,
  p_source text,
  p_utm_source text,
  p_utm_medium text,
  p_utm_campaign text,
  p_referrer text,
  p_ip_hash text,
  p_max_per_hour integer default 5
)
returns table (status text, step2_token uuid)
language plpgsql
security invoker
set search_path = ''
as $$
declare
  v_token uuid;
begin
  if not public.waitlist_take_attempt('step1', p_ip_hash, p_max_per_hour) then
    return query select 'rate_limited'::text, null::uuid;
    return;
  end if;

  insert into public.waitlist_signups as s (
    email, role, marketing_opt_in, consent_version, source,
    utm_source, utm_medium, utm_campaign, referrer, ip_hash
  )
  values (
    lower(p_email), p_role, coalesce(p_marketing_opt_in, false), p_consent_version, p_source,
    p_utm_source, p_utm_medium, p_utm_campaign, p_referrer, p_ip_hash
  )
  on conflict (email) do update set
    role = excluded.role,
    marketing_opt_in = excluded.marketing_opt_in,
    source = excluded.source,
    updated_at = now(),
    step2_token = gen_random_uuid(),
    step2_token_expires_at = now() + interval '24 hours'
  returning s.step2_token into v_token;

  return query select 'ok'::text, v_token;
end;
$$;

-- ---------------------------------------------------------------------------------------------------------
-- Step 2: fill optional answers with a valid, unexpired token. Only fields that are still NULL are written,
-- so a token can never overwrite answers given earlier. The token is single use: it is rotated and expired
-- whether or not any field was written. Returns 'ok', 'invalid' (unknown, used or expired token) or
-- 'rate_limited'.
-- ---------------------------------------------------------------------------------------------------------
create or replace function public.waitlist_step2(
  p_token uuid,
  p_product_type text,
  p_markets text[],
  p_next_test_window text,
  p_ip_hash text,
  p_max_per_hour integer default 20
)
returns text
language plpgsql
security invoker
set search_path = ''
as $$
declare
  v_id uuid;
begin
  if not public.waitlist_take_attempt('step2', p_ip_hash, p_max_per_hour) then
    return 'rate_limited';
  end if;

  update public.waitlist_signups s set
    product_type = coalesce(s.product_type, p_product_type),
    markets = coalesce(s.markets, nullif(p_markets, '{}'::text[])),
    next_test_window = coalesce(s.next_test_window, p_next_test_window),
    updated_at = now(),
    step2_token = gen_random_uuid(),
    step2_token_expires_at = now()
  where s.step2_token = p_token
    and s.step2_token_expires_at > now()
  returning s.id into v_id;

  return case when v_id is null then 'invalid' else 'ok' end;
end;
$$;

revoke all on function public.waitlist_take_attempt(text, text, integer) from public, anon, authenticated;
revoke all on function public.waitlist_step1(text, text, boolean, text, text, text, text, text, text, text, integer) from public, anon, authenticated;
revoke all on function public.waitlist_step2(uuid, text, text[], text, text, integer) from public, anon, authenticated;
grant execute on function public.waitlist_take_attempt(text, text, integer) to service_role;
grant execute on function public.waitlist_step1(text, text, boolean, text, text, text, text, text, text, text, integer) to service_role;
grant execute on function public.waitlist_step2(uuid, text, text[], text, text, integer) to service_role;
