import { notFound } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/prismicio'
import ArticleCard from '@/components/ArticleCard'
import type { ArticleDocument } from '@/prismicio-types'
import type { Metadata } from 'next'

export const revalidate = 3600

interface Props {
  params: Promise<{ sport: string; ageGroup: string }>
}

export async function generateStaticParams() {
  const client = createClient()
  const ageGroups = await client
    .getAllByType('age_group', { fetchLinks: ['sport.slug'] })
    .catch(() => [])

  return ageGroups.map((ag) => {
    const sport = ag.data.sport as { uid?: string } | null
    return {
      sport: sport?.uid ?? 'soccer',
      ageGroup: ag.uid,
    }
  })
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { sport: sportSlug, ageGroup: ageGroupSlug } = await params
  const client = createClient()

  const [sport, ageGroup] = await Promise.all([
    client.getByUID('sport', sportSlug).catch(() => null),
    client.getByUID('age_group', ageGroupSlug).catch(() => null),
  ])

  if (!sport || !ageGroup) return {}

  return {
    title: `${ageGroup.data.label} ${sport.data.name} Coaching Tips`,
    description: `Drills, tips, and game-day advice for ${ageGroup.data.label} ${sport.data.name?.toLowerCase()} coaches.`,
  }
}

export default async function AgeGroupPage({ params }: Props) {
  const { sport: sportSlug, ageGroup: ageGroupSlug } = await params
  const client = createClient()
  const { filter } = await import('@prismicio/client')

  const [sport, ageGroup, articles] = await Promise.all([
    client.getByUID('sport', sportSlug).catch(() => null),
    client.getByUID('age_group', ageGroupSlug).catch(() => null),
    client
      .getAllByType<ArticleDocument>('article', {
        filters: [
          filter.at('my.article.sport', sportSlug),
          filter.at('my.article.age_group', ageGroupSlug),
        ],
        orderings: [{ field: 'my.article.published_date', direction: 'desc' }],
        fetchLinks: ['sport.name', 'age_group.label'],
      })
      .catch(() => []),
  ])

  if (!sport || !ageGroup) notFound()

  const sportName = sport.data.name ?? sportSlug
  const ageLabel = ageGroup.data.label ?? ageGroupSlug

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
            <Link href={`/${sportSlug}`} className="hover:text-white">
              {sportName}
            </Link>
            <span>/</span>
            <span className="text-white">{ageLabel}</span>
          </nav>
          <h1 className="text-3xl font-bold md:text-4xl">
            {ageLabel} {sportName} Coaching
          </h1>
          {ageGroup.data.description && (
            <p className="mt-3 max-w-2xl text-white/90">{ageGroup.data.description}</p>
          )}
        </div>
      </section>

      {/* Articles */}
      <section className="container-wide py-10">
        {articles.length > 0 ? (
          <>
            <h2 className="mb-6 text-xl font-bold text-brand-dark">
              {ageLabel} {sportName} Articles ({articles.length})
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </>
        ) : (
          <div className="py-16 text-center">
            <p className="text-4xl">✍️</p>
            <h2 className="mt-4 text-lg font-semibold text-gray-600">
              No articles yet for {ageLabel}
            </h2>
            <p className="mt-2 text-gray-400">
              We&apos;re writing guides for this age group. Check back soon!
            </p>
            <Link href={`/${sportSlug}`} className="btn-secondary mt-6 inline-block">
              ← All {sportName} articles
            </Link>
          </div>
        )}
      </section>
    </>
  )
}
