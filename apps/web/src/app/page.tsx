import Link from 'next/link'
import { createClient } from '@/prismicio'
import ArticleCard from '@/components/ArticleCard'
import type { ArticleDocument } from '@/prismicio-types'
import type { Metadata } from 'next'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'TyroCoach — Youth Sports Coaching Tips for Parents',
  description:
    "Practical coaching tips and drills for parents who've been roped into coaching their kids' youth sports teams.",
}

export default async function HomePage() {
  const client = createClient()

  const articles = await client
    .getAllByType<ArticleDocument>('article', {
      limit: 6,
      orderings: [{ field: 'my.article.published_date', direction: 'desc' }],
      fetchLinks: ['sport.name', 'sport.slug', 'age_group.label'],
    })
    .catch(() => [])

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-green to-brand-lime py-16 text-white md:py-24">
        <div className="container-wide text-center">
          <h1 className="text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
            You&apos;re the Coach Now.
            <br />
            <span className="text-brand-yellow">We&apos;ve Got Your Back.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/90 md:text-xl">
            Practical drills, game-day tips, and age-by-age guidance for parents who&apos;ve
            been volunteered to coach their kids&apos; sports teams.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/soccer"
              className="rounded-lg bg-white px-8 py-3 font-semibold text-brand-green transition hover:bg-brand-yellow"
            >
              Start with Soccer ⚽
            </Link>
            <Link
              href="/soccer/u8"
              className="rounded-lg border border-white px-8 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              U8 Drills →
            </Link>
          </div>
        </div>
      </section>

      {/* Sport categories */}
      <section className="container-wide py-12">
        <h2 className="mb-6 text-2xl font-bold text-brand-dark">Browse by Sport</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Link
            href="/soccer"
            className="card flex items-center gap-4 p-5 hover:border-brand-lime"
          >
            <span className="text-4xl">⚽</span>
            <div>
              <h3 className="font-bold text-brand-dark">Youth Soccer</h3>
              <p className="text-sm text-gray-500">U6 through U12 coaching guides</p>
            </div>
          </Link>
          <div className="card flex items-center gap-4 p-5 opacity-50">
            <span className="text-4xl">🏀</span>
            <div>
              <h3 className="font-bold text-gray-400">Basketball</h3>
              <p className="text-sm text-gray-400">Coming soon</p>
            </div>
          </div>
          <div className="card flex items-center gap-4 p-5 opacity-50">
            <span className="text-4xl">⚾</span>
            <div>
              <h3 className="font-bold text-gray-400">Baseball</h3>
              <p className="text-sm text-gray-400">Coming soon</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured articles */}
      {articles.length > 0 && (
        <section className="container-wide py-8">
          <h2 className="mb-6 text-2xl font-bold text-brand-dark">Latest Coaching Tips</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-brand-dark py-14 text-center text-white">
        <div className="container-narrow">
          <h2 className="text-2xl font-bold md:text-3xl">Ready to become a better coach?</h2>
          <p className="mt-3 text-gray-300">
            Dive into age-specific drills and practical tips designed for parent coaches — no
            experience required.
          </p>
          <Link href="/soccer" className="btn-primary mt-6 inline-block bg-brand-lime text-brand-dark hover:bg-brand-yellow">
            Browse Soccer Guides →
          </Link>
        </div>
      </section>
    </>
  )
}
