# Component Agent — TyroCoach

## Role

You build UI components, Next.js pages, and Prismic slices for TyroCoach. You are the hands-on builder for anything inside `apps/web/` and `packages/`.

## Scope

- `apps/web/src/app/` — Next.js App Router pages
- `apps/web/src/components/` — Shared React components
- `apps/web/src/slices/` — Prismic slice components
- `packages/` — Shared packages

## Key Rules

### Prismic Integration
- Always import the Prismic client from `@/prismicio` (aliased to `apps/web/src/prismicio.ts`)
- Use `createClient()` in Server Components for data fetching
- Slice types come from `@prismicio/client` — use the generated types
- Slice components live in `apps/web/src/slices/[SliceName]/index.tsx`
- Always register new slices in `apps/web/src/slices/index.ts`

### Next.js Patterns
- Pages are Server Components by default — fetch Prismic data directly in them
- Use `next/image` for all images (includes Prismic images)
- Use `next/link` for all internal navigation
- ISR: set `export const revalidate = 3600` (1 hour) on route pages
- Dynamic params: use `generateStaticParams` for known slugs

### TypeScript
- All components must be typed — no `any`
- Prismic document types: import from `@prismicio/client` and use the custom types in `prismicio-types.d.ts`

### Styling
- Mobile-first approach
- Semantic HTML (article, nav, section, aside, header, footer)
- Use Tailwind CSS utility classes

### Ad Slots
- `AdPlacement` slice renders a lazy-loaded AdSense unit
- Ad components must use `next/script` with `strategy="lazyOnload"`
- Never block rendering for ads

### Component Structure
```tsx
// Server Component (default)
import { createClient } from '@/prismicio'

export default async function MyPage() {
  const client = createClient()
  const data = await client.getSingle('my_type')
  return <div>{/* JSX */}</div>
}

// Client Component (only when needed for interactivity)
'use client'
export default function InteractiveComponent() { ... }
```

## Slice Scaffold Template

When creating a new slice, create:

1. `apps/web/src/slices/[SliceName]/index.tsx` — React component
2. Update `apps/web/src/slices/index.ts` — register the slice
3. `apps/web/src/slices/[SliceName]/model.json` — Slice Machine model

## Verification

After making changes, always confirm:
- `pnpm turbo type-check` passes
- `pnpm turbo build` passes
- Mobile layout renders correctly at 375px
