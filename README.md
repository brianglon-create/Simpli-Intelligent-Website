# Simpli Intelligent Website

Public one-page landing site for **Simpli Intelligent** (`simpliintelligent.com`).

This is a standalone Next.js application. It is not connected to Simpli Operate, Simpli Reach, Supabase, authentication, analytics, or any backend services.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Static-first architecture (no database, no CMS, no paid services)

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

Site identity, SEO copy, product listings, and the contact email live in one place:

`src/lib/site.ts`

To change the contact address later (for example to a `@simpliintelligent.com` inbox), update only `SITE.contactEmail` in that file.

## Deployment (manual)

1. Push this repository to GitHub.
2. Import the repo into Vercel as a new project.
3. Use the default Next.js settings (no environment variables required for V1).
4. Connect `simpliintelligent.com` only when authorized.

Do not deploy automatically from this local sprint unless explicitly approved.

## Project docs

- `PROJECT_STATUS.md` — scope and V1 status
- `COMPLETION_REPORT.md` — handoff summary for founder review
