# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What TyroCoach Is

A content-driven coaching tips site for parents who've been roped into coaching their kids' sports teams. Starting with youth soccer (US audience), designed to expand to other sports over time.

**Revenue model**: Free, ad-supported (Google AdSense)
**Target user**: First-time or reluctant youth sports coaches (parents)
**Content types**: Articles, drills, age-group guides, video embeds, printable PDFs

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router) |
| CMS | Prismic + Slice Machine |
| Monorepo | Turborepo + pnpm workspaces |
| Hosting | Vercel |
| CI/CD | GitHub Actions |
| Ads | Google AdSense |
| Language | TypeScript throughout |

## Commands

All commands run from the repo root unless noted.

```bash
pnpm dev          # Start dev server (all apps via Turborepo)
pnpm build        # Production build
pnpm lint         # ESLint across all packages
pnpm type-check   # tsc --noEmit across all packages
pnpm format       # Prettier on all TS/TSX/MD/JSON files
```

To run a command scoped to the web app only:
```bash
cd apps/web && pnpm dev
cd apps/web && pnpm lint
```

## Repo Structure

```
tyrocoach/
├── apps/web/              # Next.js 15 site
│   ├── src/app/           # App Router pages
│   ├── src/components/    # Shared UI (Nav, Footer, ArticleCard)
│   ├── src/slices/        # Prismic SliceZone components
│   ├── src/prismicio.ts   # Prismic client factory
│   └── src/prismicio-types.d.ts  # Generated Prismic types
├── packages/tsconfig/     # Shared TypeScript config
├── infra/                 # Deployment docs + env var reference
├── .claude/               # Agent instructions
└── .github/workflows/     # CI (lint + type-check + build on every PR)
```

## Architecture

### Page Routing
Pages follow the URL pattern `/:sport/:ageGroup/:articleSlug`. All dynamic segments are statically generated via `generateStaticParams()` which queries Prismic at build time. ISR revalidation is set to `3600` seconds on each page, with on-demand revalidation via the webhook at `POST /api/revalidate`.

### Prismic Data Flow
- Client is created via `createClient()` in `src/prismicio.ts`
- In production: `cache: 'force-cache'` + `next: { tags: ['prismic'] }` — revalidated by tag
- In development: `next: { revalidate: 5 }` — refreshes every 5 seconds
- Content types: `sport`, `age_group`, `article`
- Route resolvers in `prismicio.ts` define how Prismic document URLs are constructed
- Prismic repository name comes from `NEXT_PUBLIC_PRISMIC_ENVIRONMENT` env var (falls back to `slicemachine.config.json`)

### Slices
Six Prismic slices live in `src/slices/`, each with their own directory:
`RichText`, `VideoEmbed`, `DrillDiagram`, `CalloutBox`, `AdPlacement`, `PrintableDownload`

All slices are registered in `src/slices/index.ts` and rendered via `<SliceZone>` in the article page.

### Styling
Tailwind CSS with custom brand tokens defined in `tailwind.config.ts`:
- `brand-green`: #1D428A (Leeds Navy Blue — primary)
- `brand-lime`: #5B9BD5 (Sky Blue — accent)
- `brand-yellow`: #FFCD00 (Leeds Yellow — highlight)
- `brand-dark`: #0D1B3E (Deep Navy — text)

Reusable utility classes defined in `globals.css` `@layer components`:
- `.container-wide` — max-w-7xl with responsive padding
- `.container-narrow` — max-w-3xl with responsive padding
- `.btn-primary`, `.btn-secondary` — standard CTA buttons
- `.card` — rounded card with border and hover shadow
- `.tag` — pill badge

## Prismic

- Prismic repository: set in `NEXT_PUBLIC_PRISMIC_ENVIRONMENT` env var
- Client configured in `apps/web/src/prismicio.ts`
- Slice Machine config: `apps/web/slicemachine.config.json`

## Agent Architecture

Three specialized agents handle implementation:

### 1. Component Agent → `.claude/agents/component-agent.md`
Triggered when: user describes a new page, slice, UI component, or content feature.

### 2. GitHub Agent → `.claude/agents/github-agent.md`
Triggered when: user says "create an issue", "open a PR", "review this", "merge this".

### 3. Infrastructure Agent → `.claude/agents/infra-agent.md`
Triggered when: user mentions deployment, env vars, domains, or CI/CD.

## CEO Workflow Rules

Before starting any feature:

1. **Always create a GitHub issue first** — document what we're building and why
2. **Always work on a branch** — never commit directly to `main`
3. **Always open a PR** — link it to the originating issue
4. **Wait for CI to pass** before merging

### Commit Convention (Conventional Commits)
- `feat:` — new feature
- `fix:` — bug fix
- `docs:` — documentation only
- `chore:` — maintenance, deps, config
- `refactor:` — code restructure without behavior change

### Branch Naming
- `feature/short-description`
- `fix/short-description`
- `docs/short-description`
- `chore/short-description`

## URL Structure

```
/                           → Homepage
/soccer/                    → Soccer hub (sport landing)
/soccer/u10/                → U10 age group listing
/soccer/u10/[slug]/         → Individual article
/[sport]/                   → Future sports hubs
```

## Environment Variables

See `infra/README.md` for full documentation. Key vars:
- `NEXT_PUBLIC_PRISMIC_ENVIRONMENT` — Prismic repo name (required for build)
- `NEXT_PUBLIC_SITE_URL` — production URL (used for `metadataBase`)
- `REVALIDATION_SECRET` — header value for `POST /api/revalidate`
- `NEXT_PUBLIC_ADSENSE_CLIENT_ID` — optional; AdSense script only loads when set
