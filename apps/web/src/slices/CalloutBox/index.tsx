import { PrismicRichText } from '@prismicio/react'
import type { CalloutBoxSlice } from '@/prismicio-types'
import type { SliceComponentProps } from '@prismicio/react'
import styles from './CalloutBox.module.css'

type Props = SliceComponentProps<CalloutBoxSlice>

const variants = {
  tip: {
    wrapperClass: styles.tip,
    labelClass: styles.labelTip,
    icon: '💡',
    label: 'Tip',
  },
  warning: {
    wrapperClass: styles.warning,
    labelClass: styles.labelWarning,
    icon: '⚠️',
    label: 'Watch Out',
  },
  info: {
    wrapperClass: styles.info,
    labelClass: styles.labelInfo,
    icon: 'ℹ️',
    label: 'Note',
  },
} as const

export default function CalloutBox({ slice }: Props) {
  const type = (slice.primary.type as keyof typeof variants) ?? 'tip'
  const variant = variants[type] ?? variants.tip

  return (
    <section className={['container-narrow', styles.section].join(' ')}>
      <div className={[styles.wrapper, variant.wrapperClass].join(' ')}>
        <div className={styles.inner}>
          <span className={styles.icon} role="img" aria-hidden>
            {variant.icon}
          </span>
          <div className={styles.body}>
            {slice.primary.heading && (
              <p className={[styles.label, variant.labelClass].join(' ')}>
                {slice.primary.heading}
              </p>
            )}
            <div className={styles.prose}>
              <PrismicRichText field={slice.primary.content} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
