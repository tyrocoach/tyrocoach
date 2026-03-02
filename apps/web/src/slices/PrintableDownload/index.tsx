import { PrismicLink } from '@prismicio/react'
import type { PrintableDownloadSlice } from '@/prismicio-types'
import type { SliceComponentProps } from '@prismicio/react'
import styles from './PrintableDownload.module.css'

type Props = SliceComponentProps<PrintableDownloadSlice>

export default function PrintableDownload({ slice }: Props) {
  return (
    <section className={['container-narrow', styles.section].join(' ')}>
      <div className={styles.card}>
        <div className={styles.icon}>📄</div>
        <div className={styles.body}>
          {slice.primary.title && (
            <h3 className={styles.title}>{slice.primary.title}</h3>
          )}
          {slice.primary.description && (
            <p className={styles.description}>{slice.primary.description}</p>
          )}
        </div>
        <PrismicLink
          field={slice.primary.file}
          className="btn-primary"
          target="_blank"
          rel="noopener noreferrer"
        >
          {slice.primary.button_label ?? 'Download PDF'}
        </PrismicLink>
      </div>
    </section>
  )
}
