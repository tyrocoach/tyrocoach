import { PrismicRichText } from '@prismicio/react'
import type { CalloutBoxSlice } from '@/prismicio-types'
import type { SliceComponentProps } from '@prismicio/react'

type Props = SliceComponentProps<CalloutBoxSlice>

const styles = {
  tip: {
    wrapper: 'border-brand-lime bg-brand-lime/10',
    icon: '💡',
    label: 'Tip',
    labelColor: 'text-brand-green',
  },
  warning: {
    wrapper: 'border-yellow-400 bg-yellow-50',
    icon: '⚠️',
    label: 'Watch Out',
    labelColor: 'text-yellow-700',
  },
  info: {
    wrapper: 'border-blue-300 bg-blue-50',
    icon: 'ℹ️',
    label: 'Note',
    labelColor: 'text-blue-700',
  },
} as const

export default function CalloutBox({ slice }: Props) {
  const type = (slice.primary.type as keyof typeof styles) ?? 'tip'
  const style = styles[type] ?? styles.tip

  return (
    <section className="container-narrow py-4">
      <div className={`rounded-xl border-l-4 p-5 ${style.wrapper}`}>
        <div className="flex items-start gap-3">
          <span className="mt-0.5 text-xl" role="img" aria-hidden>
            {style.icon}
          </span>
          <div className="flex-1">
            {slice.primary.heading && (
              <p className={`mb-1 font-semibold ${style.labelColor}`}>
                {slice.primary.heading}
              </p>
            )}
            <div className="prose prose-sm max-w-none">
              <PrismicRichText field={slice.primary.content} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
