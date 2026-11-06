-- Senior Pension Saathi: public, read-only scheme directory.
-- Apply this migration in Supabase SQL Editor.
-- Do not store beneficiary identity, Aadhaar, bank details, or application records here.

create table if not exists public.pension_schemes (
  id text primary key,
  name text not null,
  state_code text not null,
  state_name text not null,
  category text not null,
  summary text not null,
  department text,
  official_url text,
  source_url text,
  required_documents jsonb not null default '[]'::jsonb,
  application_routes jsonb not null default '[]'::jsonb,
  support text,
  verified_note text,
  source_checked_on date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.pension_schemes enable row level security;

grant select on public.pension_schemes to anon, authenticated;

drop policy if exists "Public can read published pension schemes" on public.pension_schemes;
create policy "Public can read published pension schemes"
on public.pension_schemes
for select
to anon, authenticated
using (true);

-- No public insert, update, or delete policies are created.
-- Manage scheme content through a trusted admin workflow only.

insert into public.pension_schemes (
  id, name, state_code, state_name, category, summary, department,
  official_url, source_url, required_documents, application_routes,
  support, verified_note, source_checked_on
) values (
  'punjab-old-age-pension',
  'Old Age Pension Scheme',
  'PB',
  'Punjab',
  'Old age support',
  'Punjab government service information for the Old Age Pension Scheme.',
  'Department of Social Security and Women & Child Development, Government of Punjab',
  'https://connect.punjab.gov.in/',
  'https://punjab.gov.in/wp-content/uploads/2025/09/Old-Age-Pension-Scheme.pdf',
  '[
    "Identity proof: Aadhaar/e-Aadhaar, Voter ID, Passport, Driving Licence or PAN (as listed by the official service page)",
    "Address proof: Passport, Voter ID, Aadhaar/e-Aadhaar or a government/PSU address certificate (as listed)",
    "Date-of-birth proof: Aadhaar, Voter ID/voter list, birth certificate or matriculation certificate",
    "Bank passbook"
  ]'::jsonb,
  '[
    "Visit a nearby Sewa Kendra",
    "Use the Punjab Connect Portal",
    "Call 1076 for the listed doorstep service information"
  ]'::jsonb,
  'Punjab service helpline: 1100',
  'The linked Punjab government service document lists document categories and application routes. Confirm current eligibility conditions and fees with the official service before applying.',
  '2026-11-06'
)
on conflict (id) do update set
  name = excluded.name,
  summary = excluded.summary,
  department = excluded.department,
  official_url = excluded.official_url,
  source_url = excluded.source_url,
  required_documents = excluded.required_documents,
  application_routes = excluded.application_routes,
  support = excluded.support,
  verified_note = excluded.verified_note,
  source_checked_on = excluded.source_checked_on,
  updated_at = now();
