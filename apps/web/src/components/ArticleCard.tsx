import Link from 'next/link'
import { PrismicNextImage } from '@prismicio/next'
import type { ArticleDocument } from '@/prismicio-types'
import type { FilledContentRelationshipField } from '@prismicio/client'

interface Props {
  article: ArticleDocument
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

export default function ArticleCard({ article }: Props) {
  const { data, uid } = article
  const sport = data.sport as FilledContentRelationshipField | null
  const ageGroup = data.age_group as FilledContentRelationshipField | null

  const sportUid = sport?.uid ?? 'soccer'
  const ageGroupUid = ageGroup?.uid ?? ''
  const href = ageGroupUid ? `/${sportUid}/${ageGroupUid}/${uid}` : `/${sportUid}/${uid}`

  const tags = getTagList(data.tags)

  return (
    <article className="card flex flex-col overflow-hidden">
      {data.featured_image?.url && (
        <Link href={href} className="block overflow-hidden">
          <PrismicNextImage
            field={data.featured_image}
            className="aspect-video w-full object-cover transition duration-300 hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
          />
        </Link>
      )}

      <div className="flex flex-1 flex-col p-5">
        {tags.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-2">
            {tags.slice(0, 3).map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
        )}

        <Link href={href}>
          <h2 className="mb-2 text-lg font-bold text-brand-dark transition hover:text-brand-green">
            {data.title}
          </h2>
        </Link>

        {data.summary && (
          <p className="mb-4 flex-1 text-sm leading-relaxed text-gray-600">{data.summary}</p>
        )}

        <div className="flex items-center justify-between">
          {data.published_date && (
            <time className="text-xs text-gray-400" dateTime={data.published_date}>
              {formatDate(data.published_date)}
            </time>
          )}
          <Link href={href} className="btn-primary text-xs px-3 py-1.5">
            Read more
          </Link>
        </div>
      </div>
    </article>
  )
}
