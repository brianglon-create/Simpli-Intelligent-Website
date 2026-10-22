# Simpli Intelligent Website

Public site for **Simpli Intelligent** (`simpliintelligent.com`).

Simpli Intelligent is the platform. Simpli Check, Simpli Operate, Simpli Archive, and Simpli Reach each have their own page. `/horizon` is the campaign page for Horizon inspectors ahead of the December 15, 2026 shutdown.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase Postgres for signup storage (service role, server only)
- Resend for signup notifications and founding-spot alerts

## Local setup

Prerequisites: Node.js 20+ and npm.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start local development server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript check |
| `npm run test` | Automated Vitest suite |

## Configuration

Site identity, SEO copy, product listings, and the contact email live in `src/lib/site.ts`.

The public contact address is `brian@simpliintelligent.com` (`SITE.contactEmail` in `src/lib/site.ts`). Signup alerts go to `LEAD_NOTIFY_EMAIL` when that is set, and otherwise to the same address.

Copy `.env.example` to `.env.local`. Without Supabase credentials, `npm run dev` keeps signups in memory and they disappear when the server restarts. Production without those credentials does not pretend a signup was saved. The form tells the visitor to email Brian instead.

## Supabase setup

Use the same Supabase project planned for Simpli Operate. The `leads` table is the shared inbox.

1. Create or open the Supabase project.
2. In the SQL editor, run `supabase/migrations/20261022160000_create_leads.sql`. The script creates `leads` and `founding_alerts`, turns on row level security with no public policies, and grants `submit_lead` to `service_role` only.
3. In Project Settings → API, copy the Project URL to `SUPABASE_URL`. Use `https://<project-ref>.supabase.co` with no `/rest/v1` path. A bare 20-character project ref, a missing `https://`, or a trailing `/rest/v1/` is rewritten to that origin. Do not paste the database connection string.
4. Copy the `service_role` key to `SUPABASE_SERVICE_ROLE_KEY`. This key bypasses row level security. Put it only in server environment variables. Do not use the anon key for writes, and do not prefix the service key with `NEXT_PUBLIC_`.
5. Redeploy. The first signup should appear in `public.leads` with `lead_status` = `New`.

Founding spots are counted from `leads.founding_spot` in that database. Spots 1–50 are the $49/month Check tier. Spots 51–100 are the $69/month tier. Archive, Operate, and Reach signups do not take a spot. At 100 the site stops offering the founding tiers. Brian gets an email at 40, 50, 90, and 100 when Resend is configured.

## Email setup

1. Create a Resend account and verify the sending domain.
2. Set `RESEND_API_KEY` and `EMAIL_FROM` (the verified from address).
3. Set `LEAD_NOTIFY_EMAIL` to the inbox that should receive signup and threshold mail.
4. Set `POSTAL_ADDRESS` to the street address that should appear on the privacy page and on confirmation email. CASL and CAN-SPAM expect that address before commercial email goes out.

Campaign links should point at `/horizon` and keep their query string, for example `/horizon?utm_source=linkedin&utm_medium=post&utm_campaign=dec15&source=cahpi`. Those values are stored on the lead.

## Deployment (manual)

1. Push this repository to GitHub.
2. Import the repo into Vercel as a new project.
3. Add the environment variables from `.env.example`.
4. Run the SQL migration before sending traffic.
5. Connect `simpliintelligent.com` only when authorized.

## Project docs

- `PROJECT_STATUS.md` — scope and V1 status
- `COMPLETION_REPORT.md` — handoff summary for founder review
