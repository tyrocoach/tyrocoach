import { notFound } from 'next/navigation'
import Link from 'next/link'
import { filter } from '@prismicio/client'
import { createClient } from '@/prismicio'
import ArticleCard from '@/components/ArticleCard'
import type { Metadata } from 'next'

export const revalidate = 3600

interface Props {
  params: Promise<{ sport: string }>
}

export async function generateStaticParams() {
  const client = createClient()
  const sports = await client.getAllByType('sport').catch(() => [])
  return sports.map((sport) => ({ sport: sport.uid }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { sport: sportSlug } = await params
  const client = createClient()

  const sport = await client.getByUID('sport', sportSlug).catch(() => null)
  if (!sport) return {}

  return {
    title: `Youth ${sport.data.name} Coaching Tips`,
    description: `Age-by-age ${sport.data.name?.toLowerCase()} coaching guides, drills, and tips for parent coaches.`,
  }
}

export default async function SportHubPage({ params }: Props) {
  const { sport: sportSlug } = await params
  const client = createClient()

  const sport = await client.getByUID('sport', sportSlug).catch(() => null)
  if (!sport) notFound()

  const [ageGroups, articles] = await Promise.all([
    client
      .getAllByType('age_group', {
        filters: [filter.at('my.age_group.sport', sportSlug)],
      })
      .catch(() => []),
    client
      .getAllByType('article', {
        filters: [filter.at('my.article.sport', sportSlug)],
        orderings: [{ field: 'my.article.published_date', direction: 'desc' }],
        limit: 9,
        fetchLinks: ['sport.name', 'age_group.label'],
      })
      .catch(() => []),
  ])

  const sportName = sport.data.name ?? sportSlug

  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-br from-brand-green to-brand-lime py-12 text-white">
        <div className="container-wide">
          <nav className="mb-4 flex items-center gap-2 text-sm text-white/70">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span>/</span>
            <span className="text-white">{sportName}</span>
          </nav>
          <h1 className="text-3xl font-bold md:text-4xl">Youth {sportName} Coaching</h1>
        </div>
      </section>

      {/* Age group nav */}
      {ageGroups.length > 0 && (
        <section className="border-b border-gray-100 bg-gray-50 py-4">
          <div className="container-wide">
            <div className="flex flex-wrap gap-2">
              <span className="py-2 text-sm font-medium text-gray-500">Browse by age:</span>
              {ageGroups.map((ag) => (
                <Link
                  key={ag.id}
                  href={`/${sportSlug}/${ag.uid}`}
                  className="rounded-full border border-brand-lime px-4 py-1.5 text-sm font-medium text-brand-green transition hover:bg-brand-lime hover:text-white"
                >
                  {ag.data.label ?? ag.uid}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Articles */}
      <section className="container-wide py-10">
        {articles.length > 0 ? (
          <>
            <h2 className="mb-6 text-xl font-bold text-brand-dark">
              Latest {sportName} Articles
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </>
        ) : (
          <div className="py-16 text-center">
            <p className="text-2xl">🚧</p>
            <h2 className="mt-4 text-lg font-semibold text-gray-600">Content coming soon!</h2>
            <p className="mt-2 text-gray-400">
              We&apos;re working on {sportName} coaching guides. Check back soon.
            </p>
          </div>
        )}
      </section>
    </>
  )
}
