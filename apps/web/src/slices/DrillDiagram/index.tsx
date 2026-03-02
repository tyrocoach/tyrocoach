import { PrismicNextImage } from '@prismicio/next'
import { PrismicRichText } from '@prismicio/react'
import type { DrillDiagramSlice } from '@/prismicio-types'
import type { SliceComponentProps } from '@prismicio/react'
import styles from './DrillDiagram.module.css'

type Props = SliceComponentProps<DrillDiagramSlice>

export default function DrillDiagram({ slice }: Props) {
  return (
    <section className={['container-narrow', styles.section].join(' ')}>
      <div className={styles.card}>
        {slice.primary.drill_name && (
          <div className={styles.header}>
            <h3 className={styles.headerTitle}>{slice.primary.drill_name}</h3>
          </div>
        )}
        {slice.primary.image?.url && (
          <div className={styles.imageWrapper}>
            <PrismicNextImage
              field={slice.primary.image}
              className={styles.image}
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
        )}
        {slice.primary.description && (
          <div className={[styles.description, styles.prose].join(' ')}>
            <PrismicRichText field={slice.primary.description} />
          </div>
        )}
      </div>
    </section>
  )
}
