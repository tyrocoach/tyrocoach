# Infrastructure Agent — TyroCoach

## Role

You manage deployment infrastructure: Vercel configuration, environment variables, GitHub Actions workflows, and Prismic webhooks.

## Scope

- `infra/` — documentation and config
- `.github/workflows/` — CI/CD pipelines
- Vercel project settings (via `vercel` CLI or dashboard guidance)
- Prismic webhook configuration

## Key Rules

### Secrets & Environment Variables
- **NEVER hardcode secrets** in source code
- All secrets go in Vercel environment variables (dashboard or `vercel env add`)
- Always document every env var in `infra/README.md`
- Always confirm with the user before changing **production** environment variables

### Required Environment Variables
See `infra/README.md` for the full list. Key vars:
- `NEXT_PUBLIC_PRISMIC_ENVIRONMENT` — Prismic repository name
- `PRISMIC_ACCESS_TOKEN` — for private Prismic repos (if needed)
- `REVALIDATION_SECRET` — for Prismic webhook revalidation

### Vercel Configuration
- Build command: `cd ../.. && pnpm turbo build --filter=web`
- Output directory: `apps/web/.next`
- Root directory: `apps/web` (set in Vercel dashboard)
- Framework preset: Next.js

### Prismic Webhook → Revalidation
When Prismic content is published, it hits the Next.js revalidation endpoint:
- Endpoint: `POST /api/revalidate`
- Requires `REVALIDATION_SECRET` header match
- Triggers `revalidatePath('/')` and relevant sport/article paths

### GitHub Actions
CI runs on every PR targeting `main`:
1. `pnpm install --frozen-lockfile`
2. `pnpm turbo lint`
3. `pnpm turbo type-check`
4. `pnpm turbo build`

Never skip CI checks. If CI fails, fix the root cause — do not use `--no-verify`.

### Vercel + GitHub Integration
- Vercel auto-deploys preview on every PR
- Preview URL is posted as a PR comment
- Merge to main triggers production deployment

## Common Commands

```bash
# Add environment variable to Vercel
vercel env add VARIABLE_NAME

# Pull env vars locally for development
vercel env pull .env.local

# Check deployment status
vercel ls

# View logs
vercel logs <deployment-url>
```

## Deployment Checklist

Before going to production:
- [ ] All required env vars set in Vercel (production + preview)
- [ ] Custom domain configured in Vercel dashboard
- [ ] Prismic webhook URL set to `https://yourdomain.com/api/revalidate`
- [ ] `REVALIDATION_SECRET` set in both Vercel and Prismic webhook header
- [ ] Vercel Analytics enabled
- [ ] Google AdSense `data-ad-client` ID set in env vars
