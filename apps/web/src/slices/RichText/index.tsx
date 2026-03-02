import { PrismicRichText } from '@prismicio/react'
import type { RichTextSlice } from '@/prismicio-types'
import type { SliceComponentProps } from '@prismicio/react'
import styles from './RichText.module.css'

type Props = SliceComponentProps<RichTextSlice>

export default function RichText({ slice }: Props) {
  return (
    <section className={['container-narrow', styles.section].join(' ')}>
      <div className={styles.prose}>
        <PrismicRichText field={slice.primary.content} />
      </div>
    </section>
  )
}
