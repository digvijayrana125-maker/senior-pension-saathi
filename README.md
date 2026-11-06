# Senior Pension Saathi — React + Supabase

Punjab-first starter application for the Senior Pension Saathi information platform.

## What is included in milestone 1

- React + Vite project structure.
- Responsive homepage adapted from the original HTML/CSS/JS prototype.
- Navigation sections: Home, Pension Schemes, Eligibility Guide, Documents, Get Help.
- English/Hindi language toggle.
- Adjustable text size.
- Punjab Old Age Pension scheme information sourced from a Punjab Government service document.
- Clear warnings that individual live pension tracking is not connected.
- Supabase client setup using environment variables.
- Local fallback data so the site works before Supabase is configured.
- SQL migration for a public read-only pension scheme directory.

## Requirements

Install a current Node.js LTS release. Then open a terminal in this project folder.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (normally http://localhost:5173).

To test a production build:

```bash
npm run build
npm run preview
```

## Connect Supabase

1. Create a Supabase project in the Supabase Dashboard.
2. In the project Connect/API settings, copy the Project URL and publishable key.
3. Copy `.env.example` to `.env.local`.
4. Add the values:

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=YOUR_PUBLISHABLE_KEY
```

5. In Supabase SQL Editor, run `supabase/migrations/0001_create_pension_schemes.sql`.
6. Restart the Vite dev server.

The app will try to load `pension_schemes` from Supabase. If no rows are returned or the connection fails, it displays the bundled Punjab starter information and a status note.

**Never put a Supabase `service_role` key in this frontend.** The publishable key is intended for browser use with appropriate Row Level Security. This starter migration permits public read-only access to the scheme directory and creates no public write policy.

## Official Punjab source used

Punjab Government, *Old Age Pension Scheme — Service Information*:
https://punjab.gov.in/wp-content/uploads/2025/09/Old-Age-Pension-Scheme.pdf

The document lists identity, address and date-of-birth proof categories, bank passbook, Sewa Kendra and Punjab Connect application routes, and helpline information. The document reviewed for this starter does not establish the complete current age/income eligibility rules. Those are deliberately not guessed in the UI.

Punjab Connect Portal:
https://connect.punjab.gov.in/

## Important scope and privacy notes

- This is a development starter, not a deployed public service.
- It is not an official government website and is not affiliated with a government department.
- Individual pension status is not integrated.
- Do not collect Aadhaar numbers, bank account details, OTPs, passwords, or identity document uploads in this prototype.
- Before launch, verify scheme details with the relevant department and add source dates and review workflows.
- Before storing any personal data, define a lawful purpose, consent, retention, access controls, security review, and appropriate adult/organizational oversight.

## Next milestone

Build a reviewed Punjab scheme data model and an admin-only content management workflow, then add state-wise source records. Do not add individual pension tracking unless an authorized government integration and privacy/security review are in place.
