import { notFound } from 'next/navigation'
import Link from 'next/link'
import { PrismicNextImage } from '@prismicio/next'
import { SliceZone } from '@prismicio/react'
import { createClient } from '@/prismicio'
import { components } from '@/slices'
import type { Metadata } from 'next'
import type { FilledContentRelationshipField } from '@prismicio/client'

export const revalidate = 3600

interface Props {
  params: Promise<{ sport: string; ageGroup: string; slug: string }>
}

export async function generateStaticParams() {
  const client = createClient()
  const articles = await client
    .getAllByType('article', {
      fetchLinks: ['sport.slug', 'age_group.slug'],
    })
    .catch(() => [])

  return articles.map((article) => {
    const sport = article.data.sport as FilledContentRelationshipField | null
    const ageGroup = article.data.age_group as FilledContentRelationshipField | null
    return {
      sport: sport?.uid ?? 'soccer',
      ageGroup: ageGroup?.uid ?? 'u10',
      slug: article.uid,
    }
  })
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const client = createClient()

  const article = await client.getByUID('article', slug).catch(() => null)
  if (!article) return {}

  return {
    title: article.data.seo_title || article.data.title || undefined,
    description: article.data.seo_description || article.data.summary || undefined,
    openGraph: {
      title: article.data.seo_title || article.data.title || undefined,
      description: article.data.seo_description || article.data.summary || undefined,
      images: article.data.featured_image?.url
        ? [{ url: article.data.featured_image.url }]
        : [],
      type: 'article',
      publishedTime: article.data.published_date ?? undefined,
    },
  }
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function getTagList(tags: string | null): string[] {
  if (!tags) return []
  return tags.split(',').map((t) => t.trim()).filter(Boolean)
}

export default async function ArticlePage({ params }: Props) {
  const { sport: sportSlug, ageGroup: ageGroupSlug, slug } = await params
  const client = createClient()

  const article = await client
    .getByUID('article', slug, {
      fetchLinks: ['sport.name', 'age_group.label'],
    })
    .catch(() => null)

  if (!article) notFound()

  const { data } = article
  const sport = data.sport as FilledContentRelationshipField & { data?: { name?: string } } | null
  const ageGroup = data.age_group as FilledContentRelationshipField & { data?: { label?: string } } | null

  const sportName = sport?.data?.name ?? sportSlug
  const ageLabel = ageGroup?.data?.label ?? ageGroupSlug
  const tags = getTagList(data.tags)

  return (
    <>
      {/* Article header */}
      <section className="bg-gradient-to-br from-brand-dark to-gray-800 py-12 text-white">
        <div className="container-narrow">
          {/* Breadcrumb */}
          <nav className="mb-4 flex flex-wrap items-center gap-2 text-sm text-white/60">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span>/</span>
            <Link href={`/${sportSlug}`} className="hover:text-white">
              {sportName}
            </Link>
            <span>/</span>
            <Link href={`/${sportSlug}/${ageGroupSlug}`} className="hover:text-white">
              {ageLabel}
            </Link>
            <span>/</span>
            <span className="text-white/80">{data.title}</span>
          </nav>

          {/* Tags */}
          {tags.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span key={tag} className="tag bg-white/10 text-white/80">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <h1 className="text-3xl font-bold leading-tight md:text-4xl">{data.title}</h1>

          {data.summary && (
            <p className="mt-4 text-lg text-white/80">{data.summary}</p>
          )}

          {data.published_date && (
            <p className="mt-4 text-sm text-white/50">
              Published{' '}
              <time dateTime={data.published_date}>{formatDate(data.published_date)}</time>
            </p>
          )}
        </div>
      </section>

      {/* Featured image */}
      {data.featured_image?.url && (
        <div className="container-narrow py-6">
          <PrismicNextImage
            field={data.featured_image}
            className="w-full rounded-xl object-cover shadow-md"
            sizes="(max-width: 768px) 100vw, 768px"
            priority
          />
        </div>
      )}

      {/* Slice zone — article body */}
      <SliceZone slices={data.body} components={components} />

      {/* Printable PDF link (standalone, if not in body) */}
      {data.printable_pdf?.url && (
        <div className="container-narrow py-8">
          <div className="flex items-center gap-4 rounded-xl border border-brand-lime bg-brand-lime/10 p-5">
            <span className="text-3xl">📄</span>
            <div className="flex-1">
              <p className="font-semibold text-brand-dark">Printable Version Available</p>
              <p className="text-sm text-gray-500">Download a PDF to use on the sideline</p>
            </div>
            <a
              href={data.printable_pdf.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex-shrink-0"
            >
              Download PDF
            </a>
          </div>
        </div>
      )}

      {/* Back navigation */}
      <div className="container-narrow pb-12">
        <Link
          href={`/${sportSlug}/${ageGroupSlug}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-brand-green hover:underline"
        >
          ← More {ageLabel} {sportName} articles
        </Link>
      </div>
    </>
  )
}
