# TyroCoach — Project Context & CEO Workflow

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

## Prismic

- Prismic repository: set in `NEXT_PUBLIC_PRISMIC_ENVIRONMENT` env var
- Client configured in `apps/web/src/prismicio.ts`
- Slice Machine config: `apps/web/slicemachine.config.json`

## Repo Structure

```
tyrocoach/
├── apps/web/          # Next.js 15 site
├── packages/tsconfig/ # Shared TypeScript config
├── infra/             # Deployment docs
├── .claude/           # Agent instructions
└── .github/workflows/ # CI/CD
```

## Agent Architecture

Three specialized agents handle implementation:

### 1. Component Agent → `.claude/agents/component-agent.md`
Triggered when: user describes a new page, slice, UI component, or content feature.

### 2. GitHub Agent → `.claude/agents/github-agent.md`
Triggered when: user says "create an issue", "open a PR", "review this", "merge this".

### 3. Infrastructure Agent → `.claude/agents/infra-agent.md`
Triggered when: user mentions deployment, env vars, domains, or CI/CD.

## CEO Workflow Rules

As the CEO, you give direction in natural language. Before starting any feature:

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
/soccer/                    → Soccer hub
/soccer/u10/                → U10 soccer articles
/soccer/u10/[slug]/         → Individual article
/[sport]/                   → Future sports
```

## Environment Variables

See `infra/README.md` for full documentation of all required env vars.
