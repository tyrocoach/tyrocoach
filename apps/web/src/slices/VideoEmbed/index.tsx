import type { VideoEmbedSlice } from '@/prismicio-types'
import type { SliceComponentProps } from '@prismicio/react'
import styles from './VideoEmbed.module.css'

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
    <section className={['container-narrow', styles.section].join(' ')}>
      <div className={styles.wrapper}>
        <div className={styles.aspectBox}>
          <iframe
            src={embedUrl}
            title={slice.primary.caption ?? 'Video'}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className={styles.iframe}
          />
        </div>
        {slice.primary.caption && (
          <p className={styles.caption}>{slice.primary.caption}</p>
        )}
      </div>
    </section>
  )
}
