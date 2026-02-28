import type { MetadataRoute } from 'next'
import { createClient } from '@/prismicio'
import type { FilledContentRelationshipField } from '@prismicio/client'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://tyrocoach.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const client = createClient()

  const [sports, ageGroups, articles] = await Promise.all([
    client.getAllByType('sport').catch(() => []),
    client.getAllByType('age_group', { fetchLinks: ['sport.slug'] }).catch(() => []),
    client
      .getAllByType('article', { fetchLinks: ['sport.slug', 'age_group.slug'] })
      .catch(() => []),
  ])

  const sportUrls = sports.map((sport) => ({
    url: `${baseUrl}/${sport.uid}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const ageGroupUrls = ageGroups.map((ag) => {
    const sport = ag.data.sport as FilledContentRelationshipField | null
    return {
      url: `${baseUrl}/${sport?.uid ?? 'soccer'}/${ag.uid}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }
  })

  const articleUrls = articles.map((article) => {
    const sport = article.data.sport as FilledContentRelationshipField | null
    const ageGroup = article.data.age_group as FilledContentRelationshipField | null
    return {
      url: `${baseUrl}/${sport?.uid ?? 'soccer'}/${ageGroup?.uid ?? 'general'}/${article.uid}`,
      lastModified: article.last_publication_date
        ? new Date(article.last_publication_date)
        : new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }
  })

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...sportUrls,
    ...ageGroupUrls,
    ...articleUrls,
  ]
}
