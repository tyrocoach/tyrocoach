# TyroCoach Infrastructure

## Overview

- **Hosting**: Vercel (linked to GitHub `tyrocoach` repo)
- **CMS**: Prismic (`tyrocoach` repository)
- **CI/CD**: GitHub Actions → Vercel

---

## Environment Variables

All variables must be set in Vercel for both **Production** and **Preview** environments.

| Variable | Required | Description | Where to get it |
|---|---|---|---|
| `NEXT_PUBLIC_PRISMIC_ENVIRONMENT` | ✅ | Prismic repository name (e.g. `tyrocoach`) | Prismic dashboard |
| `NEXT_PUBLIC_SITE_URL` | ✅ | Production URL without trailing slash (e.g. `https://tyrocoach.com`) | Your domain |
| `REVALIDATION_SECRET` | ✅ | Random secret for Prismic webhook auth. Generate: `openssl rand -hex 32` | Generate locally |
| `NEXT_PUBLIC_ADSENSE_CLIENT_ID` | ⬜ | Google AdSense publisher ID (`ca-pub-XXXX`) | AdSense dashboard |
| `NEXT_PUBLIC_ADSENSE_SLOT_LEADERBOARD` | ⬜ | AdSense slot ID for leaderboard units | AdSense dashboard |
| `NEXT_PUBLIC_ADSENSE_SLOT_RECTANGLE` | ⬜ | AdSense slot ID for rectangle units | AdSense dashboard |
| `NEXT_PUBLIC_ADSENSE_SLOT_SKYSCRAPER` | ⬜ | AdSense slot ID for skyscraper units | AdSense dashboard |

✅ = Required for site to work
⬜ = Optional (ads won't show without it, but site works)

---

## Vercel Project Setup

### First-time setup

1. Install Vercel CLI: `npm i -g vercel`
2. Link the project: `vercel link`
3. Configure build settings in Vercel dashboard:
   - **Framework Preset**: Next.js
   - **Root Directory**: `apps/web`
   - **Build Command**: `cd ../.. && pnpm turbo build --filter=web`
   - **Output Directory**: `.next` (relative to root directory)
4. Add all environment variables (see table above)
5. Add custom domain

### Pull env vars for local dev

```bash
vercel env pull apps/web/.env.local
```

---

## Prismic Webhook → Vercel Revalidation

When content is published in Prismic, it automatically triggers ISR revalidation.

### Setup steps

1. Go to Prismic dashboard → Settings → Webhooks
2. Add a new webhook:
   - **URL**: `https://tyrocoach.com/api/revalidate`
   - **Secret**: Same value as `REVALIDATION_SECRET` env var
   - **Trigger on**: Document published, Document unpublished
3. Set the secret as a header: `x-revalidation-secret: <your-secret>`

---

## GitHub Actions CI

See `.github/workflows/ci.yml`.

Required GitHub secret:
- `NEXT_PUBLIC_PRISMIC_ENVIRONMENT` — needed for build step

Add via: **GitHub repo → Settings → Secrets and variables → Actions → New repository secret**

---

## Deployment Flow

```
Push to feature branch
    ↓
GitHub Actions: lint + type-check + next build
    ↓
Vercel: automatic preview deployment (URL posted to PR)
    ↓
User reviews preview in browser
    ↓
Merge to main (squash merge)
    ↓
Vercel: production deployment (auto)
    ↓
Prismic publish → webhook → /api/revalidate → ISR refresh
```

---

## Custom Domain

1. Purchase domain (e.g., via Namecheap, Google Domains)
2. In Vercel dashboard: Project → Settings → Domains → Add domain
3. Update DNS records as instructed by Vercel
4. Update `NEXT_PUBLIC_SITE_URL` env var to the new domain

---

## Monitoring

- **Vercel Analytics**: Enable in Vercel dashboard → Analytics tab
- **Deployment logs**: `vercel logs <deployment-url>`
- **Preview deployments**: Automatically created for every PR
