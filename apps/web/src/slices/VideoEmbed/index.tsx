import type { VideoEmbedSlice } from '@/prismicio-types'
import type { SliceComponentProps } from '@prismicio/react'

type Props = SliceComponentProps<VideoEmbedSlice>

function getEmbedUrl(url: string): string | null {
  // YouTube
  const ytMatch = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/
  )
  if (ytMatch?.[1]) return `https://www.youtube.com/embed/${ytMatch[1]}`

  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/)
  if (vimeoMatch?.[1]) return `https://player.vimeo.com/video/${vimeoMatch[1]}`

  return null
}

export default function VideoEmbed({ slice }: Props) {
  const embedUrl = slice.primary.embed_url ? getEmbedUrl(slice.primary.embed_url) : null

  if (!embedUrl) return null

  return (
    <section className="container-narrow py-6">
      <div className="overflow-hidden rounded-xl shadow-md">
        <div className="relative aspect-video">
          <iframe
            src={embedUrl}
            title={slice.primary.caption ?? 'Video'}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
          />
        </div>
        {slice.primary.caption && (
          <p className="bg-gray-50 px-4 py-2 text-sm text-gray-600">{slice.primary.caption}</p>
        )}
      </div>
    </section>
  )
}
